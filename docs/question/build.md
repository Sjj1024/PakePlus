# Compilation Failed

There are several common reasons for compilation failures:

1. The project was not filled out in the standardized format. Although we've tried our best to enforce standardization, some oversights may still occur.
2. Project dependencies were not properly installed, possibly due to network issues or version incompatibilities.
3. The project configuration file was not properly filled out, either due to incorrect format or wrong file paths.
4. Incorrect token permissions configuration may lead to compilation failures with 403 errors.

# "Cannot read properties of undefined (reading 'sha')"

The most common causes for this error are:

1. Manually forked the PackPlus repository without unchecking "Copy the main branch only".
2. This project automatically forks a template repository named PackPlus - do not delete this repository or GitHub compilation will fail.
3. Do not delete or modify all contents in the PackPlus repository, as this may also cause the error.
4. This error may occur after upgrading PackPlus versions.

# Solutions

1. The quickest solution is to delete your PackPlus repository, then reopen PackPlus and re-enter your Token to restart the process (this will delete your previously created projects).

Steps to delete your PackPlus repository:
- Open your PackPlus repository
- Click Settings and scroll to the bottom
- Click "Delete this repository"
- Click "I want to delete this repository"
- Click "I have read and understand these effects"
- Enter your full PackPlus repository name
- Click "Delete this repository"

2. If the issue persists, contact me on WeChat: lanxingme, or join our support group to ask other users for help.