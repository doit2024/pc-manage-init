const read = require('fs').readFileSync
const path = require('path')
const yml = require('js-yaml')
const { INIT_DIR } = require('../config')

module.exports = {
  parseYml: name => yml.load(read(path.join(INIT_DIR, `${name}.yml`)))
}
