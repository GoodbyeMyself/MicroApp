/**
 * @description: 路由守卫
 * @author: M.yunlong
 * @date: 2023-04-25 19:51:53
*/
// 守卫函数
export function protectorRouter (to, from) {
    return new Promise((resolve, reject) => {

        // 获取值
        const { name, path } = to;

        // 主 应用
        if (name !== null) {
            resolve();
        } else {
            // 获取 path
            let routerInfo = path.split('/').filter((item) => item !== '');

            // 应用名称
            let microName = routerInfo[0];

            // 已注册应用
            let microList = ['authority', 'vue2', 'vue3', 'react'];

            // 判断是否 存在
            if (microList.includes(microName)) {
                resolve();
            } else {
                // 获取 路由实例
				let router = window.router;
                // 置为 error
                router.push('error');
                // xxx
                resolve();
            }
        }
    });
};

// 支持按需 引入
export default {
    protectorRouter
};
