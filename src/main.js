const { invoke } = window.__TAURI__.core
const { WebviewWindow } = window.__TAURI__.webviewWindow

let inputValue
let resultElement

window.addEventListener('DOMContentLoaded', () => {
    inputValue = document.querySelector('#inputValue').value
    resultElement = document.querySelector('#result')
    // open url
    document.querySelector('#openUrl').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('open url')
        await invoke('open_url', {
            url: inputValue ? inputValue : 'https://juejin.cn/',
        })
    })
    // run command
    document
        .querySelector('#runCommand')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('run command')
            const result = await invoke('run_command', {
                command: inputValue ? inputValue : 'node -v',
            })
            console.log('result', result)
            resultElement.textContent = result
        })
    // download file
    document
        .querySelector('#downloadFile')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('download file')
            const result = await invoke('download_file', {
                url: inputValue
                    ? inputValue
                    : 'https://gh-proxy.com/github.com/Sjj1024/PakePlus/releases/latest/download/PakePlus_0.5.30_x64-setup.exe',
                savePath: '',
                fileId: '1111',
            })
            console.log('result', result)
            resultElement.textContent = result
        })
    // get exe dir
    document
        .querySelector('#getExeDir')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('get exe dir')
            const result = await invoke('get_exe_dir')
            console.log('result', result)
            resultElement.textContent = result
        })
    // get env var
    document
        .querySelector('#getEnvVar')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('get env var')
            const result = await invoke('get_env_var', {
                name: inputValue ? inputValue : 'PATH',
            })
            console.log('result', result)
            resultElement.textContent = result
        })
    // find port
    document.querySelector('#findPort').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('find port')
        const result = await invoke('find_port')
        console.log('result', result)
        resultElement.textContent = result
    })
    // open url new
    document
        .querySelector('#openUrlNew')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('open url new')
            const webview = new WebviewWindow('my-label', {
                url: inputValue ? inputValue : 'https://pakeplus.com/',
                center: true,
                width: 800,
                height: 400,
                focus: true,
                title: 'PakePlus Window',
            })
            webview.once('tauri://created', function () {
                console.log('new webview created')
            })
            webview.once('tauri://error', function (e) {
                console.log('new webview error', e)
            })
        })
})
