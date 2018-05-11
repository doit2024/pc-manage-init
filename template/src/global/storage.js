import aes from '@/global/funs'
const { encrypt, decrypt } = aes

const ACCESS_TOKEN = 'DT_ACCESS_TOKEN'
const LOGIN_USER = 'DT_LOGIN_USER'
const PARAMS = 'DT_GLOBAL_PARAMS'

// access_token: string
export const accessToken = {
  get: () => localStorage.getItem(ACCESS_TOKEN),
  set: v => localStorage.setItem(ACCESS_TOKEN, v),
  cls: () => localStorage.removeItem(ACCESS_TOKEN)
}

// login_user: obj{ mobile, password }
export const loginUser = {
  get: () => {
    let data = localStorage.getItem(LOGIN_USER)
    return data ? JSON.parse(decrypt(data)) : null
  },
  set: v => localStorage.setItem(LOGIN_USER, encrypt(JSON.stringify(v))),
  cls: () => localStorage.removeItem(LOGIN_USER)
}

// login_user: obj{ mobile, password }
export const globalParams = {
  get: () => {
    let data = localStorage.getItem(PARAMS)
    return data ? JSON.parse(data) : null
  },
  set: v => localStorage.setItem(PARAMS, JSON.stringify(v)),
  cls: () => localStorage.removeItem(PARAMS)
}
