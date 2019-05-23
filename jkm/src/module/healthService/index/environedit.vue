<template>
	<div class="environedit">
		<div class="title">生活环境</div>
		<div class="content">
			<div class="item">
					<div>厨房排风设施</div>
					<select v-model="kitchenExhaust" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="无">无</option>
						<option value="油烟机">油烟机</option>
						<option value="换气扇">换气扇</option>
						<option value="烟囱">烟囱</option>
					</select>
		   </div>
		   <div class="item">
					<div>燃料类型</div>
					<select v-model="fuelType" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="液化气">液化气</option>
						<option value="煤">煤</option>
						<option value="天然气">天然气</option>
						<option value="沼气">沼气</option>
						<option value="柴火">柴火</option>
						<option value="其他">其他</option>
						
					</select>
		   </div>
		   <div class="item">
					<div>饮水</div>
					<select v-model="waterType" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="自来水">自来水</option>
						<option value="经净化过滤的水">经净化过滤的水</option>
						<option value="井水">井水</option>
						<option value="河湖水">河湖水</option>
						<option value="塘水">塘水</option>
						<option value="其他">其他</option>
					</select>
		   </div>
		   <div class="item">
					<div>厕所</div>
					<select v-model="toiletType" name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="卫生厕所">卫生厕所</option>
						<option value="一格或二格粪池式">一格或二格粪池式</option>
						<option value="马桶">马桶</option>
						<option value="露天粪坑">露天粪坑</option>
						<option value="简易棚厕">简易棚厕</option>
					</select>
		   </div> 
		   <div class="item">
					<div>禽畜栏</div>
					<select v-model="poultryPen"  name="">
						<option value="" disabled="disabled">请选择</option>
						<option value="无">无</option>
						<option value="单设">单设</option>
						<option value="室内">室内</option>
						<option value="室外">室外</option>
					</select>
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
				records:{},
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
		inject: ['updaterecord'],
		methods: {
			queryrecord() {
				var self = this;
				queryPersonalRecord({
					personId: sessionStorage.getItem('personId')
				}).then(function(res) {
					self.records = res.result
				})
			},
			
			update(){
				var self = this;
				var info = {
					medicalAdditionalInfo: {
						livingEnvironment: {
							
						},
					}
				}
				var livingEnvironment=info.medicalAdditionalInfo.livingEnvironment
				livingEnvironment.kitchenExhaust=this.kitchenExhaust
				livingEnvironment.fuelType=this.fuelType
				livingEnvironment.waterType=this.waterType
				livingEnvironment.toiletType=this.toiletType
				livingEnvironment.poultryPen=this.poultryPen
				info.personUniqueId = this.personUniqueId
				info.personDocumentId = this.personDocumentId
			
			this.updaterecord({
					personalRecord: info,
					personId: sessionStorage.getItem('personId')
				})
			}
		},
		watch:{
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
			},
		},
		created() {
			this.queryrecord()
		}
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
					margin-bottom: 0.2rem;
					&>div {
						width: 12vw;
						text-align: right;
						margin-right: 0.2rem;
						line-height: 0.6rem;
					}
					input,
					select {
						border: 1px solid #666666;
						border-radius: 0.12rem;
						padding-left: 0.1rem;
						font-size: 0.3rem;
						background: #fff;
					}
				}
		}
	}
	
</style>