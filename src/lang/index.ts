// index.ts
import { createI18n } from 'vue-i18n'
import { os } from '@tauri-apps/api'
import zh from './zh_cn'
import en from './en_us'
import zhTw from './zh_tw'
import ja from './ja_jp'
import ko from './ko_kr'

const messages = {
    en,
    zh,
    zhTw,
    ja,
    ko,
}

// Create an async function to handle the language setup
const setupI18n = async () => {
    // Detect OS language
    const language = await os.locale()
    let lang = 'en' // Default to English
    if (language?.includes('zh-Hans')) {
        lang = 'zh' // Simplified Chinese
    } else if (language?.includes('zh-Hant')) {
        lang = 'zhTw' // Traditional Chinese
    } else if (language?.includes('ja')) {
        lang = 'ja' // Japanese
    } else if (language?.includes('ko')) {
        lang = 'ko' // Korean
    }
    console.log(`系统语言: ${lang}`)
    const i18n = createI18n({
        locale: localStorage.getItem('lang') || lang,
        fallbackLocale: 'zh', // Fallback language
        messages,
        legacy: false,
        globalInjection: true,
    })

    return i18n
}

export default await setupI18n()
