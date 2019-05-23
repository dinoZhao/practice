<template>

  <div class="healthhome">
  		<div class="tab-button">
		<div class="button-normal":class="tabButtonIndex==0?'active':''" data-index="0" @click="changeTabButton" >
			全部
		</div>
		<div class="button-normal" :class="tabButtonIndex==1?'active':''" data-index="1" @click="changeTabButton">
			高血压
		</div>
		<div class="button-normal" :class="tabButtonIndex==2?'active':''" data-index="2" @click="changeTabButton">
			血脂异常
		</div>
		<div class="button-normal" :class="tabButtonIndex==3?'active':''" data-index="3" @click="changeTabButton">
			糖尿病
		</div>
		<div class="button-normal" :class="tabButtonIndex==4?'active':''" data-index="4" @click="changeTabButton">
			脑血管病
		</div>
		<div class="button-normal" :class="tabButtonIndex==5?'active':''" data-index="5" @click="changeTabButton">
			冠心病
		</div>
		<div class="button-normal" :class="tabButtonIndex==6?'active':''" data-index="6" @click="changeTabButton">
			心律失常
		</div>
	</div>
  	<headline headtxt="健康档案" none=""></headline>
      <div class="namesearchbox">
        <namesearch :AllPatients='AllPatients' :regularAllPatients="regularAllPatients"  v-on:sendPersonId = "changePerson($event)"></namesearch>
      </div>
     <div class="healthhome-information">
       <informationbox :patientInfo = "patientInfo"></informationbox>
     </div>
     <div class="togglebox">
       <toggle :togglearr='togglearr' v-on:toggling='totoggle'></toggle>
     </div>
     <div class="healthdatabox" v-if='comindex===0?true:false'>
       <healthdata :healthInfo="healthInfo"></healthdata>
     </div>
     <div class="medicalrecordsbox" v-if='comindex===1?true:false'>
       <medicalrecords :medicalRecord="medicalRecord" :medicalRecordType="medicalRecordType"></medicalrecords>
     </div>
     <div class="medicalreportbox" v-if='comindex===2?true:false'>
       <medicalreport :examReport="examReport" :examReportType="examReportType"></medicalreport>
     </div>
     <div class="medicalHistory" v-if='comindex===3?true:false'>
       <medicalHistory :medicalHistory="medicalHistory"></medicalHistory>
     </div>
     <div class="siblingHistory" v-if='comindex===4?true:false'>
       <siblingHistory :familyHistory="familyHistory"></siblingHistory>
     </div>
     <img src="../../../assets/historyskip.png" alt="" class="historyskip" @click="historyskip">
  </div>
</template>
<script>
import headline from 'components/headline/headline.vue'
import namesearch from 'components/namesearch/namesearch.vue'
import informationbox from 'components/informationbox/informationbox.vue'
import toggle from 'components/toggle/toggle.vue'
import {getAllPatients,getSinglePatients} from 'API/requst'
import {dateFormat} from 'utils/util'
//const healthdata=()=>import('components/healthdata/healthdata.vue')
//const medicalrecords=()=>import('components/MedicalRecords/MedicalRecords')
//const medicalreport=()=>import('components/MedicalReport/MedicalReport')
//const medicalHistory=()=>import('components/medicalHistory/medicalHistory')
//const siblingHistory=()=>import('components/siblingHistory/siblingHistory')
import healthdata from 'components/healthdata/healthdata.vue'
import medicalrecords from 'components/MedicalRecords/MedicalRecords'
import medicalreport from 'components/MedicalReport/MedicalReport'
import medicalHistory from 'components/medicalHistory/medicalHistory'
import siblingHistory from 'components/siblingHistory/siblingHistory'

export default {
  name: 'detailInfo',
  data () {
    return {
      togglearr:['健康数据','病历记录','体检报告','既往病史','家族史'],
      AllPatients:[
     
    ],//查询到的所有患者信息
    regularAllPatients:[],
    patientInfo:{},//患者详细信息
    healthInfo:{},//健康数据详细信息
    examReport:{},//病例数据详细信息
    examReportType:true,
    medicalRecordType:false,
    tabButtonIndex:0,
    medicalRecord:{},
    medicalHistory:{},
    familyHistory:{},
    personId:'',
    comindex:0,
    padcode:''
    }
  },
  methods:{
    totoggle(index){
      this.comindex=index;
    },
    changePerson(event){
    var vm = this;
    console.log(event);
    getSinglePatients({personId:event}).then(data=>{  	
    console.log(data);
    let {sex,phone,age,name,idNumber,headUrl} = data;
    let {healthData} = data;
    let {examReport} = data;
    let {medicalRecord} = data;
    let {medicalHistory} = data;
    let {familyHistory} = data;
    vm.patientInfo = {'sex':parseInt(sex)===1?'男':'女','phone':phone,'age':age,'name':name,'idNumber':idNumber,'headUrl':headUrl}
    vm.healthInfo = healthData;
    examReport.map(function(item){
    	item.treatmentTime = dateFormat(item.treatmentTime,'Y-m-d')
    })
    vm.examReport = examReport;
    medicalRecord.map(function(item){
    	item.achiveTime = dateFormat(item.achiveTime,'Y-m-d')
    })
    vm.medicalRecord = medicalRecord;
//  medicalHistory.map(function(item){
//  	console.log(item.status);
//  	item.status = Boolean(item.status);
//  	console.log(item.status+'0000');
//  })
    vm.familyHistory = familyHistory;
    vm.medicalHistory = medicalHistory;
    vm.personId = event;
    console.log(vm.patientInfo);
   })
    	
    },
    changeTabButton(event){
	let vm = this;
	vm.tabButtonIndex = event.target.dataset.index;
			},
    historyskip(){
    	window.location.href="../healthrecord/historyRecord.html?personId="+this.personId
    }
  },
  components:{
    headline,
    namesearch,
    informationbox,
    toggle,
    healthdata,
    medicalrecords,
    medicalreport,
    medicalHistory,
    siblingHistory
  },
  created () {
  	var vm = this;
		try {
			var padcode = window.android.getPadCode();
	  	vm.padcode = padcode;
		} catch(err) {
			console.log(err);
		}
  },
  mounted(){
  	var vm = this;
  	  let params = {
  		deviceId:vm.padcode||sessionStorage.getItem('padcode'),
  		serialNo:'00000',
  		hospitalCode:'FuCongKJXZ'
  	}
  	let AllPatients = [];
  	let transfer = [];
    getAllPatients(params).then(data=>{  	
   	AllPatients = data.result||'';
	vm.regularAllPatients=Object.assign({},AllPatients);
	AllPatients.map(function(item){
		Object.keys(item).forEach(function(key){
		item[key].map(function(SubItem){
			transfer.push(SubItem);
		})
		})
	})
//	console.log(transfer);
   	vm.AllPatients = transfer;
   	vm.changePerson(transfer[0].personId)
// 	console.log(AllPatients);
   })
  }
}
</script>
<style scoped>
  body{
 /* 	overflow: hidden;*/
  }
  .healthhome{
    overflow: hidden;
    position: relative;
    top: 80px;
  }
  .healthhome-information{
    width: 100%;
  }
  .namesearchbox{
    float: left;
  }
  .togglebox{
     overflow: hidden;
  }
  .healthdatabox{
    overflow: hidden;
    overflow-y: scroll;
    height: 31vw;
    padding-bottom: 2px;
  }
  .medicalrecordsbox,.medicalreportbox{
    overflow: hidden;
    padding-left: 0.5rem;
  }
  .historyskip{
    position: absolute;
    width:2rem;
    bottom:0.5rem;
    right:0;
    z-index: 100;
  }
  .siblingHistory{
  	overflow: hidden;
  }
  		.tab-button{
			width: 100%;
			height: 5vw;
			margin: 0 auto;
			line-height: 5vw;
			margin: 0.25rem 0;
			color:#3c9bff ;
			
		}
		.button-normal {
				display: inline-block !important;
				font-size: .3rem;
				width: 11%;
				margin: 0 .2rem;
				border: solid 2px #3c9bff;
				/*color: #3c9bff;*/
				text-align: center;
				border-radius: 15px;
				line-height: 0.7rem;
			}
		.active{
			background-color: #3C9BFF;
			color: white !important;
		}
</style>
