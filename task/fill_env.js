const path = require('path')
const Tool = require('../Tool.class')
const ymls = require('../lib/yml')
const { ADMIN } = ymls.project

module.exports = async dir => {
  let tpl = await Tool.readFile(path.join(__dirname, '../template/page/env.tpl'))
  const content = tpl.replace(/\{\{\$admin\}\}/, ADMIN)
  Tool.writeFile(path.join(dir, 'index.js'), content)
}
