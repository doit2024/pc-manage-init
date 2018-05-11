#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const chalk = require('chalk')
const { INIT_DIR } = require('../config.js')

if (!fs.existsSync(INIT_DIR)) {
  shell.cp('-R', path.join(__dirname, '..', 'template', INIT_DIR), '.')
  console.log(chalk.green(' => 请配置init目录 =>'))
} else {
  require('../task/src')()
  require('../task/proxy')()
  require('../task/eslintignore')()
}
