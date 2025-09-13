window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded analytics')
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893'
    script.async = true
    document.head.appendChild(script)
    const bodyScript = document.createElement('script')
    bodyScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-W5GKHM0893');
`
    document.body.appendChild(bodyScript)
})
