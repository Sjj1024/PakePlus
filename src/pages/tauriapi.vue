<template>
    <el-container class="layoutBox">
        <!-- 侧边栏 -->
        <el-aside width="170px">
            <el-scrollbar>
                <el-menu
                    default-active="1-1"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleMenu"
                    :collapse="isCollapse"
                    unique-opened
                >
                    <div class="menuTitle">
                        <img :src="ppIcon" alt="logo" class="menuIcon" />
                        <div class="menuTitleText">PakePLus</div>
                    </div>
                    <el-sub-menu index="1">
                        <template #title>TauriApi</template>
                        <el-menu-item index="1-0">apps/api</el-menu-item>
                        <el-menu-item index="1-1">api/app</el-menu-item>
                        <el-menu-item index="1-2">api/core</el-menu-item>
                        <el-menu-item index="1-3">api/dpi</el-menu-item>
                        <el-menu-item index="1-4">api/event</el-menu-item>
                        <el-menu-item index="1-5">api/menu</el-menu-item>
                        <el-menu-item index="1-6">api/mocks</el-menu-item>
                        <el-menu-item index="1-7">api/path</el-menu-item>
                        <el-menu-item index="1-8">api/tray</el-menu-item>
                        <el-menu-item index="1-9">api/webview</el-menu-item>
                        <el-menu-item index="1-10">api/window</el-menu-item>
                        <el-menu-item index="1-11">webviewWindow</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>PluginApi</template>
                        <el-menu-item index="2-1">scanner</el-menu-item>
                        <el-menu-item index="2-2">biometric</el-menu-item>
                        <el-menu-item index="2-3">clipboard</el-menu-item>
                        <el-menu-item index="2-4">dialog</el-menu-item>
                        <el-menu-item index="2-5">dialog</el-menu-item>
                        <el-menu-item index="2-6">dialog</el-menu-item>
                        <el-menu-item index="2-7">dialog</el-menu-item>
                        <el-menu-item index="2-8">dialog</el-menu-item>
                        <el-menu-item index="2-9">dialog</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>PakePlusApi</template>
                        <el-menu-item-group>
                            <template #title>Group 1</template>
                            <el-menu-item index="3-1">Option 1</el-menu-item>
                            <el-menu-item index="3-2">Option 2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group 2">
                            <el-menu-item index="3-3">Option 3</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="3-4">
                            <template #title>Option 4</template>
                            <el-menu-item index="3-4-1"
                                >Option 4-1</el-menu-item
                            >
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <!-- 主内容 -->
        <el-container>
            <!-- 头部 -->
            <el-header class="headerBox">
                <div class="backBtn" @click="goBack">
                    <el-icon><ArrowLeft /></el-icon>
                    <span>返回</span>
                </div>
                <el-input
                    v-model="textarea"
                    :rows="2"
                    type="textarea"
                    class="searchInput"
                />
                <div class="toolbar">
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
                </div>
            </el-header>
            <!-- 主内容 -->
            <el-main>
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
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ppIcon from '@/assets/images/pakeplus.png'
import { Setting, ArrowLeft } from '@element-plus/icons-vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
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
import { Window } from '@tauri-apps/api/window'
import { useRouter } from 'vue-router'

const router = useRouter()

const textarea = ref('')
const isCollapse = ref(false)

const handleOpen = () => {
    // isCollapse.value = false
}

const handleClose = () => {
    // isCollapse.value = true
}

const handleMenu = (index: string) => {
    console.log('handleMenu', index)
}

const goBack = () => {
    router.back()
}

onMounted(() => {
    if (isTauri()) {
        const window = getCurrentWindow()
        window.setTitle('FEATURE')
    }
})
</script>

<style scoped lang="scss">
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
            width: 60px;
            height: 60px;
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

        .searchInput {
            margin: 0 10px;
            font-size: 14px;
        }

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
    }

    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }

    .cardContent {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;

        .el-button {
            margin: 0;
        }
    }
}
</style>
