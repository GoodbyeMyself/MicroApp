<!--
 * @moduleName: 国际化
 * @Author: Ma.yunlong
 * @Date: 2023-04-23 09:53:36
 -->
<template>
    <div class="Error">
        <el-empty description="主应用 - 你的页面走丢了"></el-empty>
        <div class="tlc">
            <el-button type="primary" @click="backMain()">
                返回- 主应用 -主页
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error',
    data() {
        return {
            loading: false
        };
    },
    methods: {
        // 登录
        backMain() {
            this.$router.push({
                name: 'home'
            });
        }
    }
}
</script>
