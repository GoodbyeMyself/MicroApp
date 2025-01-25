
/**
 * @description: 父子应用 通信
 * @author: M.yunlong
 * @date: 2023-04-15 10:52:05
*/
import { initGlobalState } from "qiankun";


const initialState = {
    // 事件类型
    type: '',
    // 传递的数据
    data: null
};

const actions = initGlobalState(initialState);

export default actions;
