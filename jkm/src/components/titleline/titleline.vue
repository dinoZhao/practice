<template>
	<div class="titleline">{{headtxt}}</div>
</template>
<script>
import { goBack } from "utils/common.js";
export default {
	name: 'titleline',

	//modified by sxx
	//增加disabled 去掉margin
	props:['headtxt'],
	
  data () {
    return {
      
    }
	},
	
  created () {
	},
	methods:{
		
	}
	
}
</script>
<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.titleline{
		width: 100%;
		height: 80px;
		font-size: 1.5vw;
    position: fixed;
    top: 0;
    z-index: 9;
    text-align: center;
    line-height: 80px;
    background: #fff;
	}
	
</style>