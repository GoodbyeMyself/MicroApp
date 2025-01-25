<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/images/logo.png">
        <!-- 分割线 -->
        <el-divider content-position="left">
            icon font 图标测试 A 项目
        </el-divider>
        <svg-icon iconClass="outdent" />
        <!-- 分割线 -->
        <el-divider content-position="left">
            icon font 图标测试 B 项目
        </el-divider>
        <svg-icon iconClass="fadou" />
        <!-- 分割线 -->
        <el-divider content-position="left">
            本地 加载 图标测试
        </el-divider>
        <svg-icon iconClass="quality" className="testColor"/>
        <svg-icon iconClass="work" />
        <!-- 分割线 -->
        <el-divider content-position="left">
            自定义指令测试
        </el-divider>
        <el-empty description="点击容器外侧" v-clickOutside="_outClickFun"></el-empty>
    </div>
</template>

<script>
// vuex
import { mapState } from 'vuex';
export default {
    name: 'HomeView',
    computed: {
        ...mapState({
            testState: state => state.testState
        })
    },
    mounted() {
        // console.log(this.testState, '<- 打印 state');
    },
    methods: {
        /**
         * @description: xxxxxxx
         * @author: M.yunlong
         * @date: 2023-04-23 16:35:15
        */
        _outClickFun() {
            console.log(1, '<- 容器外被点击了');
        }
    },
}
</script>

<style lang="less">
.testColor {
    margin-right: 12px;
    color: red;
    font-size: 16px;
}
</style>
