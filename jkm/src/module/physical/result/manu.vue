<template>
	<div class="manu" @click="type==0?next(manu,2):next(manu,0)">{{text}}</div>
</template>

<script>
	export default{
		//manu代表当前是第几页，0开始，type决定文本显示和跳转，0手动导向
		props:['manu',"type"],
		inject:['next'],
		data(){
			return{
				text:''
			}
		},
		computed:{
			
		},
		created(){
			//如果是去手动
			if(this.type===0){
			  this.text='手动输入'	
			}else if(this.type===1){
				this.text='自动采集'
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
     $lan:#3C9BFF;
	.manu{
		width: 2.3rem;
		line-height:0.9rem ;
		color: $lan;
		border: 0.02rem solid $lan;
		border-radius: 0.12rem;
		text-align: center;
		margin-right: 0.5rem;
		flex-shrink: 0;
	}
</style>