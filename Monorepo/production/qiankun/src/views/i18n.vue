<!--
 * @moduleName: 国际化 测试
 * @Author: Ma.yunlong
 * @Date: 2023-04-24 15:09:55
 -->
<template>
    <div class='i18n-content'>
        <!-- 分割线 -->
        <el-divider content-position="left">
            基础文案 测试
        </el-divider>
        <!-- 测试 多语种 -->
        <span>
            {{ $t('welcome') }}
        </span>
        <!-- 分割线 -->
        <el-divider content-position="left">
            element 测试
        </el-divider>
        <el-date-picker
            v-model="value"
            type="date"
        >
        </el-date-picker>
    </div>
</template>
 
<script>
export default {
    name: 'xxx',
    data() {
        return {
            value: ''
        };
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
};
</script>
