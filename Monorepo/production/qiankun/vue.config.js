const { defineConfig } = require('@vue/cli-service');

const path = require("path");

// 是否是 开发环境
const isProduction = process.env.NODE_ENV === 'production';

// 计算路径
const resolveGlobal = function (dir) {
    return path.join(__dirname, '..', dir);
};

// 代理地址
const proxyIP = "http://monorepo-server.com:3000";

// 代理列表
const proxyList = [{
    name: process.env.VUE_APP_DATA_QUALITY_HOST,
    ip: proxyIP
}, {
    name: process.env.VUE_APP_DATA_SERVICE_HOST,
    ip: proxyIP
}, {
    // Mock 服务器 代理
    name: process.env.VUE_APP_MOCK_HOST,
    // Mock ip
    ip: proxyIP
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
    configureWebpack: {
        resolve: {
            alias: {
                // 工程根
                "@": path.resolve(__dirname, "src"),
                "components@": path.resolve(__dirname, "src/components"),
                "store@":  path.resolve(__dirname, "src/store"),
                // 全局
                "assets@": resolveGlobal('../assets/'),
                "javascript@": resolveGlobal('../javascript/'),
                "production@": resolveGlobal('../production/'),
                "plugins@": resolveGlobal('../plugins/packages/'),
                "ui@": resolveGlobal('../ui/')
            }
        }
    },
    chainWebpack: config => {        
        // 重点:删除默认配置中处理svg
        config.module.rules.delete('svg');     
        config.module            
            .rule('svg-sprite-loader')             
            .test(/\.svg$/)
            // 处理svg目录 
            .include.add(path.resolve('src/assets/icons/svg'))    
            .end()            
            .use('svg-sprite-loader')            
            .loader('svg-sprite-loader')            
            .options({
                symbolId: 'icon-[name]'
            });
    },
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: isProduction ? true : false,
        // 开启 CSS source maps? 生产环境 关闭
        sourceMap: isProduction ? false : true
    },
    // 第三方插件配置
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less'
        }
    },
    devServer: {
        open: true,
        // 监听端口
        port: 8088,
        // 反向代理配置
        proxy: proxyObj,
        // 配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
})
