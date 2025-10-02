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
    const htmlFiles = ['index_zh.html', 'index_en.html', 'index_ja.html']
    htmlFiles.forEach((file) => {
        fs.cpSync(
            path.join(__dirname, '../docs', file),
            path.join(__dirname, '../docs/dist', file),
            { recursive: true }
        )
    })
}

// 根据参数 修改vitepress base 或者 copy /docs/static 到 /docs/dist/static
const callFunc = process.argv[2]
console.log('callFunc', callFunc)
if (callFunc === 'gitBase') {
    gitBase()
} else if (callFunc === 'copyStatic') {
    copyStatic()
}
