#!/usr/bin/env node

const path = require('path')
const Tool = require('../Tool.class')

require('../task/add_configfile')(() => {
  require('../task/confirm_init')(() => {
    Tool.success('开始初始化!')
    Tool.addTo(Tool.find('.eslintignore'), ['/src/components/index.js', '/src/router/index.js', '/src/plugins'])

    Tool.success('填充src目录!')
    Tool.copyDir(path.join(__dirname, '../lib/src'), Tool.find('src'))

    Tool.taskFill(['pages', 'router'])

    require('../task/set_proxy')()
  })
})
