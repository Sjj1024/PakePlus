;(async () => {
    // get github release latest.json file
    const ppnotesJson = await fetch('/ppnotes.json')
    const ppnotesJsonData = await ppnotesJson.json()
    console.log('ppnotesJsonData', ppnotesJsonData)
    if (ppnotesJsonData.show) {
        // create modal box element
        const modal = document.createElement('div')
        modal.className = 'modalBox'

        // modal content
        modal.innerHTML = `
        <div class="modalContent">
            <h1 class="modalTitle">PakePlus公告</h1>
            <p class="modalNotes">${ppnotesJsonData.zh}</p>
            <div class="modalButtons">
                <button id="modalOk">确定</button>
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
