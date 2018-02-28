import DtAccount from './m_account'
import DtAuth from './m_auth'
import DtDevice from './m_device'
import DtFirmware from './m_firmware'
import DtMessage from './m_message'
import DtRole from './m_role'
import DtUser from './m_user'

export const modals = {
  DtAccount,
  DtAuth,
  DtDevice,
  DtFirmware,
  DtMessage,
  DtRole,
  DtUser
}

/** 弹出层
 * name: 组件名
 * title: 标题
 * btn: 底部按钮组合（取消按钮常驻）
 * 可选值: ['submit', 'reset', 'edit']
 * 默认值为['submit']
 */

export const map = {
  'account': { name: 'DtAccount', title: '账号设置' },
  'auth-new': {name: 'DtAuth', title: '新建权限'},
  'device-new': { name: 'DtDevice', title: '新建设备' },
  'device-edit': { name: 'DtDevice', title: '编辑设备' },
  'firmware-new': {name: 'DtFirmware', title: '新建固件'},
  'user-new': {name: 'DtUser', title: '新建用户'},
  'user-edit': {name: 'DtUser', title: '编辑用户信息'},
  'message-new': {name: 'DtMessage', title: '新建消息'},
  'role-new': {name: 'DtRole', title: '新建角色'}
}
