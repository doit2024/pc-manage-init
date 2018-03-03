const fs = require('fs')
const path = require('path')
const Tool = require('../Tool.class')
const { ROUTES, TABLE_PAGES } = Tool.getConfig()

module.exports = dir => {
  require('./create_sider')(dir, () => {
    Object.keys(ROUTES).forEach(first => {
      // 创建一级目录 (login|home|modal|...])
      Tool.createDir(path.join('pages', first), groupFirst => {
        Tool.copyDir(path.join(__dirname, '../lib', first), groupFirst)
        ROUTES[first].forEach((second, index) => {
          // 创建二级目录
          Tool.createDir(path.join('pages', first, `${index}_${second[0]}`), groupSecond => {
            // 创建二级目录下的文件
            second.forEach(page => {
              let tablePage = TABLE_PAGES[page]
              fs.readFile(path.join(__dirname, `../lib/page/${tablePage ? 'table' : 'simple'}.tpl`), (err, res) => {
                Tool.dieif(err, __filename, __line)
                let tpl = _filterTablePage(res.toString(), tablePage, page)
                fs.writeFile(path.join(groupSecond, `${page}.vue`), tpl, err => {
                  Tool.dieif(err, __filename, __line)
                  if (page === 'signup') {
                    Tool.copyFile(path.join(__dirname, '../lib/page/signup.tpl'), path.join(groupSecond, `signup.vue`))
                  }
                })
              })
            })
          })
        })
      })
    })
  })
}

function _filterTablePage (tpl, filter, page) {
  if (filter) {
    // table页面
    tpl = tpl.replace(/\{\{\$(\w+)\}\}/g, (a, b, c) => {
      let tmp = filter[b]
      switch (b) {
        case 'slots': tmp = tmp ? _handleSlots(filter) : ''; break
        case 'selectIdName': tmp = tmp ? ` selectIdName="${tmp}"` : ''; break
        case 'columns': tmp = _handleColumns(filter); break
      }
      return tmp
    })
  } else {
    // 其他页面
    console.log()
    tpl = tpl.replace(/\{\{\$page\}\}/, page)
  }
  return tpl
}

function _handleSlots (filter) {
  let tpl = ''
  let slots = filter.slots
  let isWrapTemplate = false
  if (slots.length) {
    slots.forEach(item => {
      let aItem = item.split(':')
      switch (aItem[0]) {
        case 'new':
          tpl += `${tpl ? '' : '\n'}${isWrapTemplate ? '      ' : '    '}<DtBtnNew name="${filter.api}">${aItem[1]}</DtBtnNew>\n`
          break
        case 'del':
          isWrapTemplate = true
          tpl = `\n    <template slot-scope="props">${tpl}`
          tpl += `\n      <DtBtnDel api="${filter.api}" :target="props.target">${aItem[1]}</DtBtnDel>\n`
          break
        case 'import':
          tpl += `${tpl ? '' : '\n'}${isWrapTemplate ? '      ' : '    '}<DtBtnImport name="${filter.api}">${aItem[1]}</DtBtnImport>\n`
          break
        default:
          Tool.error('not config:' + aItem[0])
      }
    })
  }
  return tpl && tpl + (isWrapTemplate ? '    </template>\n  ' : '  ')
}

function _handleColumns (filter) {
  let tpl = ''
  let columns = filter.columns
  let pre = '\n        '
  columns.forEach(item => {
    let [key, title] = item.split(':')
    switch (key) {
      case 'selection': tpl += `${pre}this.$cc.selection`; break
      case '_index': tpl += `${tpl ? ',' : ''}${pre}this.$cc.orderIndex`; break
      case 'ctime': tpl += `${tpl ? ',' : ''}${pre}this.$cc.ctime`; break
      case 'atime': tpl += `${tpl ? ',' : ''}${pre}this.$cc.atime`; break
      case 'action':
      let actions = title.split('|')
      tpl += `,
        {
          title: '操作',
          key: 'action',
          render: (h, params) => h('div', {
            attrs: { style: 'display: flex' }
          }, [
            ${actions.map(act => {
              switch (act) {
                case 'download': return `this.$cc.hDownload(h, params)`
                case 'detail': return `this.$cc.hDetail(h, params, {'router|modal': '---'})`
                case 'edit': return `this.$cc.hEdit(h, params, {'router|modal': '---'})`
                case 'del': return `this.$cc.hDel(h, params, {api: '${filter.api}'})`
              }
            }).join(',\n            ')}
          ])
        }`
      break
      default:
        tpl += `${tpl ? ',' : ''}
        {
          title: '${title}',
          key: '${key}'
        }`
    }
  })
  return tpl
}
