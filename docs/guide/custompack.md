# Custom Build

::: info Advantages of Custom Build
<Badge type="tip" text="Unlimited Number of Projects" />
<Badge type="tip" text="Unlimited Build Frequency" />
<Badge type="tip" text="Unlimited Number of Files" />
<Badge type="tip" text="File Size Limit Relaxed to 25M" />
<Badge type="tip" text="More Custom Build Options" />
:::

If you are a developer and want to debug your frontend project, or if your `dist` directory is particularly large with many files, but PakePlus restricts file size and quantity due to GitHub API limitations, you can use advanced methods to sync your `dist` directory to a GitHub repository and achieve compilation and release.

## Steps

1. First, create a project on PakePlus, for example, a project named: `deepseek`.

2. Then, clone your PakePlus repository to your local machine.  
   After each user fills in and verifies their token on PakePlus, the PakePlus/PakePlus-Android/PakePlus-iOS repository is automatically forked to their GitHub account. You can find your PakePlus repository under your GitHub account and clone it locally.  
   Note: If you want to build for desktop, clone `PakePlus`; if you want to build for mobile, clone `PakePlus-Android` or `PakePlus-iOS`.

3. Use Git commands to pull all branches of your repository. There will definitely be a branch named: `deepseek`.  
   After switching to the `deepseek` branch, copy the contents of your `dist` folder into the `src` directory, then commit and push the changes to your repository.  
   If you also want to modify the app icon, you can replace the `app-icon.png` file in the project root directory with your own icon file and commit it to your repository.  
   Note: The `app-icon.png` file must be in PNG format, named exactly `app-icon.png`, and sized 1024x1024 pixels.  
   To modify configuration information such as the software name, edit the `scripts/ppconfig.json` file in the project root directory.  
   Modify the `desktop` field for desktop, the `android` field for Android, and the `ios` field for iOS.

```
"name": "English Name",
"showName": "Display Name",
"version": "Version Number",
"id": "com.uniqueid.app",
"desc": "Project Description",
"webUrl": "index.html",
"iconPath": "../app-icon.png",
"inputPath": "../app-icon.png",
"tempPath": "./processed-image.png",
"icnsPath": "../src-tauri/icons/icon.icns",
"pubBody": "Release Description",
"isHtml": true,
"single": Whether single-instance mode, true/false,
"state": Whether to maintain state, true/false,
"injectJq": Whether to inject jQuery, true/false,
"tauriApi": Whether to inject Tauri API, true/false,
"debug": Whether to enable debug mode, true/false,
```

4. After making the changes, push this branch to your repository, then trigger the compilation in GitHub Actions.  
   When triggering, remember to select the branch as `deepseek`, then click "Run workflow" and wait for the compilation to complete.

5. After the release is complete, go to the PakePlus release page to download your software.
