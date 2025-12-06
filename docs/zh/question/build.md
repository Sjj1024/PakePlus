# 编译失败

编译失败的原因有很多，常见的有：

1. 项目没有按照规范的形式填写，虽然我已经尽力限制规范了，但是还是有可能会有遗漏。
2. 项目的依赖没有安装好，可能是因为网络问题，或者是因为依赖的版本不兼容。
3. 项目的配置文件没有填写好，可能是因为配置文件的格式不正确，或者是因为配置文件的路径不正确。
4. token 权限没有配置正确，就会导致编译失败，403 等错误。
5. PakePlus 版本升级后，可能会导致编译失败等问题，可尝试重新填入 token 走流程试试。

## dispatch 错误: 404/422/403 等等错误

1. 确认 token 权限是否配置正确，然后重新填入 token 试试，往往是 token 权限配置错误导致的。或者点击首页头像然后同步一下试试。
2. PakePlus 版本升级后，可能会导致编译失败，需要重新填入 token 并重新创建项目试试。

## author_id does not have push access

如果出现类似下面的错误，可能是 github 抽风，等过一天再填入 token 试试应该就可以了。或者是今天的 github 请求过多限制了

```
⚠️ GitHub release failed with status: 422
[{"resource":"Release","code":"custom","field":"author_id","message":"author_id does not have push access to xxxxxxx/PakePlus"}]
retrying... (0 retries remaining)
❌ Too many retries. Aborting...
Error: Too many retries.
```

## Cannot read properties of undefined XXX

用最新版本的 PakePlus，然后填入 token 试试，能解决 99%的问题。或者在 PakePlus 中首页头像点击进入个人中心，然后在最底部的尝试修复等同步一下试试。如果还有问题，可以进微信交流群问问
