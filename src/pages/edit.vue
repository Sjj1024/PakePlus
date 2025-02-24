<template>
    <div
        class="editBox"
        v-loading="buildLoading"
        :element-loading-text="t('preEnvironment')"
    >
        <div class="mainEdit">
            <div class="homeHeader">
                <div>
                    <div class="headerTitle">
                        <div class="backBox" @click="backHome">
                            <el-icon><ArrowLeft /></el-icon>
                            <span>{{ t('back') }}</span>
                        </div>
                        <el-divider direction="vertical" />
                        <span>{{ t('configProject') }}</span>
                    </div>
                    <div class="toolTips">
                        <span>
                            {{ t('configProjectTips') }}
                        </span>
                    </div>
                </div>
                <!-- tools -->
                <div class="setting">
                    <!-- <el-icon :size="26"><Menu /></el-icon> -->
                    <el-dropdown>
                        <span class="dropdownLink">
                            <el-icon :size="26"><Operation /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    @click="configDialogVisible = true"
                                >
                                    {{ t('moreConfig') }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    :disabled="store.release.id === 0"
                                    @click="toHistory"
                                >
                                    {{ t('relHistore') }}
                                </el-dropdown-item>
                                <el-dropdown-item @click="deleteProject">
                                    {{ t('delProject') }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <el-form
                ref="appFormRef"
                :model="appForm"
                :rules="appRules"
                label-width="auto"
                class="configForm"
                :size="formSize"
                status-icon
            >
                <div class="inLine">
                    <el-form-item
                        :label="t('appName')"
                        prop="showName"
                        class="formItem"
                    >
                        <el-input
                            v-model="appForm.showName"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            @change="changeAppName"
                            :placeholder="`${t('example')}：PakePlus`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('webUrl')"
                        prop="url"
                        class="formItem"
                    >
                        <el-input
                            v-model="appForm.url"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            @change="changeUrl"
                            :placeholder="`${t(
                                'example'
                            )}：https://www.pakeplus.com'`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine">
                    <el-form-item
                        :label="t('appId')"
                        prop="appid"
                        class="formItem"
                    >
                        <el-input
                            v-model="appForm.appid"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：com.pakeplus.app`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('appVersion')"
                        prop="version"
                        class="formItem"
                    >
                        <el-input
                            v-model="appForm.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine">
                    <el-form-item
                        :label="t('appIcon')"
                        prop="icon"
                        class="formItem"
                    >
                        <el-input
                            :value="iconFileName"
                            :disabled="token === null"
                            readonly
                            @click="uploadIcon"
                            class="iconInput"
                            :placeholder="`${t('onlyPng')}`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('scriptFile')"
                        prop="jsFile"
                        class="formItem"
                    >
                        <el-select
                            v-model="appForm.jsFile"
                            multiple
                            collapse-tags
                            filterable
                            ref="selJs"
                            :placeholder="t('selectJsScriptFile')"
                            class="jsSelect"
                            @change="jsChange"
                            @click="jsHandle"
                            @visible-change="optionVisible"
                        >
                            <el-option
                                v-for="item in jsSelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item :label="t('platform')" prop="platform">
                    <el-radio-group
                        v-model="appForm.platform"
                        @change="platformChange"
                    >
                        <el-radio value="desktop">{{ t('desktop') }}</el-radio>
                        <el-radio value="iPhone">iPhone</el-radio>
                        <el-radio value="Android">Android</el-radio>
                        <el-radio value="iPad">iPad</el-radio>
                        <el-radio value="custom">{{ t('customize') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- window size -->
                <el-form-item :label="t('winSize')" prop="size">
                    <el-input
                        type="number"
                        v-model.number="appForm.width"
                        style="width: 100px"
                        :placeholder="t('width')"
                    />
                    <span class="iconfont divider"> &#xe62f; </span>
                    <el-input
                        type="number"
                        v-model.number="appForm.height"
                        style="width: 100px"
                        :placeholder="t('height')"
                    />
                    <span class="iconfont rotateIcon" @click="rotateWH">
                        &#xe66b;
                    </span>
                </el-form-item>
                <el-form-item :label="t('filterElements')" prop="desc">
                    <el-input
                        v-model="appForm.filterCss"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :rows="3"
                        :placeholder="t('inputXpathSelectors')"
                    />
                </el-form-item>
                <el-form-item :label="t('appDes')" prop="desc">
                    <el-input
                        v-model="appForm.desc"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :rows="3"
                        :placeholder="t('desTips')"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="footerBox">
            <el-button @click="saveProject(true)">{{ t('save') }}</el-button>
            <el-button @click="preview(false)">{{ t('preview') }}</el-button>
            <el-button :disabled="token === null" @click="createRepo">
                {{ t('publish') }}
            </el-button>
            <el-button v-if="isDev" @click="libRsConfig">Test</el-button>
        </div>
        <!-- build -->
        <el-dialog
            v-model="centerDialogVisible"
            width="500"
            center
            align-center
        >
            <template #header>
                <div class="diaHeader">
                    <span>{{ t('build') }}</span>
                </div>
            </template>
            <el-form
                :model="pubForm"
                label-width="auto"
                style="max-width: 600px"
            >
                <!-- platform select -->
                <el-form-item :label="t('pubPlatform')">
                    <el-checkbox-group v-model="pubForm.platform">
                        <el-checkbox :label="t('desktop')" value="desktop" />
                        <el-checkbox
                            :label="t('mobileEnd')"
                            value="mobile"
                            disabled
                        />
                        <el-checkbox
                            :label="t('sourceCode')"
                            value="source"
                            disabled
                        />
                    </el-checkbox-group>
                </el-form-item>
                <!-- build package selcted -->
                <!-- <el-form-item label="目标架构">
                    <el-radio-group v-model="pubForm.chip">
                        <el-radio value="macos">m</el-radio>
                        <el-radio value="debug">macos-Intel</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <!-- debug -->
                <el-form-item :label="t('pubMode')">
                    <el-radio-group v-model="pubForm.model">
                        <el-radio value="close">{{ t('closeDebug') }}</el-radio>
                        <el-radio value="debug">{{ t('openDebug') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('releaseNotes')">
                    <el-input
                        v-model="pubForm.desc"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="t('inputRelNotes')"
                    />
                </el-form-item>
            </el-form>
            <span style="color: #aaa">
                {{ t('pubNotesTips') }}
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">
                        {{ t('cancel') }}
                    </el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="onPublish">
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- cutter img -->
        <CutterImg
            v-model="cutVisible"
            :imgUrl="iconBase64"
            :confirm="confirmIcon"
        ></CutterImg>
        <!-- more config -->
        <el-dialog
            v-model="configDialogVisible"
            width="90%"
            center
            align-center
            @closed="closeConfigDialog"
        >
            <template #header="{ titleId, titleClass }">
                <div class="configHeader">
                    <h4 :id="titleId" :class="titleClass" class="titleLine">
                        <span class="titleText">{{ t('moreConfig') }}</span>
                        <el-icon class="switchIcon" @click="isJson = !isJson">
                            <Switch />
                        </el-icon>
                    </h4>
                </div>
            </template>
            <TauriConfig
                ref="tauriConfigRef"
                :tauriConfig="tauriConfig"
                :isJson="isJson"
            />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import { useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/core'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import githubApi from '@/apis/github'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePakeStore } from '@/store'
import {
    mkdir,
    writeFile,
    readFile,
    readTextFile,
    writeTextFile,
    exists,
} from '@tauri-apps/plugin-fs'
import { appDataDir, join } from '@tauri-apps/api/path'
import { basename } from '@tauri-apps/api/path'
import { ArrowLeft } from '@element-plus/icons-vue'
import CutterImg from '@/components/CutterImg.vue'
import { useI18n } from 'vue-i18n'
import { CSSFILTER, isAlphanumeric, openUrl, isDev } from '@/utils/common'
import { emit } from '@tauri-apps/api/event'
import { platforms } from '@/utils/config'
import { platform } from '@tauri-apps/plugin-os'
import { getCurrentWindow } from '@tauri-apps/api/window'
import TauriConfig from '@/components/TauriConfig.vue'

const router = useRouter()
const store = usePakeStore()
const window = getCurrentWindow()
const { t } = useI18n()
const iconBase64 = ref('')
const cutVisible = ref(false)
const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()
const appForm: any = reactive(store.currentProject)
const platformName = platform()
const token = localStorage.getItem('token')
const iconFileName = ref('')
const selJs = ref<any>(null)
const jsFileContents = ref('')
const jsSelOptions: any = ref<any>([])
const configDialogVisible = ref(false)

const appRules = reactive<FormRules>({
    url: [
        {
            required: true,
            message: t('inputWebPlaceholder'),
            trigger: 'change',
        },
        {
            validator: (rule, value, callback) => {
                // check url start with http or https
                if (value.startsWith('http')) {
                    callback()
                } else {
                    callback(new Error(t('urlInvalid')))
                }
            },
            trigger: 'blur',
        },
    ],
    showName: [
        {
            required: true,
            message: t('inputAppNamePlaceholder'),
            trigger: 'blur',
        },
        {
            validator: (rule, value, callback) => {
                // console.log('appshow name value', value)
                // the name cannot start with a digit
                // the name cannot contain special characters
                // the name cannot include chinese characters
                if (
                    /^[0-9]/.test(value) ||
                    value.includes(' ') ||
                    /[\u4e00-\u9fa5]/.test(value)
                ) {
                    callback(new Error(t('appNameInvalid')))
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
    appid: [
        {
            required: true,
            message: t('inputAppIdPlaceholder'),
            trigger: 'change',
        },
        {
            validator: (rule, value, callback) => {
                // check appid must be alphanumeric and dot
                if (/^[a-zA-Z0-9.]+$/.test(value)) {
                    callback()
                } else {
                    callback(new Error(t('appIdInvalid')))
                }
            },
            trigger: 'blur',
        },
    ],
    icon: [
        {
            required: false,
            message: t('inputAppIconPlaceholder'),
            trigger: 'change',
        },
    ],
    version: [
        {
            required: true,
            message: t('inputAppVersionPlaceholder'),
            trigger: 'change',
        },
        {
            validator: (rule, value, callback) => {
                const versionPattern = /^\d\.\d\.\d$/ // 1.8.8 or 1.9.2
                if (!versionPattern.test(value)) {
                    callback(new Error(t('versionSemVer')))
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
    platform: [
        {
            required: false,
            message: t('inputPrePlatformPlaceholder'),
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: false,
            message: t('inputAppDesPlaceholder'),
            trigger: 'blur',
        },
    ],
})

// is json config
const isJson = ref(false)
const tauriConfigRef = ref<any>(null)

// tauri config
const tauriConfig: any = reactive({
    windows: {
        label: store.currentProject.name,
        title: appForm.showName,
        url: appForm.url,
        userAgent: platforms[appForm.platform].userAgent,
        width: appForm.width,
        height: appForm.height,
        theme: null,
        resizable: true,
        fullscreen: false,
        maximized: false,
        minWidth: 400,
        minHeight: 300,
        maxWidth: 1920,
        maxHeight: 1080,
        decorations: true,
        transparent: false,
        titleBarStyle: 'Visible',
        visible: true,
        focus: true,
        closable: true,
        minimizable: true,
        maximizable: true,
        alwaysOnTop: false,
        alwaysOnBottom: false,
        center: false,
        skipTaskbar: false,
        tabbingIdentifier: null,
        parent: null,
        dragDropEnabled: true,
        browserExtensionsEnabled: false,
        devtools: true,
        contentProtected: false,
        hiddenTitle: false,
        incognito: false,
        proxyUrl: null,
        useHttpsScheme: false,
        zoomHotkeysEnabled: false,
        acceptFirstMouse: false,
        create: false,
        // if add additionalBrowserArgs, windows cant preview, but can build
        // additionalBrowserArgs:
        //     '--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection --autoplay-policy=no-user-gesture-required --auto-accept-camera-and-microphone-capture',
    },
})

// change app name
const changeAppName = (value: string) => {
    console.log('changeAppName', value)
    tauriConfig.windows.title = value
}

// change url
const changeUrl = (value: string) => {
    console.log('changeUrl', value)
    tauriConfig.windows.url = value
}

// watch tauri config
watch(tauriConfig, () => {
    console.log('tauriConfig change', tauriConfig)
    if (isJson.value) {
        appForm.showName = tauriConfig.windows.title
        appForm.url = tauriConfig.windows.url
    } else {
        tauriConfigRef.value?.updateCode()
    }
    saveFormInput()
})

// close tauri config dialog
const closeConfigDialog = () => {
    configDialogVisible.value = false
    console.log('closeConfigDialog', tauriConfig)
}

const jsChange = () => {
    console.log('js file change', appForm.jsFile)
    let jsContent = ''
    for (let jsFile of appForm.jsFile) {
        const reContent = jsFileContents.value.match(
            new RegExp(`// ${jsFile}\n(.*)// end ${jsFile}\n`, 's')
        )
        if (reContent) {
            jsContent += reContent[1]
        }
    }
    console.log('jsContent', jsContent)
    jsFileContents.value = jsContent
    jsSelOptions.value = appForm.jsFile?.map((item: any) => {
        return {
            label: item,
            value: item,
        }
    })
}

const optionVisible = (value: boolean) => {
    console.log('optionVisible', value)
    if (!value) {
        // close show js option
        jsSelOptions.value = appForm.jsFile?.map((item: any) => {
            return {
                label: item,
                value: item,
            }
        })
        //
    }
}

const jsHandle = async (event: any) => {
    console.log('js hangle', event.offsetX, event.offsetY)
    if (
        (event.offsetX > 230 && event.offsetY > 0) ||
        event.target instanceof SVGElement ||
        (event.target instanceof HTMLDivElement &&
            event.target.classList.contains('el-select__suffix'))
    ) {
        console.log('Clicked on an SVG')
    } else {
        console.log('Clicked on an element other than SVG')
        const selected: any = await open({
            multiple: true,
            filters: [
                {
                    name: 'File',
                    extensions: ['js'],
                },
            ],
        })
        if (Array.isArray(selected)) {
            // user selected multiple directories
            console.log('selected list', selected)
            const jsFiles: any = []
            const jsOptions: any = []
            let jsContents: any = ''
            for (let file of selected) {
                // read js file content
                const jsContent = await readTextFile(file)
                const fileName = await basename(file)
                jsContents += `// ${fileName}\n${jsContent}\n// end ${fileName}\n`
                console.log('filename', fileName)
                jsOptions.push({
                    label: fileName,
                    value: fileName,
                })
                jsFiles.push(fileName)
            }
            appForm.jsFile = jsFiles
            jsSelOptions.value = jsOptions
            jsFileContents.value = jsContents
            console.log('jsFileContents', jsFileContents.value)
        } else if (selected === null) {
            // user cancelled the selection
            console.log('No file selected')
            return null
        } else {
            // user selected a single directory
            console.log('user selected a single directory')
        }
    }
}

// icon confirm
const confirmIcon = (base64Data: string) => {
    cutVisible.value = false
    console.log('confirmIcon base64Data', base64Data)
    const base64Img = base64Data.split('base64,')[1]
    // update icon file content
    updateIcon(base64Img)
    // save image to datadir
    saveImage(iconFileName.value, base64Img)
}

// get base64 image size
const getImageSize = (base64String: any) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const dimensions = {
                width: img.width,
                height: img.height,
            }
            resolve(dimensions)
        }
        img.onerror = (error) => {
            reject(error)
        }
        img.src = base64String
    })
}

// platform change
const platformChange = (value: any) => {
    console.log('platformChange', value)
    const platformInfo = platforms[value]
    console.log('platformInfo', platformInfo)
    appForm.width = platformInfo.width
    appForm.height = platformInfo.height
    tauriConfig.windows.width = platformInfo.width
    tauriConfig.windows.height = platformInfo.height
    tauriConfig.windows.userAgent = platformInfo.userAgent
    tauriConfigRef.value?.updateCode()
}

// rotate width and height
const rotateWH = () => {
    const temp = appForm.width
    appForm.width = appForm.height
    appForm.height = temp
    tauriConfig.windows.width = appForm.width
    tauriConfig.windows.height = appForm.height
    preview(true)
}

// upload icon
const uploadIcon = async () => {
    console.log('uploadIcon')
    // use tauri open api, bacause input cant seleted file type
    const selectedFilePath: any = await open({
        multiple: false,
        filters: [
            {
                name: 'Images',
                extensions: ['png', 'jpg', 'jpeg', 'webp'],
            },
        ],
    })

    if (!selectedFilePath) {
        console.log('No file selected')
        return null
    }
    const fileName = await basename(selectedFilePath)
    // const fileName = selectedFilePath.split('/').pop()
    iconFileName.value = fileName
    console.log('Selected file path:', selectedFilePath, fileName)
    console.log(`File Name: ${fileName}`)
    // get file name
    const binaryData = await readFile(selectedFilePath)
    const base64Data: any = arrayBufferToBase64(binaryData)
    console.log('Base64 encoded image:', base64Data)
    const base64String = 'data:image/jpg;base64,' + base64Data
    iconBase64.value = base64String
    // if file is not png, and size is not 512x512, then cut it
    const imageSize: any = await getImageSize(base64String)
    // console.log('imageSize', imageSize)
    if (imageSize.width === imageSize.height && fileName.endsWith('.png')) {
        // confirmIcon(base64String)
        cutVisible.value = true
    } else {
        cutVisible.value = true
    }
}

// update icon file content
const updateIcon = async (content: string) => {
    // get app-icon.png sha
    const iconSha: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        'app-icon.png',
        { ref: store.currentProject.name }
    )
    console.log('iconSha---', iconSha)
    // update icon file content
    if (iconSha.status === 200) {
        const updateRes: any = await githubApi.updateIconFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update icon from pakeplus',
                content: content,
                sha: iconSha.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    }
}

// save image file to datadir
const saveImage = async (fileName: string, base64: string) => {
    // base64 to arraybuffer
    const imageArrayBuffer = base64ToArrayBuffer(base64)
    // save file
    const imageData = new Uint8Array(imageArrayBuffer)
    // get app data dir
    const appDataPath = await appDataDir()
    console.log('appDataPath------', appDataPath)
    const targetDir = await join(appDataPath, 'assets')
    const savePath = await join(targetDir, fileName)
    // confirm target dir
    await mkdir(targetDir, { recursive: true })
    // const savePath = await join(appDataPath, 'assets', fileName)
    // save file to app data dir
    await writeFile(savePath, imageData)
    console.log(`Image saved to: ${savePath}`)
    appForm.icon = savePath
    // save image asseturl to project
    store.addUpdatePro({
        ...appForm,
        name: store.currentProject.name,
        appid: appForm.appid,
        debug: pubForm.model,
        icon: savePath,
        more: tauriConfig,
    })
}

// turn base64 to ArrayBuffer
const base64ToArrayBuffer = (base64: string) => {
    // creat new ArrayBuffer
    const binaryString = atob(base64)
    const len = binaryString.length
    const arrayBuffer = new ArrayBuffer(len)
    const uint8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < len; i++) {
        uint8Array[i] = binaryString.charCodeAt(i)
    }
    return arrayBuffer
}

// arrayBufferToBase64
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

const backHome = () => {
    router.go(-1)
}

// click menu item
const toHistory = () => {
    router.push('/history')
}

// delete current project
const deleteProject = () => {
    ElMessageBox.confirm(t('confirmDelProject'), t('tips'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
    })
        .then(() => {
            console.log('delete project')
            githubApi.deleteBranch(
                store.userInfo.login,
                'PakePlus',
                store.currentProject.name
            )
            store.delProject(store.currentProject)
            router.push('/')
        })
        .catch(() => {
            console.log('catch project')
        })
}

// save js file content to appDataDir
const saveJsFile = async () => {
    console.log('saveJsFile', jsFileContents.value)
    // get app data dir
    const appDataPath = await appDataDir()
    console.log('appDataPath------', appDataPath)
    const targetDir = await join(appDataPath, 'assets')
    const savePath = await join(targetDir, `${store.currentProject.name}.js`)
    // save file
    await writeTextFile(savePath, jsFileContents.value)
    console.log(`js file saved to: ${savePath}`)
}

// save form input
const saveFormInput = async () => {
    console.log('saveFormInput', appForm)
    store.addUpdatePro({
        ...appForm,
        name: store.currentProject.name,
        debug: pubForm.model,
        more: tauriConfig,
    })
    // save js file content to appDataDir
    if (jsFileContents.value) {
        saveJsFile()
    }
}

// save project
const saveProject = async (tips: boolean = true) => {
    // await emit('handlepay', { loggedIn: true, token: 'authToken' })
    appFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            saveFormInput()
            tips && ElMessage.success(t('saveSuccess'))
        } else {
            console.error('error submit!', fields)
        }
    })
}

// get initialization_script
const getInitializationScript = () => {
    // creat css filter content
    let initJsScript = ''
    if (appForm.filterCss !== '') {
        const cssFilterContent = appForm.filterCss
            .split(';')
            .map((item: string, index: number) => {
                return `const element${index} = document.querySelector('${item}');
                if (element${index}) {
                    element${index}.style.display = 'none';
                }`
            })
            .join(';')
        console.log('cssFilterContent', cssFilterContent)
        const initCssScript = CSSFILTER.replace('CSSFILTER', cssFilterContent)
        // read js file content
        initJsScript = initCssScript
    }
    // if jsFileContents is not empty, then add initJsScript
    if (jsFileContents.value) {
        initJsScript = initJsScript + jsFileContents.value
    }
    console.log('initJsScript', initJsScript)
    return initJsScript
}

const preview = async (resize: boolean) => {
    // get platform
    console.log('platform', platformName)
    if (
        platformName === 'windows' &&
        tauriConfig.windows.additionalBrowserArgs
    ) {
        ElMessage.error('additionalBrowserArgs cant preview on windows')
        return
    }
    // if platform is macos, then use tauri preview
    appFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log('submit!', appForm)
            saveProject(false)
            // initialization_script
            const initJsScript = getInitializationScript()
            // console.log('initCssScript', initCssScript)
            invoke('preview_from_config', {
                resize,
                config: {
                    ...tauriConfig.windows,
                    label: 'PreView',
                },
                jsContent: initJsScript,
            })
        } else {
            console.error('error submit!', fields)
        }
    })
}

const createRepo = async () => {
    appFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            saveProject(false)
            console.log('submit!', appForm)
            centerDialogVisible.value = true
        } else {
            console.error('error submit!', fields)
        }
    })
}

// do not use same name with ref
const pubForm = reactive({
    platform: ['desktop'],
    chip: 'macos',
    model: 'close',
    desc: '',
})

const buildLoading = ref(false)
// check dispatch workflow timer
let buildTime = 0
let buildStatus = t('startCompile') + '...'
let buildSecondTimer: any = null
let checkDispatchTimer: any = null

// delete lasted release
const deleteRelease = async () => {
    if (store.release.id !== 0) {
        const releaseRes: any = await githubApi.deleteRelease(
            store.userInfo.login,
            'PakePlus',
            store.release.id
        )
        console.log('deleteRelease', releaseRes)
    }
    // reset release
    store.setRelease({
        url: '',
        assets_url: '',
        upload_url: '',
        html_url: '',
        id: 0,
        node_id: '',
        tag_name: '',
        target_commitish: '',
        name: '',
        draft: false,
        prerelease: false,
        created_at: '',
        published_at: '',
        assets: [],
        tarball_url: '',
        zipball_url: '',
        body: '',
    })
}

// update build.yml file content
const updateBuildYml = async () => {
    // get build.yml file sha
    const shaRes = await getFileSha(
        '.github/workflows/build.yml',
        store.currentProject.name
    )
    console.log('get build.yml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get build.yml file content
        const content = await invoke('update_build_file', {
            name: store.currentProject.name,
            body: pubForm.desc,
        })
        console.log('content', content)
        // update build.yml file content
        const updateRes: any = await githubApi.updateBuildYmlFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update build.yml from pakeplus',
                content: content,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updateCargoToml = async () => {
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/Cargo.toml',
        store.currentProject.name
    )
    console.log('get CargoToml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const configContent: any = await invoke('update_cargo_file', {
            name: appForm.showName,
            version: appForm.version,
            desc: appForm.desc,
            debug: pubForm.model === 'debug',
        })
        // update config file
        const updateRes: any = await githubApi.updateCargoFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update Cargo.toml from pakeplus',
                content: configContent,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updateMainRs = async () => {
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/src/main.rs',
        store.currentProject.name
    )
    console.log('get CargoToml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const configContent: any = await invoke('update_main_rust', {
            appUrl: appForm.url,
            appName: appForm.showName,
            userAgent: platforms[appForm.platform].userAgent,
            width: appForm.width,
            height: appForm.height,
        })
        const updateRes: any = await githubApi.updateMainRsFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update main rust from pakeplus',
                content: configContent,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const libRsConfig = async () => {
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/src/lib.rs',
        store.currentProject.name
    )
    console.log('get CargoToml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const configContent: any = await invoke('rust_lib_window', {
            config: JSON.stringify(tauriConfig.windows),
        })
        console.log('configContent', configContent)
        const updateRes: any = await githubApi.updateFileContent(
            store.userInfo.login,
            'PakePlus',
            'src-tauri/src/lib.rs',
            {
                message: 'update lib rust from pakeplus',
                content: configContent,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updateCustomJs = async () => {
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/src/extension/custom.js',
        store.currentProject.name
    )
    console.log('get CargoToml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const initJsScript = getInitializationScript()
        const jsFileContent: any = await invoke('update_custom_js', {
            jsContent: initJsScript,
        })
        const updateRes: any = await githubApi.updateCustomJsFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update custom js from pakeplus',
                content: jsFileContent,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// del pre publish version
const onPublish = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
    // delete release
    deleteRelease()
    // update build yml
    await updateBuildYml()
    // update Cargo.toml
    await updateCargoToml()
    // update main rust
    // await updateMainRs()
    // await libRsConfig()
    // update custom js
    await updateCustomJs()
    // update tauri config json
    const configSha: any = await getFileSha(
        'src-tauri/tauri.conf.json',
        store.currentProject.name
    )
    try {
        // if name is ASCII
        // remove label from windows
        let { label, ...newWindows } = tauriConfig.windows
        const configContent: any = await invoke('update_config_file', {
            name: appForm.showName,
            version: appForm.version,
            id: appForm.appid,
            ascii: isAlphanumeric(appForm.showName),
            windowConfig: JSON.stringify(newWindows),
        })
        // update config file
        const updateRes: any = await githubApi.updateConfigFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update config from pakeplus',
                content: configContent,
                sha: configSha.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
            document.querySelector('.el-loading-text')!.innerHTML =
                t('preCompile') + '...'
            dispatchAction()
        } else {
            console.error('updateRes error', updateRes)
        }
    } catch (error) {
        console.error('Error reading JSON file:', error)
    }
}

const getFileSha = async (filePath: string, branch: string) => {
    const res: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        filePath,
        { ref: branch }
    )
    console.log('getBranch', res)
    return res
}

// dispatch workflow action
const dispatchAction = async () => {
    const dispatchRes: any = await githubApi.dispatchWorkflow(
        store.userInfo.login,
        'PakePlus',
        {
            ref: store.currentProject.name,
            inputs: {
                branch: store.currentProject.name,
            },
        }
    )
    console.log('dispatchRes---', dispatchRes)
    if (dispatchRes.status !== 204) {
        console.error('dispatch res error', dispatchRes)
        ElMessage.error('dispatch res error')
        buildLoading.value = false
        return
    } else {
        buildSecondTimer = setInterval(() => {
            buildTime += 1
            const minute = Math.floor(buildTime / 60)
            const second = buildTime % 60
            const buildRate = Math.floor((buildTime / (60 * 15)) * 100)
            // loadingText.value = `${buildStatus}...${minute}分${second}秒`
            const loadingText = `<div>${minute}${t('minute')}${second}${t(
                'second'
            )}</div><div>${buildStatus}${
                buildRate > 99 ? 99 : buildRate
            }%...</div>`
            // console.log('loadingText---', loadingText)
            document.querySelector('.el-loading-text')!.innerHTML = loadingText
        }, 1000)
        // check build status
        setTimeout(async () => {
            checkDispatchTimer = setInterval(async () => {
                checkBuildStatus()
            }, 1000 * 3)
        }, 1000 * 60 * 3)
    }
}

// create issue
const createIssue = async (url: string, label: string, title: string) => {
    const issueRes: any = await githubApi.createIssue({
        body: `name: ${store.currentProject.name}\n 
        build info: ${url}`,
        labels: [label],
        title: title,
    })
    console.log('issueRes---', issueRes)
}

// rerun fails jobs
let rerunCount = 0
const reRunFailsJobs = async (id: number, html_url: string) => {
    rerunCount += 1
    if (rerunCount >= 2) {
        console.log('rerun cancel', rerunCount)
        buildLoading.value = false
        buildTime = 0
        createIssue(html_url, 'failure', 'build error')
        openUrl(html_url)
        document.querySelector('.el-loading-text')!.innerHTML = t('failure')
        buildSecondTimer && clearInterval(buildSecondTimer)
        checkDispatchTimer && clearInterval(checkDispatchTimer)
    } else {
        const rerunRes: any = await githubApi.rerunFailedJobs(
            store.userInfo.login,
            'PakePlus',
            id
        )
        if (rerunRes.status === 201) {
            console.log('rerun success')
        } else {
            reRunFailsJobs(id, html_url)
        }
    }
}

// check build workflow status
const checkBuildStatus = async () => {
    const checkRes: any = await githubApi.getWorkflowRuns(
        store.userInfo.login,
        'PakePlus',
        {
            branch: store.currentProject.name,
            event: 'workflow_dispatch',
        }
    )
    console.log('checkRes---', checkRes)
    const build_runs = checkRes.data.workflow_runs[0]
    const { id, status, conclusion, html_url } = build_runs
    buildStatus = t(status) || t('inProgress')
    if (checkRes.status === 200 && checkRes.data.total_count > 0) {
        if (status === 'completed' && conclusion === 'success') {
            createIssue(html_url, 'success', 'build success')
            document.querySelector('.el-loading-text')!.innerHTML =
                t('buildSuccess')
            // clear timer
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            buildLoading.value = false
            buildTime = 0
            router.push('/history')
        } else if (status === 'completed' && conclusion === 'cancelled') {
            createIssue(html_url, 'cancelled', 'build cancelled')
            document.querySelector('.el-loading-text')!.innerHTML =
                t('cancelled')
            buildLoading.value = false
            buildTime = 0
            // clear interval
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
        } else if (status === 'failure') {
            reRunFailsJobs(id, html_url)
        } else if (conclusion === 'failure') {
            reRunFailsJobs(id, html_url)
        } else if (status === 'completed') {
            reRunFailsJobs(id, html_url)
        }
    } else {
        buildTime = 0
        buildLoading.value = false
        openUrl(html_url)
        buildSecondTimer && clearInterval(buildSecondTimer)
        checkDispatchTimer && clearInterval(checkDispatchTimer)
        document.querySelector('.el-loading-text')!.innerHTML = t('failure')
    }
}

// check preview release assets
const getLatestRelease = async () => {
    const releaseRes: any = await githubApi.getReleasesAssets(
        store.userInfo.login,
        'PakePlus',
        store.currentProject.name
    )
    console.log('releaseRes', releaseRes)
    if (releaseRes.status === 200 && releaseRes.data.assets.length >= 3) {
        // filter current project version
        const assets = releaseRes.data.assets.filter((item: any) => {
            return (
                item.name.includes(store.currentProject.version) ||
                item.name.includes('tar')
            )
        })
        const releaseData = {
            ...releaseRes.data,
            assets,
        }
        store.setRelease(releaseData)
    } else {
        console.log('releaseRes error, but not important', releaseRes)
    }
}

// init jsFileContents from jsFile
const initJsFileContents = async () => {
    // read js file content from appDataDir assets dir
    const appDataPath = await appDataDir()
    const targetDir = await join(appDataPath, 'assets')
    const jsFilePath = await join(targetDir, `${store.currentProject.name}.js`)
    // if file not exist, return
    if (await exists(jsFilePath)) {
        const jsFileContent = await readTextFile(jsFilePath)
        jsFileContents.value = jsFileContent
        console.log('initJsFileContents', jsFileContent)
    }
    jsSelOptions.value = appForm.jsFile?.map((item: any) => {
        return {
            label: item,
            value: item,
        }
    })
}

onMounted(async () => {
    console.log('token', token)
    getLatestRelease()
    initJsFileContents()
    buildTime = 0
    if (store.currentProject.icon) {
        iconFileName.value = await basename(store.currentProject.icon)
    }
    window.setTitle(`${store.currentProject.name}`)
    // appWindow.setTitle(`${store.currentProject.name}`)
})
</script>

<style lang="scss" scoped>
.editBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .configHeader {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard syntax */

        .titleText {
            margin-right: 4px;
            cursor: default;
        }

        .switchIcon {
            cursor: pointer !important;
        }

        .titleLine {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    .mainEdit {
        padding: 10px 20px;

        .homeHeader {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;

            .headerTitle {
                font-size: 20px;
                font-weight: bold;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
                cursor: default;

                .backBox {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                        font-weight: bold;
                    }
                }
            }

            .toolTips {
                color: gray;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-left: 2px;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
                cursor: default;

                .tipsIcon {
                    margin-left: 6px;
                    cursor: pointer;
                }
            }

            .setting {
                position: fixed;
                top: 20px;
                right: 20px;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
                z-index: 1000;

                .dropdownLink {
                    color: gray;

                    &:hover {
                        color: var(--text-color);
                    }
                }
            }

            .headerTool {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
                cursor: default;

                .control {
                    color: #2a598a;
                    cursor: pointer;
                }
            }
        }

        .configForm {
            margin-top: 10px;

            .inLine {
                display: flex;
                flex-direction: row;

                .formItem {
                    flex: 1;
                    margin-right: 10px;
                }
            }

            .divider {
                margin: 0 10px;
                font-size: 10px;
                font-weight: 300;
            }

            .rotateIcon {
                font-size: 22px;
                margin-left: 20px;
                cursor: pointer;
                color: gray;
                user-select: none;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */

                &:hover {
                    color: var(--text-color);
                }
            }
        }
    }

    .footerBox {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-bottom: 10px;
    }
}

.diaHeader {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
}
</style>

<style scoped>
:deep(.iconInput .el-input__inner) {
    cursor: pointer !important;
}

:deep(.jsSelect .el-select__input-wrapper) {
    display: none !important;
}
</style>
