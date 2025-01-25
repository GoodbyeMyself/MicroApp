import "./public-path";

import Vue from 'vue';

import VueRouter from 'vue-router';
import routes from './routes';

import App from './App.vue';

// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 父子应用通信
import actions from '@/shared/actions.js';

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(ElementUI);

let instance = null;
let router = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render(props = {}) {
    // xxx
    console.log(props, '<- 子应用接收到的 props');

    // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    router = new VueRouter({
        // 运行在主应用中时，添加路由命名空间 /vue
        base: window.__POWERED_BY_QIANKUN__ ? "/plugin-1" : "/",
        // 这个参数 可以处理
        mode:  window.__POWERED_BY_QIANKUN__ ? "abstract" : "history",
        routes
    });

    const { container, data, componentInterface, testTool, request } = props;

    // 挂载应用
    instance = new Vue({
        router,
        render: h => h(App, {
            props: {
                // 画布 公共方法
                componentInterface: componentInterface,
                // xxx
                testTool: testTool,
                // 请求方法
                request: request
            }
        }),
    }).$mount(container ? container.querySelector('#app') : '#app');

    // 默认的路由
    if (data?.defaultPath) {
        router.push(data?.defaultPath);
    }
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
    console.log("app1 bootstraped <- 插件");
}
  
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    console.log("app1 mount <- 插件", props);
    // 注入 actions 实例, 进行父子应用通信
    actions.setActions(props);
    // 动态加载子应用代码
    render(props);
}
  
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    console.log("app1 unmount <- 插件");
    instance.$destroy();
    instance = null;
    router = null;
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function update(props) {
    console.log('update props', props);
}
