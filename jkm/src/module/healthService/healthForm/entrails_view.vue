<template>
	<div id="entrails">
		<div class="healthForm-headline"><span>脏器功能</span></div>
		<div class="evaluate-item">
			<div class="evaluate-item-title">
				口腔
			</div>
			<div class="">
				<div class="normal-condition-title stomatology-padding">
					<div>口唇</div>
					<div>咽部</div>

				</div>
				<div class="normal-condition-input healthservice stomatology">
					<input type="text" placeholder="" :value="lip" @input="lip = $event.target.value" class="disable" disabled="disabled" />
					<div class="BFC"></div>
					<input type="text" placeholder="" :value="pharynx" @input="pharynx = $event.target.value" class="disable"  disabled="disabled"/>
					<div class="BFC"></div>
				</div>
				<div class="normal-condition-title">
						<div>齿列</div>
				</div>
				<div class="isntblock">
					<!--<p><img src="../../../assets/notyet.png"/><span>正常</span></p>
					<p><img src="../../../assets/notyet.png"/><span>缺齿</span></p>
					<p><img src="../../../assets/notyet.png"/><span>龋齿</span></p>
					<p><img src="../../../assets/notyet.png"/><span>义齿(假牙)</span></p>-->
					<p v-for="(item,index) in stomatologyList" data-index = "index" :key = "item.index" ><img :src="item.checked?require('../../../assets/already.png'):require('../../../assets/notyet.png')"/><span>{{item.type}}</span></p>
				</div>
			</div>
		</div>
				<div class="evaluate-item">
			<div class="evaluate-item-title">
				视力
			</div>
			<div class="">
				<div class="normal-condition-title stomatology-padding">
					<div>左眼视力</div>
					<div>左眼矫正视力</div>

				</div>
				<div class="normal-condition-input healthservice stomatology">
					<input type="text" placeholder="" :value="leftEyeVision" @input="leftEyeVision = $event.target.value" class="disable" disabled="disabled" />
					<div class="BFC"></div>
					<input type="text" placeholder="" :value="leftEyeCorrectedVision" @input="leftEyeCorrectedVision = $event.target.value" class="disable" disabled="disabled" />
					<div class="BFC"></div>
				</div>
				<div class="normal-condition-title stomatology-padding" style="padding-left: 0;">
					<div>右眼视力</div>
					<div>右眼矫正视力</div>

				</div>
				<div class="normal-condition-input healthservice stomatology">
					<input type="text" placeholder="" :value="rightEyeVision" @input="rightEyeVision = $event.target.value" class="disable" disabled="disabled" />
					<div class="BFC"></div>
					<input type="text" placeholder="" :value="rightEyeCorrectedVision" @input="rightEyeCorrectedVision = $event.target.value" class="disable" disabled="disabled" />
					<div class="BFC"></div>
				</div>

			</div>
		</div>
				<div class="evaluate-item">
			<div class="evaluate-item-title">
				听力
			</div>
			<div class="">
				<div class="normal-condition-title stomatology-padding">
					<div>听力</div>
				</div>
				<div class="normal-condition-input healthservice stomatology">
					<input type="text" placeholder="" :value="hearing" @input="hearing = $event.target.value" class="disable" disabled="disabled" />
					<div class="BFC"></div>
				</div>
			</div>
		</div>
				<div class="evaluate-item">
			<div class="evaluate-item-title">
				运动功能
			</div>
			<div class="">
				<div class="normal-condition-title stomatology-padding">
					<div>运动功能</div>
				</div>
				<div class="normal-condition-input healthservice stomatology">
					<input type="text" placeholder="" :value="actionFunction" @input="actionFunction = $event.target.value" class="disable" disabled="disabled"  style="width: 24vw;"/>
					<div class="BFC"></div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['organFunction'],
		name: 'entrails',
		components: {

		},
		data() {
			return {
			stomatologyList:[
			{index:0,checked:false,type:'正常'},
			{index:1,checked:false,type:'缺齿'},
			{index:2,checked:false,type:'龋齿'},
			{index:3,checked:false,type:'义齿(假牙)'}
				],
			lip:'',
			pharynx:'',
			leftEyeVision:'',
			rightEyeVision:'',
			leftEyeCorrectedVision:'',
			rightEyeCorrectedVision:'',
			hearing:'',
			actionFunction:''
			}
		},
		watch:{
			organFunction(){
				let vm = this;
				vm.LoadInfo();
			}
		},
		methods: {
			LoadInfo(){
				let vm = this,lip,pharynx,leftEyeVision,rightEyeVision,leftEyeCorrectedVision,rightEyeCorrectedVision,hearing,actionFunction;
				vm.lip = vm.organFunction.oral.lip;
				vm.pharynx = vm.organFunction.oral.pharynx;
				vm.leftEyeVision = vm.organFunction.vision.leftEyeVision;
				vm.rightEyeVision = vm.organFunction.vision.rightEyeVision;
				vm.leftEyeCorrectedVision = vm.organFunction.vision.leftEyeCorrectedVision;
				vm.rightEyeCorrectedVision =  vm.organFunction.vision.rightEyeCorrectedVision;
				vm.hearing = vm.organFunction.hearing;
				vm.actionFunction = vm.organFunction.actionFunction;
				vm.stomatologyList.map(function(item,index){
					if(vm.organFunction.oral.tooth.indexOf(item.type) > -1){
						item.checked = true;
					}
				})
				
			},
			sendData(){
				let vm = this,organFunction={oral:{},vision:{}},tooth=[];
				organFunction.oral.lip = vm.lip;
				organFunction.oral.pharynx = vm.pharynx;
				organFunction.vision.leftEyeVision = vm.leftEyeVision;
				organFunction.vision.rightEyeVision = vm.rightEyeVision;
				organFunction.vision.leftEyeCorrectedVision = vm.leftEyeCorrectedVision;
				organFunction.hearing = vm.hearing;
				organFunction.actionFunction = vm.actionFunction;
				vm.stomatologyList.map(function(item,index){
					if(item.checked===true){
						tooth.push(item.type)
					}
				})
				organFunction.oral.tooth = tooth;
				vm.$emit('saveOrganFunction',organFunction);
			}
		},
		created() {
			
		},
		mounted() {
			let vm = this;
			console.log(vm.organFunction)
			vm.LoadInfo();
		}
	}
</script>

<style lang="scss" type="text/css">
	input:disabled{
		background-color: white;
	}
	.evaluate-item {
		margin-bottom: 2vw;
		.stomatology{
			width: 24vw;
		}
	}
	
	.evaluate-item-title {
		padding-left: 10px;
		margin-left: 20px;
		border-left: solid 2px #3C9BFF;
		margin-bottom: 1vw;
	}
	
	.evaluate-item-panel {
		margin-left: 3.2vh;
		div {
			width: 10vw;
			text-align: center;
			line-height: 3.2vw;
			border: 1px solid #3C9BFF;
			font-size: 0.26rem;
			border-radius: 0.1rem;
			display: inline-block;
			margin-right: 1.5vw;
			color: #3C9BFF;
		}
	}
	.isntblock{
	display: inline-block;
	width: 51%;
	padding: 16px 5px;
		p{
	vertical-align:top;
	display: inline-block;
     /*max-width: 16%;*/ 	
    margin-bottom: 15px;
    margin-right: 1vw;
    img{
    width: .5rem;
    height: .5rem;
    vertical-align: top;
    margin-right: 10px;
    position: relative;
    top: -0.3vw;
    }
    span{
    vertical-align:top;
    margin-top: 0.06vw;
    display: inline-block;
    }
		}
	}
	.stomatology-padding{
		padding-left: 2vw;
		div{
			max-width: 10.5vw;
		}
	}
		.hide {
		visibility: hidden;
	}
		.disable{
	 border-color: white;
	}
	.short{
		text-align: left !important;
		right: 3vw !important;
		/*width: 14vw !important;*/
	}
	.short2{
		text-align: left !important;
		right: 5.6vw !important;
	}
</style>