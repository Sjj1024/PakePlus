# 移动端配置

在移动端配置页面，点击右上角的更多配置，支持配置自定义 userAgent 等，更多配置还在开发中，以最终发布版本为准。

## 自定义 userAgent

默认会使用系统自带的 userAgent，可以填写自定义 ua。

## 移动端调试

发布版本中可以开启移动端调试，选择开启调试后，等安装到移动端就可以连接电脑进行调试。

安卓连接电脑后，只需要打开 chrome 浏览器，输入：

```
chrome://inspect
```

![](../../static/imgs/debug2.webp)

选中找到的 app，就会出现像网站一样的调试页面：

![](../../static/imgs/debug3.webp)

ios 连接 mac 后，打开 safari 浏览器，在工具栏开发 -> 找到自己的设备 -> 对应的 APP：

![](../../static/imgs/debug4.webp)

选中之后就可以打开一个 web 调试界面：

![](../../static/imgs/debug5.webp)
