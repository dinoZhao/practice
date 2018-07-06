<template>
<div>
	555
	<br />
	
<child message="hello prop" v-on:toprop="emit"></child>
<br /><br />
<input type="text" v-bind:value="something"
   v-on:input="bb" /><br />
   <!--<datainput></datainput>-->
   
   <input type="text" oninput="console.log(arguments[1])" />
</div>

</template>

<script>
	import Child from "./Prochild"
	import Datainput from "./Datainput"
	
	export default{
		data(){
			return {
				something:666
			}
		},
		components:{
			Child,
			Datainput
		},
		methods:{
			emit(a){
				console.log(a)
			},
			bb(){
				console.log(arguments[0])
				
			}
			
		}
	}
</script>

<style>
</style>