<template>
	<div class="temperature">
		<headLine/>
		<header>请输入体温数据</header>
		<div id="panel" class="panel">
			<div class="input-item-box">
				<div class="input-item">
					<span id="">
				血氧饱和度
			</span>
					<input type="text" name="" id="" value="" placeholder="请输入" @input="inputbloodO2" /><span class="unit">%</span>
				</div>
				<div class="input-item">
					<span id="">
				脉率
			</span>
					<input type="text" name="" id="" value="" placeholder="请输入" @input="inputRate" /><span class="unit">BPM</span>
				</div>
				<div class="save-button" @click="save">
					保存
				</div>
			</div>

		</div>
	</div>

</template>

<script>
	import headLine from "components/headline/headline.vue";
	import { savePhysicalExamData} from 'API/requst'
	import util from 'utils/util';
	export default {

		name: 'Spo2',
		components: {
			headLine
		},
		data() {
			return {
				bloodO2: '',
				inputbloodRate:''
			}
		},
		methods: {
			showToast(value){
				let vm = this;
				var standard = /^\+?[1-9][0-9]*$/;
				console.log(standard.test(value));
				if(standard.test(value)){
					return true
				}
				else{					
					vm.showtoast('请填入数字');
					return false
				}
			},	
			inputbloodO2(e) {
				let vm = this;
				if(vm.showToast(e.target.value)){
				vm.bloodO2 = e.target.value;
				}
				console.log(e.target.value);
				
			},
			inputRate(e) {
				let vm = this;
				if(vm.showToast(e.target.value)){
				vm.inputbloodRate = e.target.value;	
				}
				console.log(e.target.value);
				
			},
			save() {
				let vm = this;
				if(!(vm.bloodO2!=''||vm.inputbloodRate!='')){
					vm.showtoast('表单填写不全');
					return false	
				}
				let exams1 = {
					recordTime:new Date().getTime(),
					type:'ibs',
					value:vm.bloodO2,
					unit:'%',
					condition:''
				}
				let exams2 = {
					recordTime:new Date().getTime(),
					type:'rate',
					value:vm.inputRate,
					unit:'BMP',
					condition:''
				}
				let arr=[];
				arr.push(exams1);
				arr.push(exams2);
           	let params={
		   timeStamp:new Date().getTime(),
		   deviceId:'',
		   idNumber:'',
		   hospital:'FuCongKJXZ',
		   exams:arr,
		   medicalRecordFolderId:1259044016	
	}
		savePhysicalExamData(params).then(data=>{
		console.log(data);
		})
			}
		},
		created() {
			var vm = this;
		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" type="text/css">
	.temperature {
		width: 100%;
		height: 100%;
	}
	
	header {
		height: 80px;
		line-height: 80px;
		font-family: PingFangSC-Medium;
		font-size: 0.4rem;
		color: #333333;
		letter-spacing: 0;
		text-align: center;
	}
	
	input {
		outline-color: invert;
		outline-style: none;
		outline-width: 0px;
		border: none;
		border-style: none;
		text-shadow: none;
		-webkit-appearance: none;
		-webkit-user-select: text;
		outline-color: transparent;
		box-shadow: none;
	}
	
	.panel {
		width: 83vw;
		height: 40vw;
		box-shadow: 0px 0px 15px 6px #f3f8fd;
		margin: 0 auto;
		position: relative;
		background: url(../../../assets/oxygen1.png);
		background-size: 24%;
		background-repeat: no-repeat;
		background-position: 103% 24.7vw;
		.input-item-box {
			width: 27.7vw;
			text-align: right;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.input-item {
			position: relative;
			margin: 0.28rem 0;
			span {
				vertical-align: middle;
			}
			input {
				border: solid 1px #666666;
				border-radius: 0.1rem;
				padding: 0.22rem 0.15rem;
				vertical-align: middle;
			}
			.unit {
				position: absolute;
				top: 0.23rem;
				left: 4.08rem;
				color: #666666;
				display: inline-block;
				width: 1.1rem;
				text-align: right;
			}
		}
		.save-button {
			width: 19.5vw;
			height: 5vw;
			display: block;
			margin-top: 1.8rem;
			text-align: center;
			font-size: 0.26rem;
			line-height: 5vw;
			color: white;
			background-color: #3C9BFF;
			border-radius: 5px;
			float: right;
		}
	}
</style>