---
layout: home

hero:
    name: 'PakePlus'
    text: 'Turn Web into Desktop/Mobile Apps'
    tagline: Package Web/Vue/React projects into Desktop/Mobile Apps in minutes
    image:
        src: ./pplogo.png
        alt: PakePlus
    actions:
        - theme: brand
          text: Guide
          link: /guide/
        - theme: brand
          text: WebBeta
          link: https://PakePlus.netlify.app/
        - theme: brand
          text: Download
          link: /download/

features:
    - title: Open Source
      details: PakePlus is open source and you can find its source code on GitHub
      icon: 🐙
    - title: Cross Platform
      details: Windows/macOS/Linux/Android/iOS are all supported
      icon: 💻
    - title: Small Size
      details: The size is smaller than Electron package by about 20 times (less than 5M!)
      icon: 🚀
    - title: Mobile Support
      details: Use native framework to package Android and iOS APP, which is smaller and faster
      icon: 📲
    - title: Easy to Use
      details: UI is simple, no need to install any development environment, save time and save money
      icon: 📦
    - title: Simultaneous Compilation
      details: Just minutes, one click to compile multiple platforms, no environment and time anxiety
      icon: 🧘‍♀️
    - title: Internationalization
      details: Support internationalization, friendly to global users
      icon: 🌍
    - title: Customization
      details: You can customize the application icon, application name, and inject JavaScript code
      icon: 🎨
    - title: Static File Support
      details: Support packaging static html files or Vue/React projects compiled dist
      icon: 🍀
    - title: Local Build
      details: Supports local packaging and does not require environments. only takes 30 seconds
      icon: 🍔
    - title: Without Token
      details: It's okay without Token, local packaging is simple, and no Token is needed
      icon: 🥥
    - title: Support Apis
      details: Support calling system Apis in JS scripts, such as downloading files, etc
      icon: ⚔️
    - title: Debug Support
      details: Support debug mode, whether in preview or release, you can find bugs
      icon: 🐞
    - title: Data Security
      details: PakePlus will not upload any data, all data is stored on your computer
      icon: 🔒
    - title: Technical Support
      details: If you encounter any problems during use, you can chat with us
      icon: 💬
---

<div :class="$style.buildInfo">
    <span :class="$style.buildTime">Built Time：{{ data.buildTime }}</span>
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
