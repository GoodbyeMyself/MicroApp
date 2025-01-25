<template>
    <div id="app-base">
        <el-container v-show="['main', 'micro'].includes(application)">
            <el-aside width="200px" class="leftMenu">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <Header></Header>
                <!-- 主容器 -->
                <el-main>
                    <!-- 主应用 路由 -->
                    <router-view/>
                    <!-- 子应用 容器 -->
                    <section v-show="application === 'micro'" id="microframe"></section>
                </el-main>
                <!-- 底部 -->
                <el-footer>
                    <span>Footer</span>
                </el-footer>
            </el-container>
        </el-container>
        <!-- 子应用 容器 -->
        <section v-show="application === 'authority'" id="authorityFrame"></section>
    </div>
</template>

<script>
// components
import Menu from 'components@/Menu.vue';
import Header from 'components@/Header.vue';
export default {
    components: {
        Menu,
        Header
    },
    data() {
        return {
            loading: false,
            // 应用
            application: 'main'
        };
    },
    computed: {
        // 完整 路由信息
        routerInfo() {
            return this.$route
        },
        // 路由名称
        routerName() {
            return this.$route.name
        }
    },
    watch: {
        routerInfo() {
            // 容器更正
            this.updateContainer();
        }
    },
    mounted() {
        // 更正容器
        this.updateContainer();
    },
    methods: {
        /**
         * @description: 更正容器
         * @author: M.yunlong
         * @date: 2023-04-26 10:20:34
        */
        updateContainer() {
            // 主应用
            if (this.routerName) {
                // update
                this.application = 'main';
                // 阻止后续
                return false;
            }
            /**
             * @description: 子应用处理
             * @author: M.yunlong
             * @date: 2023-04-26 10:29:35
            */
            // 获取 path
            let path = this.routerInfo.path.split('/').filter((item) => item !== '');

            // 应用名称
            let microName = path[0];

            // 基础平台
            if (microName === 'authority') {
                // update
                this.application = 'authority';
            } else {
                // update
                this.application = 'micro';
            }
        }
    },
};
</script>

<style lang="less">
body {
    margin: 0;
}
#app-base {
    width: 100%;
    height: 100vh;
    display: flex;
}
.leftMenu {
    background-color: #545c64;
    .el-menu {
        border-right: none;
    }
}
</style>
