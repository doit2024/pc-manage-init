/**
 * 业务方法
 */

import { AES_KEY } from '../../pro.config'
import GibberishAES from '@/plugins/gibberish-aes'

export const aes = {
  encrypt: item => GibberishAES.aesEncrypt(item, AES_KEY).trim(),
  decrypt: item => GibberishAES.aesDecrypt(item, AES_KEY)
}

export const handleTimestamp = {
  toDateTime: (time, toMs = 1000) => (!time || time === '0') ? '---' : _formatTimestamp(new Date(toMs * time), 'yyyy-MM-dd hh:mm:ss'),
  toDate: (time, toMs = 1000) => (!time || time === '0') ? '---' : _formatTimestamp(new Date(toMs * time), 'yyyy/MM/dd'),
  toDays: phpTime => phpTime / 60 / 60,
  toTime: phpTime => {
    let seconds = new Date(phpTime).getSeconds()
    let minutes = new Date(phpTime).getMinutes()
    let hours = parseInt(phpTime / 3600)
    return _padLeftZero(hours) + ':' + _padLeftZero(minutes) + ':' + _padLeftZero(seconds)
  }
}

/* ------ 私有 ------- */
function _formatTimestamp (date, fmt) {
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _padLeftZero(str)
    }
  }
  return fmt
}

function _padLeftZero (strOrNum) {
   return ('00' + strOrNum).substr(('' + strOrNum).length)
}
