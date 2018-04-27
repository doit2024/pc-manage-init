#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const Tool = require('../Tool.class')

let PRE = 'Dt'
try {
  const { UP_PRE } = Tool.getConfig()
  PRE = UP_PRE
} catch (error) {}

const template = component => `import ${component.name.padEnd(19)} from '${component.path}'\n`

function getComponents (startPath) {
  let components = []
  findComponents(startPath)
  function findComponents (dir) {
    let children = fs.readdirSync(dir)
    children.forEach(child => {
      let childPath = path.join(dir, child)
      let st = fs.statSync(childPath)
      if (st.isFile()) {
        /\.vue$/.test(child) && components.push({
          name: PRE + Tool.capitalize(child).replace('.vue', ''),
          path: childPath.replace(/.+components(.+)\.vue/, '.$1').replace(/\\/g, '/')
        })
      } else {
        findComponents(childPath)
      }
    })
  }
  return components
}
const target = Tool.find('src/components')
let components = getComponents(target)
if (new Set(components.map(v => v.name)).size !== components.length) return Tool.error('～组件名称重复～')

let up = ''
let down = ''
components.forEach((component, index) => {
  up += template(component)
  down += `${index ? '\n  ,' : '  '}${component.name}`
})

let content = `${up}\nexport default {\n${down}\n}\n`
fs.writeFile(path.join(target, 'index.js'), content, err => Tool.dieif(err, __filename, __line))

Tool.success('成功！')
