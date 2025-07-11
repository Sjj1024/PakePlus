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
                    { text: 'Home', link: '/' },
                    { text: 'Download', link: '/download' },
                    {
                        text: 'Guide',
                        link: '/guide/',
                        activeMatch: '/guide/',
                    },
                    {
                        text: 'Question',
                        link: '/question/',
                        activeMatch: '/question/',
                    },
                    {
                        text: 'Exchange',
                        link: '/exchange/',
                        activeMatch: '/exchange/',
                    },
                    {
                        text: 'Sponsor',
                        link: '/sponsor/',
                        activeMatch: '/sponsor/',
                    },
                ],
                // 侧边栏
                sidebar: {
                    '/guide/': [
                        {
                            text: 'Guide',
                            collapsed: false,
                            items: [
                                { text: 'Introduction', link: '/guide/' },
                                { text: 'Download', link: '/guide/down' },
                                { text: 'Get Token', link: '/guide/token' },
                                {
                                    text: 'Create Project',
                                    link: '/guide/creat',
                                },
                                {
                                    text: 'Configuration',
                                    link: '/guide/config',
                                },
                                {
                                    text: 'APP Configuration',
                                    link: '/guide/phone',
                                },
                                {
                                    text: 'Build and Release',
                                    link: '/guide/build',
                                },
                            ],
                        },
                        {
                            text: 'Advanced Configuration',
                            collapsed: false,
                            items: [
                                {
                                    text: 'Advanced Configuration',
                                    link: '/guide/tauri',
                                },
                            ],
                        },
                        {
                            text: 'Advanced Play',
                            collapsed: false,
                            items: [
                                {
                                    text: 'Advanced Play',
                                    link: '/guide/superman',
                                },
                            ],
                        },
                    ],
                    '/question/': [
                        { text: 'Application Damaged', link: '/question/' },
                        { text: 'Limits', link: '/question/limit' },
                        { text: 'Token Invalid', link: '/question/invalid' },
                        { text: 'Project Exists', link: '/question/exist' },
                        {
                            text: 'Compilation Failed',
                            link: '/question/build',
                        },
                        {
                            text: 'Packaging HTML Project',
                            link: '/question/html',
                        },
                        {
                            text: 'Packaging Vue Project',
                            link: '/question/vue',
                        },
                        {
                            text: 'ipa/apk Installation',
                            link: '/question/phone',
                        },
                        { text: 'Window Jump', link: '/question/jump' },
                        { text: 'Other Issues', link: '/question/other' },
                        { text: 'Issue', link: '/question/issue' },
                    ],
                    '/exchange/': [
                        {
                            text: 'Github Discussion',
                            link: '/exchange/github',
                        },
                    ],
                    '/sponsor/': [
                        { text: 'Sponsor Us', link: '/sponsor/' },
                        { text: 'Sponsor List', link: '/sponsor/list' },
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
        zh: {
            label: '简体中文',
            lang: 'zh',
            themeConfig: {
                // 基础配置
                logo: {
                    src: '../app.svg',
                    alt: 'PakePlus',
                },
                aside: true,
                outlineTitle: '页面导航',
                // 导航栏
                nav: [
                    { text: '首页', link: '/zh/' },
                    { text: '下载', link: '/zh/download' },
                    {
                        text: '使用指南',
                        link: '/zh/guide/',
                        activeMatch: '/zh/guide/',
                    },
                    {
                        text: '常见问题',
                        link: '/zh/question/',
                        activeMatch: '/zh/question/',
                    },
                    {
                        text: '商业社群',
                        link: '/zh/exchange/',
                        activeMatch: '/zh/exchange/',
                    },
                    {
                        text: '赞助我们',
                        link: '/zh/sponsor/',
                        activeMatch: '/zh/sponsor/',
                    },
                ],
                // 侧边栏
                sidebar: {
                    '/zh/guide/': [
                        {
                            text: '新手上路',
                            collapsed: false,
                            items: [
                                { text: 'PP简介', link: '/zh/guide/' },
                                { text: '下载软件', link: '/zh/guide/down' },
                                { text: '获取Token', link: '/zh/guide/token' },
                                { text: '创建项目', link: '/zh/guide/creat' },
                                { text: '简单配置', link: '/zh/guide/config' },
                                { text: 'APP配置', link: '/zh/guide/phone' },
                                {
                                    text: '本地打包',
                                    link: '/zh/guide/easylocal',
                                },
                                { text: '云端打包', link: '/zh/guide/build' },
                                { text: '发布成功', link: '/zh/guide/success' },
                            ],
                        },
                        {
                            text: '进阶配置',
                            collapsed: false,
                            items: [
                                { text: '桌面端配置', link: '/zh/guide/tauri' },
                                {
                                    text: '移动端配置',
                                    link: '/zh/guide/appconfig',
                                },
                            ],
                        },
                        {
                            text: '高级玩法',
                            collapsed: false,
                            items: [
                                {
                                    text: '桌面端API',
                                    link: '/zh/guide/desktopapi',
                                },
                                {
                                    text: '移动端API',
                                    link: '/zh/guide/phoneapi',
                                },
                                {
                                    text: '自定义打包',
                                    link: '/zh/guide/custompack',
                                },
                            ],
                        },
                    ],
                    '/zh/question/': [
                        {
                            text: '汇总问题',
                            collapsed: false,
                            items: [
                                { text: '常见问题', link: '/zh/question/' },
                                {
                                    text: '使用限制',
                                    link: '/zh/question/limit',
                                },
                                {
                                    text: 'Token无效',
                                    link: '/zh/question/invalid',
                                },
                                {
                                    text: '项目已存在',
                                    link: '/zh/question/exist',
                                },
                                {
                                    text: '编译失败',
                                    link: '/zh/question/build',
                                },
                                {
                                    text: '打包html项目',
                                    link: '/zh/question/html',
                                },
                                {
                                    text: '打包Vue等项目',
                                    link: '/zh/question/vue',
                                },
                                { text: '窗口跳转', link: '/zh/question/jump' },
                            ],
                        },
                        {
                            text: '桌面端问题',
                            collapsed: false,
                            items: [
                                {
                                    text: '开启调试',
                                    link: '/zh/question/debug',
                                },
                            ],
                        },
                        {
                            text: '移动端问题',
                            collapsed: false,
                            items: [
                                {
                                    text: 'ipa/apk安装',
                                    link: '/zh/question/phone',
                                },
                            ],
                        },
                        {
                            text: '其他问题',
                            collapsed: false,
                            items: [
                                {
                                    text: '其他问题',
                                    link: '/zh/question/other',
                                },
                                { text: 'Issue', link: '/zh/question/issue' },
                            ],
                        },
                    ],
                    '/zh/exchange/': [
                        { text: '加入群聊', link: '/zh/exchange/' },
                        { text: '商业支持', link: '/zh/exchange/business' },
                        { text: 'Github讨论', link: '/zh/exchange/github' },
                    ],
                    '/zh/sponsor/': [
                        { text: '赞助我们', link: '/zh/sponsor/' },
                        { text: '赞助名单', link: '/zh/sponsor/list' },
                        { text: '公司名单', link: '/zh/sponsor/company' },
                    ],
                },
                // 社交链接
                socialLinks: [
                    { icon: 'x', link: 'https://x.com/1024xiaoshen' },
                    {
                        icon: 'youtube',
                        link: 'https://www.youtube.com/@1024xiaoshen',
                    },
                    // {
                    //     icon: 'tiktok',
                    //     link: 'https://www.youtube.com/@1024xiaoshen',
                    // },
                    // {
                    //     icon: {
                    //         svg: '<svg t="1748940769028" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15277" width="200" height="200"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="15278"></path></svg>',
                    //     },
                    //     link: 'https://www.youtube.com/@1024xiaoshen',
                    // },
                    {
                        icon: 'bilibili',
                        link: 'https://space.bilibili.com/405719127',
                    },
                    // {
                    //     icon: {
                    //         svg: '<svg t="1748940108941" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3079" width="200" height="200"><path d="M1021.72444445 836.54883555V187.48757333C1021.72444445 85.61550222 938.38449778 2.27555555 836.51242667 2.27555555H187.48757333C85.61550222 2.27555555 2.27555555 85.61550222 2.27555555 187.48757333v649.06126222c0 100.85262222 81.70154667 183.57361778 182.2264889 185.1756089h654.9959111c100.48853333-1.60199111 182.22648889-84.28657778 182.2264889-185.1756089" fill="#FF2442" p-id="3080"></path><path d="M726.52117333 366.36444445h57.344v20.53461333c0 1.6384 0.80099555 2.40298667 2.36657778 2.36657777 34.00590222-1.01944889 68.26666667 0.07281778 85.81575111 34.95253334 10.44935111 20.68024889 8.30122667 52.13752889 7.71868445 76.82275556-0.03640889 1.45635555 0.65536 2.25735111 2.03889778 2.40298666 4.00497778 0.36408889 7.90072889 0.72817778 11.68725333 1.20149334 67.61130667 8.11918222 54.24924445 71.87114667 54.46769777 121.96977777 0.10922667 17.47626667-1.85685333 30.25578667-5.82542222 38.41137778-8.37404445 16.89372445-23.37450667 26.57848889-45.00138666 28.98147555H854.97173333l-21.55406222-50.02581333a1.6384 1.6384 0 0 1 0.10922667-1.52917333 1.56558222 1.56558222 0 0 1 1.31072-0.72817778l45.72956444-0.03640889c2.54862222 0 4.95160889-1.09226667 6.69923556-2.98552889a10.12167111 10.12167111 0 0 0 2.69425777-7.02691555c-0.21845333-15.29173333-0.32768-30.54705778-0.25486222-45.80238223 0-13.72615111-6.48078222-20.75306667-19.55157333-21.11715555-14.78200889-0.36408889-42.78044445-0.36408889-84.03171555 0.07281778-1.45635555 0-2.18453333 0.80099555-2.18453334 2.36657777l-0.21845333 126.81216H726.44835555l-0.18204444-127.35829333a2.25735111 2.25735111 0 0 0-2.22094222-2.33016889h-53.52106667a2.54862222 2.54862222 0 0 1-2.47580444-2.54862222l0.07281777-55.41432889c0-1.85685333 0.87381333-2.80348445 2.62144-2.80348444l52.90211556 0.10922667a2.51221333 2.51221333 0 0 0 1.82044444-0.80099556 2.76707555 2.76707555 0 0 0 0.72817778-1.89326222v-47.91409778a3.16757333 3.16757333 0 0 0-3.05834666-3.24039111l-32.65877334 0.14563555c-1.71121778 0-2.54862222-0.91022222-2.54862222-2.69425778l-0.10922666-55.7056c0-1.6384 0.72817778-2.43939555 2.36657777-2.43939555h33.82385778c1.45635555 0 2.18453333-0.72817778 2.18453333-2.29376l0.36408889-20.46179555z m59.38289778 137.37073777l35.57148444-0.07281777c0.58254222 0 1.12867555-0.25486222 1.52917334-0.6917689a2.29376 2.29376 0 0 0 0.61895111-1.6019911l-0.18204445-44.52807112c0-3.49525333-2.54862222-6.33514667-5.64337777-6.33514666l-28.54456889 0.07281778a5.35210667 5.35210667 0 0 0-4.00497778 1.89326222 6.80846222 6.80846222 0 0 0-1.6384 4.55111111l0.18204444 44.52807111c0 1.23790222 0.98304 2.18453333 2.11171556 2.18453333zM417.95584 507.74016c-13.83537778 0.25486222-38.84828445 4.11420445-44.30961778-13.68974222-3.31320889-10.63139555 4.18702222-25.44981333 8.73813333-35.82634667 12.96156445-29.52760889 25.66826667-59.16444445 38.15651556-88.91050666 0.50972445-1.20149333 1.38353778-1.82044445 2.62144-1.82044445h54.72256c0.47331555 0 0.87381333 0.25486222 1.09226667 0.65536a1.45635555 1.45635555 0 0 1 0.14563555 1.31072l-31.67573333 74.01927111c-0.72817778 1.71121778-0.54613333 3.64088889 0.40049778 5.24288a5.17006222 5.17006222 0 0 0 4.36906667 2.47580444h46.89464888c0.58254222 0 1.09226667 0.29127111 1.41994667 0.76458667 0.29127111 0.50972445 0.36408889 1.09226667 0.10922667 1.6384-13.54410667 31.56650667-27.05180445 62.91456-40.52309334 94.04416-1.34712889 3.09475555-1.92967111 5.38851555-1.71121778 6.84487111 0.47331555 3.16757333 2.25735111 4.76956445 5.31569778 4.80597334l29.67324445 0.18204444c1.71121778 0.03640889 2.25735111 0.87381333 1.56558222 2.54862222l-19.18748445 45.14702222a3.78652445 3.78652445 0 0 1-3.64088888 2.51221334c-30.14656 0.36408889-51.22730667 0.36408889-63.24224-0.18204444-19.87925333-0.91022222-24.75804445-18.31367111-17.03936-36.26325334l27.27025778-63.64273778a1.38353778 1.38353778 0 0 0-0.10922667-1.23790222 1.23790222 1.23790222 0 0 0-1.09226667-0.61895111zM190.58232889 694.00803555h-21.48124444l-21.04433778-49.40686222a1.60199111 1.60199111 0 0 1 0.10922666-1.49276444 1.45635555 1.45635555 0 0 1 1.23790222-0.72817778l29.70965334-0.07281778a6.95409778 6.95409778 0 0 0 6.80846222-7.09973333l0.80099556-262.03477333a2.54862222 2.54862222 0 0 1 2.51221333-2.62144h51.11808c2.40298667 0 3.60448 1.27431111 3.64088889 3.78652444 0.21845333 88.72846222 0.21845333 175.92775111 0 261.63427556-0.14563555 35.17098667-16.45681778 59.20085333-53.41184 58.03576888z" fill="#FFFFFF" p-id="3081"></path><path d="M670.08739555 694.00803555h-193.91374222l25.99594667-58.6183111a3.45884445 3.45884445 0 0 1 3.38602667-2.22094223l47.47719111 0.07281778c1.67480889 0 2.54862222-0.83740445 2.54862222-2.54862222v-177.85742223c0-1.52917333-0.72817778-2.29376-2.18453333-2.29376l-31.49368889-0.03640888c-1.41994667 0-2.54862222-1.23790222-2.54862223-2.73066667v-57.05272889c0-0.87381333 0.65536-1.60199111 1.49276445-1.60199111h128.37774222c1.60199111 0 2.36657778 0.83740445 2.36657778 2.51221333l0.07281778 56.43377778c0 1.6384-0.80099555 2.47580445-2.40298667 2.47580444h-31.74855111c-1.45635555 0-2.18453333 0.76458667-2.18453333 2.29376v177.74819556c0 1.71121778 0.83740445 2.54862222 2.43939555 2.54862222l50.31708445 0.10922667c1.38353778 0 2.07530667 0.72817778 2.07530666 2.18453333L670.08739555 694.04444445zM901.02897778 394.65415111c39.61287111-27.23384889 67.50208 42.19790222 24.10268444 54.10360889-7.06332445 1.96608-18.31367111 2.07530667-33.71463111 0.36408889-1.38353778-0.14563555-2.03889778-0.91022222-2.03889778-2.36657778-0.21845333-16.384-3.45884445-41.72458667 11.65084445-52.06471111zM354.20387555 598.79879111l-26.2144 61.05770667c-2.36657778 5.46133333-4.95160889 5.57056-7.8279111 0.43690667-19.29671111-34.87971555-25.85031111-63.35146667-29.63683556-106.71445334-2.91271111-33.67822222-5.42492445-67.35644445-7.60945778-101.10748444-0.07281778-1.52917333 0.61895111-2.29376 2.07530667-2.29376l53.12056889 0.03640888c1.49276445 0 2.33016889 0.80099555 2.43939555 2.3301689 2.73066667 39.24878222 5.60696889 78.38833778 8.59249778 117.41866666 0.76458667 10.04885333 2.47580445 18.38648889 5.09724445 25.01290667a4.73315555 4.73315555 0 0 1-0.0364089 3.82293333zM75.09333333 596.54144v-2.51221333a25.70467555 25.70467555 0 0 0 4.73315556-11.50520889c3.93216-43.32657778 7.13614222-86.61674667 9.64835556-129.94332445 0.10922667-1.34712889 0.76458667-2.03889778 2.03889777-2.03889778h54.24924445c0.47331555 0 0.94663111 0.21845333 1.31072 0.61895112 0.32768 0.36408889 0.50972445 0.87381333 0.47331555 1.38353778a7226.07217778 7226.07217778 0 0 1-9.57553777 119.67601777c-2.54862222 28.94506667-11.79648 67.68412445-31.1296 91.16785778-1.23790222 1.49276445-2.29376 1.34712889-3.09475556-0.47331555L75.09333333 596.54144zM445.08046222 694.00803555h-78.57038222l-10.01244445-3.96856888c-1.41994667-0.54613333-1.82044445-1.52917333-1.16508444-2.94912l24.64881778-56.43377778c0.72817778-1.6384 1.89326222-2.25735111 3.56807111-1.82044444 26.94257778 7.31818667 58.14499555 4.29624889 85.70652445 4.40547555 1.71121778 0.03640889 2.18453333 0.87381333 1.45635555 2.47580445l-25.63185778 58.25422222z" fill="#FFFFFF" p-id="3082"></path></svg>',
                    //     },
                    //     link: ' https://www.xiaohongshu.com/user/profile/5fb74015000000000101cf9f?xsec_token=YBKk6t_WPLRgqaTv7FNXhV6n3ALcrS_55mBOeHa99r_Sw=&xsec_source=app_share&xhsshare=CopyLink&appuid=5fb74015000000000101cf9f&apptime=1748939765&share_id=0f13c11e6e6d4bc18ed60586644749d7',
                    // },
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
        ['script', { src: '/ppweb.js', type: 'module' }],
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
