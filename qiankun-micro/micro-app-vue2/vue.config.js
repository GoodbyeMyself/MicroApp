const { defineConfig } = require('@vue/cli-service');

const path = require('path');

// 代理地址
const proxyIP = "http://localhost:3000";
// 代理列表
const proxyList = [{
    name: process.env.VUE_APP_DATA_QUALITY_HOST,
    ip: proxyIP
}, {
    // Mock 服务器 代理
    name: process.env.VUE_APP_MOCK_HOST,
    // Mock ip
    ip: "http://localhost:3000"
}];

// 设置 代理路径
let proxyObj = {};

// setting
proxyList.forEach(item => {
    proxyObj[item.name] = {
        target: item.ip,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            ['^' + item.name]: ""
        }
    };
});

module.exports = defineConfig({
    publicPath: './',
    devServer: {
        // 监听端口
        port: 10100,
        // 关闭主机检查，使微应用可以被 fetch
        historyApiFallback: true,
        allowedHosts: "all",
        // 配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        open: true,
        // 反向代理配置
        proxy: proxyObj
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                "store@":  path.resolve(__dirname, "src/store"),
                "javascript@": path.resolve(__dirname, 'src/javascript')
            }
        },
        output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: "Vue2MicroApp",
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: 'umd'
        }
    }
});
