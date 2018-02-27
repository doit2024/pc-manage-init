import { aes } from '@/global/funs'
import { USER_INFO } from '../../php/project'

let baseUrl = ''
let env = process.env.NODE_ENV

switch (env) {
  case 'development':
    window.localStorage.setItem(USER_INFO, aes.encrypt(JSON.stringify({
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
