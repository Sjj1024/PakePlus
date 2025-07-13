<script setup lang="ts">
import { onMounted } from 'vue'
import { locale as osLocale } from '@tauri-apps/plugin-os'
import { useI18n } from 'vue-i18n'
import {
    isTauri,
    isMobile,
    chageTheme,
    syncAllBranch,
    creatDeviceid,
} from './utils/common'
import Updater from './components/Updater.vue'
import { usePPStore } from './store'

const { locale } = useI18n()
const store = usePPStore()

const initEnv = async () => {
    creatDeviceid()
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
        // sync all branch
        store.token && syncAllBranch(store.token, store.userInfo.login, true)
    } catch (error) {
        console.error('initEnv or syncAllBranch error:', error)
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
