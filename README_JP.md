<h4 align="right">
<a href="https://github.com/Sjj1024/PacBao">English</a> 
<a href="https://github.com/Sjj1024/PacBao/discussions/2" style="margin: 0 10px;" >中文</a> 
<span>日本语</span>
</h4>   
<p align="center">
    <img src="https://github.com/Sjj1024/PacBao/raw/main/docs/static/imgs/PacBao.png" width=138/>
</p>  
<h1 align="center">PacBao</h1>  
<p align="center"><strong>9分で任意のウェブページをデスクトップアプリやモバイルアプリに変換。シンプルで使いやすい。</strong></p>

<p align="center">
    <a href="https://github.com/Sjj1024/PacBao/releases"><img src="https://img.shields.io/github/v/release/Sjj1024/PacBao?style=flat-square&logo=github" alt="Release"></a>
    <a href="https://github.com/Sjj1024/PacBao/stargazers"><img src="https://img.shields.io/github/stars/Sjj1024/PacBao?style=flat-square&logo=github" alt="Stars"></a>
    <a href="https://github.com/Sjj1024/PacBao/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/Sjj1024/PacBao/build.yml?style=flat-square&logo=github" alt="Build"></a>
    <a href="https://github.com/Sjj1024/PacBao/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Sjj1024/PacBao?style=flat-square&logo=github" alt="License"></a>
    <a href="https://hellogithub.com/repository/d148f8fac78b45fe9b94c82757c3f86b" target="_blank"><img src="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=d148f8fac78b45fe9b94c82757c3f86b&claim_uid=LXfeQOxRDEmSUGC&theme=small" alt="Featured｜HelloGitHub"></a>
</p>

<div align="left">PacBao は Mac、Windows、および Linux に対応しており、Android と iOS も間もなくサポート予定です。ローカルに複雑な依存環境をインストールする必要はなく、Github トークンだけで利用できます。また、PacBao 自体のサイズはわずか約5MBです。最新バージョンについては<a href="[#popular-packages](https://github.com/Sjj1024/PacBao/releases)">リリースページ</a>をご確認ください。また、PacBao Web 版も利用できます。<a href="URL_ADDRESS また、PacBao Web 版も利用できます。<a href="https://PacBao.pages.dev" target="_blank">PacBao Web</a>。
<a href="#popular-packages">人気パッケージ</a>や<a href="#development">カスタム開発</a>については README をご覧ください。<a href="https://github.com/Sjj1024/PacBao/discussions">ディスカッションエリア</a>でご意見をお待ちしています。</div>

https://github.com/user-attachments/assets/b88bf541-0b26-4020-9eec-da79e1734fc9

## 特徴

-   💎 Electron より約 20 倍小さい（5MB 未満！）、そして 10 倍高速。
-   🚀 Rust Tauri ベースで構築されており、JS ベースのフレームワークより軽量かつ高速。
-   📦 豊富な機能を内蔵 — ショートカット、没入型ウィンドウ、ミニマルなカスタマイズに対応。
-   👻 PacBao はミニマルなソフトウェアで、旧来のパッケージ方法を Tauri に置き換えてクロスプラットフォームのデスクトップアプリを実現。
-   📲 Android および iOS アプリをネイティブフレームワークでパッケージ、Tauri2 よりさらに軽く高速。
-   🤗 操作が簡単、GitHub トークンが 1 つあればデスクトップアプリを取得可能。
-   🌹 複雑な依存環境をローカルにインストールする必要なし、GitHub Actions によるクラウド自動パッケージング。
-   🧑‍🤝‍🧑 国際化に対応、システムの言語に自動的に追従。
-   💡 カスタム JS の注入が可能、自作の JS をページに注入して使用可能。
-   🎨 UI が美しく、初心者に優しく、快適な使い心地、中国語名のパッケージも対応。
-   📡 ウェブから直接使用可能だが、クライアント版の方が機能豊富でおすすめ。
-   🔐 データは安全、トークンはローカルのみ保存、プロジェクトも自分の Git に安全に保管。
-   🍔 ローカルでのパッケージ化をサポートし、依存環境をインストールする必要がなく、ローカルでのパッケージ化はわずか30秒で完了します
-   🥥 Github Tokenがなくても大丈夫、ローカルでのパッケージ化は簡単で便利、さらにTokenも不要です
-   ⚔️ JSスクリプト内でシステムレベルのAPIを呼び出すことをサポートしています。例えば、ファイルのダウンロード/コマンドの実行/新しいウィンドウの開くなど
-   🍀 静的ファイルのパッケージングをサポート、Vue/React の `dist` や `index.html` を入れるだけでクライアントに。
-   🐞 デバッグモードに対応、プレビューでもリリースでもバグを見つけて解消できる。
-   💬 使用中に問題があれば、いつでも技術コミュニティに参加して相談可能。

## 使用シーン

-   あなたのウェブサイトをすぐにデスクトップアプリにして、より高級感を出したいとき。
-   Vue/React プロジェクトを持っていて、サーバーを購入せずにデスクトップ化したいとき。
-   Cocos ゲームをクロスプラットフォームで動作させたい？問題なし。
-   Unity プロジェクトもクロスプラットフォーム化したい？もちろん可能。
-   サイトのアドレスを隠したい、スクレイピングや拡散を防止したい。
-   社内専用サイトで、クライアントからのみアクセスさせたい場合。
-   サイトをカスタムクライアントにして、自動化や便利機能を JS 注入で追加したい。
-   広告が多すぎるサイトをクリーンに使いたい？JS で非表示にしよう。
-   Tauri2 を使いたいが、環境構築が大変？PacBao で解決！

## 人気パッケージ

<img src=https://sjj1024.github.io/PacBao/static/imgs/preview.webp  width=1920/>
PacBaoは、ARMとIntelの両アーキテクチャに対応したインストールパッケージをサポートしています。一般的なプログラムのインストールパッケージには、通常、Mac用のARMとWindows用のIntelのみが含まれています。より多くのアーキテクチャに対応したインストールパッケージが必要な場合は、PacBaoを使用して必要なパッケージを個別にコンパイルしてください。

<table>
    <tr>
        <td>DeepSeek
            <a href="https://github.com/Sjj1024/PacBao/releases/download/OtherFiles/DeepSeek_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/Sjj1024/PacBao/releases/download/OtherFiles/DeepSeek_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/Sjj1024/PacBao/releases/download/OtherFiles/DeepSeek_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>X (Twitter)
            <a href="https://github.com/codegirle/PacBao/releases/download/X/X_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/X/X_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/X/x_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PacBao/static/imgs/deepseek.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PacBao/static/imgs/xtwitter.png width=600/></td>
    </tr>
    <tr>
        <td>YouTube
            <a href="https://github.com/codegirle/PacBao/releases/download/YouTuBe/YouTube_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/YouTuBe/YouTube_0.0.1_x64_en-US.msi">Windows</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/YouTuBe/you-tube_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>小红书
            <a href="https://github.com/Sjj1024/PacBao/releases/download/OtherFiles/_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/Sjj1024/PacBao/releases/download/OtherFiles/_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/Sjj1024/PacBao/releases/download/OtherFiles/_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PacBao/static/imgs/youtube.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PacBao/static/imgs/hongshu.png width=600/></td>
    </tr>
        <tr>
        <td>Tiktok
            <a href="https://github.com/codegirle/PacBao/releases/download/TikTok/TikTok_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/TikTok/TikTok_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/TikTok/tik-tok_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>抖音
            <a href="https://github.com/codegirle/PacBao/releases/download/Douyin/_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/Douyin/_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PacBao/releases/download/Douyin/_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PacBao/static/imgs/tiktok.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PacBao/static/imgs/douyin.png width=600/></td>
    </tr>
</table>

## 始める前に

1. リリースページからアプリをダウンロードし、ダブルクリックしてインストールし、実行します：https://github.com/Sjj1024/PacBao/releases。 あるいは、ウェブ版を使ってもいいです：<a href="https://PacBao.pages.dev" target="_blank">PacBao Web</a>

2. Github トークンを設定し、新しいプロジェクトを作成して設定を行います。Token 获取方法:  
   <a href="https://sjj1024.github.io/PacBao/index_en.html">English</a> <a href="https://sjj1024.github.io/PacBao/index_zh.html" style="margin: 0 20px;">简体中文</a><a href="https://sjj1024.github.io/PacBao/index_ja.html">日本语</a>

```
Github トークン権限の説明：
1. ベータ版に必要なトークン権限：
All repositories：元のテンプレートリポジトリのフォーク
Actions：GitHub アクションの管理
Administration：リポジトリのフォークとファイル管理
Contents：リポジトリ内容の追加/削除/修正/検索など
Issues：PacBao への問題の提出

1. クラシック版に必要なトークン権限：
repo：テンプレートコードのフォークと管理
workflow：ソフトウェアのコンパイルとリリース
```

1. 新しいウィンドウでアプリをプレビューし、パッケージングボタンをクリックしてアプリをビルドします。
2. リリースページからアプリをダウンロード可能です。

## よくある質問

1. **Mac ユーザーはインストール時に「アプリが破損しています」という警告が表示される場合があります。** 「キャンセル」をクリックし、次のコマンドを実行してから、アプリを再度開いてください。(これは Mac 用のオフィシャル署名のためです。そのコストは年間 $99 です...そのため、必要な場合はオフィシャル署名を手動でバイパスして使用することができます。)

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PacBao.app
```

2. **アプリをパッケージ化する際、Mac ユーザーはインストール時に「アプリが破損しています」という警告が表示される場合があります。** 「キャンセル」をクリックし、次のコマンドを実行してから、アプリを再度開いてください。

```sh
sudo xattr -r -d com.apple.quarantine /Applications/YourAppName.app
```

3. **プログラムの使用中に問題が発生した場合は、最新バージョンをダウンロードしてください。** 2025 年以前に開発されたバージョンは Tauri v1.0 に基づいていますが、2025 年には Tauri v2.0 にアップグレードされました。最新バージョンでも問題が解決しない場合は、詳細な情報を添えて Issue を提出してください。より迅速に更新・修正を行うことができます。

4. GitHub トークンを追加すると、PacBao はあなたのリポジトリに PacBao リポジトリをフォークします。今後のすべてのプロジェクトはこのリポジトリに依存して作成およびコンパイルされるため、PacBao リポジトリを削除しないでください。

## PacBao の開発

PacBao をローカルで開発したい場合、まず環境を整えてください。Rust `>=1.63` と Node `>=16`（例：`16.18.1`）がコンピュータにインストールされていることを確認してください。インストールガイドについては、[Tauri ドキュメント](https://tauri.app/v1/guides/getting-started/prerequisites)をご参照ください。

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

1. PacBao があなたの生活に楽しみをもたらしたなら、サポートしていただけると嬉しいです。
 <p align="center">
         <img src="https://github.com/Sjj1024/PacBao/raw/main/docs/static/imgs/pay.webp" />
 </p>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sjj1024/PacBao&type=Date)](https://www.star-history.com/#Sjj1024/PacBao&Date)
