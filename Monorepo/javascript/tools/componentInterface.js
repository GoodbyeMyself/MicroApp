/**
 * @description: 方法集合 统一对外
 * @author: M.yunlong
 * @date: 2023-04-19 16:27:39
*/
const componentInterface = function (testTool) {
    return {
        /**
         * 获取 获取节点 alias
         */
        getTestModel() {
            return testTool.testModel;
        },
        /**
         * 获取数据
         */
        getData(data) {
            return testTool.getData(data);
        }
    };
};

export default componentInterface;
