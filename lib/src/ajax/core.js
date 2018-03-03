import Vue from 'vue'
import qs from 'qs'
import router from '@/router'
import { baseUrl } from '@/env'
import { aes } from '../global/funs'
import { LOGIN_INFO, ACCESS_TOKEN } from '../../php/project'
// import oMock from './mock'

// 响应处理
const _formateResData = (res, url, whereCatch, resolve, reject) => {
  // if (oMock[url]) {
  //   console.log('mockData(' + url + '):', oMock[url].data)
  //   return resolve(oMock[url].data)
  // }
  if (res.errcode === 0) {
    resolve(res.data)
  } else {
    if (whereCatch === 'local') {
      reject(res)
    } else if (whereCatch === 'ajax' && res.errcode === 400006) {
      let lastLoginInfo = JSON.parse(aes.decrypt(window.localStorage.getItem(LOGIN_INFO)))
      if ((Date.now() - lastLoginInfo.login_time) < 1000 * lastLoginInfo.expire) {
        Vue.prototype.$Modal.warning({ title: '提示', content: '您的账号在异地登录!' })
      }
      router.replace('/login')
    } else {
      reject(res)
      _errTip(res, url)
    }
  }
}

// ajax函数的默认参数
const _ajaxOptions = {
  url: '#',
  method: 'POST',
  timeout: 10000,
  data: {},
  dataType: 'text',
  // 参数属性值是否不允许为 '' , undefined , null
  noNull: true,
  // 是否带 access_token
  hasAccessToken: true,
  // (自定义)错误在哪里捕获处理, 默认值:['local','ajax','both']
  whereCatch: 'ajax'
}

export default optionsOverride => {
  // 拼接域名与将传入的参数
  optionsOverride.url = baseUrl + optionsOverride.url

  // 将传入的参数与默认设置合并
  let options = Object.assign({}, _ajaxOptions, optionsOverride)

  // 请求参数处理
  let data = Object.assign({}, options.data)
  let url = options.url
  options.noNull && _formate['DEL_NULL'](data, url)
  options.method === 'GET' && (url += _formate['TO_QUERY'](data))

  let xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.open(options.method, url)
    xhr.timeout = options.timeout

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    let token = window.localStorage.getItem(ACCESS_TOKEN)
    // 设置请求头
    options.hasAccessToken && token && xhr.setRequestHeader('Access-Token', token)

    // 注册xhr对象事件
    xhr.responseType = options.dataType

    xhr.onabort = () => { reject(new Error({errorType: 'abort_error', xhr: xhr})) }
    xhr.ontimeout = () => {
      Vue.prototype.$Message.destroy()
      Vue.prototype.$Message.error({
        content: '网络异常，请稍后再试',
        duration: 5
      })
      // reject({errorType: 'timeout_error', xhr: xhr})
    }
    xhr.onerror = () => { reject(new Error('请求失败')) }
    xhr.onloadend = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        let res = null
        if (xhr.responseText) {
          try {
            res = JSON.parse(xhr.responseText)
          } catch (e) {
            Vue.prototype.$Message.error('响应格式有误， 无法解析！')
          }
        } else {
          Vue.prototype.$Message.error('后台无返回！')
        }
        _formateResData(res, url, options.whereCatch, resolve, reject)
      } else {
        reject(new Error('请求失败'))
      }
    }

    try {
      xhr.send(qs.stringify(data))
    } catch (e) {
      reject(new Error('请求失败'))
    }
  })
}

// 参数处理
const _formate = {
  DEL_NULL (data, url) {
    if (Object.prototype.toString.apply(data) !== '[object Object]') {
      throw Error(`ajax传参必须是个对象: ${url}`)
    }
    Object.keys(data).forEach(k => {
      (data[k] === '' || data[k] === undefined || data[k] === null) && delete data[k]
    })
  },
  TO_QUERY (data) {
    let query = ''
    for (let [k, v] of Object.entries(data)) {
      query += `&${k}=${v}`
    }
    return `?${query.slice(1)}`
  }
}

const _errTip = (res, url) => {
  let msg = res['errmsg'].replace(/<\/?p>/g, '')
  Vue.prototype.$Message.error({
    content: msg || `空 errmsg: ${url}！`,
    duration: 6
  })
}
