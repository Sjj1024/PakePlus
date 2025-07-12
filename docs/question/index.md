# Problem self inspection

If there are problems, self-examination is often more effective.

1. Self inspection in PP issues often yields results: https://github.com/Sjj1024/PakePlus/issues
2. Check if you have modified the configuration or script files and try using the original configuration
3. Check if the token permissions are given correctly, or try filling in the token again (do not manually create a repository with the same name as PakePlus/PakePlus-Android/PakePlus-iOS)
4. Have you consulted in the group before? If not, try asking in the group first. [Join the group for communication] (../exchange/index. md)
5. For network issues, please check if you are using a proxy or cloud computer. You can try switching the proxy or network.
6. If certain features are not supported, they can be resolved through sponsoring PP for quick priority development.
7. Windows users are advised to uninstall rogue software, such as domestic monitoring software like 360, otherwise they should solve the problem themselves

# The Mac application has malfunctioned

![](../static/imgs/macerror.png)
This is because Apple did not give you money, so Apple will reject your application.

terms of settlement:

1.  -   -   Mac users may see a warning saying 'App is damaged' during installation. \*\*Please click 'Cancel', run the following command, and then reopen the app: (This is because the app requires an official signature to avoid the prompt 'App is damaged' after installation, but the official signature fee is $99 per year... Therefore, you need to manually bypass the signature to use it normally)

```sh
sudo xattr -r -d com.apple.quarantine /Applications/PakePlus.app
```

2.  -   -   When you package an application, Mac users may see a warning saying "the application is damaged" during installation. \*\*Please click 'Cancel', then run the following command, enter your computer password, and reopen the application:

```sh
Sudo xattr - r - d com. apple. quarkine/Applications/Your software name. app
```

# Cannot drag files or elements

Reason:[ https://v2.tauri.app/reference/config/#dragdropenabled ](https://v2.tauri.app/reference/config/#dragdropenabled)  
solution
In more configurations, simply turn off the dragDropEnabled option

#White screen or error message after packaging

Create a test package, then right-click on the check element to see if there are any errors. If there are any errors, solve them based on the error information.
If you cannot understand the error message or cannot solve it, you can join the group for communication. I recommend trying Deepseek to see if it can help you solve the problem.

# Window top

In more configurations, simply enable alwaysOnTop

# Full screen mode

In more configurations, simply enable fullscreen

# Dispatch error: 404

Confirm if the token permissions are configured correctly, and then try filling in the token again. This is often caused by incorrect token permission configuration.

# Cannot read properties of undefined XXX

Using the latest version of PakePlus and filling in the token can solve 99% of the problems.
