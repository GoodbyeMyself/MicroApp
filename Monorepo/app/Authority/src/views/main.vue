<!--
 * @moduleName: 基础平台 - 入口
 * @Author: Ma.yunlong
 * @Date: 2023-04-25 09：39
 -->
 <template>
    <div class="authority-main">
        <div class="Welcome">Welcome</div>
		<div class="Product">欢迎探索 M.Y.L Demo 工程...</div>
        <!-- 容器 -->
        <div class="authority-main-content">
            <!-- 登录 -->
            <template v-if="routerName === 'login'">
                <Login></Login>
            </template>
            <!-- 注册 -->
            <template v-else>
                <Register></Register>
            </template>
        </div>
        <!-- 海浪容器 -->
        <div id='seaScreen'></div>
    </div>
</template>

<script>
// 动效
import { seaWave } from '@/javascript/seaWave.js';
// components
import Login from '@/components/login.vue';
import Register from '@/components/register.vue';
export default {
    name: 'authority-main',
    components: {
        Login,
        Register
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        routerName() {
            return this.$route.name
        },
        routerInfo() {
            return this.$route
        }
    },
    watch: {
        /**
         * @description: 监听 路由变化
        */
        routerName(val) {
            console.log(val, '<- 路由');
        }
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            seaWave();
        });
    },
    methods: {}
}
</script>
