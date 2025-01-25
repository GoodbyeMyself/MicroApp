<template>
    <div class="login">
        <div class="login-form">
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                @keyup.native.enter="login('loginForm')"
            >
                <el-form-item label="账号" prop="name">
					<el-input v-model="loginForm.name" auto-complete="off" placeholder="请输入账号: admin" maxlength="50" key="loginFormname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
                        type='password'
                        v-model="loginForm.password"
                        auto-complete="off"
                        placeholder="请输入密码: 123456"
                        maxlength="20"
                        key="loginFormpassword"
                    ></el-input>
				</el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="checked"></el-checkbox>
                    阅读并同意 《隐私声明》和《字体版权声明》
                </el-form-item>
                <div class="goRegister">
					<span class="fr" style="margin-left: 20px;color: #bbb">找回密码</span>
					<span class="fr">没有账号，去注册? </span>
				</div>
            </el-form>
        </div>
        <div class="login-button">
            <el-button type="primary" @click="login()">登录</el-button>
        </div>
    </div>
</template>

<script>
// vuex
import * as storeStatic from 'store@/storeStatic.js';
import { mapActions } from 'vuex';
export default {
    name: 'login',
    data() {
        return {
            loading: false,
            // from
            loginForm: {
				name: '',
				password: ''
			},
            loginRules: {
				name: [
					{ required: true, message: '账号不可以为空', trigger: ['blur', 'change'] }
				],
				password: [
					{ required: true, message: '密码不可以为空', trigger: ['blur', 'change'] }
				]
			},
            checked: false
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
    created() {},
    methods: {
        ...mapActions([
            // 公共请求
            storeStatic.A_ACTION_COMMON
        ]),
        // 登录
        login() {
            // this[storeStatic.A_ACTION_COMMON]({
            //     url: 'testAxios',
            //     data: {
            //         id: 'xxx'
            //     },
            //     method: 'post'
            // }).then(res => {
            //     // xxx
            //     console.log(res, '<- 打印 axios res');
            //     // qiankun
            //     if (this.POWERED_BY_QIANKUN) {
            //         // 进去 主应用
            //         this.backLayout();
            //     } else {
            //         // 独立运行
            //         console.log('enter', '<- 独立运行');
            //     }
            // });
            // qiankun
            if (this.POWERED_BY_QIANKUN) {
                // 进去 主应用
                this.backLayout();
            } else {
                // 独立运行
                console.log('enter', '<- 独立运行');
            }
        },
        /**
         * @description: 返回主应用
         * @author: M.yunlong
         * @date: 2023-04-24 21:51:26
        */
        backLayout() {
            // 获取 url
            let url = this.$route.query.return_url || '/';
            /**
             * 该方法接受3个参数
             * - state: histroy.state 这个属性，如果你不做任何标识可以传null
             * - title: 浏览器标题(现在都不支持，所以都传空字符串''，你可以通过document.title = 'xxxx'去修改)
             * - url: 当前要修改的url,新的URL可以是任何和当前URL同源的URL     ps: '/xxxx'
             * 该方法会让histroy.length 加一
            */
            window.history.pushState(null, '', url);
        }
    }
}
</script>
