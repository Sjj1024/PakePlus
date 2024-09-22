<template>
    <div class="editBox">
        <div class="mainEdit">
            <el-form
                ref="appFormRef"
                :model="appForm"
                :rules="appRules"
                label-width="auto"
                class="demo-appForm"
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
                <el-form-item label="英文名称" prop="rename">
                    <el-input
                        v-model="appForm.rename"
                        placeholder="例如：pakeplus"
                    />
                </el-form-item>
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
            <el-button @click="backHome">返回</el-button>
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
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="发布平台">
                    <el-checkbox-group v-model="form.platform">
                        <el-checkbox label="桌面端" value="desktop" />
                        <el-checkbox label="移动端" value="mobile" />
                        <el-checkbox label="源代码" value="source" />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="发布模式">
                    <el-radio-group v-model="form.model">
                        <el-radio value="close">关闭Debug</el-radio>
                        <el-radio value="debug">开启Debug</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span>注： 打包发布大概需要5分钟左右的时间，请耐心等待......</span>
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
import { ElMessage } from 'element-plus'
import { usePakeStore } from '@/store'
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs'

const router = useRouter()
const store = usePakeStore()

const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()
const appForm = reactive({
    url: 'https://www.kuaishou.com/new-reco',
    name: '快手',
    rename: 'Kuaishou',
    appid: 'HelloPakePlus',
    icon: 'default.png',
    version: '1.0.1',
    platform: 'desktop',
    desc: '',
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
    rename: [
        {
            required: true,
            message: '请输入APP英文名称',
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
    router.push('/')
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 预览页面
const preview = () => {
    appFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log('submit!', appForm)
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
const form = reactive({
    platform: ['desktop'],
    model: 'close',
})

const onSubmit = async () => {
    centerDialogVisible.value = false
    try {
        const jsonContent: any = await invoke('read_json_file')
        const data = JSON.parse(jsonContent)
        console.log('json data:', data)
    } catch (error) {
        console.error('Error reading JSON file:', error)
    }
}

onMounted(() => {
    appWindow.setTitle('新建项目')
})
</script>

<style lang="scss" scoped>
.editBox {
    .mainEdit {
        margin-top: 20px;
        padding: 10px;
    }
    .footerBox {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
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
