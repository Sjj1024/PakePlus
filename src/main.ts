import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './lang/index'
import { createGtag } from 'vue-gtag'
import '@/assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont.js'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/theme.css'
import '@/assets/global.scss'
import 'vue-cropper/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(i18n)
if (import.meta.env.VITE_GTAG_ID) {
    createGtag({
        tagId: import.meta.env.VITE_GTAG_ID,
    });
}
app.mount('#app')
