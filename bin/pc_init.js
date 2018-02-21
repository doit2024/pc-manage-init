#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { config_file } = require('../config')
const Tool = require('../Tool.class')

const fillList = ['pages', 'router']
const eslintignoreList = ['/src/components/index.js', '/src/router/index.js']

require('../task/add_configfile')(() => {

  Tool.success('开始初始化!')
  Tool.success(`获取${config_file}!`)

  Tool.addTo(Tool.find('.gitignore'), config_file)
  Tool.addTo(Tool.find('.eslintignore'), eslintignoreList)

  Tool.success('填充src目录！')
  Tool.copyDir(path.join(__dirname, '../lib/src'), Tool.find('src'))

  Tool.success(`开始生成${fillList}!`)
  Tool.taskFill(fillList)

  Tool.success('开始设置本地代理!')
  require('../task/set_proxy')()

})
