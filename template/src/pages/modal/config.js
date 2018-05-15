import mixin from './btn_mixin'

const result = {}
const requireComponent = require.context('.', true, /m_\w+\.vue$/)
requireComponent.keys().forEach(key => {
  const componentName = /(\w+).vue$/.exec(key)[1]
  const comConfig = requireComponent(key)
  result[componentName] = comConfig.default || comConfig
  result[componentName].mixins = [mixin]
})

export const modals = result
export const map = {
  'm_account': { name: 'm_account', title: '账号设置' },
  'm_device_new': { name: 'm_device', title: '新建设备' },
  'm_device_edit': { name: 'm_device', title: '编辑设备' },
  // 'm_firmware_new': {name: 'm_firmware', title: '新建固件'},
  // 'm_member_new': {name: 'm_memebr', title: '新增成员'},
  // 'm_member_edit': {name: 'm_memeber_edit', title: '编辑成员信息'},
  'm_user_new': {name: 'm_user', title: '新建用户'},
  'm_user_edit': {name: 'm_user', title: '编辑用户信息'},
  'm_user_detail': {name: 'm_user_detail', title: '查看用户信息'}
  // 'm_message_new': {name: 'm_message', title: '新建消息'}
}
