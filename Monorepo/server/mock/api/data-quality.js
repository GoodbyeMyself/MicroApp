
/**
 * @description: 模拟 模块接口
 * @author: M.yunlong
 * @date: 2023-04-15 15:51:09
*/

// 1.导入express
const express = require('express');

// 2.创建路由对象
const router = express.Router();

// 3.挂载具体的路由
router.get('/testMock',(req, res) => {
    res.json({
        code: 0,
        data: 'get'
    })
});

router.post('/testMock',(req, res) => {
    res.json({
        code: 0,
        data: 'post'
    })
});

router.get('/testAxios',(req, res) => {
    // 接收到的参数
    console.log(req.query, '<- GET 参数');
    // 返回数据
    res.json({
        code: 0,
        data: [{
            test: 'xxx'
        }]
    })
});

router.post('/testAxios',(req, res) => {
    // 接收到的参数
    console.log(req.body, '<- POST 参数');
    // 返回数据
    res.json({
        code: 0,
        data: [{
            test: 'xxx'
        }]
    })
});

// 401 测试
router.get('/test401',(req, res) => {
    res.status(401).send({
        message:'无权限'
    });
});

// 向外导出路由对象
module.exports = router;
