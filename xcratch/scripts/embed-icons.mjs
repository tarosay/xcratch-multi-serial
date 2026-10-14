#!/usr/bin/env node
//
// ブロックの頭とカテゴリ一覧の絵 (SVG) を、base64 の data URI にした .js に焼き直す。
//
//   scratch-gui/src/lib/libraries/extensions/multiserial/block-icon.svg
//   scratch-gui/src/lib/libraries/extensions/multiserial/menu-icon.svg
//     → scratch-vm/src/extensions/scratch3_multiserial/icons.js
//
// 作りは scratch3-uiapduino の xcratch/scripts/embed-bin.mjs に倣っている。
//
// ── なぜ SVG を直接 import しないのか ───────────────────────────────────
// 本体は Xcratch 版 (rollup) とデスクトップ版 (webpack) の両方でビルドされる。
// rollup の image プラグインは SVG を data URI に変えるが、デスクトップ版の webpack は
// file-loader でファイルの URL に変える。import した値の形がビルドによって違う。
// ただの .js にしておけば、どちらでも同じ値になる。
//
// ── なぜ base64 なのか ─────────────────────────────────────────────────
// scratch-blocks はカテゴリ一覧の絵を `url(' + iconURI + ')'` と引用符なしで CSS に書く
// (scratch-blocks の core/toolbox.js)。読める形の data URI だと、中の空白と ' で
// CSS が壊れて何も描かれない (2026-10-13 に実機で白い丸だけになった)。
//
// ── なぜ npm run build に繋がないのか ───────────────────────────────────
// 生成物はデスクトップ版のビルドでも読む。デスクトップ版は xcratch/ のビルドを通らないので、
// 生成物はリポジトリに追跡させる。このスクリプトは SVG を直したときだけ手で走らせる。
//
// 使い方 (xcratch/ で):
//   node ./scripts/embed-icons.mjs
//
// 出力は決定的。同じ SVG からは必ず同じ .js が出るので、
// 走らせ直しても中身が変わらなければ git の差分は出ない。

import path from 'path';
import fs from 'fs-extra';

/** base64 を 1 行に詰める文字数。長い 1 行にすると差分が読めない。 */
const CHUNK = 80;

const projectDir = process.cwd();
const svgDir = path.resolve(projectDir, '../scratch-gui/src/lib/libraries/extensions/multiserial');
const outPath = path.resolve(projectDir, '../scratch-vm/src/extensions/scratch3_multiserial/icons.js');

/**
 * 書き出す絵。name は icons.js の export の名前。
 * @type {Array<{name: string, file: string, doc: string}>}
 */
const ICONS = [
    {name: 'blockIconURI', file: 'block-icon.svg', doc: 'ブロックの頭の絵'},
    {name: 'menuIconURI', file: 'menu-icon.svg', doc: 'カテゴリ一覧の絵'}
];

/**
 * SVG を読んで、base64 の data URI を返す。
 * 改行コードは LF に揃える。作業ツリーの改行が CRLF でも LF でも同じ出力にするため。
 * @param {string} file - SVG のファイル名
 * @returns {string} data URI
 */
const toDataURI = file => {
    const from = path.resolve(svgDir, file);
    if (!fs.existsSync(from)) {
        console.error(`ありません: ${from}`);
        process.exit(1);
    }
    const svg = fs.readFileSync(from, 'utf8').replace(/\r\n/g, '\n');
    return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
};

/**
 * 長い文字列を CHUNK 文字ずつの行に分け、'...' + で繋いだ JS の式にする。
 * @param {string} text - 文字列
 * @returns {string} JS の式
 */
const toChunkedLiteral = text => {
    const lines = [];
    for (let i = 0; i < text.length; i += CHUNK) {
        lines.push(`    '${text.slice(i, i + CHUNK)}'`);
    }
    return lines.join(' +\n');
};

const body = ICONS.map(icon => `/**
 * ${icon.doc}。元は ${icon.file}。
 * @type {string}
 */
export const ${icon.name} =
${toChunkedLiteral(toDataURI(icon.file))};
`).join('\n');

const out = `// このファイルは xcratch/scripts/embed-icons.mjs が作る。手で直さない。
//
// 中身は scratch-gui/src/lib/libraries/extensions/multiserial/ の SVG を
// base64 の data URI にしたもの。SVG を直したら、xcratch/ で
//   node ./scripts/embed-icons.mjs
// を走らせ、この生成物と docs/multiserial.mjs を一緒にコミットすること。

${body}`;

fs.writeFileSync(outPath, out);
console.log(`書いた: ${outPath}`);
