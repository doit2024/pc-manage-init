#!/usr/bin/env node

const { config_file } = require('../config')
const Tool = require('../Tool.class')
const add_to_gitignore = require('../task/add_to_gitignore')

const dirs = ['ajax', 'bus', 'components', 'config', 'global',
'pages', 'plugins', 'router', 'scss', 'style', 'vuex']

Tool.success('开始初始化!')
Tool.success(`获取 ${config_file}!`)

add_to_gitignore(config_file)

dirs.forEach(dir => Tool.task('fill', dir))

