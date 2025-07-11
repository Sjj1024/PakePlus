---
layout: doc
---

# PakePlus 简介

PakePlus 是一个基于 Tauri2 和 Github 的打包工具，你也可以叫我 PP 或者 2P🫣，只需要一个 Github Token 就可以将任意网站/Vue/React 等项目的 dist 静态文件打包为跨平台桌面软件和手机软件，体积小巧(小于 5M)并且性能还高，而且 PakePlus 本身也才仅仅 8M 左右。        
<span style="color:red">
**注意：** 
现阶段避免大量使用导致 Github 服务器压力过大，PakePlus 已做限制：仅可创建 1 个项目，每小时可发布一次！详细原因请看：[PakePlus 为什么要做限制？](https://juejin.cn/post/7504461472237404214)  
PakePlus仅作为打包工具使用，不支持软件签名，打包后的软件仅限自己使用，请勿传播或商业用途，否则后果自负。
</span> 

<BiliBili />

相比 Pake 优势在于：

1. Pake 需要在本地安装复杂臃肿的 rust 和 node 依赖环境，动辄几个 G 的电脑存储就没有了，我的电脑硬盘根本不够用啊...
2. 不需要懂命令行和各种复杂配置，PakePlus 界面化操作只需要点点点即可完成打包任务，而且软件名称支持中文，小学生来了都可以轻松上手 😌
3. 我也尝试了 tauri2 的移动端，但我很难接受 tauri2 移动端的臃肿（打包30M左右），所以使用原生 Android 和 iOS 框架打包编译，结果仅5M不到，还可以在移动端发布 debug 版本，方便开发调试

<!-- <video src="//player.bilibili.com/player.html?isOutside=true&aid=114585499602898&bvid=BV1WCjzz5Eao&cid=30198203272&p=1" controls="controls" width="100%"></video> -->

## 特性

-   🎐 体积比 Electron 包小约 20 倍（小于 5M！），性能快 10 倍
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
-   🍔 支持本地打包，而且不需要安装任何依赖环境，本地打包仅需30秒，不限制文件数量和大小
-   🥥 没有Github Token没关系，本地打包即简单又方便，还不需要Token，而且速度快
-   ⚔️ 支持在JS脚本中调用系统级API，例如下载文件/执行命令/打开新窗口等，前端变全端
-   🍀 支持静态文件打包，将 Vue/React 等项目编译后的 dist 目录或者 index.html 丢进来即可成为客户端，何必是网站
-   🐞 支持 debug 调试模式，无论是预览阶段还是发布阶段，都可以找到 bug 并消灭 bug
-   💬 如果在你使用过程中遇到问题，随时可以加入我们的技术交流群咨询

## 使用场景

-   你有一个网站，想把它立刻变成桌面应用，立刻高大尚。
-   你有一个 Vue/React 等项目，不想购买服务器，想把它打包成桌面应用。
-   你的 Cocos 游戏是不是想要跨平台客户端运行？完全没有问题。
-   你的 Unity 项目是不是想要跨平台打包为客户端？也完全没有问题。
-   隐藏你的网站地址，不被随意传播和使用，防止爬虫程序获取你的网站内容。
-   公司内网平台，不想让别人知道你的网站地址，只允许通过你的客户端访问。
-   想把某个网站变成自己的客户端，实现自定义功能，比如注入 js 实现自动化操作。
-   网站广告太多？想把它隐藏起来，用无所不能的 js 来屏蔽它们吧。
-   需要使用 tauri2 打包，但是依赖环境太复杂，本地电脑硬盘不够用，就用 PakePlus

## 热门包

<img src="../../static/imgs/preview.webp"  width=1920/>

PakePlus 支持 arm 和 x64 架构的安装包，流行的程序安装包仅仅包含了 mac 的 arm(M 芯片)版本 和 windows 的 x64 和 Linux 的 x64 版本，如果需要更多架构的安装包，请使用 PakePlus 单独编译自己需要的安装包。

<Popular />

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sjj1024/PakePlus,Sjj1024/PakePlus-iOS,Sjj1024/PakePlus-Android&type=Date)](https://www.star-history.com/#Sjj1024/PakePlus&Sjj1024/PakePlus-iOS&Sjj1024/PakePlus-Android&Date)


<script setup>
import Popular from '../components/popular.vue'
import BiliBili from "../components/bilibili.vue"
</script>
