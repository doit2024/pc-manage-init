// https://github.com/calebroseland/vue-dom-portal
function getTarget (node = document.body) {
  if (node === true) return document.body
  return node instanceof window.Node ? node : document.querySelector(node)
}

const homes = new Map()

const directive = {
  inserted (el, { value }, vnode) {
    const { parentNode } = el
    const home = document.createComment('')
    let hasMovedOut = false
    if (value !== false) {
      parentNode.replaceChild(home, el)
      getTarget(value).appendChild(el)
      hasMovedOut = true
    }
    if (!homes.has(el)) homes.set(el, { parentNode, home, hasMovedOut })
  },
  componentUpdated (el, { value }) {
    const { parentNode, home, hasMovedOut } = homes.get(el)
    if (!hasMovedOut && value) {
      parentNode.replaceChild(home, el)
      getTarget(value).appendChild(el)
      homes.set(el, Object.assign({}, homes.get(el), { hasMovedOut: true }))
    } else if (hasMovedOut && value === false) {
      parentNode.replaceChild(el, home)
      homes.set(el, Object.assign({}, homes.get(el), { hasMovedOut: false }))
    } else if (value) {
      getTarget(value).appendChild(el)
    }
  },
  unbind (el, binding) {
    homes.delete(el)
  }
}

function plugin (Vue, { name = 'dom-portal' } = {}) {
  Vue.directive(name, directive)
}

export default plugin

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(plugin)
// }
