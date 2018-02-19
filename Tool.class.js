const fs = require('fs')
const { src, root_dir } = require('./config')

module.exports = class Tool {
  // 文件相关任务失败处理
  static dieif (err) {
    if (err) {
      throw Error(err)
    }
  }
  // 控制台任务进度打印
  static success (info) {
    console.log(`<=============== ${info} ===============>\n`)
  }
  // 从项目根目录下找文件
  static find (filename) {
    return root_dir + filename
  }
  // 源码文件夹
  static src (dirname) {
    return src + dirname
  }
  static createDir (dirname, callback) {
    const dir = this.src(dirname)
    fs.exists(dir, exist => {
      if (!exist) {
        this.success(`创建 ${dirname} 目录！`)
        fs.mkdir(dir, err => {
          this.dieif(err)
          callback(dir)
          this.success(`创建 ${dirname} 成功！`)
        })
      }
    })
  }
  static task (type, dir) {
    if (type === 'fill') {
      this.createDir(dir, dirname => {
        Tool.success(`填充 ${dir} 开始!`)
        require(`./task/${type}_${dir}`)(dirname)
      })
    }
  }
}
