<h4 align="right"> 
<a href="https://github.com/Sjj1024/PakePlus">English</a> 
<span style="margin: 0 10px;" >中文</span> 
<a href="https://github.com/Sjj1024/PakePlus/discussions/108">日本语</a>
</h4>  
<p align="center">
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/pakeplus.png" width=138/>
</p>  
<h1 align="center">PakePlus</h1>  
<p align="center"><strong>将任何网页变成桌面应用和移动应用仅需几分钟</strong></p>

<p align="center">
    <a href="https://github.com/Sjj1024/PakePlus/releases"><img src="https://img.shields.io/github/v/release/Sjj1024/PakePlus?style=flat-square&logo=github" alt="Release"></a>
    <a href="https://github.com/Sjj1024/PakePlus/stargazers"><img src="https://img.shields.io/github/stars/Sjj1024/PakePlus?style=flat-square&logo=github" alt="Stars"></a>
    <a href="https://github.com/Sjj1024/PakePlus/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/Sjj1024/PakePlus/build.yml?style=flat-square&logo=github" alt="Build"></a>
    <a href="https://github.com/Sjj1024/PakePlus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Sjj1024/PakePlus?style=flat-square&logo=github" alt="License"></a>
    <a href="https://hellogithub.com/repository/d148f8fac78b45fe9b94c82757c3f86b" target="_blank"><img src="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=d148f8fac78b45fe9b94c82757c3f86b&claim_uid=LXfeQOxRDEmSUGC&theme=small" alt="Featured｜HelloGitHub"></a>
</p>

<div align="left">PakePlus 不仅支持 Mac、Windows 和 Linux，并且支持 Android 和 iOS。无需在本地安装任何依赖环境，只需要一个Github Token就可以了，而且PakePlus本身也才仅仅5M左右小大，最新版本下载请看：<a href="[#popular-packages](https://github.com/Sjj1024/PakePlus/releases)">发布地址</a>。或者访问网页版: <a href="https://pakeplus.pages.dev" target="_blank">PakePlus Web</a>。 查看 README 以获取<a href="#popular-packages">热门包</a>和<a href="#development">自定义开发</a>信息。欢迎在<a href="https://github.com/Sjj1024/PakePlus/discussions">讨论区</a>分享你的建议。进微信交流群：<a href="https://pakeplus.com/zh/exchange/">商业群聊</a></div>

> **PakePlus 是完全独立开发的项目**，未使用 [Pake](https://github.com/tw93/Pake) 的任何代码、架构或设计，所有实现均为原创。我们尊重开源社区的知识产权，如有任何疑问，请随时与我们联系。

https://github.com/user-attachments/assets/b88bf541-0b26-4020-9eec-da79e1734fc9

## 特性

-   💎 体积比 Electron 包小约 20 倍（小于 5M！），性能快 10 倍
-   🚀 基于 Rust Tauri，PakePlus 比基于 JS 的框架更轻量、更快
-   📦 内置丰富功能包——支持快捷方式、沉浸式窗口、极简自定义
-   👻 PakePlus 只是一个极简的软件，用 Tauri 替代旧的打包方式，支持跨平台桌面
-   📲 使用原生框架打包 Android 和 iOS APP，比 Tauri2 体积更小更快
-   🤗 UI 操作简单，不用在本地安装任何开发环境，省时省心省硬盘空间
-   🌹 不需要在本地安装任何复杂的依赖环境，使用 Github Action 云端自动打包
-   🧑‍🤝‍🧑 支持国际化，对全球用户都非常友好，并且会自动跟随你的电脑系统语言
-   💡 支持自定义 js 注入。你可以编写自己的 js 代码注入到页面中
-   🎨 ui 界面更美观更友好对新手更实用，使用更舒适，支持中文名称打包
-   📡 支持网页端直接使用，但是客户端功能更强大，更推荐客户端
-   🔐 数据安全，你的 token 仅保存在你本地，不会上传服务器，你的项目也都在你自己的 git 中安全存储
-   🍔 支持本地打包，而且不需要安装任何依赖环境，本地打包仅需30秒
-   🥥 没有Github Token没关系，本地打包即简单又方便，还不需要Token
-   ⚔️ 支持在JS脚本中调用系统级API，例如下载文件/执行命令/打开新窗口等
-   🍀 支持静态文件打包，将 Vue/React 等项目编译后的 dist 目录或者 index.html 丢进来即可成为客户端，何必是网站
-   🐞 支持 debug 调试模式，无论是预览阶段还是发布阶段，都可以找到 bug 并消灭 bug
-   💬 如果在你使用过程中遇到问题，随时可以加入我们的技术交流群咨询

## 使用场景

-   你有一个网站，想把它立刻变成桌面和手机应用，立刻高大尚。
-   你有一个 Vue/React 等项目，不想购买服务器，想把它打包成桌面应用。
-   你的 Cocos 游戏是不是想要跨平台客户端运行？完全没有问题。
-   你的 Unity 项目是不是想要跨平台打包为客户端？也完全没有问题。
-   隐藏你的网站地址，不被随意传播和使用，防止爬虫程序获取你的网站内容。
-   公司内网平台，不想让别人知道你的网站地址，只允许通过你的客户端访问。
-   想把某个网站变成自己的客户端，实现自定义功能，比如注入 js 实现自动化操作。
-   网站广告太多？想把它隐藏起来，用无所不能的 js 来屏蔽它们吧。
-   需要使用 tauri2 打包，但是依赖环境太复杂，本地电脑硬盘不够用，就用 PakePlus

## 热门包

<img src=https://sjj1024.github.io/PakePlus/static/imgs/preview.webp  width=1920/>
PakePlus支持arm和x64架构的安装包，流行的程序安装包仅仅包含了mac的arm和windows的x64架构，如果需要更多架构的安装包，请使用PakePlus单独编译自己需要的安装包。

<table>
    <tr>
        <td>DeepSeek
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/DeepSeek_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/DeepSeek_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/DeepSeek_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>X (Twitter)
            <a href="https://github.com/codegirle/PakePlus/releases/download/X/X_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/X/X_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/X/x_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/deepseek.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/xtwitter.png width=600/></td>
    </tr>
    <tr>
        <td>YouTube
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTuBe/YouTube_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTuBe/YouTube_0.0.1_x64_en-US.msi">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTuBe/you-tube_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>小红书
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/youtube.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/hongshu.png width=600/></td>
    </tr>
        <tr>
        <td>Tiktok
            <a href="https://github.com/codegirle/PakePlus/releases/download/TikTok/TikTok_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/TikTok/TikTok_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/TikTok/tik-tok_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>抖音
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/tiktok.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/douyin.png width=600/></td>
    </tr>
</table>

## 开始之前

1.从发布页面下载应用程序：https://github.com/Sjj1024/PakePlus/releases，  
双击安装并运行应用程序。
或者使用网页版：<a href="https://pakeplus.pages.dev" target="_blank">PakePlus Web</a>

2.配置 Github Token，并创建一个新项目并进行配置。Token 获取方法:  
 <a href="https://sjj1024.github.io/PakePlus/index_en.html">English</a> <a href="https://sjj1024.github.io/PakePlus/index_zh.html" style="margin: 0 20px;">简体中文</a><a href="https://sjj1024.github.io/PakePlus/index_ja.html">日本语</a>

```
Github token权限说明：
1.bate版本token需要的权限说明：
All repositories：要fork一个原始模板仓库
Actions：操作github action
Administration：对仓库进行fork和文件管理
Contents：对仓库内容进行添加/删除/修改/查找等操作
Issues：向PakePlus提交问题

2.classic版本需要的token权限说明：
repo：fork和管理模板代码
workflow：编译和发布你的软件
```

3.你可以在客户端中预览应用程序，点击发布按钮打包应用程序。  
4.你可以从发布页面下载编译后的应用程序，并实现安装使用。

## 常见问题

1. **Mac 用户可能在安装时看到“应用已损坏”的警告。** 请点击“取消”，然后运行以下命令，再重新打开应用：(这是由于应用需要官方签名，才能避免安装后弹出“应用已损坏”的提示，但官方签名的费用每年 99 美元...因此，需要手动绕过签名以正常使用)

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
```

2. **当你打包应用时，Mac 用户可能在安装时看到“应用已损坏”的警告。** 请点击“取消”，然后运行以下命令，输入电脑密码，再重新打开应用：

```sh
sudo xattr -r -d com.apple.quarantine /Applications/YourAppName.app
```

3. **如果您在使用该程序时遇到任何问题，请下载最新版本。** 2025 年之前开发的版本基于 Tauri v1.0，而在 2025 年，Tauri 已升级至 v2.0。如果最新版本仍然存在问题，请提交 Issue 并附上详细信息，以便我们能够更快地更新和解决问题。

4. 当你添加 Github Token 之后，PakePlus 会 Fork 一个 PakePlus 仓库到你的仓库中，以后你的所有项目都会依赖这个仓库创建和编译，请勿删除你的 PakePlus 仓库。

## 开发 PakePlus

如果你想在本地开发 PakePlus，在开始之前，准备好你的环境。确保你已在计算机上安装了 Rust `>=1.63` 和 Node `>=16`（例如 `16.18.1`）。有关安装指南，请参阅 [Tauri 文档](https://tauri.app/v1/guides/getting-started/prerequisites)。

如果你不熟悉这些，最好尝试上述的一键打包工具。

```sh
# 安装依赖
pnpm i

# 本地开发 [右键单击以打开调试模式。]
pnpm run dev

# 打包应用程序
pnpm run build
```

## 支持

1. 💖 如果对你有帮，可以请我喝咖啡.
 <p align="center" >
    <img src="https://files.pakeplus.com/sponsor.webp" />
 </p>

如果你有微信，可以加入我们的群聊或者加我微信(lanxingme)，我会拉你进群聊。注意：

1. 优先推荐加入群聊，有问题先在群里问，说不定有人已经解决了，就会及时帮到你。
2. 群里讨论，会将大家遇到的问题汇总，如果别人同样遇到了，就会帮助更多的人。
3. 如果群里没有人能解决你的问题，可以艾特@我，我看到了就会回复你。
4. 群二维码过期或者群人数过多了，可以加我微信，我会拉你进群聊。
5. 如果有问题需要单独咨询服务，请先赞助 PakePlus，然后再咨询问题。
6. 如果不方便加微信，也可以在 github 上提 issue，我会尽快回复。
7. 由于我一个人时间精力有限，所以请务必按照上述流程咨询。
8. 群内仅限讨论技术问题，不要发广告、发垃圾信息、发其他无关的信息。
9. 群内禁止发任何涉及政治、宗教、暴力、色情、恐怖主义等内容的信息。
 <p align="center" style="display:flex; justify-content: flex-start;" >
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/mywx.png" width=200/>
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/wxcode.png" width=200/>
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/qqpp3.jpg" width=200/>
 </p>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sjj1024/PakePlus&type=Date)](https://www.star-history.com/#Sjj1024/PakePlus&Date)
