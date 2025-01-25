import Vue from 'vue';
// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 国际化
import i18n from '@/assets/i18n';

// 复写 element-ui 的扩展
import extension from 'ui@/Element/overwrite';

// 组件的形式 继承复写
import Button from 'ui@/Element/extend/button.vue';

// 继承的组件列表
let components = [Button];

// 生成组件
components.map(component => {
    Vue.component(component.name, component);
});

// 全局注册 Element ui
Vue.use(ElementUI, {
    // set element-ui default size
    size: 'medium',
    // 国际化
    i18n: (key, value) => i18n.t(key, value)
});

// 执行 Element 方法复写
extension();
