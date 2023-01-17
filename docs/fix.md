---
title: "fix 日常错误"
date: "2023-01-03"
---

先行记录, 后续整理

## 微信浏览器内部字体大小影响 H5 页面字体

前言: 这是一个特殊情况下的 bug, 常见于中老年群体中, 由于中国的中老年人习惯把字体调大以看清文本, 固容易触发该问题, 由于微信浏览器内嵌浏览器会根据用户设置的大小来处理页面字体, 所以会导致像 rem 等一系列布局造成错位问题.

触发条件: 通过微信, 我 -> 设置 -> 通用 -> 字体大小, 调整字体大小即会触发

- IOS

通过工具, 发现微信在页面 body 标签上, 增加了 **text-size-adjust** 样式来控制页面文字大小.

固只需要增加样式, 即可在 IOS 下解决该问题

```css
body {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
```

- Android

安卓需要一些 JS 来调整

```js
// 安卓 强制页面字体为默认字体大小
(function () {
  if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
  ) {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on("menu:setfont", function () {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    });
  }
})();
```
