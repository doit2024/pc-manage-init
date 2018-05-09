const { parseYml } = require('./helper')

let ymls = {
  project: {},
  tables: []
}

Object.keys(ymls).forEach(name => (ymls[name] = parseYml(name)))

module.exports = ymls
