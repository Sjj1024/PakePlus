# 桌面端 API <Badge type="tip" text="0.6.1后支持" />

使用桌面端 API 的前提是在更多配置中，开启全局 TauriApi，然后才可以打包发布使用！  
JS 脚本中使用：

```JavaScript
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
    appDataDir, // 获取应用数据目录（跨平台，如 ~/.local/share/your-app）
    appConfigDir, // 获取应用配置目录（跨平台，如 ~/.config/your-app）
    appLocalDataDir, // 获取本地数据目录（Windows 专用）
    appCacheDir, // 获取缓存目录（跨平台）
    appLogDir, // 获取日志目录（跨平台）
    audioDir, // 获取用户音频目录
    cacheDir, // 获取系统缓存目录
    configDir, // 获取用户配置目录
    dataDir, // 获取用户数据目录
    desktopDir, // 获取用户桌面目录
    documentDir, // 获取用户文档目录
    downloadDir, // 获取用户下载目录
    executableDir, // 获取当前可执行文件所在目录
    fontDir, // 获取系统字体目录
    homeDir, // 获取用户主目录（如 ~/）
    pictureDir, // 获取用户图片目录
    publicDir, // 获取用户公共目录
    resourceDir, // 获取应用资源目录
    runtimeDir, // 获取运行时目录（Linux 专用）
    templateDir, // 获取用户模板目录
    videoDir, // 获取用户视频目录
    sep, // 获取当前系统的路径分隔符（如 `/` 或 `\`）
    delimiter, // 获取当前系统的路径分隔符（如 `:` 或 `;`）
    basename, // 获取路径的最后一部分（文件名或目录名）
    dirname, // 获取路径的目录部分
    extname, // 获取文件扩展名
    join, // 拼接多个路径片段
    normalize, // 规范化路径（解析 `.` 和 `..`）
    resolve, // 解析绝对路径（基于当前工作目录）
    isAbsolute,
    localDataDir,
    resolveResource,
    tempDir, // 检查路径是否为绝对路径
} = window.__TAURI__.path

// 调用新建窗口等函数
const { WebviewWindow } = window.__TAURI__.webviewWindow

// 等等接口，请参考Tauri2官方文档：https://v2.tauri.app/reference/javascript/api/#vanilla-js-api
```

Vue/React/Next/Vite 等项目使用：

```JavaScript
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

# Tauri2Api

文档待更新......

# Tauri2PluginApi

文档待更新......

# PakePlusApi

### 打开 URL(本窗口)

在脚本中添加以下代码，即可实现打开 URL(本窗口)

```JavaScript
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

### 打开 URL(新窗口)

在脚本中添加以下代码，即可实现打开 URL(新窗口)

```JavaScript
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

### 打开 URL(默认浏览器)

在脚本中添加以下代码，即可实现打开 URL(默认浏览器)

```JavaScript
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    const hookClick = (e) => {
        const origin = e.target.closest('a')
        const isBaseTargetBlank = document.querySelector(
            'head base[target="_blank"]'
        )
        invoke('open_url', { url: origin.href })
    }
    document.addEventListener('click', hookClick, { capture: true })
}
```

### 下载文件

下载网络链接文件到本地，支持多文件下载，以及下载进度回调

```JavaScript
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    await invoke('download_file', {
        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        savePath: 'test.png',
        fileId: 'test',
    })
}
```

### 下载进度

在脚本中添加以下代码，即可监听下载进度回调

```JavaScript
const { listen } = window.__TAURI__.event

listen('download_progress', (event: any) => {
    downloadProgress.value = Number(
        ((event.payload.downloaded / event.payload.total) * 100).toFixed(2)
    )
})
```

### 执行命令

在脚本中添加以下代码，即可实现运行命令

```JavaScript
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    invoke('run_command', { command: 'ls -l' })
}
```
