<template>
    <div
        class="editBox"
        v-loading="buildLoading"
        element-loading-text="Loading..."
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
                        placeholder="例如：https://www.pakeplus.com"
                    />
                </el-form-item>
                <el-form-item label="APP名称" prop="name">
                    <el-input
                        v-model="appForm.name"
                        placeholder="例如：派克加"
                    />
                </el-form-item>
                <!-- <el-form-item label="英文名称" prop="rename">
                    <el-input
                        v-model="appForm.rename"
                        placeholder="例如：pakeplus"
                    />
                </el-form-item> -->
                <el-form-item label="APP标识" prop="appid">
                    <el-input
                        v-model="appForm.appid"
                        placeholder="例如：pakeplus.com.cn"
                    />
                </el-form-item>
                <el-form-item label="APP图标" prop="icon">
                    <el-input
                        v-model="appForm.icon"
                        readonly
                        @click="uploadIcon"
                        placeholder="例如：本地上传，支持png、jpg、jpeg格式"
                    />
                </el-form-item>
                <el-form-item label="APP版本" prop="version">
                    <el-input
                        v-model="appForm.version"
                        placeholder="例如：1.0.0"
                    />
                </el-form-item>
                <!-- 可以增加快速过滤网页内容的选项，填写对应标签的id就可以过滤掉 -->
                <el-form-item label="预览平台" prop="platform">
                    <el-radio-group v-model="appForm.platform">
                        <el-radio value="desktop">桌面端</el-radio>
                        <el-radio value="phone">移动端</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="APP描述" prop="desc">
                    <el-input v-model="appForm.desc" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <div class="footerBox">
            <!-- <el-button @click="backHome">返回</el-button> -->
            <el-button @click="saveProject(true)">保存</el-button>
            <el-button @click="preview">预览</el-button>
            <el-button @click="createRepo">发布</el-button>
        </div>
        <!-- icon输入 -->
        <input
            id="open"
            type="file"
            name="filename"
            style="display: none"
            @change="changeFile"
        />
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
                        <el-checkbox label="移动端" value="mobile" />
                        <el-checkbox label="源代码" value="source" />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="发布模式">
                    <el-radio-group v-model="pubForm.model">
                        <el-radio value="close">关闭Debug</el-radio>
                        <el-radio value="debug">开启Debug</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发布说明">
                    <el-input v-model="pubForm.desc" type="textarea" />
                </el-form-item>
            </el-form>
            <span style="color: #aaa">
                注： 打包发布大概需要6分钟左右的时间，请耐心等待......
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
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const store = usePakeStore()

const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()
const appForm = reactive({
    url: 'https://www.bilibili.com/',
    name: 'bilibili',
    appid: 'hello.bilibili.com',
    icon: '',
    version: '0.0.9',
    platform: 'desktop',
    desc: '简短描述',
})

const appRules = reactive<FormRules>({
    url: [
        {
            required: true,
            message: '请输入网站地址',
            trigger: 'change',
        },
    ],
    name: [
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
const uploadIcon = () => {
    console.log('uploadIcon')
    document.getElementById('open')!.click()
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

// iconInput change
const changeFile = (event: any) => {
    // get base64 content
    const file = event.target.files[0] // 获取文件
    if (file) {
        appForm.icon = file.name
        console.log('file---', event.target.files)
        // appForm.icon = event.target.files.name
        const reader = new FileReader() // 创建FileReader对象
        reader.onload = function (e: any) {
            const base64String = e.target.result.split('base64,')[1] // 获取Base64编码
            console.log('base64String---', base64String) // 打印Base64编码内容
            updateIcon(base64String) // 更新icon文件内容
        }
        reader.readAsDataURL(file) // 将文件读取为Base64
    }
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
            store.addProject({
                name: store.currentProject.name,
                url: appForm.url,
                showName: appForm.name,
                id: appForm.appid,
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
                appName: appForm.name,
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

// // 获取需要更新的文件sha
// const getFileSha = async (filePath: string) => {
//     const res: any = await github.getFileSha(
//         store.userInfo.login,
//         'PakePlus',
//         filePath
//     )
//     console.log('getBranch', res)
// }

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
let buildStatus = ''
let buildSecondTimer: any = null
let checkDispatchTimer: any = null

const onSubmit = async () => {
    centerDialogVisible.value = false
    buildLoading.value = true
    const configSha: any = await githubApi.getFileSha(
        store.userInfo.login,
        'PakePlus',
        'src-tauri/tauri.conf.json',
        { ref: store.currentProject.name }
    )
    console.log('configSha---', configSha)
    try {
        const configContent: any = await invoke('update_config_file', {
            name: appForm.name,
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
                '开始构建...'
            dispatchAction()
        } else {
            console.log('updateRes error', updateRes)
        }
    } catch (error) {
        console.error('Error reading JSON file:', error)
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
        const buildRate = Math.floor((buildTime / 480) * 100)
        // loadingText.value = `${buildStatus}...${minute}分${second}秒`
        const loadingText = `${buildStatus}${buildRate}%...${minute}分${second}秒`
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
        document.querySelector('.el-loading-text')!.innerHTML = '构建成功'
        if (status === 'completed' && conclusion === 'success') {
            document.querySelector('.el-loading-text')!.innerHTML = '构建成功'
            // 清理构建定时器
            buildSecondTimer && clearInterval(buildSecondTimer)
            checkDispatchTimer && clearInterval(checkDispatchTimer)
            // 关闭弹窗，并跳转到发布页面
        }
    } else {
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
        padding: 20px;

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

                .backBox {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    // color: var(--el-text-color-regular);
                    cursor: pointer;
                }
            }

            .toolTips {
                color: gray;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-left: 2px;

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
