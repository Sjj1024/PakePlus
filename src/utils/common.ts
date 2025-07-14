import { invoke } from '@tauri-apps/api/core'
import { Base64 } from 'js-base64'
import githubApi from '@/apis/github'
import { open } from '@tauri-apps/plugin-dialog'
import { readDir } from '@tauri-apps/plugin-fs'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { join } from '@tauri-apps/api/path'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import QRCode from 'qrcode'
import Codes from '@/utils/codes'
import { setTheme } from '@tauri-apps/api/app'

// upstream repo info
export const upstreamUser = import.meta.env.VITE_UPSTREAM_USER
export const ppRepo: string[] = ['PakePlus', 'PakePlus-Android', 'PakePlus-iOS']

export const mainBranch = import.meta.env.VITE_MAIN_BRANCH
export const webBranch = import.meta.env.VITE_WEB_BRANCH
export const devBranch = import.meta.env.VITE_DEV_BRANCH

// global file size limit
export const fileSizeLimit = import.meta.env.VITE_FILE_LIMIT_SIZE * 1024 * 1024
export const fileLimitNumber = import.meta.env.VITE_FILE_LIMIT_NUMBER

// pay info
export const ppApisDomain = import.meta.env.VITE_PPAPI_DOMAIN
export const basePayjsUrl = import.meta.env.VITE_PAYJS_DOMAIN
export const payJsMchid = import.meta.env.VITE_PAYJS_MCHID
export const payJsSignKey = import.meta.env.VITE_PAYJS_SIGN_KEY
export const baseYunPayUrl = import.meta.env.VITE_YUNPAY_DOMAIN
export const yunPayMchid = import.meta.env.VITE_YUNPAY_MCHID
export const yunPaySignKey = import.meta.env.VITE_YUNPAY_SIGN_KEY
export const rhExeUrl = import.meta.env.VITE_LOCAL_RHEXE
export const zPayDomain = import.meta.env.VITE_ZPAY_DOMAIN
export const zPayMchId = import.meta.env.VITE_ZPAY_MCHID
export const zPaySignKey = import.meta.env.VITE_ZPAY_SIGN_KEY

// urlMap
export const urlMap = {
    pakeplus: 'https://www.pakeplus.com',
    github: 'https://github.com/Sjj1024/PakePlus',
    ppofficial: 'https://ppofficial.netlify.app',
    ppnotes: 'https://pakeplus.com/ppnotes.json',
    configdoc: 'https://ppofficial.pages.dev/guide/config.html',
    phonedoc: 'https://www.pakeplus.com/guide/phone.html',
    builddoc: 'https://www.pakeplus.com/guide/build.html',
    questiondoc: 'https://pakeplus.com/question',
    exchange: 'https://www.pakeplus.com/exchange',
    pakeplusdev: 'https://pakeplus.pages.dev',
    weixin: 'https://github.com/Sjj1024/PakePlus',
    qq: '',
    email: '1024xiaoshen@gmail.com',
    website: '',
    x: '',
    google: '',
    csdn: 'https://xiaoshen.blog.csdn.net/',
    juejin: 'https://juejin.cn/user/70007368988926',
    gitee: 'https://gitee.com/xiaoshen-1024',
    bilibili: 'https://space.bilibili.com/405719127?spm_id_from=333.33.0.0',
    twitter: 'https://x.com/1024xiaoshen',
    youtube: 'https://www.youtube.com/@1024xiaoshen',
    douyin: '',
    tiktok: '',
    windowsConfig: 'https://v2.tauri.app/reference/config/#windowconfig',
}

// platform map
export const platformMap = {
    PakePlus: 'desktop',
    'PakePlus-iOS': 'ios',
    'PakePlus-Android': 'android',
}

export const platforms: { [key: string]: PlatformInfo } = {
    desktop: {
        name: 'desktop',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        platform: 'desktop',
        width: 800,
        height: 600,
        direction: 'horizontal',
    },
    iPhone: {
        name: 'iPhone',
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        platform: 'ios',
        width: 430,
        height: 932,
        direction: 'vertical',
    },
    Android: {
        name: 'Android',
        userAgent:
            'Mozilla/5.0 (Linux; Android 14; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
        platform: 'android',
        width: 412,
        height: 915,
        direction: 'vertical',
    },
    iPad: {
        name: 'iPad',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        platform: 'desktop',
        width: 1024,
        height: 768,
        direction: 'horizontal',
    },
    custom: {
        name: 'custom',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        platform: 'desktop',
        width: 1920,
        height: 1080,
        direction: 'horizontal',
    },
}

// 初始化发布
export const initRelease = {
    desktop: {
        url: '',
        assets_url: '',
        upload_url: '',
        html_url: '',
        id: 0,
        node_id: '',
        tag_name: '',
        target_commitish: '',
        name: '',
        draft: false,
        prerelease: false,
        created_at: '2024-09-23T10:46:29Z',
        published_at: '2024-09-23T10:48:30Z',
        assets: [],
        tarball_url: '',
        zipball_url: '',
        body: '',
    },
    ios: {
        url: '',
        assets_url: '',
        upload_url: '',
        html_url: '',
        id: 0,
        node_id: '',
        tag_name: '',
        target_commitish: '',
        name: '',
        draft: false,
        prerelease: false,
        created_at: '2024-09-23T10:46:29Z',
        published_at: '2024-09-23T10:48:30Z',
        assets: [],
        tarball_url: '',
        zipball_url: '',
        body: '',
    },
    android: {
        url: '',
        assets_url: '',
        upload_url: '',
        html_url: '',
        id: 0,
        node_id: '',
        tag_name: '',
        target_commitish: '',
        name: '',
        draft: false,
        prerelease: false,
        created_at: '2024-09-23T10:46:29Z',
        published_at: '2024-09-23T10:48:30Z',
        assets: [],
        tarball_url: '',
        zipball_url: '',
        body: '',
    },
}

// change theme
export const chageTheme = async (theme: string) => {
    if (theme === 'light') {
        document.documentElement.setAttribute('theme', 'light')
        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.add('light')
    } else {
        document.documentElement.setAttribute('theme', 'dark')
        document.querySelector('html')?.classList.remove('light')
        document.querySelector('html')?.classList.add('dark')
    }
    localStorage.setItem('theme', theme)
    if (isTauri) {
        await setTheme(theme === 'light' ? 'light' : 'dark')
    }
}

// support pakeplus
export const supportPP = async () => {
    try {
        const token = localStorage.getItem('token')
        if (isTauri && token) {
            await invoke('support_pp', {
                token,
            })
        } else if (token) {
            await githubApi.followingUser()
            await githubApi.startProgect('PakePlus')
            await githubApi.startProgect('PakePlus-Android')
            await githubApi.startProgect('PakePlus-iOS')
        }
    } catch (error) {
        console.error('supportPP error', error)
    }
}

// 查询系统
export const getOS = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes('Win')) {
        return 'Windows'
    } else if (userAgent.includes('Linux')) {
        return 'Linux'
    } else if (userAgent.includes('Mac')) {
        return 'macOS'
    } else {
        return 'Unknown'
    }
}

// get sep
export const getSep = () => {
    const os = getOS()
    if (os === 'Windows') {
        return '\\'
    }
    return '/'
}

// 替换rootPath
export const replaceRootPath = async (files: string[], rootPath: string) => {
    // 按照路径拆分
    const newFiles: string[] = []
    for (const file of files) {
        const filePath = await join(rootPath, getSep())
        newFiles.push(file.replace(filePath, 'src').replace('\\', '/'))
    }
    return newFiles
}

// 替换单个文件的rootPath
export const replaceFileRoot = async (file: string, rootPath: string) => {
    const filePath = await join(rootPath, getSep())
    return file.replace(filePath, 'src').replace('\\', '/')
}

// Open a selection dialog for image files
export const openSelect = async (directory: boolean = true, filters: any) => {
    const selected = await open({
        directory,
        multiple: false,
        filters,
    })
    return selected
}

// read dir recursively
export const readDirRecursively = async (path: string): Promise<string[]> => {
    const entries = await readDir(path)
    const fileList: string[] = []
    for (const entry of entries) {
        const fullPath = await join(path, entry.name)
        // 过滤隐藏文件
        if (entry.name.startsWith('.')) {
            continue
        }
        if (entry.isDirectory) {
            const subDirFiles = await readDirRecursively(fullPath)
            fileList.push(...subDirFiles)
        } else {
            fileList.push(fullPath)
        }
    }
    return fileList
}

// is dev
export const isDev = import.meta.env.DEV

export const buildTime = import.meta.env.BUILD_TIME

// is tauri
export const isTauri = (window as any).__TAURI__ ? true : false

// open url or file or path
export const openUrl = async (url: string) => {
    console.log('url', url)
    if (isTauri && url) {
        await invoke('open_url', { url })
    } else if (url) {
        window.open(url, '_blank')
    } else {
        ElMessage.error('URL or file path cannot be empty')
    }
}

// is alphanumeric
export const isAlphanumeric = (str: string) => {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(str)
}

// css filter
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

// 转换为本地时间
export const convertToLocalTime = (utcDateTime: string) => {
    // Create a new Date object from the UTC date-time string
    let date = new Date(utcDateTime)
    // Get the local time as a string
    let localTime = date.toLocaleString()
    // Return the local time string
    return localTime
}

// get qrcode
export const getQrcode = async (data: string) => {
    const qrcodeUrl = await QRCode.toDataURL(data)
    return qrcodeUrl
}

// base64 encode
export const base64Encode = (str: string) => {
    return Base64.encode(str)
}

// base64 decode
export const base64Decode = (str: string) => {
    return Base64.decode(str)
}

// read file
export const readStaticFile = async (fileName: string) => {
    try {
        const response = await fetch(`/${fileName}`)
        if (!response.ok) {
            throw new Error('readStaticFile error')
        }
        return response.text()
    } catch (error) {
        console.error('readStaticFile error', error)
        return 'error'
    }
}

// update_build_file
export const updateBuildFile = async (data: any) => {
    if (isTauri) {
        const content = await invoke('update_build_file', data)
        return content
    } else {
        let content = await readStaticFile('build.yml')
        if (content === 'error') {
            return 'error'
        }
        // 替换PROJECTNAME
        content = content.replace('PROJECTNAME', data.name)
        // 替换RELEASEBODY
        content = content.replace('RELEASEBODY', data.body)
        // 使用Base64编码
        const encodedContent = btoa(content)
        return encodedContent
    }
}

// open devtools
export const openDevtools = async () => {
    if (isTauri) {
        console.log('open devtools')
        invoke('open_devtools')
    }
}

// get custom js
export const getCustomJs = async () => {
    if (isTauri) {
        const content = await invoke('get_custom_js')
        return content
    } else {
        let content = await readStaticFile('custom.js')
        if (content === 'error') {
            return 'error'
        }
        return content
    }
}

// get custom js
export const getCustomJsFetch = async () => {
    let content = await readStaticFile('custom.js')
    if (content === 'error') {
        return 'error'
    }
    return content
}

// get build.yml file content
export const getBuildYml = async (params: any) => {
    if (isTauri) {
        const content = await invoke('update_build_file', params)
        return content
    } else {
        let content = await readStaticFile('build.yml')
        if (content === 'error') {
            return 'error'
        }
        // 替换PROJECTNAME
        content = content.replaceAll('PROJECTNAME', params.name)
        // 替换RELEASEBODY
        content = content.replaceAll('RELEASEBODY', params.body)
        return base64Encode(content)
    }
}

// get ppconfig.json file content
export const getPpconfig = async (params: any) => {
    let content = await readStaticFile('ppconfig.json')
    if (content === 'error') {
        return 'error'
    }
}

// get build.yml file content
export const getBuildYmlFetch = async (params: any) => {
    // 因为工作流文件不用更新，所以这里直接读取build.yml
    let content = await readStaticFile('build.yml')
    if (content === 'error') {
        return 'error'
    }
    // 替换PROJECTNAME
    content = content.replaceAll('PROJECTNAME', params.name)
    // 替换RELEASEBODY
    content = content.replaceAll('RELEASEBODY', params.body)
    return base64Encode(content)
}

// get Cargo.toml file content
export const getCargoToml = async (params: any) => {
    if (isTauri) {
        const content = await invoke('update_cargo_file', params)
        return content
    } else {
        let content = await readStaticFile('cargo.txt')
        if (content === 'error') {
            return 'error'
        }
        // 替换NAME
        content = content.replaceAll('PROJECTNAME', params.name)
        // 替换VERSION
        content = content.replaceAll('PROJECTVERSION', params.version)
        // 替换DESC
        content = content.replaceAll('PROJECTDESC', params.desc)
        // 替换DEBUG
        content = content.replaceAll(
            '-3',
            params.debug ? '"protocol-asset", "devtools"' : '"protocol-asset"'
        )
        return base64Encode(content)
    }
}

// get Cargo.toml file content
export const getCargoTomlFetch = async (params: any) => {
    let content = await readStaticFile('cargo.txt')
    if (content === 'error') {
        return 'error'
    }
    if (params.single) {
        content = content.replaceAll(
            '[single]',
            'tauri-plugin-single-instance = "2"'
        )
    } else {
        content = content.replaceAll('[single]', '')
    }
    // 替换NAME
    content = content.replaceAll('PROJECTNAME', params.name)
    // 替换VERSION
    content = content.replaceAll('PROJECTVERSION', params.version)
    // 替换DESC
    content = content.replaceAll('PROJECTDESC', params.desc)
    // 替换DEBUG
    content = content.replaceAll(
        '-3',
        params.debug ? '"protocol-asset", "devtools"' : '"protocol-asset"'
    )
    return base64Encode(content)
}

// get tauri.conf.json file content
export const getTauriConf = async (params: any) => {
    if (isTauri) {
        const content = await invoke('update_config_file', params)
        return content
    } else {
        let content = await readStaticFile('config.json')
        if (content === 'error') {
            return 'error'
        }
        // 替换PROJECTNAME
        content = content.replaceAll('PROJECTNAME', params.name)
        // 替换PROJECTVERSION
        content = content.replaceAll('PROJECTVERSION', params.version)
        // 替换PROJECTID
        content = content.replaceAll('PROJECTID', params.id)
        // 替换TAURIAPI
        content = content.replaceAll('-2', params.tauriApi ? 'true' : 'false')
        // ascii
        content = content.replaceAll(
            '-3',
            params.ascii ? '"all"' : '["deb", "appimage", "nsis", "app", "dmg"]'
        )
        // windowConfig
        content = content.replaceAll('-1', params.windowConfig)
        return base64Encode(content)
    }
}

// get tauri.conf.json file content
export const getTauriConfFetch = async (params: any) => {
    let content = await readStaticFile('config.json')
    if (content === 'error') {
        return 'error'
    }
    //
    if (params.isHtml) {
        content = content.replaceAll(
            '"app": {',
            `"build": {"frontendDist": "../src"},
    "app": {`
        )
    }
    // 替换PROJECTNAME
    content = content.replaceAll('PROJECTNAME', params.name)
    // 替换PROJECTVERSION
    content = content.replaceAll('PROJECTVERSION', params.version)
    // 替换PROJECTID
    content = content.replaceAll('PROJECTID', params.id)
    // 替换TAURIAPI
    content = content.replaceAll('-2', params.tauriApi ? 'true' : 'false')
    // ascii
    content = content.replaceAll(
        '-3',
        params.ascii ? '"all"' : '["deb", "appimage", "nsis", "app", "dmg"]'
    )
    // windowConfig
    content = content.replaceAll('-1', params.windowConfig)
    return base64Encode(content)
}

// get init.rs file content
export const getLibRsFetch = async (params: any) => {
    let content = await readStaticFile('lib.txt')
    if (content === 'error') {
        return 'error'
    }
    // 替换Single
    if (params.single) {
        content = content.replaceAll(
            '.plugin(tauri_plugin_opener::init())',
            `.plugin(tauri_plugin_opener::init())
            .plugin(tauri_plugin_single_instance::init(|app, _, _| {
                utils::init::show_window(app);
            }))
            `
        )
    }
    return base64Encode(content)
}

// get init.rs file content
export const getInitRustFetch = async (params: any) => {
    // 将visible: true 替换为 visible: false
    params.config = JSON.parse(params.config)
    params.config.label = 'main'
    params.config.visible = false
    if (params.isHtml) {
        params.config.url = 'index.html'
    }
    console.log('getInitRust params', params.config)
    params.config = JSON.stringify(params.config)
    let content = await readStaticFile('init.txt')
    if (content === 'error') {
        return 'error'
    }
    // 替换WINDOWCONFIG
    content = content.replaceAll('WINDOWCONFIG', params.config)
    // 替换STATE
    if (!params.state) {
        content = content.replaceAll('if true {', 'if false {')
    }
    return base64Encode(content)
}

// turn base64 to ArrayBuffer
export const base64ToArrayBuffer = (base64: string) => {
    // creat new ArrayBuffer
    const binaryString = atob(base64)
    const len = binaryString.length
    const arrayBuffer = new ArrayBuffer(len)
    const uint8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < len; i++) {
        uint8Array[i] = binaryString.charCodeAt(i)
    }
    return arrayBuffer
}

// arrayBufferToBase64
export const arrayBufferToBase64 = (buffer: Uint8Array) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

// draw standard round path (similar to Sharp effect)
const drawAppleStylePath = (
    ctx: any,
    width: number,
    height: number,
    padding: number = 0
) => {
    const effectiveWidth = width - 2 * padding
    const effectiveHeight = height - 2 * padding
    // adjust radius to 25% of width and height (similar to Sharp version)
    const radius = Math.min(effectiveWidth, effectiveHeight) * 0.24

    // use standard 90 degree arc (control point offset is 0.55228475 of radius)
    const controlOffset = radius * 0.55228475

    ctx.beginPath()

    // top left corner
    ctx.moveTo(padding + radius, padding)
    ctx.bezierCurveTo(
        padding + controlOffset,
        padding,
        padding,
        padding + controlOffset,
        padding,
        padding + radius
    )

    // bottom left corner
    ctx.lineTo(padding, padding + effectiveHeight - radius)
    ctx.bezierCurveTo(
        padding,
        padding + effectiveHeight - controlOffset,
        padding + controlOffset,
        padding + effectiveHeight,
        padding + radius,
        padding + effectiveHeight
    )

    // bottom right corner
    ctx.lineTo(padding + effectiveWidth - radius, padding + effectiveHeight)
    ctx.bezierCurveTo(
        padding + effectiveWidth - controlOffset,
        padding + effectiveHeight,
        padding + effectiveWidth,
        padding + effectiveHeight - controlOffset,
        padding + effectiveWidth,
        padding + effectiveHeight - radius
    )

    // top right corner
    ctx.lineTo(padding + effectiveWidth, padding + radius)
    ctx.bezierCurveTo(
        padding + effectiveWidth,
        padding + controlOffset,
        padding + effectiveWidth - controlOffset,
        padding,
        padding + effectiveWidth - radius,
        padding
    )

    ctx.closePath()
}

// use canvas to crop image to round
export const cropImageToRound = async (
    base64Image: string,
    padding: number = 0
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const ctx: any = canvas.getContext('2d')

        const image = new Image()
        image.onload = () => {
            // set canvas size to image size
            canvas.width = image.width
            canvas.height = image.height

            // transparent background
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // draw round path
            drawAppleStylePath(ctx, canvas.width, canvas.height, padding)

            // crop image
            ctx.save()
            ctx.clip()
            ctx.drawImage(
                image,
                padding,
                padding,
                canvas.width - 2 * padding,
                canvas.height - 2 * padding
            )
            ctx.restore()

            // convert cropped image to Base64
            resolve(canvas.toDataURL('image/png'))
        }

        image.onerror = (error) => {
            reject(new Error('Failed to load image from base64'))
        }

        image.src = base64Image
    })
}

// get base64 image size
export const getImageSize = (base64String: any) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const dimensions = {
                width: img.width,
                height: img.height,
            }
            resolve(dimensions)
        }
        img.onerror = (error) => {
            reject(error)
        }
        img.src = base64String
    })
}

// image url to base64
export const imageToBase64 = async (url: string) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = () => reject(new Error('Image load failed'))
    })
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx: any = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL()
}

// 验证三次分支是否已经创建成功
export const verifyBranch = async (
    user: string,
    repo: string,
    path: string,
    params: any
) => {
    let count = 0
    // wait fork done, enable github action
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('wait verifyBranch......')
        const res = await githubApi.getFileSha(user, repo, path, params)
        if (res.status === 200) {
            console.log('verifyBranch done break')
            break
        }
        count++
        if (count > 3) {
            console.log('verifyBranch done break')
            break
        }
    }
}

// check project type and creat branch
export const createBranch = async (
    user: string,
    project: string,
    repo: string,
    sha: any
) => {
    // create web branch
    const res: any = await githubApi.createBranch(user, repo, {
        ref: `refs/heads/${project}`,
        sha,
    })
    console.log('createBranch', res)
    if (res.status === 201) {
        console.log('first creat branch')
        return true
    } else {
        console.log('not first')
        return false
    }
}

// const jsChange = () => {
//     console.log('js file change', store.currentProject.jsFile)
//     let jsContent = ''
//     for (let jsFile of store.currentProject.jsFile) {
//         const reContent = jsFileContents.value.match(
//             new RegExp(`// ${jsFile}\n(.*)// end ${jsFile}\n`, 's')
//         )
//         if (reContent) {
//             jsContent += reContent[1]
//         }
//     }
//     console.log('jsContent', jsContent)
//     jsFileContents.value = jsContent
//     jsSelOptions.value = store.currentProject.jsFile?.map((item: any) => {
//         return {
//             label: item,
//             value: item,
//         }
//     })
// }

// creat build yml
// const uploadBuildYml = async (_: string = 'main') => {
//     // get build.yml file content
//     // const content = await readStaticFile('build.yml')
//     const content = await updateBuildFile({
//         name: 'PakePlus',
//         body: 'This is a workflow to help you automate the publishing of your PakePlus project to GitHub Packages.',
//     })
//     console.log('content', content)
//     if (content === 'error') {
//         ElMessage.error(t('readFileError'))
//         return
//     }
//     // update build.yml file content
//     const updateRes: any = await githubApi.createBuildYml(
//         store.userInfo.login,
//         'PakePlus',
//         {
//             message: 'update build.yml from pakeplus',
//             content: content,
//         }
//     )
//     if (updateRes.status === 200 || updateRes.status === 201) {
//         console.log('uploadBuildYml Res', updateRes)
//     } else {
//         console.log('uploadBuildYml error, but not important', updateRes)
//     }
// }

// const optionVisible = (value: boolean) => {
//     console.log('optionVisible', value)
//     if (!value) {
//         // close show js option
//         jsSelOptions.value = store.currentProject.jsFile?.map((item: any) => {
//             return {
//                 label: item,
//                 value: item,
//             }
//         })
//         //
//     }
// }

// const jsHandle = async (event: any) => {
//     console.log('js hangle', event.offsetX, event.offsetY)
//     if (
//         (event.offsetX > 230 && event.offsetY > 0) ||
//         event.target instanceof SVGElement ||
//         (event.target instanceof HTMLDivElement &&
//             event.target.classList.contains('el-select__suffix'))
//     ) {
//         console.log('Clicked on an SVG')
//     } else {
//         console.log('Clicked on an element other than SVG')
//         const selected: any = await open({
//             multiple: true,
//             filters: [
//                 {
//                     name: 'File',
//                     extensions: ['js'],
//                 },
//             ],
//         })
//         if (Array.isArray(selected)) {
//             // user selected multiple directories
//             console.log('selected list', selected)
//             const jsFiles: any = []
//             const jsOptions: any = []
//             let jsContents: any = ''
//             for (let file of selected) {
//                 // read js file content
//                 const jsContent = await readTextFile(file)
//                 const fileName = await basename(file)
//                 jsContents += `// ${fileName}\n${jsContent}\n// end ${fileName}\n`
//                 console.log('filename', fileName)
//                 jsOptions.push({
//                     label: fileName,
//                     value: fileName,
//                 })
//                 jsFiles.push(fileName)
//             }
//             store.currentProject.jsFile = jsFiles
//             jsSelOptions.value = jsOptions
//             jsFileContents.value = jsContents
//             console.log('jsFileContents', jsFileContents.value)
//         } else if (selected === null) {
//             // user cancelled the selection
//             console.log('No file selected')
//             return null
//         } else {
//             // user selected a single directory
//             console.log('user selected a single directory')
//         }
//     }
// }

// get latest release assets by tag name
export const getRelease = async (
    user: string,
    repo: string,
    tag: string,
    version: string
) => {
    const releaseRes: any = await githubApi.getReleasesAssets(user, repo, tag)
    console.log('releaseRes', releaseRes)
    if (releaseRes.status === 200 && releaseRes.data.assets.length >= 3) {
        // filter current project version
        const assets = releaseRes.data.assets.filter((item: any) => {
            return item.name.includes(version) || item.name.includes('tar')
        })
        const releaseData = {
            ...releaseRes.data,
            assets: assets.map((asset: any) => {
                return {
                    ...asset,
                    updated_at: convertToLocalTime(asset.updated_at),
                }
            }),
        }
        return releaseData
    } else {
        console.error('releaseRes error', releaseRes)
        return null
    }
}

// copy text
export const copyText = async (text: string) => {
    if (isTauri) {
        await writeText(text)
    } else {
        navigator.clipboard.writeText(text)
    }
}

// loading text
export const loadingText = (text: string) => {
    if (document.querySelector('.el-loading-text')) {
        document.querySelector('.el-loading-text')!.innerHTML = text
    } else {
        console.log('no loading')
    }
}

// is mobile
export const isMobile = () => {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
    )
}

// build file tree
export const buildFileTree = (files: File[]): any => {
    const fileTree: any = {}
    files.forEach((file) => {
        const pathParts = file.webkitRelativePath.split(getSep())
        let current = fileTree
        pathParts.forEach((part, index) => {
            if (index === pathParts.length - 1) {
                current[part] = file
            } else {
                current[part] = current[part] || {}
                current = current[part]
            }
        })
    })
    return fileTree
}

// get file path
export const getFilesName = (files: File[]) => {
    return files.map((file) => {
        return file.name
    })
}

// check includes index.htm
export const includeHtm = (files: string[]) => {
    return files.some((file) => {
        return file.includes('index.htm')
    })
}

// read file as base64
export const readFileAsBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}

// 批量替换根路径为 "src"
export const rootPath = (file: File) => {
    // 找到第一个斜杠的位置
    let firstSlashIndex = file.webkitRelativePath.indexOf(getSep())
    if (firstSlashIndex === -1) {
        // 如果没有斜杠，直接返回原路径
        return 'src/' + file.name
    }
    // 替换根路径为 "src"
    return 'src' + file.webkitRelativePath.slice(firstSlashIndex)
}

// single message tips
let messageDom: any = null
export const oneMessage: any = (options: any) => {
    if (messageDom) messageDom.close()
    messageDom = ElMessage(options)
}

const typeArr = ['success', 'error', 'warning', 'info']
typeArr.forEach((type) => {
    oneMessage[type] = (options: any) => {
        if (typeof options === 'string') options = { message: options }
        options.type = type
        return oneMessage(options)
    }
})

// djb2 hash
export const djb2Hash = (str: string) => {
    // 初始种子
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i)
    }
    return hash >>> 0
}

// create issue
export const createIssue = async (
    name: string,
    showName: string,
    isHtml: boolean,
    url: string,
    label: string,
    title: string,
    repo: string
) => {
    console.log('createIssue', url, label, title)
    await githubApi.createIssue({
        body: `build name: ${name}\r
        show name: ${showName}\r
        build state: ${label}\r
        build type: ${isHtml ? 'html' : 'web'}\r
        client type: ${repo}\r
        pakeplus type: ${isTauri ? 'tauri' : 'web'}\r
        build action: ${url}`,
        title: title,
    })
}

// check last publish date
export const checkLastPublish = () => {
    if (import.meta.env.DEV) return false
    const savedTime = localStorage.getItem('lastClickTime')
    if (!savedTime) return false
    const now = new Date()
    const oneHourAfterClick = new Date(savedTime)
    oneHourAfterClick.setHours(oneHourAfterClick.getHours() + 1)
    return now < oneHourAfterClick
}

// check update
export const isNew = (v1: string, v2: string) => {
    const parts1 = v1.split('.').map(Number)
    const parts2 = v2.split('.').map(Number)
    const maxLength = Math.max(parts1.length, parts2.length)
    for (let i = 0; i < maxLength; i++) {
        const num1 = parts1[i] || 0
        const num2 = parts2[i] || 0
        if (num1 > num2) {
            return true
        } else if (num1 < num2) {
            return false
        }
    }
    return false
}

// get pay sign
export const getPaySign = (data: any, signKey: string) => {
    const filteredAttrs = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== '')
    )
    const sortedKeys = Object.keys(filteredAttrs).sort()
    const queryParts = []
    for (const key of sortedKeys) {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent(filteredAttrs[key] as string)
        queryParts.push(`${encodedKey}=${encodedValue}`)
    }
    const signString = decodeURIComponent(
        queryParts.join('&') + `&key=${signKey}`
    )
    return CryptoJS.MD5(signString).toString().toUpperCase()
}

// base64 png to ico
/**
 * 将 base64 PNG 转换为多尺寸 ICO 文件 Blob
 * @param {string} base64 - base64 编码的 PNG 图片
 * @param {Object} options - 配置项
 * @param {number[]} [options.sizes=[16,32,48,64,128,256]] - ICO 图标尺寸数组
 * @returns {Promise<Uint8Array>} - 返回 ICO 文件的 Blob 对象
 */
export const base64PngToIco = async (base64: string, options: any = {}) => {
    const sizes = options.sizes || [16, 24, 32, 48, 64, 128, 256]
    const img = await loadImage(base64)
    const iconEntries = []
    const iconDataList = []
    let offset = 6 + sizes.length * 16
    for (const size of sizes) {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img as any, 0, 0, size, size)
        const imageData = ctx?.getImageData(0, 0, size, size)
        const bmpData = buildBMP(imageData)
        iconEntries.push(buildIconDirEntry(size, bmpData.length, offset))
        iconDataList.push(bmpData)
        offset += bmpData.length
    }
    const header = new Uint8Array([0, 0, 1, 0, sizes.length, 0])
    const totalSize =
        header.length +
        iconEntries.length * 16 +
        iconDataList.reduce((sum, b) => sum + b.length, 0)
    const icoData = new Uint8Array(totalSize)
    let pos = 0
    icoData.set(header, pos)
    pos += header.length
    iconEntries.forEach((entry) => {
        icoData.set(entry, pos)
        pos += 16
    })
    iconDataList.forEach((data) => {
        icoData.set(data, pos)
        pos += data.length
    })
    return icoData
}

// 加载 base64 PNG 为 Image 对象
const loadImage = (base64: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = base64
    })
}

// 构建 ICO 的 ICONDIRENTRY
const buildIconDirEntry = (
    size: number,
    dataLength: number,
    offset: number
) => {
    const entry = new Uint8Array(16)
    entry[0] = size === 256 ? 0 : size
    entry[1] = size === 256 ? 0 : size
    entry[4] = 1
    entry[5] = 0 // planes
    entry[6] = 32
    entry[7] = 0 // bit count
    new DataView(entry.buffer).setUint32(8, dataLength, true)
    new DataView(entry.buffer).setUint32(12, offset, true)
    return entry
}

// 构建 BMP 格式图像（用于 ICO）
const buildBMP = (imageData: any) => {
    const { width, height, data } = imageData
    const headerSize = 40
    const bytesPerPixel = 4
    const andMaskSize = Math.ceil(width / 32) * 4 * height

    const header = new Uint8Array(headerSize)
    const dv = new DataView(header.buffer)
    dv.setUint32(0, headerSize, true)
    dv.setInt32(4, width, true)
    dv.setInt32(8, height * 2, true)
    dv.setUint16(12, 1, true)
    dv.setUint16(14, 32, true)
    const pixelData = new Uint8Array(width * height * bytesPerPixel)
    for (let y = 0; y < height; y++) {
        const srcRow = y
        const dstRow = height - 1 - y
        for (let x = 0; x < width; x++) {
            const i = (srcRow * width + x) * 4
            const j = (dstRow * width + x) * 4
            pixelData[j] = data[i + 2] // B
            pixelData[j + 1] = data[i + 1] // G
            pixelData[j + 2] = data[i] // R
            pixelData[j + 3] = data[i + 3] // A
        }
    }
    const andMask = new Uint8Array(andMaskSize) // 全0 表示不透明
    return new Uint8Array([...header, ...pixelData, ...andMask])
}

// creat branch by upstream branch
export const creatBranchByUpstream = async (
    userName: string,
    repo: string,
    branch: string
) => {
    console.log('creatBranchByUpstream', repo, branch)
    const upRes: any = await githubApi.getUpstreamCommit(
        upstreamUser,
        repo,
        branch
    )
    console.log('upRes', upRes)
    const upBranchSha = upRes.data.object.sha
    // create branch
    const createRes: any = await githubApi.createBranch(userName, repo, {
        ref: `refs/heads/${branch}`,
        sha: upBranchSha,
    })
    console.log('createRes', createRes)
    if (createRes.status === 201) {
        console.log('createBranchByUpstream success', branch)
    } else {
        console.error('createBranchByUpstream error', createRes)
    }
}

// merge branch and commit(allways use upstream branch)
export const mergeBranch = async (
    userName: string,
    repo: string,
    branch: string
) => {
    console.log('mergeBranch', repo, branch)
    const mergeRes: any = await githubApi.mergeUpdateRep(userName, repo, branch)
    console.log('mergeRes', mergeRes)
    if (mergeRes.status === 200) {
        console.log('mergeBranch success', branch)
    } else if (mergeRes.status === 204) {
        console.log('branch status is up to date', branch)
    } else {
        console.error('mergeBranch error', mergeRes)
    }
}

// sync upstrame all branch
export const syncAllBranch = async (
    token: string,
    userName: string,
    init: boolean = false
) => {
    if (token && init) {
        console.log('syncAllBranch', init)
        for (const repo of ppRepo) {
            console.log('syncAllBranch', repo)
            const upRes: any = await githubApi.getAllBranchs(upstreamUser, repo)
            console.log('up branchs Res', upRes)
            const upBranchs = upRes.data
                ?.map((item: any) => {
                    return {
                        name: item.name,
                        sha: item.commit.sha,
                    }
                })
                .filter(
                    (item: any) =>
                        item.name === 'main' || item.name === webBranch
                )
            console.log('upBranchs', upBranchs)
            const userRes: any = await githubApi.getAllBranchs(userName, repo)
            console.log('user branchs Res', userRes)
            const userBranchs = userRes.data?.map((item: any) => {
                return {
                    name: item.name,
                    sha: item.commit.sha,
                }
            })
            for (const branch of upBranchs) {
                // check branch is exist in userBranchs and sha is same
                const userBranch = userBranchs.find(
                    (item: any) => item.name === branch.name
                )
                console.log('userBranchs---', userBranch)
                if (userBranch && userBranch.sha !== branch.sha) {
                    // merge branch and commit(allways use upstream branch)
                    await mergeBranch(userName, repo, branch.name)
                } else if (userBranch === undefined) {
                    // create branch by upstream branch
                    await creatBranchByUpstream(userName, repo, branch.name)
                }
            }
        }
    }
}

// creat device uuid
export const creatDeviceid = () => {
    let deviceId = localStorage.getItem('deviceId')
    if (!deviceId) {
        deviceId = Date.now() + ''
        localStorage.setItem('deviceId', deviceId)
    }
    return deviceId
}
