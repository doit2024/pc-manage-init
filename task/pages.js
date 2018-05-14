const shell = require('shelljs')
const ymls = require('../lib/yml')
const { isString, catTpl, handleReplace } = require('../lib/helper')
const { PROJECT, TABLES } = ymls
const { ROUTES } = PROJECT

module.exports = () => {
  ROUTES.forEach((child, i) => {
    if (i === 0) return
    isString(child) && (child = [child])
    const childDir = `src/pages/home/${i + 1}_${child[0]}`
    shell.mkdir('-p', childDir)
    child.forEach(c => {
      if (TABLES[c]) {
        // 表格页面
        catTpl('table').sed('-i', /\{\{\$(\w+)\}\}/, (a, b) => {
          let rst = TABLES[c][b]
          if (rst && b === 'selectIdName') rst = handleReplace.selectIdName(rst)
          if (rst && b === 'slots') rst = handleReplace.slots(rst)
          if (rst && b === 'columns') rst = handleReplace.columns(rst)
          return rst || ''
        }).to(`${childDir}/${c}.vue`)
      } else {
        // 普通页面
        catTpl('other').sed('-i', /\{\{\$page\}\}/, c).to(`${childDir}/${c}.vue`)
      }
    })
  })
}
