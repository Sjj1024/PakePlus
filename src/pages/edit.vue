<template>
    <div class="editBox">
        <div class="mainEdit">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <el-form-item label="网站地址" prop="url">
                    <el-input v-model="ruleForm.url" />
                </el-form-item>
                <el-form-item label="APP名称" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="英文名称" prop="rename">
                    <el-input v-model="ruleForm.rename" />
                </el-form-item>
                <el-form-item label="APP标识" prop="appid">
                    <el-input v-model="ruleForm.appid" />
                </el-form-item>
                <el-form-item label="预览平台" prop="platform">
                    <el-radio-group v-model="ruleForm.platform">
                        <el-radio value="desktop">桌面端</el-radio>
                        <el-radio value="phone">移动端</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="APP描述" prop="desc">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <div class="footerBox">
            <el-button @click="backHome">
                <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <el-button @click="preview">预览</el-button>
            <el-button @click="createRepo">
                <el-icon><ArrowRight /></el-icon>
            </el-button>
        </div>
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

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    url: 'https://juejin.cn/',
    name: '掘金',
    rename: 'Juejin',
    appid: 'HelloJuejin',
    platform: 'desktop',
    desc: '',
})

const rules = reactive<FormRules>({
    url: [
        {
            required: true,
            message: 'Please select Activity zone',
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
    ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log('submit!', ruleForm)
            invoke('open_docs', {
                appUrl: ruleForm.url,
                appName: ruleForm.name,
                platform: ruleForm.platform,
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 创建分支
const createRepo = async () => {
    // 创建分支：需要有上一次提交的commit sha
    const res: any = await github.createBranch(
        store.userInfo.login,
        'PakePlus',
        {
            ref: `refs/heads/${ruleForm.rename}`,
            sha: store.commit.sha,
        }
    )
    console.log('createBranch', res)
    // 201 is ok
    if (res.status === 201) {
        const branchInfo = {
            name: ruleForm.rename,
            ...res.data,
        }
        console.log('branchInfo success', branchInfo)
        store.setCurrentProject(branchInfo)
        ElMessage.success('项目创建成功')
    } else if (res.status === 422) {
        ElMessage.success('项目已经存在')
    } else {
        console.log('branchInfo error', res)
        ElMessage.success(`项目创建失败: ${res.data.message}`)
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
</style>
