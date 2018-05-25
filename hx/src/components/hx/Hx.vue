<template>
	<div style="height: 100%;width: 100%;">
		<div class="header">
			<img src="../../assets/images/logo.png" alt="" />

			<div class="nav">
				<router-link tag="span" to="/hx">首页</router-link>
				<router-link tag="span" to="/hx/detail">订单详情</router-link>
				<router-link tag="span" to="/hx/deposit">保证金</router-link>
				<span style="cursor: default;">{{name}} (嗨学用户)</span>
				<span @click="logout">退出</span>
			</div>
		</div>
		<keep-alive>
			<router-view class="view"></router-view>
		</keep-alive>

	</div>
</template>

<script>
	import API from '../../api/api'
	export default {
		data() {
			return {
				name: JSON.parse(localStorage.getItem('profile')).realName

			}
		},
	 created(){
	 	console.log(5)
	 },
	 methods:{
	 	logout:function(){
	 			API.logout().then(data=>{
   		localStorage.clear();
   		this.$router.push("/")
   		
   	})
	 	}
	 }


	}
</script>

<style lang="scss" scoped="scoped">
	.header {
		width: 1100px;
		margin: 0 auto;
		height: 80px;
		img {
			vertical-align: middle;
		}
		.nav {
			float: right;
			height: 80px;
			font-size: 16px;
			span {
				height: 20px;
				display: inline-block;
				border-right: 1px solid #999;
				text-align: center;
				width: 140px;
				cursor: pointer;
			}
			span:last-child {
				border-right: none;
			}
			.router-link-exact-active {
				color: #D43C33;
			}
		}
		.nav:after {
			display: inline-block;
			height: 100%;
			width: 0;
			vertical-align: middle;
			content: "";
		}
	}
	
	.header:after {
		display: inline-block;
		height: 100%;
		width: 0;
		vertical-align: middle;
		content: "";
	}
	
	.hello {
		/*height: calc(100% - 174px);*/
	}
</style>