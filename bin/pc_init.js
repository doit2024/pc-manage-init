#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const { INIT_DIR } = require('../config.js')
const start = require('../lib/start')

if (!fs.existsSync(INIT_DIR)) {
  shell.cp('-R', path.join(__dirname, '..', 'template', INIT_DIR), '.')
  console.log(chalk.green(' => 请配置init目录 =>'))
} else {
  // start()
  co(function *() {
    const ok = yield prompt.confirm(chalk.red.bold('=> 将会清空src?(yes/no) '))
    process.stdin.pause()
    if (ok) {
      start()
    }
  })
}
