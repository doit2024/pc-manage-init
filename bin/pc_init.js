#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const prompt = require('co-prompt')
const chalk = require('chalk')
const { INIT_DIR } = require('../config.js')

const isExist = fs.existsSync(path.join(process.cwd(), INIT_DIR))

if (!isExist) {
  (async function () {
    const ok = await prompt.confirm(chalk.red.bold('=> 将会清空src?(yes/no) '))
    process.stdin.pause()
    if (ok) {
      shell.rm('-rf', '。/src')
      shell.cp('-R', path.join(__dirname, '..', 'template', 'src'), '.')
      shell.cp('-R', path.join(__dirname, '..', 'template', INIT_DIR), '.')
      console.log('请配置init目录 =>')
    }
  })()
} else {
  const eslintignoreList = [
    '/src/ajax/mock.js',
    '/src/components/index.js',
    '/src/router/index.js',
    '/src/plugins'
  ]
  const a = shell.grep(eslintignoreList[0], '.eslintignore')
  if (a.stdout === '\n') {
    fs.appendFile('.eslintignore', eslintignoreList.join('\n'), e => {})
  }
}
