<script setup lang="ts">
import { onMounted } from 'vue'
import { appDataDir } from '@tauri-apps/api/path'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'

const userLanguage = navigator.language
console.log('System language:', userLanguage)

const disableRightClick = () => {
    //禁止F12
    document.onkeydown = function (event: any) {
        var winEvent: any = window.event
        if (winEvent && winEvent.keyCode == 123) {
            event.keyCode = 0
            event.returnValue = false
        }
        if (winEvent && winEvent.keyCode == 13) {
            winEvent.keyCode = 505
        }
    }
    //屏蔽右键菜单
    document.oncontextmenu = function (event: any) {
        if (window.event) {
            event = window.event
        }
        try {
            var the = event.srcElement
            if (
                !(
                    (the.tagName == 'INPUT' &&
                        the.type.toLowerCase() == 'text') ||
                    the.tagName == 'TEXTAREA'
                )
            ) {
                return false
            }
            return true
        } catch (e) {
            return false
        }
    }
}

const initEnv = async () => {
    // checkout appdata dir exists
    const dataDir = await appDataDir()
    // const existRes = await createDir(dataDir)
    await createDir('assets', { dir: BaseDirectory.AppData, recursive: true })
    console.log('App data dir exists:', import.meta.env.DEV)
    // if env is dev
    if (!import.meta.env.DEV) {
        disableRightClick()
    }
}

onMounted(() => {
    initEnv()
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
