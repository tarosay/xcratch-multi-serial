import {addLocaleData} from 'react-intl';

import {localeData, isRtl} from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';

// --- マルチシリアル接続の訳文を重ねる -------------------------------------
//
// scratch-l10n は上流の別パッケージで、npm install のたびに上書きされるため
// `gui.extension.multiSerial.*` を直接足せない。訳文はこのリポジトリ側で持ち、
// ここで上流のメッセージへ重ねる (scratch3-uiapduino と同じ)。
//
// 同じ ID があればこちらが勝つ。
import multiSerialMessages from '../lib/libraries/extensions/multiserial/messages';

addLocaleData(localeData);

const mergeMultiSerialMessages = messagesByLocale => (
    Object.keys(messagesByLocale).reduce((merged, locale) => {
        merged[locale] = multiSerialMessages[locale] ?
            Object.assign({}, messagesByLocale[locale], multiSerialMessages[locale]) :
            messagesByLocale[locale];
        return merged;
    }, {})
);

const allMessages = mergeMultiSerialMessages(editorMessages);

// --- 画面の言語を main プロセスへ知らせる -----------------------------------
//
// ポートの選択ダイアログと、アプリを閉じるときの確認 (上流では英語の直書きの
// 「Leave Scratch?」の Stay / Leave) は main プロセスが出している。子供が使うので、
// 画面で選んでいる言語で出したい。main プロセスは画面の言語を知らないので、
// 決まったとき・変わったときにここから知らせる
// (scratch-desktop/src/main/index.js の 'multiserial-locale')。
//
// 知らせるのは SELECT_LOCALE (言語メニューで選んだとき) と initLocale()
// (起動時に OS の言語から決めたとき) の 2 か所。起動時の言語は action を通らずに
// initLocale() で決まるので、reducer だけでは起動直後の言語が伝わらない。
//
// reducer の中で副作用を起こすのは本来の書き方ではないが、言語が決まる場所が
// この 2 つしかなく、ここ以外に手を入れると上流のファイルを増やすことになる。
// 送るのは同じ値を上書きするだけなので、何度送られても害はない。
//
// require('electron') と直接書くと Web 版の scratch-gui のビルドで webpack が
// 解決しようとして失敗する。実行時にだけ引ける window.require を使う。
const notifyMainOfLocale = locale => {
    const nodeRequire = typeof window === 'undefined' ? null : window.require;
    if (!nodeRequire) return;
    try {
        nodeRequire('electron').ipcRenderer.send('multiserial-locale', locale);
    } catch (e) {
        // Electron の外 (Web 版) では何もしない
    }
};

const UPDATE_LOCALES = 'scratch-gui/locales/UPDATE_LOCALES';
const SELECT_LOCALE = 'scratch-gui/locales/SELECT_LOCALE';

const initialState = {
    isRtl: false,
    locale: 'en',
    messagesByLocale: allMessages,
    messages: allMessages.en
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SELECT_LOCALE:
        notifyMainOfLocale(action.locale);
        return Object.assign({}, state, {
            isRtl: isRtl(action.locale),
            locale: action.locale,
            messagesByLocale: state.messagesByLocale,
            messages: state.messagesByLocale[action.locale]
        });
    case UPDATE_LOCALES: {
        // 外からメッセージを差し替えられた場合もマルチシリアル接続の訳文は残す
        const messagesByLocale = mergeMultiSerialMessages(action.messagesByLocale);
        return Object.assign({}, state, {
            isRtl: state.isRtl,
            locale: state.locale,
            messagesByLocale: messagesByLocale,
            messages: messagesByLocale[state.locale]
        });
    }
    default:
        return state;
    }
};

const selectLocale = function (locale) {
    return {
        type: SELECT_LOCALE,
        locale: locale
    };
};

const setLocales = function (localesMessages) {
    return {
        type: UPDATE_LOCALES,
        messagesByLocale: localesMessages
    };
};
const initLocale = function (currentState, locale) {
    if (currentState.messagesByLocale.hasOwnProperty(locale)) {
        notifyMainOfLocale(locale);
        return Object.assign(
            {},
            currentState,
            {
                isRtl: isRtl(locale),
                locale: locale,
                messagesByLocale: currentState.messagesByLocale,
                messages: currentState.messagesByLocale[locale]
            }
        );
    }
    // don't change locale if it's not in the current messages
    return currentState;
};
export {
    reducer as default,
    initialState as localesInitialState,
    initLocale,
    selectLocale,
    setLocales
};
