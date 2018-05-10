# pc-manage-init

- 一个后台管理框架生成脚本
- 整改中...

---

## 相关
- node@8.*
- vue-cli
- vue-router
- iview
- babel-polyfill
- vuex
- less
- highcharts

## before all

```
$ vue-init webpack demo
$ cd demo
$ cnpm i
$ cnpm i -S iview babel-polyfill vuex highcharts vue-auto-register
$ cnpm i -D less less-loader
```

## install

```
$ npm i -D pc-manage-init
```

## scripts

- vi package.json

```json
{
  "scripts": {
    "init": "pc-manage-init",
    "api": "generate-api",
  }
}
```

## start
 ```

 1-生成php目录               : $ npm run init

 2-处理php目录 （见配置说明）

 3-生成项目                  : $ npm run init

 4-根据apidoc更新src/ajax    : $ npm run api

 ```


## 可能出现的坑

 1. eslint: Parsing error: x-invalid-end-tag
 .eslintrc.js 的 rules 加上 (脚本已自动加上):
 * "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]

## 配置说明

 1. apidoc.js
 *  拷贝 API文档(index.php)转成js , 避免加密
 2. project.js
 ```
 PRE: dt, -- 组件前缀
 PORT: 8022
 HOST: http://120.24.55.58
 AES_KEY: 267a4733f3d89127bac20be290742c81
 ADMIN:
   username: 13751198387
   password: 123456
 
 ROUTES:
   // login: ['signup', 'signup', 'forget']
   login: ['signup'],
   home: [
     String : 1级菜单， 无子菜单
     Array  : 2级菜单， 有子菜单，组成： [菜单名， 菜单项， 菜单项]
   ],
   modal: []   -- 右侧弹出层
 },
 // 左侧菜单栏, 与 ROUTE.home 对应
 SIDER: [
   CN-String, ROUTES.home的中文映射
 ],

 // 有表格的页面, 键名与ROUTES保持一致
 TABLE_PAGES: {
   'user': {
     api: 'user',  -- 请求列表信息的api, (请求地址组成： api/action)
     title: '用户列表',  -- 标题栏左侧大标题
     slots: ['del:批量删除', 'import:导入', 'new:新增'],  -- 标题栏右侧操作（组成： '类型<enum：按钮文本<any'）
     columns: [  -- 表格列信息（生成大致的模样）
       内置列:
       'selection',  -- 批量操作复选框
       '_index',     -- 序号
       'ctime',      -- 创建时间
       'action:download|detail|edit|del'   -- 操作
       自定义列：
       'key<string:title<CN-String'
     ]
   },
   ...
 }
 ```

## 接口设计约定

 * 账号信息
 ```
 登录　　　 ： account/login
 登出　　　 ： account/logout
 账号信息   ： account/info
 账号设置   ： account/setting
 ```
 * 列表页面
 ```
 列表　　　： api/lists
 增       ： api/add
 删       ： api/del
 改       ： api/edit
 查       ： api/detail
 ```

## 目录详情

### 1 _ @/ajax:
 * 结构

 | 文件名     | 内容
 | --------  | :-----
 | core.js   | 基于promise原生封装的ajax;请求与响应拦截均在此处理
 | index.js  | API封装导出， 调用: this.$http.api.action(formData<object).then(data = {handle(data)})
 | mock.js   | 键名为API则启用mock数据,否则关闭（仅在开发环境下）
 * @/ajax/core.js
 * 错误捕获规则（options.whereCatch）

 | 值<string> | 含义
 | --------   | :-----
 | local      | 本地catch, 针对需要特殊处理的错误， ajax.js不做处理
 | ajax       | 默认，ajax.js 统一捕获处理，后台返回错误直接弹框，本地catch无作用
 | both       | 本地catch + ajax.js统一处理

### 2 _ @/components:
 * 结构

 | 目录名称        | 内容
 | --------       | :-----
 | container      | 容器组件
 | form           | 表单相关
 | ui             | 数据展示
