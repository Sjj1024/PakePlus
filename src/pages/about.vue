<template>
    <div @click="goBack">关于TurnApp</div>
    <div @click="uploadIcon">选择图片</div>
    <img :src="localImagePath" alt="展示图片" />
</template>

<script setup lang="ts">
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { open } from '@tauri-apps/api/dialog'

const router = useRouter()

// local image path
const localImagePath = ref('')

// 上传icon
const uploadIcon = async () => {
    console.log('uploadIcon')
    const selected = await open({
        multiple: false, // 只允许选择一个文件
        filters: [
            {
                name: 'Image',
                extensions: ['png', 'jpg', 'jpeg', 'gif'],
            },
        ],
    })

    if (selected) {
        console.log('Selected file path:', selected)
        const url = convertFileSrc(selected as string)
        localImagePath.value = url
        return selected // 返回选择的文件路径
    }
}

const goBack = () => {
    router.go(-1)
}
</script>

<style lang="scss" scoped></style>
