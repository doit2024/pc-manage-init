const path = require('path')
const Tool = require('../Tool.class')
const dirFrom = path.join(__dirname, '../lib/components')

module.exports = dir => {
  Tool.copy(dirFrom, Tool.find(dir))
}
