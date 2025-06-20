<!--
 * @moduleName: 头部
 * @Author: Ma.yunlong
 * @Date: 2023-04-24 16:01:46
 -->
<template>
    <el-header>
        <!-- 通信测试 -->
        <el-button type="primary" size="mini" @click="testActions">
            主应用 action 通信测试
        </el-button>
        <!-- 用户 -->
        <div id="user-app">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar shape="square" :size="24" icon="el-icon-user-solid"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出测试</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 国际化 -->
        <Language></Language>
    </el-header>
</template>
 
<script>
import Language from 'components@/Language.vue';
// 父子应用通信
import actions from '@/shared/actions.js';
export default {
    name: 'xxx',
    components: {
        Language
    },
    data() {
        return {};
    },
    mounted() {
        // 注册一个观察者函数
        actions.onGlobalStateChange((state, data) => {
            // 过滤掉以 Govern-Action- 开始的消息
            if (state && state.type && state.type.startsWith('Govern-Action-')) {
                return;
            }
            // --
            console.log("主应用观察者, 接收到的消息：", state);
        });
    },
    methods: {
        /**
         * @description: 通信测试
         * @author: M.yunlong
         * @date: 2023-04-15 10:54:03
        */
        testActions() {
            actions.setGlobalState({
                type: 'Govern-Action-test',
                data: {
                    test: 'xxx'
                }
            });
        },
        /**
         * @description: 登出
         * @author: M.yunlong
         * @date: 2023-04-25 17:30:30
        */
        logOut() {
            // 登出
            this.$router.push({
                path: '/authority/login',
                query: {
                    return_url: this.$route.path,
                }
            });
        },
        /**
		 * @description: 切换 国际化
		 * @author: M.yunlong
		 * @date: 2023-04-24 15:45:56
		*/
		handleCommand (command) {
            switch (command) {
                case 'logout':
                    this.logOut();
                    break;
            }
		}
    }
};
</script>
