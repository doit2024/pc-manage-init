import Vue from 'vue'

import iView from 'iview'
// 修改主题
// import '@/scss/itheme.less'

// 将元素传送挂载到body下（ 指令：v-dom-portal ）
// import DomPortal from '@/plugins/dom-portal'
import Components from '@/components'
import * as apiGroup from '@/ajax'
import * as validate from '@/global/validate'
import { formatDate1, formatDate2 } from '@/global/funs'
import 'babel-polyfill'

Vue.filter('f_date1', formatDate1)
Vue.filter('f_date2', formatDate2)

Vue.use(iView)
// Vue.use(DomPortal)
Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

Object.assign(Vue.prototype, {
  $http: apiGroup,
  $ml: validate.ml,
  $v: validate
})
