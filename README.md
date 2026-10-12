# xcratch-multi-serial

[Xcratch](https://xcratch.github.io/) から、**複数のシリアルポートを同時に**扱う拡張機能です。

USB でつないだ micro:bit を何台も同時に接続し、それぞれから送られてくるデータを
Scratch のブロックで受け取ることを目的にしています。

**🚧 開発を始めたところです。まだ使えません。** 公開 URL も決まっていません。

---

## できるようにすること

- 複数のシリアルポートを、それぞれ別々に接続する
- ボーレートを指定して接続する
- 送られてきたデータを受信する
- 受信したデータから数値や値を取り出す
- 区切り文字（デリミタ）を設定する

ブロックの構成は検討中です。決まったらここに書きます。

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
