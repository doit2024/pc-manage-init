<?php

/**
 * @api {post} Login/do_login 登录
 * @apiName do_login
 * @apiGroup Login
 *
 * @apiParam {string} username 登录名
 * @apiParam {string} password 密码
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {string} admin_id  管理员id
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "admin_id": "101"
}
 */

/**
 * @api {post} Login/logout 退出登录
 * @apiName logout
 * @apiGroup Login
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": ""
}
 */

/**
 * @api {post} Login/edit_pwd 修改密码
 * @apiName edit_pwd
 * @apiGroup Login
 *
 * @apiParam {string} oldpwd 原密码 采用AES加密
 * @apiParam {string} newpwd 新密码 采用AES加密
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": ""
}
 */

/**
 * @api {post} Service/get_service 获取申请售后列表
 * @apiName get_service
 * @apiGroup Service
 *
 * @apiParam {string} province 省 可选
 * @apiParam {string} city 市 可选
 * @apiParam {string} district 区 可选
 * @apiParam {int} product_type 型号 可选（1.桶装水普通版，2.速饮机旗舰版，3.速饮机家庭版，4.公共版）
 * @apiParam {int} service_type 服务类型 可选（1.更换滤芯，2.设备故障，3.安装维护，4.保养预约）
 * @apiParam {string} telephone 手机号 可选
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据
 * @apiSuccess {int} data.id  id
 * @apiSuccess {int} data.uid 用户id
 * @apiSuccess {string} data.username  用户姓名
 * @apiSuccess {string} data.telephone 手机号码
 * @apiSuccess {string} data.province  省
 * @apiSuccess {string} data.city 市
 * @apiSuccess {string} data.district 区
 * @apiSuccess {string} data.address 街道地址
 * @apiSuccess {string} data.remark 备注
 * @apiSuccess {string} data.ctime 申请的时间
 * @apiSuccess {string} data.event_time 时间
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "id": "1",
            "uid": "111",
            "username": "小王",
            "telephone": "15012239213"
            "province": "广东",
            "city": "深圳",
            "district": "宝安",
            "address":"固戍梧桐岛",
            "remark":"备注信息",
            "ctime":"1511233660",
            "event_time":"1511233660"
        },
        {
            "id": "2",
            "uid": "222",
            "username": "小张",
            "telephone": "15315285698"
            "province": "广东",
            "city": "深圳",
            "district": "南山",
            "address":"科技园",
            "remark":"备注信息",
            "ctime":"1511255660",
            "event_time":"1545233660"
        }
    ]
}
 */

/**
 * @api {post} Trial/get_trial 获取申请试用列表
 * @apiName get_trial
 * @apiGroup Trial
 *
 * @apiParam {string} province 省 可选
 * @apiParam {string} city 市 可选
 * @apiParam {string} district 区 可选
 * @apiParam {string} username 用户姓名 可选
 * @apiParam {string} telephone 手机号 可选
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据
 * @apiSuccess {int} data.id  id
 * @apiSuccess {int} data.uid 用户id
 * @apiSuccess {string} data.username  用户姓名
 * @apiSuccess {string} data.telephone 手机号码
 * @apiSuccess {string} data.province  省
 * @apiSuccess {string} data.city 市
 * @apiSuccess {string} data.district 区
 * @apiSuccess {string} data.address 街道地址
 * @apiSuccess {int} data.sex 性别 （1男 2女）
 * @apiSuccess {int} data.trialdays 试用天数
 * @apiSuccess {string} data.ctime 创建时间
 * @apiSuccess {string} data.etime 试用到期时间
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "id": "1",
            "uid": "111",
            "username": "小王",
            "telephone": "15012239213"
            "province": "广东",
            "city": "深圳",
            "district": "宝安",
            "address":"固戍梧桐岛",
            "sex":"1",
            "trialdays":"15",
            "ctime":"1511233660",
            "etime":"1511233660"
        },
        {
            "id": "2",
            "uid": "222",
            "username": "小张",
            "telephone": "15315285698"
            "province": "广东",
            "city": "深圳",
            "district": "南山",
            "address":"科技园",
            "sex":"2",
            "trialdays":"20",
            "ctime":"1511233660",
            "etime":"1511233660"
        }
    ]
}
 */


/**
 * @api {post} Trial/set_day 设置试用期
 * @apiName set_day
 * @apiGroup Trial
 *
 * @apiParam {int} id id
 * @apiParam {int} trialdays 试用天数
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": ""
}
 */

 /**
 * @api {post} Oss_upload/get_post_object_params 获取OSS表单上传参数
 * @apiName get_post_object_params
 * @apiGroup Oss_upload
 *
 * @apiParam {int} type 上传类型 1-广告图片 2-APP版本文件
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据
 * @apiSuccess {string} data.accessid  accessid
 * @apiSuccess {string} data.host host
 * @apiSuccess {string} data.policy  policy
 * @apiSuccess {string} data.signature signature
 * @apiSuccess {string} data.expire  expire
 * @apiSuccess {string} data.callback callback
 * @apiSuccess {string} data.dir dir
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "accessid": "LTAICB9z6ZEYxNJk",
        "host": "http://yiannuo-test.oss-cn-shenzhen.aliyuncs.com",
        "policy": "eyJleHBpcmFXdpdGgiLCIka2V5IiwiYWRcLzIwMTcxMTIzXC8iXV19",
        "signature": "1rej5vAFWHg9UC2t4OuRfD/dULQ=",
        "callback": "eyJjYWxsXBlIjoiYXBwbGljYXRpb25cL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCJ9",
        "dir": "ad/20171123/"
    }
}
 */

 /**
 * @api {post} Ad/get_list 获取广告图片列表
 * @apiName get_list
 * @apiGroup Ad
 *
 * @apiParam {int} page 页码
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据
 * @apiSuccess {string} data.id  数据id
 * @apiSuccess {string} data.path 图片地址
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "id": "1",
            "path": "http://yiannuo-test.oss-cn-shenzhen.aliyuncs.com/ad/20171123/enterdesk.com-6923EB0DBF766BA58FEE8455588BC34C.jpg"
        },
        {
            "id": "2",
            "path": "http://yiannuo-test.oss-cn-shenzhen.aliyuncs.com/ad/20171123/QQ图片20170913171321.png"
        }
    ]
}
*/

/**
 * @api {post} Apk/get_list 获取APP版本文件列表
 * @apiName get_list
 * @apiGroup Apk
 *
 * @apiParam {int} page 页码
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据
 * @apiSuccess {string} data.id  数据id
 * @apiSuccess {string} data.path 访问地址
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": [
        {
            "id": "1",
            "path": "http://yiannuo-test.oss-cn-shenzhen.aliyuncs.com/apk/20171123/enterdesk.com-6923EB0DBF766BA58FEE8455588BC34C.apk"
        },
        {
            "id": "2",
            "path": "http://yiannuo-test.oss-cn-shenzhen.aliyuncs.com/apk/20171123/QQ图片20170913171321.apk"
        }
    ]
}
*/

/**
 * @api {post} Fault/get_list 获取故障列表
 * @apiName get_list
 * @apiGroup Fault
 *
 * @apiParam {int} page 页码
 * @apiParam {int} [device_type] 设备类型id 0-全部
 * @apiParam {int} [fault_code] 故障编号 0-全部
 * @apiParam {int} [handle_state] 处理状态 -1 全部 0-未处理 1-处理中 2-已处理
 * @apiParam {string} [device_mac] 设备mac
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据
 * @apiSuccess {string} data.id  数据id
 * @apiSuccess {string} data.fault_code 故障代码
 * @apiSuccess {string} data.handle_state 处理状态
 * @apiSuccess {string} data.ctime 创建时间戳
 * @apiSuccess {string} data.mac 设备mac
 * @apiSuccess {string} data.contact 联系手机号
 * @apiSuccess {string} data.device_type_name 设备类型名称
 * @apiSuccess {string} data.fault_name  故障名称
 * @apiSuccess {string} data.remark  备注
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "total": "15",
        "size": 10,
        "list": [
            {
                "id": "856",
                "fault_code": "1",
                "handle_state": "0",
                "ctime": "1512714245",
                "mac": "E0B94DA083F8",
                "contact": "13715881560",
                "device_type_name": "智能速饮机净水器版",
                "fault_name": "浮子故障",
                "remark": "备注"
            },
            {
                "id": "855",
                "fault_code": "1",
                "handle_state": "0",
                "ctime": "1512714216",
                "mac": "E0B94DA083F8",
                "contact": "13715881560",
                "device_type_name": "智能速饮机净水器版",
                "fault_name": "浮子故障",
                "remark": "备注"
            }
        ]
    }
}
*/

/**
 * @api {post} Fault/set_handle_state 设置故障处理状态
 * @apiName set_handle_state
 * @apiGroup Fault
 *
 * @apiParam {int} id id
 * @apiParam {int} handle_state 处理状态 1-处理中 2-已处理
 * @apiParam {string} remark 备注，限140字
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "操作成功"
}
 */

/**
 * @api {post} Fault/get_fault 获取故障类型
 * @apiName get_fault
 * @apiGroup Fault
 *
 * @apiSuccess {int} errcode 返回码，返回0是成功，其余都是错误
 * @apiSuccess {string} errmsg  错误信息，可以直接显示给用户
 * @apiSuccess {object} data 数据 故障id：故障名称
 *
 * @apiSuccessExample Success-Response:
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        "1": "浮子故障",
        "2": "水泵故障",
        "3": "加热体故障",
        "4": "漏水故障"
    }
}
*/
