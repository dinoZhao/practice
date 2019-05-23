<template>
		<div id="coat">
		<div class="main">
			<!-- <div class="histitle">家族史</div> -->
			<div class="detail">
			<div class="item">
				<div> </div>
				<div>父亲</div>
				<div>母亲</div>
				<div>兄弟姐妹</div>
				<div>子女</div>
			</div>	
			<div class="item"  v-for="(item,index) in familyHistory">
				<div>{{item.name}}</div>
				<div v-for="(coreitem,coreindex) in item.value">
					<img  :data-relation=coreindex :data-line=index v-if="coreitem.status==='false'" src="../../assets/notyet.png"/>
					<img   v-else  :data-relation=coreindex :data-line=index  src="../../assets/already.png"/>					
				</div>								
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vue from 'Vue'
	export default {
		props:['familyHistory'],
		name: 'sibhis',
		components: {
		},
		data() {
			return {
				troublelist:['高血压','糖尿病','冠心病','慢阻肺','恶性肿瘤','脑卒中'],
				status: true,
			}
		},
		methods: {

		},
		created() {
			var arr=[];
			for(var i=0;i<this.troublelist.length;i++){
				arr.push({
					name:this.troublelist[i],
					value:[false,false,false,false]
				})
			}
			this.troublelist.splice(0,6,...arr)
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	#coat {
		height: 30vw;
		overflow-y: scroll;
	}
	
	.main {
		display: flex;
		margin-top: 0.6vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		.histitle {
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.2rem;
			width: 100%;
			height: 1em;
		}
		.detail{
			position: relative;
			.item{
				display: flex;
				line-height: 0.76rem;
				border-bottom: 1px solid #eee;
				&>div{
					width: 12vw;
					text-align: center;
				}
				img{
					width: 0.45rem;
					height: 0.45rem;
					vertical-align: middle;
				}
			}
		}
		
	}
	
	.next {
		margin-left: 37%;
		position: absolute;
		bottom: 0.6rem;
	}
	
	.manu {
		width: 2.28rem;
		height: 0.8rem;
		font-size: 0.32rem;
		border: 3px solid #FC9452;
		border-radius: 6px;
		text-align: center;
		line-height: 0.8rem;
		color: #FC9452;
		position: absolute;
		right: 0.8rem;
		bottom: 0.6rem;
	}
</style>