const { defineConfig } = require('@vue/cli-service');

// 联邦依赖
const { ModuleFederationPlugin } = require('webpack').container;

const path = require('path');

// 远端：代理地址 [ 本地 hosts ： 代理到 192.168.3.6:5000  /  线上发布： 122.20.55.81:5000 ]
// const remoteIP = "http://monorepo-server.com:5000";

module.exports = defineConfig({
    publicPath: './',
    chainWebpack: config => {
        // https://github.com/vuejs/vue-cli/issues/6318
        config.optimization.delete('splitChunks');
    },
    configureWebpack: {
        resolve: {
            alias: {
                // 工程根
                "@": path.resolve(__dirname, "src")
            }
        },
        plugins: [
            new ModuleFederationPlugin({
                // 可以将其他项目的 name 映射到当前项目中
                remotes: {
                    // 调试
                    // libase: "libase@http://localhost:5000/remoteEntry.js"
                    // 远程 ip
                    // libase: "libase@http://192.168.3.6:5000/remoteEntry.js"
                    // 本地 相对路径 加载
                    // libase: `libase@/modules/base/remoteEntry.js`
                    
                },
                /**
                 * @description:  是非常重要的参数，制定了这个参数，可以让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM
                */
                shared: require('./package.json').dependencies
            })
        ]
    },
    devServer: { 
        // 监听端口
        port: 8089,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        open: true
    }
});
