import * as storeStatic from './storeStatic';
import { getDefaultState } from './state';

const mutations = {
    [storeStatic.M_RESET_STORE](state) {
        Object.assign(state, getDefaultState());
    },
    [storeStatic.M_SET_ACCESS](state, data) {
        state.access = data;
    }
};
export default mutations;
