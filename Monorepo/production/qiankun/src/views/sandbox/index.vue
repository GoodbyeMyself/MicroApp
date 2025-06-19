<template>
    <div class="sandbox">
        <!-- 分割线 -->
        <el-divider content-position="left">
            基础测试
        </el-divider>
        <!-- 插件-1 -->
        <SandBoxContainer></SandBoxContainer>
        <!-- 插件-2 -->
        <!-- <PluginBoxContainer></PluginBoxContainer> -->
    </div>
</template>

<script>
// 插件 - 1
import SandBoxContainer from './app/sandBoxContainer.vue';
// 插件 - 2
// import PluginBoxContainer from './app/pluginBoxContainer.vue';
export default {
    name: 'sandbox',
    components: {
        SandBoxContainer
        // PluginBoxContainer
    },
    data() {
        // 这里存放数据
        return {
            loading: false
        };
    },
    mounted() {},
    methods: {}
}
</script>
