<template>
	<div class="querybtn" v-if="btnshow" @click="transit">查看历史记录</div>
</template>

<script>
	export default{
		data(){return{
			btnshow:false
		}
		},
		methods:{
			transit(){
				var tablist=this.$parent.$parent.tablist;
				var personId=this.$parent.$parent.personId;
				var status=this.$parent.$parent.status.join('');
				var index=tablist.indexOf(true)
				location.href='../healthrecord/historyRecord.html?rapidindex='+index+'&personId='+personId+'&status='+status
			}
			
		},
		created(){
			if(this.$parent.$parent.rapidchannel){
				this.btnshow=true
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.querybtn{
	font-size: 0.3rem;
	color: #3C9BFF;
	line-height: 0.9rem;
	margin-bottom: 0.6rem;
    margin-top: 0.3rem;
    display: inline-block;
    float: right;
    margin-right: 0.7rem;
    text-decoration: underline;
}
</style>