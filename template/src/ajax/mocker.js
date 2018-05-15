import Mock from 'mockjs'

const { mock, Random } = Mock

/**
 * 趋势图
 */
mock(/\/index.php\/.*\/.*_trends$/, {
  'errcode': 0,
  'errmsg': '',
  'data|30': [{
    'value|1-600': 10,
    'date|+86400': 1539302400
  }]
})

/**
 * 表格
 */
mock(/\/index.php\/.*\/.*lists$/, {
  'errcode': 0,
  'errmsg': '',
  'data': {
    'total': 600,
    'size': 10,
    'list|10': [{
      'id|+1': 1,
      'uid|+1': 1,
      'role_id|+1': 1,
      'device_id|+1': 1,
      'serial': /[\dA-F]{12}/,
      'username': Random.word(6, 9),
      'nickname': Random.cword(3, 6),
      'fullname': Random.word(10, 19),
      'device_name': Random.cword(4, 9),
      'ctime|+86400': 1539302400,
      'is_bind': /[12]{1}/,
      'is_alert': /[12]{1}/,
      'is_online': /[12]{1}/,
      'device_type': /[12345678]{1}/,
      'image': 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=9229d78dd962853586edda73f1861da3/6d81800a19d8bc3eb84cabb58e8ba61ea8d3450c.jpg',
      'path': 'http://testfiles.ourslinks.com/upload/tmp/20180515/device_201805151519316967.xls',
      'privileges_id': '1,2,3,4,5,6',
      'content': Random.cword(103, 266)
    }]
  }
})
