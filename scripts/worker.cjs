const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const png2icons = require('png2icons')
const ppconfig = require('./ppconfig.json')

// 给图片添加圆角并添加 padding
const createIcon = async (inputPath, tempOutputPath, icnsOutputPath) => {
    sharp(inputPath)
        .resize({
            // 确保图片尺寸一致
            width: 1024,
            height: 1024,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .composite([
            // rx ry是圆角半径
            {
                input: Buffer.from(
                    `<svg>
         <rect x="0" y="0" width="1024" height="1024" rx="250" ry="250" />
       </svg>`
                ),
                blend: 'dest-in',
            },
        ])
        // top/bottom/left/right 是 padding
        .extend({
            top: 120,
            bottom: 120,
            left: 120,
            right: 120,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toFile(tempOutputPath)
        .then(() => {
            console.log(
                'Image processing complete with rounded corners and padding.'
            )

            // 读取处理后的 PNG 文件
            fs.readFile(tempOutputPath, (err, data) => {
                if (err) {
                    console.error('Error reading processed PNG file:', err)
                    return
                }

                // 转换 PNG 到 ICNS 格式
                const icnsBuffer = png2icons.createICNS(data, 1, 0)
                if (icnsBuffer) {
                    fs.writeFile(icnsOutputPath, icnsBuffer, (writeErr) => {
                        if (writeErr) {
                            console.error('Error writing ICNS file:', writeErr)
                        } else {
                            console.log(
                                'ICNS file created successfully:',
                                icnsOutputPath
                            )
                            // 删除临时文件
                            fs.remove(tempOutputPath)
                        }
                    })
                } else {
                    console.error('Failed to convert PNG to ICNS.')
                }
            })
        })
        .catch((err) => {
            console.error('Error during image processing:', err)
        })
}

// 初始化项目环境
const main = async () => {
    const { iconPath, tempPath, icnsPath } = ppconfig.desktop
    console.log('iconPath, tempPath, icnsPath', iconPath, tempPath, icnsPath)
    // 输入 PNG 文件路径
    const inputPath = path.join(__dirname, iconPath)
    // 临时输出带圆角和 padding 的 PNG 文件路径
    const tempOutputPath = path.join(__dirname, tempPath)
    // 输出 ICNS 文件路径
    const icnsOutputPath = path.join(__dirname, icnsPath)
    // 创建 icon
    await createIcon(inputPath, tempOutputPath, icnsOutputPath)
}

// run
main()
