<!--
 * @moduleName: xxx
 * @Author: Ma.yunlong
 * @Date: 2023-04-19 16:33:41
 -->
<template>
    <div class='about'>
        <el-button type="primary" @click="testFunction()">
            执行 外部方法
        </el-button>
        <el-button type="primary" @click="testTools()">
            执行 外部工具
        </el-button>
        <el-button type="primary" @click="testRequest()">
            执行 请求
        </el-button>
    </div>
</template>
 
<script>
export default {
    name: 'xxx',
    inject: [
        // 画布的公共方法
        'componentInterface',
        // 方法库
        'testTool',
        // 请求
        'request'
    ],
    data() {
        // 这里存放数据
        return {};
    },
    // 生命周期 - 创建完成 ( 可以访问当前this实例 )
    created() {},
    // 生命周期 - 挂载完成 ( 可以访问DOM元素 )
    mounted() {},
    // 方法集合
    methods: {
        /**
         * @description: 外部 方法 测试
         * @author: M.yunlong
         * @date: 2023-04-19 16:52:32
        */
        testFunction() {
            // 测试方法
            console.log(this.componentInterface.getTestModel(), '<- 打印 getTestModel');
            // 测试传参
            console.log(this.componentInterface.getData({
                id: '22222'
            }), '<- 打印 getData');
        },
        /**
         * @description: 外部 工具库 测试
         * @author: M.yunlong
         * @date: 2023-04-19 17:25:18
        */
        testTools() {
            console.log(this.testTool.getData({
                id: '22222'
            }), '<- 打印 testTool');
        },
        /**
         * @description: 测试外部 传入请求
         * @author: M.yunlong
         * @date: 2023-04-19 17:15:58
        */
        testRequest() {
            this.request({
                method: 'get',
                url: window.QUALITY.hostName + 'testMock'
            }).then((res) => {
                console.log(res.data, '<- 打印 xxx');
            }).catch((e) => {
                console.log(e, '<- 打印 xxx');
            });
        }
    },
    beforeDestroy() {},
    destroyed() {}
};
</script>

