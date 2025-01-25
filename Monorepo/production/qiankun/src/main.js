import Vue from 'vue';
import App from './App.vue';

// 路由
import router from "./router";
// qiankun
import startQiankun from "./micro";
// Vuex
import store from './store';
// 国际化
import i18n from '@/assets/i18n';
// 自定义指令
import './directive.config';
// element
import './element.config';
// 全局样式
import '@/assets/less/index.less';
// 图标
require('@/assets/icons');

Vue.config.productionTip = false;

// 执行应用注册
startQiankun({
    sandbox: {
        // 主动添加 前缀
        experimentalStyleIsolation: true
    }
});

// 实例化
new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app-base');
