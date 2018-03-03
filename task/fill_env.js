const path = require('path')
const Tool = require('../Tool.class')
const { ADMIN } = Tool.getConfig()

module.exports = async dir => {
  let tpl = await Tool.readFile(path.join(__dirname, '../lib/page/env.tpl'))
  const content = tpl.replace(/\{\{\$admin\}\}/, ADMIN)
  Tool.writeFile(path.join(dir, 'index.js'), content)
}
