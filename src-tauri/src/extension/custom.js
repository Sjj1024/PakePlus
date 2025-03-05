const hookClick = (e) => {
    console.log('hookClick', e)
    const origin = e.target.closest('a')
    if (origin && origin.href && origin.target === '_blank') {
        let param = { url: origin.href }
        console.log('param', param)
    }
}

document.addEventListener('click', hookClick)
