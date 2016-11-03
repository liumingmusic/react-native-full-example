# 小明找厕所
## 1、express开发
### 1.1 npm环境设置
1. 安装node软件：<https://nodejs.org/en>
2. 安装淘宝滤镜：npm install -g cnpm --registry = https://registry.npm.taobao.org
3. 设置全局的npm从国内下载资源， npmrc添加配置。mac下面地址为 /Users/liumingming/.npmrc，修改strict-ssl=true 和 registry=https://registry.npm.taobao.org

### 1.2 express环境搭建
1. 安装express-generator：npm install -g express-generator，用户快速创建express项目
2. 生成项目模块：进入到项目目录 /User/liumm/A_study/app/toiletApp 下面，执行命令 express -e service，其中-e为ejs模块简写
3. 在服务端项目安装依赖：进入服务端项目 /User/liumm/A_study/app/toiletApp/service 执行命令 cnpm install，安装依赖类库
4. 启动项目：使用在当前目录中使用 npm start启动项目，其中start命令在package.json已经配置
5. 预览：启动已经开发本地的 localhost:3000，访问地址即可看见启动的页面
6. 修改预览：项目中app.js 文件为服务启动入口路径。修改项目下面 views/index.ejs文件，重启服务进行查看
7. express修改热加载：安装supervisor，npm install supervisor -g，修改项目自动更新

### 1.3 项目文件目录组织
```
    service
            bin
                www                       //为项目启动路径
            node_modules                  //项目所依赖lib，初创项目使用npm install得到
            public                        //静态文件路径，其后css或者js文件不加public，app.js文件已经设置
                css                       //项目中所有的ejs模板的css文件
                data                      //项目未使用数据库，使用json进行数据交互
                    config.json           //阅读模块首页配置json
                    cookies.json          //开心一刻数据json
                    it.json               //IT质询json
                    manager.json          //管理json
                    prose.json            //散文json
                js                        //页面前端交互js文件夹
                    lib                   //第三方lib包，包括常用的jquery、bootstrap
                    login.js              //首页登录js文件
                    ...                   //等等
            routes                        //后端路由
                 data.js                  //数据交互后端路由
                 index.js                 //首页
            views                         //前端页面视图ejs
                error
                    404.ejs
                login.ejs
                index.ejs
                tuijian.ejs
                edit.ejs
            app.js                        //前端主入口文件
            package.json                  //配置信息，依赖配置部分相当于java的pom.xml文件
```

### 1.4 读取接口设计

**统一规定后端返回数据格式**
```javascript
   {
        status : 1,           //后端返回到页面标示  1 成功 2 表单验证失败 3 系统异常 4 没有权限
        data   : [],          //请求成功的数据信息  可为对象，也可以为对象数组
        info   : '查询成功'    //当前接口执行的操作语  登录成功 查询成功 表单验证失败 没有权限等等
   }
```

1. 笑料数据接口:  __/data/read/cookies__
2. 互联网资讯接口: __/data/read/it__
3. 管理数据接口:   __/data/read/manager__
4. 散文数据接口:   __/data/read/prose__
5. 阅读模块配置:   __/data/read/config__

### 1.6 数据存储接口设计
**写入操作数据都为post请求，统一为 /data/write，传入参数如下：**
**删除操作数据都为post请求，统一为 /data/delete，传入参数如下：**
```javascript
    新增
    {
        type:   type,  //修改资源的类别
        title:  title, //文章标题
        url:    url,   //文章路径
        img:    img    //图片路径
    }
```
```javascript
    删除
    {
        type:   type,  //修改资源的类别
        id:     id,    //唯一id
    }
```
### 1.7 页面开发
1. 登录界面
![登录界面](/service/public/image/login.png "登录界面")
2. 首页界面
![首页界面](/service/public/image/index.png "首页界面")
3. 编辑界面
![编辑界面](/service/public/image/edit.png "编辑界面")
4. 删除操作
![删除操作](/service/public/image/delete.png "删除操作")
5. 查看操作
![查看操作](/service/public/image/showImage.png "查看操作")

### 1.8 调试express代码

1. 安装node-inspector: sudo cnpm install -g node-inspector
2. Terminal输入: supervisor --debug ./bin/www
3. 打开新的Terminal输入: node-inspector & (注:也是在项目目录之中)
4. 输入第三步显示的地址，开发浏览器访问输入(http://127.0.0.1:8080/?port=5858)，接下来就和调试javascript一样了
5. 如果不想使用8080端口可以修改: node-inspector & -p 8888

### 1.9 项目部署在服务器中
1. 购买云服务器平台(可以看看阿里云、华为云、腾讯云)，目的只是操作技术，并非运维，只要能用就行
2. 下载linux版的nodejs包，下载xshell进行安装
3. 购买好的云服务账号，使用shell进行登录(网上教程很多，就是单纯的登录进去)
4. 使用xshell自带的工具rz(在命令行中输入rz之后回车)，选择下载好的nodejs，进行远程导入，
5. 使用命令: tar -xzf node-v4.4.4-linux-arm64.tar.gz 进行解压(注:导入进行来的node包，可以选择你知道的路径下面，便于后续查找)
6. 进入到当前解压node的目录，输入pwd命令，获取当前文件夹的全路径
7. 使用软连接快速使用命令(其中一个是node，一个是npm):
ln -s /home/kun/mysofltware/node-v0.10.28-linux-x64/bin/node /usr/local/bin/node
ln -s /home/kun/mysofltware/node-v0.10.28-linux-x64/bin/npm /usr/local/bin/npm
8. 使用npm安装开发中使用express相关的包
9. 新建一个文件夹，在里面使用git clone xxx.git 克隆你的项目，之后进入项目路径(服务端)，输入npm install 安装相应的依赖
10. 使用npm安装pm2，用来启动和查看node相关的服,可参考 <https://segmentfault.com/a/1190000002539204>
11. 使用命令: pm2 start ./bin/www 启动服务，即可使用外网查看。
12. 只是大致记录步骤，后续视频完善。
***

## 2、app开发
### 2.1 react native 环境搭建

### 2.2 文件目录组织

### 2.3 组件关系图

### 2.4 app运行展示

### 2.5 优化加载
打包jsbundle文件 加载成功便于app加载
react-native bundle --entey-file index.ios.js --platform ios --dev false --bndle-output main.ios.jsbundle



























