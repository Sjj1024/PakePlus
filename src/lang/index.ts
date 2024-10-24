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

// 这是获取浏览器的语言
const language = await os.locale()
const lang = language?.includes('zh') ? 'zh' : 'en'
console.log(`系统语言: ${lang}`)
const i18n = createI18n({
    // 首先从缓存里拿，没有的话就用浏览器语言，
    locale: localStorage.getItem('lang') || lang,
    fallbackLocale: 'zh', // 设置备用语言
    messages,
    legacy: false,
    globalInjection: true,
})

export default i18n
