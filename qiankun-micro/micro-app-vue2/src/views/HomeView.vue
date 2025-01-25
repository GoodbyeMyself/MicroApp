<template>
    <div class="home" style="height: 2000px">
        <HelloWorld msg="Welcome to Your Vue2 App"/>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            :modal="false"
            :modal-append-to-body="false"
        >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <img alt="Vue logo" src="../assets/logo.png">
        <el-button type="text" @click="backLayout()">回到主应用</el-button>
        <br>
        <br>
        <el-button type="primary" @click="testActions">子应用 给 主应用通信</el-button>
        <br>
        <br>
        <el-button type="primary" @click="test401()">
            401
        </el-button>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
// 父子应用通信
import actions from '@/shared/actions.js';
// vuex
import * as storeStatic from 'store@/storeStatic.js';
import { mapActions } from 'vuex';
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
    computed: {
        /**
         * @description: 是否来自 QIANKUN
         * @author: M.yunlong
         * @date: 2023-04-25 16:19:25
        */
        POWERED_BY_QIANKUN() {
            return window.__POWERED_BY_QIANKUN__;
        }
    },
    created() {
        // 监听父子通信
        actions.onGlobalStateChange((state, prev) => {
            // 传递的数据
            console.log(state, '<- 子应用 接收到 数据了');
        });
    },
    methods: {
        ...mapActions([
            // 公共请求
            storeStatic.A_ACTION_COMMON
        ]),
        /**
         * @description: 弹出层
         * @author: M.yunlong
         * @date: 2023-04-26 10:42:53
        */
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        backLayout() {
            /**
             * 该方法接受3个参数
             * - state: histroy.state 这个属性，如果你不做任何标识可以传null
             * - title: 浏览器标题(现在都不支持，所以都传空字符串''，你可以通过document.title = 'xxxx'去修改)
             * - url: 当前要修改的url,新的URL可以是任何和当前URL同源的URL     ps: '/xxxx'
             * 该方法会让histroy.length 加一
            */
            window.history.pushState(null, '', '/');
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
        },
        /**
         * @description: 401
         * @author: M.yunlong
         * @date: 2023-04-18 14:07:32
        */
        test401() {
            console.log(222, '<- 打印 xxx');
            this[storeStatic.A_ACTION_COMMON]({
                url: 'test401'
            }).then(res => {
                console.log(res, '<- 打印 axios res');
            });
        }
    }
}
</script>
