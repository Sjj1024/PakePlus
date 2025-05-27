<template>
    <el-container class="layoutBox">
        <!-- 侧边栏 -->
        <el-aside width="170px">
            <el-scrollbar>
                <el-menu
                    :default-active="defaultMenu"
                    @select="handleMenu"
                    unique-opened
                >
                    <div class="menuTitle" @click="goBack">
                        <img :src="ppIcon" alt="logo" class="menuIcon" />
                        <div class="menuTitleText">PakePLus</div>
                    </div>
                    <el-sub-menu index="1">
                        <template #title>Tauri2Api</template>
                        <el-menu-item index="1-1">apps</el-menu-item>
                        <el-menu-item index="1-2">core</el-menu-item>
                        <el-menu-item index="1-3">dpi</el-menu-item>
                        <el-menu-item index="1-4">event</el-menu-item>
                        <el-menu-item index="1-5">menu</el-menu-item>
                        <el-menu-item index="1-6">mocks</el-menu-item>
                        <el-menu-item index="1-7">path</el-menu-item>
                        <el-menu-item index="1-8">tray</el-menu-item>
                        <el-menu-item index="1-9">webview</el-menu-item>
                        <el-menu-item index="1-10">window</el-menu-item>
                        <el-menu-item index="1-11">webviewWindow</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>PluginApi</template>
                        <el-menu-item index="2-1">scanner</el-menu-item>
                        <el-menu-item index="2-2">biometric</el-menu-item>
                        <el-menu-item index="2-3">cli</el-menu-item>
                        <el-menu-item index="2-4">clipboard</el-menu-item>
                        <el-menu-item index="2-5">deep-link</el-menu-item>
                        <el-menu-item index="2-6">dialog</el-menu-item>
                        <el-menu-item index="2-7">fs</el-menu-item>
                        <el-menu-item index="2-8">shortcut</el-menu-item>
                        <el-menu-item index="2-9">http</el-menu-item>
                        <el-menu-item index="2-10">log</el-menu-item>
                        <el-menu-item index="2-11">nfc</el-menu-item>
                        <el-menu-item index="2-12">notification</el-menu-item>
                        <el-menu-item index="2-13">opener</el-menu-item>
                        <el-menu-item index="2-14">os</el-menu-item>
                        <el-menu-item index="2-15">positioner</el-menu-item>
                        <el-menu-item index="2-16">process</el-menu-item>
                        <el-menu-item index="2-17">shell</el-menu-item>
                        <el-menu-item index="2-18">sql</el-menu-item>
                        <el-menu-item index="2-19">store</el-menu-item>
                        <el-menu-item index="2-20">stronghold</el-menu-item>
                        <el-menu-item index="2-21">updater</el-menu-item>
                        <el-menu-item index="2-22">upload</el-menu-item>
                        <el-menu-item index="2-23">websocket</el-menu-item>
                        <el-menu-item index="2-24">window-state</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>PakePlusApi</template>
                        <el-menu-item index="3-1">{{
                            t('linkTo')
                        }}</el-menu-item>
                        <el-menu-item index="3-2">{{
                            t('filterAd')
                        }}</el-menu-item>
                        <el-menu-item index="3-3">{{
                            t('removeElement')
                        }}</el-menu-item>
                        <el-menu-item index="3-4">{{
                            t('addElement')
                        }}</el-menu-item>
                        <el-menu-item index="3-5">{{
                            t('listenData')
                        }}</el-menu-item>
                        <el-menu-item index="3-6">{{
                            t('dataStatistics')
                        }}</el-menu-item>
                        <el-menu-item index="3-7">{{
                            t('generateIcon')
                        }}</el-menu-item>
                        <el-menu-item index="3-8">{{
                            t('websiteStyle')
                        }}</el-menu-item>
                        <el-menu-item index="3-9">{{
                            t('addFlag')
                        }}</el-menu-item>
                        <el-menu-item index="3-10">{{
                            t('startParams')
                        }}</el-menu-item>
                        <el-menu-item index="3-11">{{
                            t('debugMode')
                        }}</el-menu-item>
                        <el-menu-item index="3-12">{{
                            t('injectJq')
                        }}</el-menu-item>
                        <el-menu-item index="3-13">
                            {{ t('disableCors') }}
                        </el-menu-item>
                        <el-menu-item index="3-14">支付测试</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="4">
                        <span>{{ t('aboutUs') }}</span>
                    </el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <!-- 主内容 -->
        <el-container>
            <!-- 头部 -->
            <el-header class="headerBox">
                <div v-if="menuIndex !== '4'" class="backBtn" @click="goBack">
                    <el-icon><ArrowLeft /></el-icon>
                    <span>{{ t('back') }}</span>
                </div>
                <!-- 输出 -->
                <el-input
                    v-if="menuIndex !== '4'"
                    v-model="textarea"
                    :rows="2"
                    type="textarea"
                    class="searchInput"
                />
                <!-- 图片 -->
                <img
                    v-if="menuIndex !== '4'"
                    :src="image"
                    alt="image"
                    class="image"
                />
                <!-- <div v-else>
                    <el-button>留言</el-button>
                </div> -->
                <!-- <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span></span>
                </div> -->
            </el-header>
            <!-- 主内容 -->
            <el-main>
                <!-- api/app -->
                <div v-if="menuIndex === '1-1'" class="cardContent">
                    <h2>app</h2>
                    <p>
                        @Tauri apps/app is provided by Tauri
                        JavaScript/TypeScript API， Used to access Tauri Some
                        metadata of the application itself. This module provides
                        several functions, which are mainly used to obtain
                        application metadata (such as name, version,
                        description, etc.). These methods can be called in the
                        front end to obtain corresponding information.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="defaultWindowIconApi">
                                defaultWindowIcon
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the application name."
                            placement="bottom"
                        >
                            <el-button @click="getNameApi">getName</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the Tauri version."
                            placement="bottom"
                        >
                            <el-button @click="getTauriVersionApi">
                                getTauriVersion
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the application version."
                            placement="bottom"
                        >
                            <el-button @click="getVersionApi">
                                getVersion
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="hideApi">hide</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="setThemeApi">setTheme</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="showApi">show</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/core -->
                <div v-else-if="menuIndex === '1-2'" class="cardContent">
                    <h2>core</h2>
                    <p>
                        Invoke your custom commands. This package is also
                        accessible with window.__TAURI__.core when
                        app.withGlobalTauri in tauri.conf.json is set to true.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="defaultWindowIconApi">
                                addPluginListener
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the application name."
                            placement="bottom"
                        >
                            <el-button @click="getNameApi"
                                >checkPermissions</el-button
                            >
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the Tauri version."
                            placement="bottom"
                        >
                            <el-button @click="getTauriVersionApi">
                                convertFileSrc
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the application version."
                            placement="bottom"
                        >
                            <el-button @click="getVersionApi">
                                invoke
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="hideApi">isTauri</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="setThemeApi">
                                requestPermissions
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="showApi">
                                transformCallback
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/dpi -->
                <!-- api/core -->
                <div v-else-if="menuIndex === '1-3'" class="cardContent">
                    <h2>dpi</h2>
                    <p>A position represented in logical pixels.</p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="defaultWindowIconApi">
                                LogicalPosition
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the application name."
                            placement="bottom"
                        >
                            <el-button @click="getNameApi"
                                >PhysicalPosition</el-button
                            >
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the Tauri version."
                            placement="bottom"
                        >
                            <el-button @click="getTauriVersionApi">
                                Position
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Gets the application version."
                            placement="bottom"
                        >
                            <el-button @click="getVersionApi">
                                LogicalSize
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="hideApi">PhysicalSize</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="setThemeApi">Size</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/app -->
                <div v-else-if="menuIndex === '1-4'" class="cardContent">
                    <h1 class="cardTitle">event</h1>
                    <p>
                        The event system allows you to emit events to the
                        backend and listen to events from it. This package is
                        also accessible with window.__TAURI__.event when
                        app.withGlobalTauri in tauri.conf.json is set to true.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="listenEvent">listen</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="sendEvent">emit</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="sendEvent">emitTo</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="unlistenEvent"
                                >unlisten</el-button
                            >
                        </el-tooltip>
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="listenEvent">once</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/menu -->
                <div v-else-if="menuIndex === '1-5'" class="cardContent">
                    <h1 class="cardTitle">menu</h1>
                    <p>
                        The menu system allows you to create and manage menus
                        for your application. This package is also accessible
                        with window.__TAURI__.menu when app.withGlobalTauri in
                        tauri.conf.json is set to true.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/mocks -->
                <div v-else-if="menuIndex === '1-6'" class="cardContent">
                    <h1 class="cardTitle">mocks</h1>
                    <p>
                        @Tauri apps/app/mocks are Tauri A tool module provided
                        for testing and development environment simulation,
                        which allows you to simulate without calling the actual
                        system Simulate various functionalities of Tauri using
                        API.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/path -->
                <div v-else-if="menuIndex === '1-7'" class="cardContent">
                    <h1 class="cardTitle">path</h1>
                    <p>
                        The path module provides utilities for working with file
                        and directory paths. This package is also accessible
                        with window.__TAURI__.path when app.withGlobalTauri in
                        tauri.conf.json is set to true. It is recommended to
                        allowlist only the APIs you use for optimal bundle size
                        and security.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/tray -->
                <div v-else-if="menuIndex === '1-8'" class="cardContent">
                    <h1 class="cardTitle">tray</h1>
                    <p>
                        The tray module provides utilities for working with the
                        system tray. This package is also accessible
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/webview -->
                <div v-else-if="menuIndex === '1-9'" class="cardContent">
                    <h1 class="cardTitle">webview</h1>
                    <p>
                        Provides APIs to create webviews, communicate with other
                        webviews and manipulate the current webview.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/window -->
                <div v-else-if="menuIndex === '1-10'" class="cardContent">
                    <h1 class="cardTitle">window</h1>
                    <p>
                        Provides APIs to create windows, communicate with other
                        windows and manipulate the current window.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/webviewWindow -->
                <div v-else-if="menuIndex === '1-11'" class="cardContent">
                    <h1 class="cardTitle">webviewWindow</h1>
                    <p>
                        Create new webview or get a handle to an existing one.
                        Webviews are identified by a label a unique identifier
                        that can be used to reference it later. It may only
                        contain alphanumeric characters a-zA-Z plus the
                        following special characters -, /, : and _.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/template -->
                <div v-else-if="menuIndex === '1-111'" class="cardContent">
                    <h1 class="cardTitle">menu</h1>
                    <p>
                        The menu system allows you to create and manage menus
                        for your application. This package is also accessible
                        with window.__TAURI__.menu when app.withGlobalTauri in
                        tauri.conf.json is set to true.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button>{{ t('waitDev') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- 关于 -->
                <div v-else-if="menuIndex === '4'" class="cardContent">
                    <About />
                </div>
                <!-- 支付测试 -->
                <div v-else-if="menuIndex === '3-14'" class="cardContent">
                    <el-button @click="getPayCode"> 获取支付二维码 </el-button>
                </div>
                <!-- 待开发 -->
                <div v-else class="waitContent">
                    <h1 class="cardTitle">{{ t('waitDev') }}</h1>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPaySign, oneMessage } from '@/utils/common'
import About from '@/pages/about.vue'
import ppIcon from '@/assets/images/pakeplus.png'
import { ArrowLeft } from '@element-plus/icons-vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import {
    defaultWindowIcon,
    getName,
    getTauriVersion,
    getVersion,
    hide,
    setTheme,
    show,
} from '@tauri-apps/api/app'
import {
    isTauri,
    Resource,
    invoke,
    SERIALIZE_TO_IPC_FN,
    convertFileSrc,
} from '@tauri-apps/api/core'
import {
    LogicalPosition,
    LogicalSize,
    PhysicalSize,
    PhysicalPosition,
} from '@tauri-apps/api/dpi'
import { emit, emitTo, listen, once } from '@tauri-apps/api/event'
import {
    Menu, // 创建和管理菜单
    MenuItem, // 创建和管理菜单项
    Submenu, // 创建和管理子菜单
    CheckMenuItem, // 创建和管理复选菜单项
    IconMenuItem, // 创建和管理图标菜单项
} from '@tauri-apps/api/menu'
import {
    mockWindows,
    clearMocks,
    mockIPC,
    mockConvertFileSrc,
} from '@tauri-apps/api/mocks'
import {
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
    isAbsolute, // 检查路径是否为绝对路径
} from '@tauri-apps/api/path'
import { TrayIcon } from '@tauri-apps/api/tray'
import {
    getCurrentWebview,
    Webview,
    getAllWebviews,
} from '@tauri-apps/api/webview'
import { Window } from '@tauri-apps/api/window'
import { useI18n } from 'vue-i18n'
import payApi from '@/apis/pay'
import { fetch } from '@tauri-apps/plugin-http'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const textarea = ref('')
const image = ref()
const defaultMenu = ref('1-1')
const menuIndex = ref('1-1')

const handleMenu = (index: string) => {
    console.log('handleMenu', index)
    menuIndex.value = index
}

const goBack = () => {
    router.back()
}

// defaultWindowIcon

const defaultWindowIconApi = async () => {
    const icon = await defaultWindowIcon()
    if (!icon) return
    const size = await icon.size()
    console.log('size', size)
    textarea.value = 'size:' + JSON.stringify(size)
    const rgba = await icon.rgba()
    console.log('rgba', rgba)
    const imageData = new ImageData(
        new Uint8ClampedArray(rgba),
        size.width,
        size.height
    )
    console.log('imageData', imageData)
    const canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.putImageData(imageData, 0, 0)
    const base64 = canvas.toDataURL('image/png')
    console.log('base64', base64)
    image.value = base64
}

// app:获取应用信息
const getNameApi = async () => {
    const name = await getName()
    console.log('name', name)
    textarea.value = 'name:' + name
}

const getTauriVersionApi = async () => {
    const tauriVersion = await getTauriVersion()
    console.log('tauriVersion', tauriVersion)
    textarea.value = 'tauriVersion:' + tauriVersion
}

const getVersionApi = async () => {
    const version = await getVersion()
    console.log('version', version)
    textarea.value = 'pakeplus version:' + version
}

const hideApi = async () => {
    await hide()
    oneMessage.success('隐藏应用成功')
}

const setThemeApi = async () => {
    let pptheme: any = localStorage.getItem('theme')
    pptheme = pptheme === 'light' ? 'dark' : 'light'
    await setTheme(pptheme)
    localStorage.setItem('theme', pptheme)
    oneMessage.success('设置主题成功，重启应用生效')
}

const showApi = async () => {
    await show()
}

// event:监听事件
let unlisten: any = null
const listenEvent = async () => {
    unlisten = await listen('my-event', (event: any) => {
        console.log('收到事件:', event.payload)
        textarea.value = 'event:收到事件:' + event.payload.message
    })
    textarea.value = 'event:开启监听'
}

// event:发送事件
const sendEvent = async () => {
    await emit('my-event', { message: 'Hello, PakePLus!' })
}

// event:取消监听
const unlistenEvent = async () => {
    unlisten && unlisten()
    textarea.value = 'event:取消监听'
}

// window:窗口
const openWindow = async () => {
    console.log('window')
}

// get pay code
const getPayCode = async () => {
    let data: any = {
        body: 'payjs收款测试',
        out_trade_no: '1699601458',
        total_fee: '10',
        mchid: import.meta.env.VITE_PAY_MCHID,
    }
    const sign = getPaySign(data)
    data.sign = sign
    console.log('data sign', data)
    // const res = await payApi.getPayCode(data)
    // console.log('pay res', res)

    // const res = await payApi.getPayCode(data)
    // console.log('pay res', res)

    const myHeaders = new Headers()
    myHeaders.append('content-type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('body', 'payjs收款测试')
    urlencoded.append('out_trade_no', '1699601458')
    urlencoded.append('total_fee', '10')
    urlencoded.append('mchid', '1593541201')
    urlencoded.append('sign', 'F6987C896F199229D40D0DE521427F5D')

    const res = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    })
    console.log('res---', res.json())
}

// 页面初始化
onMounted(() => {
    if (isTauri()) {
        const window = getCurrentWindow()
        window.setTitle('FEATURE')
    }
    console.log('route.query', route.query)
    const about = route.query.about
    if (about) {
        defaultMenu.value = '4'
        menuIndex.value = '4'
    }
})
</script>

<style lang="scss">
.el-button {
    margin: 0;
}

.layoutBox {
    width: 100%;
    height: 100%;

    .menuTitle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        cursor: pointer;

        .menuIcon {
            width: 50px;
            height: 50px;
        }

        .menuTitleText {
            font-weight: 600;
            margin-top: 8px;
        }
    }

    .headerBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        .searchInput {
            margin: 0 10px;
            font-size: 14px;
        }

        // .image {
        //     width: 40px;
        //     height: 40px;
        // }

        .backBtn {
            width: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
        }
    }

    .el-header {
        position: relative;
        // background-color: var(--el-color-primary-light-7);
        // color: var(--el-text-color-primary);
    }

    .el-aside {
        // color: var(--el-text-color-primary);
        background: var(--project-border);
    }

    .el-menu {
        border-right: none;
    }

    .el-main {
        padding: 0;

        .waitContent {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }

    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }

    .cardContent {
        padding: 0px 10px;

        .cardTitle {
            font-size: 30px;
            font-weight: 600;
        }

        .cardBox {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;

            .el-button {
                margin: 0;
            }
        }
    }
}
</style>
