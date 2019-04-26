<template>
<div class="report">
  <headline headtxt="报告" />
  <head>
    <img :src="patientMsg.headUrl||require('@/assets/headUrl.png')" class="patientUrl">
    <div class="patientInfo">
      <div>
        <p><span class="infoKey">姓名</span><span class="value">{{patientMsg.patientName}}</span></p>
        <p><span class="infoKey">联系方式</span><span class="value">{{patientMsg.patientPhone}}</span></p>
      </div>
      <div style="margin-left:.52rem;">
        <p><span class="infoKey">年龄</span><span class="value">{{patientMsg.patientAge}}</span></p>
        <p><span class="infoKey">性别</span><span class="value">{{patientMsg.patientSex?"男":"女"}}</span></p>
      </div>
      <div style="margin-left:.82rem;">
        <p><span class="infoKey">身份证号</span><span class="value">{{patientMsg.patientIdNumber}}</span></p>
        <p><span class="infoKey">报告时间</span><span class="value">{{reportTime}}</span></p>
      </div>
    </div>
  </head>
  <div class="result">{{warningMsg}}</div>
  <div class="printing" @click="printReport">
    <img src="@/assets/printing.png" alt="">
    <p>{{printext}}</p>
  </div>
  <ul class="items">
    <li v-for="(item, index) in reportItems" :class="{active:activeIndex==index}" :key="index" @click="showThisItem(index)">{{item.title}}</li>
  </ul>
  <img class="history" src="@/assets/historyskip.png" alt="" @click="lookHistory">
  <img class="order_doc" src="@/assets/subscribe.png" alt="" @click="orderDoctor">
  <div class="components_box"><reportTemp :Type='showReportType' :showData='temData'/></div>
</div>
</template>
<script>
import headline from "../../../components/headline/headline.vue";
import reportTemp from './reportTem.vue'
import {getDetectionResult,readPatientMsg,printingReport,getStatusPrint} from "API/requst"
import { dateFormat,getURLParameter } from "utils/util";
var pintimer = null;
export default {
  name: "report",
  data() {
    return {
      patientMsg:{},
      reportItems:[{title:'心电',components:'A'},{title:'血压',components:'B'},{title:'血氧',components:'C'},{title:'血糖',components:'D'},{title:'体温',components:'E'}],
      activeIndex:0,
      warningMsg: '',
      showReportType:'A',
      reportTime: '',   //报告日期
      temData:{},
      bloodPressure:{},   //血压数据
      SpO2:{},    //血氧数据
      Glu:{},   //血糖数据
      Temperature:{},   //体温
      ecg:{},   //心电图

      personId: '',   //病人id
      recordId: '',   //病例id
      printId: '',    //病例打印id
      printext:'打印'
    };
  },
  components: {
    headline,
    reportTemp,
  },
  methods: {
    showThisItem(index){
      this.activeIndex = index;
      this.showReportType = this.reportItems[index].components
      switch (index) {
        case 0:
          this.temData = this.ecg
          break;
        case 1:
          this.temData = this.bloodPressure
          break;
        case 2:
          this.temData = this.SpO2
          break;
        case 3:
          this.temData = this.Glu
          break;
        case 4:
          this.temData = this.Temperature
          break;
        default:
          break;
      }
    },
    getPageData(recordId){
      var self = this;
      getDetectionResult({recordId,examType:'',personId:''}).then(res=>{
        res = res.result
        self.bloodPressure = res.bloodPressure||{}
        self.SpO2 = res.SpO2||{}
        self.Glu = res.Glu||{}
        self.warningMsg = res.warning
        self.Temperature = res.Temperature||{}
        self.reportTime = res.reportTime?dateFormat(res.reportTime,"Y-m-d H:i"):res.reportTime
        if(res.ecg.RV5ValueMV){
          res.ecg.RV5ValueMV = Number(String(res.ecg.RV5ValueMV).slice(0,3))
          res.ecg.SV1ValueMV = Number(String(res.ecg.SV1ValueMV).slice(0,4))
        }
        self.ecg = res.ecg||{}
        self.temData = res.ecg
      }).catch(err=>{
        console.log(err)
      })
    },
    getPersonInfo(personId){
      var vm = this;
      readPatientMsg({padDeviceCode:'P1',personId,}).then(res=>{
        // console.log(res)
        vm.patientMsg = res;
      })
    },
    lookHistory(){
      window.location.href = '../healthrecord/historyRecord.html?personId='+this.personId
    },
    orderDoctor(){
      window.location.href ='../remoteclinic/experts.html'
    },
    getprintReport:function(){
    	var vm = this;
    	getStatusPrint({printId:vm.printId}).then(res=>{
    		if(res.status=='InActive'){
    			 clearInterval(pintimer);
    			 vm.printext = '打印完成';
    		}
	    })
    },
    printReport(){
      var vm = this;
      if(vm.printId){
        getStatusPrint({printId:vm.printId}).then(res=>{
          // console.log(res)
          vm.alertDafault({
            text:res.status=='Active'?"未打印":"打印完成",
            rowButton:false,
            leftButtonText:'取消',
            rightButtonText: '确定'
          })
        })
      }else{
        printingReport({recordId: vm.recordId,padDeviceCode: 'P1',personId: vm.personId,type: 'Exam'}).then(res=>{
          vm.printId = res.printId;
          vm.printext = '打印中…';
          pintimer = setInterval(function(){
          	vm.getprintReport();
          },1000)
        })
      }
    },
  },
  created() {
    var vm = this;
    var personId = getURLParameter('personId'),recordId = getURLParameter('recordId')
    vm.personId = personId
    vm.recordId = recordId
    vm.getPersonInfo(personId)
    vm.getPageData(recordId)
  },
  mounted() {
    var vm = this;
  }
};
</script>
<style scoped lang='scss'>
.report {
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}
head {
  height: 1.2rem;
  margin-top: .2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .patientUrl {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1rem;
    margin-right: .4rem;
  }
  .patientInfo {
    div {
      display: inline-block;
      p{
        text-align: left;
      }
      p:nth-of-type(1){margin-bottom: .2rem;}
      .infoKey {
        font-family: PingFangSC-Regular;
        font-size: .28rem;
        color: #666666;
        letter-spacing: 0;
        line-height: .38rem;
        margin-right: .2rem;
      }

      .value {
        font-family: PingFangSC-Medium;
        font-size: .28rem;
        color: #333333;
        letter-spacing: 0;
        line-height: .38rem;
      }
    }
  }
}
.result{
  display: inline-block;
  margin-top: .2rem;
  padding: .21rem .43rem;
  border: 2px solid #D43C33;
  border-radius: .5rem;
  text-align: center;
  line-height: 1.2;
  font-family: PingFangSC-Medium;
  font-size: .28rem;
  color: #D43C33;
  letter-spacing: 0;
  text-align: center;
}
.printing{
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 4%;
  top: 30px;
  border: 2px solid #3C9BFF;
  border-radius: .24rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  img{
    width: .9rem;
    width: .9rem;
    margin-top: .06rem;
    margin-bottom: .12rem;
  }
  P{
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #3C9BFF;
    letter-spacing: 0;
    text-align: center;
  }
}
.items{
  width: 100%;
  height: .85rem;
  border-bottom: 1px solid #eee;
  margin-top: .29rem;
  text-align: left;
  font-size: .32rem;
  font-family: PingFangSC-Medium;
  li{
    display: inline-block;
    height: 100%;
    width: 1.92rem;
    box-sizing: border-box;
    text-align: center;
    line-height: .85rem;
  }
  .active{
    color: #3C9BFF;
    border-bottom: .05rem solid #3C9BFF;
  }
}
.history{
  width: 2rem;
  position: fixed;
  right: 0;
  bottom: .5rem;
}
.order_doc{
  width: 2rem;
  position: fixed;
  right: 0;
  bottom: 1.6rem;
}
.components_box{
  height: 58%;
  overflow-y: scroll;
}
</style>


