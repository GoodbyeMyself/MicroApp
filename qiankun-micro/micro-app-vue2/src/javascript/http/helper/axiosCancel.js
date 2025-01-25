/**
 * @description: 请求取消
 * @author: M.yunlong
 * @date: 2023-04-18 17:14:03
*/
import axios from "axios";
import Qs from 'qs';

// * 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map();

/**
 * @description: 序列化参数
 * @author: M.yunlong
 * @date: 2023-04-18 17:54:19
*/
export const getPendingUrl = (config) => [config.method, config.url, Qs.stringify(config.data), Qs.stringify(config.params)].join("&");

export class AxiosCanceler {
    /**
	 * @description: 添加请求
	 * @param {Object} config
	 */
	addPending(config) {
        // * 在请求开始前，对之前的请求做检查取消操作
		this.removePending(config);

        // 序列化参数: 做唯一值处理
		const url = getPendingUrl(config);

        config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
            if (!pendingMap.has(url)) {
                // 如果 pending 中不存在当前请求，则添加进去
                pendingMap.set(url, cancel);
            }
        });
	}
    /**
	 * @description: 移除请求
	 * @param {Object} config
	 */
	removePending(config) {
		const url = getPendingUrl(config);

		if (pendingMap.has(url)) {
			// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}
    /**
	 * @description: 清空所有pending
	 */
	removeAllPending() {
		pendingMap.forEach(cancel => {
            console.log(cancel, '<- 打印 cancel');
			cancel && cancel();
		});
		pendingMap.clear();
	}

	/**
	 * @description: 重置
	 */
	reset() {
		pendingMap = new Map();
	}
};












