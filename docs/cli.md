---
title: "CLI 构建一个自己的CLI"
date: "2023-01-30"
---

## 前言

从零打造一个 CLI, 也算是老生常谈的一个点, 本着精炼和自我记录的原因, 写下这篇.

## 分析

前端常见的 CLI, 如**Vue CLI**, **create-react-app**等, emm..., 从我们从终端输入命令并执行到底经历了什么, 其实没有那么复杂, 简单来说就是脚本的执行

```bash
vue create hello-world
```

由上可知该命令由三部分组成, 标志信息(vue), 操作信息(create), 描述信息(hello-word), 了解完这些, 就可以开始搭建 CLI 了

## 准备工作

一般来说, 脚手架都是挂载在 npm 上, 或者是内网的 npm, 所以需要一个 npm 的帐号, 当然, 如果是本地搞着玩, 那也没关系.

- [一个 npm 帐号](https://www.npmjs.com/)
- [大型男性交友平台](https://github.com/)
- 一定的 js 基础

满足以上 3 点, 就可以开始搞鼓了.

## 初始化

创建一个空仓库, 如 cli-test

```bash
npm init -y
```

此时生出一个 package.json 文件(包描述文件)

```json
{
  "name": "cli-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "L-Shuo",
  "license": "ISC"
}
```

暂时不用管它.

在根目录创建 bin 文件夹, 并在下面创建一个文件 cli.js.

### 目录结构

```bash
├─ bin
│   ├─ cli.js                 # 脚本代码
└── package.json              # package.json
```

## 增加命令

在 package.json 内增加 bin 属性

```json
{
  "name": "cli-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "test-cli": "bin/cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "L-Shuo",
  "license": "ISC"
}
```

这里的 **test-cli** 将构成上诉所说的 **标志信息**, 意思为执行 bin/cli.js 这个文件

## 原型

cli.js 中添加以下代码

```js
#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

console.log("Hello World!");
```

## 调试

使用 npm 软链接进行测试

```bash
# 软链接
$ npm link
# 输入命令
$ test-cli
```

上述输入完 test-cli 后, 控制台便会出现 Hello World!.

大功告成, 一个最原始的原型就出来了, 对于了解原理, 从这里就可分一段落了, 关于具体功能不过是, 在其基础上增加相关业务.

## 加深

上诉代码的确称不上一个 CLI(emm, 一个专门输出 hello World 的 CLI?), 但是一个完整的 CLI 恰巧需要一个完整的业务流程以及功能迭代.

在 package.json 增加 **type** 属性, 告诉使用 ES6 模块

```json
{
  "name": "cli-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "test-cli": "bin/cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
  "keywords": [],
  "author": "L-Shuo",
  "license": "ISC"
}
```

### info

增加对应的工具库

```bash
yarn add commander envinfo chalk
```

[commander](https://github.com/tj/commander.js) 为命令库
[envinfo](https://github.com/tabrindle/envinfo) 为环境信息库
[chalk](https://github.com/chalk/chalk) 终端输出带颜色文本

修改 cli.js 文件

```js
#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

import { program } from "commander";
import envInfo from "envinfo";
import chalk from "chalk";

program
  .command("info")
  .description("打印环境信息")
  .action((cmd) => {
    envInfo
      .run(
        {
          System: ["OS", "CPU"],
          Binaries: ["Node", "Yarn", "npm"],
          Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
          npmGlobalPackages: ["cli-test"],
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true,
        }
      )
      .then(console.log);
  });

// 监听命令
program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log();
  console.log(`  ` + chalk.red(`未知命令: ${chalk.yellow(cmd)}.`));
  console.log();
  process.exitCode = 1;
});

program.parse(process.argv);
```

```bash
# 输入以下命令行即可打印环境信息
$ test-cli info
# 输入以下命令获取帮助
$ test-cli
```

### 生成项目

回归主题, 脚手架生成项目主要分为三步

step1: 输入执行命令
step2: 询问用户问题
step3: 生成符合需求的对应项目

- 从 step2 开始实现

在 cli.js 下增加命令

```js
function createAPP(appName, options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "your app-name: ",
        default: appName,
      },
    ])
    .then((answers) => {
      console.log("answers: ", answers);
    });
}

program
  .command("create <app-name> [文件名]")
  .description("创建项目")
  .action((appName, options) => {
    createAPP(appName, options);
  });
```

此时输入 test-cli create my-app 即可获取名称

- 创建模块文件夹

```bash
mkdir templates
```

- 增加文件 index.html, style.css

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><!-- ejs 语法 --> <%= name %></title>
  </head>
  <body>
    <h1><%= name %></h1>
  </body>
</html>
```

```css
/* style.css */
html {
  background-color: yellowgreen;
}
```

- 创建项目

这里借助 ejs 模版引擎将用户输入的数据渲染到模版文件上

```bash
yarn add ejs
```

cli.js

```js
#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

import { program } from "commander";
import envInfo from "envinfo";
import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import ejs from "ejs";

function createAPP(appName, options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "your app-name: ",
        default: appName,
      },
    ])
    .then((answers) => {
      // 模版文件目录
      const destUrl = path.join(
        import.meta.url.replace("file:", ""),
        "..",
        "..",
        "templates"
      );
      console.log(destUrl, "地址:");
      // 生成文件目录
      const cwdUrl = process.cwd();
      // 从模版目录中读取文件
      fs.readdir(destUrl, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          // 使用 ejs 引擎渲染对应的模版文件
          ejs.renderFile(path.join(destUrl, file), answers).then((data) => {
            // 生成 ejs 引擎处理后的模版文件
            fs.writeFileSync(path.join(cwdUrl, file), data);
          });
        });
      });
    });
}

program
  .command("create <app-name> [文件名]")
  .description("创建项目")
  .action((appName, options) => {
    createAPP(appName, options);
  });

program
  .command("info")
  .description("打印环境信息")
  .action((cmd) => {
    envInfo
      .run(
        {
          System: ["OS", "CPU"],
          Binaries: ["Node", "Yarn", "npm"],
          Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
          npmGlobalPackages: ["cli-test"],
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true,
        }
      )
      .then(console.log);
  });

// 监听命令
program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log();
  console.log(`  ` + chalk.red(`未知命令: ${chalk.yellow(cmd)}.`));
  console.log();
  process.exitCode = 1;
});

program.parse(process.argv);
```
