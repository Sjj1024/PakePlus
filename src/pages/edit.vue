<template>
    <div class="editBox">
        <div class="mainEdit">
            <el-form
                ref="ruleFormRef"
                style="max-width: 600px"
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
                <el-form-item label="APP标识" prop="name">
                    <el-input v-model="ruleForm.appid" />
                </el-form-item>
                <el-form-item label="打包平台" prop="platform">
                    <el-radio-group v-model="ruleForm.platform">
                        <el-radio value="desktop">桌面端</el-radio>
                        <el-radio value="phone">移动端</el-radio>
                        <el-radio value="all">全平台</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="APP描述" prop="desc">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <div class="footerBox">
            <el-button @click="backHome">返回</el-button>
            <el-button @click="preview">预览</el-button>
            <el-button>下一步</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { appWindow } from '@tauri-apps/api/window'
import { useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/tauri'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    url: 'https://juejin.cn/',
    name: '掘金',
    appid: 'HelloJuejin',
    platform: 'desktop',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    location: '',
    type: [],
    resource: '',
    desc: '',
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    location: [
        {
            required: true,
            message: 'Please select a location',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
        },
    ],
})

// 跳转到新建页面
const backHome = () => {
    router.push('/')
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))

// 预览页面
const preview = () => {
    invoke('open_docs')
}

onMounted(() => {
    appWindow.setTitle('新建项目')
})
</script>

<style lang="scss" scoped>
.editBox {
    .mainEdit {
        margin-top: 20px;
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
