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

// update build time
gitBase()
