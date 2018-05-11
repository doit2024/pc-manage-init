const { isString, catTpl } = require('../lib/helper')
const { PROJECT } = require('../lib/yml')

const { ROUTES } = PROJECT

module.exports = () => {
  const imports = ROUTES.map((route, i) => {
    if (isString(route)) {
      return `const ${route.padEnd(20)}= () => import('@/pages/home/${i + 1}_${route}/${route}.vue')`
    } else {
      return route.map(r => `const ${r.padEnd(20)}= () => import('@/pages/home/${i + 1}_${route[0]}/${r}.vue')`).join('\n')
    }
  }).join('\n')

  const routes = ROUTES.map((route, i) => {
    if (isString(route)) {
      return `        { path: ${(`'/${route}',`).padEnd(20)} name: ${(`${route},`).padEnd(20)} component: ${route.padEnd(20)} },`
    } else {
      return route.map(r => `        { path: ${(`'/${r}',`).padEnd(20)} name: ${(`${r},`).padEnd(20)} component: ${r.padEnd(20)} },`).join('\n')
    }
  }).join('\n')

  catTpl('router')
    .sed('-i', /\{\{\$imports\}\}/, imports)
    .sed('-i', /\{\{\$routes\}\}/, routes)
    .to('src/router/index.js')
}
