/**
 * 表单字段长度限制
 */
export const ml = {
  name: 22,
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
  !(/^\w{6,22}$/.test(value)) && callback(new Error(`密码长度需在6位至${ml.password}位之间`))
  callback()
}

const vNumber = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('必填项'))
  !(/^\d+$/.test(value)) && callback(new Error('必须为数字'))
  callback()
}

const vMac = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('mac不能为空'))
  !(/^[\da-f]{12}$/i.test(value)) && callback(new Error('mac长度必须为12个字节16进制表示'))
  callback()
}
const vSn = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('设备序列号不能为空'))
  !(/^([\da-z]{6,32}\n)*([\da-z]{6,32})$/i.test(value)) && callback(new Error('设备序列号必须是6-32位的数字或字母'))
  callback()
}

const vCheckbox = (rule, value, callback) => {
  (value.length < 1) && callback(new Error('至少选择1个'))
  callback()
}

/**
 * 验证条目
 */

export const aRequireText = [{
  validator: vRequireText,
  trigger: 'blur'
}]

export const aRequireSelect = [{
  validator: vRequireSelect,
  trigger: 'change'
}]

export const aUsername = [{
  validator: vUsername,
  trigger: 'blur'
}]

export const aPassword = [{
  validator: vPassword,
  trigger: 'blur'
}]

export const aNumber = [{
  validator: vNumber,
  trigger: 'blur'
}]

export const aMac = [{
  validator: vMac,
  trigger: 'blur'
}]

export const aSn = [{
  validator: vSn,
  trigger: 'blur'
}]

export const aCheckbox = [{
  validator: vCheckbox,
  trigger: 'change'
}]
