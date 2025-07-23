# 桌面端 API

::: danger 注意
使用桌面端 API 的前提是在更多配置中，开启全局 TauriApi，然后才可以打包发布使用！  
:::

桌面端 API 主要是集成了 tauri2 的所有 api 接口，还有 PakePlus 自定义的一些 api 接口，一定要开启全局 TauriApi，然后才可以打包发布使用，否则不生效的。开发过程中，可以通过 window.**TAURI** 来查看有哪些 api 接口，并可以查看接口类型。

## JS 脚本中使用

```js
// core
const {
    addPluginListener,
    invoke,
    Channel,
    checkPermissions,
    convertFileSrc,
    isTauri,
    PluginListener,
    requestPermissions,
    Resource,
    transformCallback,
    SERIALIZE_TO_IPC_FN,
} = window.__TAURI__.core

// app
const {
    defaultWindowIcon,
    fetchDataStoreIdentifiers,
    getIdentifier,
    getName,
    getTauriVersion,
    getVersion,
    hide,
    removeDataStore,
    setDockVisibility,
    setTheme,
    show,
} = window.__TAURI__.app

// event
const { emit, emitTo, listen, once } = window.__TAURI__.event

// dpi
const {
    LogicalPosition,
    LogicalSize,
    PhysicalPosition,
    PhysicalSize,
    Position,
    Size,
} = window.__TAURI__.dpi

// image
const { Image, transformImage } = window.__TAURI__.image

// menu
const {
    CheckMenuItem,
    IconMenuItem,
    itemFromKind,
    Menu,
    MenuItem,
    NativeIcon,
    PredefinedMenuItem,
    Submenu,
} = window.__TAURI__.menu

// path
const {
    appDataDir,
    appConfigDir,
    appLocalDataDir,
    appCacheDir,
    appLogDir,
    audioDir,
    cacheDir,
    configDir,
    dataDir,
    desktopDir,
    documentDir,
    downloadDir,
    executableDir,
    fontDir,
    homeDir,
    pictureDir,
    publicDir,
    resourceDir,
    runtimeDir,
    templateDir,
    videoDir,
    sep,
    delimiter,
    basename,
    dirname,
    extname,
    join,
    normalize,
    resolve,
    isAbsolute,
    localDataDir,
    resolveResource,
    tempDir,
} = window.__TAURI__.path

// 调用新建窗口等函数
const { WebviewWindow } = window.__TAURI__.webviewWindow

// 等等接口，请参考Tauri2官方文档：https://v2.tauri.app/reference/javascript/api/#vanilla-js-api
```

## Vue/React/Next/等使用

```js
// 安装依赖，就可以支持类型提示等
// core api
pnpm install @tauri-apps/api

// dialog api
pnpm install @tauri-apps/plugin-dialog

// fs api
pnpm install @tauri-apps/plugin-fs

// os api
pnpm install @tauri-apps/plugin-os

// 等等接口，请参考Tauri2官方文档：https://v2.tauri.app/reference/javascript/api/#vanilla-js-api
```

## Tauri2Api

文档待更新......

## Tauri2PluginApi

文档待更新......

## PakePlusApi

本章后面的 API 接口是 PakePlus 开发的一些 rust 后端接口，可以在 js 中直接调用使用，也仅仅只能在 PakePlus 项目中打包使用。请勿将此 API 用于原生的 tauri 项目。

## 打开 URL(本窗口)

在脚本中添加以下代码，即可实现打开 URL(本窗口)

```js
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        location.href = origin.href
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
```

## 打开 URL(新窗口)

在脚本中添加以下代码，即可实现打开 URL(新窗口)

```js
const { WebviewWindow } = window.__TAURI__.webviewWindow

const webview = new WebviewWindow('my-label', {
    url: 'https://pakeplus.com/',
    x: 500,
    y: 500,
    width: 800,
    height: 400,
    focus: true,
    title: 'PakePlus Window',
    alwaysOnTop: true,
    center: true,
    resizable: true,
    transparent: false,
    visible: true,
})
webview.once('tauri://created', function () {
    // webview successfully created
    console.log('new webview created')
})
webview.once('tauri://error', function (e) {
    // an error happened creating the webview
    console.log('new webview error', e)
})
```

## 打开 URL(默认浏览器)

在脚本中添加以下代码，即可实现打开 URL(默认浏览器)

```js
const { invoke } = window.__TAURI__.core
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        invoke('open_url', { url: origin.href })
    }
}

window.open = function (url, target, features) {
    invoke('open_url', { url: url })
}

document.addEventListener('click', hookClick, { capture: true })
```

## 下载文件

下载网络链接文件到本地，支持多文件下载，以及下载进度回调

```js
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    await invoke('download_file', {
        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        savePath: 'test.png',
        fileId: 'test',
    })
}
```

## 下载进度

在脚本中添加以下代码，即可监听下载进度回调

```js
const { listen } = window.__TAURI__.event

listen('download_progress', (event: any) => {
    downloadProgress.value = Number(
        ((event.payload.downloaded / event.payload.total) * 100).toFixed(2)
    )
})
```

## 执行命令

在脚本中添加以下代码，即可实现运行命令

```js
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    invoke('run_command', { command: 'ls -l' })
}
```
