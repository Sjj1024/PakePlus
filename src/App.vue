<script setup lang="ts">
import { onMounted } from 'vue'
import { locale as osLocale } from '@tauri-apps/plugin-os'
import { useI18n } from 'vue-i18n'
import { isTauri } from './utils/common'

const { locale } = useI18n()

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

const chageTheme = (theme: string) => {
    if (theme === 'light') {
        document.documentElement.setAttribute('theme', 'light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add('light')
    } else {
        document.documentElement.setAttribute('theme', 'dark')
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.add('dark')
    }
    localStorage.setItem('theme', theme)
}

const initEnv = async () => {
    const language = isTauri ? await osLocale() : 'zh-CN'
    let lang = 'en' // Default to English
    if (language?.includes('zh-CN')) {
        lang = 'zh' // Simplified Chinese
    } else if (language?.includes('zh-TW')) {
        lang = 'zhTw' // Traditional Chinese
    } else if (language?.includes('ja')) {
        lang = 'ja' // Japanese
    } else if (language?.includes('ko')) {
        lang = 'ko' // Korean
    }
    console.log('语言: ', language, lang)
    locale.value = localStorage.getItem('lang') || lang
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const currentTheme = mediaQuery.matches ? 'dark' : 'light'
    console.log(`当前系统主题: ${currentTheme}`)
    const localTheme = localStorage.getItem('theme')
    chageTheme(localTheme || currentTheme)
    console.log('App data dir exists:', import.meta.env.DEV)
    // if env is dev
    // if (!import.meta.env.DEV) {
    //     disableRightClick()
    // }
}

// listen theme change
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light'
        console.log('theme change', newTheme)
        chageTheme(newTheme)
    })

onMounted(() => {
    initEnv()
})
</script>

<template>
    <div class="container" :class="{ isTauri: isTauri }">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
.isTauri {
    padding-top: 5px;
}
</style>
