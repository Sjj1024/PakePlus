import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/home.vue'
import About from '@/pages/about.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
