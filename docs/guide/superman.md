# Advanced Usage

For developers who need to debug frontend projects or handle large `dist` directories (which may exceed GitHub API size/quantity limits in PakePlus), here's an advanced workflow to sync your `dist` directory to GitHub for compilation:

1. **Create a Project in PakePlus**  
   Example: Name your project `deepseek`.

2. **Clone Your PakePlus Repository**  
   After token verification, PakePlus automatically forks these repositories to your GitHub account:

    - `PakePlus` (desktop)
    - `PakePlus-Android` (mobile)
    - `PakePlus-iOS` (mobile)  
      Clone the relevant repository based on your target platform.

3. **Sync Your `dist` Directory**

    - Fetch all branches (`git fetch --all`). Your project branch (e.g., `deepseek`) will be available.
    - Checkout the branch (`git checkout deepseek`).
    - Replace the contents of the `src` directory with your `dist` files.
    - (Optional) Customize the app icon by replacing `app-icon.png` (must be 1024×1024 PNG).
    - Modify configurations in `scripts/ppconfig.json`:

    ```json
    {
      "name": "english_name",
      "showName": "Display Name",
      "version": "1.0.0",
      "id": "com.unique.id.app",
      "desc": "Project description",
      "webUrl": "index.html",
      "iconPath": "../../app-icon.png",
      "inputPath": "../../app-icon.png",
      "tempPath": "./processed-image.png",
      "icnsPath": "../../src-tauri/icons/icon.icns",
      "pubBody": "Release notes",
      "isHtml": true,
      "single": true/false,  // Single-instance mode
      "state": true/false,   // Window state persistence
      "injectJq": true/false, // jQuery injection
      "tauriApi": true/false, // Tauri API access
      "debug": true/false    // Debug mode
    }
    ```

    - Platform-specific settings: Use `desktop`, `android`, or `ios` fields.

4. **Trigger Compilation**

    - Push changes to your repository (`git push origin deepseek`).
    - Manually trigger GitHub Actions:
        - Select the `deepseek` branch.
        - Click "Run workflow" and wait for completion (~10 mins).

5. **Download Your App**  
   Once compiled, the release will appear in PakePlus’s **Releases** section.
    - Desktop: `.dmg` (macOS) / `.exe` (Windows)
    - Mobile: `.apk` (Android) / `.ipa` (iOS)

> **Note**: Image paths updated to `../static` as requested. For issues, contact support via WeChat (`lanxingme`) or our developer community.
