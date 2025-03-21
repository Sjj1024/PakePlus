<template>
    <div
        class="editBox"
        :class="{ isWeb: !isTauri }"
        v-loading.fullscreen.lock="buildLoading"
        :element-loading-text="t('preCheck') + '...'"
    >
        <div class="homeHeader">
            <div>
                <div class="headerTitle">
                    <div class="backBox" @click="backHome">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>{{ t('back') }}</span>
                    </div>
                    <el-divider direction="vertical" />
                    <span @click="tauriHtmlUpload">{{
                        t('configProject')
                    }}</span>
                </div>
                <div class="toolTips">
                    <span>
                        {{ t('configProjectTips') }}
                    </span>
                </div>
            </div>
            <!-- tools -->
            <div class="setting">
                <el-icon
                    v-if="warning"
                    @click="showWarning"
                    :size="22"
                    class="warning"
                >
                    <Warning />
                </el-icon>
                <el-dropdown>
                    <span class="dropdownLink">
                        <el-icon :size="22"><Operation /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="showConfigDialog">
                                {{ t('moreConfig') }}
                            </el-dropdown-item>
                            <el-dropdown-item
                                :disabled="!store.isRelease"
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
        <div class="mainEdit">
            <el-form
                ref="appFormRef"
                :model="store.currentProject"
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
                            v-model.trim="store.currentProject.showName"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            clearable
                            @input="changeAppName"
                            :placeholder="`${t('example')}：PakePlus`"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('webUrl')"
                        prop="url"
                        class="formItem"
                    >
                        <el-input
                            v-model.trim="store.currentProject.url"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            clearable
                            @input="changeUrl"
                            :placeholder="`${t(
                                'example'
                            )}：https://www.github.com'`"
                        >
                            <template #append>
                                <el-tooltip
                                    class="box-item"
                                    :content="t('staticFile')"
                                    placement="bottom"
                                >
                                    <el-button
                                        class="distUpload"
                                        :icon="UploadFilled"
                                        @click="activeDistInput"
                                    />
                                </el-tooltip>
                            </template>
                        </el-input>
                        <input
                            type="file"
                            ref="distInput"
                            webkitdirectory
                            @change="handleFileChange"
                            style="display: none"
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
                            v-model.trim="store.currentProject.appid"
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
                            v-model.trim="store.currentProject.version"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="`${t('example')}：0.0.1`"
                        />
                    </el-form-item>
                </div>
                <div class="inLine checkBox">
                    <el-form-item
                        :label="t('appIcon')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 18%'"
                    >
                        <div v-if="iconBase64" class="iconChange">
                            <img
                                :src="
                                    store.currentProject.iconRound
                                        ? roundIcon
                                        : iconBase64
                                "
                                alt="icon"
                                class="initIcon"
                                @click="imgPreviewVisible = true"
                            />
                            <!-- close icon -->
                            <el-icon class="closeIcon" @click="closeIconChange">
                                <CircleCloseFilled />
                            </el-icon>
                        </div>
                        <div
                            v-else
                            class="iconPreview"
                            @click="isTauri ? uploadIcon() : webUploadIcon()"
                        >
                            <el-icon><Picture /></el-icon>
                            <input
                                type="file"
                                ref="file"
                                accept="image/*"
                                @change="handleIconChange"
                                style="display: none"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item
                        prop="iconRound"
                        :label="t('iconRounded')"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.iconRound"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('windowKeep')"
                        prop="state"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.state"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('injectJq')"
                        prop="injectJq"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.injectJq"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        label="TauriApi"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.tauriApi"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('scriptFile')"
                        prop="customJs"
                        class="formItem"
                        style="margin-right: 10px"
                    >
                        <el-icon
                            class="editIcon"
                            @click="codeDialogVisible = true"
                        >
                            <Edit />
                        </el-icon>
                    </el-form-item>
                </div>
                <el-form-item :label="t('platform')" prop="platform">
                    <el-radio-group
                        v-model="store.currentProject.platform"
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
                        v-model.number="store.currentProject.more.windows.width"
                        style="width: 100px"
                        :placeholder="t('width')"
                    />
                    <span class="iconfont divider"> &#xe62f; </span>
                    <el-input
                        type="number"
                        v-model.number="
                            store.currentProject.more.windows.height
                        "
                        style="width: 100px"
                        :placeholder="t('height')"
                    />
                    <span class="iconfont rotateIcon" @click="rotateWH">
                        &#xe66b;
                    </span>
                </el-form-item>
                <el-form-item :label="t('filterElements')" prop="desc">
                    <el-input
                        v-model.trim="store.currentProject.filterCss"
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
                        v-model.trim="store.currentProject.desc"
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
            <el-button @click="preview(false)">
                {{ t('preview') }}
            </el-button>
            <el-button :disabled="token === null" @click="createRepo">
                {{ t('publish') }}
            </el-button>
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
                        v-model.trim="pubForm.desc"
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
                    <el-button type="primary" @click="publishWeb">
                        {{ t('confirm') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- cutter img -->
        <CutterImg
            v-model="cutVisible"
            :imgUrl="tempIconBase64"
            :confirm="confirmIcon"
        ></CutterImg>
        <!-- more config -->
        <el-dialog
            v-model="configDialogVisible"
            :width="isTauri ? '90%' : '60%'"
            center
            align-center
            :before-close="closeConfigDialog"
        >
            <template #header="{ titleId, titleClass }">
                <div class="configHeader">
                    <h4 :id="titleId" :class="titleClass" class="titleLine">
                        <span class="titleText">{{ t('moreConfig') }}</span>
                        <el-icon class="switchIcon" @click="switchTauriConfig">
                            <Switch />
                        </el-icon>
                    </h4>
                </div>
            </template>
            <TauriConfig ref="tauriConfigRef" :isJson="isJson" />
        </el-dialog>
        <!-- js code edit -->
        <el-dialog
            v-model="codeDialogVisible"
            :width="isTauri ? '90%' : '60%'"
            center
            align-center
            @closed="closeJsCodeEditDialog"
        >
            <template #header="{ titleId, titleClass }">
                <div class="configHeader">
                    <h4 :id="titleId" :class="titleClass" class="titleLine">
                        <span class="titleText">{{ t('scriptEdit') }}</span>
                    </h4>
                </div>
            </template>
            <CodeEdit ref="codeEditRef" lang="javascript" />
        </el-dialog>
        <!-- img preview -->
        <ImgPreview
            v-model:visible="imgPreviewVisible"
            :base64Data="
                store.currentProject.iconRound ? roundIcon : iconBase64
            "
        >
        </ImgPreview>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import { useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/core'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import githubApi from '@/apis/github'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePakeStore } from '@/store'
import {
    readFile,
    readTextFile,
    writeTextFile,
    exists,
} from '@tauri-apps/plugin-fs'
import { appDataDir, join } from '@tauri-apps/api/path'
import { basename } from '@tauri-apps/api/path'
import {
    ArrowLeft,
    Switch,
    Edit,
    Picture,
    CircleCloseFilled,
    Operation,
    UploadFilled,
    Warning,
} from '@element-plus/icons-vue'
import CutterImg from '@/components/CutterImg.vue'
import CodeEdit from '@/components/codeEdit.vue'
import { useI18n } from 'vue-i18n'
import {
    CSSFILTER,
    isAlphanumeric,
    openUrl,
    isTauri,
    platforms,
    arrayBufferToBase64,
    cropImageToRound,
    getBuildYmlFetch,
    getCargoTomlFetch,
    getTauriConfFetch,
    getInitRustFetch,
    base64Encode,
    loadingText,
    includeHtm,
    readFileAsBase64,
    getFilesName,
    rootPath,
    openSelect,
    readDirRecursively,
    replaceFileRoot,
} from '@/utils/common'
import { platform } from '@tauri-apps/plugin-os'
import { getCurrentWindow } from '@tauri-apps/api/window'
import TauriConfig from '@/components/TauriConfig.vue'
import ImgPreview from '@/components/ImgPreview.vue'

const router = useRouter()
const store = usePakeStore()
const { t } = useI18n()
const tempIconBase64 = ref('')
const iconBase64 = ref('')
const roundIcon = ref('')
const cutVisible = ref(false)
const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()

const token = localStorage.getItem('token')
const iconFileName = ref('')
const file = ref<any>(null)

const distInput = ref<any>(null)
const jsFileContents = ref('')
const jsSelOptions: any = ref<any>([])
const configDialogVisible = ref(false)
const codeDialogVisible = ref(false)
const imgPreviewVisible = ref(false)
const warning = ref('')

const appRules = reactive<FormRules>({
    showName: [
        {
            required: true,
            message: t('inputAppNamePlaceholder'),
            trigger: 'blur',
        },
        {
            validator: (rule, value, callback) => {
                if (
                    /^[^/\:*?"<>|\.\$\%\&\*\@\#\!\^\(\)\{\}\[\]\+\=\`\~\'\"]+$/.test(
                        value
                    )
                ) {
                    callback()
                } else {
                    callback(new Error(t('appNameInvalid')))
                }
            },
            trigger: 'blur',
        },
    ],
    url: [
        {
            required: true,
            message: t('inputWebPlaceholder'),
            trigger: 'blur',
        },
        {
            validator: (rule, value, callback) => {
                // check url start with http or https
                if (value.startsWith('http') || value.includes('index.htm')) {
                    callback()
                } else {
                    callback(new Error(t('urlInvalid')))
                }
            },
            trigger: 'change',
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

// tip warning
const showWarning = () => {
    ElMessage.error(warning.value)
}

// is json config
const isJson = ref(false)
const tauriConfigRef = ref<any>(null)

// change app name
const changeAppName = (value: string) => {
    console.log('changeAppName', value)
    store.currentProject.more.windows.title = value
}

// change url
const changeUrl = (value: string) => {
    console.log('changeUrl', value)
    if (store.currentProject.isHtml) {
        store.currentProject.url = ''
        store.currentProject.more.windows.url = ''
        store.currentProject.isHtml = false
        store.currentProject.htmlFiles = []
        store.addUpdatePro(store.currentProject)
    } else {
        store.currentProject.more.windows.url = value
    }
}

const showConfigDialog = () => {
    configDialogVisible.value = true
    tauriConfigRef.value?.updateCode()
}

// close tauri config dialog
const closeConfigDialog = (done: any = () => {}) => {
    const isJson = tauriConfigRef.value?.checkJson()
    if (isJson) {
        configDialogVisible.value = false
        done()
    } else {
        ElMessage.error(t('jsonError'))
    }
}

// close js code edit dialog
const closeJsCodeEditDialog = () => {
    codeDialogVisible.value = false
}

// switch tauri config json or code
const switchTauriConfig = () => {
    isJson.value = !isJson.value
    tauriConfigRef.value?.updateCode()
}

// icon confirm
const confirmIcon = (base64Data: string) => {
    cutVisible.value = false
    iconBase64.value = base64Data
    store.currentProject.icon = base64Data
    const image = new Image()
    image.src = base64Data
    image.onload = () => {
        roundIcon.value = cropImageToRound(image)
    }
}

// platform change
const platformChange = (value: any) => {
    const platformInfo = platforms[value]
    store.currentProject.width = platformInfo.width
    store.currentProject.height = platformInfo.height
    store.currentProject.more.windows.width = platformInfo.width
    store.currentProject.more.windows.height = platformInfo.height
    store.currentProject.more.windows.userAgent = platformInfo.userAgent
    tauriConfigRef.value?.updateCode()
}

// rotate width and height
const rotateWH = () => {
    const temp = store.currentProject.more.windows.width
    store.currentProject.more.windows.width =
        store.currentProject.more.windows.height
    store.currentProject.more.windows.height = temp
    store.currentProject.width = store.currentProject.more.windows.width
    store.currentProject.height = store.currentProject.more.windows.height
    tauriConfigRef.value?.updateCode()
    preview(true)
}

// web upload icon
const webUploadIcon = async () => {
    file.value.click()
}

const fileToBase64 = (file: any) => {
    const reader = new FileReader()
    reader.onload = async () => {
        tempIconBase64.value = reader.result as string
        cutVisible.value = true
    }
    reader.readAsDataURL(file)
}

// loadHtml
const loadHtml = async () => {
    console.log('loadHtml')
    store.currentProject.isHtml = true
    const selected = await openSelect([])
    console.log('selected', selected)
    if (selected) {
        const indexHtml = await join(selected, 'index.html')
        const isExists = await exists(indexHtml)
        if (isExists) {
            const files = await readDirRecursively(selected)
            const configUrl = `index.html (${t('moreAssets')}+${files.length})`
            store.currentProject.url = configUrl
            store.currentProject.htmlPath = selected
            store.currentProject.more.windows.url = configUrl
        } else {
            ElMessage.error(t('indexHtmError'))
        }
    }
}

// tauri html file upload
const tauriHtmlUpload = async () => {
    console.log('tauriHtmlUpload')
    loadingText(t('syncFileStart') + '...')
    // 读取文件夹里面的内容
    if (store.currentProject.isHtml && store.currentProject.htmlPath) {
        console.log(`Selected folder: ${store.currentProject.htmlPath}`)
        // 调用Rust函数来递归加载文件夹中的所有文件
        const files = await readDirRecursively(store.currentProject.htmlPath)
        console.log('files', files)
        loadingText(t('syncFileStart') + '...')
        let total = files.length
        let count = 0
        // 读取文件内容，并替换rootPath
        for (const file of files) {
            count++
            const isExists = await exists(file)
            if (isExists) {
                const fileContent = await readFile(file)
                console.log('fileContent', fileContent)
                const base64Content = arrayBufferToBase64(fileContent)
                console.log('base64Content', base64Content)
                const gitPath = await replaceFileRoot(
                    file,
                    store.currentProject.htmlPath
                )
                const loadingState = `<div>${count}/${total}</div>
                <div>${t('syncFilePro')}${gitPath.replace('src/', '')}</div>
                <div>${t('syncTileTips')}</div>`
                loadingText(loadingState)
                console.log('gitPath', gitPath)
                await upSrcFile(gitPath, base64Content)
            } else {
                console.log('file not exists', file)
            }
        }
    } else {
        console.log('No folder selected')
    }
}

// active dist input
const activeDistInput = async () => {
    console.log('activeDistInput', isTauri)
    if (isTauri) {
        try {
            const res = await invoke('stop_server')
            console.log('stopServer', res)
        } catch (error) {
            console.error('Failed to stop server:', error)
        }
        loadHtml()
    } else {
        if (!store.token) {
            ElMessage.error(t('configToken'))
            return
        } else {
            distInput.value.click()
        }
    }
}

// stop server
const stopServer = async () => {
    if (isTauri) {
        try {
            const res = await invoke('stop_server')
            console.log('stopServer', res)
        } catch (error) {
            console.error('Failed to stop server:', error)
        }
        store.actionSecond()
    }
}

// handle file change
const handleFileChange = async (event: any) => {
    buildLoading.value = true
    store.currentProject.isHtml = true
    loadingText(t('syncFileStart') + '...')
    console.log('handleFileChange', event)
    const input = event.target as HTMLInputElement
    if (input.files) {
        const files = Array.from(input.files).filter(
            (file) => !file.name.startsWith('.')
        )
        console.log('files', files)
        const filePaths = getFilesName(files)
        console.log('filePaths', filePaths)
        // check if index.htm is included
        const isIncludeHtm = includeHtm(filePaths)
        console.log('isIncludeHtm', isIncludeHtm)
        loadingText(t('syncFileStart') + '...')
        if (isIncludeHtm) {
            console.log('ok')
            try {
                await uploadFiles(files)
                buildLoading.value = false
                loadingText(t('syncFileSuccess'))
                ElMessage.success(t('syncFileSuccess'))
            } catch (error: any) {
                console.error('uploadFiles error', error)
                warning.value = error.message
                buildLoading.value = false
                loadingText(t('syncFileError'))
                ElMessage.error(t('syncFileError'))
            }
            store.addUpdatePro(store.currentProject)
        } else {
            ElMessage.error(t('indexHtmError'))
            buildLoading.value = false
        }
    }
}

// 仓库是否已经存在该文件并获取sha, 不存在则创建
const upSrcFile = async (filePath: string, base64Content: string) => {
    const resSha = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        filePath,
        { ref: store.currentProject.name }
    )
    console.log('resSha', resSha)
    let params: any = {
        message: 'update src file from pakeplus',
        content: base64Content,
        sha: '',
        branch: store.currentProject.name,
    }
    if (resSha.status === 200) {
        params.sha = resSha.data.sha
    } else {
        delete params.sha
    }
    // 更新文件
    const updateRes: any = await githubApi.updateFileContent(
        store.userInfo.login,
        'PakePlus',
        filePath,
        params
    )
    console.log(`${filePath} updateRes`, updateRes)
}

// uploadFiles
const uploadFiles = async (files: any) => {
    loadingText(t('syncFileStart') + '...')
    let total = files.length
    let count = 0
    const configUrl = `index.html (${t('moreAssets')}+${total})`
    store.currentProject.url = configUrl
    store.currentProject.more.windows.url = configUrl
    for (const file of files) {
        count++
        const loadingState = `<div>${count}/${total}</div>
        <div>${t('syncFilePro')}${file.name}</div>
        <div>${t('syncTileTips')}</div>`
        loadingText(loadingState)
        // 替换根路径为 "src"
        const newFilePath = rootPath(file)
        const base64Content: string = await readFileAsBase64(file)
        store.currentProject.htmlFiles.push(newFilePath)
        await upSrcFile(newFilePath, base64Content.split('base64,')[1])
    }
}

const handleIconChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
        fileToBase64(file)
    }
}

// close icon change
const closeIconChange = () => {
    iconBase64.value = ''
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
        return null
    }
    const fileName = await basename(selectedFilePath)
    iconFileName.value = fileName
    // get file name
    const binaryData = await readFile(selectedFilePath)
    const base64Data: any = arrayBufferToBase64(binaryData)
    const base64String = 'data:image/jpg;base64,' + base64Data
    tempIconBase64.value = base64String
    // if file is not png, and size is not 512x512, then cut it
    cutVisible.value = true
}

// update icon file content
const updateIcon = async () => {
    loadingText(t('syncConfig') + 'icon...')
    if (iconBase64.value === '') {
        return
    }
    const iconContent = store.currentProject.iconRound
        ? roundIcon.value.split('base64,')[1]
        : iconBase64.value.split('base64,')[1]
    // get app-icon.png sha
    const iconSha: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        'app-icon.png',
        { ref: store.currentProject.name }
    )
    // update icon file content
    if (iconSha.status === 200) {
        const updateRes: any = await githubApi.updateIconFile(
            store.userInfo.login,
            'PakePlus',
            {
                message: 'update icon from pakeplus',
                sha: iconSha.data.sha,
                branch: store.currentProject.name,
                content: iconContent,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateRes', updateRes)
        } else {
            console.error('updateRes error', updateRes)
        }
    }
}

const backHome = () => {
    router.go(-1)
}

// click menu item
const toHistory = () => {
    stopServer()
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
    const targetDir = await join(appDataPath, 'assets')
    const savePath = await join(targetDir, `${store.currentProject.name}.js`)
    // save file
    await writeTextFile(savePath, jsFileContents.value)
    console.log(`js file saved to: ${savePath}`)
}

// save form input
const saveFormInput = async () => {
    console.log('saveFormInput', store.currentProject)
    // console.log('tauriConfig', store.currentProject.more)
    store.addUpdatePro({
        ...store.currentProject,
        name: store.currentProject.name,
        debug: pubForm.model,
        more: store.currentProject.more,
    })
    !configDialogVisible.value && tauriConfigRef.value?.updateCode()
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
            if (configDialogVisible.value) {
                const isJson = tauriConfigRef.value?.checkJson()
                if (isJson) {
                    ElMessage.success(t('saveSuccess'))
                } else {
                    ElMessage.error(t('jsonError'))
                }
            } else {
                tips && ElMessage.success(t('saveSuccess'))
            }
        } else {
            console.error('error submit!', fields)
            for (const key in fields) {
                if (fields[key].length > 0) {
                    ElMessage.error(fields[key][0].message)
                    return
                }
            }
        }
    })
}

// get initialization_script(customJs+cssfilter+jsfile)
const getInitializationScript = () => {
    // creat css filter content
    let initJsScript = store.currentProject.customJs
    if (store.currentProject.filterCss !== '') {
        const cssFilterContent = store.currentProject.filterCss
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
        initJsScript += initCssScript
    }
    // if jsFileContents is not empty, then add initJsScript
    if (jsFileContents.value) {
        initJsScript += jsFileContents.value
    }
    return initJsScript
}

const preview = async (resize: boolean) => {
    if (isTauri) {
        try {
            const res = await invoke('start_server', {
                path: store.currentProject.htmlPath,
            })
            console.log('Server started successfully', res)
        } catch (error) {
            console.error('Failed to start server:', error)
        }
        const platformName = platform()
        // get platform
        if (
            platformName === 'windows' &&
            store.currentProject.more.windows.additionalBrowserArgs
        ) {
            ElMessage.error('additionalBrowserArgs cant preview on windows')
            return
        }
        if (
            store.previewPath === '' ||
            store.previewSecond === 60 ||
            store.previewPath === store.currentProject.htmlPath
        ) {
            console.log('html preview ok')
        } else if (
            store.previewPath !== store.currentProject.htmlPath &&
            store.previewSecond !== 60
        ) {
            console.log('html preview error')
            ElMessage.error(t('htmlError'))
            return
        } else {
            console.log('unknown preview error')
            warning.value = `path: ${store.previewPath}
            second: ${store.previewSecond}
            htmlPath: ${store.currentProject.htmlPath}`
        }
        store.setPreviewPath(store.currentProject.htmlPath)
        // if platform is macos, then use tauri preview
        appFormRef.value?.validate((valid, fields) => {
            if (valid) {
                console.log('submit!', store.currentProject.more.windows)
                saveProject(false)
                // initialization_script
                const initJsScript = getInitializationScript()
                console.log('initCssScript', initJsScript)
                invoke('preview_from_config', {
                    resize,
                    config: {
                        ...store.currentProject.more.windows,
                        label: 'PreView',
                        url: store.currentProject.isHtml
                            ? 'http://127.0.0.1:3030/index.html'
                            : store.currentProject.url,
                    },
                    jsContent: initJsScript,
                    injectjq: store.currentProject.injectJq,
                })
            } else {
                console.error('error submit!', fields)
            }
        })
    } else {
        ElMessage.error(t('notSupportWeb'))
    }
}

const createRepo = async () => {
    appFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            saveProject(false)
            console.log('submit!', store.currentProject)
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
    if (store.isRelease) {
        const releaseRes: any = await githubApi.deleteRelease(
            store.userInfo.login,
            'PakePlus',
            store.releases[store.currentProject.name].id
        )
        console.log('deleteRelease', releaseRes)
    }
    // reset release
    store.setRelease(store.currentProject.name, undefined)
}

// update build.yml file content
const updateBuildYml = async () => {
    loadingText(t('syncConfig') + 'action...')
    // get build.yml file sha
    const shaRes = await getFileSha(
        '.github/workflows/build.yml',
        store.currentProject.name
    )
    console.log('get build.yml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get build.yml file content
        const content = await getBuildYmlFetch({
            name: store.currentProject.name,
            body: pubForm.desc,
        })
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
            console.log('updateBuildYml', updateRes)
            loadingText(t('syncConfig') + '...')
        } else {
            console.error('updateBuildYml error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updateCargoToml = async () => {
    loadingText(t('syncConfig') + 'Cargo...')
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/Cargo.toml',
        store.currentProject.name
    )
    console.log('get CargoToml file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const configContent: any = await getCargoTomlFetch({
            name: store.currentProject.name,
            version: store.currentProject.version,
            desc: store.currentProject.desc,
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
            console.log('updateCargoToml', updateRes)
            loadingText(t('syncConfig') + '...')
        } else {
            console.error('updateCargoToml error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updateInitRs = async () => {
    loadingText(t('syncConfig') + 'rust...')
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/src/utils/init.rs',
        store.currentProject.name
    )
    console.log('get init.rs file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const configContent: any = await getInitRustFetch({
            config: JSON.stringify(store.currentProject.more.windows),
            state: store.currentProject.state,
            injectjq: store.currentProject.injectJq,
            isHtml: store.currentProject.isHtml,
        })
        const updateRes: any = await githubApi.updateFileContent(
            store.userInfo.login,
            'PakePlus',
            'src-tauri/src/utils/init.rs',
            {
                message: 'update init rust from pakeplus',
                content: configContent,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updateInitRs', updateRes)
            loadingText(t('syncConfig') + '...')
        } else {
            console.error('updateInitRs error', updateRes)
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
            config: JSON.stringify(store.currentProject.more.windows),
        })
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
    loadingText(t('syncConfig') + 'custom...')
    // get CargoToml file sha
    const shaRes = await getFileSha(
        'src-tauri/data/custom.js',
        store.currentProject.name
    )
    console.log('get custom file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const initJsScript = getInitializationScript()
        const jsFileContent: any = await base64Encode(initJsScript)
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
            console.log('updateCustomJs', updateRes)
            loadingText(t('syncConfig') + '...')
        } else {
            console.error('updateCustomJs error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update tauri.conf.json
const updateTauriConfig = async () => {
    loadingText(t('syncConfig') + 'tauri...')
    // update tauri config json
    const configSha: any = await getFileSha(
        'src-tauri/tauri.conf.json',
        store.currentProject.name
    )
    try {
        // remove label from windows
        let { label, ...newWindows } = store.currentProject.more.windows
        const configContent: any = await getTauriConfFetch({
            name: store.currentProject.showName,
            version: store.currentProject.version,
            id: store.currentProject.appid,
            ascii: isAlphanumeric(store.currentProject.showName),
            windowConfig: JSON.stringify(newWindows),
            tauriApi: store.currentProject.tauriApi,
            isHtml: store.currentProject.isHtml,
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
            console.log('updateTauriConfig', updateRes)
            loadingText(t('syncConfig') + '...')
        } else {
            console.error('updateTauriConfig error', updateRes)
        }
    } catch (error) {
        console.error('Error reading JSON file:', error)
    }
}

// new publish version
const publishWeb = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
    loadingText(t('preCheck') + '...')
    try {
        // delete release
        store.isRelease && (await deleteRelease())
        // publish web or dist
        console.log('publish web')
        loadingText(t('syncConfig') + '...')
        isTauri && (await tauriHtmlUpload())
        // update app icon
        await updateIcon()
        // update build.yml
        await updateBuildYml()
        // update Cargo.toml
        await updateCargoToml()
        // update tauri.conf.json
        await updateTauriConfig()
        // update custom.js
        await updateCustomJs()
        // update init.rs
        await updateInitRs()
        // dispatch action
        dispatchAction()
    } catch (error: any) {
        warning.value = error.message
        buildTime = 0
        loadingText(t('failure'))
        buildLoading.value = false
        createIssue(
            `publish action error: ${error.message}`,
            'failure',
            'build error'
        )
    }
}

// del pre publish version
const onPublish = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
    // delete release
    store.isRelease && deleteRelease()
    // update build yml
    await updateBuildYml()
    // update Cargo.toml
    await updateCargoToml()
    // update main rust
    // await updateMainRs()
    await libRsConfig()
    // update custom js
    await updateCustomJs()
}

const getFileSha = async (filePath: string, branch: string) => {
    const res: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        filePath,
        { ref: branch }
    )
    return res
}

// dispatch workflow action
const dispatchAction = async () => {
    loadingText(t('preCompile') + 'workflow...')
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
    if (dispatchRes.status !== 204) {
        console.error('dispatch res error', dispatchRes)
        ElMessage.error(t('dispatchError') + ':' + dispatchRes.data.message)
        buildLoading.value = false
        return
    } else {
        buildSecondTimer = setInterval(() => {
            buildTime += 1
            const minute = Math.floor(buildTime / 60)
            const second = buildTime % 60
            const buildRate = Math.floor((buildTime / (60 * 15)) * 100)
            // loadingText.value = `${buildStatus}...${minute}分${second}秒`
            const loadingState = `<div>${minute}${t('minute')}${second}${t(
                'second'
            )}</div><div>${buildStatus}${
                buildRate > 99 ? 99 : buildRate
            }%...</div>`
            // console.log('loadingText---', loadingText)
            loadingText(loadingState)
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
    console.log('createIssue', url, label, title)
    const issueRes: any = await githubApi.createIssue({
        body: `build name: ${store.currentProject.name}\r
        show name: ${store.currentProject.showName}\r
        build state: ${label}\r
        build action: ${url}`,
        title: title,
    })
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
        loadingText(t('failure'))
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
    const build_runs = checkRes.data.workflow_runs[0]
    const { id, status, conclusion, html_url } = build_runs
    buildStatus = t(status) || t('inProgress')
    if (checkRes.status === 200 && checkRes.data.total_count > 0) {
        if (status === 'completed' && conclusion === 'success') {
            createIssue(html_url, 'success', 'build success')
            loadingText(t('buildSuccess'))
            // clear timer
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            buildLoading.value = false
            buildTime = 0
            router.push('/history')
        } else if (status === 'completed' && conclusion === 'cancelled') {
            createIssue(html_url, 'cancelled', 'build cancelled')
            loadingText(t('cancelled'))
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
        } else if (status === 'in_progress') {
            console.log('build in progress...')
        }
    } else {
        if (rerunCount >= 2) {
            buildTime = 0
            buildLoading.value = false
            openUrl(html_url)
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            loadingText(t('failure'))
        } else {
            reRunFailsJobs(id, html_url)
        }
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
    jsSelOptions.value = store.currentProject.jsFile?.map((item: any) => {
        return {
            label: item,
            value: item,
        }
    })
}

const handleKeydown = (event: KeyboardEvent) => {
    // Check if Command (Meta) + S is pressed
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        saveProject()
    }
}

onUnmounted(() => {
    stopServer()
    window.removeEventListener('keydown', handleKeydown)
    // clear interval
    buildSecondTimer && clearInterval(buildSecondTimer)
    checkDispatchTimer && clearInterval(checkDispatchTimer)
})

onMounted(async () => {
    window.addEventListener('keydown', handleKeydown)
    // 重制编译时间
    buildTime = 0
    if (store.currentProject.icon) {
        confirmIcon(store.currentProject.icon)
    }
    if (isTauri) {
        // initJsFileContents()
        const window = getCurrentWindow()
        window.setTitle(`${store.currentProject.name}`)
    }
    store.setCurrentRelease()
})
</script>

<style lang="scss" scoped>
.editBox {
    width: 100%;
    height: 100%;
    padding: 10px 20px;

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

    .homeHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        position: relative;

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
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard syntax */
            z-index: 1000;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .warning {
                color: red;
                margin-right: 20px;
                cursor: pointer;
            }

            .dropdownLink {
                color: gray;
                cursor: pointer;

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

    .mainEdit {
        padding: 10px 10px;

        .configForm {
            margin-top: 10px;

            .inLine {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .formItem {
                    flex: 1;
                    margin-right: 10px;

                    .initIcon {
                        width: 22px;
                        height: 22px;
                        cursor: pointer;
                    }

                    .distUpload {
                        cursor: pointer;

                        &:hover {
                            color: var(--text-color);
                        }
                    }

                    .editIcon {
                        cursor: pointer;
                        font-size: 20px;
                        color: gray;

                        &:hover {
                            color: var(--text-color);
                        }
                    }

                    .iconChange {
                        width: 22px;
                        height: 22px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;

                        .closeIcon {
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            cursor: pointer;
                        }
                    }

                    .iconPreview {
                        width: 21px;
                        height: 21px;
                        color: gray;
                        border: 1px dashed gray;
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;

                        &:hover {
                            color: var(--text-color);
                            border-color: var(--text-color);
                        }
                    }
                }
            }

            .checkBox {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .formItem {
                    flex: unset;
                    margin-right: 5px;
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
        margin: 10px 0;
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
