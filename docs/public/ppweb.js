const initLang = () => {
    const isFirst = sessionStorage.getItem('first_visit')
    if (isFirst) {
        console.log('cookieLang is not empty')
    } else {
        const browserLang = navigator.language
        const isChinese = window.location.href.includes('zh')
        if (browserLang === 'zh-CN') {
            if (!isChinese) {
                const path = window.location.pathname
                const newUrl = `/zh${path}`
                window.location.href = newUrl
            }
        } else {
            if (isChinese) {
                const path = window.location.pathname
                const newUrl = path.replace('/zh', '')
                console.log('else newUrl', newUrl)
                window.location.href = newUrl
            } else {
                return
            }
        }
        sessionStorage.setItem('first_visit', 'true')
    }
}

const createNotes = (title, content, okText, openUrl) => {
    const modal = document.createElement('div')
    modal.className = 'modalBox'
    // modal content
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
        if (openUrl) {
            window.open(openUrl, '_blank')
        }
    })
}

const initNotes = async () => {
    const ppnotesJson = await fetch('/ppnotes.json')
    const ppnotesJsonData = await ppnotesJson.json()
    console.log('ppnotesJsonData', ppnotesJsonData)
    const isChinese = window.location.href.includes('zh')
    const contentValue = isChinese ? ppnotesJsonData.zh : ppnotesJsonData.en
    const titleValue = isChinese ? 'PackPlus公告' : 'PakePlus Notice'
    const okTextValue = isChinese ? '确定' : 'OK'
    if (ppnotesJsonData.show) {
        createNotes(
            titleValue,
            contentValue,
            okTextValue,
            ppnotesJsonData.openUrl
        )
    } else {
        console.log('ppnotesJsonData.show is false')
    }
}

// init lang and notes
initLang()
initNotes()
