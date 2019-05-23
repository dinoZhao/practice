<template>
	<div class="temperature">
		<headLine/>
		<header>请输入体温数据</header>
		<div id="panel" class="panel">
			<div class="input-item-box">
				<div class="input-item">
					<span id="">
				收缩压
			</span>
					<input type="text" name="" id="" value="" placeholder="请输入" @input="inputshrink" /><span class="unit">mmHg</span>
				</div>
				<div class="input-item">
					<span id="">
				舒张压
			</span>
					<input type="text" name="" id="" value="" placeholder="请输入" @input="inputdiastole" /><span class="unit">mmHg</span>
				</div>
				<div class="input-item">
					<span id="">
				平均压
			</span>
					<input type="text" name="" id="" value="" placeholder="请输入" @input="inputaverage" /><span class="unit">mmHg</span>
				</div>
				<div class="input-item">
					<span id="">
				脉率
			</span>
					<input type="text" name="" id="" value="" placeholder="请输入" @input="inputpulse" /><span class="unit">  BPM </span>
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
	import { savePhysicalExamData } from 'API/requst'
	import util from 'utils/util';
	export default {

		name: 'bloodPressure',
		components: {
			headLine
		},
		data() {
			return {
				shrinkPressure: '',
				diastole: '',
				average: '',
				pulse: ''
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
			inputshrink(e) {
				let vm = this;
				if(vm.showToast(e.target.value)){
					vm.shrinkPressure = e.target.value
				}
				
			},

			inputdiastole(e) {
				let vm = this;
				if(vm.showToast(e.target.value)){
				vm.diastole = e.target.value	
				}
				
				
			},

			inputaverage(e) {				
				let vm = this;
				if(vm.showToast(e.target.value)){
				vm.average = e.target.value	
				}
				
			},

			inputpulse(e) {
				let vm = this;
				if(vm.showToast(e.target.value)){
				vm.pulse = e.target.value
				}
				
			},
			save() {
				let vm = this;
				console.log(vm.current_food_status);
				if(!(vm.pulse!=''||vm.average!=''||vm.diastole!=''||vm.shrinkPressure!='')){
					vm.showtoast('表单填写不全');
					return false	
				}
				let exams1 = {
					recordTime: new Date().getTime(),
					type: 'sysBloodPressure',
					value: vm.shrinkPressure,
					unit: 'mmHg',
					condition: ''
				}
				let exams2 = {
					recordTime: new Date().getTime(),
					type: 'diaBloodPressure',
					value: vm.diastole,
					unit: 'mmHg',
					condition: ''
				}
				let exams3 = {
					recordTime: new Date().getTime(),
					type: 'averBloodPressure',
					value: vm.average,
					unit: 'mmHg',
					condition: ''
				}
				let exams4 = {
					recordTime: new Date().getTime(),
					type: 'lbs',
					value: vm.pulse,
					unit: 'BPM',
					condition: ''
				}
				let arr = [];
				arr.push(exams1);
				arr.push(exams2);
				arr.push(exams3);
				arr.push(exams4);
				let params = {
					timeStamp: new Date().getTime(),
					deviceId: '',
					idNumber: '',
					hospital: sessionStorage.getItem("hospitalCode"),
					exams: arr,
					medicalRecordFolderId: 1259044016
				}
				savePhysicalExamData(params).then(data => {
					console.log(data)
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
		background: url(../../../assets/pressure1.png);
		background-size: 18%;
		background-repeat: no-repeat;
		background-position: 101% 21vw;
		.input-item-box {
			width: 27vw;
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
				top: 0.19rem;
				left: 3.9rem;
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
			margin-top: 0.5rem;
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