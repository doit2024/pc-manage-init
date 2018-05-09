const read  = require('fs').readFileSync
const path  = require('path')
const yml   = require('js-yaml')

module.exports = {
  parseYml: name => yml.load(read(path.join(process.cwd(), 'php', `${name}.yml`)))
}
