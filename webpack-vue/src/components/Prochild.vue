<template>
	<div>
		prochild<br />
		<div @click="emit">{{message}}</div>
	</div>
</template>

<script>
	export default{
		props:["message"],
		methods:{
			emit(){
				console.log(44444444)
				 this.$emit('toprop',"家属")
			}
		}
		
	}
</script>

<style>
</style>