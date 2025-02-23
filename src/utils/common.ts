import { open } from '@tauri-apps/plugin-shell'

export const urlMap = {
    github: 'https://github.com/Sjj1024/PakePlus',
    weixin: 'https://github.com/Sjj1024/PakePlus',
    qq: '',
    email: '1024xiaoshen@gmail.com',
    website: '',
    x: '',
    google: '',
    csdn: 'https://xiaoshen.blog.csdn.net/',
    juejin: 'https://juejin.cn/user/70007368988926',
    windowsConfig: 'https://v2.tauri.app/reference/config/#windowconfig',
}

export const openUrl = async (url: string) => {
    await open(url)
}

export const isAlphanumeric = (str: string) => {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(str)
}

export const CSSFILTER = `
// css filter
document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                CSSFILTER
            }
        }
    })
    observer.observe(targetNode, config)
})
// end css filter
`

export const initProject = {
    name: '',
    node_id: '',
    url: '',
    showName: '',
    appid: '',
    icon: '',
    version: '0.0.1',
    platform: 'desktop',
    width: 800,
    height: 600,
    desc: '',
    jsFile: [],
    filterCss: '',
    more: {
        windows: {
            label: '',
            url: '',
            userAgent: '',
            fileDropEnabled: true,
            center: false,
            width: 800,
            height: 600,
            minWidth: null,
            minHeight: null,
            maxWidth: null,
            maxHeight: null,
            resizable: true,
            maximizable: true,
            minimizable: true,
            closable: true,
            title: '',
            fullscreen: false,
            focus: false,
            transparent: false,
            maximized: false,
            visible: true,
            decorations: true,
            alwaysOnTop: false,
            contentProtected: false,
            skipTaskbar: false,
            titleBarStyle: 'Visible',
            hiddenTitle: false,
            acceptFirstMouse: false,
            tabbingIdentifier: '',
            additionalBrowserArgs: '',
        },
    },
}

export const isDev = import.meta.env.DEV
