//引入 express
const express = require('express');

// 解析器
var bodyParser = require('body-parser');

// 创建服务器应用实例
const app = express();

// 获取解析 json 类型 请求体
app.use(
    bodyParser.json()
);
// 获取解析 application/x-www-form-urlencoded 类型 请求体
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 导入路由模块
const dataQuality = require('../api/data-quality.js');
const dataService = require('../api/data-service.js');

// 注册
app.use(dataQuality);
app.use(dataService);

/**
 * @description: 运行 : 端口号可以任意选择,但是不要小于1000
 * @date: 2023-04-15 15:55:43
*/
app.listen("3000", function(err) {
    if (err) {
        console.log('服务器连接失败',err);
    } else {
        console.log('服务器启动成功, http://localhost:3000');
    }
})