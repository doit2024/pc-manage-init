#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { config_file } = require('../config')
const Tool = require('../Tool.class')

require('../task/add_configfile')(() => {
  require('../task/ask_clear_src')(() => {

    Tool.success('开始初始化!')

    Tool.addTo(Tool.find('.gitignore'), config_file)
    Tool.addTo(Tool.find('.eslintignore'), ['/src/components/index.js', '/src/router/index.js'])

    Tool.success('填充src目录!')
    Tool.copyDir(path.join(__dirname, '../lib/src'), Tool.find('src'))

    Tool.taskFill(['pages', 'router'])

    require('../task/set_proxy')()

  })
})
