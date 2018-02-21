/**
 * 业务方法
 */

import { AES_KEY } from '../../pro.config'
import GibberishAES from '@/plugins/gibberish-aes'

export const aesEncrypt = item => GibberishAES.aesEncrypt(item, AES_KEY).trim() // aes加密
export const aesDecrypt = item => GibberishAES.aesDecrypt(item, AES_KEY)   // aes解密
export const formatDate1 = (time, toMs = 1000) => _formatDate(new Date(toMs * time), 'yyyy-MM-dd hh:mm:ss')  // 时间格式化
export const formatDate2 = (time, toMs = 1000) => _formatDate(new Date(toMs * time), 'yyyy/MM/dd')

/* ------ 私有 ------- */
function _formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}
