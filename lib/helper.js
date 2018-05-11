const read = require('fs').readFileSync
const path = require('path')
const shell = require('shelljs')
const yml = require('js-yaml')
const { INIT_DIR } = require('../config')

module.exports = {
  isString: v => typeof v === 'string',

  parseYml: name => yml.load(read(path.join(INIT_DIR, `${name}.yml`))),

  catTpl: name => shell.cat(path.join(__dirname, `../template/tpl/${name}.tpl`)),

  handleReplace: {
    selectIdName: v => `
      selectIdName="${v}"`,
    slots: arr => {
      let r = arr.map(v => {
        const [left, right] = v.split(':')
        if (left === 'new') return `<DtBtnNew :api="api">${right}</DtBtnNew>`
        if (left === 'ept') return `<DtBtnImp :api="api">${right}</DtBtnImp>`
        if (left === 'xpt') return `<DtBtnXpt :api="api">${right}</DtBtnXpt>`
        if (left === 'del') return `<DtBtnDel :api="api" ids="ids">${right}</DtBtnDel>`
      }).join('\n    ')
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
    if (item === 'detail') return `this.$cc.hDetail(h, params, {router: \`\${this.api}_detail\`})`
    if (item === 'edit') return `this.$cc.hEdit(h, params, {modal: \`\${this.api}_detail\`})`
    if (item === 'del') return `this.$cc.hDel(h, params, {api: this.api})`
  }).join(',\n            ')
  return `\n            ${rst}\n          `
}
