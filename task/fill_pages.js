const fs = require('fs')
const path = require('path')
const Tool = require('../Tool.class')
const { ROUTES, TABLE_PAGES } = Tool.getConfig()

module.exports = dir => {
  Object.keys(ROUTES).forEach(first => {
    // 创建一级目录
    let groupFirst = path.join(dir, first)
    fs.mkdir(groupFirst, err => {
      Tool.dieif(err)
      fs.readFile(path.join(__dirname, '../lib/page/router-view.tpl'), (err, res) => {
        Tool.dieif(err, __filename, __line)
        let tpl = res.toString()
        fs.writeFile(path.join(groupFirst, 'index.vue'), tpl, err => Tool.dieif(err))
      })
      ROUTES[first].forEach((second, index) => {
        // 创建二级目录
        let groupSecond = path.join(groupFirst, `${index}_${second[0]}`)
        fs.mkdir(groupSecond, err => {
          Tool.dieif(err, __filename, __line)
          // 创建二级目录下的文件
          second.forEach(page => {
            let tablePage = TABLE_PAGES[page]
            fs.readFile(path.join(__dirname, `../lib/page/${tablePage ? 'table' : 'simple'}.tpl`), (err, res) => {
              Tool.dieif(err, __filename, __line)
              let tpl = _filterTablePage(res.toString(), tablePage)
              fs.writeFile(path.join(groupSecond, `${page}.vue`), tpl, err => {
                Tool.dieif(err, __filename, __line)
              })
            })
          })
        })
      })
    })
  })
}

function _filterTablePage (tpl, filter) {
  if (filter) {
    tpl = tpl.replace(/\{\{\$(\w+)\}\}/g, (a, b, c) => {
      let tmp = filter[b]
      switch (b) {
        case 'slots': tmp = _handleSlots(filter); break
        case 'columns': tmp = _handleColumns(filter); break
      }
      return tmp
    })
  }
  return tpl
}

function _handleSlots(filter) {
  let tpl = ''
  let slots = filter.slots
  if (slots.length) {
    slots.forEach(item => {
      aItem = item.split(':')
      if (aItem[0] === 'new') {
        tpl += `${tpl ? '' : '\n'}    <DtBtnNew api="${filter.api}">${aItem[1]}</DtBtnNew>\n`
      }
      if (aItem[0] === 'del') {
        tpl += `${tpl ? '' : '\n'}    <DtBtnDel api="${filter.api}">${aItem[1]}</DtBtnDel>\n`
      }
    })
  }
  return tpl && tpl + '  '
}

function _handleColumns(filter) {
  let tpl = ''
  let columns = filter.columns
  columns.forEach(item => {
    aItem = item.split(':')
    switch (aItem[0]) {
      case 'selection':
      tpl += `{
        width: 60,
        type: 'selection',
        align: 'center'
      }`
      break
      case '_index':
      tpl += `${tpl ? ', ' : ''}{
        width: 60,
        title: '${aItem[1]}',
        key: 'index',
        render: (h, params) => h('span', params.row._index)
      }`
      break
      case 'action':
      let actions = aItem[1].split('|')
      tpl += `, {
        title: '操作',
        key: 'action',
        render: (h, params) => h('div', {
          class: 'flex'
        }, [
          ${actions.map(act => act)}
        ])
      }`
      break
      default:
      tpl += `${tpl ? ', ' : ''}{
        title: '${aItem[1]}',
        key: '${aItem[0]}'
      }`
    }
  })
  return tpl
}
