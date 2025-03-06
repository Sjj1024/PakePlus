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

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed')
    // 在这里执行你的代码
})

window.onload = function () {
    console.log('onload Page fully loaded')
    // 在这里执行你的代码
}

window.addEventListener('load', function () {
    console.log('addEventListener Page fully loaded')
    // 在这里执行你的代码
})
