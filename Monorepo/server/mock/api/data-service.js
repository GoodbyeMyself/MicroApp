
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
router.get('/testService',(req, res) => {
    res.json({
        code: 0,
        data: [{
            test: 'xxx'
        }]
    })
});

// 向外导出路由对象
module.exports = router;
