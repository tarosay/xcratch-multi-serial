/**
 * Xcratch の拡張機能一覧に出す情報。
 *
 * 作りは scratch3-uiapduino の xcratch/src/gui/lib/libraries/extensions/entry/createEntry.js と同じ。
 * Xcratch は読み込み時に setFormatMessage で自分の formatMessage を渡してくるので、
 * 名前と説明は getter にして、そのときの言語で返す。
 *
 * デスクトップ版の scratch-gui/src/lib/libraries/extensions/index.jsx に相当する。
 * 向こうは React 要素 (FormattedMessage) を返すが、こちらは文字列で作る。
 *
 * 絵は仮のもの (docs/xcratch-multi-serial-blocks-spec.md の「9. ファイル構成」)。
 * デスクトップ版と同じ scratch-gui/src/lib/libraries/extensions/multiserial/ のものを直接参照している。
 * rollup の image プラグインが data URI に変換して .mjs に埋め込むので、複製は要らない。
 */

import iconURL from '../../../../../../../scratch-gui/src/lib/libraries/extensions/multiserial/card.svg';
import insetIconURL from '../../../../../../../scratch-gui/src/lib/libraries/extensions/multiserial/inset-icon.svg';
import translations from './translations.json';
import {version as packageVersion} from '../../../../../../package.json';

const version = `v${packageVersion}`;

/**
 * 訳文を引く関数。読み込み時に Xcratch のものへ差し替わる。
 * 差し替わるまでは defaultMessage をそのまま返す。
 * @param {object} messageData - format-message へ渡す形
 * @returns {string} 現在の言語の文字列
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'multiSerial.entry.name',
            defaultMessage: 'Multi Serial Connection',
            description: 'name of the extension'
        });
    },
    // ⚠ scratch-vm/src/extensions/scratch3_multiserial/index.js の EXTENSION_ID と同じ値。
    //   作品に書き込まれるので、公開したら二度と変えられない。
    extensionId: 'multiSerial',
    // ⚠ 同じく EXTENSION_URL と同じ値。公開したら二度と変えられない。
    extensionURL: 'https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs',
    collaborator: 'tarosay',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        // 対応ブラウザを書いておくのは、Safari などでも拡張は追加できてブロックも並び、
        // 開始のときに初めて使えないと分かるため (お手本の createEntry.js と同じ理由)。
        return `${formatMessage({
            id: 'multiSerial.entry.description',
            defaultMessage: 'Receive data from several serial ports at once. Chrome, Edge or Firefox is required.',
            description: 'description of the extension'
        })} (${version})`;
    },
    tags: ['hardware', 'serial'],
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    // 接続モーダルは使わない。開始はブロックだけで行う
    // (仕様書の「ステータスボタン『！』と接続モーダルは使わない」)。
    launchPeripheralConnectionFlow: false,
    useAutoScan: false,
    helpLink: 'https://github.com/tarosay/xcratch-multi-serial#readme',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;
