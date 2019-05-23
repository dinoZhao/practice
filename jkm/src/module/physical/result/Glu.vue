<template>
		<div class="temperature">
		<!--<headLine/>-->
		<header>请输入血糖数据
		
		<ignore class='ignore'  :preindex="3"></ignore></header>
		
				<div id="panel" class="panel">
		<div class="input-item-box">
			<div class="input-item">
			<span id="">
				血糖
			</span>
			<input type="number" name="" id="" value="" placeholder="请输入" @input="inputValue"/><span class="unit">mmol/L</span>
		</div>
			<!--<div class="input-item-Glu">
			<span id="">
				血糖检测时您的状态
			</span>
			<span class="detection-button" :class="current_food_status?'active':''" data-index="before" @click.stop="foodStatus">空腹</span><span class="detection-button" :class="current_food_status?'':'active'" data-index="after" @click.stop="foodStatus">餐后</span>
		</div>-->
	
		</div>
		
	</div>
		<div class="control-bottom" v-show='showFooter'>
			<manu  :type='1' :manu='3'></manu>
			<div class="save-button cliect" @click="save">保存</div>
		</div>
		</div>

</template>

<script>
		import headLine from "components/headline/headline.vue";
		import ignore from './ignore.vue'
		import manu from './manu.vue'
		import { savePhysicalExamData} from 'API/requst'
		import util from 'utils/util';
			export default {
		props:{'personId':{},'recordId':{},'showFooter':{
			type:Boolean,
			default:true
		}},
		name: 'bloodPressure',
		components: {
			headLine,
			ignore,
			manu
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
					value:vm.Glu,
					unit:'mmol/L',
					condition:vm.current_food_status?'before':'after'
			}
			let arr=[];
			console.log(exams1);
			arr.push(exams1);
          	let params={
		    timeStamp:new Date().getTime(),
		    deviceId:'',
		    hospitalCode:sessionStorage.getItem("hospitalCode"),
		    exams:arr,
		    medicalRecordFolderId:vm.recordId	
	        }
			savePhysicalExamData(params).then(data=>{ //此处为回调函数
		        this.showtoast('保存成功')
		        this.$emit('promote',3,1)
//				this.$emit('nexttab','体温',true)
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
		height: 1.3rem;
		line-height: 1.3rem;
		font-family: PingFangSC-Medium;
		font-size: 0.4rem;
		color: #333333;
		letter-spacing: 0;
		text-align: center;
		position: relative;
}
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
  font-size: 0.28rem;
}
	.ignore{
		    line-height: 0.52rem;
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
	width: calc(100% - 0.8rem);
	height: 30vw;
	top:1vw;
	box-shadow:  0px 0px 15px 6px #f3f8fd; 
	margin: 0 auto;
	position: relative;
	background: url(../../../assets/temp.png);
	background-size: 18%;
    background-repeat: no-repeat;
    background-position: 100% 15vw; 
	.input-item-box{
		width: 36vw;
		text-align: right;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-70%,-50%);
		.detection-button{
			display: inline-block;
			padding: 0.12rem 0.40rem;
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
			font-size: 0.35rem;
		}
		input{
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
		.unit{
			position: absolute;
			top: 0.28rem;
			/*left: 4.8rem;*/
			right: 1vw;
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
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 0.4rem;
		box-sizing: border-box;
	}
	.manu{
		display: inline-block;
		vertical-align: middle;
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
			vertical-align: middle;
		}
		.input-item-Glu{
			font-size: 0.35rem;
		}
</style>
