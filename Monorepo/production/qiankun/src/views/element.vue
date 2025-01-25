<!--
 * @moduleName: Element 测试
 * @Author: Ma.yunlong
 * @Date: 2023-04-23 09:48:01
 -->
<template>
    <div class='element-test'>
        <!-- 分割线 -->
        <el-divider content-position="left">
            功能测试
        </el-divider>
        <div>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </div>
        <!-- 分割线 -->
        <el-divider content-position="left">
            样式复写测试
        </el-divider>
        <div>
            <el-button>文字颜色</el-button>
        </div>
        <!-- 分割线 -->
        <el-divider content-position="left">
            方法复写测试
        </el-divider>
        <div>
            <el-upload
                ref="upload"
                class="upload-wrap"
                :multiple="false"
                :action="uploadAction"
                :on-change="uploadChangeFun"
                :on-remove="uploadRemoveFun"
            >
                <el-input readonly v-model="uploadText"></el-input>
                <div slot="tip" class="el-upload__tip">
                    提示：只能上传*.xls,*.xlsx格式的文件
                </div>
            </el-upload>
        </div>
        <!-- 分割线 -->
        <el-divider content-position="left">
            组件继承复写
        </el-divider>
        <div>
            <el-button>继承的button</el-button>
        </div>
    </div>
</template>
 
<script>
export default {
    name: 'xxx',
    components: {},
    data() {
        // 这里存放数据
        return {
            // url
            uploadAction: 'xxx',
            // 文件名字
            uploadText: '',
        };
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
    methods: {
        onProgress(event, file, fileList) {
            this.uploadLoading = true;
        },
        // 添加文件，上传，失败 change
        uploadChangeFun(e, fileList) {
            if (e.status === 'success') {
                // todo
            } else {
                this.uploadText = e.name;
            }
        },
        // 文件移除
        uploadRemoveFun() {
            this.uploadText = '';
        }
    },
    beforeDestroy() {},
    destroyed() {}
};
</script>
