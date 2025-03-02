const fs = require('fs')
const path = require('path')

// build  target dir
/*
macos aarch64
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/PakePlus_0.5.6_aarch64.dmg
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/aarch64-apple-darwin/release/bundle/macos/PakePlus.app
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/aarch64-apple-darwin/release/bundle/macos/PakePlus.app.tar.gz
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/aarch64-apple-darwin/release/bundle/macos/PakePlus.app.tar.gz.sig


macos x86_64
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/x86_64-apple-darwin/release/bundle/dmg/PakePlus_0.5.6_x64.dmg
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/x86_64-apple-darwin/release/bundle/macos/PakePlus.app
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/x86_64-apple-darwin/release/bundle/macos/PakePlus.app.tar.gz
/Users/runner/work/PakePlus/PakePlus/src-tauri/target/x86_64-apple-darwin/release/bundle/macos/PakePlus.app.tar.gz.sig


linux x86_64
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/deb/PakePlus_0.5.6_amd64.deb
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/rpm/PakePlus-0.5.6-1.x86_64.rpm
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage.sig
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage.tar.gz
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage.tar.gz.sig
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/deb/pake-plus_0.5.6_amd64.deb
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/rpm/pake-plus-0.5.6-1.x86_64.rpm
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage.sig
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage.tar.gz
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage.tar.gz.sig


linux arm64
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/deb/PakePlus_0.5.6_amd64.deb
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/rpm/PakePlus-0.5.6-1.x86_64.rpm
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage.sig
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage.tar.gz
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/PakePlus_0.5.6_amd64.AppImage.tar.gz.sig
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/deb/pake-plus_0.5.6_amd64.deb
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/rpm/pake-plus-0.5.6-1.x86_64.rpm
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage.sig
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage.tar.gz
/home/runner/work/PakePlus/PakePlus/src-tauri/target/release/bundle/appimage/pake-plus_0.5.6_amd64.AppImage.tar.gz.sig



windows x86_64
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\msi\PakePlus_0.5.6_x64_en-US.msi
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\msi\PakePlus_0.5.6_x64_en-US.msi.sig
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\msi\PakePlus_0.5.6_x64_en-US.msi.zip
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\msi\PakePlus_0.5.6_x64_en-US.msi.zip.sig
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\nsis\PakePlus_0.5.6_x64-setup.exe
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\nsis\PakePlus_0.5.6_x64-setup.exe.sig
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\nsis\PakePlus_0.5.6_x64-setup.nsis.zip
D:\a\PakePlus\PakePlus\src-tauri\target\release\bundle\nsis\PakePlus_0.5.6_x64-setup.nsis.zip.sig


windows arm64
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\msi\PakePlus_0.5.6_arm64_en-US.msi
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\msi\PakePlus_0.5.6_arm64_en-US.msi.sig
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\msi\PakePlus_0.5.6_arm64_en-US.msi.zip
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\msi\PakePlus_0.5.6_arm64_en-US.msi.zip.sig
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\nsis\PakePlus_0.5.6_arm64-setup.exe
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\nsis\PakePlus_0.5.6_arm64-setup.exe.sig
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\nsis\PakePlus_0.5.6_arm64-setup.nsis.zip
D:\a\PakePlus\PakePlus\src-tauri\target\aarch64-pc-windows-msvc\release\bundle\nsis\PakePlus_0.5.6_arm64-setup.nsis.zip.sig

*/

// get dist dir
const distDir = path.join(__dirname, '../target')

// get all files in dist dir
const files = fs.readdirSync(distDir)

// rename files
files.forEach((file) => {
    const filePath = path.join(distDir, file)
    console.log('dist file Path', filePath)
})
