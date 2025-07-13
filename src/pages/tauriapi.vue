<template>
    <el-container class="layoutBox" :class="{ isWeb: !isTauri() }">
        <el-aside width="170px">
            <el-scrollbar>
                <el-menu
                    :default-active="defaultMenu"
                    @select="handleMenu"
                    unique-opened
                >
                    <el-sub-menu index="0">
                        <template #title>
                            <el-icon><Setting /></el-icon>
                            <span>{{ t('baseSetting') }}</span>
                        </template>
                        <el-menu-item index="0-1">
                            {{ t('profile') }}
                        </el-menu-item>
                        <el-menu-item index="0-2">
                            {{ t('projectSetting') }}
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <span class="iconfont tauriIcon">
                                    &#xe63c;
                                </span>
                            </el-icon>
                            <span>Tauri2Api</span>
                        </template>
                        <el-menu-item index="1-1"> apps </el-menu-item>
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
                        <template #title>
                            <el-icon>
                                <span class="iconfont tauriIcon">&#xe621;</span>
                            </el-icon>
                            <span>PluginApi</span>
                        </template>
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
                        <template #title>
                            <el-icon>
                                <span class="iconfont tauriIcon">&#xe6a4;</span>
                            </el-icon>
                            <span>PakePlusApi</span>
                        </template>
                        <el-menu-item index="3-1">{{
                            t('linkTo')
                        }}</el-menu-item>
                        <!-- <el-menu-item index="3-2">{{
                            t('filterAd')
                        }}</el-menu-item> -->
                        <el-menu-item index="3-2">{{
                            t('websiteAdjust')
                        }}</el-menu-item>
                        <el-menu-item index="3-3">{{
                            t('listenData')
                        }}</el-menu-item>
                        <el-menu-item index="3-4">{{
                            t('dataStatistics')
                        }}</el-menu-item>
                        <el-menu-item index="3-7">{{
                            t('generateIcon')
                        }}</el-menu-item>
                        <el-menu-item index="3-9">{{
                            t('addFlag')
                        }}</el-menu-item>
                        <el-menu-item index="3-10">{{
                            t('startParams')
                        }}</el-menu-item>
                        <el-menu-item index="3-13">
                            {{ t('disableCors') }}
                        </el-menu-item>
                        <el-menu-item index="3-14">{{
                            t('paymentTest')
                        }}</el-menu-item>
                        <el-menu-item index="3-15">{{
                            t('fileCompression')
                        }}</el-menu-item>
                        <el-menu-item index="3-16">{{
                            t('downloadResource')
                        }}</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-if="isTauri()" index="4">
                        <el-icon>
                            <span class="iconfont tauriIcon">&#xe655;</span>
                        </el-icon>
                        <span>{{ t('aboutUs') }}</span>
                    </el-menu-item>
                    <el-menu-item index="100">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>{{ t('backToHome') }}</span>
                    </el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <!-- mainContent -->
        <el-container>
            <!-- header -->
            <el-header v-if="menuIndex !== '4'" class="headerBox">
                <div
                    v-if="menuIndex !== '4'"
                    class="backBtn"
                    @click="router.back()"
                >
                    <el-icon><ArrowLeft /></el-icon>
                    <span>{{ t('back') }}</span>
                </div>
                <!-- output -->
                <el-input
                    v-if="menuIndex !== '4'"
                    v-model="textarea"
                    :rows="2"
                    type="textarea"
                    class="searchInput"
                />
                <!-- image -->
                <img
                    v-if="menuIndex !== '4'"
                    :src="image || ppIcon"
                    alt="image"
                    class="image"
                    @click="openUrl(urlMap.ppofficial)"
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
            <!-- mainContent -->
            <el-main>
                <!-- my info -->
                <!-- api/template -->
                <div v-if="menuIndex === '0-1'" class="cardContent">
                    <h1 class="cardTitle">my info</h1>
                    <p>
                        Get Github information.（id:
                        {{ creatDeviceid() }}）
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Github discount amount"
                            placement="bottom"
                        >
                            <el-button>
                                {{ discountAmount.toFixed(2) }}/16 $
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Github Api Limit"
                            placement="bottom"
                        >
                            <el-button>
                                {{ githubApiLimit.used }}
                                /
                                {{ githubApiLimit.limit }}
                                Api
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/app -->
                <div v-else-if="menuIndex === '1-1'" class="cardContent">
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
                        <el-tooltip content="convertFileSrc" placement="bottom">
                            <el-button>{{ t('convertFileSrc') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="invoke" placement="bottom">
                            <el-button>{{ t('invoke') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="isTauri" placement="bottom">
                            <el-button>{{ t('isTauri') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="requestPermissions"
                            placement="bottom"
                        >
                            <el-button>{{ t('requestPermissions') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="transformCallback"
                            placement="bottom"
                        >
                            <el-button>{{ t('transformCallback') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="checkPermissions"
                            placement="bottom"
                        >
                            <el-button>{{ t('checkPermissions') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="PermissionState"
                            placement="bottom"
                        >
                            <el-button>{{ t('PermissionState') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="addPluginListener"
                            placement="bottom"
                        >
                            <el-button>{{ t('addPluginListener') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="PluginListener" placement="bottom">
                            <el-button>{{ t('PluginListener') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="Channel" placement="bottom">
                            <el-button>{{ t('Channel') }}</el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/dpi -->
                <div v-else-if="menuIndex === '1-3'" class="cardContent">
                    <h2>dpi</h2>
                    <p>A position represented in logical pixels.</p>
                    <div class="cardBox">
                        <el-tooltip
                            content="LogicalPosition"
                            placement="bottom"
                        >
                            <el-button>{{ t('LogicalPosition') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="LogicalSize" placement="bottom">
                            <el-button>{{ t('LogicalSize') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="Size" placement="bottom">
                            <el-button>{{ t('Size') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="PhysicalPosition"
                            placement="bottom"
                        >
                            <el-button>{{ t('PhysicalPosition') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="PhysicalSize" placement="bottom">
                            <el-button>{{ t('PhysicalSize') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="Position" placement="bottom">
                            <el-button>{{ t('Position') }}</el-button>
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
                        <el-tooltip content="listen" placement="bottom">
                            <el-button @click="listenEvent">listen</el-button>
                        </el-tooltip>
                        <el-tooltip content="emit" placement="bottom">
                            <el-button @click="sendEvent">emit</el-button>
                        </el-tooltip>
                        <el-tooltip content="emit to" placement="bottom">
                            <el-button @click="sendEvent">emitTo</el-button>
                        </el-tooltip>
                        <el-tooltip content="unlisten event" placement="bottom">
                            <el-button @click="unlistenEvent">
                                unlisten
                            </el-button>
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
                        <el-button @click="openFolder('appCacheDir')">
                            appCacheDir
                        </el-button>
                        <el-button @click="openFolder('appConfigDir')">
                            appConfigDir
                        </el-button>
                        <el-button @click="openFolder('appDataDir')">
                            appDataDir
                        </el-button>
                        <el-button @click="openFolder('appLocalDataDir')">
                            appLocalDataDir
                        </el-button>
                        <el-button @click="openFolder('appLogDir')">
                            appLogDir
                        </el-button>
                        <el-button @click="openFolder('audioDir')">
                            audioDir
                        </el-button>
                        <el-button @click="openFolder('cacheDir')">
                            cacheDir
                        </el-button>
                        <el-button @click="openFolder('configDir')">
                            configDir
                        </el-button>
                        <el-button @click="openFolder('dataDir')">
                            dataDir
                        </el-button>
                        <el-button @click="openFolder('delimiter')">
                            delimiter
                        </el-button>
                        <el-button @click="openFolder('desktopDir')">
                            desktopDir
                        </el-button>
                        <el-button @click="openFolder('dirname')">
                            dirname
                        </el-button>
                        <el-button @click="openFolder('documentDir')">
                            documentDir
                        </el-button>
                        <el-button @click="openFolder('downloadDir')">
                            downloadDir
                        </el-button>
                        <el-button @click="openFolder('executableDir')">
                            executableDir
                        </el-button>
                        <el-button @click="openFolder('extname')">
                            extname
                        </el-button>
                        <el-button @click="openFolder('fontDir')">
                            fontDir
                        </el-button>
                        <el-button @click="openFolder('homeDir')">
                            homeDir
                        </el-button>
                        <el-button @click="openFolder('isAbsolute')">
                            isAbsolute
                        </el-button>
                        <el-button @click="openFolder('join')">
                            join
                        </el-button>
                        <el-button @click="openFolder('localDataDir')">
                            localDataDir
                        </el-button>
                        <el-button @click="openFolder('normalize')">
                            normalize
                        </el-button>
                        <el-button @click="openFolder('pictureDir')">
                            pictureDir
                        </el-button>
                        <el-button @click="openFolder('publicDir')">
                            publicDir
                        </el-button>
                        <el-button @click="openFolder('resolve')">
                            resolve
                        </el-button>
                        <el-button @click="openFolder('resolveResource')">
                            resolveResource
                        </el-button>
                        <el-button @click="openFolder('resourceDir')">
                            resourceDir
                        </el-button>
                        <el-button @click="openFolder('runtimeDir')">
                            runtimeDir
                        </el-button>
                        <el-button @click="openFolder('sep')"> sep </el-button>
                        <el-button @click="openFolder('tempDir')">
                            tempDir
                        </el-button>
                        <el-button @click="openFolder('templateDir')">
                            templateDir
                        </el-button>
                        <el-button @click="openFolder('videoDir')">
                            videoDir
                        </el-button>
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
                        <el-tooltip content="create tray" placement="bottom">
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
                            content="getCurrentWebview"
                            placement="bottom"
                        >
                            <el-button>{{ t('getCurrentWebview') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="Webview" placement="bottom">
                            <el-button>{{ t('Webview') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="getAllWebviews" placement="bottom">
                            <el-button>{{ t('getAllWebviews') }}</el-button>
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
                            content="Set the window icon."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('setIcon')">
                                setIcon
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Set the window title."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('setTitle')">
                                setTitle
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Maximize the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('maximize')">
                                maximize
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Unmaximize the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('unmaximize')">
                                unmaximize
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Toggle maximize the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('toggleMaximize')">
                                toggleMaximize
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="minimize the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('minimize')">
                                minimize
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="unminimize the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('unminimize')">
                                unminimize
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="show the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('show')">
                                show
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="destroy the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('destroy')">
                                destroy
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="onCloseRequested the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('onCloseRequested')">
                                onCloseRequested
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="onThemeChanged the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('onThemeChanged')">
                                onThemeChanged
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="setClosable(true) the window."
                            placement="bottom"
                        >
                            <el-button @click="windowFunc('setClosable(true)')">
                                setClosable(true)
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="setClosable(false) the window."
                            placement="bottom"
                        >
                            <el-button
                                @click="windowFunc('setClosable(false)')"
                            >
                                setClosable(false)
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="base64 to ico" placement="bottom">
                            <el-button @click="base64ToIco">
                                base64ToIco
                            </el-button>
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
                        <el-tooltip content="WebviewWindow" placement="bottom">
                            <el-button>{{ t('WebviewWindow') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="getCurrentWebviewWindow"
                            placement="bottom"
                        >
                            <el-button>
                                {{ t('getCurrentWebviewWindow') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="getAllWebviewWindows"
                            placement="bottom"
                        >
                            <el-button>
                                {{ t('getAllWebviewWindows') }}
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- 关于 -->
                <div v-else-if="menuIndex === '4'" class="cardContent">
                    <About />
                </div>
                <!-- 支付测试 -->
                <div v-else-if="menuIndex === '3-14'" class="cardContent">
                    <h1 class="cardTitle">pay method</h1>
                    <p>provide pay method</p>
                    <el-button @click="getPayJsCode('weixin')">
                        wxpay pay1
                    </el-button>
                    <el-button @click="getPayJsCode('alipay')">
                        alipay pay1
                    </el-button>
                    <el-button @click="getYunPayCode('weixin')">
                        weixin pay2
                    </el-button>
                    <el-button @click="getZPayCode('alipay')">
                        alipay pay2
                    </el-button>
                    <el-button @click="getPayJsCode('alipay')">
                        paypal
                    </el-button>
                    <el-button @click="getPpApis"> ppapis </el-button>
                </div>
                <!-- plugin-os api -->
                <div v-else-if="menuIndex === '2-14'" class="cardContent">
                    <h1 class="cardTitle">plugin-os</h1>
                    <p>
                        Provides operating system-related utility methods and
                        properties.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Returns the current operating system architecture."
                            placement="bottom"
                        >
                            <el-button @click="osApis('arch')">
                                arch()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns the operating system-specific end-of-line marker."
                            placement="bottom"
                        >
                            <el-button @click="osApis('eol')">eol()</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns the file extension, if any, used for executable binaries on this platform"
                            placement="bottom"
                        >
                            <el-button @click="osApis('exeExtension')">
                                exeExtension()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns the current operating system family."
                            placement="bottom"
                        >
                            <el-button @click="osApis('family')">
                                family()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns the host name of the operating system."
                            placement="bottom"
                        >
                            <el-button @click="osApis('hostname')">
                                hostname()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns a String with a BCP-47 language tag inside"
                            placement="bottom"
                        >
                            <el-button @click="osApis('locale')">
                                locale()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns a string describing the specific operating system in use"
                            placement="bottom"
                        >
                            <el-button @click="osApis('platform')">
                                platform()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns the current operating system type"
                            placement="bottom"
                        >
                            <el-button @click="osApis('type')">
                                type()
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="Returns the current operating system version."
                            placement="bottom"
                        >
                            <el-button @click="osApis('version')">
                                version()
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/文件解压缩 -->
                <div v-else-if="menuIndex === '3-15'" class="cardContent">
                    <h1 class="cardTitle">{{ t('fileCompression') }}</h1>
                    <p>{{ t('fileCompressionDesc') }}</p>
                    <div class="cardBox">
                        <el-tooltip
                            content="output directory"
                            placement="bottom"
                        >
                            <el-button @click="selectFolder">
                                {{ t('outputDirectory') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="compress file" placement="bottom">
                            <el-button @click="compressFile">
                                {{ t('compressFile') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="decompress file"
                            placement="bottom"
                        >
                            <el-button @click="decompressFile">
                                {{ t('decompressFile') }}
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- api/下载文件 -->
                <div v-else-if="menuIndex === '3-16'" class="cardContent">
                    <h1 class="cardTitle">{{ t('downloadFile') }}</h1>
                    <p>
                        {{ t('downloadFileDesc') }}
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="select download folder"
                            placement="bottom"
                        >
                            <el-button @click="selectDownloadFolder">
                                {{ t('selectDownloadFolder') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="下载文件" placement="bottom">
                            <el-button @click="downFile">
                                {{ t('downloadFile') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="default download to Download directory"
                            placement="bottom"
                        >
                            <el-button @click="downFile(false)">
                                {{ t('defaultDownloadToDownloadDirectory') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="download progress"
                            placement="bottom"
                        >
                            <div class="downProgress">
                                <span>{{ t('downloadProgress') }}</span>
                                <el-progress :percentage="downloadProgress" />
                            </div>
                        </el-tooltip>
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('downloadFile') }}</h2>
                        <p class="description">
                            {{ t('downloadFileDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.downloadFile.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('downloadProgress') }}</h2>
                        <p class="description">
                            {{ t('downloadProgressDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.downProgress.trim()"
                            :disabled="true"
                        />
                    </div>
                </div>
                <!-- api/notification -->
                <div v-else-if="menuIndex === '2-12'" class="cardContent">
                    <h1 class="cardTitle">notification</h1>
                    <p>
                        Send native notifications to your user using the
                        notification plugin. Please allow notification function
                        in system settings
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="Get the default window icon."
                            placement="bottom"
                        >
                            <el-button @click="sendNotification">
                                {{ t('sendMessageNotification') }}
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="codeDemo">
                        <h2>发送通知</h2>
                        <p class="description">调用系统通知API发送消息通知</p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.notification.trim()"
                            :disabled="true"
                        />
                    </div>
                </div>
                <!-- api/opener -->
                <div
                    v-else-if="menuIndex === '2-13' || menuIndex === '3-1'"
                    class="cardContent"
                >
                    <h1 class="cardTitle">opener</h1>
                    <p>
                        This plugin allows you to open files and URLs in a
                        specified, or the default, application. It also supports
                        “revealing” files in the system’s file explorer. you can
                        open any url or path
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="open url in current window"
                            placement="bottom"
                        >
                            <el-button @click="openUrlWindow('current')">
                                {{ t('openUrlCurrent') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="open url in new window"
                            placement="bottom"
                        >
                            <el-button @click="openUrlWindow('new')">
                                {{ t('openUrlNew') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="open url in default browser"
                            placement="bottom"
                        >
                            <el-button @click="openUrl(textarea)">
                                {{ t('openUrlBrowser') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="open url in current folder"
                            placement="bottom"
                        >
                            <el-button @click="openUrl(textarea)">
                                {{ t('openFolder') }}
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('openUrlCurrent') }}</h2>
                        <p class="description">
                            {{ t('openUrlCurrentDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.openUrlCurrent.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('openUrlNew') }}</h2>
                        <p class="description">
                            {{ t('openUrlNewDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.openUrlNew.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('openUrlBrowser') }}</h2>
                        <p class="description">
                            {{ t('openUrlBrowserDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.openUrlBrowser.trim()"
                            :disabled="true"
                        />
                    </div>
                </div>
                <!-- shell -->
                <div v-else-if="menuIndex === '2-17'" class="cardContent">
                    <h1 class="cardTitle">PakePlus shell</h1>
                    <p>
                        Access the system shell. Allows you to spawn child
                        processes.
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="run any command"
                            placement="bottom"
                        >
                            <el-button @click="runShell">
                                {{ t('runAnyCommand') }}
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('runAnyCommand') }}</h2>
                        <p class="description">
                            {{ t('runAnyCommandDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.runShell.trim()"
                            :disabled="true"
                        />
                    </div>
                </div>
                <!-- api/template -->
                <div v-else-if="menuIndex === '3-2'" class="cardContent">
                    <h1 class="cardTitle">{{ t('websiteAdjust') }}</h1>
                    <p>
                        {{ t('websiteAdjustDesc') }}
                    </p>
                    <div class="cardBox">
                        <el-tooltip
                            content="remove web element"
                            placement="bottom"
                        >
                            <el-button>{{ t('removeWebElement') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="add web element"
                            placement="bottom"
                        >
                            <el-button>{{ t('addWebElement') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="modify web element"
                            placement="bottom"
                        >
                            <el-button>{{ t('modifyWebElement') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="change web skin"
                            placement="bottom"
                        >
                            <el-button>{{ t('changeWebSkin') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="remove web ad" placement="bottom">
                            <el-button>{{ t('removeWebAd') }}</el-button>
                        </el-tooltip>
                        <el-tooltip content="auto operation" placement="bottom">
                            <el-button>{{ t('autoOperation') }}</el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="disable right click"
                            placement="bottom"
                        >
                            <el-button
                                @click="executeCode(Codes.disRightClick)"
                            >
                                全局禁止右键
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            content="allow some right click"
                            placement="bottom"
                        >
                            <el-button
                                @click="executeCode(Codes.inputRightClick)"
                            >
                                允许部分右键
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('removeWebElement') }}</h2>
                        <p class="description">
                            {{ t('removeWebElementDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.removeEle.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('addWebElement') }}</h2>
                        <p class="description">
                            {{ t('addWebElementDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.addEle.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('modifyWebElement') }}</h2>
                        <p class="description">
                            {{ t('modifyWebElementDesc') }}
                        </p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.modifyEle.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('changeWebSkin') }}</h2>
                        <p class="description">
                            {{ t('changeWebSkinDesc') }}
                        </p>
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('removeWebAd') }}</h2>
                        <p class="description">
                            {{ t('removeWebAdDesc') }}
                        </p>
                    </div>
                    <div class="codeDemo">
                        <h2>{{ t('autoOperation') }}</h2>
                        <p class="description">
                            {{ t('autoOperationDesc') }}
                        </p>
                    </div>
                    <div class="codeDemo">
                        <h2>全局禁止右键</h2>
                        <p class="description">全局禁止右键</p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.disRightClick.trim()"
                            :disabled="true"
                        />
                    </div>
                    <div class="codeDemo">
                        <h2>允许部分右键</h2>
                        <p class="description">允许输入框或文本域部分右键</p>
                        <CodeEdit
                            lang="javascript"
                            :code="Codes.inputRightClick.trim()"
                            :disabled="true"
                        />
                    </div>
                </div>
                <!-- api/listenData -->
                <div v-else-if="menuIndex === '3-3'" class="cardContent">
                    <h1 class="cardTitle">listenData</h1>
                    <p>Listen web data</p>
                    <div class="cardBox">
                        <el-tooltip content="open debug" placement="bottom">
                            <el-button @click="debugHandler('open')">
                                {{ t('openDebug') }}
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="close debug" placement="bottom">
                            <el-button @click="debugHandler('close')">
                                {{ t('closeDebug') }}
                            </el-button>
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
                <!-- 待开发 -->
                <div v-else class="waitContent">
                    <h1 class="cardTitle">{{ t('waitDev') }}</h1>
                </div>
            </el-main>
        </el-container>
        <!-- dialog -->
        <el-dialog
            v-model="dialogVisible"
            :title="dialogTitle"
            width="500"
            center
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            @close="checkPayStatus"
        >
            <div class="dialogContent">
                <div v-if="qrCodeData" class="qrCodeBox">
                    <img :src="qrCodeData" alt="pay qrcode" class="qrCode" />
                    <!-- logo -->
                    <!-- <img :src="ppIcon" alt="logo" class="qrlogo" /> -->
                    <!-- wx or alipay -->
                    <div class="qrlogo">
                        <div
                            v-if="payType === 'weixin'"
                            class="iconfont weixin qrlogo"
                        >
                            &#xe64b;
                        </div>
                        <div v-else class="iconfont zhifubao qrlogo">
                            &#xe654;
                        </div>
                    </div>
                </div>
                <div class="payTip">
                    {{ t('payTip') }}
                    {{ payType === 'weixin' ? '微信' : '支付宝' }}
                    {{ t('payTipDesc') }}
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button
                        :disabled="payTime > 0"
                        @click="dialogVisible = false"
                    >
                        {{
                            payTime > 0
                                ? `${t('notPay')}(${payTime}s)`
                                : t('notPay')
                        }}
                    </el-button>
                    <el-button
                        :disabled="payTime > 0"
                        type="primary"
                        @click="dialogVisible = false"
                    >
                        {{
                            payTime > 0
                                ? `${t('paid')}(${payTime}s)`
                                : t('paid')
                        }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CodeEdit from '@/components/CodeEdit.vue'
import ppIcon from '@/assets/images/pakeplus.png'
import { useRoute, useRouter } from 'vue-router'
import Codes from '@/utils/codes'
import {
    arrayBufferToBase64,
    base64PngToIco,
    basePayjsUrl,
    baseYunPayUrl,
    getPaySign,
    oneMessage,
    openSelect,
    openUrl,
    payJsMchid,
    payJsSignKey,
    urlMap,
    yunPayMchid,
    yunPaySignKey,
    zPayMchId,
    zPaySignKey,
    creatDeviceid,
} from '@/utils/common'
import About from '@/pages/about.vue'
import {
    InfoFilled,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import {
    Window,
    CloseRequestedEvent,
    getCurrentWindow,
    getAllWindows,
    UserAttentionType,
    Effect,
    EffectState,
    currentMonitor,
    monitorFromPoint,
    primaryMonitor,
    availableMonitors,
    cursorPosition,
    ProgressBarStatus,
} from '@tauri-apps/api/window'
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
    Size,
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
    isAbsolute,
    localDataDir,
    resolveResource,
    tempDir, // 检查路径是否为绝对路径
} from '@tauri-apps/api/path'
import { TrayIcon } from '@tauri-apps/api/tray'
import {
    getCurrentWebview,
    Webview,
    getAllWebviews,
} from '@tauri-apps/api/webview'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useI18n } from 'vue-i18n'
import payApi from '@/apis/pay'
import githubApi from '@/apis/github'
import { fetch } from '@tauri-apps/plugin-http'
import QRCode from 'qrcode'
import {
    arch,
    eol,
    exeExtension,
    family,
    hostname,
    locale,
    platform,
    type,
    version,
} from '@tauri-apps/plugin-os'
import http from '@/utils/http'
import { readFile, writeFile } from '@tauri-apps/plugin-fs'
import { usePPStore } from '@/store'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = usePPStore()

const now = new Date()
const currentMonth = now.getMonth() + 1
const githubBilling = ref({})
const discountAmount = ref(0)
const githubApiLimit = ref({
    limit: 5000,
    remaining: 0,
    reset: 0,
    used: 0,
})

const textarea = ref('')
const image = ref()
const defaultMenu = ref('0-1')
const menuIndex = ref('0-1')

// dialog
const dialogTitle = ref(t('payTest'))
const dialogVisible = ref(false)

let selectedDir = ''

const getGithubBilling = async () => {
    discountAmount.value = 0
    const response = await githubApi.getBilibiliInfo(
        store.userInfo.login,
        currentMonth
    )
    console.log('response----', response)
    if (response.status === 200) {
        const rateLimit = {
            limit: response.headers['x-ratelimit-limit'],
            remaining: response.headers['x-ratelimit-remaining'],
            reset: response.headers['x-ratelimit-reset'],
            used: response.headers['x-ratelimit-used'],
        }
        githubApiLimit.value = rateLimit
        githubBilling.value = response.data
        response.data.usageItems.forEach((item: any) => {
            discountAmount.value += item.discountAmount
        })
        console.log('githubApiLimit----', githubApiLimit.value)
        console.log('githubBilling----', githubBilling.value)
        console.log('discountAmount----', discountAmount.value)
    } else {
        oneMessage.error(t('githubInfoError'))
    }
}

const handleMenu = (index: string) => {
    if (isTauri()) {
        menuIndex.value = index
        console.log('isTauri')
    } else {
        if (index === '4') {
            router.push('/about')
        } else {
            oneMessage.error(t('apiLimitClient'))
        }
    }
    // ppclient and web
    if (index === '0-1') {
        menuIndex.value = index
        store.token && getGithubBilling()
    } else if (index === '100') {
        router.push('/')
    }
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
    oneMessage.success(t('hideSuccess'))
}

const setThemeApi = async () => {
    let pptheme: any = localStorage.getItem('theme')
    pptheme = pptheme === 'light' ? 'dark' : 'light'
    await setTheme(pptheme)
    localStorage.setItem('theme', pptheme)
    oneMessage.success(t('setThemeSuccess'))
}

const showApi = async () => {
    await show()
}

// event:listen event
let unlisten: any = null
const listenEvent = async () => {
    unlisten = await listen('my-event', (event: any) => {
        console.log('收到事件:', event.payload)
        textarea.value = 'event:' + t('listenEvent') + event.payload.message
    })
    textarea.value = 'event:' + t('listenEvent')
}

// event:send event
const sendEvent = async () => {
    await emit('my-event', { message: 'Hello, PakePlus!' })
}

// event:unlisten event
const unlistenEvent = async () => {
    unlisten && unlisten()
    textarea.value = 'event:' + t('unlistenEvent')
}

// window:open window
const openWindow = async () => {
    console.log('window')
}

// os function
const osApis = async (func: string) => {
    switch (func) {
        case 'arch':
            const archName = arch()
            textarea.value = 'arch:' + archName
            break
        case 'eol':
            textarea.value = 'eol:' + eol()
            break
        case 'exeExtension':
            const exeExt = exeExtension()
            textarea.value = 'exeExtension:' + exeExt
            break
        case 'family':
            const familyName = family()
            textarea.value = 'family:' + familyName
            break
        case 'hostname':
            const hostName = await hostname()
            textarea.value = 'hostname:' + hostName
            break
        case 'locale':
            const localeName = await locale()
            textarea.value = 'locale:' + localeName
            break
        case 'platform':
            const platformName = platform()
            textarea.value = 'platform:' + platformName
            break
        case 'type':
            const typeName = type()
            textarea.value = 'type:' + typeName
            break
        case 'version':
            const versionName = version()
            textarea.value = 'version:' + versionName
            break
        default:
            break
    }
}

// window api
const windowFunc = async (func: string) => {
    const currentWin = getCurrentWindow()
    switch (func) {
        case 'setIcon':
            const selected: any = await openSelect(false, [])
            console.log('selected', selected)
            if (selected) {
                currentWin.setIcon(selected)
                oneMessage.success(t('windowFuncSuccess'))
            } else {
                oneMessage.error(t('selectWindowIcon'))
            }
            break
        case 'setTitle':
            if (textarea.value) {
                await currentWin.setTitle(textarea.value)
                oneMessage.success('设置标题成功')
            } else {
                oneMessage.error('请输入标题')
            }
            break
        case 'maximize':
            await currentWin.maximize()
            oneMessage.success('最大化成功')
            break
        case 'unmaximize':
            await currentWin.unmaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'toggleMaximize':
            await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'minimize':
            await currentWin.minimize()
            oneMessage.success('取消最大化成功')
            break
        case 'unminimize':
            await currentWin.unminimize()
            oneMessage.success('取消最大化成功')
            break
        case 'show':
            await currentWin.show()
            oneMessage.success('取消最大化成功')
            break
        case 'destroy':
            await currentWin.destroy()
            oneMessage.success('取消最大化成功')
            break
        case 'setDecorations(true)':
            await currentWin.setDecorations(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setShadow(true)':
            await currentWin.setShadow(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setShadow(false)':
            await currentWin.setShadow(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setAlwaysOnTop(true)':
            await currentWin.setAlwaysOnTop(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setAlwaysOnTop(false)':
            await currentWin.setAlwaysOnTop(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setAlwaysOnBottom(false)':
            await currentWin.setAlwaysOnBottom(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setAlwaysOnBottom(true)':
            await currentWin.setAlwaysOnBottom(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setContentProtected':
            await currentWin.setContentProtected(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setSize':
            // await currentWin.setSize(new Size(LogicalSize()))
            oneMessage.success('取消最大化成功')
            break
        case 'setMinSize':
            // await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setMaxSize':
            // await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setPosition':
            // await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setFullscreen(true)':
            await currentWin.setFullscreen(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setFullscreen(false)':
            await currentWin.setFullscreen(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setFocus':
            await currentWin.setFocus()
            oneMessage.success('取消最大化成功')
            break
        case 'setSkipTaskbar(false)':
            await currentWin.setSkipTaskbar(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setSkipTaskbar(true)':
            await currentWin.setSkipTaskbar(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setCursorGrab(true)':
            await currentWin.setCursorGrab(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setCursorGrab(false)':
            await currentWin.setCursorVisible(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setCursorVisible(true)':
            await currentWin.setCursorVisible(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setCursorIcon':
            // await currentWin.setCursorIcon()
            oneMessage.success('取消最大化成功')
            break
        case 'setBackgroundColor':
            // await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setCursorPosition':
            // await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setIgnoreCursorEvents':
            await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setBadgeCount':
            await currentWin.setBadgeCount(6)
            oneMessage.success('取消最大化成功')
            break
        case 'setBadgeLabel':
            await currentWin.setBadgeLabel('hi')
            oneMessage.success('取消最大化成功')
            break
        case 'setOverlayIcon':
            // await currentWin.toggleMaximize()
            oneMessage.success('取消最大化成功')
            break
        case 'setProgressBar':
            await currentWin.setProgressBar({
                status: ProgressBarStatus.Normal,
                progress: 50,
            })
            oneMessage.success('取消最大化成功')
            break
        case 'setVisibleOnAllWorkspaces':
            await currentWin.setVisibleOnAllWorkspaces(true)
            oneMessage.success('取消最大化成功')
            break
        case 'onResized':
            await currentWin.onResized(({ payload: size }) => {
                console.log('size', size)
                oneMessage.success('监听大小变化')
            })
            break
        case 'onMoved':
            await currentWin.onMoved(({ payload: position }) => {
                console.log('position', position)
                oneMessage.success('监听移动')
            })
            break
        case 'onCloseRequested':
            await currentWin.onCloseRequested(async (event) => {
                console.log('user close requested')
                const confirmed = confirm('Are you sure?')
                if (!confirmed) {
                    // user did not confirm closing the window; let's prevent it
                    event.preventDefault()
                }
            })
            oneMessage.success('onCloseRequested')
            break
        case 'onDragDropEvent':
            const unlisten = await getCurrentWindow().onDragDropEvent(
                (event) => {
                    if (event.payload.type === 'over') {
                        console.log('User hovering', event.payload.position)
                    } else if (event.payload.type === 'drop') {
                        console.log('User dropped', event.payload.paths)
                    } else {
                        console.log('File drop cancelled')
                    }
                }
            )
            oneMessage.success('取消最大化成功')
            break
        case 'onFocusChanged':
            const unlistenFocus = currentWin.onFocusChanged(
                ({ payload: focused }) => {
                    console.log('Focus changed, window is focused? ' + focused)
                }
            )
            oneMessage.success('取消最大化成功')
            break
        case 'onScaleChanged':
            const unlistenScale = currentWin.onScaleChanged(({ payload }) => {
                console.log('Scale changed', payload.scaleFactor, payload.size)
            })
            oneMessage.success('取消最大化成功')
            break
        case 'onThemeChanged':
            const unlistenTheme = currentWin.onThemeChanged(
                ({ payload: theme }) => {
                    console.log('New theme: ' + theme)
                }
            )
            oneMessage.success('取消最大化成功')
            break
        case 'setClosable(true)':
            await currentWin.setClosable(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setClosable(false)':
            await currentWin.setClosable(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setMinimizable(true)':
            await currentWin.setMinimizable(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setMinimizable(false)':
            await currentWin.setMinimizable(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setMaximizable(true)':
            await currentWin.setMaximizable(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setMaximizable(false)':
            await currentWin.setMaximizable(false)
            oneMessage.success('取消最大化成功')
            break
        case 'isEnabled':
            const isEnabled = await currentWin.isEnabled()
            oneMessage.success('取消最大化成功')
            break
        case 'setEnabled(true)':
            await currentWin.setEnabled(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setEnabled(false)':
            await currentWin.setEnabled(false)
            oneMessage.success('取消最大化成功')
            break
        case 'setResizable(true)':
            await currentWin.setResizable(true)
            oneMessage.success('取消最大化成功')
            break
        case 'setResizable(false)':
            await currentWin.setResizable(false)
            oneMessage.success('取消最大化成功')
            break
        case 'center':
            await currentWin.center()
            oneMessage.success('取消最大化成功')
            break
        case 'isAlwaysOnTop':
            const isOnTop = await currentWin.isAlwaysOnTop()
            console.log('isAlwaysOnTop', isOnTop)
            break
        case 'theme':
            const themeStr = await currentWin.theme()
            console.log('themeStr', themeStr)
            break
        case 'title':
            const titleStr = await currentWin.title()
            console.log('titleStr', titleStr)
            break
        case 'isVisible':
            const isVisibleBool = await currentWin.isVisible()
            console.log('titleStr', isVisibleBool)
            break
        case 'isClosable':
            const isClosableBool = await currentWin.isClosable()
            console.log('isClosable', isClosableBool)
            break
        case 'isMinimizable':
            const isMinimizableBool = await currentWin.isMinimizable()
            console.log('isMinimizableBool', isMinimizableBool)
            break
        case 'isMaximizable':
            const isMaximizableBool = await currentWin.isMaximizable()
            console.log('isMaximizable', isMaximizableBool)
            break
        case 'isResizable':
            const isResizableBool = await currentWin.isResizable()
            console.log('isResizable', isResizableBool)
            break
        case 'isDecorated':
            const isDecoratedBool = await currentWin.isDecorated()
            console.log('isDecoratedBool', isDecoratedBool)
            break
        case 'isFocused':
            const isFocusedBool = await currentWin.isFocused()
            console.log('isFocusedBool', isFocusedBool)
            break
        case 'isMaximized':
            const isMaximizedBool = await currentWin.isMaximized()
            console.log('isDecoratedBool', isMaximizedBool)
            break
        case 'isMinimized':
            const isMinimizedBool = await currentWin.isMinimized()
            console.log('isMinimizedBool', isMinimizedBool)
            break
        case 'isFullscreen':
            const isFullscreenBool = await currentWin.isFullscreen()
            console.log('isFullscreenBool', isFullscreenBool)
            break
        case 'outerSize':
            const outerSizeObj = await currentWin.outerSize()
            console.log('isDecoratedBool', outerSizeObj)
            break
        case 'innerSize':
            const innerSizeObj = await currentWin.innerSize()
            console.log('innerSizeObj', innerSizeObj)
            break
        case 'outerPosition':
            const outerPositionObj = await currentWin.outerPosition()
            console.log('outerPositionObj', outerPositionObj)
            break
        case 'innerPosition':
            const innerPositionObj = await currentWin.innerPosition()
            console.log('innerPositionObj', innerPositionObj)
            break
        case 'scaleFactor':
            const scaleFactor = await currentWin.scaleFactor()
            console.log('scaleFactor', scaleFactor)
            break
        case 'emitTo':
            // const isDecoratedBool = await currentWin.isDecorated()
            console.log('isDecoratedBool')
            break
        case 'emit':
            // const isDecoratedBool = await currentWin.isDecorated()
            console.log('isDecoratedBool')
            break
        case 'once':
            // const isDecoratedBool = await currentWin.isDecorated()
            console.log('isDecoratedBool')
            break
        case 'listen':
            // const isDecoratedBool = await currentWin.isDecorated()
            console.log('isDecoratedBool')
            break
        default:
            break
    }
}

// base64ToIco
const base64ToIco = async () => {
    console.log('base64')
    const selectedFilePath: any = await openSelect(false, [])
    if (!selectedFilePath) {
        return null
    }
    const binaryData = await readFile(selectedFilePath)
    console.log('binaryData', binaryData)
    const base64Data: any = arrayBufferToBase64(binaryData)
    const base64String = 'data:image/jpg;base64,' + base64Data
    const icoBlob = await base64PngToIco(base64String)
    console.log('ico', icoBlob)
    const savePath: any = await openSelect(true, [])
    if (!savePath) {
        return
    }
    const icoPath = await join(savePath, 'favicon.ico')
    await writeFile(icoPath, icoBlob)
    oneMessage.success(t('saveSuccess'))
}

const payTimer: any = ref(null)
const payTime = ref(0)
const qrCodeData = ref('111')
const payType = ref('weixin')
const payMethod = ref('yun')
const payOrderNo = ref('')

const startPayTime = () => {
    payTime.value = 5
    payTimer.value && clearInterval(payTimer.value)
    payTimer.value = setInterval(() => {
        if (payTime.value <= 0) {
            clearInterval(payTimer.value)
            payTimer.value = null
            return
        }
        payTime.value--
    }, 1000)
}

// get pay code
const getPayJsCode = async (payMathod: string = 'weixin') => {
    // input pay amount(unit:yuan)
    payType.value = payMathod
    payMethod.value = 'payjs'
    let money = 10
    try {
        money = parseInt(textarea.value)
        if (isNaN(money)) {
            oneMessage.error(t('payAmountError'))
            return
        }
    } catch (error) {
        oneMessage.error(t('payAmountError'))
        return
    }
    const order: any = {
        mchid: payJsMchid,
        body: t('payTestOrder'),
        total_fee: money,
        out_trade_no: 'payjs_demo_' + Date.now(),
        auto: 1,
        hide: 1,
        type: payMathod === 'weixin' ? null : 'alipay',
    }
    // get pay sign
    order.sign = getPaySign(order, payJsSignKey)
    console.log('order----', order)
    const queryString = Object.keys(order)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(order[key])}`
        )
        .join('&')
    const payUrl = basePayjsUrl + '/api/cashier?' + queryString
    console.log('payUrl', payUrl)
    const url = await QRCode.toDataURL(payUrl)
    console.log('url', url)
    dialogVisible.value = true
    qrCodeData.value = url
}

// get ppapi json
const getPpApis = async () => {
    const response = await payApi.getPpApis()
    console.log('response----', response)
    if (response.status === 200) {
        console.log('data----', response.data)
    } else {
        oneMessage.error(t('getPpApisError'))
    }
}

// get yun pay code
const getYunPayCode = async (payMathod: string = 'weixin') => {
    console.log('getYunPayCode')
    payType.value = payMathod
    payMethod.value = 'yun'
    let money = 10
    try {
        money = parseFloat(textarea.value)
        if (isNaN(money)) {
            oneMessage.error(t('payAmountError'))
            return
        }
    } catch (error) {
        oneMessage.error(t('payAmountError'))
        return
    }
    payOrderNo.value = 'yunpay_' + Date.now()
    const order: any = {
        body: t('payTestOrder'),
        out_trade_no: payOrderNo.value,
        total_fee: money,
        mch_id: yunPayMchid,
    }
    // get pay sign
    order.sign = getPaySign(order, yunPaySignKey)
    console.log('order----', order)
    const response = await payApi.getYunPayCode(order)
    console.log('response----', response)
    if (response.status === 200 && response.data.code === 0) {
        dialogVisible.value = true
        startPayTime()
        const url = await QRCode.toDataURL(response.data.data)
        console.log('url', url)
        qrCodeData.value = url
    } else {
        oneMessage.error(t('getPayCodeError'))
    }
}

// get z pay code
const getZPayCode = async (payMathod: string = 'alipay') => {
    console.log('getZPayCode')
    payType.value = payMathod
    payMethod.value = 'zpay'
    let money = 10
    try {
        money = parseFloat(textarea.value)
        if (isNaN(money)) {
            oneMessage.error(t('payAmountError'))
            return
        }
    } catch (error) {
        oneMessage.error(t('payAmountError'))
        return
    }
    payOrderNo.value = 'zpay_' + Date.now()
    const order: any = {
        pid: zPayMchId,
        type: payMathod,
        out_trade_no: payOrderNo.value,
        notify_url: 'https://juejin.cn/',
        name: t('payTestOrder'),
        money: money,
        clientip: '192.168.1.100',
        sign_type: 'MD5',
    }
    // get pay sign
    order.sign = getPaySign(order, zPaySignKey)
    console.log('order----', order)
    // formData post
    const formData = new FormData()
    formData.append('pid', zPayMchId)
    formData.append('type', payMathod)
    formData.append('out_trade_no', payOrderNo.value)
    formData.append('notify_url', 'https://juejin.cn/')
    formData.append('name', 'VIP会员')
    formData.append('money', money.toString())
    formData.append('clientip', '192.168.1.100')
    formData.append('sign_type', 'MD5')
    formData.append('sign', getPaySign(formData, zPaySignKey))
    const response: any = await payApi.getZPayCode2(formData)
    // const response: any = await payApi.getZPayCode(order)
    console.log('response----', response)
    if (response.status === 200 && response.data.code === 1) {
        dialogVisible.value = true
        startPayTime()
        const url = await QRCode.toDataURL(response.data.payurl)
        console.log('url', url)
        qrCodeData.value = url
    } else {
        oneMessage.error(t('getPayCodeError'))
    }
}

// check z pay status
const checkZPayStatus = async () => {
    if (!payOrderNo.value) {
        return
    }
    const order = {
        act: 'order',
        pid: zPayMchId,
        key: zPaySignKey,
        out_trade_no: payOrderNo.value,
    }
    const response: any = await payApi.checkZPayStatus(order)
    console.log('response----', response)
    if (response.status === 200 && response.data.status === 1) {
        oneMessage.success(t('paySuccess'))
    } else {
        oneMessage.error(t('payFail'))
    }
}

// check pay js status
const checkPayJsStatus = async () => {
    if (!payOrderNo.value) {
        return
    }
}

// check yun pay status
const checkYunPayStatus = async () => {
    if (!payOrderNo.value) {
        return
    }
    const order: any = {
        mch_id: yunPayMchid,
        out_trade_no: payOrderNo.value,
    }
    order.sign = getPaySign(order, yunPaySignKey)
    console.log('order----', order)
    const response = await payApi.checkYunPayStatus(order)
    console.log('response----', response)
    if (response.status === 200 && response.data.code === 0) {
        const { payStatus } = response.data.data
        if (payStatus === 1) {
            oneMessage.success(t('paySuccess'))
        } else {
            oneMessage.error(t('payFail'))
        }
    } else {
        oneMessage.error(t('getPayStatusError'))
    }
}

// check pay status
const checkPayStatus = async () => {
    if (payMethod.value === 'payjs') {
        await checkPayJsStatus()
    } else if (payMethod.value === 'yun') {
        await checkYunPayStatus()
    } else if (payMethod.value === 'zpay') {
        await checkZPayStatus()
    }
}

const selectFolder = async () => {
    const selected = await openSelect(true, [])
    console.log('selected', selected)
    textarea.value = selected || ''
}

const compressFile = async () => {
    console.log('compressFile')
    const selected = await openSelect(true, [])
    console.log('selected', selected)
    const destinationFile = await join(textarea.value, 'compressed.zip')
    if (selected && textarea.value) {
        const files = await invoke('compress_folder', {
            source: selected,
            destination: destinationFile,
        })
        console.log('compress_folder', files)
        oneMessage.success(t('compressFileSuccess'))
    } else {
        oneMessage.error(t('selectFileOrOutputFolder'))
    }
}

// decompress file
const decompressFile = async () => {
    console.log('decompressFile')
    const selected = await openSelect(false, [])
    console.log('selected', selected)
    if (selected && textarea.value) {
        const files = await invoke('decompress_file', {
            source: selected,
            destination: textarea.value,
        })
        console.log('decompress_file', files)
        oneMessage.success(t('decompressFileSuccess'))
    } else {
        oneMessage.error(t('selectFileOrOutputFolder'))
    }
}

const selectDownloadFolder = async () => {
    const selected = await openSelect(true, [])
    console.log('selected', selected)
    selectedDir = selected || ''
}

const openUrlWindow = async (type: string = 'current') => {
    const url = textarea.value
    if (url) {
        if (type === 'current') {
            window.location.href = url
        } else {
            console.log('new webview window')
            const webview = new WebviewWindow('my-label', {
                url: url,
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
        }
    } else {
        oneMessage.error(t('inputUrl'))
    }
}

// Send native notifications to your user using the notification plugin.
const sendNotification = async () => {
    if (!textarea.value) {
        oneMessage.error(t('inputNotificationContent'))
        return
    }
    invoke('notification', {
        params: {
            title: t('notificationTitle'),
            body: textarea.value,
            icon: 'face-smile',
        },
    })
}

const openFolder = async (dirType: string) => {
    switch (dirType) {
        case 'appCacheDir':
            const appCacheDirPath = await appCacheDir()
            console.log('appCacheDirPath', appCacheDirPath)
            await openUrl(appCacheDirPath)
            break
        case 'appConfigDir':
            const appConfigDirPath = await appConfigDir()
            await openUrl(appConfigDirPath)
            break
        case 'appDataDir':
            const appDataDirPath = await appDataDir()
            await openUrl(appDataDirPath)
            break
        case 'appLocalDataDir':
            const appLocalDataDirPath = await appLocalDataDir()
            await openUrl(appLocalDataDirPath)
            break
        case 'appLogDir':
            const appLogDirPath = await appLogDir()
            await openUrl(appLogDirPath)
            break
        case 'audioDir':
            const audioDirPath = await audioDir()
            await openUrl(audioDirPath)
            break
        case 'cacheDir':
            const cacheDirPath = await cacheDir()
            await openUrl(cacheDirPath)
            break
        case 'configDir':
            const configDirPath = await configDir()
            await openUrl(configDirPath)
            break
        case 'dataDir':
            const dataDirPath = await dataDir()
            await openUrl(dataDirPath)
            break
        case 'delimiter':
            const delimiterPath = await delimiter()
            textarea.value = 'delimiter: ' + delimiterPath
            break
        case 'desktopDir':
            const desktopDirPath = await desktopDir()
            await openUrl(desktopDirPath)
            break
        case 'dirname':
            const dirnamePath = await dirname(textarea.value)
            await openUrl(dirnamePath)
            break
        case 'documentDir':
            const documentsDirPath = await documentDir()
            await openUrl(documentsDirPath)
            break
        case 'downloadDir':
            const downloadDirPath = await downloadDir()
            await openUrl(downloadDirPath)
            break
        case 'executableDir':
            const executableDirPath = await executableDir()
            await openUrl(executableDirPath)
            break
        case 'extname':
            const extnamePath = await extname(textarea.value)
            await openUrl(extnamePath)
            break
        case 'fontDir':
            const fontDirPath = await fontDir()
            await openUrl(fontDirPath)
            break
        case 'homeDir':
            const homeDirPath = await homeDir()
            await openUrl(homeDirPath)
            break
        case 'isAbsolute':
            const isAbsolutePath = await isAbsolute(textarea.value)
            textarea.value = 'isAbsolute: ' + isAbsolutePath
            break
        case 'join':
            const joinPath = await join(textarea.value, 'test.txt')
            await openUrl(joinPath)
            break
        case 'localDataDir':
            const localDataDirPath = await localDataDir()
            await openUrl(localDataDirPath)
            break
        case 'normalize':
            const normalizePath = await normalize(textarea.value)
            await openUrl(normalizePath)
            break
        case 'pictureDir':
            const pictureDirPath = await pictureDir()
            await openUrl(pictureDirPath)
            break
        case 'publicDir':
            const publicDirPath = await publicDir()
            await openUrl(publicDirPath)
            break
        case 'resolve':
            const resolvePath = await resolve(textarea.value)
            await openUrl(resolvePath)
            break
        case 'resolveResource':
            const resolveResourcePath = await resolveResource(textarea.value)
            await openUrl(resolveResourcePath)
            break
        case 'resourceDir':
            const resourceDirPath = await resourceDir()
            await openUrl(resourceDirPath)
            break
        case 'runtimeDir':
            const runtimeDirPath = await runtimeDir()
            await openUrl(runtimeDirPath)
            break
        case 'sep':
            const sepPath = sep()
            textarea.value = 'sep: ' + sepPath
            break
        case 'tempDir':
            const tempDirPath = await tempDir()
            await openUrl(tempDirPath)
            break
        case 'templateDir':
            const tmpDirPath = await templateDir()
            await openUrl(tmpDirPath)
            break
        case 'videoDir':
            const videoDirPath = await videoDir()
            await openUrl(videoDirPath)
            break
        default:
            textarea.value = t('checkError')
            break
    }
}

const downAppData = async () => {
    const url = textarea.value
    const fileName = await basename(url)
    const fileId = fileName.split('.')[0]
    const appDataDirPath = await appDataDir()
    const savePath = await join(appDataDirPath, fileName)
    await invoke('download_file', {
        url,
        savePath,
        fileId,
    })
}

// run shell
const runShell = async () => {
    if (isTauri() && textarea.value) {
        const result = await invoke('run_command', {
            command: textarea.value,
        })
        console.log('result', result)
    } else {
        oneMessage.error(t('inputCommand'))
    }
}

const downloadProgress = ref(0)
const downFile = async (selPath: boolean = true) => {
    downloadProgress.value = 0
    if (!textarea.value) {
        oneMessage.error(t('inputDownloadPath'))
        return
    }
    const url = textarea.value
    const fileName = await basename(url)
    const fileId = fileName.split('.')[0]
    let savePath = ''
    if (selPath) {
        savePath = await join(selectedDir, fileName)
    } else {
        console.log('download dir')
    }
    await invoke('download_file', {
        url,
        savePath,
        fileId,
    })
}

// open vconsole
let vConsole: any = null
const debugHandler = (type: string = 'open') => {
    if (type === 'open') {
        vConsole = new window.VConsole()
    } else {
        vConsole.destroy()
    }
}

listen('download_progress', (event: any) => {
    console.log(`downloading fileId--- ${event.payload.fileId}`)
    console.log(`downloading downloaded--- ${event.payload.downloaded}`)
    console.log(`downloading total--- ${event.payload.total}`)
    downloadProgress.value = Number(
        ((event.payload.downloaded / event.payload.total) * 100).toFixed(2)
    )
})

// execute code
const executeCode = (code: string) => {
    try {
        eval(code)
    } catch (error) {
        console.error('execute code error', error)
    }
}

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
    } else {
        handleMenu(menuIndex.value)
    }
})
</script>

<style lang="scss">
.el-button {
    margin: 0;
}

.tauriIcon {
    width: 20px;
    height: 20px;
    font-size: 18px !important;
}

.dialogContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .qrCodeBox {
        margin-top: 10px;
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        .qrlogo {
            width: 26px;
            height: 26px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .zhifubao {
            font-size: 32px;
            color: #009fe8;
            position: absolute;
            background-color: #fff;
        }

        .weixin {
            font-size: 32px;
            color: #3daf34;
            position: absolute;
            background-color: #fff;
            // background-size: 100% 100%;
        }
    }

    .payTip {
        margin: 4px 0;
        font-size: 14px;
        color: #999;
        font-weight: 600;
    }

    .qrCode {
        width: 200px;
        height: 200px;
    }
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

        .image {
            width: 40px;
            height: 40px;
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
            margin: 10px 0;

            .el-button {
                margin: 0;
            }
        }

        .codeDemo {
            margin-bottom: 10px;
            .description {
                margin-bottom: 10px;
            }
        }
    }
}

.downProgress {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>
