<template>
    <div class="home">
        ss
        <testComponent></testComponent>
    </div>
</template>

<script>
// 组件
// import testComponent from 'libase/testComponent';
// 异步加载
import { loadRemoteComponent } from '@/loadRemote.js'
export default {
    name: 'HomeView',
    components: {
        // testComponent,
        // 动态加载
        testComponent: (async () => {
            const libase = await loadRemoteComponent({
                url: 'http://192.168.3.6:5000/remoteEntry.js',
                scope: 'libase',
                module: './testComponent'
            })
            return libase
        })
    },
    created() {}
}
</script>
