# 说明书

## 项目依赖
> vue-cli vue-router iview babel-polyfill vuex less highcharts

## 使用说明

> **0 _ 安装**
> * nodejs > v8.0.0
>
> **1 _ npm操作**
> ```
> 1-源使用国内淘宝镜像      : $ npm install -g cnpm --registry=https://registry.npm.taobao.org
>
> 2-全局安装vue官方脚手架   : $ cnpm i vue-cli -g
>
> 3-使用脚手架初始化项目    : $ vue-init webpack myPojectName
>
> 4-安装vue-cli依赖        : $ cd myPojectName && cnpm i
>
> 5-安装本插件             : $ cnpm i -D pc-manage-init
>
> 6-安装开发环境依赖        : $ cnpm i -D less less-loader (跳过，见坑1)
>
> 7-安装生产环境依赖        : $ cnpm i -S iview babel-polyfill vuex highcharts
>
> ```
>
> **2 _ 处理 package.json**
> * 注意加密系统 : $ rename package.json package.jso
> > 添加脚本命令: scripts中加入
> > ```
> > "init": "pc-manage-init",
> > "com": "auto_regist_components",
> > "api": "create_ajax_from_doc",
> > "all": "pc-manage-init && auto_regist_components && create_ajax_from_doc",
> > ```
> > 手动添加依赖: devDependencies中加入
> > ```
> > "less": "^2.7.3",
> > "less-loader": "^2.2.3",
> > ```
> * 注意加密系统 : $ rename package.jso package.json
>
> **3 _ 执行脚本**
> ```
> 1-生成php目录               : $ npm run init
> 2-处理php目录 （见配置说明）
> 3-生成项目                  : $ npm run all
> 4-组件注册                  : $ npm run com
> 5-根据apidoc更新src/ajax    : $ npm run api
> ```


## 可能出现的坑

> 1. 如果出现 less 相关问题，确认正确写法仍然报错，则可能是less 与 less-loader 版本不匹配导致，
> 可以在 package.json中手动加上依赖, 这里使用 iview@2.9.2 的依赖版本：
> * "less": "^2.7.3",
> * "less-loader": "^2.2.3",
>
> 2. eslint: Parsing error: x-invalid-end-tag
> .eslintrc.js 的 rules 加上 (脚本已自动加上):
> * "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]

## 配置说明

> 1. apidoc.js
> *  拷贝 API文档(index.php)转成js , 避免加密
> 2. project.js
> ```
> PRE: 'dt', -- 组件前缀
> PORT: 8022,
> HOST: 'http://120.24.55.58',
> AES_KEY: '267a4733f3d89127bac20be290742c81',
> ADMIN: {
>   username: '13751198387',
>   password: '123456'
> },
> 
> // 挂在localStorage|sessionStorage下面的属性
> // 同服务器下多客户端则为赋不同值，防止串数据
> ACCESS_TOKEN: 'DT_ACCESS_TOKEN',
> USER_INFO: 'DT_USER_INFO',
> LOGIN_INFO: 'DT_LOGIN_INFO',
> 
> // 路由表: 键或值不能重名
> ROUTES: {
>   // login: ['signup', 'signup', 'forget'],
>   login: ['signup'],
>   home: [
>     String : 1级菜单， 无子菜单
>     Array  : 2级菜单， 有子菜单，组成： [菜单名， 菜单项， 菜单项]
>   ],
>   modal: []   -- 右侧弹出层
> },
> // 左侧菜单栏, 与 ROUTE.home 对应
> SIDER: [
>   CN-String, ROUTES.home的中文映射
> ],
>
> // 有表格的页面, 键名与ROUTES保持一致
> TABLE_PAGES: {
>   'user': {
>     api: 'user',  -- 请求列表信息的api, (请求地址组成： api/action)
>     title: '用户列表',  -- 标题栏左侧大标题
>     slots: ['del:批量删除', 'import:导入', 'new:新增'],  -- 标题栏右侧操作（组成： '类型<enum>：按钮文本<any>'）
>     columns: [  -- 表格列信息（生成大致的模样）
>       内置列:
>       'selection',  -- 批量操作复选框
>       '_index',     -- 序号
>       'ctime',      -- 创建时间
>       'action:download|detail|edit|del'   -- 操作
>       自定义列：
>       'key<string>:title<CN-String>'
>     ]
>   },
>   ...
> }
> ```

## 接口设计约定

> * 账号信息
> ```
> 登录　　　 ： account/login
> 登出　　　 ： account/logout
> 账号信息   ： account/info
> 账号设置   ： account/setting
> ```
> * 列表页面
> ```
> 列表　　　： api/lists
> 增       ： api/add
> 删       ： api/del
> 改       ： api/edit
> 查       ： api/detail
> ```

