import { h, createApp } from 'vue';
import App from './App.vue';
import router from './router';

// single-spa-vue 负责为 vue 应用 生成通用的生命周期钩子，在子应用注册到 single-spa 的基座应用时需要用到
import singleSpaVue from 'single-spa-vue';

// 支持应用独立运行、部署，不依赖于基座应用
if (!window.singleSpaNavigate) {
    createApp(App).use(router).mount('#app');
}

// 基于基座应用，导出生命周期函数
const vueLifecycle = singleSpaVue({
    createApp,
    appOptions: {
        el: '#microApp',
        render() {
            return h(App, {
                props: {
                    name: 'xxx'
                }
            });
        }
    },
    handleInstance: app => {
        app.use(router);
    }
});

export function bootstrap() {
    console.log('vue3 bootstrap');
    return vueLifecycle.bootstrap(() => {});
}

export function mount() {
    console.log('vue3 mount');
    return vueLifecycle.mount(() => {});
}

export function unmount() {
    console.log('vue3 unmount');
    return vueLifecycle.unmount(() => {});
}
