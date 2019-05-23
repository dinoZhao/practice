<template>
	<div class="temperature">
		<!--<headLine/>-->
		<header>请输入血氧数据 <ignore class='ignore' :preindex="2"></ignore></header>
		<div id="panel" class="panel">
			<div class="input-item-box">
			<div class="input-item">
			<span id="">
			血氧饱和度
			</span>
			<input type="number" value="" placeholder="请输入" @input="inputbloodO2" /><span class="unit">%</span>
			</div>
			<div class="input-item">
			<span id="">
			脉率
			</span>
			<input type="number" value="" placeholder="请输入" @input="inputRate" /><span class="unit">BPM</span>
			</div>				
			</div>
		</div>
		<div class="control-bottom" v-show='showFooter'>
		<manu  :type='1' :manu='2'></manu>
		<div class="save-button cliect" @click="save">保存</div>
		</div>
	</div>

</template>

<script>
	import headLine from "components/headline/headline.vue";
	import ignore from './ignore.vue'
	import manu from './manu.vue'
	import {savePhysicalExamData} from 'API/requst'
	import util from 'utils/util';
	export default {
		props:{'personId':{},'recordId':{},'showFooter':{
			type:Boolean,
			default:true
		}},
		name: 'Spo2',
		components: {
			headLine,
			ignore,
			manu
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
				var standard = /^[0-9]*(\.[0-9]{0,4})?$/;
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
				if(vm.showToast(e.target.value)&& parseFloat(e.target.value)<=100){
				vm.bloodO2 = e.target.value;
				}
				else{
					vm.showtoast('不可大于100%');
				}
				console.log(e.target.value);
				
			},
			inputRate(e) {
				let vm = this;
				vm.inputbloodRate = e.target.value;	
				
			},
			save() {
				let vm = this;
				if(!(vm.bloodO2!=''||vm.inputbloodRate!='')){
					vm.showtoast('表单填写不全');
					return false	
				}
				let exams1 = {
					recordTime:new Date().getTime(),
					type:'bloodOxygen',
					value:vm.bloodO2,
					unit:'%',
					condition:''
				}
				let exams2 = {
					recordTime:new Date().getTime(),
					type:'lbs',
					value:vm.inputbloodRate,
					unit:'BMP',
					condition:''
				}
				let arr=[];
				arr.push(exams1);
				arr.push(exams2);
           	let params={
		   timeStamp:new Date().getTime(),
		   deviceId:'',
		   hospitalCode:sessionStorage.getItem("hospitalCode"),
		   exams:arr,
		   medicalRecordFolderId:vm.recordId	
	}
		savePhysicalExamData(params).then(data=>{//此处为回调函数
		        this.showtoast('保存成功')
		        this.$emit('promote',2,1)
//				this.$emit('nexttab','血糖',true)
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
		position: relative;
	}
	.ignore{
		    line-height: 0.52rem;
	}
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
  font-size: 0.28rem;
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
		height: 30vw;
		top:1vw;
		box-shadow: 0px 0px 15px 6px #f3f8fd;
		margin: 0 auto;
		position: relative;
		background: url(../../../assets/oxygen1.png);
		background-size: 24%;
		background-repeat: no-repeat;
		background-position: 103% 18.7vw;
		width: calc(100% - 0.8rem);
		.input-item-box {
			width: 36.5vw;
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
				font-size: 0.35rem;
			}
			input {
      max-width: 3.46rem;
      border: solid 1px #666666;
      border-radius: 0.1rem;
      padding: 0.22rem 0.15rem;
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 0.4rem;
      color: #333;
      letter-spacing: 0;
			}
			.unit {
				position: absolute;
				top: 0.32rem;
				/*left: 4.9rem;*/
				right:1vw;
				color: #666666;
				display: inline-block;
				width: 1.1rem;
				text-align: right;
				font-size: 0.25rem;
			}
		}

	}
	.control-bottom{
		position: absolute;
		bottom: .4rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding:0 0.4rem;
		box-sizing: border-box;
	}
	.manu{
		// display: inline-block;
		// margin-left: 0.3rem;
		font-size: 0.3rem;
	}
			.save-button {
			width: 19.5%;
			height: 0.9rem;
			// display: inline-block;
			// transform: translate(21%,0);
			text-align: center;
			font-size: 0.3rem;
			line-height: 0.9rem;
			color: white;
			background-color: #3C9BFF;
			border-radius: 5px;
			// vertical-align: middle;
		}
</style>
