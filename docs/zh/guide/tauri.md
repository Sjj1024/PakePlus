# 桌面端配置

这里主要将 tauri 的配置可视化了，直接通过点击或者下拉操作即可实现自定义配置，比如全屏显示，或者开启调试模式等，如果你要使用桌面端相关的 APi，一定要勾选 TauriApi 这个选项，否则不生效！

![](../../static/imgs/config3.webp)

## 开发调试

如果你需要开发调试，可以勾选开发调试选项，然后点击预览，就可以在预览窗口右下角看到调试按钮，点击即可调试。

![](../../static/imgs/debug1.webp)

## 发布模式

在点击发布的时候，可以选择开启调试和关闭调试，如果开启调试，那么就会生成一个调试版本的应用，等发布成功后，安装后，点击右键可以看到有检查调试的选项，点击即可检查调试。这个调试和浏览器的调试一样。如果你的项目发布之后，出现白屏或者打开报错等问题，就可以通过这种方式来查看问题原因，然后根据问题描述来解决问题。可以通过 DeepSeek 或者 ChatGPT 来解决问题。

## 更多配置

这是核弹工厂，不懂不要碰。
更多配置请见 tauri2 文档。文档地址：[tauri2 文档](https://v2.tauri.app/reference/config/#windowconfig)  
配置项说明(最终以 tauri2 官方为准)，切换到 json 模式可以增删改更多可编辑属性。

![](../../static/imgs/moreconfig.webp)

<p class="has-line-data" data-line-start="2" data-line-end="4">acceptFirstMouse: boolean<br>
是否在macOS上点击非活动窗口时同时点击穿透到网页视图。</p>
<p class="has-line-data" data-line-start="5" data-line-end="7">additionalBrowserArgs: string | null<br>
在Windows上定义额外的浏览器参数。默认情况下wry会传递–disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection参数，如果使用此方法，需要自行禁用这些组件。</p>
<p class="has-line-data" data-line-start="8" data-line-end="10">alwaysOnBottom: boolean<br>
窗口是否应始终位于其他窗口下方。</p>
<p class="has-line-data" data-line-start="11" data-line-end="13">alwaysOnTop: boolean<br>
窗口是否应始终位于其他窗口上方。</p>
<p class="has-line-data" data-line-start="14" data-line-end="20">backgroundColor: Color | null<br>
设置窗口和网页视图的背景颜色。<br>
平台特定说明：<br>
Windows：窗口层忽略alpha通道。<br>
Windows 7：网页视图层忽略alpha通道。<br>
Windows 8+：如果alpha通道不为0，网页视图层将忽略它。</p>
<p class="has-line-data" data-line-start="21" data-line-end="24">backgroundThrottling: BackgroundThrottlingPolicy | null<br>
更改默认的后台节流行为。<br>
默认情况下，浏览器使用暂停策略，在视图最小化或隐藏约5分钟后，会节流计时器甚至卸载整个标签页以释放资源。</p>
<p class="has-line-data" data-line-start="25" data-line-end="30">browserExtensionsEnabled: boolean<br>
是否可以为网页视图进程安装浏览器扩展。<br>
平台特定说明：<br>
Windows：启用WebView2环境的AreBrowserExtensionsEnabled。<br>
MacOS/Linux/iOS/Android：不支持。</p>
<p class="has-line-data" data-line-start="31" data-line-end="33">center: boolean<br>
窗口启动时是否居中。</p>
<p class="has-line-data" data-line-start="34" data-line-end="40">closable: boolean<br>
窗口的原生关闭按钮是否启用。<br>
平台特定说明：<br>
Linux：“GTK+会尽力说服窗口管理器不显示关闭按钮。”<br>
iOS/Android：不支持。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="41" data-line-end="43">contentProtected: boolean<br>
防止窗口内容被其他应用程序捕获。</p>
<p class="has-line-data" data-line-start="44" data-line-end="48">create: boolean<br>
Tauri是否应在应用启动时创建此窗口。<br>
当设置为false时，必须手动通过app.config().app.windows获取配置对象并使用WebviewWindowBuilder::from_config创建。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="49" data-line-end="52">decorations: boolean<br>
窗口是否应有边框和栏。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="53" data-line-end="56">devtools: boolean | null<br>
启用通常称为浏览器开发者工具的网页检查器。默认启用。<br>
此API在调试版本中有效，但在发布版本中需要devtools功能标志才能启用。</p>
<p class="has-line-data" data-line-start="57" data-line-end="61">dragDropEnabled: boolean<br>
网页视图上是否启用拖放。默认启用。如果想要网页元素可以拖拽，请将其关闭<br>
在Windows上禁用此功能才能在前端使用HTML5拖放。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="62" data-line-end="65">focus: boolean<br>
窗口初始时是否获得焦点。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="66" data-line-end="68">fullscreen: boolean<br>
窗口启动时是否为全屏。不会保留最大化最小化和关闭按钮和标题栏，甚至会覆盖任务栏。要关闭软件的时候，需要打开任务管理器来关闭。</p>
<p class="has-line-data" data-line-start="69" data-line-end="72">height: number (double格式)<br>
窗口高度。<br>
默认值：600</p>
<p class="has-line-data" data-line-start="73" data-line-end="75">hiddenTitle: boolean<br>
如果为true，在macOS上隐藏窗口标题。</p>
<p class="has-line-data" data-line-start="76" data-line-end="80">incognito: boolean<br>
网页视图是否应在隐身模式下启动。<br>
平台特定说明：<br>
Android：不支持。</p>
<p class="has-line-data" data-line-start="81" data-line-end="84">label: string<br>
窗口标识符。必须为字母数字。<br>
默认值：“main”</p>
<p class="has-line-data" data-line-start="85" data-line-end="87">maxHeight: number | null (double格式)<br>
窗口最大高度。</p>
<p class="has-line-data" data-line-start="88" data-line-end="94">maximizable: boolean<br>
窗口的原生最大化按钮是否启用。如果resizable设置为false，则忽略此设置。<br>
平台特定说明：<br>
macOS：禁用窗口标题栏中的&quot;缩放&quot;按钮。<br>
Linux/iOS/Android：不支持。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="95" data-line-end="97">maximized: boolean<br>
窗口是否最大化。会保留最大化最小化和关闭按钮和标题栏。</p>
<p class="has-line-data" data-line-start="98" data-line-end="100">maxWidth: number | null (double格式)<br>
窗口最大宽度。</p>
<p class="has-line-data" data-line-start="101" data-line-end="103">minHeight: number | null (double格式)<br>
窗口最小高度。</p>
<p class="has-line-data" data-line-start="104" data-line-end="109">minimizable: boolean<br>
窗口的原生最小化按钮是否启用。<br>
平台特定说明：<br>
Linux/iOS/Android：不支持。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="110" data-line-end="112">minWidth: number | null (double格式)<br>
窗口最小宽度。</p>
<p class="has-line-data" data-line-start="113" data-line-end="115">parent: string | null<br>
设置与此标签关联的窗口作为要创建窗口的父窗口。</p>
<p class="has-line-data" data-line-start="116" data-line-end="121">proxyUrl: string | null (uri格式)<br>
网页视图所有网络请求的代理URL。<br>
必须是http://或socks5:// URL。<br>
平台特定说明：<br>
macOS：需要macos-proxy功能标志，仅适用于macOS 14+。</p>
<p class="has-line-data" data-line-start="122" data-line-end="125">resizable: boolean<br>
窗口是否可调整大小。当resizable设置为false时，原生窗口的最大化按钮自动禁用。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="126" data-line-end="132">shadow: boolean<br>
窗口是否有阴影。<br>
平台特定说明：<br>
Windows：false对装饰窗口无效，阴影始终开启。<br>
Linux：不支持。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="133" data-line-end="135">skipTaskbar: boolean<br>
如果为true，在Windows和Linux上从任务栏隐藏窗口图标。</p>
<p class="has-line-data" data-line-start="136" data-line-end="139">tabbingIdentifier: string | null<br>
为macOS定义窗口标签标识符。<br>
具有匹配标签标识符的窗口将分组在一起。如果未设置标签标识符，则禁用自动标签。</p>
<p class="has-line-data" data-line-start="140" data-line-end="142">theme: Theme | null<br>
初始窗口主题。默认为系统主题。仅在Windows和macOS 10.14+上实现。</p>
<p class="has-line-data" data-line-start="143" data-line-end="146">title: string<br>
窗口标题。<br>
默认值：“Tauri App”</p>
<p class="has-line-data" data-line-start="147" data-line-end="150">titleBarStyle: TitleBarStyle<br>
macOS标题栏的样式。<br>
默认值：“Visible”</p>
<p class="has-line-data" data-line-start="151" data-line-end="154">transparent: boolean<br>
窗口是否透明。<br>
注意：在macOS上，这需要macos-private-api功能标志。</p>
<p class="has-line-data" data-line-start="155" data-line-end="158">url: WebviewUrl<br>
窗口网页视图URL。<br>
默认值：“index.html”</p>
<p class="has-line-data" data-line-start="159" data-line-end="161">useHttpsScheme: boolean<br>
设置自定义协议在Windows和Android上是否使用https://&lt;scheme&gt;.localhost而不是默认的http://&lt;scheme&gt;.localhost。默认为false。</p>
<p class="has-line-data" data-line-start="162" data-line-end="164">userAgent: string | null<br>
网页视图的用户代理。</p>
<p class="has-line-data" data-line-start="165" data-line-end="168">visible: boolean<br>
窗口是否可见。<br>
默认值：true</p>
<p class="has-line-data" data-line-start="169" data-line-end="173">visibleOnAllWorkspaces: boolean<br>
窗口是否应在所有工作区或虚拟桌面上可见。<br>
平台特定说明：<br>
Windows/iOS/Android：不支持。</p>
<p class="has-line-data" data-line-start="174" data-line-end="177">width: number (double格式)<br>
窗口宽度。<br>
默认值：800</p>
<p class="has-line-data" data-line-start="178" data-line-end="180">windowClassname: string | null<br>
在Windows上创建窗口时创建的窗口类名。仅限Windows。</p>
<p class="has-line-data" data-line-start="181" data-line-end="186">windowEffects: WindowEffectsConfig | null<br>
窗口效果。<br>
要求窗口透明。<br>
平台特定说明：<br>
Windows：如果使用装饰或阴影，可能需要尝试此解决方法。</p>
<p class="has-line-data" data-line-start="187" data-line-end="189">x: number | null (double格式)<br>
窗口左上角的水平位置。</p>
<p class="has-line-data" data-line-start="190" data-line-end="192">y: number | null (double格式)<br>
窗口左上角的垂直位置。</p>
<p class="has-line-data" data-line-start="193" data-line-end="199">zoomHotkeysEnabled: boolean<br>
是否通过热键启用页面缩放。<br>
平台特定说明：<br>
Windows：控制WebView2的IsZoomControlEnabled设置。<br>
MacOS/Linux：注入一个polyfill，使用ctrl/command + -/=缩放，每步20%，范围从20%到1000%。<br>
Android/iOS：不支持。</p>
