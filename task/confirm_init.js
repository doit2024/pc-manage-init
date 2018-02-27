const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')
const chalk = require('chalk')
const Tool = require('../Tool.class')

module.exports = cb => {
  co(function *() {
    const ok = yield prompt.confirm(chalk.red.bold('=> 确定初始化?(yes/no) '))
    console.log('\n')
    process.stdin.pause()
    if (ok) {
      fs.unlinkSync(Tool.find('src/components/HelloWorld.vue'))
      fs.unlinkSync(Tool.find('src/App.vue'))
      fs.unlinkSync(Tool.find('src/main.js'))
      cb()
    }
  })
}
