;(async () => {
    // 获取github release latest.json file
    const ppnotesJson = await fetch('/ppnotes.json')
    const ppnotesJsonData = await ppnotesJson.json()
    console.log('ppnotesJsonData', ppnotesJsonData)
    if (ppnotesJsonData.show) {
        // 创建模态框元素
        const modal = document.createElement('div')
        modal.className = 'modalBox'

        // 模态框内容
        modal.innerHTML = `
        <div class="modalContent">
            <h1 class="modalTitle">PakePlus公告</h1>
            <p class="modalNotes">${ppnotesJsonData.zh}</p>
            <div class="modalButtons">
                <button id="modalOk">确定</button>
            </div>
        </div>
        `
        // 添加到文档
        document.body.appendChild(modal)

        // 添加点击事件
        document.getElementById('modalOk').addEventListener('click', () => {
            modal.remove()
            if (ppnotesJsonData.openUrl) {
                window.open(ppnotesJsonData.openUrl, '_blank')
            }
        })
    }
})()
