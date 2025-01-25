/**
 * @description: 国际化配置
 * @author: M.yunlong
 * @date: 2023-04-24 15:34:13
*/
import Vue from "vue";
import VueI18n from 'vue-i18n';

// utils
import { storage } from 'javascript@/utils';

// 语言包
import zh from "./languages/zh_cn";
import en from "./languages/en_us";

// Element 语言包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import elementEnLocale from 'element-ui/lib/locale/lang/en'

// 全局注册国际化包
Vue.use(VueI18n);

// 设置 默认值
if (storage.get('language') === null) {
	storage.set('language', 'zh');
}

// 获取值
let localeLanguage = storage.get('language');
 
// 准备翻译的语言环境信息
const i18n = new VueI18n({
    // 初始化中文
    locale: localeLanguage,
    messages: {
        "zh": {
            ...zh,
            ...elementZhLocale
        },
        "en": {
            ...en,
            ...elementEnLocale
        }
    }
});

export default i18n;
