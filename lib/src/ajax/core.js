import Vue from 'vue'
import qs from 'qs'
import router from '@/router'
import { baseUrl } from '@/config'
import { ACCESS_TOKEN } from '../../php/project'
import { getStore } from '@/global/utils'
import oMock from './mock'

// 响应处理
const _formateResData = (res, url, whereCatch, resolve, reject) => {
    if (oMock[url]) {
        console.log('----mockData:----' + url + '----:', oMock[url])
        resolve(oMock[url])
    } else {
        if (res.errcode === 0) {
            resolve(res.data)
        } else {
            if (whereCatch === 'local') {
                reject(res)
            } else if (whereCatch === 'ajax') {
                if (res.errcode === 400006) {
                    Vue.prototype.$Modal.info({
                        title: '提示', content: '凭证失效， 点击确定重新登录', onOk: () => { router.replace('/login') }
                    })
                    return
                }
                _errTip(res, url)
            } else {
                reject(res)
                _errTip(res, url)
            }
        }
    }
}

// ajax函数的默认参数
const _ajaxOptions = {
    url: '#',
    method: 'POST',
    timeout: 10000,
    data: {},
    noNull: true,
    dataType: 'text',
    hasAccessToken: true,
    whereCatch: 'ajax'  // ['local','ajax','both']
}

export default optionsOverride => {
    optionsOverride.url = baseUrl + optionsOverride.url
    // 拼接域名与将传入的参数

    let options = Object.assign({}, _ajaxOptions, optionsOverride)
    // 将传入的参数与默认设置合并

    let data = options.data
    let url = options.url
    options.noNull && _formate['DEL_NULL'](data, url)
    options.method === 'GET' && (url += _formate['TO_QUERY'](data))
    // 请求参数处理

    let xhr = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
        xhr.open(options.method, url)
        xhr.timeout = options.timeout

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
        let token = getStore(ACCESS_TOKEN)
        options.hasAccessToken && token && xhr.setRequestHeader('Access-Token', token)
        // 设置请求头

        xhr.responseType = options.dataType
        // 注册xhr对象事件

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
                let res = JSON.parse(xhr.responseText)
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
