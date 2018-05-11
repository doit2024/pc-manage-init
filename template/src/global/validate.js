/**
 * * * * * * * * * * 单项规则
*/
const vRequireText = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('该项不能为空'))
  callback()
}

const vRequireSelect = (rule, value, callback) => {
  (value === null) && callback(new Error('请选择'))
  callback()
}

const vMobile = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('账号（手机号）不能为空'))
  !(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value)) && callback(new Error('账号（手机号）格式有误'))
  callback()
}

const vPass = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('请输入密码'))
  !(/^\w+$/.test(value)) && callback(new Error('密码必须为数字、字母、下划线的组合'))
  !(/^\w{6,21}$/.test(value)) && callback(new Error('密码长度需在6位至18位之间'))
  callback()
}

const vPassCheck = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('请再次输入密码'))
  !(/^\w+$/.test(value)) && callback(new Error('密码必须为数字、字母、下划线的组合'))
  !(/^\w{6,21}$/.test(value)) && callback(new Error('密码长度需在6位至18位之间'))
  callback()
}

const vCode = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('验证码不能为空'))
  !(/^\d{6}$/.test(value)) && callback(new Error('验证码有误'))
  callback()
}

const vCheckbox = (rule, value, callback) => {
  !value.length && callback(new Error('请至少选择一个'))
  callback()
}

const vMac = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('mac不能为空'))
  !(/^[\da-f]{12}$/i.test(value)) && callback(new Error('mac长度必须为12个字节16进制表示'))
  callback()
}

const vMacs = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('mac不能为空'))
  !(/^[\da-f]{12}(\n[\da-f]{12}){0,}$/i.test(value)) && callback(new Error('格式不正确'))
  callback()
}

const vDownCode = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('功能码不能为空'))
  !(/^10[\da-f]{2}$/i.test(value)) && callback(new Error('需为4位的16进制字符串, 格式10xx'))
  callback()
}

const vUpCode = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('功能码不能为空'))
  !(/^18[\da-f]{2}$/i.test(value)) && callback(new Error('需为4位的16进制字符串, 格式18xx'))
  callback()
}

const vBytes = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('字节数不能为空'))
  !(/^\d+$/.test(value)) && callback(new Error('字节数必须为整数'))
  callback()
}

const vVersion = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('版本号不能为空'))
  !(/^\d+$/.test(value)) && callback(new Error('版本号必须为整数'))
  callback()
}

const vVersionFmw = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('版本号不能为空'))
  !(/^\d+$/.test(value)) && callback(new Error('版本号必须为整数'))
  !(value >= 0 && value <= 65000) && callback(new Error('版本号在 0-65000 之间'))
  callback()
}

const vUrl = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('url不能为空'))
  !/^https?:\/\/.+$/.test(value) && callback(new Error('url格式不正确'))
  callback()
}

const vEmailTemp = (rule, value, callback) => {
  (value === '' || value === undefined) && callback(new Error('内容不能为空'))
  !/(\{1\}){1}(.+)?(\{2\}){1}/.test(value) && callback(new Error('内容必须包含‘{1}’，‘{2}’各一个'))
  callback()
}

/**
 * 外部引用
 */
export const vMessageBody = (value, callback) => {
  if (value === '' || value === undefined) {
    callback(new Error('调试数据不能为空'))
    return
  }
  if (!(/^[\da-f]+$/i.test(value))) {
    callback(new Error('调试数据必须为16进制'))
    return
  }
  if (value.length % 2) {
    callback(new Error('调试数据位数必须为偶数'))
    return
  }
  callback()
} // 1 个外部引用 : debug/tableColumns

export const vMobile1 = (value, callback) => {
  if (value === '' || value === undefined) {
    callback(new Error('账号（手机号）不能为空'))
    return
  }
  if (!(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value))) {
    callback(new Error('账号（手机号）格式有误'))
    return
  }
  callback()
} // 1 个外部引用

/**
 * * * * * * * * * * 打包
*/

export const mobile = [{ validator: vMobile, trigger: 'blur' }]
export const vcode = [{ validator: vCode, trigger: 'blur' }]
export const requireText = [{ validator: vRequireText, trigger: 'change, blur' }]
export const requireSelect = [{ validator: vRequireSelect, trigger: 'change' }]
export const password = [{ validator: vPass, trigger: 'blur' }]
export const passCheck = [{ validator: vPassCheck, trigger: 'blur' }]
export const checkbox = [{ validator: vCheckbox, trigger: 'change' }]
export const mac = [{ validator: vMac, trigger: 'blur' }]
export const macs = [{ validator: vMacs, trigger: 'blur' }]
export const downCode = [{ validator: vDownCode, trigger: 'blur' }]
export const upCode = [{ validator: vUpCode, trigger: 'blur' }]
export const bytes = [{ validator: vBytes }]
export const version = [{ validator: vVersion, trigger: 'blur' }]
export const versionFmw = [{ validator: vVersionFmw, trigger: 'blur' }]
export const url = [{ validator: vUrl, trigger: 'blur' }]
export const emailTemp = [{ validator: vEmailTemp, trigger: 'blur' }]
