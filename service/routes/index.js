var express = require('express');
var router = express.Router();
var fs = require('fs');
//公共资源路径
var PATH = './public/data/';

//首页路由请求
router.get('/', function (req, res, next) {
    //登录用户判断
    if (!req.session.user) {//session如果不存在user对象则用户不存在，跳转登录界面
        return res.render('login', {});//render第二个参数是传入前端的数据，是对象类型
    } else {
        //否则用户已经登录，则直接进入首页界面
        res.render('index', {});
    }
});

//用户登录路由
router.get('/login', function (req, res, next) {
    res.render('login', {});
});

//用户退出路由
router.get('/exit', function (req, res, next) {
    req.session.user = {};//清空数据
    return res.render('login', {});
});

//阅读模块配置接噢耶
router.get('/config', function (req, res, next) {
    if (!req.session.user) {
        return res.render('login', {});
    }
    res.render('tuijian', {});
});

//编辑路由制定
router.get('/edit/:type', function (req, res, next) {
    if (!req.session.user) {
        return res.render('login', {});
    }
    //获取参数
    var type = req.params.type;
    if (type) {
        var obj = {};
        //判断请求是否在指定的路由里面
        var urlContain = ["prose", "it", "manager", "cookies"];
        var name = _isArray(urlContain, type);
        if (!name) {
            //参数有问题
            return res.send({
                status: 0,
                info: '参数错误'
            });
        }
        //读取数据操作
        fs.readFile(PATH + type + '.json', (err, data) => {
            if (err) {
                return res.send({
                    status: 0,
                    info: 'fail.....'
                });
            }
            var obj = JSON.parse(data.toString());
            return res.render('edit', {
                data: obj,
                name: name
            });
        });

    } else {
        return res.send({
            status: 0,
            info: '参数错误'
        });
    }
});

/**
 * 判断数据中的某项是否存在
 * @param array 数组
 * @param item 存在的项
 * @returns {string} 返回名称
 * @private
 */
function _isArray(array, item) {
    var bread = ["散文", "互联网质询", "管理", "开心一刻"];
    var name = "";
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            name = bread[i];
            break;
        }
    }
    return name;
}

//首页大表单

module.exports = router;