

// xxx
import * as storeStatic from './storeStatic';
import { requestMethod, tip } from 'javascript@/codeTable/globalStatic.js';
// http
import { request } from 'javascript@/http';

const actions = {
    // 本地数据统一请求方法
    [storeStatic.A_ACTION_COMMON]({ commit }, { prefixPath = window.QUALITY.hostName, url, data = {}, method = requestMethod.__GET, tips = tip.__FAIL, paramsSerializer }) {
        // 执行请求
        return new Promise((resolve, reject) => {
            request({
                prefixPath: prefixPath,
                url: url,
                method: method,
                data: {
                    ...data
                },
                paramsSerializer: paramsSerializer
            }).then((res) => {
                resolve(res.data);
            }).catch((e) => {
                console.log(e, '<- 打印 xxx');
            });
        });
    },
    // A 服务
    [storeStatic.A_DATA_QUALITY]({ commit }, { prefixPath = window.QUALITY.hostName, url, data = {}, method = requestMethod.__GET, tips = tip.__FAIL }) {
        return new Promise((resolve, reject) => {
            request({
                prefixPath: prefixPath,
                url: url,
                method: method,
                data: {
                    ...data
                }
            }).then((res) => {
                resolve(res.data);
            });
        });
    },
    // B 服务
    [storeStatic.A_DATA_SERVICE]({ commit }, { prefixPath = window.SERVICE.hostName, url, data = {}, method = requestMethod.__GET, tips = tip.__FAIL }) {
        return new Promise((resolve, reject) => {
            request({
                prefixPath: prefixPath,
                url: url,
                method: method,
                data: {
                    ...data
                },
                mock: true
            }).then((res) => {
                resolve(res.data);
            });
        });
    }
};
export default actions;
