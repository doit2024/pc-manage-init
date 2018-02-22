module.exports = {
  PRE: "dt",
  PORT: 8022,
  HOST: "http://120.24.55.58",
  AES_KEY: "267a4733f3d89127bac20be290742c81",

  // 同服务器下多客户端则为 ACCESS_TOKEN 赋不同值，防止串数据
  ACCESS_TOKEN: "DT_ACCESS_TOKEN",

  ROUTES: {
    // login: ['signup', 'signup', 'forget'],
    login: ['signup'],
    home: [
      'index',
      ['user', 'user_detail', 'user_active'],
      ['device', 'device_detail', 'device_authorize'],
      'apk',
      'firmware',
      'alert',
      'content',
      'message',
      'feedback',
      'email',
      'aboutus',
      'question'
    ]
  },

  // 键名与ROUTES保持一致
  TABLE_PAGES: {
    'user': {
      api: 'user',
      title: '用户列表',
      slots: []
      columns: ['序号', '昵称', '创建时间', '注册时间'],
      actions: ['编辑', '删除']
    },
    'device': {
      api: 'device',
      title: '设备列表',
      slots: ['del:删除设备', 'new:注册设备']
      columns: ['selection:device_id', '序号', '昵称', '创建时间', '注册时间'],
      actions: ['详情', '编辑', '删除']
    }
  },

  MENU: [
    '首页',
    ['用户', '用户详情', '活跃用户'],
    ['设备', '设备详情', '设备授权'],
    'APK升级',
    '固件升级',
    '告警管理',
    '内容发布',
    '消息管理',
    '用户反馈',
    '邮件管理',
    '关于我们',
    '常见问题'
  ]
}
