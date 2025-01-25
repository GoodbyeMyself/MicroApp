<template>
    <div class="home">
        <HelloWorld msg="插件 - 2 - 已加载"/>
        <img alt="Vue logo" src="../assets/logo.png" style="display: block; margin: 0 auto">
        <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <br>
        <br>
        <el-button type="primary" @click="testActions">子应用 给 主应用通信</el-button>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
// 父子应用通信
import actions from '@/shared/actions.js';
export default {
    name: 'HomeView',
    components: {
        HelloWorld
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    created() {
        // 监听父子通信
        actions.onGlobalStateChange((state, prev) => {
            // 传递的数据
            console.log(state, '<- 子应用 接收到 数据了');
        });
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        /**
         * @description: 子应用 给 主应用 通信测试
         * @author: M.yunlong
         * @date: 2023-04-15 11:20:49
        */
        testActions() {
            actions.setGlobalState({
                type: 'vue2Micro-actionsTest',
                data: {
                    test: 'xxx'
                }
            });
        }
    }
}
</script>
