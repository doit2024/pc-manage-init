const shell = require('shelljs')
const { PROJECT } = require('../lib/yml')
const { HOST, PORT } = PROJECT

module.exports = () => {
  shell.sed('-i', /proxyTable:\s*\{\s*\}/, `proxyTable: {
      '/index.php': {
        target: '${HOST}:${PORT}',
        changeOrigin: true
      }
    }`, 'config/index.js')
    .sed('-i', /target:\s*'https?:[\/\d\.]+:\d+'/, `target: '${HOST}:${PORT}'`, 'config/index.js')
}
