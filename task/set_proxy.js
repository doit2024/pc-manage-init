const fs = require('fs')
const Tool = require('../Tool.class')
const { HOST, PORT } = Tool.getConfig()

const target = Tool.find('config/index.js')

module.exports = () => {
  fs.readFile(target, (err, res) => {
    Tool.dieif(err, __filename, __line)
    let data = res.toString()
    data = data.replace('proxyTable: {},', `proxyTable: {
      '/local': {
        target: '${HOST}:${PORT}/index.php/',
        changeOrigin: true,
        pathRewrite: {
          '^/local': ''
        }
      }
    },`)
      .replace(/(target: 'https?:\/\/[\.\d]+:)\d+(\/index.php\/')/, `$1${PORT}$2`)
      .replace(/(port:\s?)\d+/, `$1${PORT}`)
      // .replace(/(assetsPublicPath: ')(\/')/, '$1.$2')
    fs.writeFile(target, data, err => {
      Tool.dieif(err, __filename, __line)
      Tool.success('本地代理设置完成！')
    })
  })
}
