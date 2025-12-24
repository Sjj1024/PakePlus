const { invoke } = window.__TAURI__.core
const { ask, confirm, message, open, save } = window.__TAURI__.dialog
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
                    : 'https://hk.gh-proxy.org/https://github.com/Sjj1024/PakePlus/blob/main/app-icon.png',
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
    // open dialog
    document
        .querySelector('#openAskDialog')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('open dialog')
            const answer = await ask(
                'This action cannot be reverted. Are you sure?',
                {
                    title: 'PakePlus',
                    kind: 'warning',
                }
            )
            console.log('answer', answer)
            resultElement.textContent = answer
        })

    // open confirm dialog
    document
        .querySelector('#openConfirmDialog')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('open confirm dialog')
            const answer = await confirm(
                'This action cannot be reverted. Are you sure?',
                {
                    title: 'PakePlus',
                    kind: 'warning',
                }
            )
            console.log('answer', answer)
            resultElement.textContent = answer
        })

    // open message dialog
    document
        .querySelector('#openMessageDialog')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            await message('File not found', {
                title: 'PakePlus',
                kind: 'error',
            })
        })

    // open file dialog
    document
        .querySelector('#openFileDialog')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('open file dialog')
            // Open a dialog
            const file = await open({
                multiple: false,
                directory: false,
            })
            console.log('file', file)
            resultElement.textContent = file
        })
    // open directory dialog
    document
        .querySelector('#openDirDialog')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('open directory dialog')
            const file = await open({
                multiple: false,
                directory: true,
            })
            console.log('file', file)
            resultElement.textContent = file
        })

    // open save dialog
    document
        .querySelector('#openSaveDialog')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('open save dialog')
            const path = await save({
                filters: [
                    {
                        name: 'filesave',
                        extensions: ['png', 'jpeg'],
                    },
                ],
            })
            console.log('path', path)
            resultElement.textContent = path
        })
})
