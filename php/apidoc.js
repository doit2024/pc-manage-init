/**
 * 由于php文件加密无法读取
 * 将接口文档复制到这里
 */

/**
 * @api {post} account/login 登录
 * @apiName login
 * @apiGroup account
 *
 * @apiParam {string} username 用户名，需要AES-256加密
 * @apiParam {string} password 密码，需要AES-256加密
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {string} data.access_token  接口凭证
 * @apiSuccess {int} data.expire  有效时间（秒）
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "access_token": "MjM1RDBEMzMxNkIwMDNCMDMyNkU5MzdCNzNCMUYyRDEwQUU5OTcwNTZERUJGOTg0NjFFNDdDOThGMUM5RTVDQQ==",
        "expire": 3600
    }
}
 */

/**
 * @api {post} account/logout 登出
 * @apiName logout
 * @apiGroup account
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "登出成功"
}
 */

/**
 * @api {post} account/info 获取信息
 * @apiName info
 * @apiGroup account
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {string} data.username  账号
 * @apiSuccess {string} data.fullname  姓名
 * @apiSuccess {string} data.image  头像
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "username": "13751198387",
        "fullname": "ayzen1988",
        "image": ""
    }
}
 */
 
/**
 * @api {post} account/setting 账号设置
 * @apiName setting
 * @apiGroup account
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} fullname  姓名，最大20个字符
 * @apiParam {string} [image]  头像地址
 * @apiParam {string} [old_pwd]  旧密码
 * @apiParam {string} [new_pwd]  新密码
 * @apiParam {string} [repwd]  确认密码
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "编辑成功"
}
 */
 
/**
 * @api {post} device/lists 设备管理-获取列表
 * @apiName lists
 * @apiGroup device
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {int} page 页面，第1页开始
 * @apiParam {string} [sn] 设备序列号
 * @apiParam {string} [is_alert] 是否报警 0-否、1-是
 * @apiParam {string} [is_online] 是否在线 0-否、1-是
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {int} data.total  总数量
 * @apiSuccess {int} data.size  每页数量
 * @apiSuccess {array} data.list  数据
 * @apiSuccess {string} data.list.id  设备id
 * @apiSuccess {string} data.list.sn  设备序列号
 * @apiSuccess {string} data.list.is_alert  是否报警 0-否、1-是
 * @apiSuccess {string} data.list.is_online  是否在线 0-否、1-是
 * @apiSuccess {string} data.list.username  绑定用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "total": 1,
        "size": 10,
        "list": [
            {
                "id": "8",
                "sn": "222222",
                "is_alert": "0",
                "is_online": "0",
                "username": "13751198388"
            }
        ]
    }
}
 */
 
/**
 * @api {post} device/import 设备管理-导入
 * @apiName import
 * @apiGroup device
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} data 设备序列号数据，多个设备序列号用逗号(,)分割，如（111111）或者（111111,222222），设备序列号必须是6-32位的数字或字母
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "导入成功"
}
 */
 
/**
 * @api {post} user/lists 用户管理-获取列表
 * @apiName lists
 * @apiGroup user
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {int} page 页面，第1页开始
 * @apiParam {string} [username] 账号
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {int} data.total  总数量
 * @apiSuccess {int} data.size  每页数量
 * @apiSuccess {array} data.list  数据
 * @apiSuccess {string} data.list.uid  用户id
 * @apiSuccess {string} data.list.username  账号
 * @apiSuccess {string} data.list.nickname  昵称
 * @apiSuccess {string} data.list.ctime  时间
 * @apiSuccess {string} data.list.is_bind  是否绑定设备
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "total": 4,
        "size": 10,
        "list": [
            {
                "uid": "10047",
                "username": "dt1801102262",
                "nickname": "小天4025",
                "ctime": "1515548833",
                "is_bind": "0"
            },
            {
                "uid": "10039",
                "username": "dt1712274561",
                "nickname": "小天8411",
                "ctime": "1514337762",
                "is_bind": "0"
            }
        ]
    }
}
 */
 
/**
 * @api {post} user/detail 用户管理-用户详情
 * @apiName detail
 * @apiGroup user
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {int} uid 用户id
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {string} data.uid  用户id
 * @apiSuccess {string} data.ctime  时间
 * @apiSuccess {string} data.last_login_time  最近登录时间
 * @apiSuccess {string} data.username  账号
 * @apiSuccess {string} data.nickname  昵称
 * @apiSuccess {string} data.birthday  生日
 * @apiSuccess {string} data.sex  性别 1：男、2：女
 * @apiSuccess {array} data.device  设备
 * @apiSuccess {string} data.device.sn  设备序列号
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "uid": "10042",
        "ctime": "1515404671",
        "last_login_time": "0",
        "username": "17688708655",
        "nickname": "独特体验",
        "birthday": "",
        "sex": "1",
        "device": [
            {
                "sn": "14a51a3ef7ac"
            }
        ]
    }
}
 */
 
/**
 * @api {post} statistics/crowd 数据分析
 * @apiName crowd
 * @apiGroup statistics
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {string} data.total  总人数
 * @apiSuccess {string} data.android  Android人数
 * @apiSuccess {string} data.ios  iOS人数
 * @apiSuccess {string} data.male  男性人数
 * @apiSuccess {string} data.female  女性人数
 * @apiSuccess {string} data.a60  60后
 * @apiSuccess {string} data.a70  70后
 * @apiSuccess {string} data.a80  80后
 * @apiSuccess {string} data.a90  90后
 * @apiSuccess {string} data.a00  00后
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "total": "25",
        "android": "10",
        "ios": "15",
        "male": "20",
        "female": "5",
        "a60": "0",
        "a70": "0",
        "a80": "1",
        "a90": "3",
        "a00": "1"
    }
}
 */
 
/**
 * @api {post} msg/push 消息推送
 * @apiName push
 * @apiGroup msg
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {String} platform 平台 0-全部、1-Android、2-iOS
 * @apiParam {String} sex 性别 0-全部、1-男、2-女
 * @apiParam {String} age 年龄 0-全部、1-60后、2-70后、3-80后、4-90后、5-00后
 * @apiParam {String} title 标题
 * @apiParam {String} content 内容
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "推送成功"
}
 */
 
/**
 * @api {post} feedback/lists 意见反馈-获取列表
 * @apiName lists
 * @apiGroup feedback
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {int} page 页面，第1页开始
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {int} data.total  总数量
 * @apiSuccess {int} data.size  每页数量
 * @apiSuccess {array} data.list  数据
 * @apiSuccess {string} data.list.id  意见反馈id
 * @apiSuccess {string} data.list.content  内容
 * @apiSuccess {string} data.list.ctime  时间
 * @apiSuccess {string} data.list.username  账号
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "total": 7,
        "size": 10,
        "list": [
            {
                "id": "41",
                "content": "很不好",
                "ctime": "1515483061",
                "username": "18682481656"
            },
            {
                "id": "40",
                "content": "很好",
                "ctime": "1515483051",
                "username": "18682481656"
            }
        ]
    }
}
 */
 
/**
 * @api {post} feedback/del 意见反馈-删除
 * @apiName del
 * @apiGroup feedback
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} id 意见反馈id，多个id之间用英文逗号分隔，如(1,2,3)
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "删除成功"
}
 */
 
/**
 * @api {post} upload/upload_img 图片上传
 * @apiName upload_img
 * @apiGroup upload
 *
 * @apiParam {stream} file 图片资源
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {string} filename  图片地址
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "filename": ""
}
 */
 
/**
 * @api {post} member/lists 成员管理-获取列表
 * @apiName lists
 * @apiGroup member
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {int} page 页面，第1页开始
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data  数据
 * @apiSuccess {int} data.total  总数量
 * @apiSuccess {int} data.size  每页数量
 * @apiSuccess {array} data.list  数据
 * @apiSuccess {string} data.list.id  成员id
 * @apiSuccess {string} data.list.image  头像
 * @apiSuccess {string} data.list.username  账号
 * @apiSuccess {string} data.list.fullname  名称
 * @apiSuccess {string} data.list.role_id  角色id 1-超级管理员、2-普通管理员
 * @apiSuccess {string} data.list.privileges_id  权限id
 * @apiSuccess {string} data.domain  头像域名
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "total": 2,
        "size": 10,
        "list": [
            {
                "id": "3",
                "image": "",
                "username": "13751198388",
                "fullname": "ayzen1988",
                "role_id": "1",
                "privileges_id": "1,2,3"
            },
            {
                "id": "1",
                "image": "",
                "username": "13751198387",
                "fullname": "ayzen1988",
                "role_id": "1",
                "privileges_id": "1,2,3,4,5,6"
            }
        ],
        "domain": "http://testfiles.ourslinks.com/"
    }
}
 */
 
/**
 * @api {post} member/add 成员管理-新增
 * @apiName add
 * @apiGroup member
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} [image]  头像
 * @apiParam {string} username  账号，必须AES256加密
 * @apiParam {string} fullname  名称
 * @apiParam {string} pwd  密码，必须AES256加密
 * @apiParam {string} repwd  确认密码，必须AES256加密
 * @apiParam {string} role_id  角色id 1-超级管理员、2-普通管理员
 * @apiParam {string} privileges_id  权限id，多个权限之间用英文逗号分隔，如(1,2,3)
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "新增成功"
}
 */
 
/**
 * @api {post} member/edit 成员管理-编辑
 * @apiName edit
 * @apiGroup member
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} id  成员id
 * @apiParam {string} [image]  头像
 * @apiParam {string} username  账号，必须AES256加密
 * @apiParam {string} fullname  名称
 * @apiParam {string} [pwd]  密码，必须AES256加密
 * @apiParam {string} [repwd]  确认密码，必须AES256加密
 * @apiParam {string} role_id  角色id 1-超级管理员、2-普通管理员
 * @apiParam {string} privileges_id  权限id，多个权限之间用英文逗号分隔，如(1,2,3)
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "编辑成功"
}
 */
 
/**
 * @api {post} member/del 成员管理-删除
 * @apiName del
 * @apiGroup member
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} id  成员id
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "删除成功"
}
 */
 
/**
 * @api {post} member/get_privileges 成员管理-获取权限列表
 * @apiName get_privileges
 * @apiGroup member
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {array} data  数据
 * @apiSuccess {string} data.id  权限id
 * @apiSuccess {string} data.name  权限名称
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "id": 10,
            "name": "设备管理"
        },
        {
            "id": 20,
            "name": "用户管理"
        }
    ]
}
 */
 
/**
 * @api {post} menu/lists 获取目录
 * @apiName lists
 * @apiGroup menu
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {array} data  数据
 * @apiSuccess {string} data.name  名称
 * @apiSuccess {string} data.path  路由
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "name": "总体概览",
            "path": "/overview"
        },
        {
            "name": "设备管理",
            "path": "/device"
        }
    ]
}
 */
 
/**
 * @api {post} statistics/device_trends 总体概览-设备趋势
 * @apiName device_trends
 * @apiGroup statistics
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} type 类型 1-7天、2-30天
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {array} data  数据
 * @apiSuccess {string} data.added  新增
 * @apiSuccess {string} data.total_added  累计新增
 * @apiSuccess {string} data.date  日期
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "added": "0",
            "total_added": "25",
            "date": "20180220"
        },
        {
            "added": "0",
            "total_added": "25",
            "date": "20180221"
        }
    ]
}
 */
 
/**
 * @api {post} statistics/user_trends 总体概览-用户趋势
 * @apiName user_trends
 * @apiGroup statistics
 * @apiHeader {String} Access-Token 接口凭证
 *
 * @apiParam {string} type 类型 1-7天、2-30天
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {array} data  数据
 * @apiSuccess {string} data.added  新增
 * @apiSuccess {string} data.total_added  累计新增
 * @apiSuccess {string} data.date  日期
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "added": "0",
            "total_added": "25",
            "date": "20180220"
        },
        {
            "added": "0",
            "total_added": "25",
            "date": "20180221"
        }
    ]
}
 */
