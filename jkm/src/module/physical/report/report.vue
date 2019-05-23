<template>
<div class="report">
  <headTop/>
  <headline headtxt="报告"/>
  <div class="fornative">
    <head>
      <img :src="patientMsg.headUrl||require('@/assets/headUrl.png')" class="patientUrl">
      <div class="patientInfo">
        <div>
          <p>
            <span class="value" style="margin-right:.26rem;">{{patientMsg.patientName}}</span>
            <span class="infoKey" style="margin-right:.06rem;">{{patientMsg.patientSex}}</span>
            <span class="infoKey">{{patientMsg.patientAge}}岁</span>
          </p>
          <p>
            <span class="infoKey">联系方式</span>
            <span class="value">{{patientMsg.patientPhone}}</span>
          </p>
        </div>
        <div style="margin-left:.42rem;">
          <p>
            <span class="infoKey">身份证号</span>
            <span class="value">{{patientMsg.patientIdNumber}}</span>
          </p>
          <p>
            <span class="infoKey">报告时间</span>
            <span class="value">{{reportTime}}</span>
          </p>
        </div>
      </div>
    </head>
    <div class="result" v-if="warningMsg">{{warningMsg}}</div>
    <div class="printing" @click="showprint">
      <img src="@/assets/printing.png" alt>
      <p>{{printext}}</p>
    </div>
    <ul class="items">
      <li
        v-for="(item, index) in reportItems"
        :class="{active:activeIndex==index}"
        :key="index"
        @click="showThisItem(index)"
        v-show="showItems[index]"
      >{{item.title}}</li>
    </ul>
    <img class="history" src="@/assets/historyskip.png" alt @click="lookHistory">
    <img class="order_doc" src="@/assets/subscribe_report.png" alt @click="orderDoctor">
    <div class="components_box">
      <reportTemp :Type="showReportType" :showData="temData"/>
    </div>
    <div class="printModel" v-show="showprintmodel">
    	<div class="main">
    		<img class="close" @click="closeprint" src="../../../assets/close.png"/>
    		<div class="title">打印</div>
    		<div class="content"><img @click="printReport" :src="padDeviceCode=='P3'?ticketprint0:ticketprint1"/>
    		<img @click="printpdf" :src="reportprint1"/></div>
    		<div class="tip" v-if="padDeviceCode=='P3'">提示：信息盒未连接</div>
    	</div>
    </div>
  </div>
</div>
</template>
<script>
import headline from "components/headline/headline.vue";
import headTop from "components/common/headTop.vue";
import reportTemp from "./reportTem.vue";
import bmiT from "../bmi.vue";
import ticketprint0 from '@/assets/ticket-print0.png'
import ticketprint1 from '@/assets/ticket-print1.png'
import reportprint1 from '@/assets/report-print1.png'
import reportprint0 from '@/assets/report-print0.png'
import {
  getDetectionResult,
  readPatientMsg,
  printingReport,
  getStatusPrint,
  getpdf
} from "API/requst";
import { dateFormat, getURLParameter } from "utils/util";

var pintimer = null;
export default {
  name: "report",
  data() {
    return {
      patientMsg: {},
      reportItems: [
        { title: "心电", components: "A" },
        { title: "血压", components: "B" },
        { title: "血氧", components: "C" },
        { title: "血糖", components: "D" },
        { title: "体温", components: "E" },
        { title: "BMI", components: "F" },
        { title: "尿常规", components: "G" },
        { title: "血脂", components: "H" }
      ],
      showItems: [false, false, false, false, false, false, false, false],
      activeIndex: 0,
      warningMsg: "",
      showReportType: "",
      reportTime: "", //报告日期
      temData: {},
      bloodPressure: {}, //血压数据
      SpO2: {}, //血氧数据
      Glu: {}, //血糖数据
      Temperature: {}, //体温
      ecg: {}, //心电图
      bmi: {}, //bmi
      urine: {}, //尿常规
      bloodFat: {}, //血脂
      personId: "", //病人id
      recordId: "", //病例id
      printId: "", //病例打印id
      printext: "打印",
      padcode: "",
      showprintmodel:false,
      ticketprint0,
      ticketprint1,
      reportprint1,
      reportprint0,
      padDeviceCode:""
    };
  },
  components: {
    headline,
    reportTemp,
    bmiT,
    headTop
  },
  methods: {
    showThisItem(index) {
      this.activeIndex = index;
      this.showReportType = this.reportItems[index].components;
      switch (index) {
        case 0:
          this.temData = this.ecg;
          break;
        case 1:
          this.temData = this.bloodPressure;
          break;
        case 2:
          this.temData = this.SpO2;
          break;
        case 3:
          this.temData = this.Glu;
          break;
        case 4:
          this.temData = this.Temperature;
          break;
        case 5:
          this.temData = this.bmi;
          break;
        case 6:
          this.temData = this.urine;
          break;
        case 7:
          this.temData = this.bloodFat;
          break;
        default:
          break;
      }
    },
    getPageData(recordId) {
      var self = this;
      getDetectionResult({ recordId, examType: "", personId: "" })
        .then(res => {
          res = res.result;
          var arr = self.showItems;
          res.ecg ? (arr[0] = true) : "";
          res.bloodPressure ? (arr[1] = true) : "";
          res.SpO2 ? (arr[2] = true) : "";
          res.Glu ? (arr[3] = true) : "";
          res.Temperature ? (arr[4] = true) : "";
          res.bmi ? (arr[5] = true) : "";
          res.urine ? (arr[6] = true) : "";
          res.bloodFat ? (arr[7] = true) : "";
          // 确定那个是展示的第一个
          if (arr[0]) {
            self.temData = res.ecg;
            self.showReportType = "A";
            self.activeIndex = 0;
          } else if (arr[1]) {
            self.temData = res.bloodPressure;
            self.showReportType = "B";
            self.activeIndex = 1;
          } else if (arr[2]) {
            self.temData = res.SpO2;
            self.showReportType = "C";
            self.activeIndex = 2;
          } else if (arr[3]) {
            self.temData = res.Glu;
            self.showReportType = "D";
            self.activeIndex = 3;
          } else if (arr[4]) {
            self.temData = res.Temperature;
            self.showReportType = "E";
            self.activeIndex = 4;
          } else if (arr[5]) {
            self.temData = res.bmi;
            self.showReportType = "F";
            self.activeIndex = 5;
          } else if (arr[6]) {
            self.temData = res.urine;
            self.showReportType = "G";
            self.activeIndex = 6;
          } else if (arr[7]) {
            self.temData = res.bloodFat;
            self.showReportType = "H";
            self.activeIndex = 7;
          }
          self.showItems = self.showItems.splice(0, 8, ...arr);
          self.bloodPressure = res.bloodPressure || {};
          self.SpO2 = res.SpO2 || {};
          self.Glu = res.Glu || {};
          self.warningMsg = res.warning;
          self.Temperature = res.Temperature || {};
          self.bmi = res.bmi || {};
          self.urine = res.urine || {};
          self.bloodFat = res.bloodFat || {};
          self.reportTime = res.reportTime
            ? dateFormat(res.reportTime, "Y-m-d H:i")
            : res.reportTime;
          if (res.ecg.RV5ValueMV) {
            res.ecg.RV5ValueMV = Number(String(res.ecg.RV5ValueMV).slice(0, 3));
            res.ecg.SV1ValueMV = Number(String(res.ecg.SV1ValueMV).slice(0, 4));
          }
          self.ecg = res.ecg || {};
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPersonInfo(personId) {
      var vm = this;
      readPatientMsg({
        padDeviceCode: vm.padcode || sessionStorage.getItem("padcode"),
        personId
      }).then(res => {
        // console.log(res)
        vm.patientMsg = res;
      });
    },
    lookHistory() {
      window.location.href =
        "../healthrecord/historyRecord.html?personId=" + this.personId;
    },
    orderDoctor() {
      window.location.href = "../remoteclinic/experts.html";
    },
    getprintReport: function() {
      var vm = this;
      getStatusPrint({ printId: vm.printId }).then(res => {
        if (res.status == "InActive") {
          clearInterval(pintimer);
          vm.printext = "打印完成";
        }
      });
    },
    printpdf(){
    	var vm=this
    	this.showprintmodel=false
    	this.printext='打印中…'
    	getpdf({
    		 recordId: vm.recordId,
          personId: vm.personId,
    	}).then(function(res){
    		console.log(res.pdfUrl)
    		vm.printext='打印完成'
    		if(window.android){
    			window.android.showPdf(res.pdfUrl)
    		}
    	})
    },
    showprint(){
    	this.showprintmodel=true
    },
    closeprint(){
    	this.showprintmodel=false
    },
    printReport() {
      var vm = this;
      if (sessionStorage.getItem("padDeviceCode") == "P3") {
        return;
      }
      this.showprintmodel=false
      if (vm.printId) {
        getStatusPrint({ printId: vm.printId }).then(res => {
          // console.log(res)
          vm.alertDafault({
            text: res.status == "Active" ? "未打印" : "打印完成",
            rowButton: false,
            leftButtonText: "取消",
            rightButtonText: "确定"
          });
        });
      } else {
        printingReport({
          recordId: vm.recordId,
          padDeviceCode: vm.padcode || sessionStorage.getItem("padcode"),
          personId: vm.personId,
          type: "Exam"
        }).then(res => {
          vm.printId = res.printId;
          vm.printext = "打印中…";
          pintimer = setInterval(function() {
            vm.getprintReport();
          }, 1000);
        });
      }
    }
  },
  created() {
    var vm = this;
    //如果快速体检进来，返回时要保留状态返回开始
			if(getURLParameter("rapidindex")!==null){
				var historylist=sessionStorage.getItem('historyUrl').split(',')
				var rapidurl=historylist[historylist.length-2]
				if(rapidurl.includes('rapidindex')){
				rapidurl=rapidurl.replace(/(rapidindex=)(\d*)/,'$1'+getURLParameter("rapidindex")).replace(/(status=)(\d*)/,'$1'+getURLParameter("status"))
				}else{
					rapidurl=rapidurl+'&rapidindex='+getURLParameter("rapidindex")+'&status='+getURLParameter("status")
				}
		           historylist.splice(historylist.length-2,1,rapidurl)
		           sessionStorage.setItem('historyUrl',historylist.toString())
			}
			//如果快速体检进来，返回时要保留状态返回结束
  var personId = getURLParameter("personId"),
      recordId = getURLParameter("recordId");
    vm.personId = personId;
    vm.recordId = recordId;
    vm.getPersonInfo(personId);
    vm.getPageData(recordId);
    var padcode = sessionStorage.getItem("padCode");
    var padDeviceCode = sessionStorage.getItem("padDeviceCode");
    vm.padDeviceCode = padDeviceCode;
    vm.padcode = padcode;
  },
  mounted() {
    var vm = this;
  }
};
</script>
<style scoped lang='scss'>
.fornative{
  width: calc(100% - 200px);
  height: 100%;
  overflow: hidden;
  z-index: 100;
}
.report {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  text-align: center;
  /deep/ .head {
    // top: .6rem;
    left: 186px;
  }
}
head {
  height: 1.2rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 120px;
  .patientUrl {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1rem;
    margin-right: 0.3rem;
  }
  .patientInfo {
    div {
      display: inline-block;
      p {
        text-align: left;
      }
      p:nth-of-type(1) {
        margin-bottom: 0.2rem;
      }
      .infoKey {
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #666666;
        letter-spacing: 0;
        line-height: 0.38rem;
        margin-right: 0.16rem;
      }
      .value {
        font-family: PingFangSC-Medium;
        font-size: 0.3rem;
        color: #333;
        letter-spacing: 0;
        line-height: 0.38rem;
      }
    }
  }
}
.result {
  display: inline-block;
  max-width: 62%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 0.2rem;
  padding: 0.21rem 0.43rem;
  border: 2px solid #d43c33;
  border-radius: 0.5rem;
  text-align: center;
  line-height: 1.2;
  font-family: PingFangSC-Medium;
  font-size: 0.28rem;
  color: #d43c33;
  letter-spacing: 0;
  text-align: center;
}
.printing {
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 2%;
  top: .3rem;
  padding: 0.1rem 0;
  box-sizing: border-box;
  border: 2px solid #3c9bff;
  border-radius: 0.24rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  img {
    width: 0.9rem;
  }
  p {
    font-family: PingFangSC-Medium;
    font-size: 0.28rem;
    color: #3c9bff;
    letter-spacing: 0;
    text-align: center;
  }
}
.items {
  width: 100%;
  height: 0.85rem;
  padding-left: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  margin-top: 0.29rem;
  text-align: left;
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  li {
    display: inline-block;
    height: 100%;
    width: 11%;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.85rem;
  }
  .active {
    color: #3c9bff;
    border-bottom: 0.05rem solid #3c9bff;
  }
}
.history {
  width: 2rem;
  position: fixed;
  right: 0;
  bottom: 0.5rem;
}
.order_doc {
  width: 2rem;
  position: fixed;
  right: 0;
  bottom: 1.6rem;
}
.components_box {
  height: calc(100% - 4.2rem);
  overflow-y: scroll;
  margin-top: .2rem;
}
.printModel{
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0,0,0,0.6);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	/*display: none;*/
	.main{
		background: #FFFFFF;
		width: 62.5%;
		height: 44%;
		border-radius: 0.12rem;
		position: relative;
		.close{
			width: 0.54rem;
			height: 0.54rem;
			position: absolute;
			right: 0.3rem;
			top: 0.3rem;
		}
		.title{
			font-size: 0.46rem;
			margin: 0.15rem;
		}
		.content{
			display: flex;
			padding: 0 14%;
			justify-content: space-between;
			img{
				width: 20.8vw;
				height: 20vh;
			}
		}
		.tip{
			margin-left: 14%;
			text-align: left;
			font-size: 0.4rem;
			margin-top: 0.1rem;
      color: #999999;
		}
	}
}
</style>


