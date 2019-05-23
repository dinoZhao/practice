<template>
  <div id="ProblemTreatment">
    <div class="ProblemTreatment_content">
      <div class="title_top"><span>现存主要健康问题</span></div>
      <div class="title">
        <i class="lineleft"></i>
        <span>脑血管疾病</span>
      </div>
      <div class="radio_content">
        <div class="habits" v-for="item in diseasesList" @click.stop="changeCheck(item.code,diseasesList,'cerebralVascularDisease')" :key="item.code"
        >
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
        <div class="habits habites">
          <span>其他</span>
          <input type="text" v-model="diseaseTreatmentList['cerebralVascularDisease'].other" placeholder="请输入">
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>肾脏疾病</span>
      </div>
      <div class="radio_content">
        <div class="habits" v-for="item of kidneyDiseaseList" @click.stop="changeCheck(item.code,kidneyDiseaseList,'kidneyDisease')" :key="item.code">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
        <div class="habits habites">
          <span>其他</span>
          <input type="text" v-model="diseaseTreatmentList['kidneyDisease'].other" placeholder="请输入">
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>心脏疾病</span>
      </div>
      <div class="radio_content content_small">
        <div class="habits" v-for="item of heartDiseaseList" @click.stop="changeCheck(item.code,heartDiseaseList,'heartDisease')">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
        <div class="habits habites">
          <span>其他</span>
          <input type="text" v-model="diseaseTreatmentList['heartDisease'].other" placeholder="请输入">
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>血管疾病</span>
      </div>
      <div class="radio_content">
        <div class="habits" v-for="item of vascularDiseaseList" @click.stop="changeCheck(item.code,vascularDiseaseList,'vascularDisease')">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
        <div class="habits habites">
          <span>其他</span>
          <input type="text" v-model="diseaseTreatmentList['vascularDisease'].other" placeholder="请输入">
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>眼部疾病</span>
      </div>
      <div class="radio_content content_small">
        <div class="habits" v-for="item of eyeDiseaseList" @click.stop="changeCheck(item.code,eyeDiseaseList,'eyeDisease')">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
        <div class="habits habites">
          <span>其他</span>
          <input type="text" v-model="diseaseTreatmentList['eyeDisease'].other" placeholder="请输入">
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>神经系统疾病</span>
      </div>
      <div class="radio_content content_small">
        <div class="habits" v-for="item of neurologicalDiseasesList" @click.stop="singleCheck(item.code,neurologicalDiseasesList,'neurologicalDiseases')">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>其他系统疾病</span>
      </div>
      <div class="radio_content content_small">
        <div class="habits" v-for="item of otherSystemicDiseasesList" @click.stop="singleCheck(item.code,otherSystemicDiseasesList,'otherSystemicDiseases')">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')"
               alt=""><span>{{item.type}}</span>
        </div>
      </div>
      <div class="title_top hospitalization"><span>住院治疗情况</span></div>
        <div class="hospital_content">
      <div class="title">
        <i class="lineleft"></i>
        <span>住院史</span>
      </div>
      <template v-for="(item,index) in hospitalizations">
	      <div class="data">
	        <span>入/出院日期</span>
	        <date-picker :date="item.startTime" :option="optionOne" :limit="limit" class="normal" @change="changeheptime('start')"></date-picker>
	        <span class="line">-</span>
	        <date-picker :date="item.endTime" :option="optionTwo" :limit="limit" class="normal" @change="changeheptime('end')" style="margin: 0"></date-picker>
	      </div>
	      <div class="reason">
	      <span>原因</span>
	        <textarea placeholder="请输入原因" class="big" v-model="item.reason" @change="familyhis('hospital')">
	      </textarea>
	    </div>
	      <div class="reason">
	        <span class="name" style="width: 17%;position: relative;left: -4%;text-align: right;">医疗机构名称</span>
	        <input type="text" v-model="item.nameOfMedicalInstitution" placeholder="请输入医疗机构名称"
                 style="position: relative;left: -5%;" @change="familyhis('hospital')">
	      </div>
	      <div class="reason">
	        <span class="name">病案号</span>
	        <input type="tel" v-model="item.medicalRecordNumber" placeholder="请输入病案号" @change="familyhis('hospital')">
	      </div>
      </template>
      <div class="add"><span>+</span><span>添加</span></div>
        </div>
        <div class="hospital_content">
          <div class="title">
            <i class="lineleft"></i>
            <span>家族病床史</span>
          </div>
          <template v-for="(item,index) in sickbedHistories">
          	<div class="data">
	            <span>建/撤床日期</span>
	            <date-picker :date="item.startTime" :option="optionThree" :limit="limit" class="normal" @change="changestartTime('start')"></date-picker>
	            <span class="line">-</span>
	            <date-picker :date="item.endTime" :option="optionFour" :limit="limit" class="normal" @change="changestartTime('end')" style="margin: 0"></date-picker>
	          </div>
	          <div class="reason">
	            <span>原因</span>
	            <textarea placeholder="请输入原因" class="big" v-model="item.reason" @change="familyhis('family')"></textarea>
	          </div>
	          <div class="reason">
	            <span class="name" style="width: 17%;position: relative;left: -4%;text-align: right;">医疗机构名称</span>
	            <input type="text" v-model="item.nameOfMedicalInstitution" placeholder="请输入医疗机构名称" style="position: relative;left: -5%;" @change="familyhis('family')">
	          </div>
	          <div class="reason">
	            <span class="name">病案号</span>
	            <input type="tel" v-model="item.medicalRecordNumber" placeholder="请输入病案号" @change="familyhis('family')">
	          </div>
          </template>
          <div class="add"><span>+</span><span>添加</span></div>
        </div>
      <div class="title_top hospitalization"><span>主要用药情况</span></div>
      <div class="input_content">
        <div class="content">
          <span>药物名称</span>
          <input type="text" placeholder="请输入" v-model="diseaseTreatmentList['medicationSituation'].medicationName">
        </div>
        <div class="content">
          <span>用法</span>
          <input type="tel" placeholder="请输入" v-model="diseaseTreatmentList['medicationSituation'].usage">
          <span class="time">次/日</span>
        </div>
      </div>
      <div class="input_content">
        <div class="content">
          <span>用量</span>
          <input type="text" placeholder="请输入" v-model="diseaseTreatmentList['medicationSituation'].consumption">
        </div>
        <div class="content">
          <span>用药时间</span>
          <input type="tel" placeholder="请输入" v-model="diseaseTreatmentList['medicationSituation'].medicationTime">
          <span class="time">天</span>
        </div>
      </div>
      <div class="button_content">
        <span>服药依从性</span>
        <input type="button" v-for="item of medicationComplianceList"  :class="{active:bCheck===item.code}" @click="checkedes(item.code)"  :value="item.type">
      </div>
      <div class="title_top nonimmune"><span>非免疫规划预防接种史</span></div>
      <div class="input_content">
        <div class="content">
          <span>名称</span>
          <input type="text" placeholder="请输入接种名称" v-if="diseaseTreatment&&diseaseTreatment['vaccinationHistory']" v-model="diseaseTreatment['vaccinationHistory'].name">
        </div>
        <div class="content">
          <span>接种日期</span>
          <date-picker :date="startTimeport" :option="optionFive" :limit="limit" class="normal" v-if="diseaseTreatment"  @change="changeTime('vaccinationHistory',startTimeport.time)"></date-picker>
        </div>
      </div>
      <div class="input_content">
        <div class="content">
          <span>接种机构</span>
          <input type="text" placeholder="请输入" v-if="diseaseTreatment&&diseaseTreatment['vaccinationHistory']" v-model="diseaseTreatment['vaccinationHistory'].institution">
        </div>
      </div>
      </div>
  </div>
</template>

<script>
	import { getURLParameter,dateFormat,empty  } from 'utils/util'
  import myDatepicker from 'vue-datepicker'
  export default {
    props: ['diseaseTreatment'],
    data() {
      return {
          startTime: {
          time: ''
        },
        endTime:{
          time: ''
        },
        startTimes: {
          time: ''
        },
        endTimes:{
          time: ''
        },
        startTimeport: {
          time: ''
        },
        sickbedHistories:[{
              "startTime": {
					          time: ''
				        }, //入院时间
              "endTime":{
					          time: ''
				        }, //出院时间
              "reason": "", // 原因
              "nameOfMedicalInstitution": "", //医疗机构名称
              "medicalRecordNumber": "" //病案号
            }],
        hospitalizations:[{
              "startTime":{
					          time: ''
				        }, //入院日期
              "endTime":{
					          time: ''
				        },  //出院日期
              "reason": "", //原因
              "nameOfMedicalInstitution": "", //医疗机构名称
              "medicalRecordNumber": "" //病案号
            }],
        optionOne: {
          type: 'day',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format: 'YYYY-MM-DD',
          placeholder: '请选择入院日期',
          inputStyle: {
            'display': 'inline-block',
            'line-height': '22px',
            'font-size': '0.28rem',
            'border': '1px solid #eee',
            'box-shadow': '0',
            'border-radius': '2px',
            'color': '#5F5F5F',
            'width': '90%!important'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true, // as true as default
        },
        optionTwo: {
          type: 'day',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format: 'YYYY-MM-DD',
          placeholder: '请选择出院日期',
          inputStyle: {
            'display': 'inline-block',

            'line-height': '12px',
            'font-size': '0.28rem',
            'border': '1px solid #eee',
            'box-shadow': '0',
            'border-radius': '2px',
            'color': '#5F5F5F',
            'width': '90%!important'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
        optionThree: {
          type: 'day',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format: 'YYYY-MM-DD',
          placeholder: '请选择建床日期',
          inputStyle: {
            'display': 'inline-block',

            'line-height': '12px',
            'font-size': '0.28rem',
            'border': '1px solid #eee',
            'box-shadow': '0',
            'border-radius': '2px',
            'color': '#5F5F5F',
            'width': '90%!important'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
        optionFour: {
          type: 'day',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format: 'YYYY-MM-DD',
          placeholder: '请选择撤床日期',
          inputStyle: {
            'display': 'inline-block',
            'line-height': '12px',
            'font-size': '0.28rem',
            'border': '1px solid #eee',
            'box-shadow': '0',
            'border-radius': '2px',
            'color': '#5F5F5F',
            'width': '90%!important'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
        optionFive: {
          type: 'day',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format: 'YYYY-MM-DD',
          placeholder: '请选择接种日期',
          inputStyle: {
            'display': 'inline-block',
            'line-height': '12px',
            'font-size': '0.28rem',
            'border': '1px solid #eee',
            'box-shadow': '0',
            'border-radius': '2px',
            'color': '#5F5F5F',
            'width': '90%!important'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
        timeoption: {
          type: 'min',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format: 'YYYY-MM-DD HH:mm'
        },
        multiOption: {
          type: 'multi-day',
          week: ['一', '二', '三', '四', '五', '六','日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format:"YYYY-MM-DD HH:mm"
        },
        limit: [],
        bCheck:'',
        checked:'',
        diseasesList: [
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '缺血性卒中', check: false},
          {code: '3', type: '脑出血', check: false},
          {code: '4', type: '蛛网膜下腔出血', check: false},
          {code: '5', type: '充血性心力衰竭', check: false},
          {code: '6', type: '短暂性脑缺血发作', check: false},
        ],
        kidneyDiseaseList: [
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '糖尿病肾病', check: false},
          {code: '3', type: '肾功能衰竭', check: false},
          {code: '4', type: '急性肾炎', check: false},
          {code: '5', type: '慢性肾炎', check: false},
        ],
        heartDiseaseList: [
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '心肌梗死', check: false},
          {code: '3', type: '心绞痛 ', check: false},
          {code: '4', type: '冠状动脉血运重建', check: false},
          {code: '5', type: '充血性心力衰竭', check: false},
          {code: '6', type: '心前区疼痛', check: false},
        ],
        vascularDiseaseList: [
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '夹层动脉瘤', check: false},
          {code: '3', type: '动脉闭塞性疾病', check: false}
        ],
        eyeDiseaseList: [
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '视网膜出血或渗出', check: false},
          {code: '3', type: '视乳头水肿', check: false},
          {code: '4', type: '白内障', check: false}
        ],
        neurologicalDiseasesList: [
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '有', check: false},
        ],
        otherSystemicDiseasesList:[
          {code: '1', type: '未发现', check: true},
          {code: '2', type: '有', check: false},
        ],
        medicationComplianceList:[
          {code: '1', type: '规律', check: false},
          {code: '2', type: '间断', check: false},
          {code: '3', type: '不服药', check: false},
        ],

        diseaseTreatmentList: {
          "cerebralVascularDisease": { //脑血管疾病
            "diseases": [],
            "other": ""
          },
          "kidneyDisease": { //肾脏疾病
            "diseases": [],
            "other": ""
          },
          "heartDisease": { //心脏疾病
            "diseases": [],
            "other": ""
          },
          "vascularDisease": { //血管疾病
            "diseases": [],
            "other": ""
          },
          "eyeDisease": { //眼部疾病
            "diseases": [],
            "other": ""
          },
          "neurologicalDiseases": [// 神经系统疾病
          ],
          "otherSystemicDiseases": [ //其他系统疾病
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
            "medicationCompliance": [ //服药依从性
            ]
          },
          "vaccinationHistory": { //非免疫规划预防接种史
            "name": "", //名称
            "time": "", //接种日期
            "institution": "" //接种机构
          }
        },
      }
    },
    methods: {
    	changestartTime:function(tex){
    		var vm = this;
    		var sickbedHistorieslist = vm.diseaseTreatmentList.sickbedHistories;
    		var sickbedHistories = vm.sickbedHistories;
    		sickbedHistories.forEach(function(str,inde,list){
    			sickbedHistorieslist.forEach(function(item,index,arr){
    				if(inde==index){
    					if(tex=='start'&&!empty(str.endTime.time)){
    						var tim1 = new Date(str.endTime.time).getTime();
    						var tim2 = new Date(str.startTime.time).getTime();
    						if(tim1<tim2){
    							vm.showtoast('建床日期不能大于撤床日期');
    						}
    					}
    					if(tex=='end'&&!empty(str.startTime.time)){
    						var tim1 = new Date(str.endTime.time).getTime();
    						var tim2 = new Date(str.startTime.time).getTime();
    						if(tim1<tim2){
    							vm.showtoast('撤床日期不能小于建床日期');
    						}
    					}
    					item.startTime = str.startTime.time;
    					item.endTime = str.endTime.time;
    				}
    			})
    		})
    		console.log(vm.diseaseTreatmentList.sickbedHistories)
    	},
    	changeheptime:function(tex){
    		var vm = this;
    		var hospitalizationslist = vm.diseaseTreatmentList.hospitalizations;
    		var hospitalizations = vm.hospitalizations;
    		hospitalizations.forEach(function(str,inde,list){
    			hospitalizationslist.forEach(function(item,index,arr){
    				if(inde==index){
    					if(tex=='start'&&!empty(str.endTime.time)){
    						var tim1 = new Date(str.endTime.time).getTime();
    						var tim2 = new Date(str.startTime.time).getTime();
    						if(tim1<tim2){
    							vm.showtoast('入院日期不能大于出院日期');
    						}
    					}
    					if(tex=='end'&&!empty(str.startTime.time)){
    						var tim1 = new Date(str.endTime.time).getTime();
    						var tim2 = new Date(str.startTime.time).getTime();
    						if(tim1<tim2){
    							vm.showtoast('出院日期不能小于入院日期');
    						}
    					}
    					item.startTime = str.startTime.time;
    					item.endTime = str.endTime.time;
    				}
    			})
    		})
    		console.log(vm.diseaseTreatmentList.hospitalizations)
    	},
    	familyhis:function(tex){
    		var vm = this;
    		var hospitalizationslist = tex=='hospital'?vm.diseaseTreatmentList.hospitalizations:vm.diseaseTreatmentList.sickbedHistories;
    		var hospitalizations = tex=='hospital'?vm.hospitalizations:vm.sickbedHistories;
    		hospitalizations.forEach(function(str,inde,list){
    			hospitalizationslist.forEach(function(item,index,arr){
    				if(inde==index){
    					item.reason = str.reason;
    					item.nameOfMedicalInstitution = str.nameOfMedicalInstitution;
    					item.medicalRecordNumber = str.medicalRecordNumber;
    				}
    			})
    		})
    	},
      changeTime (type,name,time){
      	var vm = this;
      	var vaccinationHistory = vm.diseaseTreatmentList.vaccinationHistory;
    		vaccinationHistory.time = vm.startTimeport.time;
      },
      checkedes (code){
        this.bCheck=code
        let arr=this.diseaseTreatmentList['medicationSituation'].medicationCompliance;
        arr = [];
        this.medicationComplianceList.forEach(item=>{
          if(this.bCheck===item.code){
            item.check=true
            if(item.check){
             arr=[code];
            }
          }else{
            item.check=false
            
          }
        })
        this.diseaseTreatmentList['medicationSituation'].medicationCompliance = arr;
      },
      singleCheck (code,diseasesList,type){
        let arr=this.diseaseTreatmentList[type];
        this.checked=code;
        arr = [];
        diseasesList.forEach(item=>{
          if(item.code===code){
            item.check=true
          	arr=[code];
          }else{
            item.check=false
            
          }
        })
        this.diseaseTreatmentList[type] = arr;
        console.log(this.diseaseTreatmentList[type])
      },
      changeCheck(code,diseasesList,type) {
        let arr=this.diseaseTreatmentList[type].diseases
        diseasesList.forEach(item=>{
          if(code!=1){
            diseasesList[0].check=false
            if(item.code==code){
              item.check=!item.check
              if(item.check){
                arr.push(code)
              }else{
                arr.forEach(function(str,index){
                  if(str==code){
                    arr.splice(index,1);
                  }
                })
              }
            }
            arr.forEach(function(str,index,ar){
							if(str=='1'){
			  				arr.splice(index,1);
							}
							
						})
          }else{
            diseasesList[0].check=true
            arr = ['1'];
            diseasesList.map(item=>{
              if(item.code!=1){
                item.check=false
              }
            })
          }
        })
       this.diseaseTreatmentList[type].diseases = arr;
       console.log(arr)
      },
      // kidneychangeCheck(code) {
      //   if(code!=1){
      //     this.kidneyDiseaseList[0].check=false
      //   }else{
      //     this.kidneyDiseaseList.map(item=>{
      //       if(item.code!=1){
      //         item.check=false
      //       }
      //     })
      //   }
      // },
      saveDate() {
        return sessionStorage.setItem('diseaseTreatmentDate', JSON.stringify(this.diseaseTreatmentList));
      },
      getexamination: function () {
        var vm = this;
        var result = this.diseaseTreatment;
        var subdata = vm.diseaseTreatmentList;
        if (!empty(result)) {
          Object.keys(result).forEach(function (keystr, index) {
            Object.keys(subdata).forEach(function (key) {
              if (keystr == key) {
                if (!empty(result[keystr])) {
                  subdata[key] = result[keystr];
                }
              }
            });
          });
          var _symptom = result.cerebralVascularDisease.diseases;
					var _diseasesList = vm.diseasesList;
					if(!empty(_symptom)){
						_diseasesList.forEach(function(item,index,arr){
							if(_symptom.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var _kidneyDiseaseList = vm.kidneyDiseaseList;
					var _symptom2 = result.kidneyDisease.diseases;
					if(!empty(_symptom2)){
						_kidneyDiseaseList.forEach(function(item,index,arr){
							if(_symptom2.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var _heartDiseaseList = vm.heartDiseaseList;
					var _symptom3 = result.heartDisease.diseases;
					if(!empty(_symptom3)){
						_heartDiseaseList.forEach(function(item,index,arr){
							if(_symptom3.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var _vascularDiseaseList = vm.vascularDiseaseList;
					var _symptom4 = result.vascularDisease.diseases;
					if(!empty(_symptom4)){
						_vascularDiseaseList.forEach(function(item,index,arr){
							if(_symptom4.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var _eyeDiseaseList = vm.eyeDiseaseList;
					var _symptom5 = result.eyeDisease.diseases;
					if(!empty(_symptom5)){
						_eyeDiseaseList.forEach(function(item,index,arr){
							if(_symptom5.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var _neurologicalDiseasesList = vm.neurologicalDiseasesList;
					var _symptom6 = result.neurologicalDiseases;
					if(!empty(_symptom6)){
						_neurologicalDiseasesList.forEach(function(item,index,arr){
							if(_symptom6.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var _otherSystemicDiseasesList = vm.otherSystemicDiseasesList;
					var _symptom6 = result.otherSystemicDiseases;
					if(!empty(_symptom6)){
						_otherSystemicDiseasesList.forEach(function(item,index,arr){
							if(_symptom6.includes(item.code)){
								item.check = true;
							}else{
								item.check = false;
							}
						})
					}
					var sickbedHistorieslist = vm.diseaseTreatmentList.sickbedHistories;
    			var sickbedHistories = vm.sickbedHistories;
    			sickbedHistories.forEach(function(str,inde,list){
	    			sickbedHistorieslist.forEach(function(item,index,arr){
	    				if(inde==index){
	    					str.startTime.time = item.startTime;
	    					str.endTime.time = item.endTime;
	    					str.reason = item.reason;
	    					str.nameOfMedicalInstitution = item.nameOfMedicalInstitution;
	    					str.medicalRecordNumber = item.medicalRecordNumber;
	    				}
	    			})
	    		})
    			console.log(vm.sickbedHistories)
    			var hospitalizationslist = vm.diseaseTreatmentList.hospitalizations;
	    		var hospitalizations = vm.hospitalizations;
	    		hospitalizations.forEach(function(str,inde,list){
	    			hospitalizationslist.forEach(function(item,index,arr){
	    				if(inde==index){
	    					str.startTime.time = item.startTime;
	    					str.endTime.time = item.endTime;
	    					str.reason = item.reason;
	    					str.nameOfMedicalInstitution = item.nameOfMedicalInstitution;
	    					str.medicalRecordNumber = item.medicalRecordNumber;
	    				}
	    			})
	    		})
	    		vm.bCheck =result.medicationSituation.medicationCompliance[0];
        }
      }
    },
    components:{
      'date-picker': myDatepicker
    },
    created(){
      var vm = this;
      var myDate = new Date();
  		var timer = dateFormat(myDate.getTime(),'Y-m-d');
  		console.log(timer)
  		vm.limit = [{
          type: 'weekday',
          available: [0,1, 2, 3, 4, 5,6]
        },
          {
            type: 'fromto',
            from: '1949-04-02',
            to: timer
          }]
      // console.log(this.examinationList);
      vm.getexamination();
      console.log(new Date().getDate());
      //vm.CheckBodyList=this.examinationList;
    }
  }
</script>

<style lang="less">
  #ProblemTreatment {
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    .ProblemTreatment_content {
      width: 96%;
      padding: 0.3rem 2% 0.3rem;
      span {
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
      }
      .normal{
        width: 19vw;
        height: 0.6rem;
        border: 1px solid #eee;
        border-radius: 10px;
        line-height: 0.6rem;
        input{
          border: none!important;
          font-size: 0.28rem!important;
        }
      }
      input {
        width: 19vw;
        height: 0.6rem;
        font-size: 0.28rem;
        padding-left: 15px;
        border: 1px solid #eee;
        border-radius: 10px;
        margin-left: 1.6%;
        outline: none;
        color: #666;
        box-sizing: border-box;
      }
      .title_top {
        width: 14.4vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        span {
          color: #3C9BFf;
        }
      }
      .hospitalization {
        width: 12vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        margin-top: .3rem;
        span {
          color: #3C9BFf;
        }
      }
      .title {
        margin-top: 0.28rem;
        .lineleft {
          display: inline-block;
          vertical-align: middle;
          width: 0.04rem;
          height: 0.3rem;
          background: #3C9BFF;
        }
        span {
          vertical-align: middle;
          margin-left: 0.05rem;
        }
      }
      .radio_content {
        overflow: auto;
        position: relative;
        .habits {
          float: left;
          margin-right: 30px;
          margin-top: 0.3rem;
          span {
            vertical-align: middle;
          }
          img {
            width: 0.5rem;
            height: 0.5rem;
            vertical-align: middle;
            margin-right: 10px;
          }
          input {
            vertical-align: middle;
          }
        }
        .habites {
          width: 42%;
          position: relative;
          top: -4px;
        }
      }
      .content_small {
        width: 80%;
      }
      .data{
        margin-left: .1rem;
        span.line{
          width: .5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          display: inline-block;
          font-size: .4rem;
        }
        }
      .reason{
        margin-top: 0.28rem;
        span{
          vertical-align: top;
          display: inline-block;
          width: 13%;
          text-align: right;
          height: 1.1rem;
          &.name{
            height: 0.6rem;
            line-height: 0.6rem;
          }
        }
        textarea.big{
          width: 80%;
          height: 1.1rem;
          border: 1px solid #eee;
          text-indent: 2%;
          font-size: 0.28rem;
          border-radius: 0.1rem;
          color: #333;
          margin-left: 1.6%;
          position: relative;
          left: -1%;
        }
        input{
          width: 80.5%;
          position: relative;
          left: -1%;
        }
      }
      .add{
        margin-top: 0.28rem;
        margin-left: 14%;
        span{
          color: #3C9BFF;
          &:nth-child(1){
            font-size: 0.36rem;
          }
        }
      }
      .hospital_content{
        width: 100%;
        padding-bottom: 0.28rem;
        border-bottom: 1px solid #EEEEEE;
      }
      .input_content{
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.28rem;
        .content{
          width: 50%;
          position: relative;
          span{
            display: inline-block;
            width: 9vw;
            text-align: right;
            &.time{
              position: absolute;
              top: 20%;
              left: 60%;
            }
          }
        }
      }
      .button_content{
        margin-top: 0.28rem;
        width: 100%;
        span{
          width: 9vw;
          text-align: right;
          vertical-align: middle;
          display: inline-block;
        }
          input[type='button']{
            height: 0.6rem;
            display: inline-block;
            line-height: 0.6rem;
            border: 1px solid #3C9BFF;
            font-size: 0.26rem;
            border-radius: 0.1rem;
            color: #3C9BFF;
            background-color: #FFFFFF;
            width: 1.5rem;
            margin-right: 1.6%;
            vertical-align: middle;
            outline: none;
            padding: 0;
            position: relative;
            left: -1%;
            &.active{
              background-color: #3C9BFF;
              color: #FFFFFF;
            }
        }
      }
      .nonimmune{
        width: 18vw;
        margin-top: 0.28rem;
      }
      }
    }
</style>
