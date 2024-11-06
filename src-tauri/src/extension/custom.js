/*
 * This file serves as a collection point for external JS and CSS dependencies.
 * It amalgamates these external resources for easier injection into the application.
 * Additionally, you can directly include any script files in this file
 * that you wish to attach to the application.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 获取页面的 HTML 内容
    let htmlContent = document.documentElement.innerHTML
    // 使用正则表达式替换所有 target="_blank" 为 target="_self"
    htmlContent = htmlContent.replace(/target="_blank"/g, 'target="_self"')
    // 将修改后的内容重新设置到页面
    document.documentElement.innerHTML = htmlContent
    console.log(
        'All target="_blank" attributes have been replaced with target="_self".'
    )
})

document.addEventListener('DOMContentLoaded', () => {
    // 保存原始的 window.open 函数
    const originalWindowOpen = window.open
    // 重写 window.open，强制其在当前页面打开
    window.open = function (url, target, features) {
        // 将 target 替换为 '_self'（当前页面）
        return originalWindowOpen.call(window, url, '_self', features)
    }
    console.log('window.open has been overridden to open in the current page.')
})
