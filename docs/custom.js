let isSignin = localStorage.getItem('isSignin') === 'true'

document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        // if login, then signin
        const loginBtn = document.querySelector(
            'li.nav-item.auth > div > button'
        )
        if (loginBtn && loginBtn.innerText.includes('登录')) {
            console.log('user nedd login')
            return
        } else {
            const singleBtn = document.querySelector('.signin-btn')
            console.log('juejin auto signin', singleBtn, isSignin)
            if (
                singleBtn &&
                singleBtn.innerText.includes('去签到') &&
                !isSignin
            ) {
                singleBtn.click()
            }
            // click
            const signinBtn = document.querySelector(
                'div.code-calender > button.signin'
            )
            console.log('juejin auto signin', signinBtn)
            if (
                signinBtn &&
                signinBtn.innerText.includes('立即签到') &&
                !isSignin
            ) {
                signinBtn.click()
                isSignin = true
                localStorage.setItem('isSignin', 'true')
            }
        }
    })
    observer.observe(targetNode, config)
})
