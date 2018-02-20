const path = require('path')
const Tool = require('../Tool.class')

const from = path.join(__dirname, '../lib/components')

module.exports = dir => {
  Tool.copyDir(from, Tool.find(dir))
}
