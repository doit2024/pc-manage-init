const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')
const chalk = require('chalk')
const Tool = require('../Tool.class')

const removeList = ['src/components/HelloWorld.vue', 'src/App.vue', 'src/main.js']

module.exports = cb => {
  co(function *() {
    const ok = yield prompt.confirm(chalk.red.bold('=> 确定初始化?(yes/no) '))
    console.log('\n')
    process.stdin.pause()
    if (ok) {
      removeList.forEach(item => {
        let file = Tool.find(item)
        fs.existsSync(file) && fs.unlinkSync(file)
      })
      cb()
    }
  })
}
