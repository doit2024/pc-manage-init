const { parseYml } = require('./helper')

let ymls = {
  PROJECT: {},
  TABLES: []
}

Object.keys(ymls).forEach(name => (ymls[name] = parseYml(name.toLowerCase())))

module.exports = ymls
