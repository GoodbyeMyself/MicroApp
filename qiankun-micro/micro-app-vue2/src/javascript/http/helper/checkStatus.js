import { Message } from 'element-ui';

/**
 * @description: 校验状态码
 * @param {number} status
 */
export const checkStatus = (status) => {
	switch (status) {
		case 400:
			Message.error("400 请求失败！请您稍后重试");
			break;
		case 401:
			Message.error("401 登录已失效, 请您重新登录!");
			/**
			 * @description: 此处要根据 子应用的 语法规则做区分： 目前统一 采用 主应用 基座处理 [ Vue2 ]
			 * @author: M.yunlong
			 * @date: 2023-04-25 21:00:48
			*/
			if (window.router) {
				// 获取 路由实例
				let router = window.router;
				// 登出
				router.push({
					path: '/authority/login',
					query: {
						return_url: router.currentRoute.path,
					}
				});
			}
			break;
		case 403:
			Message.error("403 当前账号无权限访问！");
			break;
		case 404:
			Message.error("404 你所访问的资源不存在！");
			break;
		case 405:
			Message.error("405 请求方式错误！请您稍后重试");
			break;
		case 408:
			Message.error("408 请求超时！请您稍后重试");
			break;
		case 500:
			Message.error("500 服务异常！");
			break;
		case 502:
			Message.error("502 网关错误！");
			break;
		case 503:
			Message.error("503 服务不可用！");
			break;
		case 504:
			Message.error("504 网关超时！");
			break;
		default:
			Message.error("请求失败！");
	}
};
