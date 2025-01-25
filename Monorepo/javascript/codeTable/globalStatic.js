/**
 * @description: 静态常量
 * @author: M.yunlong
 * @date: 2023-04-03 18:00:05
*/
export const globalStatic = {
    // 新增
    ADD: 'add',
    // 编辑
    EDIT: 'edit',
    // 查看
    VIEW: 'view',
    // 打开
    OPEN: 'open',
    // 关闭
    CLOSE: 'close',
    // 删除
    DEL: 'del',
};

// 请求方式
export const requestMethod = {
    __GET: 'get', // 读取
    __POST: 'post', // 新建
    __PUT: 'put', // 更新
    __PATCH: 'patch', // 更新（部分更新）
    __DELETE: 'delete' // 删除
};

// 提示类型
export const tip = {
    __NONE: 'None',
    __FAIL: 'failTips',
    __SUCCESS: 'successTips',
    __DOUBLE: 'doubleTips',
    __SKIP: 'skipTips'
};
