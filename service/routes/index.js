var express = require('express');
var router = express.Router();
var fs = require('fs');
//公共资源路径
var PATH = './public/data/';
//全局默认值、每页显示十条数据
var pageRecorders = 5;
var totalPages = 1;
var page = 1;
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
    delete req.session.user; //清空数据
    return res.render('login', {});
});

//阅读模块配置接噢耶
router.get('/config', function (req, res, next) {
    checkSessionUser(req, res);
    res.render('config', {
        name: "配置管理"
    });
});

//编辑路由制定
router.get('/edit/:type/:page', function (req, res, next) {
    checkSessionUser(req, res);
    //获取参数
    var type = req.params.type;
    page = req.params.page; //默认第一页
    //传入数据判断
    if (type) {
        var obj = {};
        //判断请求是否在指定的路由里面
        var urlContain = ["prose", "it", "manager", "cookies", "config"];
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
            var result = null;
            var count = obj.length;
            //1) 总条数小于等于每页数 那就只有一页
            if (count <= pageRecorders) {
                totalPages = 1;
                result = obj;
            } else {
                //2) 总条数大于每页数
                totalPages = count % pageRecorders == 0 ? count / pageRecorders : Math.ceil(count / pageRecorders);
                //3）处理数据进行分页操作 0,5  5,10  15,20
                result = obj.slice((page - 1) * pageRecorders, pageRecorders * page);
            }
            //返回数据
            return res.render('edit', {
                data: result, //分页操作之后的数据信息
                name: name,
                page: page, //当前第几页(默认为一)
                type: type,//当前模块类型
                totalPages: totalPages //总页数
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
    var bread = ["散文", "互联网质询", "管理", "开心一刻", "配置管理"];
    var name = "";
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            name = bread[i];
            break;
        }
    }
    return name;
}

/**
 * 判断用户权限问题
 * @param req 请求的对象
 * @param res 响应的对象
 * @returns {*} 返回成功与否
 */
function checkSessionUser(req, res) {
    if (!req.session.user) {
        return res.render('login', {});
    }
}

//首页大表单
module.exports = router;