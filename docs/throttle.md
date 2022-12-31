# 节流

## 前言

众所周知，函数节流（throttle）是 JS 中一个非常常见的优化手段，可以有效的避免函数过于频繁的执行。常用于提交表单, 滚动监听等业务中

## 方式

### JS

常见的有 lodash 里面的 throttle 函数, 或者网上拷贝的节流函数, 这里只谈 lodash 节流函数

```ts
import { throttle } from "lodash";
btn.addEventListener("click", throttle(save, 300));
```

### CSS

从 CSS 的角度来看, 节流的本质是控制事件的频率, 比如点击事件, 此时换个角度想想, 什么情况下, 可以使按钮不可用, 比如 html 里面的 disabled 属性, 当然这里讲的是 CSS, 所以可以考虑 pointer-events。

```css
pointer-events: none; // 禁用指针事件
```

#### pointer-events 属性

- auto 默认值。元素对指针事件做出反应，比如 :hover 和 click。
- none 元素不对指针事件做出反应。
- initial 将此属性设置为其默认值。参阅 initial。
- inherit 从其父元素继承此属性。参阅 inherit。

此时需要一个因素来作时间控制, 这里可以考虑 animation, 通过动画来控制 **指针事件** , 至于触发的时机, 可以通过伪类 **:active** 来实现。

#### CSS 动画的精准控制

```CSS
@keyframes throttle {
  from {
    pointer-events: none;
  }
  to {
    pointer-events: all;
  }
}

/* 这里使用阶梯曲线 step-end 更适合这种处理 */
button {
    animation: throttle 4s step-end forwards;
}

button:active{
  animation: none;
}
```

```html
<button>按钮</button>
```

### 优缺点

CSS 实现“节流”其实就是控制一个动画的精准控制，使元素处于禁用状态，这样就达到了“节流”的效果

优点: 好处在于逻辑与业务解耦

缺点: 只能用于点击事件, 无法用于常见的滚动事件等

## 总结

作为常见的节流函数, 当然是使用 JS 作为控制, 会功能更强大些, CSS 作为一种“奇军”, 只能用于少数情况, 好处是代码简单, 同时和业务解耦
