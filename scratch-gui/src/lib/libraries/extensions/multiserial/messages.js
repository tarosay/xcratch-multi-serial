// xcratch-multi-serial / messages.js
//
// デスクトップ版の拡張機能一覧のカードに出す訳文。作りは scratch3-uiapduino の
// scratch-gui/src/lib/libraries/extensions/uiapduino/messages.js と同じ。
//
// scratch-gui の `gui.*` の訳文は上流の scratch-l10n パッケージから供給される。
// そちらは Transifex から生成される別リポジトリの成果物で、npm install のたびに
// 上書きされるため、この拡張の ID を書き足すことはできない。
// そこで訳文をここに持ち、src/reducers/locales.js で上流のメッセージへ重ねている。
//
// ここに無いロケールは index.jsx の defaultMessage (英語) が出る。
//
// 文言は Xcratch 版のカード (xcratch/src/gui/.../entry/translations.json) と同じ。
// ただし説明の後ろのブラウザの話は付けない (デスクトップ版には当てはまらない)。
//
// ブロックパレットの文字列はこのファイルではなく、
// scratch-vm/src/extensions/scratch3_multiserial/index.js が自前で持っている。

export default {
    'ja': {
        'gui.extension.multiSerial.name': 'マルチシリアル接続',
        'gui.extension.multiSerial.description': 'いくつものシリアルポートから同時にデータを受け取ります。'
    },
    'ja-Hira': {
        'gui.extension.multiSerial.name': 'マルチシリアルせつぞく',
        'gui.extension.multiSerial.description': 'いくつもの シリアルポートから どうじに データを うけとります。'
    }
};
