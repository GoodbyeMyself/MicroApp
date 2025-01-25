<template>
    <div id="substrate">
        <div id="nav">
            主应用
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link>
            <br>
            <br>
            <el-button type="primary" @click="test()">父子应用通信测试</el-button>
            <br>
            <br>
            子应用
            <router-link to="/app1">app1</router-link> |
            <router-link to="/vue2">vue2</router-link> |
            <router-link to="/vue3">vue3</router-link> |
            <router-link to="/react">react</router-link>
        </div>
        <!-- 主应用 路由 -->
        <router-view name="substrateRouter" />
        <!-- 子应用容器 -->
        <div id="microApp">
            <!-- 子应用 路由 -->
            <router-view/>
        </div>
    </div>
</template>
<script>
// 事件总线
import { messageCenterEvents } from 'javascript@/messageCenter/index.js';
export default {
    data() {
        return {};
    },
    created() {},
    methods: {
        test() {
            messageCenterEvents.next({
                type: 'test',
                data: {
                    test: 'xxxxx'
                }
            });
        }
    }
};
</script>

<style>
#substrate {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>