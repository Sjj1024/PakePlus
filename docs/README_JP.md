<h4 align="right"><strong>日本語</strong></h4>  
<p align="center">
    <img src="pakeplus.png" width=138/>
</p>  
<h1 align="center">PakePlus</h1>  
<p align="center"><strong>Rustを使って、任意のウェブページをデスクトップアプリやモバイルアプリに簡単に変換。</strong></p>

<div align="left">PakePlusはMac、Windows、Linuxをサポートしており、まもなくAndroidとiOSもサポート予定です。複雑な依存関係の環境をローカルにインストールする必要はありません。<a href="#popular-packages">人気のパッケージ</a>や<a href="#development">カスタマイズ開発</a>に関する情報をREADMEで確認してください。<a href=https://github.com/Sjj1024/PakePlus/discussions>ディスカッション</a>で提案を共有してください。</div>

## 特徴

-   🎐 Electron パッケージより約 20 倍小さい（約 5M！）
-   🚀 Rust Tauri を使用しており、PakePlus は JS ベースのフレームワークより軽量で高速です。
-   📦 充実した機能パッケージ—ショートカットパススルー、没入型ウィンドウ、ミニマルなカスタマイズをサポート。
-   👻 PakePlus はシンプルなツール—古いバンドルアプローチを Tauri に置き換えます（PWA でも十分です）。
-   🤗 PakePlus は簡単に使用でき、GitHub トークンさえあればデスクトップアプリを作成できます。

## 人気のパッケージ

<table>
    <tr>
        <td>WeRead
            <a href="https://github.com/tw93/Pake/releases/latest/download/WeRead.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/WeRead_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/WeRead_x86_64.deb">Linux</a>
        </td>
        <td>Twitter
            <a href="https://github.com/tw93/Pake/releases/latest/download/Twitter.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Twitter_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Twitter_x86_64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/WeRead.jpg width=600/></td>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/Twitter.jpg width=600/></td>
    </tr>
    <tr>
        <td>Flomo
            <a href="https://github.com/tw93/Pake/releases/latest/download/Flomo.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Flomo_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Flomo_x86_64.deb">Linux</a>
        </td>
        <td>小紅書（XiaoHongShu）
            <a href="https://github.com/tw93/Pake/releases/latest/download/XiaoHongShu.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/XiaoHongShu_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/XiaoHongShu_x86_64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/Flomo.png width=600/></td>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/XiaoHongShu.png width=600/></td>
    </tr>
</table>

## 始める前に

1. リリースページからアプリケーションをダウンロードしてください。
2. ダブルクリックしてアプリケーションをインストール・実行します。
3. 新しいプロジェクトを作成し、設定します。
4. 新しいウィンドウでアプリケーションをプレビューできます。
5. 発行ボタンをクリックしてアプリケーションをパックします。
6. リリースページからアプリケーションをダウンロードできます。

## 開発

開発を始める前に環境を準備してください。コンピュータに Rust `>=1.63` と Node `>=16`（例：`16.18.1`）がインストールされていることを確認してください。インストールガイドについては [Tauri ドキュメント](https://tauri.app/v1/guides/getting-started/prerequisites)をご覧ください。

これらに不慣れな場合は、上記のワンクリックパッキングツールを試すことをお勧めします。

```sh
# 依存関係をインストール
pnpm i

# ローカル開発 [右クリックでデバッグモードを開きます。]
pnpm run dev

# アプリケーションをパック
pnpm run build
```

## サポート

1. PakePlus が生活を楽しくしてくれたと思ったら、少しエネルギーを与えてください。
 <p align="center">
         <img src="./pay.png" />
 </p>

2. 楽しく遊んでいただければ幸いです。Mac アプリに適したウェブサイトが見つかったら、お知らせください！
