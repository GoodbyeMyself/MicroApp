/**
 * @description: 拷贝资源
 * @author: M.yunlong
 * @date: 2023-04-19 16:00:50
*/
const path = require('path');
const fse = require('fs-extra');

// 计算路径
const resolve = function (dir) {
    return path.join(__dirname, '../..', dir);
};

// 执行拷贝
function _copyFun(from, to) {
    fse.copy(from, to).then(() => {
        console.log('<- 拷贝完毕');
    })
    .catch(err => {
        console.error(err, '<- 拷贝失败');
    });
}

// 开发环境
if (process.env.NODE_ENV !== 'production') {

    // 拷贝之前： 先执行清空
    // fse.emptyDirSync('./public/packages');

    // 拷贝之前： 先执行清空
    fse.emptyDirSync('./public/static');

    // 拷贝插件
    // _copyFun(resolve('../plugins/packages'), './public/packages');

    // 拷贝 三方依赖
    _copyFun(resolve('../static/'), './public/static');
    
}
