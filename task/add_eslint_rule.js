const fs = require('fs')
const Tool = require('../Tool.class')

const target = Tool.find('.eslintrc.js')

module.exports = () => {
  fs.access(target, err => {
    Tool.dieif(err, __filename, __line)
    fs.readFile(target, (err, res) => {
      Tool.dieif(err, __filename, __line)
      const tpl = _filterEslintRules(res.toString())
      fs.writeFile(target, tpl, err => Tool.dieif(err, __filename, __line))
    })
  })
}

function _filterEslintRules (data) {
  data = data.includes('vue/no-parsing-error')
    ? data
    : data.replace(/(rules:\s?\{)/, `$1\n    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],`)
  return data
}
