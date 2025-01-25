<!--
 * @moduleName: 菜单
 * @Author: Ma.yunlong
 * @Date: 2023-04-23 09:53:36
 -->
<template>
    <el-menu
        :default-active="activeRouter"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        @select="handleSelect"
    >
        <!-- 主应用 -->
        <template v-for="(item, index) in menuConfig">
            <el-menu-item :index="item.path">
                <span
                    slot="title"
                    :key="index"
                >
                    {{  item.name }}
                </span>
            </el-menu-item>
        </template>
        <!-- 子应用 -->
        <el-submenu index="2">
            <template slot="title">Vue2</template>
            <el-menu-item index="/vue2/home">主页</el-menu-item>
            <el-menu-item index="/vue2/about">关于</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">Vue3</template>
            <el-menu-item index="/vue3/home">主页</el-menu-item>
            <el-menu-item index="/vue3/about">关于</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">React</template>
            <el-menu-item index="/react/home">主页</el-menu-item>
            <el-menu-item index="/react/list">关于</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
 
<script>
export default {
    name: 'Menu',
    data() {
        return {
            // 默认激活的路由
            activeRouter: '/',
            // menu 菜单
            menuConfig: [{
                name: '主页',
                path: '/'
            }, {
                name: 'axios 封装测试',
                path: '/axios'
            }, {
                name: '沙盒测试',
                path: '/sandbox'
            }, {
                name: 'Element 测试',
                path: '/element'
            }, {
                name: '国际化 测试',
                path: '/i18n'
            }]
        };
    },
    computed: {
        routerName() {
            return this.$route.name
        },
        routerInfo() {
            return this.$route
        }
    },
    watch: {
        routerName(val) {
            // 已经在 主应用了 执行子应用 动画重置
            if (val) {
                // 进度处理
                let NProgress = window.NProgress;
                // xxx
                NProgress.done();
            }
        },
        routerInfo(val) {
            // 更新路由
            this.activeRouter = val.path || '/';
        }
    },
    mounted() {
        // 设置 初始路由
        this.activeRouter = this.routerInfo.path || '/';
    },
    methods: {
        /**
         * @description xxx
         */
        handleSelect(key) {
            this.$router.push(key);
        }
    },
    beforeDestroy() {},
    destroyed() {}
};
</script>
