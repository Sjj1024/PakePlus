import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: Home },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
