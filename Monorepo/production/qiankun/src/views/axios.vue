<!--
 * @moduleName: xxx
 * @Author: Ma.yunlong
 * @Date: 2023-04-15 14:29:18
 -->
<template>
    <div class='test'>
        <!-- 分割线 -->
        <el-divider content-position="left">
            基础测试
        </el-divider>
        <el-button type="primary" @click="testQualityGet">
            测试 服务 A : GET
        </el-button>
        <el-button type="primary" @click="testQualityPost">
            测试 服务 A : Post
        </el-button>
        <el-button type="primary" @click="testAxiosService">
            测试 服务 B : 接口 - 来自 Mock
        </el-button>
        <!-- 分割线 -->
        <el-divider content-position="left">
            axios 封装测试
        </el-divider>
        <el-button type="primary" @click="testAxios('get')">
            axios GET 测试
        </el-button>
        <el-button type="primary" @click="testAxios('post')">
            axios POST 测试
        </el-button>
        <el-button type="primary" @click="testParamsSerializer()">
            axios ParamsSerializer 测试
        </el-button>
        <el-button type="primary" @click="clearAxios()">
            axios 移除请求
        </el-button>
        <!-- 分割线 -->
        <el-divider content-position="left">
            异常 状态码 测试
        </el-divider>
        <el-button type="primary" @click="test401()">
            401
        </el-button>
    </div>
</template>
 
<script>
// 序列化参数
import Qs from 'qs';
import { AxiosCanceler } from "javascript@/http/helper/axiosCancel";
// vuex
import * as storeStatic from 'store@/storeStatic.js';
import { mapActions } from 'vuex';
export default {
    name: 'xxx',
    components: {},
    data() {
        // 这里存放数据
        return {};
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成 ( 可以访问当前this实例 )
    created() {},
    // 生命周期 - 挂载完成 ( 可以访问DOM元素 )
    mounted() {},
    // 方法集合
    methods: {
        ...mapActions([
            // 公共请求
            storeStatic.A_ACTION_COMMON,
            // 服务 A
            storeStatic.A_DATA_QUALITY,
            // 服务 B
            storeStatic.A_DATA_SERVICE
        ]),
        /**
         * @description: axios 基础测试
         * @author: M.yunlong
         * @date: 2023-04-15 14:35:44
        */
        // 测试 Get
        testQualityGet() {
            this[storeStatic.A_DATA_QUALITY]({
                url: 'testMock',
                method: 'get',
                data: {
                    id: '1'
                }
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        },
        // 测试 Post
        testQualityPost() {
            this[storeStatic.A_DATA_QUALITY]({
                url: 'testMock',
                method: 'post',
                data: {
                    id: '1'
                }
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        },
        // 测试 微服务 接口
        testAxiosService() {
            this[storeStatic.A_DATA_SERVICE]({
                url: 'testService',
                method: 'get'
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        },
        /**
         * @description: axios 测试
         * @author: M.yunlong
         * @date: 2023-04-15 17:01:22
        */
        testAxios(method) {
            this[storeStatic.A_ACTION_COMMON]({
                url: 'testAxios',
                data: {
                    id: 'xxx'
                },
                method: method
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        },
        /**
         * @description: 序列话参数
         * @author: M.yunlong
         * @date: 2023-04-18 14:07:45
        */
        testParamsSerializer() {
            this[storeStatic.A_ACTION_COMMON]({
                url: 'testAxios',
                data: {
                    id: '1',
                    taskType: ['custom', 'xxx']
                },
                method: 'get',
                // 序列化 参数
                paramsSerializer: function(params) {
                    let arr = Qs.stringify(
                        params,
                        {
                            arrayFormat: 'repeat'
                        }
                    )
                    return arr
                }
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        },
        /**
         * @description: 401
         * @author: M.yunlong
         * @date: 2023-04-18 14:07:32
        */
        test401() {
            this[storeStatic.A_ACTION_COMMON]({
                url: 'test401'
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        },
        clearAxios() {
            // 创建 实例
            const axiosCanceler = new AxiosCanceler();
            // * 在跳转路由之前，清除所有的请求
	        axiosCanceler.removeAllPending();
        }
    },
    beforeDestroy() {},
    destroyed() {}
};
</script>
