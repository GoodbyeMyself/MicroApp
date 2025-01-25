import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
// 采用 single-spa 子应用方式，要放弃路由懒加载
import AboutView from '../views/AboutView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: 'about' */ '../views/AboutView.vue')
        component: AboutView
    }
];

const router = new VueRouter({
    // 模式
    mode: 'history',
    // 通过环境变量来配置路由的 base url
    base: process.env.VUE_APP_BASE_URL,
    // 路由
    routes
});

export default router;
