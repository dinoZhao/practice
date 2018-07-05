<template>
<div>
	555
	<br />
	
<child message="hello prop" v-on:toprop="emit"></child>
</div>

</template>

<script>
	import Child from "./Prochild"
	export default{
		components:{
			Child
		},
		methods:{
			emit(a){
				console.log(a)
			}
		}
	}
</script>

<style>
</style>