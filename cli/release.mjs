// scripts/release.mjs

import { createRequire } from 'module'
import { execSync } from 'child_process'
import fs from 'fs'

import updatelog from './updatelog.mjs'

const require = createRequire(import.meta.url)

async function release() {
    const flag = process.argv[2] ?? 'patch'
    const packageJson = require('../package.json')
    let [a, b, c] = packageJson.version.split('.').map(Number)

    if (flag === 'major') {
        // 主版本
        a += 1
        b = 0
        c = 0
    } else if (flag === 'minor') {
        // 次版本
        b += 1
        c = 0
    } else if (flag === 'patch') {
        // 补丁版本
        c += 1
    } else {
        console.log(`Invalid flag "${flag}"`)
        process.exit(1)
    }

    const nextVersion = `${a}.${b}.${c}`
    packageJson.version = nextVersion

    const nextTag = `v${nextVersion}`
    await updatelog(nextTag, 'release')

    // 将新版本写入 package.json 文件
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))

    // 提交修改的文件，打 tag 标签（tag 标签是为了触发 github action 工作流）并推送到远程
    execSync('git add ./package.json ./UPDATE_LOG.md')
    execSync(`git commit -m "v${nextVersion}"`)
    execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`)
    execSync(`git push`)
    execSync(`git push origin v${nextVersion}`)
    console.log(`Publish Successfully...`)
}

release().catch(console.error)
