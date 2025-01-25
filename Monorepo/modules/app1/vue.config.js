/**
 * @description: webpack 配置项
 * @author: M.yunlong
 * @date: 2023-04-06 14:13:03
*/

// 可以提供语法提示
const { defineConfig } = require('@vue/cli-service');

// 获取 包 信息
const package = require('./package.json');

module.exports = defineConfig({
	// 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖, 可以在这个选项中列出来
	transpileDependencies: [],
	// 告诉子应用在这个地址加载静态资源，否则会去基座应用的域名下加载
	publicPath: '//localhost:7071',
	// 开发服务器
	devServer: {
		port: 7071
	},
	configureWebpack: {
		// 导出umd格式的包，在全局对象上挂载属性package.name，基座应用需要通过这个全局对象获取一些信息，比如子应用导出的生命周期函数
		output: {
			// library的值在所有子应用中需要唯一
			library: package.name,
			libraryTarget: 'umd'
		}
	}
});