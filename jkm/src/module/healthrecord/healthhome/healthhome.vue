<template>
	
  <div class="healthhome"> 
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
       <medicalreport :examReport="examReport" :examReportType="examReportType" @sendRecordId="changeRecordId"></medicalreport>
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
  name: 'healthhome',
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
    medicalRecord:{},
    medicalRecordId:'',   //病例id
    medicalHistory:{},
    familyHistory:{},
    personId:'',
      comindex:0
    }
  },
  methods:{
    totoggle(index){
      this.comindex=index;
    },
    changePerson(event){
    var vm = this;
    // console.log(event);
    getSinglePatients({personId:event}).then(data=>{  	
    // console.log(data);
    let {sex,phone,age,name,idNumber,headUrl} = data;
    let {healthData} = data;
    let {examReport} = data;
    let {medicalRecord} = data;
    let {medicalHistory} = data;
    let {familyHistory} = data;
    vm.patientInfo = {'sex':parseInt(sex)===0?'女':'男','phone':phone,'age':age,'name':name,'idNumber':idNumber,'headUrl':headUrl}
    console.log(vm.patientInfo +parseInt(sex) );
//  for(var prop in healthData){
//  	if(healthData[prop]===''){
//  		healthData = {}
//  	}
//  }
//  console.log(healthData);
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
    // console.log(vm.patientInfo);
   })
    	
    },
    historyskip(){
    	window.location.href="../healthrecord/historyRecord.html?personId="+this.personId
    },
    changeRecordId(recordId){
      // console.log(recordId)
      this.medicalRecordId = recordId
      window.location.href='../physical/report.html?recordId='+recordId+'&personId='+this.personId
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

  },
  mounted(){
  	var vm = this;
  	  let params = {
  		deviceId:'P1',
  		serialNo:'00000',
  		hospitalCode:'FuCongKJXZ'
  	}
  	let AllPatients = [];
  	let transfer = [];
    getAllPatients(params).then(data=>{  	
   	AllPatients = data.result||'';
// 	console.log(AllPatients);
	vm.regularAllPatients=Object.assign({},AllPatients);
	AllPatients.map(function(item){
		Object.keys(item).forEach(function(key){
		item[key].map(function(SubItem){
			SubItem.group = key;
			transfer.push(SubItem);
		})
		})
	})
	console.log(transfer);
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
    top: 1vw;
  }
  .healthhome-information{
    width: 100%;
    
  }
  .namesearchbox{
    float: left;
    margin-top: 4vw;
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
</style>
