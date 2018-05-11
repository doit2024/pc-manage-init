const fs = require('fs')
const path = require('path')
const Tool = require('../Tool.class')
const ymls = require('../lib/yml')
const { ROUTES } = ymls.project

const template = (first, second, page) => `const ${page.padEnd(30)} = () => import('@/pages/${first}/${second}/${page}')\n`

let content = `import Vue from 'vue'\nimport Router from 'vue-router'\n`

let routes = [{ path: '/', redirect: '/home' }]
Object.keys(ROUTES).forEach(first => {
  if (['login', 'home'].includes(first)) {
    content += `\nconst ${first.padEnd(30)} = () => import('@/pages/${first}/index')\n`
    let routerView = {
      path: `/${first}`,
      component: first,
      children: [{ path: '/', redirect: `/${ROUTES[first][0][0]}` }]
    }
    ROUTES[first].forEach((pages, index) => {
      pages.forEach(page => {
        content += template(first, `${index}_${pages[0]}`, page)
        routerView.children.push({ path: `/${page}`, name: page, component: page })
      })
    })
    routes.push(routerView)
  }
})

content += `\nVue.use(Router)\n
const routes = ${JSON.stringify(routes, null, 2).replace(/("component":\s?)"(\w+)"/g, '$1$2')}\n
export default new Router({
  routes
})
`

module.exports = dir => {
  fs.writeFile(path.join(dir, 'index.js'), content, err => {
    Tool.dieif(err, __filename, __line)
  })
}
