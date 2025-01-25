<!--
 * @moduleName: xxx
 * @Author: Ma.yunlong
 * @Date: 2023-04-05 00:22:03
 -->
<template>
    <div class=''>
        hello  {{ title }}
        dddddd
        <test></test>
    </div>
</template>
 
<script>
import test from '../testVue/index.vue';
export default {
    name: 'xxx',
    props: [
        'title'
    ],
    components: {
        test
    },
    data() {
        // 这里存放数据
        return {};
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成 ( 可以访问当前this实例 )
    created() {},
    // 生命周期 - 挂载完成 ( 可以访问DOM元素 )
    mounted() {},
    // 方法集合
    methods: {},
    beforeDestroy() {},
    destroyed() {}
};
</script>

 
