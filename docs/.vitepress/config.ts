import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'PakePlus',
    description: 'PakePlus Docs',
    lastUpdated: true,
    base: '/',
    outDir: './dist',
    vite: {
        server: {
            host: '0.0.0.0',
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    },
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh',
        },
        // en: {
        //     label: 'English',
        //     lang: 'en',
        // },
    },
    head: [['link', { rel: 'icon', href: './app.svg' }]],
    themeConfig: {
        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档',
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                },
                            },
                        },
                    },
                },
            },
        },
        // 基础配置
        logo: {
            src: './app.svg',
            alt: 'PakePlus',
        },
        // 导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '下载', link: '/download' },
            { text: '使用指南', link: '/guide/', activeMatch: '/guide/' },
            { text: '常见问题', link: '/question/', activeMatch: '/question/' },
            { text: '社区交流', link: '/exchange/', activeMatch: '/exchange/' },
            { text: '赞助我们', link: '/sponsor/', activeMatch: '/sponsor/' },
        ],
        // 侧边栏
        sidebar: {
            '/guide/': [
                { text: '简介', link: '/guide/' },
                { text: '下载软件', link: '/guide/down' },
                { text: '获取Token', link: '/guide/token' },
                { text: '创建项目', link: '/guide/creat' },
                { text: '配置项目', link: '/guide/config' },
                { text: '编译发布', link: '/guide/build' },
                { text: '进阶配置', link: '/guide/tauri' },
            ],
            '/question/': [
                { text: '应用已损坏', link: '/question/' },
                { text: 'Token无效', link: '/question/invalid' },
                { text: '项目已存在', link: '/question/exist' },
                { text: '编译失败', link: '/question/build' },
                { text: '打包html项目', link: '/question/html' },
                { text: '打包Vue等项目', link: '/question/vue' },
                { text: '窗口跳转', link: '/question/jump' },
                { text: '其他问题', link: '/question/other' },
                { text: 'Issue', link: '/question/issue' },
            ],
            '/exchange/': [
                { text: '加入群聊', link: '/exchange/' },
                { text: 'Github讨论', link: '/exchange/github' },
            ],
            '/sponsor/': [
                { text: '赞助我们', link: '/sponsor/' },
                { text: '赞助名单', link: '/sponsor/list' },
            ],
        },
        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Sjj1024/PakePlus' },
        ],
        // footer
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present 1024小神',
        },
    },
})
