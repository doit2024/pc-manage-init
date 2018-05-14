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
$ cnpm i -S iview babel-polyfill vuex highcharts vue-auto-register jsonp
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

 1-生成init目录               : $ npm run init

 2-配置init目录

 3-生成项目                  : $ npm run init

 4-启动项目                  : $ npm start

 ```


## 可能出现的坑

 1. eslint: Parsing error: x-invalid-end-tag
 .eslintrc.js 的 rules 加上 (脚本已自动加上):
 * "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]

## other

- 权限参考

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