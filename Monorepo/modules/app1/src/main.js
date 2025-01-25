import Vue from 'vue';
import App from './App.vue';

// single-spa-vue 负责为 vue 应用 生成通用的生命周期钩子，在子应用注册到 single-spa 的基座应用时需要用到
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

// 基础配置
const appOptions = {
    el: '#microApp',
    render: h => h(App)
};

// 支持应用独立运行、部署，不依赖于基座应用
if (!window.singleSpaNavigate) {
    delete appOptions.el;
    new Vue(appOptions).$mount('#app');
}

// 基于基座应用，导出生命周期函数
const vueLifecycle = singleSpaVue({
    Vue,
    appOptions
});

export function bootstrap () {
    console.log('app1 bootstrap');
    return vueLifecycle.bootstrap(() => {});
}
  
export function mount () {
    console.log('app1 mount');
    return vueLifecycle.mount(() => {});
}
  
export function unmount () {
    console.log('app1 unmount');
    return vueLifecycle.unmount(() => {});
}

