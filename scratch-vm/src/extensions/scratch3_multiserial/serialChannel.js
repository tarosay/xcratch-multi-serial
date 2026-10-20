// xcratch-multi-serial / serialChannel.js
//
// 「シリアル通信 1」〜「シリアル通信 8」の 1 つぶん。
// 開いた SerialPort から読み続け、行に区切って溜めておく。
// 届いたバイトも、文字に戻す前の形で別に溜めておく (「1バイト読む」用)。
//
// どのポートを開くか (ダイアログ・番号どうしの重複) はここでは決めない。
// それは index.js の仕事で、ここは渡されたポートを開いて読むだけ。
//
// 決め事の出典はすべて docs/xcratch-multi-serial-blocks-spec.md の「4. 受信の作り」。

/**
 * 区切り終わった行をいくつまで溜めるか。上限に達したら古い方から捨てる。
 * @type {number}
 */
const LINE_LIMIT = 1000;

/**
 * 区切りが来ないまま溜まった文字列の上限。超えたら古い方から捨てる。
 * @type {number}
 */
const PENDING_LIMIT = 4096;

/**
 * 読んでいないバイトをいくつまで溜めるか。超えたら古い方から捨てる。
 * @type {number}
 */
const BYTE_LIMIT = 4096;

/**
 * 行の区切りが「改行」であることを表す値。
 * 改行だけは LF・CR・CR+LF のどれも 1 つの行の終わりとして扱うので、文字ではなく印で持つ。
 * @type {string}
 */
export const NEWLINE = 'NEWLINE';

class SerialChannel {
    /**
     * @param {Function} onLost - 開いている途中で切れたとき (ケーブルを抜いたなど) に呼ぶ
     */
    constructor (onLost) {
        this._onLost = onLost;

        /**
         * 開いているあいだの持ち物 (ポート・リーダ・読み出しのループ)。閉じていれば null。
         *
         * 1 回開くごとに作り直す。抜けた直後にすぐ開始し直すと、古いポートの後始末と
         * 新しいポートの読み出しが重なるので、互いの持ち物を取り違えないよう分けておく。
         * @type {?{port: SerialPort, reader: ?ReadableStreamDefaultReader, loop: ?Promise, stopping: boolean}}
         */
        this._session = null;

        /** @type {string} 行の区切り。NEWLINE か、区切りに使う文字列 */
        this.delimiter = NEWLINE;

        this.clear();
    }

    /**
     * 受信済みのものをすべて捨てる。
     * @returns {void}
     */
    clear () {
        /** @type {Array<string>} 区切り終わった行。古い順 */
        this.lines = [];
        /** @type {string} 最後に区切り終わった行 */
        this.latest = '';
        /** @type {Map<string, string>} 「名前:値」の表。名前は小文字にして持つ */
        this.values = new Map();
        /** @type {Array<number>} 読んでいないバイト (0〜255)。古い順。行とは別に溜める */
        this.bytes = [];
        this._pending = '';
        this._skipLF = false;
    }

    /**
     * @returns {?SerialPort} 開いているポート。閉じていれば null
     */
    get port () {
        return this._session ? this._session.port : null;
    }

    /**
     * @returns {boolean} 開いて読んでいる最中なら true
     */
    isOpen () {
        return this._session !== null;
    }

    /**
     * ポートを開いて読み始める。失敗したら投げる (呼んだ側が状態を決める)。
     * @param {SerialPort} port - 開くポート
     * @param {number} baudRate - ボーレート
     * @returns {Promise<void>} 開き終わったら解決する
     */
    async start (port, baudRate) {
        await port.open({
            baudRate: baudRate,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
            flowControl: 'none'
        });
        this._pending = '';
        this._skipLF = false;
        // 開いた直後の最初の行は捨てる。相手が送っている途中に開くと、
        // 最初の行は途中から始まって壊れた値になるため。
        this._discardFirst = true;
        // 日本語などの文字が受信の切れ目で 2 回に分かれても化けないよう、
        // stream: true で続きを持ち越しながら文字へ戻す。
        this._decoder = new TextDecoder('utf-8');
        const session = {port: port, reader: null, loop: null, stopping: false};
        this._session = session;
        session.loop = this._readLoop(session);
    }

    /**
     * 読むのをやめてポートを閉じる。受信済みのものは残す。
     * @returns {Promise<void>} 閉じ終わったら解決する
     */
    async stop () {
        const session = this._session;
        if (!session) return;
        this._session = null;
        await this._release(session);
    }

    /**
     * そのポートが切れたことを知らせる (navigator.serial の disconnect イベントから)。
     * 開いているのが別のポートなら何もしない。
     * @param {SerialPort} port - 切れたポート
     * @returns {void}
     */
    portLost (port) {
        if (this._session && this._session.port === port) this._lost(this._session);
    }

    /**
     * 開いている途中で切れた。後始末をして知らせる。
     * disconnect イベントと読み出しのループの終わりの両方から来るので、2 回目は何もしない。
     * @param {object} session - 切れたときの持ち物
     * @returns {void}
     */
    _lost (session) {
        if (this._session !== session) return;
        this._session = null;
        this._onLost();
        this._release(session);
    }

    /**
     * 読み出しを止めてポートを閉じる。
     * @param {object} session - 閉じる持ち物
     * @returns {Promise<void>} 閉じ終わったら解決する
     */
    async _release (session) {
        session.stopping = true;
        if (session.reader) {
            try {
                await session.reader.cancel();
            } catch (e) {
                // 切れたポートでは cancel も失敗する。閉じるのが目的なので構わない
            }
        }
        if (session.loop) await session.loop;
        try {
            await session.port.close();
        } catch (e) {
            // 抜けたポートは閉じられないことがある。閉じるのが目的なので構わない
        }
    }

    /**
     * 行の区切りを変える。それより後に区切る分から効く。
     * @param {string} delimiter - NEWLINE か、区切りに使う文字列
     * @returns {void}
     */
    setDelimiter (delimiter) {
        this.delimiter = delimiter || NEWLINE;
        this._skipLF = false;
    }

    /**
     * 溜まっている行を古い方から 1 つ取り出す。
     * @returns {string} 行。無ければ空文字
     */
    takeLine () {
        return this.lines.length > 0 ? this.lines.shift() : '';
    }

    /**
     * 溜まっているバイトを古い方から 1 つ取り出す。
     * @returns {number} 0〜255。無ければ -1 (0 と見分けられるように。C の Serial.read() と同じ)
     */
    takeByte () {
        return this.bytes.length > 0 ? this.bytes.shift() : -1;
    }

    /**
     * 「名前:値」の値を引く。
     * @param {string} name - 名前。大文字と小文字は区別しない
     * @returns {string} 値。まだ届いていなければ空文字
     */
    valueOf (name) {
        const value = this.values.get(name.trim().toLowerCase());
        return typeof value === 'undefined' ? '' : value;
    }

    /**
     * 読み出しのループ。止められるか、ポートが使えなくなるまで回る。
     *
     * パリティ誤りなどの軽いエラーでは port.readable が作り直されるので、
     * リーダを取り直して続ける。抜けたときは port.readable が null になって抜ける。
     * @param {object} session - 読む持ち物
     * @returns {Promise<void>} ループが終わったら解決する
     */
    async _readLoop (session) {
        const port = session.port;
        while (port.readable && !session.stopping) {
            session.reader = port.readable.getReader();
            try {
                for (;;) {
                    const {value, done} = await session.reader.read();
                    if (done) break;
                    // 止めにかかった後に届いた分は、次に開いたポートのものと混ざるので捨てる
                    if (value && !session.stopping) {
                        this._feedBytes(value);
                        this._feed(this._decoder.decode(value, {stream: true}));
                    }
                }
            } catch (e) {
                if (!session.stopping) console.warn('[multiSerial] read error:', e);
            } finally {
                session.reader.releaseLock();
                session.reader = null;
            }
        }
        // 止めたのではないのに抜けた = 切れた
        if (!session.stopping) this._lost(session);
    }

    /**
     * 届いたバイトをそのまま溜める。行と違い、開始した直後にも捨てない
     * (バイナリには区切りが無く、どこまで捨てればよいか決められないため)。
     * @param {Uint8Array} chunk - 届いたバイト
     * @returns {void}
     */
    _feedBytes (chunk) {
        for (const byte of chunk) this.bytes.push(byte);
        if (this.bytes.length > BYTE_LIMIT) this.bytes.splice(0, this.bytes.length - BYTE_LIMIT);
    }

    /**
     * 届いた文字列を区切って溜める。
     * @param {string} text - 届いた文字列
     * @returns {void}
     */
    _feed (text) {
        const delimiter = this.delimiter;
        for (const ch of text) {
            if (delimiter === NEWLINE) {
                // CR+LF を 1 つの行の終わりにする。CR と LF が別々の受信に
                // 分かれて届いても空行ができないよう、CR の後かどうかを持ち越す。
                if (this._skipLF) {
                    this._skipLF = false;
                    if (ch === '\n') continue;
                }
                if (ch === '\r' || ch === '\n') {
                    this._skipLF = ch === '\r';
                    this._endLine();
                    continue;
                }
                this._pending += ch;
            } else {
                this._pending += ch;
                if (this._pending.endsWith(delimiter)) {
                    this._pending = this._pending.slice(0, -delimiter.length);
                    this._endLine();
                    continue;
                }
            }
            if (this._pending.length > PENDING_LIMIT) {
                this._pending = this._pending.slice(-PENDING_LIMIT);
            }
        }
    }

    /**
     * 途中の文字列を 1 行として確定する。
     * @returns {void}
     */
    _endLine () {
        // 末尾の空白は取り除く。MakeCode の「1行書き出す」は、行を 32 バイトの区切りに
        // 揃えるため末尾に空白を詰めて送るので、残すと (1行読む) = A が成り立たない。
        const line = this._pending.replace(/ +$/, '');
        this._pending = '';
        if (this._discardFirst) {
            this._discardFirst = false;
            return;
        }
        this.lines.push(line);
        if (this.lines.length > LINE_LIMIT) this.lines.shift();
        this.latest = line;
        this._parseValue(line);
    }

    /**
     * 「名前:値」「名前=値」の形なら表を更新する。最初に現れた : か = で分ける。
     * @param {string} line - 行
     * @returns {void}
     */
    _parseValue (line) {
        const at = line.search(/[:=]/);
        if (at < 0) return;
        const name = line.slice(0, at).trim().toLowerCase();
        if (name === '') return;
        this.values.set(name, line.slice(at + 1).trim());
    }
}

export default SerialChannel;
