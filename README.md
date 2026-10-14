# xcratch-multi-serial

Scratch 3.0 から、**複数のシリアルポートを同時に**扱う拡張機能です。

USB でつないだ micro:bit などを何台も同時に接続し、それぞれから送られてくるデータを
Scratch のブロックで受け取れます。

micro:bit 2 台を同時につなぎ、それぞれから受信できることを確認しています
（3 台以上は確かめていません。番号は 8 まで使えます）。

**使い方は 2 通りあります。ブロックの実装は同じものを共有しています。**

| | 使い方 | 中身 |
|---|---|---|
| **[Xcratch](https://xcratch.github.io/) 版** | 下の URL を「拡張機能を追加 → Extension Loader」に入れる | インストール不要。Chrome・Edge・Firefox のどれかが要る |
| **デスクトップ版** | インストーラ `Scratch-MultiSerial-<版>-Setup.exe` を入れる | Scratch Desktop に組み込んだもの（Windows）。アプリ名は「Scratch Multi Serial」 |

デスクトップ版は、公式の Scratch Desktop とは別のアプリとして入ります（上書きしません）。

---

## 使い方

### Xcratch 版

Chrome・Edge・Firefox のどれかで [Xcratch エディタ](https://xcratch.github.io/editor/) を開き、
「拡張機能を追加」→「Extension Loader」に次の URL を入れます。

```
https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs
```

次のリンクから開くと、最初から読み込まれた状態になります。

```
https://xcratch.github.io/editor/?extension=https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs
```

### デスクトップ版

Scratch Multi Serial を起動し、左下の「拡張機能を追加」から「マルチシリアル接続」を選びます。
ブロックの使い方は Xcratch 版と同じです。

**ポートの選択ダイアログの見た目だけが違います。** ブラウザのダイアログの代わりに、
ポートの名前（例: `com0com - serial port emulator (COM8)`）を並べたダイアログが出ます。
使うポートをクリックしてください。**ダイアログを開いている間にケーブルを挿しても、一覧には出ません。**
「キャンセル」を押して、もう一度開始してください。

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

- **Xcratch 版: Chrome・Edge、または Firefox 151 以降（パソコン版）。** シリアルポートとの通信に Web Serial API を使います。
  Safari は対応していません（2026年10月時点）。
- **デスクトップ版: Windows。** ブラウザは要りません（アプリの中に入っています）。

---

## ブラウザで動かすことによる制約

Web Serial API の仕様によるもので、拡張機能の作りでは避けられません。
**デスクトップ版も中身はブラウザ（Electron）なので、同じ制約があります。**

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
作りは [scratch3-uiapduino](https://github.com/tarosay/scratch3-uiapduino) に倣っています。

### 構成

**ブロックの実装は `scratch-vm/src/extensions/scratch3_multiserial/` にだけあります。直すのは常にここです。**
Xcratch 版もデスクトップ版も、ここをビルドします。

| 場所 | 中身 |
|---|---|
| `scratch-vm/src/extensions/scratch3_multiserial/` | ブロックの実装（`index.js` / `serialChannel.js`）。`icons.js` は自動生成 |
| `scratch-gui/src/lib/libraries/extensions/multiserial/` | 絵の元（SVG）と、デスクトップ版のカードの訳文 |
| `xcratch/` | Xcratch 版のビルド環境 |
| `docs/` | 公開ページと、配っている Xcratch 版のモジュール（GitHub Pages の公開元） |
| `build-scratch3-multiserial.ps1` | デスクトップ版のビルドスクリプト |

デスクトップ版は scratch3-uiapduino と同じ**オーバーレイ方式**です。上流の
scratch-vm / scratch-gui / scratch-desktop を clone した上に、このリポジトリのファイルを
被せてビルドします。上流のファイルを丸ごと上書きするパッチは次の 4 つです。

| ファイル | 変更点 |
|---|---|
| `scratch-vm/src/extension-support/extension-manager.js` | `builtinExtensions` に `multiSerial` を 1 行足す |
| `scratch-gui/src/lib/libraries/extensions/index.jsx` | 拡張機能の一覧にカードを足す |
| `scratch-gui/src/reducers/locales.js` | カードの訳文を重ねる。画面の言語を main プロセスへ知らせる |
| `scratch-desktop/src/main/index.js` | Web Serial の許可とポートの選択ダイアログ。アプリの名前。閉じるときの確認を画面の言語で出す |

上流のタグは `build-scratch3-multiserial.ps1` の clone で固定しています（scratch3-uiapduino と同じ）。

| 上流 | タグ |
|---|---|
| scratch-vm | `0.2.0-prerelease.20220222132735` |
| scratch-gui | `scratch-desktop-v3.29.0` |
| scratch-desktop | `v3.29.1`（Electron 15.3.1） |

### Xcratch 版のビルド

Node.js v20 以降が要ります（rollup 4 の都合）。

```powershell
cd xcratch
npm install
npm run setup-dev -- <上流の scratch-vm を clone した場所>
npm run build
```

`setup-dev` は、scratch-vm から `ArgumentType` / `BlockType` / `Cast` を借りるためのリンクを
`xcratch/src/vm/` の下に張ります。最初に一度だけ実行します。
**このリポジトリの `scratch-vm/` は上流の中身を持たないので、指せません。**

`npm run build` は、本体を `xcratch/src/vm/extensions/block/` へ複製してから
`xcratch/dist/multiserial.mjs` を作り、それを `docs/` へ置きます。
**`docs/` は GitHub Pages の公開元なので、試しにビルドしただけでも公開物が更新されます。**
公開したくない変更はコミットしないでください。

ブロックの絵（`block-icon.svg` / `menu-icon.svg`）を直したときは、`xcratch/` で
`npm run embed-icons` を実行して `icons.js` を作り直してください。

### Xcratch 版を手元で試す

`xcratch/dist` を CORS 付きで配ります。**配るのは `xcratch/dist` だけにし、絶対パスで渡してください。**

```powershell
npx --yes live-server "D:\git\github\xcratch-multi-serial\xcratch\dist" --host=127.0.0.1 --port=5500 --cors --no-browser
```

Chrome・Edge・Firefox のどれかで次の URL を開きます。

```
https://xcratch.github.io/editor/?extension=http://127.0.0.1:5500/multiserial.mjs
```

### デスクトップ版のビルド

Windows の PowerShell で、**空のディレクトリ**で実行します。**Node.js v16 が要ります**
（webpack 4 の都合。v16.20.0 で確認）。Xcratch 版とは Node の版が違います。

```powershell
curl -o build-scratch3-multiserial.ps1 https://raw.githubusercontent.com/tarosay/xcratch-multi-serial/main/build-scratch3-multiserial.ps1
./build-scratch3-multiserial.ps1
```

できあがるのは `scratch-desktop\dist\` の下の 2 つです。

- `Scratch-MultiSerial-<版>-Setup.exe` … インストーラ
- `Scratch-MultiSerial-<版>-portable.zip` … インストール不要版

`<版>` は scratch-desktop の版（`3.29.1`）です。拡張機能の版ではありません。

手元の作業ツリーを被せるときは `-OverlaySource` に場所を渡します（push する前の確認用）。

```powershell
./build-scratch3-multiserial.ps1 -OverlaySource D:\git\github\xcratch-multi-serial
```

---

## ライセンス

### tarosay の成果物

ルートの [`LICENSE`](LICENSE)（MIT License / Copyright (c) 2026 Tarosa）が適用されます。
対象は、上流のファイルへのパッチ（下記）以外のすべてです。

### 上流 Scratch のコード

「構成」の表にある 4 つのパッチは、Scratch のコードを改変したものです。
著作権は元の権利者に帰属し、それぞれの上流リポジトリのライセンスに従います。

| 上流 | 著作権表示 |
|---|---|
| scratch-vm | Copyright (c) 2016, Massachusetts Institute of Technology |
| scratch-gui | Copyright (c) 2016, Massachusetts Institute of Technology |
| scratch-desktop | Copyright (c) 2019, Scratch Foundation |

いずれも BSD-3-Clause です。**このリポジトリは上流の `LICENSE` ファイルを含みません。**
オーバーレイ後も clone した各リポジトリの `LICENSE` がそのまま残り、
上記の著作権表示が保持されます。

### ビルド成果物

デスクトップ版のアプリには上流 Scratch のコードが大量に含まれます。
**配布する場合は上流各プロジェクトのライセンス条項に従ってください。**
