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
                <el-form-item :label="t('webUrl')" prop="url">
                    <el-input
                        v-model="appForm.url"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="`${t(
                            'example'
                        )}：https://www.pakeplus.com'`"
                    />
                </el-form-item>
                <el-form-item :label="t('appName')" prop="showName">
                    <el-input
                        v-model="appForm.showName"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="`${t('example')}：PakePlus`"
                    />
                </el-form-item>
                <el-form-item :label="t('appId')" prop="appid">
                    <el-input
                        v-model="appForm.appid"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="`${t('example')}：com.pakeplus.app`"
                    />
                </el-form-item>
                <el-form-item :label="t('appIcon')" prop="icon">
                    <el-input
                        :value="appForm.icon.split('assets%2F')[1]"
                        readonly
                        @click="uploadIcon"
                        :placeholder="`${t('onlyPng')}`"
                    />
                </el-form-item>
                <el-form-item :label="t('appVersion')" prop="version">
                    <el-input
                        v-model="appForm.version"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :placeholder="`${t('example')}：1.0.0`"
                    />
                </el-form-item>
                <el-form-item :label="t('platform')" prop="platform">
                    <el-radio-group v-model="appForm.platform">
                        <el-radio value="desktop">{{ t('desktop') }}</el-radio>
                        <!-- <el-radio value="phone">移动端</el-radio> -->
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
            <el-button @click="preview">{{ t('preview') }}</el-button>
            <el-button @click="createRepo">{{ t('publish') }}</el-button>
        </div>
        <!-- build -->
        <el-dialog v-model="centerDialogVisible" width="500" center>
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
                <el-form-item :label="t('pubPlatform')">
                    <el-checkbox-group v-model="pubForm.platform">
                        <el-checkbox :label="t('desktop')" value="desktop" />
                        <!-- <el-checkbox label="移动端" value="mobile" /> -->
                        <!-- <el-checkbox label="源代码" value="source" /> -->
                    </el-checkbox-group>
                </el-form-item>
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
                    <el-button type="primary" @click="onSubmit">
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
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { appWindow } from '@tauri-apps/api/window'
import { useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/tauri'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import githubApi from '@/apis/github'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePakeStore } from '@/store'
import { writeBinaryFile, readBinaryFile } from '@tauri-apps/api/fs'
import { appDataDir, join } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'
import { ArrowLeft } from '@element-plus/icons-vue'
import CutterImg from '@/components/CutterImg.vue'
import { useI18n } from 'vue-i18n'
import { openUrl } from '@/utils/common'

const router = useRouter()
const store = usePakeStore()
const { t } = useI18n()
const iconBase64 = ref('')
const cutVisible = ref(false)
const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()
const appForm = reactive({
    url: store.currentProject.url,
    showName: store.currentProject.showName,
    appid: store.currentProject.appid,
    icon: store.currentProject.icon,
    version: store.currentProject.version,
    platform: 'desktop',
    width: store.currentProject.width || 800,
    height: store.currentProject.height || 600,
    desc: store.currentProject.desc,
})
const iconFileName = ref('')

const appRules = reactive<FormRules>({
    url: [
        {
            required: true,
            message: t('inputWebPlaceholder'),
            trigger: 'change',
        },
    ],
    showName: [
        {
            required: true,
            message: t('inputAppNamePlaceholder'),
            trigger: 'blur',
        },
    ],
    appid: [
        {
            required: true,
            message: t('inputAppIdPlaceholder'),
            trigger: 'change',
        },
    ],
    icon: [
        {
            required: true,
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
    ],
    platform: [
        {
            required: true,
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

// upload icon
const uploadIcon = async () => {
    console.log('uploadIcon')
    // use tauri open api, bacause input cant seleted file type
    const selectedFilePath: any = await open({
        multiple: false,
        filters: [
            {
                name: 'Images',
                extensions: ['png', 'jpg', 'jpeg'],
            },
        ],
    })

    if (!selectedFilePath) {
        console.log('No file selected')
        return null
    }
    const fileName = selectedFilePath.split('/').pop()
    iconFileName.value = fileName
    console.log('Selected file path:', selectedFilePath, fileName)
    // const fileStat = await readDir(selectedFilePath)
    // const { size } = fileStat;
    console.log(`File Name: ${fileName}`)
    // console.log(`File Size: ${fileStat} bytes`)
    // appForm.icon = 'assets%2F' + fileName
    // get file name
    const binaryData = await readBinaryFile(selectedFilePath)
    const base64Data = arrayBufferToBase64(binaryData)
    console.log('Base64 encoded image:', base64Data)
    const base64String = 'data:image/jpg;base64,' + base64Data
    iconBase64.value = base64String
    // if file is not png, and size is not 512x512, then cut it
    const imageSize: any = await getImageSize(base64String)
    // console.log('imageSize', imageSize)
    if (imageSize.width === imageSize.height && fileName.endsWith('.png')) {
        confirmIcon(base64String)
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
            console.log('updateRes error', updateRes)
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
    const savePath = await join(appDataPath, 'assets', fileName)
    // save file to app data dir
    await writeBinaryFile(savePath, imageData)
    console.log(`Image saved to: ${savePath}`)
    // console.log('filePath---', savePath)
    const assetUrl = convertFileSrc(savePath)
    // console.log('assetUrl---', assetUrl)
    // localImagePath.value = assetUrl
    appForm.icon = assetUrl
    // save image asseturl to project
    store.addUpdatePro({
        ...appForm,
        name: store.currentProject.name,
        appid: appForm.appid,
        debug: pubForm.model,
        icon: assetUrl,
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
    console.log('toHistory')
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

// save project
const saveProject = async (tips: boolean = true) => {
    appFormRef.value?.validate(async (valid, fields) => {
        if (valid) {
            // console.log('save!', appForm)
            store.addUpdatePro({
                name: store.currentProject.name,
                url: appForm.url,
                showName: appForm.showName,
                appid: appForm.appid,
                icon: appForm.icon,
                version: appForm.version,
                platform: appForm.platform,
                width: appForm.width,
                height: appForm.height,
                desc: appForm.desc,
                debug: pubForm.model,
            })
            tips && ElMessage.success(t('saveSuccess'))
        } else {
            console.log('error submit!', fields)
        }
    })
}

const preview = () => {
    appFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log('submit!', appForm)
            saveProject(false)
            invoke('open_window', {
                appUrl: appForm.url,
                appName: appForm.showName,
                platform: appForm.platform,
                width: appForm.width,
                height: appForm.height,
            })
        } else {
            console.log('error submit!', fields)
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
            console.log('error submit!', fields)
        }
    })
}

// do not use same name with ref
const pubForm = reactive({
    platform: ['desktop'],
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
}

// del pre publish version
const onSubmit = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
    // delete release
    deleteRelease()
    // update build yml
    await updateBuildYml()
    // update tauri config json
    const configSha: any = await getFileSha(
        'src-tauri/tauri.conf.json',
        store.currentProject.name
    )
    console.log('configSha---', configSha)
    try {
        const configContent: any = await invoke('update_config_file', {
            name: appForm.showName,
            version: appForm.version,
            url: appForm.url,
            id: appForm.appid,
            width: appForm.width.toString(),
            height: appForm.height.toString(),
        })
        console.log('config data:', configContent)
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
            console.log('updateRes error', updateRes)
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
            name: appForm.showName,
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
            console.log('updateRes error', updateRes)
        }
    } else {
        console.log('getFileSha error', shaRes)
    }
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
    buildSecondTimer = setInterval(() => {
        buildTime += 1
        const minute = Math.floor(buildTime / 60)
        const second = buildTime % 60
        const buildRate = Math.floor((buildTime / 720) * 100)
        // loadingText.value = `${buildStatus}...${minute}分${second}秒`
        const loadingText = `<div>${minute}${t('minute')}${second}${t(
            'second'
        )}</div><div>${buildStatus}${buildRate}%...</div>`
        console.log('loadingText---', loadingText)
        document.querySelector('.el-loading-text')!.innerHTML = loadingText
    }, 1000)
    // check build status
    checkDispatchTimer = setInterval(async () => {
        checkBuildStatus()
    }, 10000)
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
    // check build status
    const build_runs = checkRes.data.workflow_runs[0]
    const { status, conclusion, html_url } = build_runs
    buildStatus = t(status) || t('inProgress')
    if (checkRes.status === 200 && checkRes.data.total_count > 0) {
        if (status === 'completed' && conclusion === 'success') {
            document.querySelector('.el-loading-text')!.innerHTML =
                t('buildSuccess')
            // clear timer
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            // close loading
            buildLoading.value = false
            buildTime = 0
            router.push('/history')
        } else if (status === 'completed' && conclusion === 'cancelled') {
            document.querySelector('.el-loading-text')!.innerHTML =
                t('cancelled')
            buildLoading.value = false
            buildTime = 0
            // clear interval
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
        } else if (status === 'failure') {
            buildLoading.value = false
            buildTime = 0
            openUrl(html_url)
            document.querySelector('.el-loading-text')!.innerHTML = t('failure')
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
        } else if (conclusion === 'failure') {
            buildLoading.value = false
            buildTime = 0
            openUrl(html_url)
            document.querySelector('.el-loading-text')!.innerHTML = t('failure')
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
        } else if (status === 'completed') {
            buildLoading.value = false
            buildTime = 0
            openUrl(html_url)
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
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
    if (releaseRes.status === 200 && releaseRes.data.assets.length > 3) {
        // filter current project version
        store.setRelease(releaseRes.data)
    } else {
        console.log('releaseRes error', releaseRes)
    }
}

onMounted(() => {
    getLatestRelease()
    buildTime = 0
    appWindow.setTitle(`${store.currentProject.name}`)
})
</script>

<style lang="scss" scoped>
.editBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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

                .userName {
                    margin-right: 6px;
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

            .divider {
                margin: 0 10px;
                font-size: 10px;
                font-weight: 300;
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
