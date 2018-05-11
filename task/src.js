const path = require('path')
const shell = require('shelljs')

module.exports = () => {
  shell.rm('-rf', './src')
  shell.cp('-R', path.join(__dirname, '..', 'template', 'src'), '.')
}
