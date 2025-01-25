const { defineConfig } = require('@vue/cli-service');
const path = require('path');

// 计算路径
const resolveGlobal = function (dir) {
    return path.join(__dirname, '..', dir);
};

module.exports = defineConfig({
    chainWebpack: config => {
        // ============== alias ====================
        config.resolve.alias
            .set('app@', resolveGlobal('../app/'))
            .set('javascript@', resolveGlobal('../javascript/'))
            .set('modules@', resolveGlobal('../modules/'))
    }
})
