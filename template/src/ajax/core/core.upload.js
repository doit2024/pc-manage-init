import { BASE_URL } from '@/config'

export default (url, file) => {
  let formData = new FormData()
  formData.append('file', file)
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', BASE_URL + url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let obj = xhr.response
          typeof obj !== 'object' && (obj = JSON.parse(obj))
          obj['errcode'] === 0 ? resolve(obj) : reject(obj)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.send(formData)
  })
}
