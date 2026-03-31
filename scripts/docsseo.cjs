// 获取docs/dist/zh/index.html内容
const fs = require('fs')
const path = require('path')

const indexHtml = fs.readFileSync(
    path.join(__dirname, '../docs/dist/zh/index.html'),
    'utf-8'
)
console.log(indexHtml)

// 修改 head 中的 title 为 PakePlus 官方网站
const newIndexHtml = indexHtml.replace(
    '<title>PakePlus</title>',
    '<title>PakePlus 官网 - 网页秒变桌面/手机应用 - 开源免费</title>'
)
console.log(newIndexHtml)

// 将新的 index.html 写入 docs/dist/zh/index.html
fs.writeFileSync(
    path.join(__dirname, '../docs/dist/zh/index.html'),
    newIndexHtml
)
