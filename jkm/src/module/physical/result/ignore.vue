<template>
	<div @click="ignore" class="ignore" v-if="!unrapid">跳过</div>
</template>

<script>
	
	export default{
		data(){
			return{
				unrapid:false
			}
		},
		inject: ["tab"],
		props:['preindex'],
		methods:{
			ignore(e){
				var list=["心电", "血压", "血氧", "血糖", "体温", 'BMI','尿常规','血脂']
				this.tab(list[this.preindex+1],this.preindex)
			}
		},
		created(){
			if(this.$parent.$parent.rapidchannel){
				this.unrapid=true
			}
			
		},
		mounted(){
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.ignore{
			font-size: 0.4rem;
            color: #3C9BFF;
            position: absolute;
            top: 0.3rem;
            right: 0.7rem;
            border-bottom: 0.02rem solid #3C9BFF;
            z-index: 5;
		}
</style>