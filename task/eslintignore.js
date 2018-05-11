const fs = require('fs')
const shell = require('shelljs')

const list = [
  '/src/ajax/mock.js',
  '/src/components/index.js',
  '/src/router/index.js',
  '/src/plugins'
]

module.exports = () => {
  const a = shell.grep(list[0], '.eslintignore')
  if (a.stdout === '\n') {
    fs.appendFile('.eslintignore', list.join('\n'), e => {})
  }
}
