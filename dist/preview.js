const { listen } = window.__TAURI__.event

const jsContent = sessionStorage.getItem('pakeplus_js')
if (jsContent) {
    console.log('js init eval....')
    eval(jsContent)
} else {
    console.log('js init not eval....')
    //initContent
}

listen('js_change', (event) => {
    console.log('listen change....', event)
    const jsContent = event.payload.code
    sessionStorage.setItem('pakeplus_js', jsContent)
    window.location.reload()
})
