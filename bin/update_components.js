#!/usr/bin/env node
const path = require('path')
const Tool = require('../Tool.class')
const CFG = require('../config')

console.log(Tool.find(path.join(CFG['src'], 'components')))
