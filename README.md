# xcratch-multi-serial

[Xcratch](https://xcratch.github.io/) から、**複数のシリアルポートを同時に**扱う拡張機能です。

USB でつないだ micro:bit などを何台も同時に接続し、それぞれから送られてくるデータを
Scratch のブロックで受け取れます。

micro:bit 2 台を同時につなぎ、それぞれから受信できることを確認しています
（3 台以上は確かめていません。番号は 8 まで使えます）。

---

## 使い方

Chrome か Edge で [Xcratch エディタ](https://xcratch.github.io/editor/) を開き、
「拡張機能を追加」→「Extension Loader」に次の URL を入れます。

```
https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs
```

次のリンクから開くと、最初から読み込まれた状態になります。

```
https://xcratch.github.io/editor/?extension=https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs
```

### 例: micro:bit 2 台から受け取る

```
緑の旗が押されたとき
  シリアル通信 (1) を ボーレート (115200) で開始する
  シリアル通信 (2) を ボーレート (115200) で開始する

シリアル通信 [1] で受け取ったとき
  変数1 を ((シリアル通信 (1) の最新の行) の中の数値) にする
  シリアル通信 (1) の受信データを捨てる
```

1. 緑の旗を押すと、ポートの選択ダイアログが出ます。1 台目の micro:bit を選びます
2. 2 つ目の「開始する」は「画面をクリックしてください」で待っています。画面のどこかをクリックすると、
   2 台目のダイアログが出ます
3. `シリアル通信 (1) の状態` を「言う」などで表示すると、うまくいかない理由が分かります

micro:bit の MakeCode 側は `シリアル通信 1行書き出す` か `シリアル通信 名前と値を書き出す` で送ります。
`名前と値を書き出す` で送った値は、`シリアル通信 (1) の [x] の値` で名前を指定して読めます。
送る間隔は 50 ミリ秒以上（1 秒に 20 回以下）を目安にしてください。

## ブロック

| 種類 | ブロック |
|---|---|
| 開始・終了 | 開始する（ボーレート指定）／ 終了する ／ 開始されている ／ 状態 |
| 受信 | 受け取ったとき ／ 1行読む ／ 最新の行 ／ [x] の値 ／ 受信データがある ／ 受信データを捨てる ／ 行の区切りを [ ] にする |
| 取り出し | 区切った [ ] 番目 ／ 区切った項目の数 ／ 中の数値 ／ 区切ってリストに入れる |

詳しい動きは [`docs/xcratch-multi-serial-blocks-spec.md`](docs/xcratch-multi-serial-blocks-spec.md) にあります。

---

## 必要なもの

- **Chrome か Edge。** シリアルポートとの通信に Web Serial API を使います。
  Firefox と Safari には Web Serial API がありません。

---

## ブラウザで動かすことによる制約

Web Serial API の仕様によるもので、拡張機能の作りでは避けられません。

**ポートを `COM5` のような名前で指定することはできません。** ブラウザは COM ポートの名前を
ページに渡さないためです。ポートはブラウザが出す選択ダイアログで選び、拡張機能の中では
「シリアル通信 1」「シリアル通信 2」のような番号で区別します。この番号は COM の番号とは関係ありません。

**ポートの選択ダイアログは、クリックの直後にしか出せません。1 回のクリックで出せるのは 1 つだけです。**
ブラウザが「利用者の操作があったとき」にしかダイアログを開かせないためです。

そこで、ダイアログを出せなかった「開始する」は、そこで待つようにしてあります。
`シリアル通信 (1) の状態` は「画面をクリックしてください」になり、画面のどこかをクリックすると
ダイアログが出ます。緑の旗の下に「開始する」を 2 つ置いたときは
「旗 → 1 つ目を選ぶ → 画面をクリック → 2 つ目を選ぶ」の順になります。

**受信中の番号で「開始する」が動いても、何もしません。** ボーレートを変えるときは、
先に「終了する」を動かしてください。

**ページを読み込み直すと、ポートは閉じます。** 接続し直す必要があります。

---

## 困ったとき

**micro:bit をつないだまま Xcratch を閉じると、しばらくして micro:bit からの送信が止まることがあります。**
micro:bit の電源を切って入れ直すと戻ります（確認済み）。
原因は micro:bit 側にあると考えていますが、確かめられていません。

**MakeCode の `シリアル通信` で日本語を送ると、文字化けします。** 英数字で送ってください。
たとえば「こんにちは」は `S�kao` になります（各文字の一部しか送られないため）。

---

## 開発

ブロックの仕様は [`docs/xcratch-multi-serial-blocks-spec.md`](docs/xcratch-multi-serial-blocks-spec.md) にあります。
作りは [scratch3-uiapduino](https://github.com/tarosay/scratch3-uiapduino) の Xcratch 版に倣っています。

### ビルド

Node.js v20 以降が要ります（rollup 4 の都合）。

```powershell
npm install
npm run setup-dev -- <scratch-vm を clone した場所>
npm run build
```

`setup-dev` は、scratch-vm から `ArgumentType` / `BlockType` / `Cast` を借りるためのリンクを
`src/vm/` の下に張ります。最初に一度だけ実行します。

`npm run build` は `dist/multiserial.mjs` を作り、それを `docs/` へ置きます。
**`docs/` は GitHub Pages の公開元なので、試しにビルドしただけでも公開物が更新されます。**
公開したくない変更はコミットしないでください。

### 手元で試す

`dist` を CORS 付きで配ります。**配るのは `dist` だけにし、絶対パスで渡してください。**

```powershell
npx --yes live-server "D:\git\github\xcratch-multi-serial\dist" --host=127.0.0.1 --port=5500 --cors --no-browser
```

Chrome か Edge で次の URL を開きます。

```
https://xcratch.github.io/editor/?extension=http://127.0.0.1:5500/multiserial.mjs
```

---

## ライセンス

[MIT License](LICENSE)
