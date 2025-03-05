const hookClick = (e) => {
    console.log('hookClick', e)
    const origin = e.target.closest('a')
    if (origin && origin.href && origin.target === '_blank') {
        let param = { url: origin.href }
        console.log('param', param)
    }
}

document.addEventListener('click', hookClick)

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
