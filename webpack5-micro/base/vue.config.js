const { defineConfig } = require('@vue/cli-service');
// 联邦依赖
const { ModuleFederationPlugin } = require('webpack').container;

const path = require('path');

// 远端：代理地址 [ 本地 hosts ： 代理到 192.168.3.6:5000  /  线上发布： 122.20.55.81:5000 ]
const proxyIP = "http://monorepo-server.com:5000";

// 调试
let debugPath = 'http://localhost:5000/';

// 是否是开发环境
const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
    // 与 使用方 根目录 一致
    publicPath: isProduction ? '/modules/base/' : debugPath,
    // 走线上引用
    // publicPath: isProduction ? proxyIP : debugPath,
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
                // 当前应用名称, 需要全局唯一: 也是指定输出的模块容器名称
                name: 'libase',
                // 指定打包后的文件名
                filename: 'remoteEntry.js',
                /**
                 * @description: 表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用
                 * 键名： 对应该文件相对于打包后文件名 为 remoteEntry.js 的相对路径
                 * 键值： 对应到 从 vue.config.js 到该模块的 相对路径地址
                */
                exposes: {
                    "./testComponent": "./src/components/testComponent.vue"
                }
            })
        ]
    },
    devServer: {
        // 监听端口
        port: 5000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        open: true
    }
});
