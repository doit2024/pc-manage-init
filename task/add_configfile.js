const fs = require('fs')
const path = require('path')
const { config_file } = require('../config')
const Tool = require('../Tool.class')
const from = path.join(__dirname, '../lib', config_file)
const to = Tool.find(config_file)

module.exports = cb => {
  
  fs.exists(to, exist => {

    if (!exist) {
      Tool.copyFile(from, to)
      return Tool.error(`请配置根目录下的 ${config_file}!`)
    }
    cb()

  })
}
