import "./public-path";
// vue
import Vue from 'vue';
// vue - router
import VueRouter from 'vue-router';
import routes from './routes';
// Vuex
import store from './store';

// element
import ElementUI from 'element-ui';

// 全局样式
import './assets/less/index.less';

// 入口
import App from './App.vue';

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
    // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    router = new VueRouter({
        // 运行在主应用中时，添加路由命名空间 /vue
        base: window.__POWERED_BY_QIANKUN__ ? "/authority" : "/",
        mode: "history",
        routes
    });

    const { container } = props;

    // 挂载应用
    instance = new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount(container ? container.querySelector('#app') : '#app');
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
    console.log("基础平台 bootstraped <- 子应用");
}
  
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    console.log("基础平台 mount <- 子应用");
    // 动态加载子应用代码
    render(props);
}
  
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    console.log("基础平台 unmount <- 子应用");
    // 执行 子应用 动画卸载
    window.cancelAnimationFrame(window.animationFrame);
    // 子应用 实例销毁
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
