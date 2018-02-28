# ....

## 项目依赖
> vue-cli vue-router iview babel-polyfill vuex less

## 使用

> **0 _ 安装**
> ```
> nodejs > v8.0.0
> ```
>
> **1 _ npm源使用国内淘宝镜像***
> ```
> npm install -g cnpm --registry=https://registry.npm.taobao.org
> ```
>
> **2 _ 全局安装vue官方脚手架**
> ```
> cnpm i vue-cli -g
> ```
>
> **3 _ 使用脚手架初始化项目**
> ```
> vue-init webpack myPojectName
> ```
>
> **4 _ 安装vue-cli依赖**
> ```
> cd myPojectName && cnpm i
> ```
>
> **5 _ 安装开发环境依赖**
> ```
> cnpm i -D less less-loader pc-manage-init
> ```
>
> **6 _ 安装生产环境依赖**
> ```
> cnpm i -S iview babel-polyfill vuex
> ```
>
> **7 _ 添加脚本命令：在package.json->scripts中加入**
> **（注意加密系统:rename package.json packjso）：**
> * "com": "auto_regist_components",
> * "api": "create_ajax_from_doc",
> * "init": "pc-manage-init && auto_regist_components && create_ajax_from_doc",
>
> **8 _ 生成php目录**
> ```
> npm run init
> ```
>
> **9 _ 处理php目录**
> * project.js  ---  项目整体信息配置
> * apidoc.js   --- copy API 文档, 避免加密
>
> **10 _ 组件注册**
> ```
> npm run com
> ```
>
> **11 _ 更新 ajax / api & mock**
> ```
> npm run api
> ```


## 坑s

> 1. 如果出现 less 相关问题，确认正确写法仍然报错，则可能是less 与 less-loader 版本不匹配导致，
> 可以在 package.json中手动加上依赖, 例：
> * "less": "^2.7.3",
> * "less-loader": "^2.2.3",
>
> 2. eslint: Parsing error: x-invalid-end-tag
> .eslintrc.js 的 rules 加上 (脚本已自动加上):
> * "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
>
