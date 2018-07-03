<template>
	<div>
		<!--<daix></daix>--> 
		  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/vuex">Go to vuex</router-link>
    <router-link to="/other">Go to other</router-link>
  </p>
   <router-view></router-view>
	</div>
</template>

<script>
	import Daix from "components/Daix"
	export default{
		components:{
			Daix 
		}
	}
</script>

<style>
</style>