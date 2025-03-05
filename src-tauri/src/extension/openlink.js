const hookClick = (e) => {
    console.log('hookClick', e)
    e.preventDefault()
    const origin = e.target.closest('a')
    if (origin && origin.href) {
        let param = { url: origin.href }
        console.log('param', param)
        location.href = param.url
    }
}

document.addEventListener('click', hookClick, { capture: true })
