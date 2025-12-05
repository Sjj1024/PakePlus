---
layout: doc
---

# PakePlus Guide

PakePlus is a packaging tool based on Tauri2 and GitHub. You can also call me PP or 2P🫣. you can package any website/Vue/React project's static `dist` files into a cross-platform desktop application. It’s compact (less than 5M) and high-performance, while PakePlus itself is only about 8M.

<video src="../static/videos/pakeplus.mp4" controls="controls" width="100%"></video>

## Features

-   🎐 **20x smaller** than Electron packages (less than 5M!) and **10x faster** in performance
-   🚀 Built on **Rust Tauri**, making PakePlus **lighter and faster** than JS-based frameworks
-   📦 **Rich built-in features**—supports shortcuts, immersive windows, and minimalist customization
-   👻 PakePlus is just an **ultra-lightweight** tool that replaces old packaging methods with Tauri, supporting **cross-platform desktop**
-   📲 Uses **native frameworks** to package Android and iOS apps, resulting in **smaller and faster** builds than Tauri2
-   🤗 **Simple UI**—no need to install any local dev environment, saving time, effort, and disk space
-   🌹 No complex dependencies required—**automatically packages in the cloud** using GitHub Actions
-   🧑‍🤝‍🧑 Supports **internationalization**, friendly to global users, and **auto-detects** your system language
-   💡 **Custom JS injection**—write and inject your own JS code into the page
-   🎨 **Sleeker, more user-friendly UI**, optimized for beginners, supports Chinese naming for packages
-   📡 Works in a **web browser**, but the **desktop client offers more powerful features** (recommended)
-   🔐 **Data security**—your token is stored locally, never uploaded, and your projects stay safe in your own Git repos
-   🍀 **Static file packaging**—just drop your Vue/React project’s `dist` folder or `index.html`, and it becomes a desktop app (why keep it just a website?)
-   🐞 **Debug mode**—find and fix bugs during preview or release stages
-   💬 **Join our tech community** anytime if you encounter issues

## Use Cases

-   Turn **any website into a desktop app** instantly, making it look more professional.
-   Package **Vue/React projects** into desktop apps **without needing a server**.
-   Want your **Cocos game** to run as a cross-platform app? **No problem.**
-   Need to package your **Unity project** as a cross-platform client? **Also no problem.**
-   **Hide your website URL** to prevent unauthorized sharing and web scraping.
-   **Company intranet tools**—restrict access to only your client, keeping the URL private.
-   Turn a website into your own app and **add custom features**, like injecting JS for automation.
-   Too many **annoying ads**? Block them with custom JS.
-   Want to use **Tauri2 for packaging**, but your local environment is too bloated? **PakePlus saves disk space!**

## Popular

<img src="../static/imgs/preview.webp"  width=1920/>

PakePlus supports installation packages for both ARM and Intel architectures. Popular program installation packages typically only include the ARM version (M-series chips) for Mac, the Intel (x64) version for Windows, and the x64 version for Linux. If you need installation packages for additional architectures, you can use PakePlus to compile custom packages tailored to your specific needs.

<Popular />

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Sjj1024/PakePlus,Sjj1024/PakePlus-iOS,Sjj1024/PakePlus-Android&type=Date)](https://www.star-history.com/#Sjj1024/PakePlus&Sjj1024/PakePlus-iOS&Sjj1024/PakePlus-Android&Date)

<script setup>
import Popular from '../components/popular.vue'
</script>
