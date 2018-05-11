const fs = require('fs')
const path = require('path')
const Tool = require('../Tool.class')
const ymls = require('../lib/yml')
const { SIDER, ROUTES } = ymls.project
const SIDER_MAP = ROUTES['home']

const getTmpSubmenu = (index, arrPath, arrName) => `
      <Submenu name="${index}">
        <template slot="title">
          <Icon type="ios-list"></Icon>
          <span class="title">${arrName[0]}</span>
        </template>${arrName.map((name, index) => {
          return index ? `\n        <MenuItem name="/${arrPath[index]}">${name}</MenuItem>` : ''
        }).join('')}
      </Submenu>
`
const getTmpMenuItem = (path, name) => `
      <MenuItem name="/${path}">
        <Icon type="ios-home"></Icon>
        <span class="title">${name}</span>
      </MenuItem>
`

module.exports = (dir, cb) => {
  fs.readFile(path.join(__dirname, '../template/page/sider.tpl'), (err, res) => {
    Tool.dieif(err, __filename, __line)
    let tpl = _filterSiderPage(res.toString())
    fs.writeFile(path.join(__dirname, '../template/home/sider.vue'), tpl, err => Tool.dieif(err, __filename, __line))
    cb()
  })
}

function _filterSiderPage (tpl) {
  let openNames = ''
  let content = SIDER_MAP.map((item, index) => {
    if (item.length === 1) {
      return getTmpMenuItem(item[0], SIDER[index])
    } else {
      openNames += `${openNames ? ', ':''}'${index}'`
      return getTmpSubmenu(index, item, SIDER[index])
    }
  }).join('')
  return tpl.replace('{{$content}}', content).replace('{{$openNames}}', openNames)
}
