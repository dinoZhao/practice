<template>
  <div class="healthForm healthservice"> 
  	<div class="healthForm-content table-content">
  		<div class="healthForm-content-head table-content-head">
  			<div class="content-head-left">
  				<span>健康体检表</span><span>编号 {{code}}</span>
  			</div><div class="content-head-right">
  				<P v-if="!iscompile" @click.stop="changecompile"><img src="../../../assets/save-btn.png"/><span>保存</span></P><P v-if="iscompile" @click.stop="compilebtn"><img src="../../../assets/compile-btn.png"/><span>编辑</span></P><P @click.stop="cancle"><img src="../../../assets/cancel-btn.png"/><span>取消</span></P>
  			</div>
  		</div>
  		<div class="healthForm-content-bottom table-content-bottom">
  			<div class="healthForm-content-left table-content-left">
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="one" ? "on" : ""]' @click.stop="changetab('one')"><span>一般<br/>状况</span></div>
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="two" ? "on" : ""]' @click.stop="changetab('two')"><span>生活<br/>方式</span></div>
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="three" ? "on" : ""]' @click.stop="changetab('three')"><span>脏器<br/>功能</span></div>
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="four" ? "on" : ""]' @click.stop="changetab('four')"><span style="padding: 22px 0;">查体</span></div>
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="five" ? "on" : ""]' @click.stop="changetab('five')"><span>辅助<br/>检查</span></div>
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="six" ? "on" : ""]' @click.stop="changetab('six')"><span>问题<br/>治疗</span></div>
	  			<div :class='["healthForm-conten-item table-content-item", tabindex=="seven" ? "on" : ""]' @click.stop="changetab('seven')"><span>评价<br/>指导</span></div>
	  		</div><div class="healthForm-content-right table-content-right">
	  				<div class="healthForm-one" v-show="tabindex=='one'">
	  					<!--健康体检表一般情况模块--head-->
	  					<template v-if="!iscompile">
	  						<normal ref="normal" @saveData="sendData" :physicalExamTableId="physicalExamTableId" :generalSituation="generalSituation" :patientAge="patientAge"></normal>
	  					</template>
	  					<template v-if="iscompile">
	  						<normalView  :physicalExamTableId="physicalExamTableId" :generalSituation="generalSituation" :patientAge="patientAge"></normalView>
	  					</template>
	  					<!--健康体检表一般情况模块--end-->
	  				</div>
	  				<div class="healthForm-two" v-show="tabindex=='two'">
	  					<!--健康体检表生活方式模块-->
	  					<template v-if="!iscompile">
	  						<lifestyle :lifelist="lifelist"/>
	  					</template>
	  					<template v-if="iscompile">
	  						<lifestyleshow :lifelist="lifelist"/>
	  					</template>
	  				</div>
	  				<div class="healthForm-three" v-show="tabindex=='three'">
	  					<!--健康体检表脏器功能模块-->
	  					<template v-if="!iscompile">
	  						<entrails :organFunction = 'organFunction' @saveOrganFunction = "sendOrganFunction" ref="OrganFunction"></entrails>	  						
	  					</template>
	  					<template v-if="iscompile">
	  						<entrailsView :organFunction = 'organFunction'>
	  						</entrailsView>
	  					</template>
	  				</div>
	  				<div class="healthForm-four" v-show="tabindex=='four'">
              <!--<examination/>-->
              <template v-if="!iscompile">
              	<examination :examinationList="examinationList"  ref="examination"/>
              </template>
              <template v-if="iscompile">
              	<examinationShow :examinationList="examinationList"/>
              </template>
	  				</div>
	  				<div class="healthForm-five" v-show="tabindex=='five'">
	  					<!--健康体检表辅助检查模块-->
              <template v-if="!iscompile">
                <auxiliary :auxiliaryExamination="auxiliaryExamination" ref="auxiliary"/>
              </template>
              <template v-if="iscompile">
                <auxiliaryShow :auxiliaryExamination="auxiliaryExamination"/>
              </template>
	  				</div>
        <div class="healthForm-six" v-show="tabindex=='six'">
          <!--健康体检表问题治疗模块-->
          <template v-if="!iscompile">
            <ProblemTreatment :diseaseTreatment="diseaseTreatment" ref="diseaseTreatment"/>
          </template>
          <template v-if="iscompile">
            <ProblemTreatmentShow :diseaseTreatment="diseaseTreatment"/>
          </template>
        </div>
        <div class="healthForm-seven" v-show="tabindex=='seven'">
          <!--健康体检表问题治疗模块-->
          <template v-if="!iscompile">
            <panel :evaluationGuide="evaluationGuide" ref="evaluationGuide"/>
          </template>
          <template v-if="iscompile">
            <panelShow :evaluationGuide="evaluationGuide"/>
          </template>
        </div>
	  		</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import {updateHealthyCheck,queryHealthyCheckDetail,readPatientMsg} from 'API/requst'
import { getURLParameter,dateFormat,empty  } from 'utils/util'
import lifestyle from './lifeStyle'
import normal from './normal_condition'
import normalView from './normal_condition_view'
import entrails from './entrails'
import examination from './examination'
import examinationShow from './examinationShow'
import entrailsView from './entrails_view'
import lifestyleshow from './lifeStyleShow'
import auxiliary from './auxiliary'
import auxiliaryShow from './auxiliaryShow'
import ProblemTreatment from './ProblemTreatment'
import ProblemTreatmentShow from './ProblemTreatmentShow'
import panel from './panel'
import panelShow from './panelShow'
export default {
  name: 'healthForm',
  data () {
    return {
     tabindex:'one',
     code:'',
     iscompile:false,
     isEdit:true,
     physicalExamTableId:'',
     generalSituation:{}, //一般状况
     organFunction:{}, //脏器功能
     lifelist:{ //生活方式
     },
     patientAge:0,
     examinationList:{ //查体
     },
     auxiliaryExamination:{ //辅助检查
     },
      diseaseTreatment:{
        "cerebralVascularDisease": { //脑血管疾病
          "diseases": ['1'],
          "other": ""
        },
        "kidneyDisease": { //肾脏疾病
          "diseases": ['1'],
          "other": ""
        },
        "heartDisease": { //心脏疾病
          "diseases": ['1'],
          "other": ""
        },
        "vascularDisease": { //血管疾病
          "diseases": ['1'],
          "other": ""
        },
        "eyeDisease": { //眼部疾病
          "diseases": ['1'],
          "other": ""
        },
        "neurologicalDiseases": [// 神经系统疾病
          '1'
        ],
        "otherSystemicDiseases": [ //其他系统疾病
          '1'
        ],
        "hospitalizations": [ //住院治疗情况
          {
            "startTime": '', //入院日期
            "endTime": "",  //出院日期
            "reason": "", //原因
            "nameOfMedicalInstitution": "", //医疗机构名称
            "medicalRecordNumber": "" //病案号
          }
        ],
        "sickbedHistories": [ //家族病床史
          {
            "startTime": "", //入院时间
            "endTime": "", //出院时间
            "reason": "", // 原因
            "nameOfMedicalInstitution": "", //医疗机构名称
            "medicalRecordNumber": "" //病案号
          }
        ],
        "medicationSituation": { //主要用药情况
          "medicationName": "", //药物名称
          "usage": "", //用法
          "consumption": "",//用量
          "medicationTime": "",//用药时间
          "medicationCompliance": ["1"
            //服药依从性
          ]
        },
        "vaccinationHistory": { //非免疫规划预防接种史
          "name": "", //名称
          "time": "", //接种日期
          "institution": "" //接种机构
        }
      },
      evaluationGuide:{
      }//评价指导
    }
  },
  methods:{
  	changetab:function(tex){
  		var vm = this;
			if(tex!='one'&&tex!='two'&&tex!='three'&&tex!='four'&&tex!='five' && tex!='six' && tex!='seven'){
				vm.construction();
			}else{
	  			vm.tabindex = tex;
	  	}
  	},
  	getpreserve(id){
  		var vm = this;
  		let checkId = getURLParameter('id') || sessionStorage.getItem('id')||id;
  		let params = {
				checkId: checkId
			}
			let symptomList = [],personId = getURLParameter('personId') || sessionStorage.getItem('personId') || 'mcs9352f873e0974feb9eb0b69ff447e640';
			let padDeviceCode = sessionStorage.getItem('padCode') || 'P1'
			let params1 = {
					personId:personId,
					padDeviceCode:padDeviceCode
				}
				readPatientMsg(params1).then(data=>{
					vm.patientAge=data.patientAge;
				})
			if(!checkId&&!empty(id)){
				return
			}
			queryHealthyCheckDetail(params).then(data=>{
				vm.physicalExamTableId = data.result.physicalExamTableId;
				vm.generalSituation = data.result.generalSituation;
				vm.lifelist = data.result.lifestyle;
				vm.organFunction = data.result.organFunction;
				vm.examinationList = data.result.checkBody;
				vm.code = data.result.code.slice(0,3)+'-'+data.result.code.slice(3,8);
				// console.log(vm.code);
        vm.auxiliaryExamination = data.result.auxiliaryInspection;
        vm.diseaseTreatment=data.result.diseaseTreatment;
        vm.evaluationGuide=data.result.evaluationGuide;
			})
  	},
  	changecompile:function(){
  		var vm = this;
  		vm.$refs.normal.sendData();
  		vm.$refs.OrganFunction.sendData();
  		vm.$refs.examination.saveDate();
     	vm.$refs.auxiliary.saveDate();
      vm.$refs.diseaseTreatment.saveDate();
      vm.$refs.evaluationGuide.saveDate();
  		let personId=getURLParameter('personId') || sessionStorage.getItem('personId') || 'mcs9352f873e0974feb9eb0b69ff447e640';
  		console.log((!!vm.generalSituation.bloodPressure_Diastolic_Right&&!!vm.generalSituation.bloodPressure_Systolic_Right)+'--'+(!vm.generalSituation.bloodPressure_Diastolic_Right&&!vm.generalSituation.bloodPressure_Systolic_Right))
  		let healthyCheckDto ={},reExp=/^\w+(\/\w+)*$/;
  		if(!((!!vm.generalSituation.bloodPressure_Diastolic_Left&&!!vm.generalSituation.bloodPressure_Systolic_Left)||(!vm.generalSituation.bloodPressure_Diastolic_Left&&!vm.generalSituation.bloodPressure_Systolic_Left))){
  			vm.showtoast('左侧血压请填写完整');
  			return
  		}
  		if(!((!!vm.generalSituation.bloodPressure_Diastolic_Right&&!!vm.generalSituation.bloodPressure_Systolic_Right)||(!vm.generalSituation.bloodPressure_Diastolic_Right&&!vm.generalSituation.bloodPressure_Systolic_Right))){
  			vm.showtoast('右侧血压请填写完整');
  			return
  		}
  		healthyCheckDto.physicalExamTableId = vm.physicalExamTableId;
  		healthyCheckDto.generalSituation = vm.generalSituation;
  		healthyCheckDto.organFunction = vm.organFunction;
  		console.log(healthyCheckDto.organFunction)
  		healthyCheckDto.lifestyle = sessionStorage.getItem('lifestyledata')?JSON.parse(sessionStorage.getItem('lifestyledata')):vm.lifelist;
      healthyCheckDto.checkBody=sessionStorage.getItem('CheckBodyListDate')?JSON.parse(sessionStorage.getItem('CheckBodyListDate')):vm.examinationList;
      healthyCheckDto.auxiliaryInspection=sessionStorage.getItem('AccessoryDate')?JSON.parse(sessionStorage.getItem('AccessoryDate')):vm.auxiliaryExamination;
      healthyCheckDto.diseaseTreatment=sessionStorage.getItem('diseaseTreatmentDate')?JSON.parse(sessionStorage.getItem('diseaseTreatmentDate')):vm.diseaseTreatment;
      healthyCheckDto.evaluationGuide=sessionStorage.getItem('evaluationGuideDate')?JSON.parse(sessionStorage.getItem('evaluationGuideDate')):vm.evaluationGuide;
  		let params = {
  			personId:personId,
  			healthyCheckDto:healthyCheckDto
  		}
			updateHealthyCheck(params).then(data=>{
				vm.showtoast('保存成功');
				vm.getpreserve(data.physicalExamTableId);
				vm.iscompile = true;
			})
  	},
  	compilebtn:function(){
  		var vm = this;
  		vm.iscompile = false;
  	},
  	sendData(data){
//		console.log(data)
  		let vm = this;
  		vm.physicalExamTableId = data[0]
  		vm.generalSituation = data[1]
  	},
  	sendOrganFunction(data){
  		let vm = this;
  		vm.organFunction=data;
  		console.log(data)
  	},
  	cancle(){
  		window.location.href = './healthList.html'
  	}
  },
  components:{
  	normal,
  	entrails,
  	entrailsView,
    lifestyle,
    normalView,
    examination,
    examinationShow,
    lifestyleshow,
    auxiliary,
    auxiliaryShow,
    ProblemTreatment,
    ProblemTreatmentShow,
    panel,
    panelShow
  },
  created () {
  		let vm = this;
			let checkId = getURLParameter('id') || sessionStorage.getItem('id');
			if(!empty(checkId)){
				vm.iscompile=true;
			}else{
				vm.iscompile=false;
				sessionStorage.removeItem('lifestyledata');
				sessionStorage.removeItem('CheckBodyListDate');
        sessionStorage.removeItem('AccessoryDate');
			}
			vm.getpreserve();
  },
  mounted(){
//		window.onresize = () => {
//				return(() => {
//					if(document.activeElement.tagName === 'INPUT'){
//				        document.activeElement.scrollIntoView({behavior: "smooth"})
//				    }
//				})()
//			}
  }
}
</script>
<style lang="scss"  type="text/css">
	.healthForm{
		font-size: 0.28rem;
		height: calc(100% - 70px);
	}
	/*通用样式*/
	input{
		outline: none;
		border: 1px solid #eee;
	}
	.healthForm-content-head{
		padding: 15px 30px;
		border-bottom: 1px solid #eee;
	}
	.healthForm-content-head>div{
		display: inline-block;
		width: 50%;
	}
	.content-head-left>span:nth-child(2){
		color: #999;
		margin-left: 10px;
	}
	.content-head-right>p{
		display: inline-block;
		vertical-align: middle;
	}
	.content-head-right>p:nth-child(1){
		margin-right: 10px;
	}
	.content-head-right{
		text-align: right;
	}
	.content-head-right img{
		width: .5rem;
		height: .5rem;
		vertical-align: middle;
		margin-right: 10px;
	}
	.content-head-right span{
		vertical-align: middle;
	}
	.healthForm-content-bottom{
		padding: 15px 30px;
	}
	.healthForm-content-bottom>div{
		display: inline-block;
		vertical-align: text-top;
	}
	.healthForm-content-left{
		width: 9%;
	}
	.healthForm-content-left>div{
		margin-bottom: 8px;
		text-align: right;
	}
	.healthForm-content-left>div span{
		display: inline-block;
    background: #F2F2F2;
    width: 100%;
    text-align: center;
    padding: 6px 0;
    border-radius: 15% 0 0 15%;
    color: #999;
	}
	.healthForm-content-left>div.on span{
		background:rgba(60,155,255,0.1) !important;
		color: #3C9BFF;
	}
	.healthForm-content-right{
		width: 91%;
		border: 1px solid #eee;
		box-sizing: border-box;
		max-height: 88vh;
		overflow: auto;
	}
	/*通用结束*/
	.healthForm-three{
		    height: 87vh;
    overflow: scroll;
	}
	/*健康体检表生活方式模块样式--head*/

	/*健康体检表生活方式模块--head*/
	
</style>
