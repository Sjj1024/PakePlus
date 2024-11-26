<h4 align="right"> 
<a href="./README.md">English</a> 
<a href="./README_ZH.md" style="margin: 0 10px;" >中文</a> 
<a href="./README_JP.md">日本语</a>
</h4>  
<p align="center">
    <img src="./pakeplus.png" width=138/>
</p>  
<h1 align="center">PakePlus</h1>  
<p align="center"><strong>9分钟就可以将任何网页变成桌面应用和移动应用，简单易用。</strong></p>

<div align="left">PakePlus 支持 Mac、Windows 和 Linux，很快也将支持 Android 和 iOS。无需在本地安装复杂的依赖环境，只需要一个Github Token就可以了，而且PakePlus本身也才仅仅5M左右小大，最新版本下载请看：<a href="[#popular-packages](https://github.com/Sjj1024/PakePlus/releases)">发布地址</a>。查看 README 以获取<a href="#popular-packages">热门包</a>和<a href="#development">自定义开发</a>信息。欢迎在<a href=https://github.com/Sjj1024/PakePlus/discussions>讨论区</a>分享你的建议。</div> 加我微信进微信交流群：lanxingme 。

https://github.com/user-attachments/assets/b88bf541-0b26-4020-9eec-da79e1734fc9

## 特性

-   🎐 体积比 Electron 包小约 20 倍（约 5M！）
-   🚀 使用 Rust Tauri，PakePlus 比基于 JS 的框架更轻量、更快。
-   📦 内置丰富功能包——支持快捷方式、沉浸式窗口、极简自定义。
-   👻 PakePlus 只是一个简单的工具——用 Tauri 替代旧的打包方式（虽然 PWA 也够用了）。
-   🤗 PakePlus 易于操作使用，只需一个 GitHub Token，即可获得桌面应用。
-   🌹 不需要在本地安装任何复杂的依赖环境，使用 Github Action 云端自动打包。
-   🧑‍🤝‍🧑 支持国际化，对全球用户都非常友好，并且会自动跟随你的电脑系统语言。
-   💡 支持自定义 js 注入。你可以编写自己的 js 代码注入到页面中。
-   🎨 ui 更美观，使用更舒适。

## 热门包

<img src=https://sjj1024.github.io/PakePlus/preview.webp  width=1920/>

<table>
    <tr>
        <td>Apple
            <a href="https://github.com/codegirle/PakePlus/releases/download/Apple/Apple_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Apple/Apple_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Apple/apple_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>X (Twitter)
            <a href="https://github.com/codegirle/PakePlus/releases/download/X/X_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/X/X_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/X/x_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/apple.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/xtwitter.png width=600/></td>
    </tr>
    <tr>
        <td>YouTube
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTuBe/YouTube_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTuBe/YouTube_0.0.1_x64_en-US.msi">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTuBe/you-tube_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>小红书(Little Red Book)
            <a href="https://github.com/codegirle/PakePlus/releases/download/XiaoHongShu/_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/XiaoHongShu/_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/XiaoHongShu/_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/youtube.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/hongshu.png width=600/></td>
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
        <td><img src=https://sjj1024.github.io/PakePlus/tiktok.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/douyin.png width=600/></td>
    </tr>
</table>

## 开始之前

1.从发布页面下载应用程序：https://github.com/Sjj1024/PakePlus/releases，双击安装并运行应用程序  
2.配置 Github Token，并创建一个新项目并进行配置。
Token 获取方法: <a href="https://sjj1024.github.io/PakePlus/">English</a> <a href="https://sjj1024.github.io/PakePlus/index_zh.html" style="margin: 0 10px;">简体中文</a><a href="https://sjj1024.github.io/PakePlus/index_zh.html">日本语</a>

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

3.你可以在新窗口中预览应用程序，点击发布按钮打包应用程序  
4.你可以从发布页面下载应用程序

## 常见问题

1. mac 用户安装提示：文件已损坏，执行下面命令后重新打开就可以了：

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
```

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

1. 如果你觉得 PakePlus 给你的生活带来了乐趣，你可以为它充点能量。
 <p align="center">
         <img src="./pay.png" />
 </p>
