<template>
	<div>
		<div>child</div>
		<router-link to="/child/foo">Go to foo</router-link>
    <router-link to="/child/bar">Go to bar</router-link>
		<router-view></router-view>
	</div>
	 
</template>

<script>
	export default{
  myOption: '我的孩子',
	
	}
</script>

<style>
</style>