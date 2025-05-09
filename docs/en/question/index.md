# Application Appears Damaged  

![](../../static/imgs/macerror.png)  
This occurs because the application isn't signed by Apple (which requires a $99/year developer fee).  

### Solutions:  

1. **For Mac Users Installing PakePlus:**  
   If you see the "App is Damaged" warning during installation:  
   - Click **"Cancel"**  
   - Run this command in Terminal, then reopen the app:  

   ```sh
   sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
   ```

2. **For Developers Packaging Apps:**  
   If your users encounter the warning:  
   - Instruct them to click **"Cancel"**  
   - Have them run this command (replacing `YourAppName.app`):  

   ```sh
   sudo xattr -r -d com.apple.quarantine /Applications/YourAppName.app
   ```

> **Note**: These commands remove macOS's quarantine flag, allowing unsigned apps to run. Image paths updated to `../../static`.