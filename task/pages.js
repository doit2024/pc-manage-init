const shell = require('shelljs')
const ymls = require('../lib/yml')
const { isString, catTpl } = require('../lib/helper')
const { PROJECT, TABLES } = ymls
const { ROUTES } = PROJECT

const handleReplace = {
  selectIdName: v => `
    selectIdName="${v}"`,
  slots: arr => {
    let flag = false
    let r = arr.map(v => {
      const [left, right] = v.split(':')
      if (left === 'new') return `<DtBtnNew :api="api">${right}</DtBtnNew>`
      if (left === 'ept') return `<DtBtnImp :api="api">${right}</DtBtnImp>`
      if (left === 'xpt') return `<DtBtnXpt :api="api">${right}</DtBtnXpt>`
      if (left === 'del') {
        flag = true
        return `<DtBtnBatchDel :api="api" :ids="props.target">${right}</DtBtnBatchDel>`
      }
    }).join('\n    ')
    if (flag) {
      r = `<template slot-scope="props">
      ${r}
    </template>`
    }
    return `\n    ${r}\n  `
  },
  columns: columns => {
    const rst = columns.map(item => {
      const [left, right] = item.split(':')
      if (left === 'selection') return `this.$cc.selection`
      if (left === '_index') return `this.$cc.orderIndex`
      if (left === 'ctime') return `this.$cc.ctime`
      if (left === 'atime') return `this.$cc.atime`
      if (left === 'action') return handleAction(right)
      return `{
          title: '${right}',
          key: '${left}'
        }`
    }).join(',\n        ')
    return `\n        ${rst}`
  }
}

function handleAction (right) {
  const actions = right.split('|')
  return `{
          title: '操作',
          key: 'action',
          render: (h, params) => h('div', {
            attrs: { style: 'display: flex' }
          }, [${joinAction(actions)}])
        }`
}

function joinAction (actions) {
  const rst = actions.map(item => {
    if (item === 'download') return `this.$cc.hDownload(h, params)`
    if (item === 'detail') return `this.$cc.hDetail(h, params, {modal: \`m_\${this.api}_detail\`})`
    if (item === 'edit') return `this.$cc.hEdit(h, params, {modal: \`m_\${this.api}_edit\`})`
    if (item === 'del') return `this.$cc.hDel(h, params, {api: this.api})`
  }).join(',\n            ')
  return `\n            ${rst}\n          `
}

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
