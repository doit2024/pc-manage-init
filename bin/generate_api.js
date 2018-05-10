#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { INIT_DIR } = require('../config.js')

const apiText = fs.readFileSync(path.join(process.cwd(), INIT_DIR, 'apidoc.js')).toString()
const apiTextArr = apiText.split('/**')
const apiArr = []
while (apiTextArr.length) {
  const api = apiTextArr.shift()
  if (api.match('@api')) {
    apiArr.push({
      url: /@api\s\{\w+\}\s([/a-zA-Z_]+)\s.+/.exec(api)[1],
      cnInfo: /@api.+\s(\S+)/.exec(api)[1],
      module: /@apiGroup\s+(\S+)/.exec(api)[1],
      action: /@apiName\s+(\S+)/.exec(api)[1],
      mock: api.replace(/\*.*/g, '').trim()
    })
  }
}

const apiArrWithoutAccount = apiArr.filter(v => v.module !== 'account')

let allApi = {}
let allMock = ''
apiArrWithoutAccount.forEach((v, i) => {
  const { module, action, url, cnInfo, mock } = v
  allApi[module] = allApi[module] || {}
  allApi[module][action] = `data => ajax({url: '${url}', data})`

  allMock += `${i === 0 ? '' : '\n'}// '${cnInfo}':
  '/${url}':
    ${mock},`
})

let apiContent = `
import ajax from './core'
import { aes } from '@/global'\n
export default {
  account: {
    login: ({username, password}) => ajax({url: 'account/login',
      data: {
        username: username && aes.encrypt(username),
        password: password && aes.encrypt(password)
      },
      whereCatch: 'local'
    }),
    logout: () => ajax({url: 'account/logout', whereCatch: 'local'}),
    info: () => ajax({url: 'account/info', whereCatch: 'local'}),
    setting: data => ajax({url: 'account/setting',
      data: {
        ...data,
        old_pwd: data.old_pwd && aes.encrypt(data.old_pwd),
        new_pwd: data.old_pwd && aes.encrypt(data.new_pwd),
        repwd: data.old_pwd && aes.encrypt(data.repwd)
      }
    })
  },
` + JSON.stringify(allApi, null, 2).replace(/"/g, '').slice(1) + '\n'

fs.writeFile(path.join(process.cwd(), 'src', 'ajax', 'index.js'), apiContent, e => {
  console.log('api done!')
})

let mockContent = `
export default {
` + allMock

fs.writeFile(path.join(process.cwd(), 'src', 'ajax', 'mock.js'), mockContent, e => {
  console.log('mock done!')
})
