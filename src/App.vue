<script setup lang="ts">
import { onMounted } from 'vue'
import { cacheDir, join } from '@tauri-apps/api/path'
import { exists, BaseDirectory } from '@tauri-apps/api/fs'

const userLanguage = navigator.language
console.log('System language:', userLanguage)

const initEnv = async () => {
    // checkout appdata dir exists
    const dataDir = await cacheDir()
    const existRes = await exists(dataDir)
    console.log('App data dir exists:', existRes)
}

onMounted(() => {
    // initEnv()
    let theme = localStorage.getItem('theme') || 'dark'
    if (theme !== 'dark') {
        document.documentElement.setAttribute('theme', 'light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add('light')
        // userStore.setTheme('light')
    } else {
        document.documentElement.setAttribute('theme', 'dark')
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.add('dark')
        // userStore.setTheme('dark')
    }
})
</script>

<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
