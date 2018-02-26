const fs = require('fs')
const path = require('path')
const config = require('../config')
const Tool = require('../Tool.class')

const from = path.join(__dirname, '..', config.dirname)
const to = Tool.find(config.dirname)

module.exports = cb => {
  fs.access(to, err => {
    if (err) {
      Tool.addTo(Tool.find('.gitignore'), '/' + config.dirname)
      fs.mkdirSync(to)
      Tool.copyDir(from, to)
      Tool.error(`请配置${config.dirname}/${config.filename}!`)
    } else {
      if (config.require.every(file => fs.existsSync(path.join(to, file)))) {
        cb()
      } else {
        Tool.error(`请补全php中必须的文件`)
        Tool.error(`${config.require}`)
        Tool.error(`或删除php重新init生成默认文件`)
      }
    }
  })
}
