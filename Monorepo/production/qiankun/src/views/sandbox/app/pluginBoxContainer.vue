<template>
    <div>
        <div>
            <el-button type="primary" @click="openPlugin('get')">
                加载： 插件2
            </el-button>
        </div>
        <!-- 插件容器 -->
        <div id="pluginBoxContainer" v-loading="loading">
            <el-empty description="暂无插件"></el-empty>
        </div>
    </div>
</template>

<script>
// qiankun 框架
import { loadMicroApp } from 'qiankun';
export default {
    name: 'sandbox',
    data() {
        // 这里存放数据
        return {
            loading: false,
            // 插件id
            pluginId: 'plugin-2'
        };
    },
    mounted() {
        this.microApp = null;
    },
    methods: {
        /**
         * @description: 插件测试
         * @author: M.yunlong
         * @date: 2023-04-19 11:12:59
        */
        openPlugin() {
            // 加锁
            this.loading = true;

            // 防止 子应用被重复 加载
            if (this.microApp !== null) {
                // 解锁
                this.loading = false;
                // 阻止
                return false;
            }
            
            // 是否是 开发环境
            const isProduction = process.env.NODE_ENV === 'production';

            // 走 前端本地 缓存
            const publicPath = isProduction ? process.env.VUE_APP_PREFIX : '/';

            // 定义入口
            let entry = publicPath + `packages/${this.pluginId}/index.html`;

            // 开发环境
            if (!isProduction) {
                // 如果是本地环境，并且代理列表不为空，调整为代理的地址
                const PROXY_MAP = require('../env.js');
                // 代理
                if (PROXY_MAP[this.pluginId]) {
                    entry = PROXY_MAP[this.pluginId].entry;
                }
            }

            this.$nextTick(() => {

                // 注册子应用
                this.microApp = loadMicroApp(
                    {
                        container: '#pluginBoxContainer',
                        name: this.pluginId,
                        entry,
                        props: {
                            data : {
                                defaultPath: '/home'
                            }
                        }
                    },
                    {
                        sandbox: {
                            experimentalStyleIsolation: true
                        }
                    }
                );

                // 关闭 loading
                this.microApp.mountPromise.finally(() => {
                    this.loading = false;
                });
            });
        }
    },
    beforeDestroy() {
        if (this.microApp) {
            this.microApp.unmount();
            this.microApp = null;
        }
    }
}
</script>

<style lang="less">
#pluginBoxContainer {
    width: 400px;
    height: 500px;
    border: 1px solid #999;
    margin-top: 12px;
    float: left;
}
</style>
