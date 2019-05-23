<template>
	<div id="healthForm-one">
		<div class="symptom">
			<div class="healthForm-headline"><span>症状</span></div>
			<div class="healthForm-item">
				<!--<p><img src="../../../assets/notyet.png"/><span>无症状</span></p><p><img src="../../../assets/notyet.png"/><span>头疼</span></p><p><img src="../../../assets/notyet.png"/><span>头晕</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>心悸</span></p><p><img src="../../../assets/notyet.png"/><span>胸闷</span></p><p><img src="../../../assets/notyet.png"/><span>胸痛</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>慢性咳嗽</span></p><p><img src="../../../assets/notyet.png"/><span>咳痰</span></p><p><img src="../../../assets/notyet.png"/><span>呼吸困难</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>多饮</span></p><p><img src="../../../assets/notyet.png"/><span>多尿</span></p><p><img src="../../../assets/notyet.png"/><span>体重下降</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>乏力</span></p><p><img src="../../../assets/notyet.png"/><span>关节肿痛</span></p><p><img src="../../../assets/notyet.png"/><span>视力模糊</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>手脚麻木</span></p><p><img src="../../../assets/notyet.png"/><span>尿急</span></p><p><img src="../../../assets/notyet.png"/><span>尿痛</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>便秘</span></p><p><img src="../../../assets/notyet.png"/><span>腹泻</span></p><p><img src="../../../assets/notyet.png"/><span>恶心呕吐</span></p>
		  					<p><img src="../../../assets/notyet.png"/><span>眼花</span></p><p><img src="../../../assets/notyet.png"/><span>耳鸣</span></p><p><img src="../../../assets/notyet.png"/><span>乳房胀痛</span></p>-->
				<p v-for="(item,index) in symptomList" data-index="index" :key="item.index" v-show="item.checked"><img :src="item.checked?require('../../../assets/already.png'):require('../../../assets/notyet.png')" v-show="item.index != 0" /><span>{{item.type}}</span></p>
				<div class="other"><span>其他</span><input type="text" :value="otherSymptom" placeholder="" disabled="disabled" class="disable" /></div>
			</div>
		</div>
		<div class="normal-condition">
			<div class="healthForm-headline"><span style="display: inline-block;">一般状况</span>
				<!--<div @click="importNewData" class="cliect">导入最新监测数据</div>-->
			</div>
			<div class="fa-box1">

				<div class="normal-condition-title">
					<div>体温</div>
					<div>左侧血压</div>
					<div>右侧血压</div>
					<div>腰围</div>
					<div>身高</div>
					<div>BMI</div>
				</div>
				<div class="normal-condition-input healthservice">
					<div class="unit"><input type="number" :value="temperature" @input="temperature = $event.target.value" placeholder="" class="disable " disabled="disabled" /><span class="short" v-show="!!temperature">℃</span></div>
					<div class="check hide">检测</div>
					<div class="BFC"></div>
					<div class="unit"><input type="tel" :value="bloodPressure_Diastolic_Left" @input="bloodPressure_Diastolic_Left = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short" v-show="!!bloodPressure_Diastolic_Left">mmHg</span></div>
					<div class="check hide">检测</div>
					<div class="BFC"></div>
					<div class="unit"><input type="tel" :value="bloodPressure_Diastolic_Right" @input="bloodPressure_Diastolic_Right = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short" v-show="!!bloodPressure_Diastolic_Right">mmHg</span></div>
					<div class="check hide">检测</div>
					<div class="BFC"></div>
					<div class="unit"> <input type="number" :value="waistLine" @input="waistLine = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short" v-show="!!waistLine">cm</span></div>
					<div class="BFC"></div>
					<div class="unit"> <input type="number" :value="height" @input="height = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short" v-show="!!height">cm</span></div>
					<div class="BFC"></div>
					<div class="unit"> <input type="number" :value="BMI" @input="BMI = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span></span></div>
					<div class="BFC"></div>
				</div>
			</div>

			<div class="fa-box2">
				<div class="normal-condition-title second-input-list">
					<div>脉率</div>
					<div class="hide">左侧血压</div>
					<div class="hide">右侧血压</div>
					<div>呼吸频率</div>
					<div>体重</div>
				</div>
				<div class="normal-condition-input healthservice second-input">
					<div class="unit"><input type="number" :value="pulseRate" @input="pulseRate = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short2" v-show="!!pulseRate">次/每分钟</span></div>
					<div class="BFC"></div>
					<input type="number" placeholder="请输入" :value="BMI"  class="hide" />
					<div class="BFC"></div>
					<input type="number" placeholder="请输入" :value="BMI" class="hide" />
					<div class="BFC"></div>
					<div class="unit"><input type="number" :value="breathRate" @input="breathRate = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short2" v-show="breathRate">次/每分钟</span></div>
					<div class="BFC"></div>
					<div class="unit"><input type="number" :value="weight" @input="weight = $event.target.value" placeholder="" class="disable short" disabled="disabled" /><span class="short2" v-show="weight">Kg</span></div>
				</div>
			</div>

		</div>

		<div class="evaluate" v-show="patientAge>=65">
			<div class="evaluate-item">
				<div class="evaluate-item-title">
					老年人健康状态自我评估 *
				</div>
				<div class="evaluate-item-panel">
					<div :class="healthyStatus==0?'selected_view':'hide'" data-index="0" @click="healthyStatus=$event.target.dataset.index">
						满意
					</div>
					<div :class="healthyStatus==1?'selected_view':'hide'" data-index="1" @click="healthyStatus=$event.target.dataset.index">
						基本满意
					</div>
					<div :class="healthyStatus==2?'selected_view':'hide'" data-index="2" @click="healthyStatus=$event.target.dataset.index">
						说不清楚
					</div>
					<div :class="healthyStatus==3?'selected_view':'hide'" data-index="3" @click="healthyStatus=$event.target.dataset.index">
						不太满意
					</div>
					<div :class="healthyStatus==4?'selected_view':'hide'" data-index="4" @click="healthyStatus=$event.target.dataset.index">
						不满意
					</div>
				</div>
			</div>
			<div class="evaluate-item">
				<div class="evaluate-item-title">
					老年人生活自理能力自我评估 *
				</div>
				<div class="evaluate-item-panel">
					<div :class="self_help==0?'selected_view':'hide'" data-index="0" @click="self_help=$event.target.dataset.index">
						可自理
					</div>
					<div :class="self_help==1?'selected_view':'hide'" data-index="1" @click="self_help=$event.target.dataset.index">
						轻度依赖
					</div>
					<div :class="self_help==2?'selected_view':'hide'" data-index="2" @click="self_help=$event.target.dataset.index">
						中度依赖
					</div>
					<div :class="self_help==3?'selected_view':'hide'" data-index="3" @click="self_help=$event.target.dataset.index">
						不能自理
					</div>
				</div>
			</div>
			<div class="evaluate-item">
				<div class="evaluate-item-title">
					老年人认知功能 *
				</div>
				<div class="evaluate-item-panel">
					<div :class="cognitive==0?'selected_view':'hide'" data-index="0" @click="cognitive=$event.target.dataset.index">
						粗筛阴性
					</div>
					<div :class="cognitive==1?'selected_view':'hide'" data-index="1" @click="cognitive=$event.target.dataset.index">
						粗筛阳性
					</div>
				</div>
			</div>
			<div class="evaluate-item">
				<div class="evaluate-item-title">
					老年人情感状态 *
				</div>
				<div class="evaluate-item-panel">
					<div :class="affective==0?'selected_view':'hide'" data-index="0" @click="affective=$event.target.dataset.index">
						粗筛阴性
					</div>
					<div :class="affective==1?'selected_view':'hide'" data-index="1" @click="affective=$event.target.dataset.index">
						粗筛阳性
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import { queryHealthyCheck, queryHealthProperties } from 'API/requst'
	import { getURLParameter } from 'utils/util'
	let mapList = {
		'BloodPressure_Systolic':'bloodPressure_Diastolic_Left',
		'BloodPressure_Diastolic':'bloodPressure_Diastolic_Right',
		'Bmi_Bmi': 'BMI',
		'Bmi_Height': 'height',
		'Bmi_Weight': 'weight',
		'Temperature': 'temperature',
		'VS_Pulse': 'pulseRate'
	}
	let elderlyHealthStatus = {
		'满意': 0,
		'基本满意': 1,
		'说不清楚': 2,
		'不太满意': 3,
		'不满意': 4
	}
	let elderlySelfCareAbility = {
		'可自理': 0,
		'轻度依赖': 1,
		'中度依赖': 2,
		'不能自理': 3
	}
	let elderlyNormal = {
		'粗筛阴性': 0,
		'粗筛阳性': 1
	}
	export default {
		props: ['physicalExamTableId','generalSituation','patientAge'],
		name: 'normal',
		components: {

		},
		data() {
			return {
				symptomList: [{
						index: 0,
						checked: true,
						type: '无症状'
					},
					{
						index: 1,
						checked: false,
						type: '头疼'
					},
					{
						index: 2,
						checked: false,
						type: '头晕'
					},
					{
						index: 3,
						checked: false,
						type: '心悸'
					},
					{
						index: 4,
						checked: false,
						type: '胸闷'
					},
					{
						index: 5,
						checked: false,
						type: '胸痛'
					},
					{
						index: 6,
						checked: false,
						type: '慢性咳嗽'
					},
					{
						index: 7,
						checked: false,
						type: '咳痰'
					},
					{
						index: 8,
						checked: false,
						type: '呼吸困难'
					},
					{
						index: 9,
						checked: false,
						type: '多饮'
					},
					{
						index: 10,
						checked: false,
						type: '多尿'
					},
					{
						index: 11,
						checked: false,
						type: '体重下降'
					},
					{
						index: 12,
						checked: false,
						type: '乏力'
					},
					{
						index: 13,
						checked: false,
						type: '关节肿痛'
					},
					{
						index: 14,
						checked: false,
						type: '视力模糊'
					},
					{
						index: 15,
						checked: false,
						type: '手脚麻木'
					},
					{
						index: 16,
						checked: false,
						type: '尿急'
					},
					{
						index: 17,
						checked: false,
						type: '尿痛'
					},
					{
						index: 18,
						checked: false,
						type: '便秘'
					},
					{
						index: 19,
						checked: false,
						type: '腹泻'
					},
					{
						index: 20,
						checked: false,
						type: '恶心呕吐'
					},
					{
						index: 21,
						checked: false,
						type: '眼花'
					},
					{
						index: 22,
						checked: false,
						type: '耳鸣'
					},
					{
						index: 23,
						checked: false,
						type: '乳房胀痛'
					}
				],
				otherSymptom: '',
//				physicalExamTableId: '',
				temperature: '',
				pulseRate: '',
				breathRate: '',
				bloodPressure_Diastolic_Left: '',
				bloodPressure_Systolic_Left: '',
				bloodPressure_Diastolic_Right: '',
				bloodPressure_Systolic_Right: '',
				height: '',
				weight: '',
				waistLine: '',
				BMI: '',
				healthyStatus: 0,
				self_help: 0,
				cognitive: 0,
				affective: 0
			}
		},
		methods: {
			importNewData(event) {
				let vm = this;
				let personId = getURLParameter('personId') || sessionStorage.getItem('personId') || 'mcs526facdc88384dddb327696a617b3f86';
				let padDeviceCode = sessionStorage.getItem('padCode') || 'P1'
				let params = {
					personId: personId,
					padDeviceCode: padDeviceCode
				}
				queryHealthProperties(params).then(data => {
					vm.showtoast('导入成功');
					data.resultList.map(function(item, index) {
//						console.log(vm[mapList[item.type]]);
                        if(item.type==='BloodPressure_Systolic'){
                        	vm.bloodPressure_Diastolic_Left = item.value+'/'
                        	vm.bloodPressure_Diastolic_Right = item.value+'/'
                        }
                        else if(item.type==='BloodPressure_Diastolic'){
                        	vm.bloodPressure_Diastolic_Left += item.value
                        	vm.bloodPressure_Diastolic_Right += item.value
                        }
                        else{
                        vm[mapList[item.type]] = item.value;
                        }
					
					})
				})
			},
			sendData(){
				let vm = this;
				let symptom=[],elderlyHealthStatus_copy,elderlySelfCareAbility_copy,elderlyCognition_copy,elderlyEmotionalState_copy,generalSituation = {
				},arr = [];
				vm.symptomList.map(function(item,index){
					if(item.checked){
						symptom.push(item.type)
					}
					
				})
				generalSituation.symptom = symptom;
				generalSituation.temperature = vm.temperature
				generalSituation.pulseRate = vm.pulseRate
				generalSituation.breathRate = vm.breathRate
				generalSituation.bloodPressure_Diastolic_Left = vm.bloodPressure_Diastolic_Left.split('/')[0]		
				vm.bloodPressure_Diastolic_Left.split('/')[1]?generalSituation.bloodPressure_Systolic_Left = vm.bloodPressure_Diastolic_Left.split('/')[1]:generalSituation.bloodPressure_Systolic_Left = ''
				generalSituation.bloodPressure_Diastolic_Right = vm.bloodPressure_Diastolic_Right.split('/')[0]
				vm.bloodPressure_Diastolic_Right.split('/')[1]?generalSituation.bloodPressure_Systolic_Right = vm.bloodPressure_Diastolic_Right.split('/')[1]:generalSituation.bloodPressure_Systolic_Right = ''
//				generalSituation.bloodPressure_Systolic_Right = vm.bloodPressure_Diastolic_Right.split('/')[1]
				generalSituation.height = vm.height
				generalSituation.weight = vm.weight
				generalSituation.waistLine = vm.waistLine
				generalSituation.BMI = vm.BMI
//				console.log(elderlyHealthStatus)
				for(let prop in elderlyHealthStatus){//遍历健康状态自我评估
					
					if(elderlyHealthStatus[prop] == vm.healthyStatus){
						elderlyHealthStatus_copy = prop;
						
					}
				}
				for(let prop in elderlySelfCareAbility){//遍历生活自理能力
//					console.log(elderlySelfCareAbility[prop])
					if(elderlySelfCareAbility[prop] == vm.self_help){
						elderlySelfCareAbility_copy = prop;
					}
				}
				for(let prop in elderlyNormal){//遍历老年人认知功能
					if(elderlyNormal[prop] == vm.cognitive){
						elderlyCognition_copy = prop;
					}
				}
				for(let prop in elderlyNormal){//遍历老年人情感状态
					if(elderlyNormal[prop] == vm.affective){
						elderlyEmotionalState_copy = prop;
					}
				}
				generalSituation.elderlyHealthStatus = {
					elderlyHealthStatus:elderlyHealthStatus_copy,
					elderlySelfCareAbility:elderlySelfCareAbility_copy,
					elderlyCognition:elderlyCognition_copy,
					elderlyEmotionalState:elderlyEmotionalState_copy
				}				
//				console.log(generalSituation);
				arr.push(vm.physicalExamTableId)
				arr.push(generalSituation)
				vm.$emit('saveData',arr)
			}
		},
		watch:{
			generalSituation(){
				let vm = this;
				let symptomList = [];
				vm.temperature = vm.generalSituation.temperature;
				vm.pulseRate = vm.generalSituation.pulseRate;
				vm.breathRate = vm.generalSituation.breathRate;
				vm.bloodPressure_Diastolic_Left = vm.generalSituation.bloodPressure_Diastolic_Left+'/'+vm.generalSituation.bloodPressure_Systolic_Left;
				vm.bloodPressure_Systolic_Left = vm.generalSituation.bloodPressure_Systolic_Left;
				vm.bloodPressure_Diastolic_Right = `${vm.generalSituation.bloodPressure_Diastolic_Right}/${vm.generalSituation.bloodPressure_Systolic_Right}`;
				vm.bloodPressure_Systolic_Right = vm.generalSituation.bloodPressure_Systolic_Right;
				vm.height = vm.generalSituation.height;
				vm.weight = vm.generalSituation.weight;
				vm.waistLine = vm.generalSituation.waistLine;
				vm.BMI = vm.generalSituation.BMI;
				vm.healthyStatus = elderlyHealthStatus[vm.generalSituation.elderlyHealthStatus.elderlyHealthStatus]
				vm.self_help = elderlySelfCareAbility[vm.generalSituation.elderlyHealthStatus.elderlySelfCareAbility]
				//				vm.self_help = elderlySelfCareAbility['中度依赖'] 
				vm.cognitive = elderlyNormal[vm.generalSituation.elderlyHealthStatus.elderlyCognition]
				vm.affective = elderlyNormal[vm.generalSituation.elderlyHealthStatus.elderlyEmotionalState]

				vm.symptomList.map(function(item, index) {
					symptomList.push(item.type);
					item.checked = false;
					if(vm.generalSituation.symptom.indexOf(item.type) > -1) {
//						console.log(item.type);
						item.checked = true;
					} else {

					}

				})
				vm.generalSituation.symptom.map(function(itemData, indexData) {
					if(symptomList.indexOf(itemData) > -1) {
					} else {
						vm.otherSymptom = itemData;
					}
				})	
			}
			
		},
		created() {
			let vm = this;
			let personId = getURLParameter('personId') || sessionStorage.getItem('personId') || 'mcs9352f873e0974feb9eb0b69ff447e640';
			let params = {
				personId: personId
			}

		},
		mounted() {}
	}
</script>

<style lang="scss" type="text/css">
	/*健康体检表生活方式模块样式--head*/
	input:disabled{
		background-color: white;
	}
	.healthForm-one {
		height: 87vh;
		overflow: scroll;
	}
	
	.healthForm-headline span {
		display: block;
		width: 9.4vw;
		line-height: 2.6vw;
		font-size: 0.28rem;
		border-radius: 30px;
		color: #3C9BFf;
		background: rgba(60, 155, 255, 0.1);
		text-align: center;
	}
	
	.healthForm-headline {
		padding: 15px 15px;
		position: relative;
		div {
			display: inline-block;
			position: absolute;
			right: 3vw;
			top: -0.5vw;
			line-height: 4vw;
			vertical-align: top;
			border: 1px solid #3C9BFF;
			padding: 0 0.25rem;
			font-size: 0.26rem;
			border-radius: 0.1rem;
			background-color: #3C9BFF;
			color: white;
		}
	}
	
	.healthForm-item {
		padding: 15px 15px;
	}
	
	.healthForm-item>p {
		display: inline-block;
		width: 16%;
		margin-bottom: 15px;
	}
	
	.healthForm-item>p img {
		width: .5rem;
		height: .5rem;
		vertical-align: middle;
		margin-right: 10px;
	}
	
	.healthForm-item>p span {
		vertical-align: middle;
	}
	
	.normal-condition-title {
		display: inline-block;
		padding-left: 15px;
		vertical-align: top;
		div {
			max-width: 7.7vw;
			text-align: right;
			line-height: 0.6rem;
			padding: 0.69vw 0;
			color: #333333;
		}
	}
	
	.normal-condition-input {
		display: inline-block;
		width: 28vw;
		margin-left: 0.3vw;
		vertical-align: top;
		margin-bottom: 1vw;
		input {
			margin: 0.512vw 0;
			display: block;
			/*width: 18.8vw;
			height: 2.4vw;*/
			width: 19vw;
			height: 0.6rem;
			border-radius: 10px;
			padding-left: 15px;
			font-size: 0.28rem;
		}
		.BFC {
			height: 0.232vw;
		}
		.check {
			float: right;
			position: relative;
			top: -3.9vw;
			line-height: 0.6rem;
			border: 1px solid #3C9BFF;
			padding: 0 0.35rem;
			font-size: 0.26rem;
			border-radius: 0.1rem;
			color: #3C9BFF;
		}
	}
	
	.fa-box1 {
		width: 54%;
		display: inline-block;
		vertical-align: top;
	}
	
	.fa-box2 {
		width: 45%;
		display: inline-block;
		vertical-align: top;
	}
	
	.second-input-list {
		/*margin-left: 2vw;*/
	}
	
	.second-input {
		width: 20vw;
	}
	
	.evaluate-item {
		margin-bottom: 2vw;
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
	
	.unit {
		position: relative;
		text-align: right;
		width: 19vw;
		span {
			text-align: right;
			position: absolute;
			vertical-align: middle;
			top: 0.65vw;
			right: -0.3vw;
			width: 7.7vw;
			color: #999999;
		}
	}
	
	.hide {
		visibility: hidden;
	}
	
	.selected_view{
		background-color: #3C9BFF;
		color: white !important;
		float: left;
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
	.other {
		line-height: 60px;
	}
	
	.other input {
		height: 6.1vh;
		width: 21vw;
		font-size: .28rem;
		padding-left: 15px;
		border-radius: 10px;
		margin-left: 10px;
	}
	.cliect:active {
	background: #307CCC !important;
}
	/*健康体检表生活方式模块--head*/
</style>