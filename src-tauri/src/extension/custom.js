/*
 * This file serves as a collection point for external JS and CSS dependencies.
 * It amalgamates these external resources for easier injection into the application.
 * Additionally, you can directly include any script files in this file
 * that you wish to attach to the application.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有带 target="_blank" 的链接
    const links = document.querySelectorAll('a[target="_blank"]')

    // 遍历并修改 target 属性
    links.forEach((link) => {
        link.setAttribute('target', '_self')
    })

    console.log(
        'All target="_blank" attributes have been replaced with target="_self".'
    )
})
