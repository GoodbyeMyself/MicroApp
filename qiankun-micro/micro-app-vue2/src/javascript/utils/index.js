// 判断目标是否为对象
export const isObject = target => Object.prototype.toString.call(target).slice(8, -1) === 'Object';
// 判断是否为字符串
export const isString = target => typeof target === 'string';
// 判断是否为数值
export const isNumber = target => typeof target === 'number';
// 判断是否为null
export const isNull = target => Object.prototype.toString.call(target).slice(8, -1) === 'Null';
// 判断是否为undefined
export const isUndefined = target => Object.prototype.toString.call(target).slice(8, -1) === 'Undefined';
// 判断是否为数组
export const isArray = target => Object.prototype.toString.call(target).slice(8, -1) === 'Array';
// 判断是否为布尔值
export const isBool = target => Object.prototype.toString.call(target).slice(8, -1) === 'Boolean';
// 判断一个对象是否为空对象（即无可枚举的属性）
export const isEmpty = target => {
	if (isNull(target)) {
		return true;
	}
	return !Object.keys(target).length;
};

/**
 * @description: 随机码
 * @author: M.yunlong
 * @date: 2023-04-24 16:26:43
*/
export function uuid() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
};

/**
 * @description: localStorage
 * @author: M.yunlong
 * @date: 2023-04-24 16:26:58
*/
export const storage = {
	set: (key, value) => {
		if (isObject(value) || isArray(value)) {
			value = JSON.stringify(value);
		};
		localStorage.setItem(key, value);
	},
	get: (key) => {
		return localStorage.getItem(key);
	},
	remove: (key) => {
		localStorage.removeItem(key);
	},
	clear: () => {
		localStorage.clear();
	},
	self: () => {
		return localStorage;
	}
};

export default {
    uuid
};