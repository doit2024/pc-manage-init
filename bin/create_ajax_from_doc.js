#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const config = require('../config')
const Tool = require('../Tool.class')

const target = Tool.find(path.join(config.dirname, config.apidoc))

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
    logout: () => ajax({url: 'account/logout', whereCatch: 'local'})
  },
`
let mockContent = `
export default {
`

fs.access(target, (err) => {
  if (err) return Tool.error(`没有找到${config.apidoc}文件`, '尝试 npm run init')
  fs.readFile(target, (err, res) => {
    Tool.dieif(err, __filename, __line)
    const data = res.toString()
    let arrApi = data.split(/\*\/\s*\n*\/\*\*/)
    let allApi = {}
    arrApi.forEach((item, index) => {
      let $api = /@api\s\{\w+\}\s([/a-zA-Z_]+)\s(.+)/.exec(item)
      let path = $api[1].toLowerCase()
      let cnInfo = $api[2]
      let mock = item.replace(/\*.*/g, '').trim()
      let [module, action] = path.split('/')
      allApi[module] = {}
      allApi[module][action] = `data => ajax({url: '${path}', data})`
      index && (mockContent += `${index === 1 ? '' : '\n'}// '${cnInfo}':
      '/local/${path}':
      ${mock},`)
    })
    // 生成 api
    apiContent += JSON.stringify(allApi, null, 2).replace(/"/g, '').slice(1) + '\n'
    fs.writeFile(
      Tool.find('src/ajax/index.js'),
      apiContent,
      err => {
        Tool.dieif(err, __filename, __line)
        Tool.success('api -> ok')
      }
    )
    // 生成 mock 数据
    fs.writeFile(
      Tool.find('src/ajax/mock.js'),
      mockContent.replace(/,$/, '\n}'),
      err => {
        Tool.dieif(err, __filename, __line)
        Tool.success('mock -> ok')
      }
    )
  })
})
