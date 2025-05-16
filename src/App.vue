<script setup lang="ts">
import { onMounted } from 'vue'
import { locale as osLocale } from '@tauri-apps/plugin-os'
import { useI18n } from 'vue-i18n'
import { isTauri, isMobile, buildTime } from './utils/common'

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
    console.log('Build time:', buildTime)
    if (isMobile()) {
        // to https://sjj1024.github.io/PakePlus/
        window.location.href = 'https://ppofficial.pages.dev/'
        return
    }
    const localLang =
        navigator.language || (navigator as any).userLanguage || 'en'
    const language = isTauri ? await osLocale() : localLang
    let lang = 'en' // Default to English
    if (language?.includes('CN')) {
        lang = 'zh' // Simplified Chinese
    } else if (language?.includes('TW')) {
        lang = 'zhTw' // Traditional Chinese
    } else if (language?.includes('ja')) {
        lang = 'ja' // Japanese
    } else if (language?.includes('ko')) {
        lang = 'ko' // Korean
    }
    locale.value = localStorage.getItem('lang') || lang
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const currentTheme = mediaQuery.matches ? 'dark' : 'light'
    const localTheme = localStorage.getItem('theme')
    chageTheme(localTheme || currentTheme)
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

// global error
window.onerror = function (message, source, lineno, colno, error) {
    console.error('global error:', { message, source, lineno, colno, error })
    return false
}

onMounted(() => {
    initEnv()
})
</script>

<template>
    <div class="container" :class="{ isTauri: isTauri, webBox: !isTauri }">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
.webBox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
</style>
