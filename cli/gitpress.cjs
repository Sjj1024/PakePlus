// 修改vitepress base
const fs = require('fs')
const path = require('path')

// 修改vitepress base
function gitBase() {
    console.log('gitBase')
    const base = '/PakePlus/'
    const configPath = path.join(__dirname, '../docs/.vitepress/config.ts')
    const config = fs.readFileSync(configPath, 'utf-8')
    const newConfig = config.replace("base: '/'", `base: '${base}'`)
    console.log('newConfig', newConfig)
    fs.writeFileSync(configPath, newConfig)
}

function copyStatic() {
    console.log('copyStatic')
    const staticPath = path.join(__dirname, '../docs/static')
    const distStaticPath = path.join(__dirname, '../docs/dist/static')
    fs.cpSync(staticPath, distStaticPath, { recursive: true })
    // 将index_zh.html 复制到 dist/
    // 将index_en.html 复制到 dist/
    // 将index_ja.html 复制到 dist/
    fs.copyFileSync(
        path.join(staticPath, 'index_zh.html'),
        path.join('../docs/dist', 'index_zh.html')
    )
    fs.copyFileSync(
        path.join(staticPath, 'index_en.html'),
        path.join('../docs/dist', 'index_en.html')
    )
    fs.copyFileSync(
        path.join(staticPath, 'index_ja.html'),
        path.join('../docs/dist', 'index_ja.html')
    )
}

// 根据参数 修改vitepress base 或者 copy /docs/static 到 /docs/dist/static
const callFunc = process.argv[0]
console.log('callFunc', callFunc)
if (callFunc === 'gitBase') {
    gitBase()
} else if (callFunc === 'copyStatic') {
    copyStatic()
}
