const fs = require('fs')
const Tool = require('../Tool.class')

const target = Tool.find('.gitignore')

module.exports = str => {
  fs.exists(target, exist => {
    if (exist) {
      fs.readFile(target, (err, data) => {
        Tool.dieif(err)
        if (!data.toString().includes(str)) {
          fs.appendFile('.gitignore', `\n${str}\n`, err => {
            Tool.dieif(err)
            Tool.success(`add ${str} to gitignore!`)
          })
        }
      })
    }
  })
}
