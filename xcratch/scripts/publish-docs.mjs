#!/usr/bin/env node
//
// ビルドした .mjs を docs/ へ置く。npm run build の後に自動で走る。
//
// docs/ は GitHub Pages の公開元で、ここに置いたものがそのまま
//   https://tarosay.github.io/xcratch-multi-serial/multiserial.mjs
// として配られる。Xcratch はこの URL を作品に書き込み、次に開くときここから読み直す。
//
// ── なぜ dist/ を直接公開しないのか ──────────────────────────────────────
// URL は公開したら二度と変えられない。dist/ を公開元にすると
// 「dist/」という**ビルドの都合**が URL に焼き付き、
// そのディレクトリ名を永久に変えられなくなる。
// docs/ を挟めば、中の構成をどう変えても URL は動かない。
//
// ── なぜ毎回コピーするのか ──────────────────────────────────────────────
// 「ビルドしたのに公開し忘れる」を防ぐため。忘れると古いものが配られ続け、
// しかも黙って起きる。毎回コピーしておけば docs/ は常に最後のビルドと一致し、
// ずれていれば git status に出る。
// 逆に、試しにビルドしただけでも docs/ は更新される。
// 公開したくない変更はコミットしないこと。

import path from 'path';
import fs from 'fs-extra';

const projectDir = process.cwd();
const distDir = path.resolve(projectDir, 'dist');
// xcratch/ の外 (リポジトリ直下の docs/)。公開元は xcratch/ の中に入れない。
// 入れると「xcratch/」というビルドの都合が URL に焼き付く。
const docsDir = path.resolve(projectDir, '../docs');

// .mjs だけでなく .map も要る。.mjs の末尾が .map を参照しており、
// 無いと開発者ツールを開いたときに 404 になる。
const files = ['multiserial.mjs', 'multiserial.mjs.map'];

fs.ensureDirSync(docsDir);
files.forEach(name => {
    const from = path.resolve(distDir, name);
    if (!fs.existsSync(from)) {
        console.error(`ありません: ${from}`);
        process.exit(1);
    }
    fs.copySync(from, path.resolve(docsDir, name));
    console.log(`公開: docs/${name}`);
});
