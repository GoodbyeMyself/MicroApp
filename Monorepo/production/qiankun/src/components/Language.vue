<!--
 * @moduleName: 国际化
 * @Author: Ma.yunlong
 * @Date: 2023-04-23 09:53:36
 -->
<template>
	<div class="language">
		<el-dropdown @command="handleCommand">
			<span class="el-dropdown-link">
				<el-button size="mini">{{ lang }}</el-button>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="zh">中文</el-dropdown-item>
				<el-dropdown-item command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
// utils
import { storage } from 'javascript@/utils';
export default {
	name: 'Language',
	data () {
		return {
			lang: '中文'
		};
	},
	created () {
		// 文案更新
		this.updatelang();
	},
	methods: {
		/**
		 * @description: 切换 国际化
		 * @author: M.yunlong
		 * @date: 2023-04-24 15:45:56
		*/
		handleCommand (command) {
			this.$i18n.locale = command;
			// 更新 值
			storage.set('language', command);
			// 更新 文案
			this.updatelang();
		},
		/**
		 * @description: 更新语言标识
		 * @author: M.yunlong
		 * @date: 2023-04-24 16:37:23
		*/
		updatelang () {
			// 获取值
			let language = storage.get('language');
			// 切换
			switch (language) {
				case 'zh':
					this.lang = '中文';
					break;
				case 'en':
					this.lang = 'English';
					break;
				case 'kor':
					this.lang = '한국어';
					break;
				default:
					this.lang = '中文';
			}
		}
	}
};
</script>

<style lang="less" scoped>
.language {
   height: auto;
   cursor: pointer;
}
</style>
