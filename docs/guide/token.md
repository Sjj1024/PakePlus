# Obtaining a Token  

Why do you need a GitHub Token? Because the entire compilation and packaging process relies on the GitHub platform, a GitHub token is required to perform these operations. GitHub is an open platform where anyone can create an account and obtain a permanently free token. We sincerely appreciate GitHub's free services. Obtaining a token is simple—if you don't have an account, register one first, then create a token in your personal settings.  

## Steps to Register on GitHub  

1. Visit the GitHub homepage: [https://github.com/](https://github.com/)  
2. Click the `Sign up` button in the top-right corner to go to the registration page.  
3. Fill in your registration details, including username, email, password, etc.  
4. Click the `Sign up for GitHub` button to complete registration.  

## Steps to Create a Token  

```
Token Permission Requirements:  
All repositories: Required to fork the original template repository  
Actions: Used to execute GitHub Actions for packaging and compilation  
Administration: Required for forking repositories and file management  
Contents: Allows adding/deleting/modifying/searching files in the PakePlus repository  
Issues: Enables submitting compilation errors or other issues to PakePlus  
Workflows: Used to compile and package your software  
```

1. Log in to your GitHub account.  
2. Click your profile picture in the top-right corner to go to your personal dashboard.  
3. Click the `Settings` button to enter the settings page.  
4. In the left-hand menu, click `Developer settings` to access developer options.  
5. In the left-hand menu, click `Personal access tokens` to go to the token management page.  
6. Click `Generate new token` to create a new token.  
   GitHub offers two types of tokens—either will work. Use the links below to go directly:  
   [Personal access tokens (classic)](https://github.com/settings/tokens)  
   or  
   [Fine-grained personal access tokens](https://github.com/settings/personal-access-tokens).  

7. **For Personal access tokens (classic):**  
   Simply check the following three permissions: <font color="red">repo, workflow, and user</font>.  
   ![](../static/imgs/token11.png)  
   ![](../static/imgs/token12.webp)  
   Then copy the generated token into PakePlus:  
   ![](../static/imgs/token12.png)  

8. **<font color="red">(Skip this step if you already obtained a token in Step 7. Proceed to Step 9.)</font>**  
   **For Fine-grained personal access tokens:**  
   ![](../static/imgs/token1.png)  
   - Click `Generate new token`.  
   - Enter a token name, set expiration to "No expiration," and add an optional description.  
   - Select `All repositories`.  
   ![](../static/imgs/token2.png)  
   - **Configure permissions:** Grant the permissions marked in red boxes. Set **Access** to: `Read and write`.  
   ![](../static/imgs/token3.png)  
   ![](../static/imgs/token4.png)  
   ![](../static/imgs/token5.png)  
   ![](../static/imgs/token7.png)  
   - Click `Generate token` at the bottom to obtain your token:  
   ![](../static/imgs/token8.png)  
   - Copy the token into PakePlus to start using it:  
   ![](../static/imgs/token9.png)  

9. **Test the Token**  
   Open PakePlus, click the settings button in the top-right corner, paste the token obtained in Step 7 or 8, and click "Test." If it shows "Token is valid," you're all set!  
   ![](../static/imgs/token13.png)  

## Important Notes  

- You can only view the token once after generation—**keep it secure**.  
- The token should **only be stored locally on your computer**—do not share it.  
- If you set an expiration date, the token will only work within its validity period. You’ll need to generate a new one after it expires.