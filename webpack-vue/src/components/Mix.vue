<template>
	<div>
		<div @click="hide">mixin</div>
	<div v-show=show>a按钮</div>
	</div>
	
</template>

<script>
	export default{
		 data () {
    return {
    	show:true,
    }
  },
		methods:{
			hide(){
				this.show=!this.show
			}
		}
	}
</script>

<style>
</style>