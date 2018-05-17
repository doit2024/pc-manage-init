import mixin from './btn_mixin'

const result = {}
const requireFile = require.context('.', true, /m_\w+\.vue$/)
requireFile.keys().forEach(key => {
  const modalName = /(\w+).vue$/.exec(key)[1]
  const comConfig = requireFile(key)
  result[modalName] = comConfig.default || comConfig
  result[modalName].mixins = [mixin]
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
