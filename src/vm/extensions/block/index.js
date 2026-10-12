// xcratch-multi-serial / index.js
//
// ブロックの定義。仕様は docs/xcratch-multi-serial-blocks-spec.md。
// 作りは scratch3-uiapduino (scratch-vm/src/extensions/scratch3_uiapduino/index.js) に倣っている。
//
// 「シリアル通信 1」〜「シリアル通信 8」の 8 つを持つ。1 つぶんの通信と受信の溜めは
// serialChannel.js。ここではダイアログを出してポートを番号に割り当てることと、
// ブロックの引数の読み替えだけをする。

import ArgumentType from '../../extension-support/argument-type';
import BlockType from '../../extension-support/block-type';
import Cast from '../../util/cast';
import defaultFormatMessage from 'format-message';

import SerialChannel, {NEWLINE} from './serialChannel';
import blockIconSvgURI from './block-icon.svg';
import menuIconSvgURI from './menu-icon.svg';

/**
 * rollup の image プラグインが作る SVG の data URI を base64 の形に直す。
 *
 * プラグインは SVG を `data:image/svg+xml,%3csvg xmlns='...' width='40' ...` のように
 * 読める形のまま埋め込む。ところが scratch-blocks は、左のカテゴリ一覧のアイコンを
 * `style.backgroundImage = 'url(' + iconURI + ')'` と引用符なしで CSS に書く
 * (scratch-blocks の core/toolbox.js)。URI の中の空白と ' で CSS が壊れ、
 * アイコンが描かれずに白い丸だけが残った (2026-10-13 に実機で確認)。
 * base64 なら空白も引用符も入らない。
 *
 * SVG は ASCII だけで書いてあるので、btoa にそのまま渡せる。
 * @param {string} uri - プラグインが作った data URI
 * @returns {string} base64 の data URI
 */
const toBase64URI = uri => `data:image/svg+xml;base64,${btoa(decodeURIComponent(uri.slice(uri.indexOf(',') + 1)))}`;

const blockIconURI = toBase64URI(blockIconSvgURI);
const menuIconURI = toBase64URI(menuIconSvgURI);

/**
 * 拡張 ID。entry の extensionId と同じ値。
 *
 * ⚠ 作品に書き込まれるので、公開したら二度と変えられない。
 *   ハットブロックの opcode (`multiSerial_whenReceived`) の頭にも付く。
 * @type {string}
 */
const EXTENSION_ID = 'multiSerial';

/**
 * このモジュールの公開 URL。entry の extensionURL と同じ値。
 *
 * ⚠ 公開したら二度と変えられない。Xcratch は作品にこの URL を書き込み、
 *   次に開くときここから読み直す。変えると、変える前に保存された作品が開けなくなる。
 * @type {string}
 */
const EXTENSION_URL = 'https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs';

/**
 * 同時に扱えるシリアル通信の数。番号は 1 からこの数まで。
 * @type {number}
 */
const CHANNEL_COUNT = 8;

/**
 * ハットブロックを起こしに行く間隔 (ms)。Scratch の 1 フレーム (約 33ms) と同じ程度。
 * 見るのは手元に溜まった行だけなので、通信は起きない。
 * @type {number}
 */
const HAT_INTERVAL_MS = 33;

/**
 * ブロックの色 [本体, 入力欄・メニュー, 枠線]。
 *
 * 本体の #5C6E80 は打ち合わせで決めた色。残りの 2 つは、scratch-vm の既定の緑
 * (#0FBD8C → #0DA57A → #0B8E69) と同じ比率 (0.873 倍・0.751 倍) で暗くした。
 * @type {Array<string>}
 */
const COLORS = ['#5C6E80', '#506070', '#455360'];

/**
 * ボーレートのメニュー。よく使うものを並べているだけで、変数から任意の値も渡せる。
 * @type {Array<string>}
 */
const BAUD_ITEMS = ['1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200'];

/**
 * 区切りのメニューの値と、その中身。NEWLINE は serialChannel.js が特別に扱う。
 * メニューに無い値 (はめ込んだ変数など) は、その文字列をそのまま区切りに使う。
 * @type {object}
 */
const DELIMITER_CHARS = {
    NEWLINE: NEWLINE,
    COMMA: ',',
    TAB: '\t',
    SPACE: ' ',
    COLON: ':',
    SEMICOLON: ';'
};

/**
 * 表示中の言語を知るための formatMessage。
 * Xcratch は読み込み時に自分の formatMessage を渡してくるので、来たら差し替える
 * (お手本の index.js と同じ。拡張の中の format-message は GUI のものと別物なので)。
 * @type {Function}
 */
let formatMessage = defaultFormatMessage;

/**
 * 文言。キーごとに ja / ja-Hira / en を持つ。
 * @type {object}
 */
const message = {
    // カテゴリの見出し。entry の訳文 (translations.json) と同じ文言
    extensionName: {
        'ja': 'マルチシリアル接続',
        'ja-Hira': 'マルチシリアルせつぞく',
        'en': 'Multi Serial Connection'
    },
    openChannel: {
        'ja': 'シリアル通信 [CH] を ボーレート [BAUD] で開始する',
        'ja-Hira': 'シリアルつうしん [CH] を ボーレート [BAUD] で かいしする',
        'en': 'start serial [CH] at [BAUD] baud'
    },
    closeChannel: {
        'ja': 'シリアル通信 [CH] を終了する',
        'ja-Hira': 'シリアルつうしん [CH] を しゅうりょうする',
        'en': 'stop serial [CH]'
    },
    isOpen: {
        'ja': 'シリアル通信 [CH] は開始されている',
        'ja-Hira': 'シリアルつうしん [CH] は かいし されている',
        'en': 'serial [CH] started?'
    },
    channelState: {
        'ja': 'シリアル通信 [CH] の状態',
        'ja-Hira': 'シリアルつうしん [CH] の じょうたい',
        'en': 'state of serial [CH]'
    },
    whenReceived: {
        'ja': 'シリアル通信 [CH] で受け取ったとき',
        'ja-Hira': 'シリアルつうしん [CH] で うけとったとき',
        'en': 'when serial [CH] receives a line'
    },
    readLine: {
        'ja': 'シリアル通信 [CH] から1行読む',
        'ja-Hira': 'シリアルつうしん [CH] から 1ぎょう よむ',
        'en': 'read a line from serial [CH]'
    },
    latestLine: {
        'ja': 'シリアル通信 [CH] の最新の行',
        'ja-Hira': 'シリアルつうしん [CH] の さいしんの ぎょう',
        'en': 'latest line of serial [CH]'
    },
    namedValue: {
        'ja': 'シリアル通信 [CH] の [NAME] の値',
        'ja-Hira': 'シリアルつうしん [CH] の [NAME] の あたい',
        'en': 'value of [NAME] from serial [CH]'
    },
    hasData: {
        'ja': 'シリアル通信 [CH] に受信データがある',
        'ja-Hira': 'シリアルつうしん [CH] に じゅしんデータが ある',
        'en': 'serial [CH] has data?'
    },
    clearData: {
        'ja': 'シリアル通信 [CH] の受信データを捨てる',
        'ja-Hira': 'シリアルつうしん [CH] の じゅしんデータを すてる',
        'en': 'clear received data of serial [CH]'
    },
    setLineDelimiter: {
        'ja': 'シリアル通信 [CH] の行の区切りを [DELIM] にする',
        'ja-Hira': 'シリアルつうしん [CH] の ぎょうの くぎりを [DELIM] にする',
        'en': 'set line delimiter of serial [CH] to [DELIM]'
    },
    itemOf: {
        'ja': '[TEXT] を [DELIM] で区切った [N] 番目',
        'ja-Hira': '[TEXT] を [DELIM] で くぎった [N] ばんめ',
        'en': 'item [N] of [TEXT] split by [DELIM]'
    },
    itemCount: {
        'ja': '[TEXT] を [DELIM] で区切った項目の数',
        'ja-Hira': '[TEXT] を [DELIM] で くぎった こうもくの かず',
        'en': 'number of items in [TEXT] split by [DELIM]'
    },
    numberIn: {
        'ja': '[TEXT] の中の数値',
        'ja-Hira': '[TEXT] の なかの すうち',
        'en': 'number in [TEXT]'
    },
    splitToList: {
        'ja': '[TEXT] を [DELIM] で区切ってリスト [LIST] に入れる',
        'ja-Hira': '[TEXT] を [DELIM] で くぎって リスト [LIST] に いれる',
        'en': 'split [TEXT] by [DELIM] into list [LIST]'
    },
    // ── 区切りのメニュー ──
    delimNewline: {'ja': '改行', 'ja-Hira': 'かいぎょう', 'en': 'newline'},
    delimComma: {'ja': 'カンマ', 'ja-Hira': 'カンマ', 'en': 'comma'},
    delimTab: {'ja': 'タブ', 'ja-Hira': 'タブ', 'en': 'tab'},
    delimSpace: {'ja': 'スペース', 'ja-Hira': 'スペース', 'en': 'space'},
    delimColon: {'ja': 'コロン', 'ja-Hira': 'コロン', 'en': 'colon'},
    delimSemicolon: {'ja': 'セミコロン', 'ja-Hira': 'セミコロン', 'en': 'semicolon'},
    // 作品にリストが 1 つも無いとき、メニューに出す案内
    listNone: {'ja': '(リストがありません)', 'ja-Hira': '(リストが ありません)', 'en': '(no list)'},
    // ── 状態 (仕様書「3. 開始・終了の動き」の表) ──
    stateNotStarted: {'ja': '開始していません', 'ja-Hira': 'かいし していません', 'en': 'not started'},
    stateChoosing: {'ja': 'ポートを選んでいます', 'ja-Hira': 'ポートを えらんでいます', 'en': 'choosing a port'},
    stateReceiving: {'ja': '受信中', 'ja-Hira': 'じゅしんちゅう', 'en': 'receiving'},
    stateCancelled: {'ja': '選ばれませんでした', 'ja-Hira': 'えらばれませんでした', 'en': 'no port was chosen'},
    stateNeedClick: {
        'ja': 'ブロックをクリックしてください',
        'ja-Hira': 'ブロックを クリックして ください',
        'en': 'click the block to start'
    },
    stateDuplicate: {
        'ja': 'ほかの番号で使っています',
        'ja-Hira': 'ほかの ばんごうで つかっています',
        'en': 'in use by another number'
    },
    stateOpenFailed: {'ja': '開けませんでした', 'ja-Hira': 'ひらけませんでした', 'en': 'could not open the port'},
    stateDisconnected: {'ja': '切れました', 'ja-Hira': 'きれました', 'en': 'disconnected'},
    stateUnsupported: {
        'ja': 'このブラウザでは使えません',
        'ja-Hira': 'このブラウザでは つかえません',
        'en': 'not supported in this browser'
    }
};

/**
 * 状態の値と、その文言のキー。
 * @type {object}
 */
const STATE_TEXT = {
    notStarted: 'stateNotStarted',
    choosing: 'stateChoosing',
    receiving: 'stateReceiving',
    cancelled: 'stateCancelled',
    needClick: 'stateNeedClick',
    duplicate: 'stateDuplicate',
    openFailed: 'stateOpenFailed',
    disconnected: 'stateDisconnected',
    unsupported: 'stateUnsupported'
};

class Scratch3MultiSerial {
    /**
     * Xcratch がモジュール読み込み時に呼ぶ。GUI の formatMessage を受け取る。
     * @param {Function} formatter - GUI 側の formatMessage
     */
    static set formatMessage (formatter) {
        if (formatter) formatMessage = formatter;
    }

    /**
     * Xcratch がモジュール読み込み時に、実際に読み込んだ URL を書き込む。
     * getInfo() で返すと、作品に「どこから読めばよいか」が残る。
     * @param {string} url - このモジュールの URL
     */
    static set extensionURL (url) {
        if (url) this._extensionURL = url;
    }

    /**
     * @returns {string} このモジュールの URL。書き込まれていなければ公開 URL
     */
    static get extensionURL () {
        return this._extensionURL || EXTENSION_URL;
    }

    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Xcratch の runtime は自分の formatMessage を持っている。
        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }

        /** @type {string} 文言の言語。getInfo() で決まる */
        this.locale = 'en';

        /**
         * シリアル通信 1〜8。添字は番号 - 1。
         * @type {Array<SerialChannel>}
         */
        this.channels = [];
        /**
         * 番号ごとの状態 (STATE_TEXT のキー)。
         * @type {Array<string>}
         */
        this.states = [];
        /**
         * 番号ごとに、開始の処理 (ダイアログ〜開く) をしている最中か。
         * 同じ番号の開始が重なると、どちらのポートが残るか分からなくなるので弾く。
         * @type {Array<boolean>}
         */
        this.busy = [];
        for (let i = 0; i < CHANNEL_COUNT; i++) {
            this.channels.push(new SerialChannel(() => {
                this.states[i] = 'disconnected';
            }));
            this.states.push('notStarted');
            this.busy.push(false);
        }

        // ケーブルを抜いたことを知る。イベントは抜けたポートから navigator.serial へ届き、
        // target が抜けたポートになる。
        if (typeof navigator !== 'undefined' && navigator.serial) {
            navigator.serial.addEventListener('disconnect', event => {
                this.channels.forEach(channel => channel.portLost(event.target));
            });
        }

        // ハットブロックは isEdgeActivated: false なので、VM は見に来ない。
        // 読まれていない行がある番号のハットを、ここから起こす。
        if (typeof setInterval === 'function') {
            setInterval(() => this._fireHats(), HAT_INTERVAL_MS);
        }
    }

    _getText (key) {
        return message[key][this.locale] || message[key].en;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        const currentLocale = formatMessage.setup().locale;
        this.locale = currentLocale in message.openChannel ? currentLocale : 'en';

        const channelArg = {
            type: ArgumentType.STRING,
            defaultValue: '1',
            menu: 'CH'
        };

        return {
            id: EXTENSION_ID,
            // Xcratch が作品に保存する読み込み元。
            extensionURL: this.constructor.extensionURL,
            name: this._getText('extensionName'),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            color1: COLORS[0],
            color2: COLORS[1],
            color3: COLORS[2],
            // ステータスボタン「！」は出さない。開始はブロックだけで行う
            // (仕様書「ステータスボタン『！』と接続モーダルは使わない」)。
            showStatusButton: false,
            blocks: [
                {
                    opcode: 'openChannel',
                    text: this._getText('openChannel'),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CH: channelArg,
                        BAUD: {
                            type: ArgumentType.STRING,
                            defaultValue: '115200',
                            menu: 'BAUD'
                        }
                    }
                },
                {
                    opcode: 'closeChannel',
                    text: this._getText('closeChannel'),
                    blockType: BlockType.COMMAND,
                    arguments: {CH: channelArg}
                },
                {
                    opcode: 'isOpen',
                    text: this._getText('isOpen'),
                    blockType: BlockType.BOOLEAN,
                    arguments: {CH: channelArg}
                },
                {
                    opcode: 'channelState',
                    text: this._getText('channelState'),
                    blockType: BlockType.REPORTER,
                    arguments: {CH: channelArg}
                },
                '---',
                {
                    // isEdgeActivated: false なので VM は毎フレーム見に来ない。
                    // 起こすのは _fireHats() だけ。
                    //
                    // ⚠ 番号のメニューは acceptReporters: false (CH_FIELD) でなければならない。
                    //   true にすると入力欄になり、startHats() の照合 (フィールドしか見ない) が効かない。
                    opcode: 'whenReceived',
                    text: this._getText('whenReceived'),
                    blockType: BlockType.HAT,
                    isEdgeActivated: false,
                    arguments: {
                        CH: {
                            type: ArgumentType.STRING,
                            defaultValue: '1',
                            menu: 'CH_FIELD'
                        }
                    }
                },
                {
                    opcode: 'readLine',
                    text: this._getText('readLine'),
                    blockType: BlockType.REPORTER,
                    arguments: {CH: channelArg}
                },
                {
                    opcode: 'latestLine',
                    text: this._getText('latestLine'),
                    blockType: BlockType.REPORTER,
                    arguments: {CH: channelArg}
                },
                {
                    opcode: 'namedValue',
                    text: this._getText('namedValue'),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        CH: channelArg,
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'x'
                        }
                    }
                },
                {
                    opcode: 'hasData',
                    text: this._getText('hasData'),
                    blockType: BlockType.BOOLEAN,
                    arguments: {CH: channelArg}
                },
                {
                    opcode: 'clearData',
                    text: this._getText('clearData'),
                    blockType: BlockType.COMMAND,
                    arguments: {CH: channelArg}
                },
                {
                    opcode: 'setLineDelimiter',
                    text: this._getText('setLineDelimiter'),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CH: channelArg,
                        DELIM: {
                            type: ArgumentType.STRING,
                            defaultValue: 'NEWLINE',
                            menu: 'LINE_DELIM'
                        }
                    }
                },
                '---',
                {
                    opcode: 'itemOf',
                    text: this._getText('itemOf'),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        TEXT: {type: ArgumentType.STRING, defaultValue: '12,34,56'},
                        DELIM: {type: ArgumentType.STRING, defaultValue: 'COMMA', menu: 'ITEM_DELIM'},
                        N: {type: ArgumentType.NUMBER, defaultValue: 2}
                    }
                },
                {
                    opcode: 'itemCount',
                    text: this._getText('itemCount'),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        TEXT: {type: ArgumentType.STRING, defaultValue: '12,34,56'},
                        DELIM: {type: ArgumentType.STRING, defaultValue: 'COMMA', menu: 'ITEM_DELIM'}
                    }
                },
                {
                    opcode: 'numberIn',
                    text: this._getText('numberIn'),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        TEXT: {type: ArgumentType.STRING, defaultValue: 'temp=23.5'}
                    }
                },
                {
                    opcode: 'splitToList',
                    text: this._getText('splitToList'),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {type: ArgumentType.STRING, defaultValue: '12,34,56'},
                        DELIM: {type: ArgumentType.STRING, defaultValue: 'COMMA', menu: 'ITEM_DELIM'},
                        LIST: {
                            type: ArgumentType.STRING,
                            // ⚠ 既定値を空にしてはいけない。scratch-vm は defaultValue が
                            //   空だと <field> ごと出さず、ドロップダウンが消える (お手本の
                            //   serialWriteList と同じ)。今ある先頭のリストを既定にする。
                            defaultValue: this.getListItems()[0].value,
                            menu: 'LIST'
                        }
                    }
                }
            ],
            menus: {
                CH: {
                    acceptReporters: true,
                    items: this._channelItems()
                },
                // ハット専用。中身は CH と同じだが acceptReporters を false にしてある。
                // 理由は whenReceived のコメント。
                CH_FIELD: {
                    acceptReporters: false,
                    items: this._channelItems()
                },
                BAUD: {
                    acceptReporters: true,
                    items: BAUD_ITEMS
                },
                LINE_DELIM: {
                    acceptReporters: true,
                    items: [
                        {text: this._getText('delimNewline'), value: 'NEWLINE'},
                        {text: this._getText('delimComma'), value: 'COMMA'},
                        {text: this._getText('delimTab'), value: 'TAB'},
                        {text: this._getText('delimSpace'), value: 'SPACE'},
                        {text: this._getText('delimSemicolon'), value: 'SEMICOLON'}
                    ]
                },
                ITEM_DELIM: {
                    acceptReporters: true,
                    items: [
                        {text: this._getText('delimComma'), value: 'COMMA'},
                        {text: this._getText('delimSpace'), value: 'SPACE'},
                        {text: this._getText('delimTab'), value: 'TAB'},
                        {text: this._getText('delimColon'), value: 'COLON'},
                        {text: this._getText('delimSemicolon'), value: 'SEMICOLON'}
                    ]
                },
                // 作品にあるリストの一覧。作るたびに変わるので関数で作る。
                LIST: {
                    acceptReporters: false,
                    items: 'getListItems'
                }
            }
        };
    }

    /**
     * @returns {Array<string>} 番号のメニュー ('1'〜'8')
     */
    _channelItems () {
        const items = [];
        for (let i = 1; i <= CHANNEL_COUNT; i++) items.push(String(i));
        return items;
    }

    /**
     * 作品にあるリストの一覧。ステージとスプライトの両方から集める。
     * メニューは空にできないので、1 つも無ければ案内を 1 行だけ出す。
     * @returns {Array<{text: string, value: string}>} メニュー項目
     */
    getListItems () {
        const names = new Set();
        for (const target of this.runtime.targets) {
            if (!target.isOriginal) continue;
            for (const id of Object.keys(target.variables || {})) {
                const variable = target.variables[id];
                if (variable.type === 'list') names.add(variable.name);
            }
        }
        if (names.size === 0) {
            // 値を空にしないこと。空だとブロックのフィールドが出ない。
            return [{text: this._getText('listNone'), value: '-'}];
        }
        return Array.from(names).sort()
            .map(name => ({text: name, value: name}));
    }

    // ── 引数の読み替え ──────────────────────────────────────────────────

    /**
     * 番号の引数から、その番号の添字を得る。
     *
     * 変数から渡すブロックでも 1〜8 に揃える (仕様書「2. ブロック」の引数)。
     * ハットは 1〜8 しか選べないので、ほかのブロックだけ 9 以上を受け付けると混乱するため。
     * @param {*} value - 番号の引数
     * @returns {number} 添字 (0〜7)。範囲外なら -1
     */
    _index (value) {
        const n = Cast.toNumber(value);
        if (!Number.isInteger(n) || n < 1 || n > CHANNEL_COUNT) return -1;
        return n - 1;
    }

    /**
     * 区切りの引数を、区切りに使う文字列にする。
     * @param {*} value - メニューの値か、はめ込まれた文字列
     * @param {string} fallback - 空のときに使う区切り
     * @returns {string} 区切り (NEWLINE か文字列)
     */
    _delimiter (value, fallback) {
        const text = Cast.toString(value);
        if (Object.prototype.hasOwnProperty.call(DELIMITER_CHARS, text)) return DELIMITER_CHARS[text];
        return text === '' ? fallback : text;
    }

    /**
     * 文字列を項目に分ける (仕様書「5. 取り出しの作り」)。
     *
     * 区切りがスペースのときだけ、続いた空白を 1 つとみなす。
     * それ以外では空の項目も 1 つと数える (`1,,3` は 3 項目)。
     * 各項目の前後の空白は除く。空白だけの文字列は 0 項目。
     * @param {*} text - 分ける文字列
     * @param {*} delimiterArg - 区切りの引数
     * @returns {Array<string>} 項目
     */
    _split (text, delimiterArg) {
        const source = Cast.toString(text);
        if (source.trim() === '') return [];
        const delimiter = this._delimiter(delimiterArg, ',');
        if (delimiter === ' ') return source.trim().split(/ +/);
        // 項目の区切りに改行は選べないが、念のため改行どれでも区切れるようにしておく
        const parts = delimiter === NEWLINE ? source.split(/\r\n|\r|\n/) : source.split(delimiter);
        return parts.map(item => item.trim());
    }

    // ── 開始・終了 ──────────────────────────────────────────────────────

    /**
     * ダイアログでポートを選ばせ、この番号に割り当てて開く (仕様書「3. 開始・終了の動き」)。
     *
     * ⚠ requestPort() より前に await を置かないこと。ダイアログは利用者の操作の直後
     *   (transient activation) にしか出せないので、待つとその間に切れるおそれがある。
     * @param {object} args - CH, BAUD
     * @returns {Promise<void>|undefined} 終わったら解決する
     */
    openChannel (args) {
        const index = this._index(args.CH);
        if (index < 0 || this.busy[index]) return;
        const channel = this.channels[index];
        // 受信中の番号では、キャンセルなどの結果で状態を変えない。
        // 押し間違えてキャンセルしただけで、続いている受信の表示が変わらないようにするため。
        const setState = state => {
            if (!channel.isOpen()) this.states[index] = state;
        };

        if (typeof navigator === 'undefined' || !navigator.serial) {
            setState('unsupported');
            return;
        }
        const baudRate = Cast.toNumber(args.BAUD);
        if (!Number.isInteger(baudRate) || baudRate <= 0) {
            console.warn(`[multiSerial] invalid baud rate: ${args.BAUD}`);
            setState('openFailed');
            return;
        }
        this.busy[index] = true;
        setState('choosing');
        return navigator.serial.requestPort()
            .then(
                port => this._assign(index, port, baudRate),
                error => {
                    // キャンセルは NotFoundError。緑の旗から実行したなど、
                    // 利用者の操作の直後でないときは SecurityError。
                    if (error && error.name === 'NotFoundError') {
                        setState('cancelled');
                    } else {
                        console.warn('[multiSerial] requestPort failed:', error);
                        setState('needClick');
                    }
                }
            )
            .catch(error => {
                // ここで拾わないと busy が戻らず、その番号を二度と開始できなくなる
                console.warn('[multiSerial] openChannel failed:', error);
            })
            .then(() => {
                this.busy[index] = false;
            });
    }

    /**
     * 選ばれたポートをこの番号で開く。
     * @param {number} index - 添字
     * @param {SerialPort} port - 選ばれたポート
     * @param {number} baudRate - ボーレート
     * @returns {Promise<void>} 終わったら解決する
     */
    async _assign (index, port, baudRate) {
        const channel = this.channels[index];
        const usedElsewhere = this.channels.some((other, i) => i !== index && other.port === port);
        if (usedElsewhere) {
            console.warn(`[multiSerial] the port is already used by another number (serial ${index + 1})`);
            // 受信中なら何も変えない (状態も「受信中」のまま)
            if (!channel.isOpen()) this.states[index] = 'duplicate';
            return;
        }
        // 古いポートは、新しいポートが選ばれてから閉じる。同じポートを選び直したときも
        // 閉じて開き直す (ボーレートを変えるには開き直すしかないため)。
        await channel.stop();
        try {
            await channel.start(port, baudRate);
            this.states[index] = 'receiving';
        } catch (error) {
            // ほかのアプリ (MakeCode やシリアルモニタなど) が使っていると、ここで失敗する
            console.warn(`[multiSerial] could not open the port (serial ${index + 1}):`, error);
            this.states[index] = 'openFailed';
        }
    }

    closeChannel (args) {
        const index = this._index(args.CH);
        if (index < 0) return;
        return this.channels[index].stop().then(() => {
            this.states[index] = 'notStarted';
        });
    }

    isOpen (args) {
        const index = this._index(args.CH);
        return index >= 0 && this.channels[index].isOpen();
    }

    channelState (args) {
        const index = this._index(args.CH);
        if (index < 0) return '';
        return this._getText(STATE_TEXT[this.states[index]]);
    }

    // ── 受信 ────────────────────────────────────────────────────────────

    /**
     * 読まれていない行がある番号のハットを起こす。
     * startHats() は同じハットのスクリプトが動いている間は起こし直さないので、重ならない。
     * @returns {void}
     */
    _fireHats () {
        this.channels.forEach((channel, i) => {
            if (channel.lines.length === 0) return;
            this.runtime.startHats(`${EXTENSION_ID}_whenReceived`, {CH: String(i + 1)});
        });
    }

    /**
     * ハットブロック。起こすのは _fireHats() だけで、番号の照合も済んでいる。
     * @returns {boolean} 常に true
     */
    whenReceived () {
        return true;
    }

    readLine (args) {
        const index = this._index(args.CH);
        return index < 0 ? '' : this.channels[index].takeLine();
    }

    latestLine (args) {
        const index = this._index(args.CH);
        return index < 0 ? '' : this.channels[index].latest;
    }

    namedValue (args) {
        const index = this._index(args.CH);
        return index < 0 ? '' : this.channels[index].valueOf(Cast.toString(args.NAME));
    }

    hasData (args) {
        const index = this._index(args.CH);
        return index >= 0 && this.channels[index].lines.length > 0;
    }

    clearData (args) {
        const index = this._index(args.CH);
        if (index >= 0) this.channels[index].clear();
    }

    setLineDelimiter (args) {
        const index = this._index(args.CH);
        if (index >= 0) this.channels[index].setDelimiter(this._delimiter(args.DELIM, NEWLINE));
    }

    // ── 取り出し ────────────────────────────────────────────────────────

    itemOf (args) {
        const items = this._split(args.TEXT, args.DELIM);
        const at = Cast.toListIndex(args.N, items.length, false);
        return at === Cast.LIST_INVALID ? '' : items[at - 1];
    }

    itemCount (args) {
        return this._split(args.TEXT, args.DELIM).length;
    }

    numberIn (args) {
        const found = Cast.toString(args.TEXT).match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/);
        return found ? Number(found[0]) : '';
    }

    splitToList (args, util) {
        const list = this._findList(Cast.toString(args.LIST), util);
        if (!list) return;
        list.value = this._split(args.TEXT, args.DELIM);
        // リストのモニター (ステージの表示) に、中身が変わったことを知らせる。
        // scratch-vm の src/blocks/scratch3_data.js と同じやり方。
        list._monitorUpToDate = false;
    }

    /**
     * 名前からリストを探す。スプライト側を先に見る。
     * @param {string} name - リスト名
     * @param {object} util - ブロックの実行文脈 (target を持つ)
     * @returns {?object} 見つかったリストの変数。無ければ null
     */
    _findList (name, util) {
        const targets = [];
        if (util && util.target) targets.push(util.target);
        const stage = this.runtime.getTargetForStage();
        if (stage) targets.push(stage);
        for (const target of targets) {
            for (const id of Object.keys(target.variables || {})) {
                const variable = target.variables[id];
                if (variable.type === 'list' && variable.name === name) return variable;
            }
        }
        return null;
    }
}

// rollup の multi-entry が entry と束ねるとき、名前付き export しか拾えない
export {Scratch3MultiSerial as default, Scratch3MultiSerial as blockClass};
