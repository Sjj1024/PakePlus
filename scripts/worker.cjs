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

// update build.yml
const updateBuildYml = () => {
    console.log('updateBuildYml in pakeplus......')
}

// 是否为字母数字
const isAlphanumeric = (showName) => {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(showName)
}

// update Cargo.toml
const updateCargoToml = async (name, version, desc, debug, single) => {
    console.log('updateCargoToml......')
    const cargoTomlPath = path.join(__dirname, '../src-tauri/Cargo.toml')
    const cargoToml = fs.readFileSync(cargoTomlPath, 'utf-8')
    // 更新 name, version, desc, debug, single
    let newCargoToml = cargoToml
        .replace('PakePLus', name)
        .replace('0.0.1', version)
        .replace('Project Desc', desc)
        .replace(
            '"protocol-asset"',
            debug ? '"protocol-asset", "devtools"' : '"protocol-asset"'
        )
    if (single) {
        newCargoToml = newCargoToml.replace(
            'tauri-plugin-store = "2.0.0"',
            'tauri-plugin-store = "2.0.0" \rtauri-plugin-single-instance = "2"\r'
        )
    }
    fs.writeFileSync(cargoTomlPath, newCargoToml)
    console.log('updateCargoToml success')
}
// update tauri.conf.json
const updateTauriConfig = (showName, version, id, tauriApi) => {
    console.log('updateTauriConfig......')
    const tauriConfigPath = path.join(__dirname, '../src-tauri/tauri.conf.json')
    const tauriConfig = fs.readFileSync(tauriConfigPath, 'utf-8')
    const ascii = isAlphanumeric(showName)
    // 更新 showName, version, id, tauriApi
    const newTauriConfig = tauriConfig
        .replace('PakePlus', showName)
        .replace('0.0.1', version)
        .replace('com.pakeplus.app', id)
        .replace(
            '"targets": "all"',
            ascii
                ? '"targets": "all"'
                : '"targets": ["deb", "appimage", "nsis", "app", "dmg"]'
        )
        .replace(
            '"withGlobalTauri": true',
            tauriApi ? '"withGlobalTauri": true' : '"withGlobalTauri": false'
        )
    fs.writeFileSync(tauriConfigPath, newTauriConfig)
    console.log('updateTauriConfig success')
}

// update init.rs
const updateInitRs = (isHtml, winState, injectJq, winConfig) => {
    console.log('updateInitRs......')
    const initRsPath = path.join(__dirname, '../src-tauri/src/utils/init.rs')
    const initRs = fs.readFileSync(initRsPath, 'utf-8')
    winConfig.label = 'main'
    winConfig.visible = false
    if (isHtml) {
        winConfig.url = 'index.html'
    }
    // 更新 init.rs
    const newInitRs = initRs
        .replace('{"url": "index.html"}', JSON.stringify(winConfig))
        .replace('if true {', winState ? 'if true {' : 'if false {')
        .replace(
            '.initialization_script(include_str!("../../data/custom.js"))',
            injectJq
                ? '.initialization_script(include_str!("../../data/jquery.min.js"))\r.initialization_script(include_str!("../../data/custom.js"))'
                : '.initialization_script(include_str!("../../data/custom.js"))'
        )
    fs.writeFileSync(initRsPath, newInitRs)
    console.log('updateInitRs success')
}
// update lib.rs
const updateLibRs = (single) => {
    console.log('updateLibRs......')
    if (!single) {
        console.log('single is false, skip updateLibRs')
        return
    }
    const libRsPath = path.join(__dirname, '../src-tauri/src/lib.rs')
    const libRs = fs.readFileSync(libRsPath, 'utf-8')
    const newLibRs = libRs.replace(
        '.plugin(tauri_plugin_opener::init())',
        `.plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_single_instance::init(|app, _, _| {
                utils::init::show_window(app);
            }))
        `
    )
    fs.writeFileSync(libRsPath, newLibRs)
    console.log('updateLibRs success')
}

// set github env
const setGithubEnv = (name, version, pubBody) => {
    console.log('setGithubEnv......')
    const envPath = process.env.GITHUB_ENV
    if (!envPath) {
        console.error('GITHUB_ENV is not defined')
        return
    }
    try {
        const entries = {
            NAME: name,
            VERSION: version,
            PUBBODY: pubBody,
        }
        for (const [key, value] of Object.entries(entries)) {
            if (value !== undefined) {
                fs.appendFileSync(envPath, `${key}=${value}\n`)
            }
        }
        console.log('✅ Environment variables written to GITHUB_ENV')
    } catch (err) {
        console.error('❌ Failed to parse config or write to GITHUB_ENV:', err)
    }
    console.log('setGithubEnv success')
}

// 初始化项目环境
const main = async () => {
    const {
        iconPath,
        tempPath,
        icnsPath,
        name,
        version,
        desc,
        debug,
        showName,
        id,
        tauriApi,
        pubBody,
    } = ppconfig.desktop
    const winConfig = ppconfig.more.windows
    const { isHtml, single, state, injectJq } = ppconfig
    console.log('iconPath, tempPath, icnsPath', iconPath, tempPath, icnsPath)
    // 输入 PNG 文件路径
    const inputPath = path.join(__dirname, iconPath)
    // 临时输出带圆角和 padding 的 PNG 文件路径
    const tempOutputPath = path.join(__dirname, tempPath)
    // 输出 ICNS 文件路径
    const icnsOutputPath = path.join(__dirname, icnsPath)
    // 创建 icon
    await createIcon(inputPath, tempOutputPath, icnsOutputPath)
    // 更新 cargo.toml
    updateCargoToml(name, version, desc, debug, single)
    // 更新 tauri.conf.json
    updateTauriConfig(showName, version, id, tauriApi)
    // 更新 init.rs
    updateInitRs(isHtml, state, injectJq, winConfig)
    // 更新 lib.rs
    updateLibRs(single)
    // set github env
    setGithubEnv(name, version, pubBody)
}

// run main
try {
    main()
} catch (error) {
    console.error('Error in main:', error)
}
