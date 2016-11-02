var express = require('express');
var fs = require("fs");
var router = express.Router();
var PATH = "./public/data/";

//读取数据模块 /data/read?type=it  改变接口为restful规范
router.get('/read/:type', function (req, res, next) {
    var type = req.params.type || "";
    fs.readFile(PATH + type + ".json", function (err, data) {
        //读取文件出现异常
        if (err) {
            //接口返回数据
            return res.send({
                status: 0,
                info: "读取文件异常",
                data: []
            })
        }
        //控制读取数据的数量
        var COUNT = 50;
        var obj = [];
        //捕获异常，防止文件读取异常
        try {
            obj = JSON.parse(data.toString());
        } catch (e) {
            obj = [];
        }
        //数组大小判断，此处主要是数组操作
        if (obj.length > COUNT) {
            obj = obj.slice(0, COUNT);
        }
        //接口返回数据
        return res.send({
            status: 1,
            info: "读取文件成功",
            data: obj
        })
    });
});

//数据存储模块 后台开发使用
router.post('/write', function (req, res, next) {
    checkSessionUser(req, res);
    //操作json资源的文件名
    var type = req.param('type') || '';
    //关键字段
    var url = req.param('url') || '';
    var title = req.param('title') || '';
    var img = req.param('img') || '';
    //判断数据完整性
    if (!type || !url || !title || !img) {
        return res.send({
            status: 0,
            info: '提交的字段不全',
            data: []
        });
    }
    //1)读取文件
    var filePath = PATH + type + '.json';
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return res.send({
                status: 0,
                info: '读取数据失败',
                data: []
            });
        }
        var arr = JSON.parse(data.toString());
        //代表每一条记录
        var obj = {
            img: img,
            url: url,
            title: title,
            id: guidGenerate(),
            time: new Date()
        };
        //将记录写在文件最前面
        arr.splice(0, 0, obj);
        //2)写入文件
        var newData = JSON.stringify(arr);
        fs.writeFile(filePath, newData, function (err) {
            if (err) {
                return res.send({
                    status: 0,
                    info: '写入文件失败',
                    data: []
                });
            }
            return res.send({
                status: 1,
                info: '写入文件成功',
                data: obj
            });
        });
    });
});

//用户删除数据操作
router.post('/delete', function (req, res, next) {
    checkSessionUser(req, res);
    //获取关键数据
    var type = req.param('type') || '';
    var id = req.param('id') || '';
    //判断数据完整性
    if (!type || !id) {
        return res.send({
            status: 0,
            info: '提交的字段不全',
            data: []
        });
    }
    //1)读取文件
    var filePath = PATH + type + '.json';
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return res.send({
                status: 0,
                info: '读取数据失败',
                data: []
            });
        }
        //数据信息
        var arr = JSON.parse(data.toString());
        //2)根据id删除数组中的一项
        var result = removeArrayId(arr, id);
        //3)写入文件
        var newData = JSON.stringify(result);
        fs.writeFile(filePath, newData, function (err) {
            if (err) {
                return res.send({
                    status: 0,
                    info: '删除数据失败',
                    data: []
                });
            }
            return res.send({
                status: 1,
                info: '删除数据件成功',
                data: result
            });
        });
    });
});

//阅读模块写入接口 后台开发使用
router.post('/write_config', function (req, res, next) {
    checkSessionUser(req, res);
    //TODO:后期进行提交数据的验证
    //防xss攻击 xss
    // npm install xss
    // require('xss')
    // var str = xss(name);
    var data = req.body.data;
    //TODO ： try catch
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    //写入
    fs.writeFile(PATH + 'config.json', newData, function (err) {
        if (err) {
            return res.send({
                status: 0,
                info: '写入数据失败',
                data: []
            });
        }
        return res.send({
            status: 1,
            info: '写入数据成功',
            data: obj
        });
    });
});

//登录接口
router.post('/login', function (req, res, next) {
    //用户名、密码、验证码
    var username = req.body.username;
    var password = req.body.password;
    //TODO ：对用户名、密码进行校验
    //xss处理、判空
    //密码加密 md5(md5(password + '随机字符串'))
    //密码需要加密－> 可以写入JSON文件
    if (username === 'admin' && password === '123456') {
        //在session中存入用户信息
        req.session.user = {
            username: username
        };
        return res.send({
            status: 1,
            info: '登录成功',
            data: []
        });
    }
    return res.send({
        status: 0,
        info: '登录失败',
        data: []
    });
});

/**
 * 判断用户权限问题
 * @param req 请求的对象
 * @param res 反馈的对象
 * @returns {*} 返回成功与否
 */
function checkSessionUser(req, res) {
    if (!req.session.user) {
        return res.send({
            status: 0,
            info: '未鉴权认证',
            data: []
        });
    }
}

//guid 生成唯一id
function guidGenerate() {
    //时间戳也可以的
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

/**
 * 根据id删除数据中的一项
 * @param arr 数组
 * @param id 对应的id
 * @returns {*} 返回新的数组
 */
function removeArrayId(arr, id) {
    //TODO 目前这种方式有点二，要全部遍历数组中的每一项
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]["id"] !== id) {
            result.push(arr[i]);
        }
    }
    //返回生成的新数组
    return result;
}

module.exports = router;