# 编译失败

编译失败的原因有很多，常见的有：

1. 项目没有按照规范的形式填写，虽然我已经尽力限制规范了，但是还是有可能会有遗漏。
2. 项目的依赖没有安装好，可能是因为网络问题，或者是因为依赖的版本不兼容。
3. 项目的配置文件没有填写好，可能是因为配置文件的格式不正确，或者是因为配置文件的路径不正确。
4. token 权限没有配置正确，就会导致编译失败，403 等错误。

# Cannot read properties of undefined (reading 'sha')

这个错误最常见的原因是：

1. 手动 fork 了 PakePLus 这个仓库，但是没有取消 Copy the main branch only。
2. 本项目会自动 fork 一个模板仓库，名字也是 PakePLus，不要删除这个仓库，否则就无法使用 Github 编译。
3. 不要删除或修改 PakePLus 仓库中的所有内容，不然也会遇到这种错误。
4. 升级 PakePlus 的版本后，可能会遇到这种错误。

# 如何解决

1. 最快的解决办法就是删除你的 PakePlus 仓库，然后重新打开 PakePlus，并填入 Token 重新走一遍流程。（该过程会删除你之前创建的项目）
   删除你的 PakePlus 仓库教程：

-   打开你的 PakePlus 仓库
-   点击 Settings，并滑动到最底部
-   点击 Delete this repository
-   点击 I want to delete this repository
-   点击 I have read and understand these effects
-   然后填入你的 PakePlus 全名
-   点击 Delete this repository

2. 如果还是不行，请加我的微信：lanxingme，或者进群聊问问群友。
