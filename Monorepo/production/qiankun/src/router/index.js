import Vue from 'vue';
import VueRouter from 'vue-router';

// 组件
import { routes } from './routes';

// 守卫
import { protectorRouter } from './protector';

Vue.use(VueRouter);


// 解决重复 路由报错的问题
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// 路由实例挂载
window.router = router;

// 路由劫持
router.beforeEach((to, from, next) => {
    // 守卫
    protectorRouter(to, from).then(() => {
        next();
    });
})

export default router;
