<template>
	<div class="wrapper">
		<div class="inner">
				<span>Copyright © 2015 富聪金融版权所有  沪ICP备15047019号-1</span>
		<span>客服电话：400-620-6188     客服邮箱：fc_service@fc18.com.cn</span>	
		</div>

	</div>
</template>

<script>
	export default {
  name: 'Footer',
  data () {
    return {
    	num:555,
    	isonline:false
    }
  },
  created:function(){
  },
  mounted:function(){
  	
  },
  computed:{
  	classObject:function(){
  		return{
  		}
  	}
  }
  
}
</script>

<style scoped  lang="scss" >
.wrapper{
	height: 94px;
	display: table;
	width: 100%;
	position: absolute;
	font-size: 14px;
	bottom: 0;
	.inner{
		display: table-cell;
		vertical-align: middle;
		span{
			display: block;
			text-align: center;
		}
	}
}

</style>