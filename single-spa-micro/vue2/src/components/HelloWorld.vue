<template>
    <div class="hello">
        来自 Vue-2
        <h1>{{ msg }}</h1>
        <h3>Installed CLI Plugins</h3>
        <h3>Essential Links</h3>
        <h3>Ecosystem</h3>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    created() {
        console.log('我是子应用2 打印的内容');
    }
};
</script>
