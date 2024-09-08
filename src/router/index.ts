import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/home.vue'
import Edit from '@/pages/edit.vue'
import About from '@/pages/about.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/edit', component: Edit },
    { path: '/about', component: About },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
