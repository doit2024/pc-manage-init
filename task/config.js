const shell = require('shelljs')
const { PROJECT } = require('../lib/yml')
const { AES_KEY, ADMIN } = PROJECT

module.exports = () => {
  shell.sed('-i', "AES_KEY: ''", `AES_KEY: '${AES_KEY}'`, 'src/config/index.js')
  shell.sed('-i', 'ADMIN: {}', `DEV_ADMIN: {
    username: '${ADMIN.username}',
    password: '${ADMIN.password}'
  }`, 'src/config/index.js')
}
