import { invoke } from '@tauri-apps/api/core'
import { Base64 } from 'js-base64'
import githubApi from '@/apis/github'
import { open } from '@tauri-apps/plugin-dialog'
import { readDir } from '@tauri-apps/plugin-fs'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { join } from '@tauri-apps/api/path'

// 分支
export const mainBranch = 'main'
export const webBranch = 'web'
export const devBranch = 'dev'

// urlMap
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

// Open a selection dialog for image files
export const openSelect = async (filters: any) => {
    const selected = await open({
        directory: true,
        multiple: false,
        filters: filters,
    })
    return selected
}

// read dir recursively
export const readDirRecursively = async (path: string): Promise<string[]> => {
    const entries = await readDir(path)
    const fileList: string[] = []
    for (const entry of entries) {
        const fullPath = await join(path, entry.name)
        if (entry.isDirectory) {
            const subDirFiles = await readDirRecursively(fullPath)
            fileList.push(...subDirFiles)
        } else {
            fileList.push(fullPath)
        }
    }
    return fileList
}
// 是否为开发环境
export const isDev = import.meta.env.DEV

export const buildTime = import.meta.env.BUILD_TIME

// 是否为tauri环境
export const isTauri = (window as any).__TAURI__ ? true : false

// 打开url
export const openUrl = async (url: string) => {
    if (isTauri) {
        await invoke('open_url', { url })
    } else {
        window.open(url, '_blank')
    }
}

// 是否为字母数字
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

// tauri config
export const tauriConfig = {
    windows: {
        label: '',
        title: '',
        url: '',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        width: 800,
        height: 600,
        theme: null,
        resizable: true,
        fullscreen: false,
        maximized: false,
        minWidth: 400,
        minHeight: 300,
        maxWidth: 1920,
        maxHeight: 1080,
        decorations: true,
        transparent: false,
        titleBarStyle: 'Visible',
        visible: true,
        focus: true,
        closable: true,
        minimizable: true,
        maximizable: true,
        alwaysOnTop: false,
        alwaysOnBottom: false,
        center: false,
        skipTaskbar: false,
        tabbingIdentifier: null,
        parent: null,
        dragDropEnabled: true,
        browserExtensionsEnabled: false,
        devtools: true,
        contentProtected: false,
        hiddenTitle: false,
        incognito: false,
        proxyUrl: null,
        useHttpsScheme: false,
        zoomHotkeysEnabled: false,
        acceptFirstMouse: false,
        create: false,
        // if add additionalBrowserArgs, windows cant preview, but can build
        // additionalBrowserArgs:
        //     '--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection --autoplay-policy=no-user-gesture-required --auto-accept-camera-and-microphone-capture',
    },
}

// 初始化项目
export const initProject = {
    name: '',
    node_id: '',
    url: '',
    showName: '',
    appid: '',
    icon: '',
    iconRound: true,
    state: true,
    injectJq: false,
    tauriApi: false,
    version: '0.0.1',
    platform: 'desktop',
    width: 800,
    height: 600,
    desc: '',
    jsFile: [],
    filterCss: '',
    customJs: '',
    isHtml: false,
    htmlPath: '',
    htmlFiles: [],
    more: tauriConfig,
}

// 转换为本地时间
export const convertToLocalTime = (utcDateTime: string) => {
    // Create a new Date object from the UTC date-time string
    let date = new Date(utcDateTime)
    // Get the local time as a string
    let localTime = date.toLocaleString()
    // Return the local time string
    return localTime
}

// base64 encode
export const base64Encode = (str: string) => {
    return Base64.encode(str)
}

// base64 decode
export const base64Decode = (str: string) => {
    return Base64.decode(str)
}

// 读取文件内容
export const readFile = async (fileName: string) => {
    try {
        const response = await fetch(`/${fileName}`)
        if (!response.ok) {
            throw new Error('文件读取失败')
        }
        return response.text()
    } catch (error) {
        console.error('读取文件时出错:', error)
        return 'error'
    }
}

// update_build_file
export const updateBuildFile = async (data: any) => {
    if (isTauri) {
        const content = await invoke('update_build_file', data)
        return content
    } else {
        let content = await readFile('build.yml')
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
        let content = await readFile('custom.js')
        if (content === 'error') {
            return 'error'
        }
        return content
    }
}

// get custom js
export const getCustomJsFetch = async () => {
    let content = await readFile('custom.js')
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
        let content = await readFile('build.yml')
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

// get build.yml file content
export const getBuildYmlFetch = async (params: any) => {
    let content = await readFile('build.yml')
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
        let content = await readFile('cargo.txt')
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
    let content = await readFile('cargo.txt')
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

// get tauri.conf.json file content
export const getTauriConf = async (params: any) => {
    if (isTauri) {
        const content = await invoke('update_config_file', params)
        return content
    } else {
        let content = await readFile('config.json')
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
    let content = await readFile('config.json')
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
export const getInitRust = async (params: any) => {
    // 将visible: true 替换为 visible: false
    params.config = JSON.parse(params.config)
    params.config.visible = false
    params.config = JSON.stringify(params.config)
    console.log('getInitRust params', params)
    if (isTauri) {
        const content = await invoke('update_init_rs', params)
        return content
    } else {
        let content = await readFile('init.rs')
        if (content === 'error') {
            return 'error'
        }
        // 替换WINDOWCONFIG
        content = content.replaceAll('WINDOWCONFIG', params.config)
        // 替换STATE
        if (!params.state) {
            content = content.replaceAll('if true {', 'if false {')
        }
        if (params.injectjq) {
            // 替换INJECTJQ
            content = content.replaceAll(
                '.initialization_script(include_str!("../../data/custom.js"))',
                `.initialization_script(include_str!("../../data/jquery.min.js"))\r.initialization_script(include_str!("../../data/custom.js"))`
            )
        }
        return base64Encode(content)
    }
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
    let content = await readFile('init.rs')
    if (content === 'error') {
        return 'error'
    }
    // 替换WINDOWCONFIG
    content = content.replaceAll('WINDOWCONFIG', params.config)
    // 替换STATE
    if (!params.state) {
        content = content.replaceAll('if true {', 'if false {')
    }
    if (params.injectjq) {
        // 替换INJECTJQ
        content = content.replaceAll(
            '.initialization_script(include_str!("../../data/custom.js"))',
            `.initialization_script(include_str!("../../data/jquery.min.js"))\r.initialization_script(include_str!("../../data/custom.js"))`
        )
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
export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

// 绘制苹果风格圆角路径
const drawAppleStylePath = (ctx: any, width: number, height: number) => {
    const radius = Math.min(width, height) * 0.15 // 圆角半径比例
    const controlOffset = radius * 0.55 // 控制点偏移量

    ctx.beginPath()

    // 左上角
    ctx.moveTo(radius, 0)
    ctx.bezierCurveTo(controlOffset, 0, 0, controlOffset, 0, radius)

    // 左下角
    ctx.lineTo(0, height - radius)
    ctx.bezierCurveTo(
        0,
        height - controlOffset,
        controlOffset,
        height,
        radius,
        height
    )

    // 右下角
    ctx.lineTo(width - radius, height)
    ctx.bezierCurveTo(
        width - controlOffset,
        height,
        width,
        height - controlOffset,
        width,
        height - radius
    )

    // 右上角
    ctx.lineTo(width, radius)
    ctx.bezierCurveTo(
        width,
        controlOffset,
        width - controlOffset,
        0,
        width - radius,
        0
    )

    ctx.closePath()
}

// 使用 Canvas 裁剪图片为圆角
export const cropImageToRound = (image: any) => {
    const canvas = document.createElement('canvas')
    const ctx: any = canvas.getContext('2d')

    // 设置画布大小与图片一致
    canvas.width = image.width
    canvas.height = image.height

    // 绘制苹果风格圆角路径
    drawAppleStylePath(ctx, canvas.width, canvas.height)

    // 裁剪图片
    ctx.clip()
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // 将裁剪后的图片转换为 Base64
    return canvas.toDataURL('image/png')
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

// save image file to datadir
// const saveImage = async (fileName: string, base64: string) => {
//     // base64 to arraybuffer
//     const imageArrayBuffer = base64ToArrayBuffer(base64)
//     // save file
//     const imageData = new Uint8Array(imageArrayBuffer)
//     // get app data dir
//     const appDataPath = await appDataDir()
//     console.log('appDataPath------', appDataPath)
//     const targetDir = await join(appDataPath, 'assets')
//     const savePath = await join(targetDir, fileName)
//     // confirm target dir
//     await mkdir(targetDir, { recursive: true })
//     // const savePath = await join(appDataPath, 'assets', fileName)
//     // save file to app data dir
//     await writeFile(savePath, imageData)
//     console.log(`Image saved to: ${savePath}`)
//     store.currentProject.icon = savePath
//     // save image asseturl to project
//     store.addUpdatePro({
//         ...store.currentProject,
//         name: store.currentProject.name,
//         appid: store.currentProject.appid,
//         debug: pubForm.model,
//         icon: savePath,
//         more: store.currentProject.more,
//     })
// }

// update build.yml file content
// const updateMainRs = async () => {
//     // get CargoToml file sha
//     const shaRes = await getFileSha(
//         'src-tauri/src/main.rs',
//         store.currentProject.name
//     )
//     console.log('get CargoToml file sha', shaRes)
//     if (shaRes.status === 200 || shaRes.status === 404) {
//         // get CargoToml file content
//         const configContent: any = await invoke('update_main_rust', {
//             appUrl: store.currentProject.url,
//             appName: store.currentProject.showName,
//             userAgent: platforms[store.currentProject.platform].userAgent,
//             width: store.currentProject.width,
//             height: store.currentProject.height,
//         })
//         const updateRes: any = await githubApi.updateMainRsFile(
//             store.userInfo.login,
//             'PakePlus',
//             {
//                 message: 'update main rust from pakeplus',
//                 content: configContent,
//                 sha: shaRes.data.sha,
//                 branch: store.currentProject.name,
//             }
//         )
//         if (updateRes.status === 200) {
//             console.log('updateRes', updateRes)
//         } else {
//             console.error('updateRes error', updateRes)
//         }
//     } else {
//         console.error('getFileSha error', shaRes)
//     }
// }

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

// get img url
// const getImgUrl = (filePath: string) => {
//     if (filePath) {
//         const timestamp = new Date().getTime()
//         return `${convertFileSrc(filePath)}?t=${timestamp}`
//     } else {
//         return pakePlusIcon
//     }
// }

// check project type and creat branch
export const createBranch = async (user: string, project: string, sha: any) => {
    // create web branch
    console.log('creat branch')
    const res: any = await githubApi.createBranch(user, 'PakePlus', {
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
//     // const content = await readFile('build.yml')
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
        const pathParts = file.webkitRelativePath.split('/')
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
    let firstSlashIndex = file.webkitRelativePath.indexOf('/')
    if (firstSlashIndex === -1) {
        // 如果没有斜杠，直接返回原路径
        return 'src/' + file.name
    }
    // 替换根路径为 "src"
    return 'src' + file.webkitRelativePath.slice(firstSlashIndex)
}
