<h4 align="right"> 
<a href="./docs/README.md">English</a> 
<a href="./docs/README_ZH.md" 
style="margin: 0 10px;" >简体中文</a> 
<a href="./docs/README_JP.md">日本语</a>
</h4>  
<p align="center">
    <img src="./docs/pakeplus.png" width=138/>
</p>  
<h1 align="center">PakePlus</h1>  
<p align="center"><strong>Turn any webpage into a desktop or mobile app in just 9 minutes. Simple and easy to use.</strong></p>

<div align="left">PakePlus supports Mac, Windows, and Linux, and will soon support Android and iOS. There’s no need to install complex dependencies locally— all you need is a Github Token. Plus, PakePlus is only about 5MB in size. For the latest version, please see the <a href="[#popular-packages](https://github.com/Sjj1024/PakePlus/releases)">release page</a>. Check the README for information on <a href="#popular-packages">popular packages</a> and <a href="#development">custom development</a>. Feel free to share your suggestions in the <a href="https://github.com/Sjj1024/PakePlus/discussions">discussion area</a>.</div>

https://github.com/user-attachments/assets/b88bf541-0b26-4020-9eec-da79e1734fc9

## Features

-   🎐 About 20 times smaller than Electron packages (approximately 5MB!)
-   🚀 Powered by Rust and Tauri, PakePlus is lighter and faster than JS-based frameworks.
-   📦 Rich built-in feature packs—supporting shortcuts, immersive windows, and minimal customization.
-   👻 PakePlus is just a simple tool—using Tauri to replace older packaging methods (even though PWA is often sufficient).
-   🤗 PakePlus is easy to use; all you need is a GitHub Token to get a desktop app.
-   🌹 No need to install complex dependencies locally; use Github Action for cloud-based auto-packaging.
-   🧑‍🤝‍🧑 Supports internationalization, user-friendly for a global audience, and it follows your system language automatically.
-   💡 Supports custom js injection. you can write your own js code to inject into the page.
-   🎨 ui is more beautiful, more comfortable to use.

## Popular Packages

<img src=https://sjj1024.github.io/PakePlus/preview.webp  width=1920/>

<table>
    <tr>
        <td>Apple
            <a href="https://github.com/codegirle/PakePlus/releases/download/Apple/Apple_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Apple/Apple_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Apple/apple_0.0.1_amd64.deb">Linux</a>
        </td>
        <td>X (Twitter)
            <a href="https://github.com/codegirle/PakePlus/releases/download/Twitter/Twitter_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Twitter/Twitter_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Twitter/twitter_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/apple.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/xtwitter.png width=600/></td>
    </tr>
    <tr>
        <td>YouTube
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTube/YouTube_0.0.2_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTube/YouTube_0.0.2_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/YouTube/you-tube_0.0.2_amd64.deb">Linux</a>
        </td>
        <td>小红书(Little Red Book)
            <a href="https://github.com/codegirle/PakePlus/releases/download/Hongshu/_0.0.1_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Hongshu/_0.0.1_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Hongshu/_0.0.1_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/youtube.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/hongshu.png width=600/></td>
    </tr>
        <tr>
        <td>Tiktok
            <a href="https://github.com/codegirle/PakePlus/releases/download/Tiktok/Tiktok_0.0.2_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Tiktok/Tiktok_0.0.2_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Tiktok/tiktok_0.0.2_amd64.deb">Linux</a>
        </td>
        <td>抖音
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/Douyin_0.0.2_aarch64.dmg">Mac</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/Douyin_0.0.2_x64-setup.exe">Windows</a>
            <a href="https://github.com/codegirle/PakePlus/releases/download/Douyin/douyin_0.0.2_amd64.deb">Linux</a>
        </td>
    </tr>
    <tr>
        <td><img src=https://sjj1024.github.io/PakePlus/tiktok.png width=600/></td>
        <td><img src=https://sjj1024.github.io/PakePlus/douyin.png width=600/></td>
    </tr>
</table>

## Getting Started

1. Download the app from the release page：https://github.com/Sjj1024/PakePlus/releases, double-click to install, and run the app.
2. Configure a Github Token, create a new project, and set up the configurations. get token guide: <a href="https://sjj1024.github.io/PakePlus/">English</a> <a href="https://sjj1024.github.io/PakePlus/index_zh.html" style="margin: 0 10px;">简体中文</a><a href="https://sjj1024.github.io/PakePlus/index_zh.html">日本语</a>

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

1. Mac users may see an “App is damaged” warning on installation. click cancel and Run the following command, then reopen the app:

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
```

2. When you package the app, Mac users may see an “App is damaged” warning on installation. click cancel and Run the following command, then reopen the app:

```sh
sudo xattr -r -d com.apple.quarantine /Applications/YourAppName.app
```

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

# github action
releaseDraft: false：means this version is not a draft version, it will be considered as a stable release.
prerelease: false：means this version is not a pre-release version, which means it is a stable version.
publish: false：means this version will not be published immediately, although it will be created, it will not be publicly displayed.
```

## Support

1. If PakePlus has brought joy to your life, feel free to support it.
 <p align="center" >
    <img src="./docs/pay.png" />
 </p>

2. wechat group
 <p align="center" >
    <img src="./docs/wxcode.png" width=300/>
 </p>

## TODO

1. add auto update feature
2. support build android apk and build ios ipa
3. add upload front build dist to build
