<h4 align="right"><a href="https://github.com/tw93/Pake">English</a> | <strong>简体中文</strong> | <a href="https://github.com/tw93/Pake/blob/master/README_JP.md">日本語</a></h4>
<p align="center">
    <img src=https://gw.alipayobjects.com/zos/k/fa/logo-modified.png width=138/>
</p>
<h1 align="center">Pake</h1>
<p align="center"><strong>利用 Rust 轻松构建轻量级多端桌面应用</strong></p>
<div align="center">
    <a href="https://twitter.com/HiTw93" target="_blank">
    <img alt="twitter" src="https://img.shields.io/badge/follow-Tw93-red?style=flat-square&logo=Twitter"></a>
    <a href="https://t.me/+GclQS9ZnxyI2ODQ1" target="_blank">
    <img alt="telegram" src="https://img.shields.io/badge/chat-telegram-blueviolet?style=flat-square&logo=Telegram"></a>
    <a href="https://github.com/tw93/Pake/releases" target="_blank">
    <img alt="GitHub downloads" src="https://img.shields.io/github/downloads/tw93/Pake/total.svg?style=flat-square"></a>
    <a href="https://github.com/tw93/Pake/commits" target="_blank">
    <img alt="GitHub commit" src="https://img.shields.io/github/commit-activity/m/tw93/Pake?style=flat-square"></a>
    <a href="https://github.com/tw93/Pake/issues?q=is%3Aissue+is%3Aclosed" target="_blank">
    <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/tw93/Pake.svg?style=flat-square"></a>
    <a href="https://colab.research.google.com/drive/1bX345znvDZ30848xjRtpgtU8eypWwXrp?usp=sharingg" target="_blank">
    <img alt="在 Colab 中打开" src="https://colab.research.google.com/assets/colab-badge.svg"></a>
</div>
<div align="left">支持 Mac / Windows / Linux，关于 <a href="#常用包下载">常用包下载</a>、<a href="#命令行一键打包">命令行一键打包</a>、<a href="#定制开发">定制开发</a> 可见下面文档，也欢迎去 <a href=https://github.com/tw93/Pake/discussions>讨论区</a> 交流。</div>

## 特征

-   🎐 相比传统的 Electron 套壳打包，要小将近 20 倍，5M 上下。
-   🚀 PakePlus 的底层使用的 Rust Tauri 框架，性能体验较 JS 框架要轻快不少，内存小很多。
-   📦 不是单纯打包，实现了快捷键的透传、沉浸式的窗口、拖动、样式改写、去广告、产品的极简风格定制。
-   👻 只是一个很简单的小玩具，用 Tauri 替代之前套壳网页打包的老思路，其实 PWA 也很好。

## 常用包下载

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
        <td>ChatGPT
            <a href="https://github.com/tw93/Pake/releases/latest/download/ChatGPT.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/ChatGPT_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/ChatGPT_x86_64.deb">Linux</a>
        </td>
        <td>Poe
            <a href="https://github.com/tw93/Pake/releases/latest/download/Poe.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Poe_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Poe_x86_64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/ChatGPT.png width=600/></td>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/Poe.png width=600/></td>
    </tr>
    <tr>
      <td>YouTube Music
            <a href="https://github.com/tw93/Pake/releases/latest/download/YouTubeMusic.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/YouTubeMusic_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/YouTubeMusic_x86_64.deb">Linux</a>
      </td>
      <td>YouTube
            <a href="https://github.com/tw93/Pake/releases/latest/download/YouTube.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/YouTube_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/YouTube_x86_64.deb">Linux</a>
      </td>
    </tr>
    <tr>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/YouTubeMusic.png width=600 /></td>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/YouTube.jpg width=600 /></td>
    </tr>
    <tr>
        <td>LiZhi
            <a href="https://github.com/tw93/Pake/releases/latest/download/LiZhi.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/LiZhi_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/LiZhi_x86_64.deb">Linux</a>
        </td>
        <td>ProgramMusic
            <a href="https://github.com/tw93/Pake/releases/latest/download/ProgramMusic.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/ProgramMusic_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/ProgramMusic_x86_64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/LiZhi.jpg width=600/></td>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/ProgramMusic.jpg width=600/></td>
    </tr>
    <tr>
        <td>Qwerty
            <a href="https://github.com/tw93/Pake/releases/latest/download/Qwerty.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Qwerty_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Qwerty_x86_64.deb">Linux</a>
        </td>
        <td>CodeRunner
            <a href="https://github.com/tw93/Pake/releases/latest/download/CodeRunner.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/CodeRunner_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/CodeRunner_x86_64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/Qwerty.png width=600/></td>
        <td><img src=https://raw.githubusercontent.com/tw93/static/main/pake/CodeRunner.jpg width=600/></td>
    </tr>
        <tr>
        <td>Flomo
            <a href="https://github.com/tw93/Pake/releases/latest/download/Flomo.dmg">Mac</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Flomo_x64.msi">Windows</a>
            <a href="https://github.com/tw93/Pake/releases/latest/download/Flomo_x86_64.deb">Linux</a>
        </td>
        <td>XiaoHongShu
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

## 开始之前

1. **小白用户**：使用 「常用包下载」 方式来把玩 Pake 的能力，可去 [讨论群](https://github.com/tw93/Pake/discussions) 寻求帮助，也可试试 [Action](https://github.com/tw93/Pake/wiki/%E5%9C%A8%E7%BA%BF%E7%BC%96%E8%AF%91%EF%BC%88%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%EF%BC%89) 方式。
2. **开发用户**：使用 「命令行一键打包」，对 Mac 比较友好，Windows / Linux 需折腾下 [环境配置](https://tauri.app/v1/guides/getting-started/prerequisites)。
3. **折腾用户**：假如你前端和 Rust 都会，那可试试下面的 「[定制开发](#定制开发)」，可深度二次开发定制你的功能。

## 定制开发

开始前请确保电脑已经安装了 Rust `>=1.63` 和 Node `>=16 如 16.18.1` 的环境，此外需参考 [Tauri 文档](https://tauri.app/v1/guides/getting-started/prerequisites) 快速配置好环境才可以开始使用，假如你太不懂，使用上面的命令行打包会更加合适。

```sh
# 安装依赖
npm i

# 本地开发[右键可打开调试模式]
npm run dev

# 打包应用
npm run build

```

## 支持

1. 我有两只猫，一只叫汤圆，一只叫可乐，假如 Pake 让你生活更美好，可以给汤圆可乐 <a href="https://miaoyan.app/cats.html?name=Pake" target="_blank">喂罐头 🥩</a>。

2. 希望大伙玩的过程中有一种学习新技术的喜悦感，假如你发现有很适合做成桌面 App 的网页也很欢迎告诉我。
