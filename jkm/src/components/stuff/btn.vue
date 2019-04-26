<template>
<div id="">
	{{fragment}}
</div>
</template>

<script>
	export default {
	name: 'btn',

	//modified by sxx
	//增加disabled 去掉margin
	props:['fragment'],
	
  data () {
    return {
      
    }
	},
	
  created () {
  	
	}
	
}
</script>

<style scoped="scoped">
	div{
		background: #3C9BFF;
		color: #fff;
		text-align: center;
		width: 26%;
		text-align: center;
		font-size: 0.48rem;
		/*height: 1.4rem;*/
		line-height: 1rem;
		border-radius: 12px;
	}
</style>