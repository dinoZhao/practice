<template>
	<div class="screeninghome">
		<headline headtxt="体检套餐" none=""></headline>
		<div class="screening-content">
			<div class="screening-sidebar">
				<div class="active">
					<span>体检套餐</span>
				</div>
				<div class="">
					<span id="">
  				快速检测
  			</span>
  			</div>
  			<div class="" @click="turnTo">
					<span id="">
  				预约记录
  			</span>
				</div>
			</div>
			<div class="middle-content">
				<div class="screening-titlebar">
				<div class="screening-titlebar-list">
						<span id="" class="active">
		公卫服务
	</span>
						<span id="">
		优选计划
	</span>
						<span id="">
		至尊计划
	</span>
					</div>
				</div>
				<div class="screening-content-item-1">
					<div class="screening-content-item-1-title">
						公卫服务
					</div>
					<div class="screening-content-item-1-panel">
						<div>
							<img src="../../../assets/healthy-condition.png" /> 健康状况评估
						</div>
						<div>
							<img src="../../../assets/body.png" /> 体格检查
						</div>
						<div>
							<img src="../../../assets/check.png" /> 辅助检查
						</div>
						<div>
							<img src="../../../assets/health-education.png" /> 健康指导
						</div>
					</div>
				</div>
				<div class="screening-content-item-2">
					<div class="screening-content-item-1-title">
						体检项目
					</div>
					<div class="screening-content-item-1-panel">
						<div>
							<img src="../../../assets/ECG.png" /> 心电
						</div>
						<div>
							<img src="../../../assets/blood-pressure.png" /> 血压
						</div>
						<div>
							<img src="../../../assets/blood-sugar.png" /> 血糖
						</div>
						<div>
							<img src="../../../assets/B-super.png" /> B超
						</div>
						<div>
							<img src="../../../assets/body.png" /> BMI
						</div>
						<div>
							<img src="../../../assets/urine-routine.png" /> 尿常规
						</div>
						<div>
							<img src="../../../assets/blood-fat.png" /> 血脂
						</div>
						<div>
							<img src="../../../assets/hemoglobin.png" /> 血红蛋白
						</div>
						<div>
							<img src="../../../assets/POCT.png" /> POCT
						</div>
						
					</div>
				</div>
				<a href="###" class="submit" @click="startDetection">开始检测</a>
			</div>

		</div>
	</div>
</template>
<script>
	import { getKnowledgeTag, cancelAttention,createMedicalRecord } from 'API/requst'
	import headline from 'components/headline/headline.vue';
	export default {
		name: 'healthyCheckupHome',
		components: {},
		data() {
			return {
				playing: true,
				bennLike: false,
				contentChange:true,
				pageChange:true,
				startTime: {
					time: ''
				},
				padcode:''
			}
		},
		methods: {
			startDetection(){
			var vm = this;
			let personId = window.location.search.split('=')[1];
			let params = {
				"personId":personId,
				"padDeviceCode":vm.padcode||sessionStorage.getItem('padcode'),
				"type":"公卫服务"
			}
			createMedicalRecord(params).then(data=>{
				console.log(data.recordId);
				sessionStorage.setItem("medicalRecordId",data.recordId)
				window.location.href="../physical/result.html?medicalRecordId="+data.recordId;
			})			
			}
		},
		components: {
			headline
		},
		created() {
			var vm =this;
			try {
				var padcode = window.android.getPadCode();
		  		vm.padcode = padcode;
			} catch(err) {
				console.log(err);
			}
		},
		mounted() {
           
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	$blueColor :#3C9BFF;
	$greyColor: #ECECEC;
	body {
		height: 100vh;
	}
	
	.home {
		color: #d43c33;
	}
	
	.screeninghome,
	.screening-content {
		height: 100%;
		overflow: hidden;
	}
	
	.middle-content {
		display: inline-block;
		height: 45vw;
		vertical-align: top;
		overflow-y: scroll;
		.screening-content-item-1,
		.screening-content-item-2 {
			
			margin-left: 50px;
			margin-bottom: 60px;
			.screening-content-item-1-title {
				color: $blueColor;
				background-color: #EBF5FF;
				font-size: 30px;
				padding: 5px 9px;
				width: 10.8%;
				height: 5.5%;
				text-align: center;
				margin: 40px 0 30px 0;
				border-radius: 25px;
			}
			.screening-content-item-1-panel {
				width: 67%;
				div {
					display: inline-block;
					width: 13.9%;
					text-align: center;
					font-size: 19px;
					margin-bottom: 55px;
					img {
						display: block;
						margin: 5px auto;
					}
				}
			}
		}
	}
	
	.screening-titlebar {
		width: 17.7rem;
		/*height: 9.4%;*/
		border-top: solid 1px $greyColor;
		/*border-bottom: solid 1px $greyColor;*/
		vertical-align: top;
		display: inline-block;
		position: relative;
		margin-top: 80px;
	}
	
	.screening-sidebar {
		width: 1.4rem;
		height: 45vw;
		border-right: solid 1px $greyColor;
		border-bottom: solid 1px $greyColor;
		display: inline-block;
		position: relative;
		top: 80px;
		div {
			width: 100%;
			height: 33.3%;
			font-size: 30px;
			color: $blueColor;
			position: relative;
			span {
				display: block;
				width: 29px;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		.active {
			background-color: $blueColor;
			color: white;
		}
	}
	
	.screening-titlebar-list {
		height: 100%;
		padding-left: 50px;
		border-bottom: solid 1px $greyColor;
		span {
			font-size: 30px;
			display: inline-block;
			padding: 15px 35px;
			padding-top: 4.3vh;
		}
		.active {
			color: $blueColor;
			border-bottom: solid 3px $blueColor;
		}
	}
	.submit{
		display: block;
		margin: 0 auto;
		width: 26vw;
		height: 11.7vh;
		text-align: center;
		font-size: 40px;
		line-height: 11.7vh;
		color: white;
		background-color: #3C9BFF;
		border-radius: 15px;
	}
</style>