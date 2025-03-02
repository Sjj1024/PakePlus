const fs = require('fs')
const path = require('path')

// get dist dir
const distDir = path.join(__dirname, '../dist')

// get all files in dist dir
const files = fs.readdirSync(distDir)

// rename files
files.forEach((file) => {
    const filePath = path.join(distDir, file)
    console.log('dist file Path', filePath)
})
