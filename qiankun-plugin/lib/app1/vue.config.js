const { defineConfig } = require('@vue/cli-service');

const path = require('path');

// 获取 包 信息
const package = require('./package.json');

const resolve = function(dir) {
    return path.join(__dirname, '../../', dir);
};

module.exports = defineConfig({
    publicPath: './',
    // 输出文件目录
    outputDir: resolve(`packages/${package.name}`),
    // 服务器配置
    devServer: {
        // 监听端口
        port: 5001,
        // 关闭主机检查，使微应用可以被 fetch
        historyApiFallback: true,
        allowedHosts: "all",
        // 配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        open: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: package.name,
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: 'umd'
        }
    }
});
