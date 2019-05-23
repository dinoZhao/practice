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
					<!--<input type="text" placeholder="请输入" :value="lip" @input="lip = $event.target.value" />-->
				<select v-model="lip">
                <option value="">请选择</option>
                <option v-for="(item,index) in lip_arr" :key="index" :value="item">{{item}}</option>
            </select>
					<div class="BFC"></div>
					<!--<input type="text" placeholder="请输入" :value="pharynx" @input="pharynx = $event.target.value" />-->
				<select v-model="pharynx">
                <option value="">请选择</option>
                <option v-for="(item,index) in pharynx_arr" :key="index" :value="item">{{item}}</option>
            </select>
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
					<p v-for="(item,index) in stomatologyList" data-index = "index" :key = "item.index" @click="item.checked = !item.checked"><img :src="item.checked?require('../../../assets/already.png'):require('../../../assets/notyet.png')"/><span>{{item.type}}</span></p>
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
					<input type="number" placeholder="请输入" :value="leftEyeVision" @input="leftEyeVision = $event.target.value" />
					<div class="BFC"></div>
					<input type="number" placeholder="请输入" :value="leftEyeCorrectedVision" @input="leftEyeCorrectedVision = $event.target.value" />
					<div class="BFC"></div>
				</div>
				<div class="normal-condition-title stomatology-padding" style="padding-left: 0;">
					<div>右眼视力</div>
					<div>右眼矫正视力</div>

				</div>
				<div class="normal-condition-input healthservice stomatology">
					<input type="number" placeholder="请输入" :value="rightEyeVision" @input="rightEyeVision = $event.target.value" />
					<div class="BFC"></div>
					<input type="number" placeholder="请输入" :value="rightEyeCorrectedVision" @input="rightEyeCorrectedVision = $event.target.value" />
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
					<select v-model="hearing">
                <option value="">请选择</option>
                <option v-for="(item,index) in hearing_arr" :key="index" :value="item">{{item}}</option>
            </select>
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
					<select v-model="actionFunction" style="width: 23vw;">
                <option value="">请选择</option>
                <option v-for="(item,index) in actionFunction_arr" :key="index" :value="item">{{item}}</option>
            </select>
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
				lip_arr:['红润','苍白','发绀','皲裂','疱疹'],
				pharynx_arr:['无充血','充血','淋巴滤泡增生'],
				hearing_arr:['听见','听不清或无法听见'],
				actionFunction_arr:['可顺利完成','无法独立完成任何一个动作'],
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
				organFunction.vision.rightEyeCorrectedVision = vm.rightEyeCorrectedVision;
				organFunction.hearing = vm.hearing;
				organFunction.actionFunction = vm.actionFunction;
				console.log(vm.stomatologyList)
				vm.stomatologyList.map(function(item,index){
					if(item.checked){
						console.log(item.type)
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
	.normal-condition-input{
		select{
			    width: 21vw;
    vertical-align: middle;
    background-color: #FFFFFF;
    height: 0.6rem;
    font-size: 0.28rem;
    padding-left: 15px;
    margin: 0.512vw 0;
    border: 1px solid #eee;
    border-radius: 10px;
    margin-left: 1.6%;
    outline: none;
    color: #666;
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
</style>