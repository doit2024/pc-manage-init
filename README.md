# pc-manage-init

- 一个后台管理框架生成脚本

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
- mockjs

## before all

```
$ vue-init webpack demo
$ cd demo
$ cnpm i
$ cnpm i -S iview babel-polyfill vuex highcharts vue-auto-register jsonp mockjs
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
$ npm run init  # 生成init目录

# 配置init目录

$ npm run init  # 生成项目

$ npm start     # 启动项目

# 非必须的命令, npm run init 已自动包含
$ npm run api   # 根据文档生成且仅改变 @/ajax/api.js @/ajax/mock.js

```

## 参考

- 涉及到权限
- addRouter Api
- 动态render侧边栏：

```
Vue.component('SiderItem', {
  props: ['data'],
  render (h) {
    return h('div',
      this.data.map(item => {
        if (item.children) {
          return h('Submenu', {
            props: {name: item.name}
          }, [
            h('template', {slot: 'title'}, [
              h('Icon', {props: {type: 'ios-home'}}),
              h('span', {'class': 'title'}, item.title)
            ]),
            ...item.children.map(child => h('MenuItem', {props: {name: child.path}}, child.name))
          ])
        } else {
          return h('MenuItem', {
            props: {name: '/member'}
          }, [
            h('Icon', {props: {type: 'ios-home'}}),
            h('span', {'class': 'title'}, item.title)
          ])
        }
      })
    )
  }
})
```


- 登录退出时由于滚动条而抖动
- scroll-hide 样式类在 @/style/scrollbar.less

```
<body class="scroll-hide">
```
