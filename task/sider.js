const { isString, catTpl } = require('../lib/helper')
const { PROJECT } = require('../lib/yml')

const { ROUTES } = PROJECT

module.exports = () => {
  console.log('jello')
  const content = ROUTES.map((route, i) => {
    if (isString(route)) {
      return `hello`
    } else {
      return route.map(r => `woody`).join('\n')
    }
  }).join('\n')

  catTpl('sider')
    .sed('-i', /\{\{\$content\}\}/, content)
    .to('src/pages/home/sider.vue')
}
