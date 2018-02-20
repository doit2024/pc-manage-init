#!/usr/bin/env node

const { config_file } = require('../config')
const Tool = require('../Tool.class')

Tool.success('开始初始化!')
Tool.success(`获取 ${config_file}!`)

require('../task/add_to_gitignore')(config_file)

const dirs = ['ajax', 'bus', 'components', 'config', 'global',
'pages', 'plugins', 'router', 'scss', 'style', 'vuex']
dirs.forEach(dir => Tool.task('fill', dir))

