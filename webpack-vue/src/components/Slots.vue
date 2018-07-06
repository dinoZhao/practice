<template>
<div>
	<component v-bind:is="soltson">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
<soltson >
	<div slot-scope="props">{{props.text}}</div>
</soltson>
</div>
</template>

<script>
	import soltson from './Slotchild'
	
	export default{
		data(){
			return {
			soltson:soltson	
			}
		},
		components:{
			soltson
		}
	}
</script>

<style>
</style>