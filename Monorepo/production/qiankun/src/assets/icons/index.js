/**
 * @description: xxxxxxx
 * @author: M.yunlong
 * @date: 2023-04-24 11:52:02
*/
import Vue from 'vue';
// svg 组件
import SvgIcon from '@/components/SvgIcon';

/**
 * @description: 这两个 是 iconfont symbol 的使用方式， icon- 前缀，要与 本地加载 保持一致
*/
// Govern 图标库
import 'assets@/fonts/govern/iconfont';
// 表情包
import 'assets@/fonts/emoticons/iconfont';

// 全局注册组件
Vue.component('svg-icon', SvgIcon);

// 加载文件
const requireAll = reqireContext => reqireContext.keys().map(reqireContext);
// 获取 图标
const req = require.context('./svg', false, /\.svg$/);
// 执行
requireAll(req);
