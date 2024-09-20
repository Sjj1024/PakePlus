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
            <span>注： 打包发布大概需要3分钟左右的时间，请耐心等待......</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false"
                        >取消</el-button
                    >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button
                        type="primary"
                        @click="centerDialogVisible = false"
                    >
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
import github from '@/apis/github'
import { ElMessage } from 'element-plus'
import { usePakeStore } from '@/store'

const router = useRouter()
const store = usePakeStore()

const centerDialogVisible = ref(false)
const formSize = ref<ComponentSize>('default')
const appFormRef = ref<FormInstance>()
const appForm = reactive({
    url: 'https://juejin.cn/',
    name: '掘金',
    rename: 'Juejin',
    appid: 'HelloJuejin',
    icon: '',
    version: '',
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

// iconInput change
const changeFile = () => {
    const fu: any = document.getElementById('open')
    if (fu === null || !fu.files[0]) return
    const fileName = fu.files[0].name
    console.log('fu---', fileName)
    appForm.icon = fileName
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
            // 创建分支：需要有上一次提交的commit sha
            const res: any = await github.createBranch(
                store.userInfo.login,
                'PakePlus',
                {
                    ref: `refs/heads/${appForm.rename}`,
                    sha: store.commit.sha,
                }
            )
            console.log('createBranch', res)
            // 201 is ok
            if (res.status === 201) {
                const branchInfo = {
                    name: appForm.rename,
                    ...res.data,
                }
                console.log('branchInfo success', branchInfo)
                store.setCurrentProject(branchInfo)
                ElMessage.success('项目创建成功')
                // router.push('/publish')
            } else if (res.status === 422) {
                console.log('项目已经存在')
                // ElMessage.success('项目已经存在')
                // router.push('/publish')
            } else {
                console.log('branchInfo error', res)
                ElMessage.success(`项目创建失败: ${res.data.message}`)
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

// do not use same name with ref
const form = reactive({
    platform: ['desktop'],
    model: 'close',
})

const checkList = ref(['Value selected and disabled', 'Value A'])

const onSubmit = () => {
    console.log('submit!')
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
