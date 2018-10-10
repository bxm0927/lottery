# ES6 彩票项目 lottery

ES6零基础教学_解析彩票项目-慕课网实战：https://coding.imooc.com/class/98.html

项目演示地址：http://es6lottery.t.imooc.io/#

学习目的：学习ES6语法，使用ES6开发复杂度较高的彩票项目，完整的开发项目流程，掌握如何最佳的发挥ES6优势。

11选5（01-11），每10钟开一期。

## 技术栈

兼容IE8+的ES6自动化构建：使用babel、gulp、webpack-stream完成兼容IE8+的ES6自动化构建，解决浏览器兼容性问题

客户端：ES6

服务端：Node.js(Express) + Mock.js

## 目录结构

前端源代码 src
服务器目录 server
构建目录 tasks
package.json
gulpfile.babel.js
.babelrc

```sh
cd /
npm init

cd /server
express -e .
npm install
```

## 开发流程

1. 搭建项目架构
2. 需求分析，模块划分
3. 开发
4. 前后端接口联调
5. 部署上线

## 核心功能模块

倒计时

玩法切换

计算金额

添加号码

投注支付

随机号码

奖金预测

状态更新

动态遗漏

## Quick Start

安装 Node.js

```sh
npm run dev # 相当于 gulp --watch
```

## TODO

## Q&A

---

## 课程章节

### 第1章 课程介绍

ES6简介

### 第2章 项目构建

使用Gulp、Babel、Webpack做好ES6工程的构建

通过手把手编写gulp脚本完成ES6的自动编译、打包、文件监听、浏览器热更新、模板自动更新、服务热启动等

### 第3章 es6语法

介绍ES6语法

本章通过语法介绍、实例演示、实用技巧三个维度来讲解ES6所有新特性，包括Let和Const、解构赋值、数组扩展、字符串扩展、函数扩展、正则扩展、数值扩展、对象扩展、类与对象、Set和Map数据结构、Symbol、Proxy和Reflect、Generator(async\wait)、遍历接口、Decorator修饰器、模块化，在本章可以系统的学习ES6相关的所有知识...

### 第4章 项目实战

开发功能模块

- 4-1 需求分解和目录创建
- 4-2 创建倒计时模块
- 4-3 创建数据计算模块
- 4-4 创建接口模块（上）
- 4-5 创建接口模块（下）
- 4-6 创建彩票基础模块（上）
- 4-7 创建彩票基础模块（中）
- 4-8 创建彩票基础模块（下）
- 4-9 创建彩票业务模块
- 4-10 创建服务接口和模拟数据
- 4-11 前后端联调

### 第5章 课程总结

回顾ES6知识点和实战技巧
