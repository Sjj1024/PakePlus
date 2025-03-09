import { createMemoryHistory, createRouter } from 'vue-router'
// import Home from '@/pages/home.vue'
// import Edit from '@/pages/edit.vue'
// import History from '@/pages/history.vue'
// import About from '@/pages/about.vue'

const routes = [
    { path: '/', component: () => import('@/pages/home.vue') },
    { path: '/edit', component: () => import('@/pages/edit.vue') },
    { path: '/history', component: () => import('@/pages/history.vue') },
    { path: '/about', component: () => import('@/pages/about.vue') },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
