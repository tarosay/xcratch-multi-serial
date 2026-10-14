#!/usr/bin/env node
//
// ビルドに必要なリンクを張る。ビルドの前に一度だけ実行する。
//
// src/vm/ の下に、scratch-vm から借りる 2 つのリンクを張る。
//
//   extension-support -> <scratch-vm>/src/extension-support   (ArgumentType / BlockType)
//   util              -> <scratch-vm>/src/util                (Cast)
//
// やり方は scratch3-uiapduino の xcratch/scripts/setup-dev.mjs と同じ。
//
// ⚠ Windows ではシンボリックリンクに開発者モードか管理者権限が要る。
//   ジャンクションなら一般ユーザ権限で作れて、Node からも rollup からも
//   ふつうのディレクトリに見える。
//
// 使い方:
//   node ./scripts/setup-dev.mjs <scratch-vm へのパス>
//   省略時は ../scratch-vm を見る。
//   ⚠ リポジトリの scratch-vm/ はデスクトップ版のオーバーレイで、上流の中身は無い。
//     ビルドツリー (build-scratch3-multiserial.ps1 が clone したもの) の中の xcratch/ で
//     走らせたときにだけ、省略で済む。

import path from 'path';
import fs from 'fs-extra';

const linkType = process.platform === 'win32' ? 'junction' : 'dir';

const projectDir = process.cwd();
const vmPath = process.argv[2] || '../scratch-vm';
const vmSrc = path.resolve(projectDir, vmPath, 'src');

// オーバーレイの scratch-vm/ (このリポジトリのもの) を指していないか。
// src/ はあるが、借りたいファイルが無い。リンクは張れてもビルドで落ちるので、ここで止める。
if (fs.existsSync(vmSrc) && !fs.existsSync(path.resolve(vmSrc, 'extension-support/argument-type.js'))) {
    console.error(`上流の scratch-vm ではありません: ${vmSrc}`);
    console.error('上流の scratch-vm を clone して、その場所を引数で渡してください。');
    process.exit(1);
}

if (!fs.existsSync(vmSrc)) {
    console.error(`scratch-vm が見つかりません: ${vmSrc}`);
    console.error('scratch-vm を clone して、その場所を引数で渡してください。');
    process.exit(1);
}

/**
 * リンクを 1 つ張る。既に同じ先を指していれば何もしない。
 * @param {string} target - リンク先 (実体)
 * @param {string} linkPath - 作る場所
 * @returns {void}
 */
const makeLink = (target, linkPath) => {
    if (!fs.existsSync(target)) {
        console.error(`リンク先がありません: ${target}`);
        process.exit(1);
    }
    try {
        const stats = fs.lstatSync(linkPath);
        if (stats.isSymbolicLink()) {
            if (path.resolve(fs.readlinkSync(linkPath)) === path.resolve(target)) {
                console.log(`そのまま: ${linkPath}`);
                return;
            }
            fs.unlinkSync(linkPath);
        } else {
            // リンクではない実体が居座っている。消さずに退避する。
            fs.renameSync(linkPath, `${linkPath}~`);
            console.log(`退避: ${linkPath} -> ${linkPath}~`);
        }
    } catch (err) {
        // まだ無い。作るだけ。
    }
    fs.ensureDirSync(path.dirname(linkPath));
    fs.symlinkSync(target, linkPath, linkType);
    console.log(`張った: ${linkPath} -> ${target}`);
};

const vmDev = path.resolve(projectDir, 'src/vm');

makeLink(path.resolve(vmSrc, 'extension-support'), path.resolve(vmDev, 'extension-support'));
makeLink(path.resolve(vmSrc, 'util'), path.resolve(vmDev, 'util'));
