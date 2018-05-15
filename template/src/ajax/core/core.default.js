import CONFIG from '@/config'
import { accessToken, globalParams } from '@/global/storage'
import { Modal, Message } from 'iview'
const { BASE_URL } = CONFIG

// 错误提示
const _showNetErr = (msg = '网络异常，请稍后再试') => {
  Message && Message.destroy()
  Message.error(msg)
}

// 响应处理
const _formateResData = (res, resolve, reject, options) => {
  const { url, whereCatch } = options
  switch (res['errcode']) {
    case 0: resolve(res.data); break
    case 400006: // 凭证失效
      if (url.match('logout')) return reject(100) // 登出时
      Modal.info({ title: '提示', content: '凭证失效， 点击确定重新登录', onOk: () => { window.location = '/' } }) // 其他
      break
    case 10003: // 没有权限
      _showNetErr('请检查必选参数！')
      break
    default: // 其它错误
      if (whereCatch === 'local') return reject(res) // 本地catch
      _showNetErr(res['errmsg'] || `空 errmsg: ${url}！`) // 统一提示
  }
}

// 默认参数
const _ajaxOptions = {
  url: '#',
  method: 'POST',
  timeout: 10000,
  data: {},
  noNull: true,
  dataType: 'text',
  whereCatch: '',
  wither: ''
}

// 参数处理
const _formEncode = obj => Object.entries(obj)
  .filter(([k, v]) => ![null, undefined, ''].includes(v))
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  .join('&')

// 附加参数 a: app_id, p: product_id
const _with = (obj = {}, wither) => {
  let gp = globalParams.get()
  if (gp) {
    obj.server_area = gp.server_area
    if (wither.match('a')) obj.app_id = gp.app_id
    if (wither.match('p')) obj.product_id = gp.product_id
  }
  return obj
}

export default optionsOverride => {
  optionsOverride.url = BASE_URL + optionsOverride.url
  let options = Object.assign({}, _ajaxOptions, optionsOverride)
  let { data, url, wither } = options

  let xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.open(options.method, url)
    xhr.timeout = options.timeout
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')

    let ACCESS_TOKEN = accessToken.get()
    ACCESS_TOKEN && xhr.setRequestHeader('Access-Token', ACCESS_TOKEN)

    xhr.responseType = options.dataType
    xhr.onabort = () => { _showNetErr('请求中断') }
    xhr.ontimeout = () => { _showNetErr('请求超时') }
    xhr.onerror = _showNetErr
    xhr.onloadend = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        if (!xhr.responseText) return _showNetErr(`空返回：${url}`)
        let res = JSON.parse(xhr.responseText)
        _formateResData(res, resolve, reject, options)
      } else {
        _showNetErr()
      }
    }

    try {
      xhr.send(_formEncode(_with(data, wither)))
    } catch (e) {
      _showNetErr(e.message)
    }
  })
}
