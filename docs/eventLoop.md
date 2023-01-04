---
title: "js EventLoop 事件循环机制"
date: "2023-01-03"
---

前言: 有个 javascript 是单线程的, 所以为了处理异步问题, 避免阻塞主线程. 于是乎, 采取了异步队列来处理

> 为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

回归正传, 将异步任务分为两种, **宏任务和微任务**

- 宏任务 (macrotask)

  - 异步 Ajax 请求、
  - setTimeout、setInterval、
  - 文件操作
  - 其它宏任务

- 微任务 (microtask)

  - Promise.then、.catch 和 .finally
  - process.nextTick
  - 其它微任务

## 执行顺序

宏任务>>执行结束>>有微任务?>>执行所有微任务>>执行下一个宏任务

- 每一个宏任务执行完之后，都会检查是否存在待执行的微任务，
- 如果有，则执行完所有微任务之后，再继续执行下一个宏任务。

### 例子

```js
setTimeout(() => {
  console.log("1");
}, 0);
```

通过注册微任务, 来延迟输出, 哪怕设置 0 秒, 也不会马上执行, 因为此时需要等待宏任务执行完
