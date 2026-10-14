# build-scratch3-multiserial.ps1
# Created by tarosay (2026)
# Windows build helper script.
# Original project licenses apply; see README.md.
#
# scratch3-uiapduino の build-scratch3-uiapduino.ps1 と同じ構成。
# 違いは overlay する拡張がマルチシリアル接続である点と、
# scratch-desktop の main プロセスに当てるパッチが Web Serial 用である点。
#
# 成果物: scratch-desktop\dist\Scratch-MultiSerial-<version>-Setup.exe     (NSIS インストーラ)
#         scratch-desktop\dist\Scratch-MultiSerial-<version>-portable.zip  (インストール不要版)
#
# 使い方: 空のディレクトリで実行する。
#   .\build-scratch3-multiserial.ps1
#       GitHub の tarosay/xcratch-multi-serial を clone して被せる
#   .\build-scratch3-multiserial.ps1 -OverlaySource D:\git\github\xcratch-multi-serial
#       手元の作業ツリーを被せる (コミット前・push 前の確認用)

param(
    # 被せるリポジトリの場所。省略すると GitHub から clone する。
    [string]$OverlaySource = ""
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

Write-Host "=== Scratch3 Multi Serial build script (Windows PowerShell) ==="

# ネイティブコマンド (git / npm) は終了コードを返すだけで PowerShell の例外にはならないため、
# $ErrorActionPreference = "Stop" では止まらない。明示的に終了コードを確認する。
function Invoke-Checked([string]$File, [string[]]$CmdArgs) {
    Write-Host ">>> $File $($CmdArgs -join ' ')" -ForegroundColor Cyan
    & $File @CmdArgs
    if ($LASTEXITCODE -ne 0) {
        throw "FAILED (exit $LASTEXITCODE): $File $($CmdArgs -join ' ')"
    }
}

# 動作確認済みは Node.js v16.20.0 / npm 8.19.4 (scratch3-uiapduino と同じ)。
# Node 17 以降は OpenSSL 3 のため webpack 4 が ERR_OSSL_EVP_UNSUPPORTED で失敗することがある。
$nodeVersion = (& node -v)
Write-Host "Node.js : $nodeVersion"
Write-Host "npm     : $(& npm.cmd -v)"
if ($nodeVersion -notmatch '^v16\.') {
    Write-Warning "Node.js v16 系 (v16.20.0 で動作確認) を推奨します。現在: $nodeVersion"
    Write-Warning "nvm-windows を使っている場合は 'nvm use 16.20.0' で切り替えてください。"
}

function Assert-DirNotExists([string]$name) {
    if (Test-Path $name) {
        throw "Directory '$name' already exists. Please remove it or run in a clean directory. ($name)"
    }
}

Assert-DirNotExists "scratch-vm"
Assert-DirNotExists "scratch-gui"
Assert-DirNotExists "scratch-desktop"
Assert-DirNotExists "xcratch-multi-serial"

if ($OverlaySource -ne "" -and -not (Test-Path $OverlaySource)) {
    throw "Overlay source not found: $OverlaySource"
}

# --- clone ---

Invoke-Checked "git" @("clone", "--filter=blob:none", "https://github.com/scratchfoundation/scratch-vm.git", "-b", "0.2.0-prerelease.20220222132735")
Invoke-Checked "git" @("clone", "--filter=blob:none", "https://github.com/scratchfoundation/scratch-gui.git", "-b", "scratch-desktop-v3.29.0")
Invoke-Checked "git" @("clone", "--filter=blob:none", "https://github.com/scratchfoundation/scratch-desktop.git", "-b", "v3.29.1")

# --- scratch-vm ---

Push-Location scratch-vm
Invoke-Checked "npm.cmd" @("install")
Invoke-Checked "npm.cmd" @("link")
Pop-Location

# --- scratch-gui ---

Push-Location scratch-gui
Invoke-Checked "npm.cmd" @("install")

# react-responsive の peer dependency を scratch-paint に合わせる (4.x)
# 未インストールでも失敗しないよう uninstall だけは終了コードを見ない
& npm.cmd uninstall react-responsive
Invoke-Checked "npm.cmd" @("install", "react-responsive@4.1.0", "--save-exact")

Invoke-Checked "npm.cmd" @("link", "scratch-vm")
Invoke-Checked "npm.cmd" @("link")
Pop-Location

# --- scratch-desktop ---

Push-Location scratch-desktop
Invoke-Checked "npm.cmd" @("install")

Push-Location node_modules

if (Test-Path "scratch-gui") {
    Remove-Item -Recurse -Force "scratch-gui"
}

# Linux の `ln -s ../../scratch-gui scratch-gui` 相当。
# SymbolicLink は「開発者モード」有効か管理者権限が必要だが、
# ディレクトリジャンクションなら一般ユーザ権限で作成でき、npm からは同じように扱われる。
#
# -Target には必ず絶対パスを渡すこと。PowerShell 7 は相対パスを受け付けず
#     Creating a junction requires an absolute path for the target.
# で止まる (scratch3-uiapduino で 2026-08-07 に踏んだ)。
$guiPath = (Resolve-Path "..\..\scratch-gui").Path
New-Item -ItemType Junction -Path "scratch-gui" -Target $guiPath | Out-Null

Pop-Location  # node_modules
Pop-Location  # scratch-desktop

# --- マルチシリアル接続の取り込み ---
# scratch-vm / scratch-gui に加えて scratch-desktop/src/main/index.js も上書きする。
# main プロセスでポートの選択ダイアログを出さないと、Electron は requestPort() で
# ポートを選べない (Electron はダイアログを持っていない)。

if ($OverlaySource -eq "") {
    Invoke-Checked "git" @("clone", "https://github.com/tarosay/xcratch-multi-serial")
    $overlayDir = ".\xcratch-multi-serial"
} else {
    Write-Host ">>> overlay from $OverlaySource (local working tree)" -ForegroundColor Yellow
    $overlayDir = $OverlaySource
}

# Linux の `cp -r xcratch-multi-serial/. ./` 相当（.git は除外）。
# 追跡していないもの (xcratch/node_modules など) も手元の作業ツリーにはあり得るので、外す。
# 外さないと、ビルドには要らない数百 MB をコピーすることになる。
$overlayExcludes = @(".git", ".claude")
Get-ChildItem -Path $overlayDir -Force |
    Where-Object { $overlayExcludes -notcontains $_.Name } |
    ForEach-Object {
        if ($_.Name -eq "xcratch") {
            # xcratch/ はデスクトップ版のカードが package.json の版を読むだけ。
            # node_modules / dist / src/vm (リンクと複製) は持ってこない。
            New-Item -ItemType Directory -Force -Path ".\xcratch" | Out-Null
            Get-ChildItem -Path $_.FullName -Force |
                Where-Object { @("node_modules", "dist", "src") -notcontains $_.Name } |
                ForEach-Object { Copy-Item -Path $_.FullName -Destination ".\xcratch\" -Recurse -Force }
        } else {
            Copy-Item -Path $_.FullName -Destination ".\" -Recurse -Force
        }
    }

if ($OverlaySource -eq "") {
    Remove-Item -Recurse -Force ".\xcratch-multi-serial"
}

# オーバーレイが実際に効いたか確認する（コピー漏れに気づかずビルドするのを防ぐ）
foreach ($check in @(
    "scratch-vm\src\extensions\scratch3_multiserial\index.js",
    "scratch-vm\src\extensions\scratch3_multiserial\icons.js",
    "xcratch\package.json"
)) {
    if (-not (Test-Path $check)) {
        throw "Overlay failed: $check not found"
    }
}
if (-not (Select-String -Path "scratch-desktop\src\main\index.js" -Pattern "select-serial-port" -Quiet)) {
    throw "Overlay failed: scratch-desktop\src\main\index.js に Web Serial のパッチがありません"
}

# --- Terser のワーカー数を制限する ---
#
# electron-webpack の out/targets/BaseTarget.js が
#     if (env.minify !== false) { optimization.minimizer = [new TerserPlugin({parallel: true, ...})]; }
#     optimization.minimize = true;   // ← 条件の外にある
# となっており、scratch-desktop の compile が渡している --env.minify=false が効かない。
# その結果 webpack 4 の既定 minimizer (TerserPlugin, parallel: true) が使われ、
# os.cpus().length - 1 個のワーカープロセスを起こそうとする。
# コア数の多い機械ではスレッド生成に失敗し、92% の Terser で
#     spawn UNKNOWN
#     node_platform.cc:61: Assertion `(0) == (uv_thread_create(...))' failed
# となってビルドが落ちる (64 コアなら 63 プロセス)。scratch3-uiapduino で踏んだ。
#
# 既定と同じ設定のまま parallel だけを絞るので、成果物は変わらない。
# cache / sourceMap の値は webpack 4 の WebpackOptionsDefaulter.js の既定に合わせてある。

$makeConfigPath = "scratch-desktop\webpack.makeConfig.js"
$makeConfigSrc = Get-Content $makeConfigPath -Raw

if ($makeConfigSrc -match 'parallel: 4') {
    Write-Host ">>> webpack.makeConfig.js: Terser パッチは適用済み" -ForegroundColor DarkGray
} else {
    $anchor = "    return config;"
    $hits = ([regex]::Matches($makeConfigSrc, [regex]::Escape($anchor))).Count
    if ($hits -ne 1) {
        throw "webpack.makeConfig.js のパッチ位置が特定できません (該当 $hits 箇所)。上流の変更を確認してください。"
    }

    $inject = @'
    // Terser のワーカー数を制限する (多コア環境でのビルド失敗対策)
    // build-scratch3-multiserial.ps1 が挿入している。理由はそちらのコメントを参照。
    config.optimization = Object.assign({}, config.optimization, {
        minimizer: [new (require('terser-webpack-plugin'))({
            cache: true,
            parallel: 4,
            sourceMap: true
        })]
    });

    return config;
'@
    # 挿入する JS 側は LF に揃える (このスクリプトは作業ツリーでは CRLF になる)
    $inject = $inject -replace "`r`n", "`n"

    $makeConfigSrc = $makeConfigSrc.Replace($anchor, $inject)
    Set-Content -Path $makeConfigPath -Value $makeConfigSrc -NoNewline
    Write-Host ">>> webpack.makeConfig.js: Terser のワーカー数を 4 に制限しました" -ForegroundColor Cyan
}

# --- 公式 Scratch Desktop と区別する ---
#
# 上流の electron-builder.yaml は
#     appId: edu.mit.scratch.scratch-desktop
#     productName: "Scratch 3"
# であり、そのままビルドすると公式 Scratch Desktop と
# アプリ名・appId・バージョンがすべて同一になる。
# 公式を入れている人がインストールすると同じアプリとみなされて上書きされ、
# スタートメニューでも見分けがつかない。Scratch UIAPduino とも分ける。
#
# nsis.artifactName は productName ではなく "Scratch" が直書きされているので、
# ここも変えないとインストーラのファイル名が変わらない。
#
# 名前は scratch-desktop/src/main/index.js の APP_NAME と同じにすること。

$ebPath = "scratch-desktop\electron-builder.yaml"
$ebSrc = Get-Content $ebPath -Raw

$ebEdits = @(
    @{ From = 'appId: edu.mit.scratch.scratch-desktop'; To = 'appId: com.github.tarosay.scratch-multi-serial' },
    @{ From = 'productName: "Scratch 3"'; To = 'productName: "Scratch Multi Serial"' },
    @{ From = 'artifactName: "Scratch ${version} Setup.${ext}"'; To = 'artifactName: "Scratch-MultiSerial-${version}-Setup.${ext}"' }
)

if ($ebSrc -match 'scratch-multi-serial') {
    Write-Host ">>> electron-builder.yaml: パッチは適用済み" -ForegroundColor DarkGray
} else {
    foreach ($e in $ebEdits) {
        $hits = ([regex]::Matches($ebSrc, [regex]::Escape($e.From))).Count
        if ($hits -ne 1) {
            throw "electron-builder.yaml のパッチ位置が特定できません: '$($e.From)' (該当 $hits 箇所)"
        }
        $ebSrc = $ebSrc.Replace($e.From, $e.To)
    }
    # zip (インストール不要版) のファイル名も揃える。
    # 既定のままだと "Scratch Multi Serial-3.29.1-ia32-win.zip" とスペース入りになり、
    # インストーラ側の命名と揃わない。
    #
    # electron-builder 22 はトップレベルの zip: を受け付けない
    # ("configuration has an unknown property 'zip'") ので win 側に置く。
    # nsis と appx は自前の artifactName を持つため、これが効くのは zip だけ。
    $winAnchor = '  icon: buildResources/ScratchDesktop.ico'
    $winHits = ([regex]::Matches($ebSrc, [regex]::Escape($winAnchor))).Count
    if ($winHits -ne 1) {
        throw "electron-builder.yaml の win セクションが特定できません (該当 $winHits 箇所)"
    }
    $zipName = @'
  icon: buildResources/ScratchDesktop.ico
  artifactName: "Scratch-MultiSerial-${version}-portable.${ext}"
'@
    $zipName = ($zipName -replace "`r`n", "`n").TrimEnd("`n")
    $ebSrc = $ebSrc.Replace($winAnchor, $zipName)

    Set-Content -Path $ebPath -Value $ebSrc -NoNewline
    Write-Host ">>> electron-builder.yaml: appId / productName / artifactName を差し替えました" -ForegroundColor Cyan
}

# --- ビルド (Electron) ---
Push-Location scratch-desktop
Invoke-Checked "npm.cmd" @("run", "fetch")

# webpack バンドル生成 (dist\main, dist\renderer)
Invoke-Checked "npm.cmd" @("run", "compile")

# ここで `npm run build` を使わないこと:
#   npm run build は electron-builder-wrapper.js 経由で AppX (Microsoft Store 用) を
#   先にビルドするが、AppX には Windows SDK の makeappx.exe が必要で、
#   無い環境では "spawn UNKNOWN" で失敗し、そこで例外停止して
#   肝心の NSIS インストーラまで到達しない。
#   よって electron-builder を直接呼び、NSIS ターゲットのみをビルドする。
#   (upstream のリリースと同じ nsis:ia32。32bit 版だが 64bit Windows でも動作する)

# コード署名は行わない（証明書があると electron-builder が署名を試みて失敗するため除去）
Remove-Item Env:CSC_LINK, Env:CSC_KEY_PASSWORD, Env:WIN_CSC_LINK, Env:WIN_CSC_KEY_PASSWORD -ErrorAction SilentlyContinue

# nsis  … インストーラ
# zip   … インストール不要版（インストール権限が無い環境向け）
Invoke-Checked ".\node_modules\.bin\electron-builder.cmd" @("--windows", "nsis:ia32", "zip:ia32")

Get-ChildItem dist -File |
    Where-Object { $_.Extension -in '.exe', '.zip' } |
    Select-Object Name, @{n = 'MB'; e = { [math]::Round($_.Length / 1MB, 1) } } |
    Format-Table

Pop-Location

Write-Host "=== Done. Built artifacts are in scratch-desktop\dist ===" -ForegroundColor Green
