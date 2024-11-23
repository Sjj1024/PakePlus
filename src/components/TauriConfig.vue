<template>
    <div class="tauriConfig">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Consistency" name="1">
                <div>
                    Consistent with real life: in line with the process and
                    logic of real life, and comply with languages and habits
                    that the users are used to;
                </div>
                <div>
                    Consistent within interface: all elements should be
                    consistent, such as: design style, icons and texts, position
                    of elements, etc.
                </div>
                <div>
                    Consistent with real life: in line with the process and
                    logic of real life, and comply with languages and habits
                    that the users are used to;
                </div>
                <div>
                    Consistent within interface: all elements should be
                    consistent, such as: design style, icons and texts, position
                    of elements, etc.
                </div>
                <div>
                    Consistent with real life: in line with the process and
                    logic of real life, and comply with languages and habits
                    that the users are used to;
                </div>
                <div>
                    Consistent within interface: all elements should be
                    consistent, such as: design style, icons and texts, position
                    of elements, etc.
                </div>
                <div>
                    Consistent with real life: in line with the process and
                    logic of real life, and comply with languages and habits
                    that the users are used to;
                </div>
                <div>
                    Consistent within interface: all elements should be
                    consistent, such as: design style, icons and texts, position
                    of elements, etc.
                </div>
                <div>
                    Consistent with real life: in line with the process and
                    logic of real life, and comply with languages and habits
                    that the users are used to;
                </div>
                <div>
                    Consistent within interface: all elements should be
                    consistent, such as: design style, icons and texts, position
                    of elements, etc.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Feedback" name="2">
                <div>
                    Operation feedback: enable the users to clearly perceive
                    their operations by style updates and interactive effects;
                </div>
                <div>
                    Visual feedback: reflect current state by updating or
                    rearranging elements of the page.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Efficiency" name="3">
                <div>
                    Simplify the process: keep operating process simple and
                    intuitive;
                </div>
                <div>
                    Definite and clear: enunciate your intentions clearly so
                    that the users can quickly understand and make decisions;
                </div>
                <div>
                    Easy to identify: the interface should be straightforward,
                    which helps the users to identify and frees them from
                    memorizing and recalling.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Controllability" name="4">
                <div>
                    Decision making: giving advices about operations is
                    acceptable, but do not make decisions for the users;
                </div>
                <div>
                    Controlled consequences: users should be granted the freedom
                    to operate, including canceling, aborting or terminating
                    current operation.
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeName = ref('1')

// tauri config
const tauriConfig = reactive({
    pattern: 'tauri',
    windows: {
        label: 'main',
        url: 'index.html',
        userAgent: 'tauri',
        fileDropEnabled: true,
        center: true,
        x: 0,
        y: 0,
        width: 1000,
        height: 800,
        minWidth: 400,
        minHeight: 300,
        maxWidth: 1000,
        maxHeight: 800,
        resizable: true,
        title: 'Tauri App',
        fullscreen: false,
        focus: true,
        transparent: false,
        maximized: false,
        visible: true,
        decorations: true,
        alwaysOnTop: false,
        contentProtected: false,
        skipTaskbar: false,
        theme: 'light',
        titleBarStyle: 'overlay',
        hiddenTitle: false,
        acceptFirstMouse: true,
        tabbingIdentifier: '',
        additionalBrowserArgs: '',
    },
    cli: {
        description: '',
        longDescription: '',
        beforeHelp: '',
        afterHelp: '',
        args: [],
        subcommands: [],
    },
    bundle: {
        active: true,
        targets: [],
        identifier: '',
        publisher: '',
        icon: '',
        resources: '',
        copyright: '',
        category: '',
        shortDescription: '',
        longDescription: '',
        appimage: {
            bundleMediaFramework: false,
        },
        deb: {
            compression: 'none',
        },
        macOS: {
            frameworks: [],
            minimumSystemVersion: '',
            exceptionDomain: '',
            license: '',
            signingIdentity: '',
            providerShortName: '',
            entitlements: '',
        },
        externalBin: [],
        windows: {
            digestAlgorithm: '',
            certificateThumbprint: '',
            timestampUrl: '',
            tsp: '',
            webviewInstallMode: '',
            webviewFixedRuntimePath: '',
            allowDowngrades: false,
            wix: {
                language: '',
                template: '',
                skipWebviewInstall: false,
                license: '',
                enableElevatedUpdateTask: false,
                bannerPath: '',
                dialogImagePath: '',
            },
            nsis: {
                license: '',
                headerImage: '',
                sidebarImage: '',
                installerIcon: '',
                installMode: '',
                languages: '',
                displayLanguageSelector: false,
            },
        },
        allowlist: {
            all: false,
            fs: {
                scope: [],
                all: false,
                readFile: false,
                writeFile: false,
                readDir: false,
                writeDir: false,
                copyFile: false,
                createDir: false,
                removeDir: false,
                removeFile: false,
                renameFile: false,
                exists: false,
            },
            window: {
                all: false,
                create: false,
                center: false,
                requestUserAttention: false,
                setResizable: false,
                setTitle: false,
                maximize: false,
                unmaximize: false,
                minimize: false,
                unminimize: false,
                show: false,
                hide: false,
                close: false,
                setDecorations: false,
                setAlwaysOnTop: false,
                setContentProtected: false,
                setSize: false,
                setMinSize: false,
                setMaxSize: false,
                setPosition: false,
                setFullscreen: false,
                setFocus: false,
                setIcon: false,
                setSkipTaskbar: false,
                setCursorGrab: false,
                setCursorVisible: false,
                setCursorIcon: false,
                setCursorPosition: false,
                setIgnoreCursorEvents: false,
                startDragging: false,
                print: false,
            },
            shell: {
                scope: [],
                all: false,
                execute: false,
                sidecar: false,
                open: false,
            },
            dialog: {
                all: false,
                open: false,
                save: false,
                message: false,
                ask: false,
                confirm: false,
            },
            http: {
                scope: [],
                all: false,
                request: false,
            },
            notification: {
                all: false,
            },
            globalShortcut: {
                all: false,
            },
            os: {
                all: false,
            },
            path: {
                all: false,
            },
            protocol: {
                assetScope: [],
                all: false,
                asset: false,
            },
            process: {
                all: false,
                relaunch: false,
                relaunchDangerousAllowSymlinkMacos: false,
                exit: false,
            },
            clipboard: {
                all: false,
                writeText: false,
                readText: false,
            },
            app: {
                all: false,
                show: false,
                hide: false,
            },
        },
        security: {
            csp: '',
        },
        updater: {
            active: false,
            dialog: false,
            endpoints: [],
            pubkey: '',
            windows: {
                installerArgs: '',
                installMode: '',
            },
        },
        systemTray: {
            iconPath: '',
            iconAsTemplate: false,
            menuOnLeftClick: false,
            title: '',
        },
    },
})
</script>

<style scoped lang="scss">
.tauriConfig {
    width: 100%;
    height: 100%;
}
</style>
