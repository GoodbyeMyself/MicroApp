/**
 * @description: 封装统一的 请求处理
 * @author: M.yunlong
 * @date: 2023-04-18 11:17:10
*/
// xxx
import axios from './axios/index.js';

/**
 * @description: http 工厂方法
 * @author: M.yunlong
 * @date: 2023-04-18 11:18:22
*/
export function request(params = {}) {

    // 此处 可以补一些统一的参数 健壮性判断
    // todo

    // 存在 微服务 名称
    if (params['prefixPath']) {

        // 是否是 生产环境
        const isProduction = process.env.NODE_ENV === 'production';

        // 如果接口 Mock
        if (!isProduction && params.mock) {
            // 切换 mock 服务
            params['prefixPath'] = process.env.VUE_APP_MOCK_HOST;
        }

        // 更正 url
        params['url'] = params['prefixPath'] + params['url'];
    }

    // 统一的方法
    return new Promise((resolve, reject) => {
        axios.request(
            params
        ).then(response => {
            resolve(response);
        })
        .catch(e => {
            reject(e);
        });
    });

};

export default {
    request
};
