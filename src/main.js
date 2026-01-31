const { invoke } = window.__TAURI__.core
const { ask, confirm, message, open, save } = window.__TAURI__.dialog
// file
const {
    create,
    writeTextFile,
    writeFile,
    readTextFile,
    BaseDirectory,
    readFile,
    open: openFile,
    remove,
    readDir,
    copyFile,
    stat,
    exists,
    readTextFileLines,
    rename,
    truncate,
    mkdir,
    watch,
    watchImmediate,
    lstat,
    size,
} = window.__TAURI__.fs
// join
const { join, downloadDir } = window.__TAURI__.path
// webview window
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
    // video test
    document
        .querySelector('#videoTest')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('video test')
            // 当前页面url
            window.location.href = 'https://hlsjs.video-dev.org/demo/'
        })
    // create file
    document
        .querySelector('#createFile')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('create file')
            const file = await create('pakeplus.txt', {
                baseDir: BaseDirectory.Download,
            })
            await file.write(
                new TextEncoder().encode('Hello PakePlus Create File Test')
            )
            await file.close()
            console.log('file', file)
        })
    // write text file
    document
        .querySelector('#writeTextFile')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('write text file')
            const file = await writeTextFile(
                'pakeplus.txt',
                'Hello PakePlus Write Text File Test',
                {
                    baseDir: BaseDirectory.Download,
                }
            )
            console.log('file', file)
            resultElement.textContent = file
        })
    // write binary file
    document
        .querySelector('#writeBinaryFile')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('write binary file')
            // 创建Canvas
            const canvas = document.createElement('canvas')
            canvas.width = 100
            canvas.height = 100
            const ctx = canvas.getContext('2d')

            // 绘制红色方块
            ctx.fillStyle = '#ff0000'
            ctx.fillRect(0, 0, 100, 100)

            // 绘制文字
            ctx.fillStyle = '#ffffff'
            ctx.font = '20px Arial'
            ctx.fillText('PakePlus', 30, 50)

            // 转换为PNG并保存
            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/png', 1.0)
            })

            if (!blob) throw new Error('无法创建Blob')
            const arrayBuffer = await blob.arrayBuffer()
            const uint8Array = new Uint8Array(arrayBuffer)
            console.log('uint8Array11', uint8Array)
            const file = await writeFile('pakeplus_test.png', uint8Array, {
                baseDir: BaseDirectory.Download,
            })
            console.log('file', file)
            resultElement.textContent = file
        })
    // read text file
    document
        .querySelector('#readTextFile')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('read text file')
            const file = await readTextFile('pakeplus.txt', {
                baseDir: BaseDirectory.Download,
            })
            console.log('file', file)
            resultElement.textContent = file
        })
    // read binary file
    document
        .querySelector('#readBinaryFile')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('read binary file')
            const file = await readFile('pakeplus_test.png', {
                baseDir: BaseDirectory.Download,
            })
            console.log('file', file)
            resultElement.textContent = file
        })
    // read file
    document.querySelector('#readFile').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('read file')
        const file = await readFile('pakeplus.txt', {
            baseDir: BaseDirectory.Download,
        })
        console.log('file', file)
        resultElement.textContent = file
    })
    // open file
    document.querySelector('#openFile').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('open file')
        const file = await openFile('pakeplus.txt', {
            read: true,
            baseDir: BaseDirectory.Download,
        })
        console.log('file', file)
        resultElement.textContent = file
        await file.close()
    })
    // read directory
    document.querySelector('#readDir').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('read directory')
        const dir = await readDir('pakeplus', {
            baseDir: BaseDirectory.Download,
        })
        console.log('dir', dir)
        resultElement.textContent = dir
    })
    // mkdir
    document.querySelector('#mkdir').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('mkdir')
        const dir = await mkdir('pakeplus', {
            baseDir: BaseDirectory.Download,
        })
        console.log('dir', dir)
        resultElement.textContent = dir
    })
    // watch
    document.querySelector('#watch').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('watch')
        const watcher = await watch('pakeplus.txt', (event) => {
            console.log('event', event)
        })
        console.log('watcher', watcher)
    })
    // watch immediate
    document
        .querySelector('#watchImmediate')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            console.log('watch immediate')
            const watcher = await watchImmediate('pakeplus.txt', (event) => {
                console.log('event', event)
            })
            console.log('watcher', watcher)
        })
    // size
    document.querySelector('#size').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('size')
        const downloadPath = await downloadDir()
        const pptextPath = await join(downloadPath, 'pakeplus.txt')
        console.log('pptextPath', pptextPath)
        const sizeResult = await size(pptextPath)
        console.log('size', sizeResult)
        resultElement.textContent = sizeResult
    })
    // exists
    document.querySelector('#exists').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('exists')
        const existsResult = await exists('pakeplus.txt', {
            baseDir: BaseDirectory.Download,
        })
        console.log('exists', existsResult)
        resultElement.textContent = existsResult
    })
    // remove
    document.querySelector('#remove').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('remove')
        const removeRes = await remove('pakeplus.txt', {
            baseDir: BaseDirectory.Download,
        })
        console.log('removeResult', removeRes)
        resultElement.textContent = removeRes
    })
    // copy file
    document.querySelector('#copyFile').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('copy file')
        const copyRes = await copyFile('pakeplus.txt', 'pakeplus_copy.txt', {
            fromPathBaseDir: BaseDirectory.Download,
            toPathBaseDir: BaseDirectory.Download,
        })
        console.log('copyResult', copyRes)
        resultElement.textContent = copyRes
    })
    // rename
    document.querySelector('#rename').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('rename')
        const renameRes = await rename('pakeplus.txt', 'pakeplus_new.txt', {
            oldPathBaseDir: BaseDirectory.Download,
            newPathBaseDir: BaseDirectory.Download,
        })
        console.log('renameResult', renameRes)
        resultElement.textContent = renameRes
    })
    // truncate
    document.querySelector('#truncate').addEventListener('click', async (e) => {
        e.preventDefault()
        console.log('truncate')
        const truncate = await truncate('pakeplus.txt', {
            baseDir: BaseDirectory.Download,
        })
        console.log('truncate', truncate)
        resultElement.textContent = truncate
    })
})

function onFullscreenChange() {
    const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement

    console.log('fullscreen change', !!isFullscreen)
}

// 标准
document.addEventListener('fullscreenchange', onFullscreenChange)

// Safari 旧实现
document.addEventListener('webkitfullscreenchange', onFullscreenChange)
