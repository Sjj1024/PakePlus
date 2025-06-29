export default {
    openUrlBrowser: `
const { invoke } = window.__TAURI__.core
 
if ('__TAURI__' in window) {
    const hookClick = (e) => {
        const origin = e.target.closest('a')
        const isBaseTargetBlank = document.querySelector(
            'head base[target="_blank"]'
        )
        console.log('origin', origin, isBaseTargetBlank)
        invoke('open_url', { url: origin.href })
    }
    document.addEventListener('click', hookClick, { capture: true })
}
    `,
    openUrlCurrent: `
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}
 
document.addEventListener('click', hookClick, { capture: true })
    `,
    openUrlNew: `
const { WebviewWindow } = window.__TAURI__.webviewWindow

const webview = new WebviewWindow('my-label', {
    url: url,
    x: 500,
    y: 500,
    width: 800,
    height: 400,
    focus: true,
    title: 'PakePlus Window',
    alwaysOnTop: true,
    center: true,
    resizable: true,
    transparent: false,
    visible: true,
})
webview.once('tauri://created', function () {
    // webview successfully created
    console.log('new webview created')
})
webview.once('tauri://error', function (e) {
    // an error happened creating the webview
    console.log('new webview error', e)
})
    `,
    runShell: `
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    invoke('run_command', { command: 'ls -l' })
}
    `,
    downloadFile: `
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    await invoke('download_file', {
        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        savePath: 'test.png',
        fileId: 'test',
    })
}`,
    downProgress: `
listen('download_progress', (event: any) => {
    downloadProgress.value = Number(
        ((event.payload.downloaded / event.payload.total) * 100).toFixed(2)
    )
})
    `,
}
