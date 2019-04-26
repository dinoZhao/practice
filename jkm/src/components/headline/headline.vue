<template>
	<div class="head" @click="back"><div :class='["back", none ? "none" : ""]'><img src="../../assets/Chevron.png"/></div></div>
</template>
<script>
import { goBack } from "utils/common.js";
export default {
	name: 'headline',
	props:['headtxt',"none"],
	
	data () {
	    return {
	      
	    }
	},
	
  	created () {
  		var vm = this;
	},
	methods:{
		back:function(){
			goBack();
		}
	}
	
}
</script>
<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.head{
		width: 130px;
		height: 80px;
    	font-size: 1.5vw;
        position: fixed;
	    top: 0;
        z-index: 10;
	}
	.none{
		display: none !important;
	}
	.back{
    	line-height: 80px;
    	position: absolute;
	    top: 0;
	    left: 30px;
	}
	.back img{
		width: auto;
	    height: 40px;
	    vertical-align: middle;
	}
	.back span{
		vertical-align: middle;
	    color: #3c9bff;
	    margin-left: 10px;
	}
	.head-text{
		line-height: 80px;
    	text-align: center;
	}
</style>