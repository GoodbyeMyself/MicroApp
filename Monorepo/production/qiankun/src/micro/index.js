/**
 * @description: 子应用 注册配置
 * @author: M.yunlong
 * @date: 2023-04-13 14:40:47
*/
// qiankun
import {
    registerMicroApps,
    addGlobalUncaughtErrorHandler,
    start,
} from "qiankun";

// 子应用注册信息
import apps from "./apps.js";

// 进度处理
let NProgress = window.NProgress;

/**
 * 注册子应用
 * 第一个参数 - 子应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
    // qiankun 生命周期钩子 - 加载前
    beforeLoad: (app) => {
        // 子应用名称
        let appName = app.name;
        // 指定容器
        NProgress.configure({
            parent: appName === 'AuthorityMicroApp' ? '#authorityFrame' : '#microframe'
        });
        // 加载子应用前，加载进度条
        NProgress.start();
        // xxx
        return new Promise((resolve, reject) => {
            // 动态加载子应用代码
            window.setTimeout(() => {
                resolve({
                    // 返回子应用的 entry
                    getBootstrap: () => import(`${appName}/bootstrap`),
                    getMount: () => import(`${appName}/mount`),
                    getUnmount: () => import(`${appName}/unmount`)
                })
            }, 1000);
        });
        // return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 挂载前
    beforeMount: (app) => {},
    // qiankun 生命周期钩子 - 挂载后
    afterMount: (app) => {
        // 加载子应用后，进度条加载完成
        NProgress.done();
        // xxx
        return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 卸载前
    beforeUnmount: (app) => {},
    // qiankun 生命周期钩子 - 卸载后
    afterUnmount: (app) => {}
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
    // console.error(event, '<- 子应用 加载 提示信息');
    // 加载失败时提示
    // if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    //     message.error("子应用加载失败，请检查应用是否可运行");
    // }
});

// 导出 qiankun 的启动函数
export default start;
