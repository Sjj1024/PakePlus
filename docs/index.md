---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: 'PakePlus'
    text: '何必是网站，秒变桌面应用和手机应用'
    tagline: 打包网页/Vue/React项目为桌面/手机应用只需几分钟
    image:
        src: ./pplogo.png
        alt: PakePlus
    actions:
        - theme: brand
          text: 下载地址
          link: https://github.com/Sjj1024/PakePlus/releases
        - theme: alt
          text: 使用指南
          link: /guide/

features:
    - title: 开源免费
      details: PakePlus 是开源免费的，你可以在 GitHub 上找到它的源代码
      icon: 🐙
    - title: 跨平台
      details: PakePLus和打包后的软件支持 Windows/macOS/Linux/Android/iOS等系统
      icon: 💻
    - title: 小体积
      details: 体积比 Electron 包小约 20 倍（小于5M!），性能快 10 倍
      icon: 🚀
    - title: 支持移动端
      details: 使用原生框架打包 Android 和 iOS APP，比Tauri2体积更小更快
      icon: 📲
    - title: 简单易用
      details: PakePlus 界面化易于操作使用，只需一个GitHub Token(永久免费)
      icon: 📦
    - title: 同时编译
      details: 只需几分钟，一键编译所有平台安装包，不用再为环境焦虑
      icon: 🧘🏻‍♀️
    - title: 国际化
      details: 支持国际化，对全球用户都友好，并且会自动跟随你的电脑系统语言
      icon: 🌍
    - title: 支持自定义
      details: 你可以自定义应用图标、应用名称(支持中文)，支持注入JavaScript代码
      icon: 🎨
    - title: 支持静态文件
      details: 你可以将静态html文件或Vue/React等项目编译后的dist打包为应用
      icon: 🍀
    - title: 数据安全
      details: PakePlus 不会上传你的任何数据，所有数据都保存在你的电脑上
      icon: 🔒
---

<div :class="$style.buildInfo">
    <span :class="$style.buildTime">构建时间：{{ data.buildTime }}</span>
</div>

<script setup>
import { data } from './static/js/buildtime.data.ts'
</script>

<style module>

.buildInfo{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
}

.buildTime{
    color: gray;
}
</style>
