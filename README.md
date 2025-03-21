<h4 align="right"> 
<span href=".README.md">English</span> 
<a href="https://github.com/Sjj1024/PakePlus/discussions/2" 
style="margin: 0 10px;" >简体中文</a> 
<a href="https://github.com/Sjj1024/PakePlus/discussions/108">日本语</a>
</h4>  
<p align="center">
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/pakeplus.png" width=138/>
</p>  
<h1 align="center">PakePlus</h1>  
<p align="center"><strong>Turn any webpage into a desktop or mobile app in just 9 minutes. Simple and easy to use.</strong></p>

<div align="left">PakePlus supports Mac, Windows, and Linux, and will soon support Android and iOS. There’s no need to install complex dependencies locally— all you need is a Github Token. Plus, PakePlus is only about 5MB in size. For the latest version, please see the <a href="[#popular-packages](https://github.com/Sjj1024/PakePlus/releases)">release page</a>. or visit: <a href="https://pakeplus.pages.dev" target="_blank">PakePlus Web</a>. Check the README for information on <a href="#popular-packages">popular packages</a> and <a href="#development">custom development</a>. Feel free to share your suggestions in the <a href="https://github.com/Sjj1024/PakePlus/discussions">discussion area</a>.</div>

https://github.com/user-attachments/assets/b88bf541-0b26-4020-9eec-da79e1734fc9

## Features

-   🎐 About 20 times smaller than Electron packages (approximately 5MB!)，It is 10 times faster in performance.
-   🚀 Powered by Rust and Tauri, PakePlus is lighter and faster than JS-based frameworks.
-   📦 Rich built-in feature packs—supporting shortcuts, immersive windows, and minimal customization.
-   👻 PakePlus is just a simple tool—using Tauri to replace older packaging methods，It supports cross - platform desktops and will support mobile devices soon..
-   🤗 PakePlus is easy to use; all you need is a GitHub Token to get a desktop app.
-   🌹 No need to install complex dependencies locally; use Github Action for cloud-based auto-packaging.
-   🧑‍🤝‍🧑 Supports internationalization, user-friendly for a global audience, and it follows your system language automatically.
-   💡 Supports custom js injection. you can write your own js code to inject into the page.
-   🎨 ui is more beautiful, more comfortable to use.
-   📡 It can be directly used on the web side, but the client-side has more powerful functions.
-   🔐 Data security. Your token is only saved locally on your device and will not be uploaded to the server. Your projects are also safely stored in your own Git repository.
-   😈 Support static file packaging. Just drop your dist directory or index.html in, and it becomes a client. Why limit it to a website?

## Popular Packages

<img src=https://sjj1024.github.io/PakePlus/static/imgs/preview.webp  width=1920/>

PakePlus supports installation packages for both ARM and Intel architectures. Most popular program installation packages only include the ARM architecture for macOS and the Intel architecture for Windows. If you need installation packages for additional architectures, please use PakePlus to compile the required package separately.

<table>
    <tr>
        <td>DeepSeek
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/DeepSeek_0.0.1_aarch64.dmg">Mac(Arm)</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/DeepSeek_0.0.1_x64-setup.exe">Windows(x64)</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/DeepSeek_0.0.1_amd64.deb">Linux(x64)</a>
        </td>
        <td>X (Twitter)
            <a href="https://github.com/codegirle/PakePlus/releases/download/Twitter/Twitter_0.0.1_aarch64.dmg">Mac(Arm)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Twitter/Twitter_0.0.1_x64-setup.exe">Windows(x64)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Twitter/twitter_0.0.1_amd64.deb">Linux(x64)</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/deepseek.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/xtwitter.png width=600/></td>
    </tr>
    <tr>
        <td>YouTube
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTube/YouTube_0.0.2_aarch64.dmg">Mac(Arm)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTube/YouTube_0.0.2_x64-setup.exe">Windows(x64)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTube/you-tube_0.0.2_amd64.deb">Linux(x64)</a>
        </td>
        <td>小红书
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/_0.0.1_aarch64.dmg">Mac(Arm)</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/_0.0.1_x64-setup.exe">Windows(x64)</a>
            <a href="https://github.com/Sjj1024/PakePlus/releases/download/OtherFiles/_0.0.1_amd64.deb">Linux(x64)</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/youtube.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/hongshu.png width=600/></td>
    </tr>
        <tr>
        <td>Tiktok
            <a href="https://github.com/codegirle/PakePlus/releases/download/Tiktok/Tiktok_0.0.2_aarch64.dmg">Mac(Arm)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Tiktok/Tiktok_0.0.2_x64-setup.exe">Windows(x64)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Tiktok/tiktok_0.0.2_amd64.deb">Linux(x64)</a>
        </td>
        <td>抖音
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/Douyin_0.0.2_aarch64.dmg">Mac(Arm)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/Douyin_0.0.2_x64-setup.exe">Windows(x64)</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/douyin_0.0.2_amd64.deb">Linux(x64)</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/tiktok.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/static/imgs/douyin.png width=600/></td>
    </tr>
</table>

## Getting Started

1. Download the app from the release page：https://github.com/Sjj1024/PakePlus/releases, double-click to install, and run the app. or visit web: <a href="https://pakeplus.pages.dev" target="_blank">PakePlus Web</a>

2. Configure a Github Token, create a new project, and set up the configurations. get token guide: <a href="https://sjj1024.github.io/PakePlus/index_en.html">English</a> <a href="https://sjj1024.github.io/PakePlus/index_zh.html" style="margin: 0 20px;">简体中文</a><a href="https://sjj1024.github.io/PakePlus/index_ja.html">日本语</a>

```
Explanation of Github Token permissions:
1. For the beta version, token permissions required:
All repositories: Fork an original template repository
Actions: Manage GitHub actions
Administration: Fork and manage files in the repository
Contents: Add, delete, modify, and find repository contents
Issues: Submit issues to PakePlus

1. For the classic version, token permissions required:
repo: Fork and manage template code
workflow: Compile and release your software
```

1. You can preview the app in a new window and click the publish button to package the app.
2. You can download the app from the release page.

## FAQ

1. Mac users may see an “App is damaged” warning on installation. click cancel and Run the following command, then reopen the app:（This is because the application requires an official signature to avoid the prompt of "The application is damaged" popping up after installation. However, the cost of the official signature is $99 per year... Therefore, it is necessary to manually bypass the signature to use it normally）

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
```

1. When you package the app, Mac users may see an “App is damaged” warning on installation. click cancel and Run the following command, then reopen the app:

```sh
sudo xattr -r -d com.apple.quarantine /Applications/YourAppName.app
```

3. If you encounter any issues while using the program, please download the latest version, as versions developed before 2025 were based on Tauri v1.0. In 2025, Tauri was upgraded to v2.0. If the latest version still has issues, please submit an issue with detailed information so that we can update and resolve it more quickly.

4. After you add the GitHub Token, PakePlus will fork a PakePlus repository into your own repository. All your future projects will rely on this repository for creation and compilation, so please do not delete your PakePlus repository.

## Developing PakePlus

If you want to develop PakePlus locally, ensure your environment is prepared beforehand. Make sure Rust `>=1.63` and Node `>=16` (e.g., `16.18.1`) are installed on your computer. For installation guidance, please refer to the [Tauri Documentation](https://tauri.app/v1/guides/getting-started/prerequisites).

If you’re unfamiliar with these, it’s best to try the one-click packaging tool above.

```sh
# Install dependencies
pnpm i

# Local development [Right-click to open debug mode.]
pnpm run dev

# Package the app
pnpm run build

```

## Support

1. wechat and group
 <p align="center" style="display:flex; justify-content: flex-start;" >
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/mywx.png" width=300/>
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/wxcode.png" width=300/>
 </p>

1. If PakePlus has brought joy to your life, feel free to support it.
 <p align="center" style="display:flex; justify-content: flex-start;">
    <img src="https://github.com/Sjj1024/PakePlus/raw/main/docs/static/imgs/pay.png" width=620/>
 </p>

## TODO

1. add auto update feature
2. support build android apk and build ios ipa
3. add upload front build dist to build
