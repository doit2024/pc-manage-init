const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const Tool = require('../Tool.class')
const rimraf = require('rimraf')

module.exports = cb => {
  co(function *() {
    const ok = yield prompt.confirm(chalk.red.bold('=> 清空src?(yes/no) '))
    console.log('\n')
    process.stdin.pause()
    if (ok) {
      rimraf(Tool.find('src/*'), err => {
        if (err) return Tool.error(err)
        cb()
      })
    } else {
      cb()
    }
  })
}
