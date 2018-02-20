const fs = require('fs')
const path = require('path')
const Tool = require('../Tool.class')
const { ROUTES } = Tool.getConfig()

module.exports = dir => {
  Object.keys(ROUTES).forEach(first => {
    // 创建一级目录
    let groupFirst = path.join(dir, first)
    fs.mkdir(groupFirst, err => {
      Tool.dieif(err)
      fs.writeFile(path.join(groupFirst, 'index.js'), 'router-view', err => Tool.dieif(err))
      ROUTES[first].forEach((second, index) => {
        // 创建二级目录
        let groupSecond = path.join(groupFirst, `${index}_${second[0]}`)
        fs.mkdir(groupSecond, err => {
          Tool.dieif(err)
          // 创建二级目录下的文件
          second.forEach(page => {
            fs.writeFile(path.join(groupSecond, `${page}.vue`), page, err => {
              Tool.dieif(err)
            })
          })
        })
      })
    })
  })
}
