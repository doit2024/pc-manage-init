const fs = require('fs')
const path = require('path')
const CFG = require('./config')

Object.defineProperty(global, '__stack', {
    get: function(){
      var orig = Error.prepareStackTrace
      Error.prepareStackTrace = function(_, stack){ return stack; }
      var err = new Error
      Error.captureStackTrace(err, arguments.callee)
      var stack = err.stack
      Error.prepareStackTrace = orig
      return stack
  }
})
Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
})

module.exports = class Tool {
  // 文件相关任务失败处理
  static dieif (err, errDir, line) {
    if (err) {
      Tool.error('文件名:' + path.basename(errDir))
      Tool.error('行数:' + line)
      throw Error(err)
    }
  }
  // 控制台任务进度打印
  static success (info) {
    console.log(`<=============== ${info} ===============>\n`)
  }
  // 错误提示打印
  static error (info) {
    console.log(`<！！！！！！！！！！ ${info} ！！！！！！！！！！>\n`)
  }
  // 从项目根目录下找文件
  static find (filename) {
    return CFG['root_dir'] + filename
  }
  // 源码文件夹
  static src (dirname) {
    return CFG['src'] + dirname
  }
  // 获取配置信息
  static getConfig () {
    let config = require(this.find(CFG['config_file']))
    let routes = {}
    Object.keys(config.ROUTES).forEach(grp => {
      // 统一为数组
      routes[grp] = config.ROUTES[grp].map(page => Array.isArray(page) ? page : [page])
    })
    config.ROUTES = routes
    config.UP_PRE = this.capitalize(config.PRE)
    return config
  }
  // 首字母大写其余小写
  static capitalize (str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  }
  // 判断不存在则创建目录
  static createDir (dirname, callback) {
    const dir = this.src(dirname)
    fs.exists(dir, exist => {
      if (!exist) {
        this.success(`创建 ${dirname} 目录！`)
        fs.mkdir(dir, err => {
          this.dieif(err, __filename, __line)
          callback(dir)
          this.success(`创建 ${dirname} 成功！`)
        })
      }
    })
  }
  // 任务
  static task (type, dir) {
    if (type === 'fill') {
      this.createDir(dir, dirname => {
        Tool.success(`填充 ${dir} 开始!`)
        require(`./task/${type}_${dir}`)(dirname)
      })
    }
  }
  // 复制目录
  static copyDir (from, to) {
    fs.readdir(from, (err, children) => {
      this.dieif(err, __filename, __line)
      children.forEach(child => {
        let childFrom = path.join(from, child)
        let childTo = path.join(to, child)
        fs.stat(childFrom, (err, stat) => {
          this.dieif(err, __filename, __line)
          if (stat.isFile()) {
            let readable = fs.createReadStream(childFrom)
            let writable = fs.createWriteStream(childTo)
            readable.pipe(writable)
          } else {
            fs.mkdir(childTo, err => {
              this.dieif(err, __filename, __line)
              this.copyDir(childFrom, childTo)
            })
          }
        })
      })
    })
  }
  // 复制文件
  static copyFile (from, to) {
    let readable = fs.createReadStream(from)
    let writable = fs.createWriteStream(to)
    readable.pipe(writable)
  }
}
