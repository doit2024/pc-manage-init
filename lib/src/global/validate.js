/**
 * 表单字段长度限制
 */
export const ml = {
  username: 11,
  password: 22,
  vcode: 6,
  mac: 12
}

/**
 * 规则细节
 */

const vRequireText = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('该项不能为空'))
  callback()
}

const vRequireSelect = (rule, value, callback) => {
  (value === '' || value.length === 0) && callback(new Error('请选择'))
  callback()
}

const vUsername = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('账号（手机号）不能为空'))
  !(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value)) && callback(new Error('账号（手机号）格式有误'))
  callback()
}

const vPassword = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('请输入密码'))
  !(/^\w+$/.test(value)) && callback(new Error('密码必须为数字、字母、下划线的组合'))
  !(/^\w{6,21}$/.test(value)) && callback(new Error('密码长度需在6位至18位之间'))
  callback()
}

const vNumber = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('必填项'))
  !(/^\d+$/.test(value)) && callback(new Error('必须为数字'))
  callback()
}

export const vMac = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('mac不能为空'))
  !(/^[\da-f]{12}$/i.test(value)) && callback(new Error('mac长度必须为12个字节16进制表示'))
  callback()
}

/**
 * 验证条目
 */

const aRequireText = [{
  validator: vRequireText,
  trigger: 'blur'
}]

const aRequireSelect = [{
  validator: vRequireSelect,
  trigger: 'change'
}]

const aUsername = [{
  validator: vUsername,
  trigger: 'blur'
}]

const aPassword = [{
  validator: vPassword,
  trigger: 'blur'
}]

const aNumber = [{
  validator: vNumber,
  trigger: 'blur'
}]

const aMac = [{
  validator: vMac,
  trigger: 'blur'
}]

/**
 * 项目表单
 */

export const login = {
  username: aUsername,
  password: aPassword,
  vcode: aNumber
}

export const password = {
  old_pwd: aPassword,
  new_pwd: aPassword,
  repwd: aPassword
}

export const other = {
  a: aRequireText,
  b: aRequireSelect,
  c: aMac
}
