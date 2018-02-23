const co = require('co')
const prompt = require('co-prompt')
const rimraf = require('rimraf')
const Tool = require('../Tool.class')

const fs = require('fs')

module.exports = cb => {
  co(function *(){
    const ok = yield prompt.confirm('<=============== 是否清空/src?(yes/no)')
    console.log('\n')
    process.stdin.pause()
    if (ok) {
      rimraf(Tool.find('src'), () => {
        fs.mkdir(Tool.find('src'), err => {
          Tool.dieif(err, __filename, __line)
          cb()
        })
      })
    } else {
      cb()
    }
  })
}

