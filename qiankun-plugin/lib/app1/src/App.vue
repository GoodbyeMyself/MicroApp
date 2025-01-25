<template>
    <div id="app">
        <nav>
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <router-view/>
        测试文案1 + 2023-11-26
        <TestVue></TestVue>
    </div>
</template>

<script>
import { TestVue } from '@common/components';
import { utils } from '@common/utils';
export default {
    name: 'xxx',
    components: {
        TestVue
    },
    props: {
        // 外部传进来的方法
        componentInterface: Object,
        // 方法库
        testTool: Object,
        // 请求
        request: Function
    },
    provide() {
        return {
            // 画布的公共方法
            componentInterface: this.componentInterface,
            // 方法库
            testTool: this.testTool,
            // 请求
            request: this.request
        };
    },
    data() {
        // 这里存放数据
        return {};
    },
    // 生命周期 - 创建完成 ( 可以访问当前this实例 )
    created() {
        console.log(utils.userApi.getUser(), '<- 打印 xxx');
    },
    // 生命周期 - 挂载完成 ( 可以访问DOM元素 )
    mounted() {},
    beforeDestroy() {},
    destroyed() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
