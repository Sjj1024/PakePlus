# Invalid Token

This occurs because the GitHub token wasn't granted the required permissions during creation.

### Solution:

Follow the [GitHub Token Guide](../guide/token.md) to regenerate your token with proper permissions.

**Recommendation:**  
While granting all permissions will work (and is safest), PakePlus actually only needs:

-   `repo` (full control of private repositories)
-   `workflow` (GitHub Actions access)
-   `user` (read user profile data)

For security, only enable what's needed rather than all permissions.

> 🔍 _Tip: If you previously created a token, you may need to revoke and recreate it for new permissions to take effect._
