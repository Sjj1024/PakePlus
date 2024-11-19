document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        console.log('juejin auto signin ')
        const singleBtn = document.querySelector('.signin-btn')
        if (singleBtn && singleBtn.innerText === '签到') {
            singleBtn.click()
        }
        // click
        const signinBtn = document.querySelector(
            'div.code-calender > button.signin'
        )
        if (signinBtn && signinBtn.innerText === '签到') {
            signinBtn.click()
        }
    })
    observer.observe(targetNode, config)
})
