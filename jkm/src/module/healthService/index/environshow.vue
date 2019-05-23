<template>
	<div class="environedit">
		<div class="title">生活环境</div>
		<div class="content">
			<div class="item">
					<div>厨房排风设施</div>
					<span>{{kitchenExhaust}}</span>
		   </div>
		   <div class="item">
					<div>燃料类型</div>
					<span>{{fuelType}}</span>
		   </div>
		   <div class="item">
					<div>饮水</div>
					<span>{{waterType}}</span>
		   </div>
		   <div class="item">
					<div>厕所</div>
					<span>{{toiletType}}</span>
		   </div> 
		   <div class="item">
					<div>禽畜栏</div>
					<span>{{poultryPen}}</span>
		   </div>
		</div>
	</div>
</template>

<script>
	import vue from 'Vue'
	import { queryPersonalRecord } from 'API/requst'
	export default {
		data() {
			return {
			kitchenExhaust:'',
			fuelType:'',
			waterType:'',
			toiletType:'',
			poultryPen:'',
			personDocumentId:'',
			personUniqueId:''
			}
		},
		components: {},
		props: ["records"],
		inject: ['updaterecord', 'queryrecord'],
		activated() {
			this.queryrecord()
           
		},
		watch: {
			records: {
				handler(cur, pre) {
					
					var self = this
					this.personUniqueId = cur.personUniqueId;
					this.personDocumentId = cur.personDocumentId;
					cur=cur.medicalAdditionalInfo.livingEnvironment
					this.kitchenExhaust=cur.kitchenExhaust
				    this.fuelType=cur.fuelType
				    this.waterType=cur.waterType
				    this.toiletType=cur.toiletType
				    this.poultryPen=cur.poultryPen
				
				},
				deep: true
			}
		},
	}
</script>

<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.environedit {
		width: 100%;
		padding: 0.4rem;
		font-size: 0.3rem;
		height: calc(100% - 0.95rem);
		overflow: scroll;
		&>.title {
			width: 1.7rem;
			line-height: 0.5rem;
			background: rgba(60, 155, 255, 0.10);
			border-radius: 0.33rem;
			color: #3C9BFF;
			text-align: center;
		}
		.content{
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.2rem;
			&>.item {
					display: inline-flex;
					width: 50%;
					justify-content: flex-start;
					margin-bottom: 0.2rem;
					&>div {
						width: 12vw;
						text-align: right;
						margin-right: 0.2rem;
						line-height: 0.6rem;
						color: #666;
					}
					
					&>span{
						display: inline-block;
						line-height: 0.6rem;
						color: #000;
					}
				}
		}
	}
	
</style>