<template>
    <div id="app">
        <el-container class="authority-app">
            <el-header>Logo</el-header>
            <el-main>
                <!-- 路由 -->
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
// components
export default {
    name: 'authority-app',
    data() {
        return {
            loading: false
        };
    },
    created() {},
    methods: {}

}
</script>

<style lang="less">
.authority-app {
    .el-header {
        line-height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
    }
}
</style>
