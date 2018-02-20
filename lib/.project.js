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
  }
}
