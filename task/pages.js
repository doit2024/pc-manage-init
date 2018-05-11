const shell = require('shelljs')
const ymls = require('../lib/yml')
const { PROJECT, TABLES } = ymls
const { ROUTES } = PROJECT

const isString = v => typeof v === 'string'

module.exports = () => {
  ROUTES.forEach((child, i) => {
    const c = isString(child) ? child : child[0]
    shell.mkdir('-p', `src/pages/home/${i + 1}_${c}`)
    if (TABLES[c]) {
      console.log(TABLES[c])
    }
  })
}
