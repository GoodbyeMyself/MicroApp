/**
 * @description: axios 封装
 * @author: M.yunlong
 * @date: 2023-04-18 10:02:10
*/
// axios
import axios from "axios";
// 加密
import sha256 from 'sha256';
import { Base64 } from 'js-base64';
// 生成随机码 - 加盐
import { uuid } from 'javascript@/utils';
// 校验状态
import { checkStatus } from "../helper/checkStatus";
// 取消请求
import { AxiosCanceler } from '../helper/axiosCancel';
// 接口前缀
import '../config';


// 利用 axios.create() 创建 axios 实例
let instance = axios.create({
    // 基础请求路径
    baseURL: '',
    // 超时时间 [ 3 分钟 ]
    timeout: 1000 * 60 * 3,
    // 是否携带 cookie 信息
    withCredentials: true
});

// 取消请求
const axiosCanceler = new AxiosCanceler();

/**
 * @description: 请求拦截器
*/
instance.interceptors.request.use(
    config => {
        // 兼容性 处理
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        // 允许 cookie 共享，跨域问题，传Cookie是必须配置
        config['credentials'] = 'include';

        // 请求方式
        config.method = (config.method && config.method.toLocaleLowerCase()) || 'get';

        // 处理：Get 请求参数
        if (config.method === 'get') {
            // Get 参数体
            config.params = config.data;
            // 删除 data
            delete config.data;
        }

        // 处理：Post 请求参数
        if (config.data) {
            // 需要加密
            if (window.config && window.config.useBase64Encode && config.method !== 'get') {
                // 更换类型
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                // 转 字符串
                let jsonStrData = JSON.stringify(config.data);
                // base64 编码
                let base64Data = Base64.encode(jsonStrData);
                /**
                 * @description: 将所有加号（+）替换为编码为 %2b 的字符串
                 * @author: M.yunlong
                 * 因为加号是 URL 中的一种保留字符，如果在 URL 中直接传输加号，可能会被服务器误解为空格或其他字符，导致传输错误。
                 * 而将加号替换为 %2b 的字符串，可以让服务器正确地解析数据，避免这种错误发生。因此在将 base64 编码后的数据进行 URL 传输时，常常需要对加号进行替换操作
                */
                let sendData = base64Data.replace(/\+/g, '%2b');
                // 盐值
                let addSalt = uuid();
                // 加密
                config.headers['X-Request-Cipher'] = sha256(base64Data + addSalt);
                // 盐值
                config.headers['X-Request-Salt'] = addSalt;
                // 提交的数据
                config.data = 'dataContent=' + sendData;
            }
        } 

        // 可以在此处 设置自定义 请求头参数
        config.headers['x-request-custom'] = 'xxx';

        // 将当前请求添加到 pending 中
		axiosCanceler.addPending(config);

        // xxx
        return config;
    },
    error => {
        // xxx
		return Promise.reject(error);
	}

);

/**
 * @description: 响应拦截器
*/
instance.interceptors.response.use(
    response => {
        // xxx
        return response;
    },
    error => {
        // 提示信息： 可以定义 结构体
        let message = '';

        // 错误码
        let { code } = error;

        // 取消请求
        if (code === 'ERR_CANCELED') {
            message = '请求被取消了';
        }

        // 响应错误状态
        if (error.response) {
            // 状态值
            let { status } = error.response;

            // 依据 不同的状态值 进行处理
            checkStatus(status);

            /**
             * @date: 断网的特殊处理
            */
            if (!window.navigator.onLine) {
                console.error('请检查您的网络链接~');
            }

            message = status;
        }

        return Promise.reject(message);
    }
);

// 对外抛出
export default instance;


















