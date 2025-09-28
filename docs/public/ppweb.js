;(async () => {
    // get github release latest.json file
    const ppnotesJson = await fetch('/ppnotes.json')
    const ppnotesJsonData = await ppnotesJson.json()
    console.log('ppnotesJsonData', ppnotesJsonData)
    if (ppnotesJsonData.show) {
        // create modal box element
        const modal = document.createElement('div')
        modal.className = 'modalBox'
        const isChinese = window.location.href.includes('zh')
        const content = isChinese ? ppnotesJsonData.zh : ppnotesJsonData.en
        const title = isChinese ? 'PackPlus公告' : 'PakePlus Notice'
        const okText = isChinese ? '确定' : 'OK'
        modal.innerHTML = `
        <div class="modalContent">
            <h1 class="modalTitle">${title}</h1>
            <p class="modalNotes">${content}</p>
            <div class="modalButtons">
                <button id="modalOk">${okText}</button>
            </div>
        </div>
        `
        // add to document
        document.body.appendChild(modal)

        // add click event
        document.getElementById('modalOk').addEventListener('click', () => {
            modal.remove()
            if (ppnotesJsonData.openUrl) {
                window.open(ppnotesJsonData.openUrl, '_blank')
            }
        })
    }
})()
