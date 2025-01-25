<!--
 * @moduleName: Button 组件继承
 * @Author: Ma.yunlong
 * @Date: 2023-04-23 14:06:12
 -->
<template>
    <button
        class="el-button"
        @click="handleClick"
        :disabled="buttonDisabled || loading"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
            type ? 'el-button--' + type : '',
            buttonSize ? 'el-button--' + buttonSize : '',
            {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle
            }
        ]"
    >
        <i class="el-icon-loading" v-if="loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>
 
<script>
import { Button } from 'element-ui';
export default {
    extends: Button,
    name: 'el-button',
    data() {
        return {};
    },
    created() {},
    methods: {
        /**
         * @description: 按钮被点击了
         * @author: M.yunlong
         * @date: 2023-04-23 14:08:36
        */
        handleClick(evt) {
            console.log(evt, '<- 按钮被点击了, 全局拦截');
            // xxx
            this.$emit('click', evt);
        }
    },
    beforeDestroy() {},
    destroyed() {}
};
</script>
