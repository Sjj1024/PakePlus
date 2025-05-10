<template>
    <div class="tauriApiBox">
        <div class="tauriApiContent">
            <el-card style="max-width: 100%; margin-top: 10px">
                <template #header>
                    <div class="card-header" @click="goBack">
                        <span>@tauri-apps/api</span>
                    </div>
                </template>
                <div class="cardContent">
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                </div>
            </el-card>
            <el-card style="max-width: 100%; margin-top: 10px">
                <template #header>
                    <div class="card-header">
                        <span>@tauri-apps/api</span>
                    </div>
                </template>
                <div class="cardContent">
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                    <el-button>Default</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    isTauri,
    Resource,
    invoke,
    SERIALIZE_TO_IPC_FN,
    convertFileSrc,
} from '@tauri-apps/api/core'
import { event, window, path } from '@tauri-apps/api'
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
    getCurrentWindow, // 获取当前窗口实例
    Window,
} from '@tauri-apps/api/window'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.back()
}

onMounted(() => {
    if (isTauri()) {
        const window = getCurrentWindow()
        window.setTitle('TAURI API TEST')
    }
})
</script>

<style scoped lang="scss">
.tauriApiBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 10px;

    .tauriApiTitle {
        cursor: pointer;
    }

    .tauriApiContent {
        width: 100%;

        .cardContent {
            width: 100%;
            display: flex; /* 启用 Flexbox */
            flex-wrap: wrap; /* 允许换行 */
            gap: 10px; /* 元素间距 */

            .el-button {
                margin: 0;
            }
        }
    }
}
</style>
