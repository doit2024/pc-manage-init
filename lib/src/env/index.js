import { aesEncrypt } from '@/global/funs'
import { ACCESS_TOKEN } from '../../php/project'

let baseUrl = ''
let env = process.env.NODE_ENV

switch (env) {
  case 'development':
    window.localStorage.setItem(ACCESS_TOKEN, aesEncrypt(JSON.stringify({
      username: '18877880468',
      password: '123456'
    })))
    baseUrl = '/local/'
    break
  case 'production':
    baseUrl = '/index.php/'
    break
}

export {
  baseUrl
}