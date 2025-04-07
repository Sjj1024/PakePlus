import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import Edit from '@/pages/edit.vue'
import Phone from '@/pages/phone.vue'
import History from '@/pages/history.vue'
import About from '@/pages/about.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/edit', component: Edit },
    { path: '/phone', component: Phone },
    { path: '/history', component: History },
    { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
