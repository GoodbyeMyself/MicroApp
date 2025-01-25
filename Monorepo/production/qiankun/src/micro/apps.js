/**
 * @description: 子应用
 * @author: M.yunlong
 * @date: 2023-04-13 14:44:20
*/
// 是否是 生产环境
const isProduction = process.env.NODE_ENV === 'production';

// 走 前端本地 缓存
const publicPath = isProduction ? process.env.VUE_APP_PREFIX : '/';

const apps = [
    /**
     * name: 微应用名称 - 具有唯一性
     * entry: 微应用入口 - 通过该地址加载微应用，这里我们使用 config 配置
     * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
     * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
     */
    {
        name: "AuthorityMicroApp",
        // debug
        // entry: process.env.VUE_APP_AUTHORITY_MICRO_APP,
        // html
        entry: publicPath + `app/authority/index.html`,
        container: "#authorityFrame",
        activeRule: "/authority"
    },
    {
        name: "Vue2MicroApp",
        // debug
        // entry: process.env.VUE_APP_VUE2_MICRO_APP,
        // html
        entry: publicPath + `app/micro-app-vue2/index.html`,
        container: "#microframe",
        activeRule: "/vue2"
    },
    {
        name: "Vue3MicroApp",
        // debug
        // entry: process.env.VUE_APP_VUE3_MICRO_APP,
        // html
        entry: publicPath + `app/micro-app-vue3/index.html`,
        container: "#microframe",
        activeRule: "/vue3"
    },
    {
        name: "ReactMicroApp",
        // debug
        // entry: process.env.VUE_APP_REACT_MICRO_APP,
        // html
        entry: publicPath + `app/micro-app-react/index.html`,
        container: "#microframe",
        activeRule: "/react"
    }
];
  
export default apps;
