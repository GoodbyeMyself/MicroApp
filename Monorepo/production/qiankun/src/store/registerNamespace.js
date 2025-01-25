/**
 * @description: 采用 命名空间的形式 注册
 * @author: M.yunlong
 * @date: 2023-04-26 15:32:12
*/

import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default {
    install(_this, moduleName) {
        if (!_this.$store) {
            console.warn('父级没有挂载stroe');
        }
        let { _children } = _this.$store._modules.root;
        for (let key in _children) {
            if (key === moduleName) {
                if (process.env.NODE_ENV !== 'production') {
                    console.info('该模块已注册vuex==>', moduleName);
                }
                return;
            }
        }
        _this.$store.registerModule([moduleName], {
            namespaced: true,
            state: state,
            actions: actions,
            mutations: mutations
        });
    },
    uninstall(_this, moduleName) {
        let { _children } = _this.$store._modules.root;
        for (let key in _children) {
            if (key === moduleName) {
                _this.$store.commit(moduleName + '/' + storeStatic.M_RESET_STATE);
                _this.$store.unregisterModule([moduleName]);
                return;
            }
        }
    }
};
