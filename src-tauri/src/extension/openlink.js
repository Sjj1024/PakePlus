const hookClick = (e) => {
    e.preventDefault()
    const origin = e.target.closest('a')
    if (origin && origin.href) {
        location.href = origin.href
    }
}

document.addEventListener('click', hookClick, { capture: true })
