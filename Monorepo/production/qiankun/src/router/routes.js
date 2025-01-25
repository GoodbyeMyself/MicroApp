// 组件
import Home from '../views/home.vue';

export const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/axios',
    name: 'axios',
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/axios.vue')
}, {
    path: '/sandbox',
    name: 'sandbox',
    component: () => import(/* webpackChunkName: "about" */ '../views/sandbox/index.vue')
}, {
    path: '/element',
    name: 'element',
    component: () => import(/* webpackChunkName: "about" */ '../views/element.vue')
}, {
    path: '/i18n',
    name: 'i18n',
    component: () => import(/* webpackChunkName: "about" */ '../views/i18n.vue')
}, {
    path: '/error',
    name: 'error',
    meta: {
        title: '404'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/error.vue')
}];


export default {
    routes
};
