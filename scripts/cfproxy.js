addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // 定义 GitHub 原始域名和你的加速域名
    const GITHUB_HOST = 'github.com'
    const GITHUB_RAW_HOST = 'raw.githubusercontent.com'
    const GITHUB_USER_CONTENT_HOST = 'githubusercontent.com'

    const url = new URL(request.url)

    // 验证 URL 是否合法
    if (!url || !url.pathname.includes('PakePlus')) {
        return new Response('Invalid PakePlus release URL', { status: 400 })
    }

    // 匹配 GitHub 资源路径
    if (
        url.pathname.startsWith('/gh/') ||
        url.pathname.startsWith('/github/')
    ) {
        // 构造新的 GitHub URL
        let newUrl = new URL(
            url.pathname.replace(/^\/gh\/|^\/github\//, ''),
            `https://${GITHUB_HOST}`
        )

        // 处理 raw.githubusercontent.com 的请求
        if (url.pathname.includes('/raw/')) {
            newUrl = new URL(
                url.pathname.replace(/^\/gh\/|^\/github\//, ''),
                `https://${GITHUB_RAW_HOST}`
            )
        }

        // 处理 user content 的请求
        if (url.hostname.includes(GITHUB_USER_CONTENT_HOST)) {
            newUrl = new URL(
                url.pathname,
                `https://${GITHUB_USER_CONTENT_HOST}`
            )
        }

        // 复制原始请求的 headers
        const headers = new Headers(request.headers)

        // 修改必要的 headers
        headers.set('Host', newUrl.hostname)
        headers.delete('Referer')

        // 发起代理请求
        const response = await fetch(newUrl.toString(), {
            method: request.method,
            headers: headers,
            body: request.body,
        })

        // 复制 GitHub 的响应 headers
        const newHeaders = new Headers(response.headers)

        // 设置 CORS 头（可选）
        newHeaders.set('Access-Control-Allow-Origin', '*')

        // 缓存设置（建议缓存 GitHub 资源）
        newHeaders.set('Cache-Control', 'public, max-age=14400') // 4小时缓存

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        })
    }

    // 如果不是 GitHub 资源请求，返回默认响应
    return new Response('Not a GitHub resource request', { status: 404 })
}

// 原始链接
// https://github.com/Aniooy/PakePlus/releases/download/ChatGPT/ChatGPT_0.0.1_x64-setup.exe

// 加速链接
// https://github.PakePlus.com/gh/Aniooy/PakePlus/releases/download/ChatGPT/ChatGPT_0.0.1_x64-setup.exe
