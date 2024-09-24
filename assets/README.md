<h4 align="right"><strong>English</strong> | <a href="https://github.com/tw93/Pake/blob/master/README_CN.md">简体中文</a> | <a href="https://github.com/tw93/Pake/blob/master/README_JP.md">日本語</a></h4>
<p align="center">
    <img src="./app-icon.png" width=138/>
</p>
<h1 align="center">PakePlus</h1>
<p align="center"><strong>Turn any webpage into desktop app and mobile app with Rust <em>is ease</em>.</strong></p>

<div align="left">PakePlus supports Mac, Windows, and Linux. Check out README for <a href="#popular-packages">Popular Packages</a>, <a href="#command-line-packaging">Command-Line Packaging</a>, and <a href="#development">Customized Development</a> information. Feel free to share your suggestions in <a href=https://github.com/tw93/Pake/discussions>Discussions</a>.</div>

## Features

-   🎐 Nearly 20 times smaller than an Electron package (around 5M!)
-   🚀 With Rust Tauri, PakePlus is much more lightweight and faster than JS-based frameworks.
-   📦 Battery-included package — shortcut pass-through, immersive windows, and minimalist customization.
-   👻 PakePlus is just a simple tool — replace the old bundle approach with Tauri (though PWA is good enough).

## Popular Packages

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

<summary>🏂 You can download more applications from <a href="https://github.com/tw93/Pake/releases">Releases</a>. <b>Click here to expand the shortcuts reference!</b></summary>

## Before starting

1. **For beginners**: Play with Popular Packages to find out Pake's capabilities, or try to pack your application with [GitHub Actions](<https://github.com/tw93/Pake/wiki/Online-Compilation-(used-by-ordinary-users)>). Don't hesitate to reach for assistance at [Discussion](https://github.com/tw93/Pake/discussions)!
2. **For developers**: “Command-Line Packaging” supports macOS fully. For Windows/Linux users, it requires some tinkering. [Configure your environment](https://tauri.app/v1/guides/getting-started/prerequisites) before getting started.
3. **For hackers**: For people who are good at both front-end development and Rust, how about customizing your apps' function more with the following [Customized Development](#development)?

## Development

Prepare your environment before starting. Make sure you have Rust `>=1.63` and Node `>=16` (e.g., `16.18.1`) installed on your computer. For installation guidance, see [Tauri documentation](https://tauri.app/v1/guides/getting-started/prerequisites).

If you are unfamiliar with these, it is better to try out the above tool to pack with one click.

```sh
# Install Dependencies
npm i

# Local development [Right-click to open debug mode.]
npm run dev

# Pack application
npm run build
```
