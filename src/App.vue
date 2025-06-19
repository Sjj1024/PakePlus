<script setup lang="ts">
import { onMounted } from 'vue'
import { locale as osLocale } from '@tauri-apps/plugin-os'
import { useI18n } from 'vue-i18n'
import { isTauri, isMobile, chageTheme } from './utils/common'
import Updater from './components/Updater.vue'

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

const initEnv = async () => {
    // listen theme change
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (mediaQuery) {
        const listener = (e: any) => {
            const newTheme = e.matches ? 'dark' : 'light'
            console.log('theme change', newTheme)
            chageTheme(newTheme)
        }
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', listener)
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(listener)
        } else {
            console.warn('matchMedia API not supported')
        }
    }
    // global error
    window.onerror = function (message, source, lineno, colno, error) {
        console.error('global error:', {
            message,
            source,
            lineno,
            colno,
            error,
        })
        return false
    }
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
    const currentTheme = mediaQuery.matches ? 'dark' : 'light'
    const localTheme = localStorage.getItem('theme')
    chageTheme(localTheme || currentTheme)
    // if env is dev
    // if (!import.meta.env.DEV) {
    //     disableRightClick()
    // }
}

onMounted(() => {
    try {
        initEnv()
    } catch (error) {
        console.error('initEnv error:', error)
    }
})
</script>

<template>
    <div class="container" :class="{ isTauri: isTauri, webBox: !isTauri }">
        <router-view></router-view>
        <Updater />
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
