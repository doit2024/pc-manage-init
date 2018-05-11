import { AES_KEY } from '../../init/project'
import GibberishAES from '@/plugins/gibberish-aes'

export const aes = {
  encrypt: item => GibberishAES.aesEncrypt(item, AES_KEY).trim(),
  decrypt: item => GibberishAES.aesDecrypt(item, AES_KEY)
}

/**
 * 若复杂则使用 moment 库
 */
export const filterTimestamp = {
  toDateTime: unixTime => (!unixTime || unixTime === '0') ? '---' : _formatTimestamp(new Date(unixTime * 1000), 'yyyy-MM-dd hh:mm:ss'),
  toDate: unixTime => (!unixTime || unixTime === '0') ? '---' : _formatTimestamp(new Date(unixTime * 1000), 'yyyy/MM/dd'),
  toDays: unixTime => unixTime / 3600,
  toTime: msTime => {
    let seconds = new Date(msTime).getSeconds()
    let minutes = new Date(msTime).getMinutes()
    let hours = parseInt(msTime / 3600)
    return _padLeftZero(hours) + ':' + _padLeftZero(minutes) + ':' + _padLeftZero(seconds)
  }
}
/**
 * 递归下载
 * @param file {array|string}
 */
export const download = file => {
  if (file instanceof Array) {
    file.forEach(f => download(f))
  } else {
    let elemIF = document.createElement('iframe')
    elemIF.src = file
    elemIF.style.display = 'none'
    document.body.appendChild(elemIF)
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _padLeftZero(str))
    }
  }
  return fmt
}

function _padLeftZero (strOrNum) {
  return ('00' + strOrNum).substr(('' + strOrNum).length)
}
