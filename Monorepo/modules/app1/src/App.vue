<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// 事件总线
import { messageCenterEvents } from 'javascript@/messageCenter/index.js';

export default {
	name: 'App',
	components: {
		HelloWorld
	},
	data() {
		return {
			tempEventsListener: null
		}
	},
	created() {
		console.log('我是子应用 app-1', '<- 打印 xxx');
	},
	mounted() {
		// 消息总线
		this.tempEventsListener = messageCenterEvents.subscribe(data => {
			console.log(data, '<- 打印 app1 接到的消息');
		});
	},
	destroyed() {
		// 取消订阅
		this.tempEventsListener.unsubscribe();
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
