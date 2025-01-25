/**
 * @description: 路由配置
 * @author: M.yunlong
 * @date: 2023-04-24 21:21:42
*/
import Main from '../views/main.vue';


const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    name: 'login',
    component: Main
}, {
    path: '/register',
    name: 'register',
    component: Main
}, {
    path: '*',
    name: 'Error',
    meta: {
        title: '404'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/error.vue')
}];

export default routes;
