const read = require('fs').readFileSync
const path = require('path')
const shell = require('shelljs')
const yml = require('js-yaml')
const { INIT_DIR } = require('../config')

module.exports = {
  isString: v => typeof v === 'string',

  parseYml: name => yml.load(read(path.join(INIT_DIR, `${name}.yml`))),

  catTpl: name => shell.cat(path.join(__dirname, `../template/tpl/${name}.tpl`))
}
