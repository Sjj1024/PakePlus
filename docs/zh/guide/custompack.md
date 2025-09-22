# 自定义打包

::: info 自定义打包优点
<Badge type="tip" text="不限制项目数量" />
<Badge type="tip" text="不限制打包频率" />
<Badge type="tip" text="不限制文件数量" />
<Badge type="tip" text="文件大小放宽25M" />
<Badge type="tip" text="更多自定义打包" />
:::


如果你是程序员，你想调试你的前端项目，或者因为你的 dist 目录特别大文件特别多，但是 PackPlus 因为 github api 的原因限制了文件大小和数量，那么你可以使用高级玩法来实现同步你的 dist 目录到 github 仓库中，然后实现编译发布。

## 操作步骤

1.先在 PackPlus 上创建一个项目，比如这个项目名称叫：deepseek

2.然后 clone 你的 PackPlus 仓库到本地
每个人在 PackPlus 填写验证 token 后，都会自动 fork PackPlus/PackPlus-Android/PackPlus-iOS 仓库到你的 github 账号下，你可以在你的 github 账号下找到你的 PackPlus 仓库，然后 clone 到本地。
注意：如果你想编译桌面端，你就 clone PackPlus，如果你想编译移动端，你就 clone PackPlus-Android/PackPlus-iOS。

3.使用 git 命令，拉取你仓库的所有分支，其中肯定有一个叫：deepseek 的分支
切到 deepseek 分支后，将你的 dist 文件夹内容复制到 src 目录下，然后提交到你的仓库中。
如果你同时想修改软件图标，你可以替换项目根目录的 app-icon.png 文件为你的图标文件，然后提交到你的仓库中。
注意: app-icon.png 文件必须是 png 格式并且名称必须是 app-icon.png，大小为 1024x1024 像素。
修改软件的名称等配置信息，可以在项目根目录的 scripts/ppconfig.json 里面修改。
桌面端修改 desktop 字段，安卓修改 android 字段，ios 修改 ios 字段。

```
"name": "英文名称",
"showName": "显示名称",
"version": "版本号",
"id": "com.唯一id.app",
"desc": "项目描述",
"webUrl": "index.html",
"iconPath": "../app-icon.png",
"inputPath": "../app-icon.png",
"tempPath": "./processed-image.png",
"icnsPath": "../src-tauri/icons/icon.icns",
"pubBody": "发布内容描述",
"isHtml": true,
"single": 是否单例模式，true/false,
"state": 状态保持，true/false,
"injectJq": 是否注入 jQuery，true/false,
"tauriApi": 是否注入 Tauri API，true/false,
"debug": 是否开启调试模式，true/false,
```

4.修改完之后，将这个分支推送到你的仓库中，然后到 github action 中触发编译
触发的时候，记得选择分支为 deepseek，然后点击运行工作流，等待编译完成即可。

5.发布完成后，到 PackPlus 的 release 页面，就可以下载你的软件了。
