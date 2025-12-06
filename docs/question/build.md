# Compilation Failed

There are several common reasons for compilation failures:

1. The project was not filled out in the standardized format. Although we've tried our best to enforce standardization, some oversights may still occur.
2. Project dependencies were not properly installed, possibly due to network issues or version incompatibilities.
3. The project configuration file was not properly filled out, either due to incorrect format or wrong file paths.
4. Incorrect token permissions configuration may lead to compilation failures with 403 errors.

# "Cannot read properties of undefined (reading 'sha')"

The most common causes for this error are:

1. Manually forked the PakePlus repository without unchecking "Copy the main branch only".
2. This project automatically forks a template repository named PakePlus - do not delete this repository or GitHub compilation will fail.
3. Do not delete or modify all contents in the PakePlus repository, as this may also cause the error.
4. This error may occur after upgrading PakePlus versions.

## author_id does not have push access

If an error similar to the one below occurs, it may be due to GitHub's misconduct. Wait a day and try filling in the token again. Or maybe there are too many restrictions on GitHub requests today

```
⚠️ GitHub release failed with status: 422
[{"resource":"Release","code":"custom","field":"author_id","message":"author_id does not have push access to xxxxxxx/PakePlus"}]
retrying... (0 retries remaining)
❌ Too many retries. Aborting...
Error: Too many retries.
```

# Solutions

1. The quickest solution is to delete your PakePlus repository, then reopen PakePlus and re-enter your Token to restart the process (this will delete your previously created projects).

Steps to delete your PakePlus repository:

-   Open your PakePlus repository
-   Click Settings and scroll to the bottom
-   Click "Delete this repository"
-   Click "I want to delete this repository"
-   Click "I have read and understand these effects"
-   Enter your full PakePlus repository name
-   Click "Delete this repository"

2. If the issue persists, contact me on WeChat: lanxingme, or join our support group to ask other users for help.
