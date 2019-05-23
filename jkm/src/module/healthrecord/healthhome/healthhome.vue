<template>
  <div class="healthhome">
    <!--<headTop></headTop>-->
    <div class="fornative">
      <div class="namesearchbox" :class="allPatientButton?'show':'hide'">
        <namesearch
          :AllPatients="AllPatients"
          :regularAllPatients="regularAllPatients"
          v-on:sendPersonId="changePerson($event)"
        ></namesearch>
      </div>
      <div class="healthhome-information">
        <informationbox :patientInfo="patientInfo"></informationbox>
      </div>
      <div class="togglebox">
        <toggle :togglearr="togglearr" v-on:toggling="totoggle"></toggle>
      </div>
      <div class="healthdatabox" v-if="comindex===0?true:false">
        <healthdata :healthInfo="healthInfo"></healthdata>
      </div>
      <div class="medicalrecordsbox" v-if="comindex===1?true:false">
        <medicalrecords :medicalRecord="medicalRecord" :medicalRecordType="medicalRecordType"></medicalrecords>
      </div>
      <div class="medicalreportbox" v-if="comindex===2?true:false">
        <medicalreport
          :examReport="examReport"
          :examReportType="examReportType"
          @sendRecordId="changeRecordId"
        ></medicalreport>
      </div>
      <div class="medicalHistory" v-if="comindex===3?true:false">
        <medicalHistory :medicalHistory="medicalHistory"></medicalHistory>
      </div>
      <div class="siblingHistory" v-if="comindex===4?true:false">
        <siblingHistory :familyHistory="familyHistory"></siblingHistory>
      </div>
      <img src="../../../assets/historyskip.png" alt class="historyskip" @click="historyskip" v-show="!allPatientButton">
    </div>
    <div class="all-patient" @click="showNameSearch" :class="!allPatientButton?'show':'hide'">
    	<img src="../../../assets/renshixitong.png"/><span>所有患者</span><img src="../../../assets/road-copy.png"/>
    </div>
    <div class="mask-layer" v-show="allPatientButton" @click="allPatientButton=false">
    	
    </div>
  </div>
</template>
<script>
import Viewer from "v-viewer";
import headline from "components/headline/headline.vue";
import namesearch from "components/namesearch/namesearch.vue";
import informationbox from "components/informationbox/informationbox.vue";
import headTop from "components/common/headTop.vue";
import toggle from "components/toggle/toggle.vue";
import { getAllPatients, getSinglePatients } from "API/requst";
import { dateFormat, getURLParameter } from "utils/util";
//const healthdata=()=>import('components/healthdata/healthdata.vue')
//const medicalrecords=()=>import('components/MedicalRecords/MedicalRecords')
//const medicalreport=()=>import('components/MedicalReport/MedicalReport')
//const medicalHistory=()=>import('components/medicalHistory/medicalHistory')
//const siblingHistory=()=>import('components/siblingHistory/siblingHistory')
import healthdata from "components/healthdata/healthdata.vue";
import medicalrecords from "components/MedicalRecords/MedicalRecords";
import medicalreport from "components/MedicalReport/MedicalReport";
import medicalHistory from "components/medicalHistory/medicalHistory";
import siblingHistory from "components/siblingHistory/siblingHistory";

export default {
  name: "healthhome",
  data() {
    return {
      togglearr: ["健康数据", "病历记录", "体检报告", "既往病史", "家族史"],
      AllPatients: [], //查询到的所有患者信息
      regularAllPatients: [],
      patientInfo: {}, //患者详细信息
      healthInfo: {}, //健康数据详细信息
      examReport: {}, //病例数据详细信息
      examReportType: true,
      medicalRecordType: false,
      allPatientButton:false,//所有患者按钮开关
      medicalRecord: {},
      medicalRecordId: "", //病例id
      medicalHistory: {},
      familyHistory: {},
      personId: "",
      comindex: 0,
      padcode: ""
    };
  },
  methods: {
    totoggle(index) {
      this.comindex = index;
    },
    changePerson(event) {
      var vm = this;
      vm.showLoading();
      //  console.log(event);
      sessionStorage.setItem("savePersonId", event);
      getSinglePatients({ personId: event }).then(data => {
      	vm.hideLoading();
        console.log("我赋值了" + sessionStorage.getItem("savePersonId"));
        let { sex, phone, age, name, idNumber, headUrl } = data;
        let { healthData } = data;
        let { examReport } = data;
        let { medicalRecord } = data;
        let { medicalHistory } = data;
        let { familyHistory } = data;
        vm.patientInfo = {
          sex: sex,
          phone: phone,
          age: age,
          name: name,
          idNumber: idNumber,
          headUrl: headUrl
        };
        //  console.log(vm.patientInfo +parseInt(sex) );

        vm.healthInfo = healthData;
        examReport.map(function(item) {
          item.treatmentTime = dateFormat(item.treatmentTime, "Y-m-d");
        });
        vm.examReport = examReport;
        medicalRecord.map(function(item) {
          item.achiveTime = dateFormat(item.achiveTime, "Y-m-d");
        });
        vm.medicalRecord = medicalRecord;
        vm.familyHistory = familyHistory;
        vm.medicalHistory = medicalHistory;
        vm.personId = event;
      }).catch(err=>{
	    	vm.hideLoading();
	    });
      
      vm.allPatientButton = false;
    },
    historyskip() {
      window.location.href =
        "../healthrecord/historyRecord.html?personId=" + this.personId;
    },
    changeRecordId(recordId) {
      // console.log(recordId)
      this.medicalRecordId = recordId;
      window.location.href =
        "../physical/report.html?recordId=" +
        recordId +
        "&personId=" +
        this.personId;
    },
    showNameSearch(){
    	let vm = this;
    	vm.allPatientButton = true;
    	
    }
  },
  components: {
    headline,
    namesearch,
    informationbox,
    toggle,
    healthdata,
    medicalrecords,
    medicalreport,
    medicalHistory,
    siblingHistory,
    headTop
  },
  created() {
    var vm = this;
    var personId = getURLParameter("personId");
    if (personId) {
      sessionStorage.setItem("personId", personId);
      vm.changePerson(personId);
    }
    try {
      var padcode = window.android.getPadCode();
      vm.padcode = padcode;
    } catch (err) {
      console.log(err);
    }
    //	if(sessionStorage.getItem('savePersonId')){
    //		vm.changePerson(sessionStorage.getItem('savePersonId'));
    //		sessionStorage.removeItem('savePersonId');
    //	}
  },
  mounted() {
    var vm = this;
    let params = {
      deviceId: vm.padcode || sessionStorage.getItem("padcode"),
      serialNo: "00000",
      hospitalCode: sessionStorage.getItem('hospitalCode')||'FuCongKJXZ'
    };
    let AllPatients = [];
    let transfer = [];
    getAllPatients(params).then(data => {
      AllPatients = data.result || "";
      // 	console.log(AllPatients);
      vm.regularAllPatients = Object.assign({}, AllPatients);
      AllPatients.map(function(item) {
        Object.keys(item).forEach(function(key) {
          item[key].map(function(SubItem) {
            SubItem.group = key;
            transfer.push(SubItem);
          });
        });
      });
      //	console.log(transfer);
      vm.AllPatients = transfer;
      if (sessionStorage.getItem("savePersonId")) {
        //判断是返回按钮进入该页面还是正常路由进入
        console.log("别人触发了" + sessionStorage.getItem("savePersonId"));
        vm.changePerson(sessionStorage.getItem("savePersonId"));
        sessionStorage.removeItem("savePersonId");
      } else {
        vm.changePerson(transfer[0].personId);
        console.log("我触发了" + sessionStorage.getItem("savePersonId"));
      }

      //	if(sessionStorage.getItem('savePersonId')){
      //		vm.changePerson(sessionStorage.getItem('savePersonId'));
      //		sessionStorage.removeItem('savePersonId');
      //	}
    });
  }
};
</script>
<style scoped>
body {
  /* 	overflow: hidden;*/
}
.healthhome {
  overflow: hidden;
  position: relative;
  height: 100vh;
}

.healthhome-information {
  width: calc(100% - 3.2rem);
  /*margin-left: 3.2rem;*/
}
.namesearchbox {
  float: right;
  /*display: none;*/
 /*opacity: 0;*/
/*  visibility: hidden;*/
}
.togglebox {
  overflow: hidden;
  margin-left: 0.5rem;
}
.healthdatabox {
  overflow: hidden;
  overflow-y: scroll;
  height: 34vw;
  padding-bottom: 2px;
}
.medicalrecordsbox,
.medicalreportbox {
  overflow: hidden;
  padding-left: 0.5rem;
}
.historyskip {
  position: absolute;
  width: 2rem;
  bottom: 0.5rem;
  right: 0;
  z-index: 100;
}
.siblingHistory {
  overflow: hidden;
}
.all-patient{
	position: fixed;
	top:5%;
	right: 0%;
	font-size: 0.38rem;
}
.all-patient>span{
	vertical-align: middle;
	color: #3C9BFF;
	margin: 0 0.7vw 0 0.3vw;
}
.all-patient>img{
	width: 18%;
	vertical-align: middle;
}
.all-patient>img:last-child{
	width: 6%;
		vertical-align: middle;
}
.mask-layer{
	width: calc(100vw - 200px - 3.2rem);
	height: 100vh;
	background-color: #000000;
	opacity: 0.6;
	position: absolute;
	left: 200px;
	top:0;
	/*display: none;*/
}
.show{
	visibility: visible;
}
.hide{
	visibility: hidden;
}
</style>
