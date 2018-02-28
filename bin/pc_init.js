#!/usr/bin/env node

const path = require('path')
const Tool = require('../Tool.class')

const eslintignoreList = [
  '/src/ajax/mock.js',
  '/src/components/index.js',
  '/src/router/index.js',
  '/src/plugins'
]

require('../task/add_configfile')(() => {
  require('../task/confirm_init')(() => {
    require('../task/add_eslint_rule')()

    Tool.success('开始初始化!')
    Tool.addTo(Tool.find('.eslintignore'), eslintignoreList)

    Tool.success('填充src目录!')
    Tool.copyDir(path.join(__dirname, '../lib/src'), Tool.find('src'))

    Tool.taskFill(['pages', 'router'])

    require('../task/set_proxy')()
  })
})
