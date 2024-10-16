<template>
    <div
        class="editBox"
        v-loading="buildLoading"
        element-loading-text="准备环境..."
    >
        <div class="mainEdit">
            <div class="homeHeader">
                <div>
                    <div class="headerTitle">
                        <div class="backBox" @click="backHome">
                            <el-icon><ArrowLeft /></el-icon>
                            <span>返回</span>
                        </div>
                        <el-divider direction="vertical" />
                        <span>项目配置</span>
                    </div>
                    <div class="toolTips">
                        <span>
                            配置当前项目网站地址、APP显示名称、英文名称、APP标识等。
                        </span>
                    </div>
                </div>
                <!-- 设置按钮 -->
                <div class="setting">
                    <!-- <span class="userName">更多</span> -->
                    <!-- <el-icon :size="26"><Menu /></el-icon> -->
                    <el-dropdown>
                        <span class="dropdownLink">
                            <el-icon :size="26"><Operation /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="toHistory">
                                    发布历史
                                </el-dropdown-item>
                                <el-dropdown-item @click="resetForm">
                                    重制配置
                                </el-dropdown-item>
                                <el-dropdown-item @click="deleteProject">
                                    删除项目
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
                <el-form-item label="网站地址" prop="url">
                    <el-input
                        v-model="appForm.url"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        placeholder="例如：https://www.pakeplus.com"
                    />
                </el-form-item>
                <el-form-item label="APP名称" prop="showName">
                    <el-input
                        v-model="appForm.showName"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        placeholder="例如：派克加"
                    />
                </el-form-item>
                <el-form-item label="APP标识" prop="appid">
                    <el-input
                        v-model="appForm.appid"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        placeholder="例如：pakeplus.com.cn"
                    />
                </el-form-item>
                <el-form-item label="APP图标" prop="icon">
                    <el-input
                        :value="appForm.icon.split('assets%2F')[1]"
                        readonly
                        @click="uploadIcon"
                        placeholder="例如：本地上传，支持png、jpg、jpeg格式"
                    />
                </el-form-item>
                <el-form-item label="APP版本" prop="version">
                    <el-input
                        v-model="appForm.version"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        placeholder="例如：1.0.0"
                    />
                </el-form-item>
                <!-- 可以增加快速过滤网页内容的选项，填写对应标签的id就可以过滤掉 -->
                <el-form-item label="预览平台" prop="platform">
                    <el-radio-group v-model="appForm.platform">
                        <el-radio value="desktop">桌面端</el-radio>
                        <!-- <el-radio value="phone">移动端</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="APP描述" prop="desc">
                    <el-input
                        v-model="appForm.desc"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        :rows="3"
                        placeholder="请输入项目描述"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="footerBox">
            <el-button @click="saveProject(true)">保存</el-button>
            <el-button @click="preview">预览</el-button>
            <el-button @click="createRepo">发布</el-button>
        </div>
        <!-- 发布 -->
        <el-dialog v-model="centerDialogVisible" width="500" center>
            <template #header>
                <div class="diaHeader">
                    <span>打包发布</span>
                </div>
            </template>
            <el-form
                :model="pubForm"
                label-width="auto"
                style="max-width: 600px"
            >
                <el-form-item label="发布平台">
                    <el-checkbox-group v-model="pubForm.platform">
                        <el-checkbox label="桌面端" value="desktop" />
                        <!-- <el-checkbox label="移动端" value="mobile" /> -->
                        <!-- <el-checkbox label="源代码" value="source" /> -->
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="发布模式">
                    <el-radio-group v-model="pubForm.model">
                        <el-radio value="close">关闭Debug</el-radio>
                        <el-radio value="debug">开启Debug</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发布说明">
                    <el-input
                        v-model="pubForm.desc"
                        type="textarea"
                        autocomplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        placeholder="请输入发布说明"
                    />
                </el-form-item>
            </el-form>
            <span style="color: #aaa">
                注： 打包发布大概需要8分钟左右的时间，请耐心等待......
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false"
                        >取消</el-button
                    >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="onSubmit">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
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

const router = useRouter()
const store = usePakeStore()

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
    desc: store.currentProject.desc,
})

const appRules = reactive<FormRules>({
    url: [
        {
            required: true,
            message: '请输入网站地址',
            trigger: 'change',
        },
    ],
    showName: [
        {
            required: true,
            message: '请输入APP名称',
            trigger: 'blur',
        },
    ],
    appid: [
        {
            required: true,
            message: '请输入APPID',
            trigger: 'change',
        },
    ],
    icon: [
        {
            required: true,
            message: '请上传APP图标',
            trigger: 'change',
        },
    ],
    version: [
        {
            required: true,
            message: '请输入APP版本号',
            trigger: 'change',
        },
    ],
    platform: [
        {
            required: true,
            message: '请选择预览平台',
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: false,
            message: '请输入APP描述',
            trigger: 'blur',
        },
    ],
})

// 上传icon
const uploadIcon = async () => {
    console.log('uploadIcon')
    // document.getElementById('open')!.click()
    // use tauri open api, bacause input cant seleted file type
    const selectedFilePath: any = await open({
        multiple: false, // 只允许选择一个文件
        filters: [
            {
                name: 'Images',
                extensions: ['png'],
            },
        ],
    })

    if (!selectedFilePath) {
        console.log('No file selected')
        return null
    }
    const fileName = selectedFilePath.split('/').pop()
    console.log('Selected file path:', selectedFilePath, fileName)
    appForm.icon = 'assets%2F' + fileName
    // get file name
    const binaryData = await readBinaryFile(selectedFilePath)
    const base64Data = arrayBufferToBase64(binaryData)
    console.log('Base64 encoded image:', base64Data)
    // update icon file content
    updateIcon(base64Data) // 更新icon文件内容
    // save image to datadir
    saveImage(fileName, base64Data)
}

// update icon file content
const updateIcon = async (content: string) => {
    // 获取app-icon.png的文件sha
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
    // 获取应用数据目录
    const appDataPath = await appDataDir()
    console.log('appDataPath------', appDataPath)
    // const pathExist = await exists(appDataPath)
    // console.log('pathExist---', pathExist)
    // 拼接文件保存路径
    // const savePath = `${appDataPath}${fileName}`
    const savePath = await join(appDataPath, 'assets', fileName)
    // 将图片保存到应用数据目录
    await writeBinaryFile(savePath, imageData)
    console.log(`Image saved to: ${savePath}`)
    // appForm.desc = savePath
    // const filePath = await join(appDataPath, fileName)
    console.log('filePath---', savePath)
    const assetUrl = convertFileSrc(savePath)
    console.log('assetUrl---', assetUrl)
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

// 将base64转换为ArrayBuffer
const base64ToArrayBuffer = (base64: string) => {
    // 创建一个新的 ArrayBuffer
    const binaryString = atob(base64)
    const len = binaryString.length
    const arrayBuffer = new ArrayBuffer(len)
    const uint8Array = new Uint8Array(arrayBuffer)
    // 将二进制字符串中的字符逐个存入 Uint8Array
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

// 跳转到新建页面
const backHome = () => {
    router.go(-1)
}

// click menu item
const toHistory = () => {
    console.log('toHistory')
    router.push('/history')
}

const resetForm = () => {
    appFormRef.value?.resetFields()
}

// delete current project
const deleteProject = () => {
    ElMessageBox.confirm('确定要删除当前项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        console.log('delete project')
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
                desc: appForm.desc,
                debug: pubForm.model,
            })
            tips && ElMessage.success('保存成功')
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 预览页面
const preview = () => {
    appFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log('submit!', appForm)
            saveProject(false)
            invoke('open_docs', {
                appUrl: appForm.url,
                appName: appForm.showName,
                platform: appForm.platform,
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 创建分支
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
// const loadingText = ref('开始构建...')
// check dispatch workflow timer
let buildTime = 0
let buildStatus = '开始编译...'
let buildSecondTimer: any = null
let checkDispatchTimer: any = null

const onSubmit = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
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
                '准备编译...'
            dispatchAction()
        } else {
            console.log('updateRes error', updateRes)
        }
    } catch (error) {
        console.error('Error reading JSON file:', error)
    }
}

// 获取需要更新的文件sha
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

// 更新build.yml文件内容
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
    // 统计构建用时
    buildSecondTimer = setInterval(() => {
        buildTime += 1
        // 计算用时多少分多少秒
        const minute = Math.floor(buildTime / 60)
        const second = buildTime % 60
        // 构建进度
        const buildRate = Math.floor((buildTime / 720) * 100)
        // loadingText.value = `${buildStatus}...${minute}分${second}秒`
        const loadingText = `<div>${minute}分${second}秒</div><div>${buildStatus}${buildRate}%...</div>`
        console.log('loadingText---', loadingText)
        document.querySelector('.el-loading-text')!.innerHTML = loadingText
    }, 1000)
    // 每10秒检查一次构建状态
    checkDispatchTimer = setInterval(async () => {
        checkBuildStatus()
    }, 10000)
}

// status map
const statusMap: any = {
    pending: '等待中',
    in_progress: '构建中',
    success: '构建成功',
    failure: '构建失败',
    cancelled: '构建取消',
    waiting: '等待中',
    queued: '构建队列中',
    timed_out: '构建超时',
    completed: '构建完成',
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
    if (checkRes.status === 200 && checkRes.data.total_count > 0) {
        const build_runs = checkRes.data.workflow_runs[0]
        // check build status
        const { status, conclusion } = build_runs
        buildStatus = statusMap[status] || '构建中'
        // 除了第一次，别的都不需要
        // document.querySelector('.el-loading-text')!.innerHTML = '构建成功'
        if (status === 'completed' && conclusion === 'success') {
            document.querySelector('.el-loading-text')!.innerHTML = '构建成功'
            // 清理构建定时器
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            // 关闭弹窗，并跳转到发布页面
            buildLoading.value = false
            buildTime = 0
            router.push('/history')
        } else if (status === 'completed' && conclusion === 'cancelled') {
            document.querySelector('.el-loading-text')!.innerHTML = '构建取消'
            buildLoading.value = false
            buildTime = 0
            // 清理构建定时器
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
        }
    } else {
        buildTime = 0
        // 清理构建定时器
        buildSecondTimer && clearInterval(buildSecondTimer)
        checkDispatchTimer && clearInterval(checkDispatchTimer)
        document.querySelector('.el-loading-text')!.innerHTML = '构建失败'
    }
}

onMounted(() => {
    buildTime = 0
    appWindow.setTitle(`${store.currentProject.name}项目`)
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
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-right: 20px;
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
