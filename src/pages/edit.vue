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
                    <span>
                        {{ t('exeProject') }}
                    </span>
                </div>
                <div class="toolTips">
                    <span>
                        {{ t('configProjectTips') }}
                    </span>
                    <el-icon
                        class="document"
                        @click="openUrl(urlMap.configdoc)"
                    >
                        <Document />
                    </el-icon>
                </div>
            </div>
            <!-- tools -->
            <div class="setting">
                <!-- warning -->
                <el-icon
                    v-if="warning"
                    @click="showWarning"
                    :size="22"
                    class="warning"
                >
                    <Warning />
                </el-icon>
                <!-- publish -->
                <el-icon
                    v-if="store.isRelease"
                    @click="toHistory"
                    :size="25"
                    class="publish"
                >
                    <Paperclip />
                </el-icon>
                <!-- phone -->
                <el-icon @click="toPhone" :size="22" class="phone">
                    <Cellphone />
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
                            <el-dropdown-item @click="showSuperpower">
                                {{ t('superpower') }}
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
                        :label="t('exeName')"
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
                        :label="t('exeId')"
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
                        :label="t('exeVersion')"
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
                        :label="t('exeIcon')"
                        prop="icon"
                        class="formItem"
                        :style="isTauri ? 'width: unset' : 'width: 13.5%'"
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
                            <!-- delete icon -->
                            <el-icon class="closeIcon" @click="deleteIcon">
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
                            v-model="store.currentProject.desktop.state"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('single')"
                        prop="single"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.desktop.single"
                            label=""
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('devbug')"
                        prop="tauriApi"
                        class="formItem"
                    >
                        <el-checkbox
                            v-model="store.currentProject.devbug"
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
                <el-form-item :label="t('platform')" prop="preview">
                    <el-radio-group
                        v-model="store.currentProject.preview"
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
                <el-form-item :label="t('filterElements')" prop="filterCss">
                    <el-input
                        v-model="store.currentProject.filterCss"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :rows="3"
                        :placeholder="t('inputXpathSelectors')"
                    />
                </el-form-item>
                <el-form-item :label="t('exeDes')" prop="desc">
                    <el-input
                        v-model="store.currentProject.desktop.desc"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :disabled="!isDev"
                        :rows="3"
                        :placeholder="t('desTips')"
                        @input="validateNoNewlines"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="footerBox">
            <el-button @click="saveProject(true)">{{ t('save') }}</el-button>
            <el-button @click="preview(false)">
                {{ t('preview') }}
            </el-button>
            <el-button @click="createRepo">
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
                <!-- debug -->
                <el-form-item :label="t('buildMethod')">
                    <el-select
                        v-model="store.currentProject.desktop.buildMethod"
                        :placeholder="t('selectBuildMethod')"
                        @change="methodChange"
                    >
                        <el-option
                            v-for="item in methodOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="store.currentProject.desktop.buildMethod === 'local'"
                    :label="t('savePath')"
                >
                    <el-input
                        v-model.trim="savePath"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="t('savePathTips')"
                        @click="savePathHandle('open')"
                    >
                        <template #append>
                            <el-tooltip
                                class="box-item"
                                placement="bottom"
                                :content="t('savePath')"
                            >
                                <el-button
                                    class="distUpload"
                                    :icon="FolderOpened"
                                    @click="savePathHandle('select')"
                                />
                            </el-tooltip>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- platform select -->
                <el-form-item :label="t('pubPlatform')">
                    <el-tree-select
                        v-model="store.currentProject.platform"
                        :data="platData"
                        :disabled="
                            store.currentProject.desktop.buildMethod === 'local'
                        "
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                        :max-collapse-tags="3"
                        :render-after-expand="false"
                        show-checkbox
                        :placeholder="t('pubPlatformTips')"
                    />
                </el-form-item>
                <!-- debug -->
                <el-form-item :label="t('pubMode')">
                    <el-radio-group
                        v-model="store.currentProject.desktop.debug"
                    >
                        <el-radio :value="false">
                            {{ t('closeDebug') }}
                        </el-radio>
                        <el-radio :value="true">{{ t('openDebug') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-scrollbar>
                    <el-form-item :label="t('releaseNotes')">
                        <el-input
                            v-model="store.currentProject.desktop.pubBody"
                            type="textarea"
                            :disabled="!isDev"
                            autocomplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            :placeholder="t('inputRelNotes')"
                        />
                    </el-form-item>
                </el-scrollbar>
            </el-form>
            <span class="pubNotesTips">
                <span>{{ t('pubNotesTips') }}</span>
                <el-icon @click="openUrl(urlMap.builddoc)" class="readIcon">
                    <ReadingLamp />
                </el-icon>
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">
                        {{ t('cancel') }}
                    </el-button>
                    <el-button type="primary" @click="publishCheck">
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
            <CodeEdit
                ref="codeEditRef"
                lang="javascript"
                height="400px"
                :code="store.currentProject.customJs"
            />
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
import { useRoute, useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/core'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import githubApi from '@/apis/github'
import { ElMessageBox } from 'element-plus'
import { usePPStore } from '@/store'
import {
    readFile,
    writeTextFile,
    exists,
    remove,
    writeFile,
    mkdir,
    copyFile,
} from '@tauri-apps/plugin-fs'
import {
    appCacheDir,
    appDataDir,
    downloadDir,
    join,
} from '@tauri-apps/api/path'
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
    Paperclip,
    Document,
    Cellphone,
    FolderOpened,
    ReadingLamp,
} from '@element-plus/icons-vue'
import CutterImg from '@/components/CutterImg.vue'
import CodeEdit from '@/components/CodeEdit.vue'
import { useI18n } from 'vue-i18n'
import {
    CSSFILTER,
    openUrl,
    isTauri,
    platforms,
    arrayBufferToBase64,
    cropImageToRound,
    base64Encode,
    loadingText,
    includeHtm,
    readFileAsBase64,
    getFilesName,
    rootPath,
    openSelect,
    readDirRecursively,
    replaceFileRoot,
    urlMap,
    fileSizeLimit,
    oneMessage,
    createIssue,
    checkLastPublish,
    fileLimitNumber,
    isDev,
    readStaticFile,
    base64PngToIco,
    isAlphanumeric,
} from '@/utils/common'
import { arch, platform } from '@tauri-apps/plugin-os'
import { getCurrentWindow } from '@tauri-apps/api/window'
import TauriConfig from '@/components/TauriConfig.vue'
import ImgPreview from '@/components/ImgPreview.vue'
import { listen } from '@tauri-apps/api/event'

const route = useRoute()
const router = useRouter()
const store = usePPStore()
const { t } = useI18n()
const tempIconBase64 = ref('')
const iconBase64 = ref('')
const roundIcon = ref('')
const cutVisible = ref(false)
const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()

const iconFileName = ref('')
const file = ref<any>(null)

const distInput = ref<any>(null)
const jsFileContents = ref('')
const jsSelOptions: any = ref<any>([])
const configDialogVisible = ref(false)
const codeDialogVisible = ref(false)
const imgPreviewVisible = ref(false)
const warning = ref('')
const platformName = isTauri ? platform() : 'web'
const archName = isTauri ? arch() : 'web'

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
                const uriRegex = /^(https?|ftp|file):\/\/[^\s/$.?#].[^\s]*$/i
                if (uriRegex.test(value) || value.includes('index.htm')) {
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
    preview: [
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
    oneMessage.error(warning.value)
}

// is json config
const isJson = ref(false)
const tauriConfigRef = ref<any>(null)

// build method
const methodOptions = [
    {
        value: 'local',
        label: t('localBuild'),
        disabled: !isTauri,
    },
    {
        value: 'cloud',
        label: t('cloudBuild'),
    },
    {
        value: 'localFast',
        label: t('localFastBuild'),
        disabled: true,
    },
    {
        value: 'cloudFast',
        label: t('cloudFastBuild'),
        disabled: true,
    },
]

// platform map
const platformMap: any = {
    macosaarch64: ['2-2'],
    macosx86_64: ['2-1'],
    windowsaarch64: ['1-2'],
    windowsx86_64: ['1-1'],
    linuxaarch64: ['3-3'],
    linuxx86_64: ['3-1', '3-2'],
}

// method change
const methodChange = (value: string) => {
    if (value === 'local') {
        // 判断本机型号，然后给store.currentProject.platform复制
        store.currentProject.platform = platformMap[platformName + archName]
    } else {
        store.currentProject.platform = ['1-1', '1-2', '2-1', '2-2']
    }
}

// save path
const savePath = ref('')
const savePathHandle = async (handle: string) => {
    if (handle) {
        if (savePath.value && handle === 'open') {
            openUrl(savePath.value)
        } else {
            const selected: any = await openSelect(true, [])
            console.log('selected', selected)
            if (selected) {
                savePath.value = selected
            }
        }
    } else {
        // check path
        const isExists = await exists(savePath.value)
        if (!isExists) {
            oneMessage.error(t('pathNotExist'))
            return
        }
    }
}

// build platform
const platData = [
    {
        value: '1',
        label: 'Windows',
        children: [
            {
                value: '1-1',
                label: 'X64',
            },
            {
                value: '1-2',
                label: 'Arm64',
            },
        ],
    },
    {
        value: '2',
        label: 'macOS',
        children: [
            {
                value: '2-1',
                label: 'Intel X64',
            },
            {
                value: '2-2',
                label: 'Apple Silicon',
            },
        ],
    },
    {
        value: '3',
        label: 'Linux',
        children: [
            {
                value: '3-1',
                label: 'X64',
            },
            {
                value: '3-2',
                label: 'Amd64',
            },
            {
                value: '3-3',
                label: 'Arm64',
                disabled: true,
            },
        ],
    },
    // {
    //     value: '4',
    //     label: 'Android',
    //     disabled: true,
    // },
    // {
    //     value: '5',
    //     label: 'iOS',
    //     disabled: true,
    // },
    {
        value: '6',
        label: 'WebPage',
        disabled: true,
        children: [
            {
                value: '6-1',
                label: 'GitHub Pages',
                disabled: true,
            },
            {
                value: '6-2',
                label: 'Netlify Pages',
                disabled: true,
            },
            {
                value: '6-3',
                label: 'Cloudflare Pages',
                disabled: true,
            },
        ],
    },
]

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

// show superpower
const showSuperpower = () => {
    router.push('/tauriapi')
}

// close tauri config dialog
const closeConfigDialog = (done: any = () => {}) => {
    const isJson = tauriConfigRef.value?.checkJson()
    if (isJson) {
        configDialogVisible.value = false
        done()
    } else {
        oneMessage.error(t('jsonError'))
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
const confirmIcon = async (base64Data: string) => {
    cutVisible.value = false
    iconBase64.value = base64Data
    store.currentProject.icon = base64Data
    // if local build, then set padding 50
    roundIcon.value = await cropImageToRound(base64Data)
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
    store.currentProject.isHtml = true
    const selected = await openSelect(true, [])
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
            oneMessage.error(t('indexHtmError'))
        }
    }
}

// tauri html file upload
const tauriHtmlUpload = async () => {
    loadingText(t('syncFileStart') + '...')
    if (store.currentProject.isHtml && store.currentProject.htmlPath) {
        const files = await readDirRecursively(store.currentProject.htmlPath)
        loadingText(t('syncFileStart') + '...')
        let total = files.length
        let count = 0
        console.log('total--', total, fileLimitNumber)
        if (total >= fileLimitNumber) {
            oneMessage.error(t('fileLimitNumber', { number: fileLimitNumber }))
            return
        }
        // 读取文件内容，并替换rootPath
        for (const file of files) {
            count++
            const isExists = await exists(file)
            if (isExists) {
                const fileContent = await readFile(file)
                // limit file size
                const fileSize = fileContent.byteLength
                if (fileSize > fileSizeLimit) {
                    oneMessage.error(t('limitSize'))
                    buildLoading.value = false
                    warning.value = t('limitSize')
                    return 'stop'
                }
                const base64Content = arrayBufferToBase64(fileContent)
                const gitPath = await replaceFileRoot(
                    file,
                    store.currentProject.htmlPath
                )
                const loadingState = `<div>${count}/${total}</div>
                <div>${t('syncFilePro')}${gitPath.replace('src/', '')}</div>
                <div>${t('syncTileTips')}</div>`
                loadingText(loadingState)
                await upSrcFile(gitPath, base64Content)
            } else {
                console.log('file not exists', file)
            }
        }
    }
}

// active dist input
const activeDistInput = async () => {
    console.log('activeDistInput', isTauri)
    if (isTauri) {
        try {
            const res = await invoke('stop_server')
            console.log('activeDistInput stopServer', res)
        } catch (error) {
            console.error('activeDistInput Failed to stop server:', error)
        }
        loadHtml()
    } else {
        if (!store.token) {
            oneMessage.error(t('configToken'))
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
            const cacheDir = await appCacheDir()
            const cacheExist = await exists(cacheDir)
            cacheExist && (await remove(cacheDir, { recursive: true }))
        } catch (error) {
            console.error('Failed to remove cache:', error)
        }
        try {
            const res = await invoke('stop_server')
            console.log('stop server', res)
        } catch (error) {
            console.error('Failed to stop server:', error)
        }
    }
}
// close preview window and stop server
isTauri && listen('stop_server', stopServer)

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
        // limit file size
        for (const file of files) {
            const fileSize = file.size
            if (fileSize > fileSizeLimit) {
                oneMessage.error(t('limitSize'))
                buildLoading.value = false
                return
            }
        }
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
                oneMessage.success(t('syncFileSuccess'))
            } catch (error: any) {
                console.error('uploadFiles error', error)
                warning.value = error.message
                buildLoading.value = false
                loadingText(t('syncFileError'))
                oneMessage.error(t('syncFileError'))
            }
            store.addUpdatePro(store.currentProject)
        } else {
            oneMessage.error(t('indexHtmError'))
            buildLoading.value = false
        }
    }
}

// check if file exists in repo and get sha, if not, create it
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
    // update file
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
    if (total >= fileLimitNumber) {
        oneMessage.error(t('fileLimitNumber', { number: fileLimitNumber }))
        return
    }
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
    // limit file size
    if (file) {
        const fileSize = file.size
        if (fileSize > fileSizeLimit) {
            oneMessage.error(t('limitSize'))
            return
        }
        fileToBase64(file)
    }
}

// delete icon
const deleteIcon = () => {
    iconBase64.value = ''
    store.currentProject.icon = ''
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
    // get file size
    const fileSize = binaryData.byteLength
    console.log('fileSize', fileSize)
    // limit file size
    if (fileSize > 1024 * 1024 * 10) {
        oneMessage.error(t('limitSize'))
        return
    }
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
    await store.updateIcon('PakePlus', iconContent)
}

const backHome = () => {
    router.push('/')
}

// click menu item
const toHistory = () => {
    stopServer()
    router.push('/history')
}

// to phone
const toPhone = () => {
    router.push('/phone')
}

// delete current project
const deleteProject = () => {
    ElMessageBox.confirm(t('confirmDelProject'), t('tips'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning',
        center: true,
        autofocus: false,
    })
        .then(() => {
            console.log('delete project')
            store.delProject(store.currentProject.name)
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
        more: store.currentProject.more,
    })
    !configDialogVisible.value && tauriConfigRef.value?.updateCode()
    // save js file content to appDataDir
    if (jsFileContents.value) {
        saveJsFile()
    }
}

// validate no newlines
const validateNoNewlines = () => {
    const desc = store.currentProject.desktop.desc
    if (desc && (desc.includes('\n') || desc.includes('\r'))) {
        oneMessage.error(t('descNoNewlines'))
        store.currentProject.desktop.desc = desc.replace(/[\n\r]/g, '')
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
                    oneMessage.success(t('saveSuccess'))
                } else {
                    oneMessage.error(t('jsonError'))
                }
            } else {
                tips && oneMessage.success(t('saveSuccess'))
            }
        } else {
            console.error('error submit!', fields)
            for (const key in fields) {
                if (fields[key].length > 0) {
                    oneMessage.error(fields[key][0].message)
                    return
                }
            }
        }
    })
}

// get initialization_script(customJs+cssfilter+jsfile)
const getInitializationScript = async (isdebug: boolean = false) => {
    let initJsScript = ''
    // read static file
    if (isdebug) {
        const vconsoleJs = await readStaticFile('vconsole.min.js')
        initJsScript += vconsoleJs + '\n'
    }
    // creat css filter content
    initJsScript += store.currentProject.customJs
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
        let serverPort = 3030
        try {
            if (store.currentProject.isHtml && store.currentProject.htmlPath) {
                serverPort = await invoke('start_server', {
                    path: store.currentProject.htmlPath,
                })
                console.log('Server started successfully', serverPort)
            }
        } catch (error) {
            console.error('Failed to start server:', error)
        }
        // get platform
        if (
            platformName === 'windows' &&
            store.currentProject.more.windows.additionalBrowserArgs
        ) {
            oneMessage.error('additionalBrowserArgs cant preview on windows')
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
            oneMessage.error(t('htmlError'))
            return
        } else {
            console.log('unknown preview error')
            warning.value = `path: ${store.previewPath}
            second: ${store.previewSecond}
            htmlPath: ${store.currentProject.htmlPath}`
        }
        store.setPreviewPath(store.currentProject.htmlPath)
        // if platform is macos, then use tauri preview
        appFormRef.value?.validate(async (valid, fields) => {
            if (valid) {
                console.log('submit!', store.currentProject.more.windows)
                saveProject(false)
                // initialization_script
                const initJsScript = await getInitializationScript()
                console.log('initCssScript', initJsScript)
                invoke('preview_from_config', {
                    resize,
                    config: {
                        ...store.currentProject.more.windows,
                        label: 'PreView',
                        url: store.currentProject.isHtml
                            ? `http://127.0.0.1:${serverPort}/index.html`
                            : store.currentProject.url,
                    },
                    jsContent: initJsScript,
                    devbug: store.currentProject.devbug,
                })
            } else {
                console.error('error submit!', fields)
            }
        })
    } else {
        oneMessage.error(t('notSupportWeb'))
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
const buildRate = ref(0)
let checkDispatchTimer: any = null

// update build.yml file content
const updatePPconfig = async () => {
    loadingText(t('syncConfig') + 'ppconfig...')
    // get CargoToml file sha
    const shaRes: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        'scripts/ppconfig.json',
        {
            ref: store.currentProject.name,
        }
    )
    console.log('get ppconfig file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const configContent: any = base64Encode(JSON.stringify(store.ppConfig))
        // update config file
        const updateRes: any = await githubApi.updateFileContent(
            store.userInfo.login,
            'PakePlus',
            'scripts/ppconfig.json',
            {
                message: 'update ppconfig from pakeplus',
                content: configContent,
                sha: shaRes.data.sha,
                branch: store.currentProject.name,
            }
        )
        if (updateRes.status === 200) {
            console.log('updatePPconfig', updateRes)
            loadingText(t('syncConfig') + '...')
        } else {
            console.error('updatePPconfig error', updateRes)
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

// update build.yml file content
const updateCustomJs = async () => {
    loadingText(t('syncConfig') + 'custom...')
    // get CargoToml file sha
    const shaRes: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        'src-tauri/data/custom.js',
        {
            ref: store.currentProject.name,
        }
    )
    console.log('get custom file sha', shaRes)
    if (shaRes.status === 200 || shaRes.status === 404) {
        // get CargoToml file content
        const initJsScript = await getInitializationScript()
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
        }
    } else {
        console.error('getFileSha error', shaRes)
    }
}

isTauri &&
    listen('local-progress', (event: any) => {
        buildRate.value = parseInt(event.payload)
    })

// local publish
const easyLocal = async () => {
    const targetDir = savePath.value || (await downloadDir())
    loadingText(t('syncConfig') + '...')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    buildSecondTimer = setInterval(() => {
        buildTime += 1
        const minute = Math.floor(buildTime / 60)
        const second = buildTime % 60
        buildRate.value = Math.floor(buildRate.value + buildTime / 10)
        // loadingText.value = `${buildStatus}...${minute}分${second}秒`
        const loadingState = `<div>${minute}${t('minute')}${second}${t(
            'second'
        )}</div><div>${buildStatus}${
            buildRate.value > 99 ? 99 : buildRate.value
        }%</div>`
        // console.log('loadingText---', loadingText)
        loadingText(loadingState)
    }, 1000)
    // exe name
    let targetName = isAlphanumeric(store.currentProject.showName)
        ? store.currentProject.showName
        : store.currentProject.name
    const appDataDirPath = await appDataDir()
    const targetExe = await join(appDataDirPath, `${targetName}.exe`)
    if (platformName === 'windows') {
        if (await exists(appDataDirPath)) {
            console.log('appDataDirPath exists')
        } else {
            await mkdir(appDataDirPath, { recursive: true })
        }
        // save rhscript.txt
        const rhscript = await readStaticFile('rhscript.txt')
        // replace ppexe path
        const ppexePath: string = await invoke('get_exe_dir', { parent: false })
        // log path
        const logPath: string = await join(appDataDirPath, 'rh.log')
        let rhtarget: string = rhscript
            .replace('PakePlus.exe', ppexePath)
            .replace('Target.exe', targetExe)
            .replace('rh.log', logPath)
        // ico save to local
        if (iconBase64.value) {
            const base64String = store.currentProject.iconRound
                ? roundIcon.value
                : iconBase64.value
            const icoBlob = await base64PngToIco(base64String)
            const icoPath = await join(appDataDirPath, 'app.ico')
            await writeFile(icoPath, icoBlob)
            rhtarget = rhtarget.replace('app.ico', icoPath)
        } else {
            rhtarget = rhtarget.split('[COMMANDS]')[0]
        }
        const rhscriptPath = await join(appDataDirPath, 'rhscript.txt')
        await writeTextFile(rhscriptPath, rhtarget)
    } else {
        targetName = store.currentProject.showName
    }
    // build local
    console.log('store.currentProject.more.windows', store.currentProject.name)
    // store.currentProject.isHtml && store.currentProject.htmlPath
    invoke('build_local', {
        targetDir: targetDir,
        projectName: store.currentProject.name,
        exeName: targetName,
        config: store.currentProject.more.windows,
        base64Png: iconBase64.value
            ? platformName === 'windows'
                ? store.currentProject.iconRound
                    ? roundIcon.value
                    : iconBase64.value
                : store.currentProject.iconRound
                ? await cropImageToRound(roundIcon.value, 50)
                : iconBase64.value
            : '',
        debug: store.currentProject.desktop.debug,
        customJs: await getInitializationScript(true),
        htmlPath: store.currentProject.htmlPath,
    })
        .then(async (res) => {
            loadingText(t('buildSuccess'))
            // isAlphanumeric(store.currentProject.showName)
            if (platformName === 'windows') {
                const chinaExeName = await join(
                    targetDir,
                    targetName,
                    `${store.currentProject.showName}.exe`
                )
                await copyFile(targetExe, chinaExeName)
                await remove(targetExe)
            }
            oneMessage.success(t('localSuccess'))
            buildLoading.value = false
        })
        .catch((error) => {
            console.error('build_local2 error', error)
            oneMessage.error(error)
            warning.value = t('localError') + ': ' + error
        })
        .finally(() => {
            buildSecondTimer && clearInterval(buildSecondTimer)
        })
}

// new publish version
const publishWeb = async () => {
    try {
        // delete release
        store.isRelease && (await store.deleteRelease())
        // publish web or dist
        loadingText(t('syncConfig') + '...')
        if (isTauri && store.currentProject.isHtml) {
            const res = await tauriHtmlUpload()
            if (res === 'stop') {
                return
            }
        }
        // update app icon
        await updateIcon()
        // update custom.js
        await updateCustomJs()
        // update build.yml
        await updatePPconfig()
        // dispatch action
        dispatchAction()
    } catch (error: any) {
        warning.value = error.message
        buildTime = 0
        loadingText(t('failure'))
        buildLoading.value = false
        // const now = new Date()
        // const futureTime = new Date(now.getTime() + 50 * 60 * 1000)
        // localStorage.setItem('lastClickTime', futureTime.toISOString())
        createIssue(
            store.currentProject.name,
            store.currentProject.showName,
            store.currentProject.isHtml,
            'PakePlus publish action error ' + error.message,
            'failure',
            'build error',
            'PakePlus'
        )
        ElMessageBox.confirm(t('publishErrorTips'), t('publishError'), {
            confirmButtonText: t('confirm'),
            type: 'warning',
            center: true,
            showCancelButton: false,
        }).finally(() => {
            openUrl(urlMap.questiondoc)
        })
    }
}

// publish check
const publishCheck = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
    buildRate.value = 0
    buildTime = 0
    loadingText(t('preCheck') + '...')
    await new Promise((resolve) => setTimeout(resolve, 3000))
    if (store.currentProject.desktop.buildMethod === 'local') {
        try {
            await easyLocal()
        } catch (error: any) {
            console.error('easyLocal error', error)
            warning.value = error.message
            buildLoading.value = false
            buildSecondTimer && clearInterval(buildSecondTimer)
            buildTime = 0
            buildRate.value = 0
            return
        }
    } else if (store.token === '') {
        oneMessage.error(t('configToken'))
        buildLoading.value = false
        return
    } else {
        if (checkLastPublish()) {
            oneMessage.error(t('limitProject'))
            return
        } else if (store.currentProject.platform.length > 0) {
            publishWeb()
        } else {
            oneMessage.error(t('selectPlatform'))
            buildLoading.value = false
            centerDialogVisible.value = true
        }
    }
}

// dispatch workflow action
const dispatchAction = async () => {
    loadingText(t('preCompile') + 'workflow...')
    // wait file sync
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2"]
    console.log('store.currentProject.platform', store.isBuild)
    const dispatchRes: any = await githubApi.dispatchWorkflow(
        store.userInfo.login,
        'PakePlus',
        {
            ref: store.currentProject.name,
            inputs: store.isBuild,
        }
    )
    if (dispatchRes.status !== 204) {
        console.error('dispatch res error', dispatchRes)
        const message = dispatchRes.data
            ? dispatchRes.data.message
            : dispatchRes.status
        warning.value = t('dispatchError') + ': ' + message
        // oneMessage.error(warning.value)
        createIssue(
            store.currentProject.name,
            store.currentProject.showName,
            store.currentProject.isHtml,
            'PakePlus dispatch error ' + message,
            'failure',
            'build error',
            'PakePlus'
        )
        buildLoading.value = false
        throw new Error(t('dispatchError') + ': ' + message)
    } else {
        buildSecondTimer = setInterval(() => {
            buildTime += 1
            const minute = Math.floor(buildTime / 60)
            const second = buildTime % 60
            const buildRate = Math.floor((buildTime / (60 * 10)) * 100)
            // loadingText.value = `${buildStatus}...${minute}分${second}秒`
            const loadingState = `<div>${minute}${t('minute')}${second}${t(
                'second'
            )}</div><div>${buildStatus}${
                buildRate > 99 ? 99 : buildRate
            }%</div>`
            // console.log('loadingText---', loadingText)
            loadingText(loadingState)
        }, 1000)
        // check build status
        setTimeout(async () => {
            checkDispatchTimer = setInterval(async () => {
                checkBuildStatus()
            }, 1000 * 10)
        }, 1000 * 60 * 3)
    }
}

// rerun fails jobs
let rerunCount = 0
const reRunFailsJobs = async (id: number, html_url: string) => {
    rerunCount += 1
    if (rerunCount >= 3) {
        console.log('rerun cancel', rerunCount)
        buildLoading.value = false
        buildTime = 0
        warning.value = 'rerun cancel and rerun count > 3'
        createIssue(
            store.currentProject.name,
            store.currentProject.showName,
            store.currentProject.isHtml,
            html_url,
            'failure',
            'build error',
            'PakePlus'
        )
        await new Promise((resolve) => setTimeout(resolve, 3000))
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
        // 201 is success 403 is running
        if (rerunRes.status === 201 || rerunRes.status === 403) {
            console.log('rerun success')
            if (rerunRes.status === 403) {
                rerunCount -= 1
            }
        } else {
            reRunFailsJobs(id, html_url)
        }
        await new Promise((resolve) => setTimeout(resolve, 3000))
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
    console.log('checkBuildStatus', build_runs)
    if (checkRes.status === 200 && checkRes.data.total_count > 0) {
        if (status === 'completed' && conclusion === 'success') {
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                html_url,
                'success',
                'build success',
                'PakePlus'
            )
            const now = new Date()
            localStorage.setItem('lastClickTime', now.toISOString())
            await new Promise((resolve) => setTimeout(resolve, 3000))
            store.setCurrentRelease()
            loadingText(t('buildSuccess'))
            // clear timer
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            buildLoading.value = false
            buildTime = 0
            router.push('/history')
        } else if (status === 'completed' && conclusion === 'cancelled') {
            createIssue(
                store.currentProject.name,
                store.currentProject.showName,
                store.currentProject.isHtml,
                html_url,
                'cancelled',
                'build cancelled',
                'PakePlus'
            )
            await new Promise((resolve) => setTimeout(resolve, 3000))
            loadingText(t('cancelled'))
            buildLoading.value = false
            buildTime = 0
            // clear interval
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
        } else if (status === 'failure' || conclusion === 'failure') {
            reRunFailsJobs(id, html_url)
            await new Promise((resolve) => setTimeout(resolve, 3000))
        } else if (status === 'completed' && conclusion === 'failure') {
            reRunFailsJobs(id, html_url)
            await new Promise((resolve) => setTimeout(resolve, 3000))
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
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }
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
    buildTime = 0
    rerunCount = 0
    if (store.currentProject.icon) {
        confirmIcon(store.currentProject.icon)
    }
    if (isTauri) {
        // initJsFileContents()
        const window = getCurrentWindow()
        window.setTitle(`${store.currentProject.name}`)
        methodChange(store.currentProject.desktop.buildMethod)
    } else {
        store.currentProject.desktop.buildMethod = 'cloud'
        methodChange('cloud')
    }
    console.log('route.query', route.query)
    const delrelease = route.query.delrelease
    if (delrelease) {
        store.setRelease(store.currentProject.name, { id: 0 })
    } else {
        store.setCurrentRelease()
    }
})
</script>

<style lang="scss" scoped>
.editBox {
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

            .document {
                width: 20px;
                height: 20px;
                font-size: 18px;
                margin-left: 10px;
                cursor: pointer;
                &:hover {
                    color: var(--text-color);
                }
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

            .publish {
                color: var(--el-color-primary);
                margin-right: 20px;
                cursor: pointer;
            }

            .phone {
                color: gray;
                margin-right: 20px;
                cursor: pointer;

                &:hover {
                    color: var(--text-color);
                }
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

                            &:hover {
                                color: #f56c6c;
                            }
                        }
                    }

                    .iconPreview {
                        width: 22px;
                        height: 22px;
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
    // margin-right: 4px;
}

.pubNotesTips {
    color: #aaa;

    .readIcon {
        cursor: pointer;
        margin-left: 2px;
        vertical-align: middle;
        margin-bottom: 2px;
        &:hover {
            color: var(--text-color);
        }
    }
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
