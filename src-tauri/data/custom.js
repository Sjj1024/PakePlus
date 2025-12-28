console.log('custom.js ----')

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
})

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
    console.log('fullscreenchange')
})

// Safari / WebKit
document.addEventListener('webkitfullscreenchange', () => {
    console.log('webkitfullscreenchange')
})
