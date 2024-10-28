<h4 align="right">
<a href="./README.md">English</a> 
<a href="./README_ZH.md" style="margin: 0 10px;" >中文</a> 
<a href="./README_JP.md">日本语</a>
</h4>   
<p align="center">
    <img src="./pakeplus.png" width=138/>
</p>  
<h1 align="center">PakePlus</h1>  
<p align="center"><strong>9分で任意のウェブページをデスクトップアプリやモバイルアプリに変換。シンプルで使いやすい。</strong></p>

<div align="left">PakePlus は Mac、Windows、および Linux に対応しており、Android と iOS も間もなくサポート予定です。ローカルに複雑な依存環境をインストールする必要はなく、Github トークンだけで利用できます。また、PakePlus 自体のサイズはわずか約5MBです。最新バージョンについては<a href="[#popular-packages](https://github.com/Sjj1024/PakePlus/releases)">リリースページ</a>をご確認ください。<a href="#popular-packages">人気パッケージ</a>や<a href="#development">カスタム開発</a>については README をご覧ください。<a href="https://github.com/Sjj1024/PakePlus/discussions">ディスカッションエリア</a>でご意見をお待ちしています。</div>

## 特徴

-   🎐 Electron パッケージの約 20 分の 1 のサイズ（約 5MB！）
-   🚀 Rust と Tauri を活用し、JS ベースのフレームワークよりも軽量で高速。
-   📦 便利な機能パックが豊富に内蔵—ショートカット、イマーシブウィンドウ、ミニマルカスタマイズをサポート。
-   👻 PakePlus は単なるツールであり、古いパッケージング方法の代わりに Tauri を使用しています（PWA も十分に使えます）。
-   🤗 PakePlus は操作が簡単で、GitHub トークンだけでデスクトップアプリを取得可能。
-   🌹 ローカルに複雑な依存環境をインストールする必要はなく、Github Action によるクラウド自動パッケージングが可能。
-   🧑‍🤝‍🧑 国際化対応、グローバルユーザーに親しみやすく、システムの言語を自動的に追従。

## 人気パッケージ

<table>
    <tr>
        <td>WeChat Reading
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
        <td>小紅書
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

1. リリースページからアプリをダウンロードし、ダブルクリックしてインストールし、実行します。
2. Github トークンを設定し、新しいプロジェクトを作成して設定を行います。

```
Github トークン権限の説明：
1. ベータ版に必要なトークン権限：
All repositories：元のテンプレートリポジトリのフォーク
Actions：GitHub アクションの管理
Administration：リポジトリのフォークとファイル管理
Contents：リポジトリ内容の追加/削除/修正/検索など
Issues：PakePlus への問題の提出

2. クラシック版に必要なトークン権限：
repo：テンプレートコードのフォークと管理
workflow：ソフトウェアのコンパイルとリリース
```

3. 新しいウィンドウでアプリをプレビューし、パッケージングボタンをクリックしてアプリをビルドします。
4. リリースページからアプリをダウンロード可能です。

## よくある質問

1. Mac ユーザーはインストール時に「アプリが壊れています」という警告が表示されることがあります。以下のコマンドを実行してから、アプリを再度開いてください。

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
```

## PakePlus の開発

PakePlus をローカルで開発したい場合、まず環境を整えてください。Rust `>=1.63` と Node `>=16`（例：`16.18.1`）がコンピュータにインストールされていることを確認してください。インストールガイドについては、[Tauri ドキュメント](https://tauri.app/v1/guides/getting-started/prerequisites)をご参照ください。

これらに不慣れな場合、上記のワンクリックパッケージングツールを試すのが良いでしょう。

```sh
# 依存関係のインストール
pnpm i

# ローカル開発 [右クリックでデバッグモードを開きます。]
pnpm run dev

# アプリのパッケージング
pnpm run build
```

## サポート

1. PakePlus があなたの生活に楽しみをもたらしたなら、サポートしていただけると嬉しいです。
 <p align="center">
         <img src="./pay.png" />
 </p>
