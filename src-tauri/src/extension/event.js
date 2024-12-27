document.addEventListener('click', (event) => {
    console.log('click a link', event)
    const target = event.target.closest('a')
    if (target && target.hasAttribute('download')) {
        console.log('文件下载中:', target.href)
    }
})
