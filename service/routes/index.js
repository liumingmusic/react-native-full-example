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
    } else {//否则用户已经登录，则直接进入首页界面
        res.render('index', {});
    }
});

router.get('/login', function (req, res, next) {
    res.render('login', {});
});

router.get('/tuijian', function (req, res, next) {
    if (!req.session.user) {
        return res.render('login', {});
    }
    res.render('tuijian', {});
});

router.get('/edit', function (req, res, next) {
    if (!req.session.user) {
        return res.render('login', {});
    }
    var type = req.query.type;
    if (type) {
        var obj = {};
        switch (type) {
            case 'sanwen':
                obj = {};
                break;
            case 'it':
                obj = {};
                break;
            case 'manager':
                obj = {};
                break;
            case 'cookies':
                obj = {};
                break;
            default :
                return res.send({
                    status: 0,
                    info: '参数错误'
                });
                break;
        }
        fs.readFile(PATH + type + '.json', (err, data) => {
            if (err) {
                return res.send({
                    status: 0,
                    info: 'fail.....'
                });
            }
            var obj = JSON.parse(data.toString());
            return res.render('edit', {
                data: obj
            });
        });

    } else {
        return res.send({
            status: 0,
            info: '参数错误'
        });
    }
});

//首页大表单

module.exports = router;