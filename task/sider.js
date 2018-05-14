const { isString, catTpl } = require('../lib/helper')
const { PROJECT } = require('../lib/yml')

const { ROUTES, SIDER } = PROJECT

const icons = ['ios-home', 'fireball', 'easel', 'help-buoy', 'heart-broken', 'pie-graph', 'chatbubbles', 'beer', 'leaf', 'happy', 'trophy', 'leaf']

module.exports = () => {
  const content = ROUTES.map((route, i) => {
    if (isString(route)) {
      return `
      <MenuItem name="/${route === 'index' ? 'home' : route}">
        <Icon type="${icons[i]}"></Icon>
        <span class="title">${SIDER[i]}</span>
      </MenuItem>`
    } else {
      return `
      <Submenu name="${i}">
        <template slot="title">
          <Icon type="${icons[i]}"></Icon>
          <span class="title">${SIDER[i][0]}</span>
        </template>${route.map((path, index) => index ? `
        <MenuItem name="/${path}">${SIDER[i][index]}</MenuItem>` : '').join('')}
      </Submenu>`
    }
  }).join('\n')

  catTpl('sider')
    .sed('-i', /\{\{\$content\}\}/, content)
    .to('src/pages/home/sider.vue')
}
