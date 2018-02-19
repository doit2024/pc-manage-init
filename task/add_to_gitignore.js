const fs = require('fs')
const Tool = require('../Tool.class')

module.exports = str => {
  fs.readFile('.gitignore', (err, data) => {
    Tool.dieif(err)
    if (!data.toString().includes(str)) {
      fs.appendFile('.gitignore', `\n${str}\n`, err => {
        Tool.dieif(err)
        Tool.success(`add ${str} to gitignore!`)
      })
    }
  })
}
