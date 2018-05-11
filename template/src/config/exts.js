import Vue from 'vue'

import iView from 'iview'
import '@/style/itheme.less'
import Component from 'vue-auto-register'

import apiGroup from '@/ajax'
import * as validate from '@/global/validate'
import maxlength from '@/global/maxlength'
import { OPTIONS } from '@/global/cons'
import { filterTimestamp } from '@/global/funs'
import commonColumns from '@/global/columns'
import 'babel-polyfill'

Object.keys(OPTIONS).forEach(key => {
  Vue.filter(`f_${key}`, v => OPTIONS.filter(o => o.value === v)[0].label)
})
Object.keys(filterTimestamp).forEach(key => {
  Vue.filter(`f_${key}`, tstamp => filterTimestamp[key](tstamp))
})

Vue.use(iView)
Vue.use(Component)

Object.assign(Vue.prototype, {
  $http: apiGroup,
  $ml: maxlength,
  $v: validate,
  $cc: commonColumns
})
