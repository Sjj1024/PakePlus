import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'PakePlus',
    description: 'PakePlus Docs',
    lastUpdated: false,
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
        plugins: [],
    },
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh',
            themeConfig: {
                // 基础配置
                logo: {
                    src: './app.svg',
                    alt: 'PakePlus',
                },
                // 导航栏
                nav: [
                    { text: '首页', link: '/' },
                    { text: '下载', link: '/download' },
                    {
                        text: '使用指南',
                        link: '/guide/',
                        activeMatch: '/guide/',
                    },
                    {
                        text: '常见问题',
                        link: '/question/',
                        activeMatch: '/question/',
                    },
                    {
                        text: '社区交流',
                        link: '/exchange/',
                        activeMatch: '/exchange/',
                    },
                    {
                        text: '赞助我们',
                        link: '/sponsor/',
                        activeMatch: '/sponsor/',
                    },
                ],
                // 侧边栏
                sidebar: {
                    '/guide/': [
                        {
                            text: '新手上路',
                            collapsed: false,
                            items: [
                                { text: 'PP简介', link: '/guide/' },
                                { text: '下载软件', link: '/guide/down' },
                                { text: '获取Token', link: '/guide/token' },
                                { text: '创建项目', link: '/guide/creat' },
                                { text: '简单配置', link: '/guide/config' },
                                { text: 'APP配置', link: '/guide/phone' },
                                { text: '编译发布', link: '/guide/build' },
                            ],
                        },
                        {
                            text: '进阶配置',
                            collapsed: false,
                            items: [{ text: '进阶配置', link: '/guide/tauri' }],
                        },
                        {
                            text: '高级玩法',
                            collapsed: false,
                            items: [
                                { text: '高级玩法', link: '/guide/superman' },
                            ],
                        },
                    ],
                    '/question/': [
                        { text: '常见问题', link: '/question/' },
                        { text: '使用限制', link: '/question/limit' },
                        { text: 'Token无效', link: '/question/invalid' },
                        { text: '项目已存在', link: '/question/exist' },
                        { text: '编译失败', link: '/question/build' },
                        { text: '打包html项目', link: '/question/html' },
                        { text: '打包Vue等项目', link: '/question/vue' },
                        { text: 'ipa/apk安装', link: '/question/phone' },
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
                    {
                        icon: 'github',
                        link: 'https://github.com/Sjj1024/PakePlus',
                    },
                ],
                // footer
                footer: {
                    message: 'Released under the MIT License.',
                    copyright: 'Copyright © 2019-present 1024小神',
                },
            },
        },
        en: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                // 基础配置
                logo: {
                    src: '../app.svg',
                    alt: 'PakePlus',
                },
                // 导航栏
                nav: [
                    { text: 'Home', link: '/en/' },
                    { text: 'Download', link: '/en/download' },
                    {
                        text: 'Guide',
                        link: '/en/guide/',
                        activeMatch: '/en/guide/',
                    },
                    {
                        text: 'Question',
                        link: '/en/question/',
                        activeMatch: '/en/question/',
                    },
                    {
                        text: 'Exchange',
                        link: '/en/exchange/',
                        activeMatch: '/en/exchange/',
                    },
                    {
                        text: 'Sponsor',
                        link: '/en/sponsor/',
                        activeMatch: '/en/sponsor/',
                    },
                ],
                // 侧边栏
                sidebar: {
                    '/en/guide/': [
                        {
                            text: 'Guide',
                            collapsed: false,
                            items: [
                                { text: 'Introduction', link: '/en/guide/' },
                                { text: 'Download', link: '/en/guide/down' },
                                { text: 'Get Token', link: '/en/guide/token' },
                                {
                                    text: 'Create Project',
                                    link: '/en/guide/creat',
                                },
                                {
                                    text: 'Configuration',
                                    link: '/en/guide/config',
                                },
                                {
                                    text: 'APP Configuration',
                                    link: '/en/guide/phone',
                                },
                                {
                                    text: 'Build and Release',
                                    link: '/en/guide/build',
                                },
                            ],
                        },
                        {
                            text: 'Advanced Configuration',
                            collapsed: false,
                            items: [
                                {
                                    text: 'Advanced Configuration',
                                    link: '/en/guide/tauri',
                                },
                            ],
                        },
                        {
                            text: 'Advanced Play',
                            collapsed: false,
                            items: [
                                {
                                    text: 'Advanced Play',
                                    link: '/en/guide/superman',
                                },
                            ],
                        },
                    ],
                    '/en/question/': [
                        { text: 'Application Damaged', link: '/en/question/' },
                        { text: 'Limits', link: '/en/question/limit' },
                        { text: 'Token Invalid', link: '/en/question/invalid' },
                        { text: 'Project Exists', link: '/en/question/exist' },
                        {
                            text: 'Compilation Failed',
                            link: '/en/question/build',
                        },
                        {
                            text: 'Packaging HTML Project',
                            link: '/en/question/html',
                        },
                        {
                            text: 'Packaging Vue Project',
                            link: '/en/question/vue',
                        },
                        {
                            text: 'ipa/apk Installation',
                            link: '/en/question/phone',
                        },
                        { text: 'Window Jump', link: '/en/question/jump' },
                        { text: 'Other Issues', link: '/en/question/other' },
                        { text: 'Issue', link: '/en/question/issue' },
                    ],
                    '/en/exchange/': [
                        { text: 'Join Group Chat', link: '/en/exchange/' },
                        {
                            text: 'Github Discussion',
                            link: '/en/exchange/github',
                        },
                    ],
                    '/en/sponsor/': [
                        { text: 'Sponsor Us', link: '/en/sponsor/' },
                        { text: 'Sponsor List', link: '/en/sponsor/list' },
                    ],
                },
                // 社交链接
                socialLinks: [
                    {
                        icon: 'github',
                        link: 'https://github.com/Sjj1024/PakePlus',
                    },
                ],
                // footer
                footer: {
                    message: 'Released under the MIT License.',
                    copyright: 'Copyright © 2019-present 1024xiaoshen',
                },
            },
        },
    },
    head: [
        ['link', { rel: 'icon', href: './app.svg' }],
        [
            'script',
            {},
            `var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?63127d959845e83b472b4316ecda1e14";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();`,
        ],
    ],
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
                    en: {
                        translations: {
                            button: {
                                buttonText: 'Search',
                                buttonAriaLabel: 'Search',
                            },
                            modal: {
                                noResultsText: 'No results found',
                                resetButtonTitle: 'Reset',
                                footer: {
                                    selectText: 'Select',
                                    navigateText: 'Switch',
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
    },
})
