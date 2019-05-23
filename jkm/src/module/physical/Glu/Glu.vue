<template>
		<div class="temperature">
		<headLine/>
		<header>请输入体温数据</header>
				<div id="panel" class="panel">
		<div class="input-item-box">
			<div class="input-item">
			<span id="">
				血糖
			</span>
			<input type="text" name="" id="" value="" placeholder="请输入" @input="inputValue"/><span class="unit">mmHg</span>
		</div>
			<div class="input-item-Glu">
			<span id="">
				血糖检测时您的状态
			</span>
			<span class="detection-button" :class="current_food_status?'active':''" data-index="before" @click.stop="foodStatus">空腹</span><span class="detection-button" :class="current_food_status?'':'active'" data-index="after" @click.stop="foodStatus">餐后</span>
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
		name: 'bloodPressure',
		components: {
			headLine
		},
		data() {
			return {
			current_food_status:true,
			Glu:''
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
			foodStatus(event){
	        let vm = this;
	        console.log(event.currentTarget.dataset.index);
	         vm.current_food_status = event.currentTarget.dataset.index==='before'?true:false;	        
			},
			inputValue(event){
				let vm = this;
				if(vm.showToast(event.target.value)){
				vm.Glu = event.target.value;
				}				
				console.log('值'+event.target.value);
			},
			save(){
			let vm = this;
			console.log(vm.current_food_status);
			if(!(vm.Glu!='')){
					vm.showtoast('表单填写不全');
					return false	
				}
			let exams1 = {
					recordTime:new Date().getTime(),
					type:'bloodSugar',
					value:vm.bloodO2,
					unit:'mmol/L',
					condition:vm.current_food_status?'before':'after'
			}
			let arr=[];
			arr.push(exams1);
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
input{
    outline-color: invert ;
	outline-style: none ;
	outline-width: 0px ;
	border: none ;
	border-style: none ;
	text-shadow: none ;
	-webkit-appearance: none ;
	-webkit-user-select: text ;
	outline-color: transparent ;
	box-shadow: none;
}
.panel{
	width: 83vw;
	height: 40vw;
	box-shadow:  0px 0px 15px 6px #f3f8fd; 
	margin: 0 auto;
	position: relative;
	background: url(../../../assets/temp.png);
	background-size: 18%;
    background-repeat: no-repeat;
    background-position: 101% 20vw; 
	.input-item-box{
		width: 36vw;
		text-align: right;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-70%,-50%);
		.detection-button{
			display: inline-block;
			padding: 0.2rem 0.55rem;
			margin: 0 0.1rem;
			border-radius: 5px;
			
			color: #FC9452;
		}
		.active{
			background-color: #FC9452;
			color: white;
		}
	}
	.input-item{
		position: relative;
		margin:0.28rem 0;
		span{
			vertical-align: middle;
		}
		input{
			border: solid 1px #666666;
			border-radius: 0.1rem;
			padding: 0.22rem 0.15rem;
			vertical-align: middle;
		}
		.unit{
			position: absolute;
			top: 0.19rem;
			left: 5.6rem;
			color: #666666;
			display: inline-block;
			width: 1.1rem;
			text-align: right;

		}
	}
	.save-button{
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