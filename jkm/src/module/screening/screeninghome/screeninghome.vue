<template>
  <div class="screeninghome" >
    <headline headtxt="体检套餐" none></headline>
    <div class="screening-content">
      <div class="screening-sidebar">
        <div :class="currentTab===true?'active':''" @click="changeTab1">
          <span>疾病筛查</span>
        </div>
        <div :class="currentTab===false?'active':''" @click="changeTab2">
          <span id>筛查结果</span>
        </div>
        <!--<div class="">
					<span id="">
  				预约记录
  			</span>
        </div>-->
      </div>
      <div class="middle-content" v-show="currentTab">
        <div class="screening-titlebar">
          <div class="screening-titlebar-list">
            <span  class="active">公卫服务</span>
            <span>优选计划</span>
            <span>至尊计划</span>
          </div>
        </div>
        <div class="screening-content-item-1">
          <div class="screening-content-item-1-title">基层服务</div>
          <div class="screening-content-item-1-panel">
            <div>
              <img src="../../../assets/healthy-condition.png"> 健康状况评估
            </div>
            <div>
              <img src="../../../assets/body.png"> 体格检查
            </div>
            <div>
              <img src="../../../assets/check.png"> 辅助检查
            </div>
            <div>
              <img src="../../../assets/health-education.png"> 健康指导
            </div>
          </div>
        </div>
        <div class="screening-content-item-2">
          <div class="screening-content-item-1-title">体检项目</div>
          <div class="screening-content-item-1-panel">
            <div>
              <img src="../../../assets/ECG.png"> 心电
            </div>
            <div>
              <img src="../../../assets/blood-pressure.png"> 血压
            </div>
            <div>
              <img src="../../../assets/blood-sugar.png"> 血糖
            </div>
            <div>
              <img src="../../../assets/B-super.png"> B超
            </div>
            <div>
              <img src="../../../assets/BMI.png"> BMI
            </div>
            <div>
              <img src="../../../assets/urine-routine.png"> 尿常规
            </div>
            <div>
              <img src="../../../assets/blood-fat.png"> 血脂
            </div>
            <div>
              <img src="../../../assets/hemoglobin.png"> 血红蛋白
            </div>
            <div>
              <img src="../../../assets/POCT.png"> POCT
            </div>
          </div>
        </div>
        <a href="###" class="submit" @click="startDetection">开始检测</a>
      </div>
      <div class="middle-chart" v-show="!currentTab">
        <div class="finish-situation">
          <div class>
            <span>已完成</span>
            <span class="large">{{finish_situation.done||'--'}}/</span> <span class="small">{{finish_situation.quota||'--'}}</span>
          </div>
          <div class>
            <span>完成度</span>
            <span class="orange">{{finish_situation.finish_percentage||'--'}}%</span>
          </div>
          <div>
            <span class="special_y">筛查截止日期</span>
            <span class="special_y">{{finish_situation.expireDate||'--'}}</span>
          </div>
        </div>
        <!--<div class="turnToDetailInfo" @click="toDetailInfo">
          <img src="../../../assets/historyskip.png">
        </div>-->
        <div class="tab-button">
          <div
            class="button-normal"
            :class="tabButtonIndex==0?'active':''"
            data-index="0"
            @click="changeTabButton"
          >全部</div>
          <div
            class="button-normal"
            :class="tabButtonIndex==1?'active':''"
            data-index="1"
            @click="changeTabButton"
          >男</div>
          <div
            class="button-normal"
            :class="tabButtonIndex==2?'active':''"
            data-index="2"
            @click="changeTabButton"
          >女</div>
          <div class="patient-num" v-show="num_of_participants_show"><p>筛查人数</p><p>{{num_of_participants.count||'--'}}</p></div>
        </div>
        <div id="mycharts">
        	
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getKnowledgeTag,
  getExamScreening,
  createMedicalRecord
} from "API/requst";
import headline from "components/headline/headline.vue";
import echarts from "utils/echarts.common.min";
import { dateFormat } from 'utils/util'
export default {
  name: "healthyCheckupHome",
  components: {},
  data() {
    return {
      playing: true,
      bennLike: false,
      contentChange: true,
      pageChange: true,
      currentTab: true,
      isChart: false,
      num_of_participants_show:false,
      tabButtonIndex: 0,
      num_of_participants:{},
      finish_situation:{},
      all_patient:{},
      female_patient:{},
      male_patient:{},
      startTime: {
        time: ""
      },
      option:{
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        y: 'center', // 'center' | 'bottom' | {number}
//      itemWidth:'auto',
        textStyle: {
            "fontSize": 18,
            'color':'#333',
            padding:[5,15]
        },
        
        selectedMode:false,
        data:[{name:'正常',textStyle:{color:'#333'},padding:[5,10]},{name:'高血压',textStyle:{color:'#333'},padding:[5,10]},{name:'高血糖',textStyle:{color:'#333'},padding:[5,10]},{name:'心电异常',textStyle:{color:'#333'},padding:[5,10]}]
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['65%', '85%'],
            avoidLabelOverlap: false,
            itemStyle: {
								normal: {
									label:{
										show:true,
										formatter: '{d}%',
										fontSize:22
									},
									labelLine:{
										show:true
									}
								}
							},
            label: {
            position:'outside'
            },

            labelLine: {
            	normal:{
            	show:true,
               length:17
            	}

            },
            data:[
                {value:335, name:'正常',itemStyle:{color:'#85b3e3'},labelLine:{length:5}},
                {value:310, name:'高血压',itemStyle:{color:'#f78bd3'}},
                {value:234, name:'高血糖',itemStyle:{color:'#f6e092'}},
                {value:135, name:'心电异常',itemStyle:{color:'#a3dda3'}}
            ]
        }
    ],
    color:['#85b3e3','#f78bd3','#f6e092','#a3dda3']
}
    };
  },
  methods: {
    startDetection() {
      var vm = this;
      let personId = window.location.search.split('=')[1];
      let params = {
        personId: personId,
        padDeviceCode: "P1",
        type: "公卫服务"
      };
      createMedicalRecord(params).then(data => {
        console.log(data.recordId);
        sessionStorage.setItem("medicalRecordId", data.recordId);
//      window.location.href ="../physical/result.html?medicalRecordId=" + data.recordId;
        window.location.href = "../physical/result.html?recordId=" + data.recordId + '&personId=' + personId;
      });
      
    },
    changeTab1() {
      let vm = this;
      vm.currentTab = true;
      vm.num_of_participants_show = false;
    },

    changeTab2() {
      let vm = this;
      vm.currentTab = false;     
      //	console.log(document.getElementById(""));
    var myChart = echarts.init(document.getElementById("mycharts"));
    console.log(document.getElementById("mycharts"));
		vm.option.series[0].data[0].value = vm.all_patient.normalCount;
		vm.option.series[0].data[1].value = vm.all_patient.highBloodPressureCount;
		vm.option.series[0].data[2].value = vm.all_patient.highGluCount;
		vm.option.series[0].data[3].value = vm.all_patient.ecgAbnormalCount;
    console.log(myChart);
    myChart.setOption(vm.option);
    vm.num_of_participants = vm.all_patient;
    vm.num_of_participants_show = true;
    },
    changeTabButton(event) {
      let vm = this;
      vm.tabButtonIndex = event.target.dataset.index;
      let exctPie = {
      	'0':function(all_patient = 'all_patient'){
    vm.option.series[0].data[0].value = vm[all_patient].normalCount;
		vm.option.series[0].data[1].value = vm[all_patient].highBloodPressureCount;
		vm.option.series[0].data[2].value = vm[all_patient].highGluCount;
		vm.option.series[0].data[3].value = vm[all_patient].ecgAbnormalCount;
		vm.num_of_participants = vm.all_patient;
      	},
      	'1':function(all_patient = 'male_patient'){
    vm.option.series[0].data[0].value = vm[all_patient].normalCount;
		vm.option.series[0].data[1].value = vm[all_patient].highBloodPressureCount;
		vm.option.series[0].data[2].value = vm[all_patient].highGluCount;
		vm.option.series[0].data[3].value = vm[all_patient].ecgAbnormalCount;
		vm.num_of_participants = vm.male_patient;
      	},
      	'2':function(all_patient = 'female_patient'){
    vm.option.series[0].data[0].value = vm[all_patient].normalCount;
		vm.option.series[0].data[1].value = vm[all_patient].highBloodPressureCount;
		vm.option.series[0].data[2].value = vm[all_patient].highGluCount;
		vm.option.series[0].data[3].value = vm[all_patient].ecgAbnormalCount;
		vm.num_of_participants = vm.female_patient;
      	}
      }
       var myChart = echarts.init(document.getElementById("mycharts"));
       exctPie[event.target.dataset.index]();
       console.log('success');
       myChart.setOption(vm.option);
    },
    toDetailInfo() {
      window.location.href = "../screening/detailInfo.html";
    }
  },
  components: {
    headline
  },
  created() {
    let vm = this;
    let params = {
      padDeviceCode: "P1"
    };
    getExamScreening(params).then(data => {
      console.log(data);
      let finish_situation={}
      finish_situation.quota = data.quota;
      finish_situation.done = data.done;
      finish_situation.finish_percentage = ((data.done/data.quota)*100).toFixed(2);
      finish_situation.expireDate = dateFormat(data.expireDate,'Y-m-d');
      vm.finish_situation = finish_situation;
      console.log(finish_situation);
      vm.all_patient= data.allExamDto;
      vm.female_patient = data.femaleExamDto;
      vm.male_patient= data.maleExamDto;
      vm.num_of_participants_show= true;
      vm.changeTab2();
      vm.currentTab = !vm.currentTab;
    });
  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped type="text/css">
$blueColor: #3c9bff;
$greyColor: #ececec;
body {
  height: 100vh;
}

.home {
  color: #d43c33;
}

.screeninghome,
.screening-content {
  height: 100%;
}

.middle-content {
  display: inline-block;
  height: calc(100% - 80px);
  width: calc(100% - 1.56rem);
  vertical-align: top;
  .screening-content-item-1,
  .screening-content-item-2 {
    margin-left: 0.5rem;
    margin-bottom: 0.3rem;
    .screening-content-item-1-title {
      color: $blueColor;
      background-color: #ebf5ff;
      font-size: 0.36rem;
      padding: 0.05rem 0.09rem;
      width: 10.8%;
      height: 5.5%;
      text-align: center;
      margin: 0.3rem 0 0.3rem 0;
      border-radius: 25px;
    }
    .screening-content-item-1-panel {
      width: 90%;
      div {
        display: inline-block;
        width: 13.5%;
        text-align: center;
        font-size: 0.32rem;
        margin-bottom: 0.35rem;
        img {
          display: block;
          width: 0.6rem;
          height: 0.6rem;
          margin: 0.05rem auto;
        }
      }
    }
  }
}
.middle-chart {
  display: inline-block;
  width: 92.1vw;
  height: 100%;
  vertical-align: top;
  .finish-situation {
    width: 100.6%;
    height: 8vw;
    background-color: #f2f2f2;
    margin-top: 0px;
    position:relative;
    left:-0.5vw;
    
    div {
      display: inline-block;
      margin: 0.35rem 0.5rem 0.3rem 0.9rem;
      span {
        font-size: 0.35rem;
      }
      // span:last-child {
      //   font-size: 0.7rem;
      // }
    }
    .orange {
      color: #fc9452;
      font-size: 0.85rem;
    }
    .large{
    	font-size: 0.65rem;
    }
    .small{
    	font-size: 0.5rem;
    }
  }
  .tab-button {
    height: 5vw;
    margin: 0 auto;
    line-height: 5vw;
    margin-top: 3vw;
    color: #3c9bff;
    text-align: center;
    .button-normal {
      display: inline-block;
      font-size: 0.3rem;
      width: 2.8rem;
      height: 0.8rem;
      line-height: 0.8rem;
      margin: 0 0.3rem;
      border: solid 2px #3c9bff;
      /*color: #3c9bff;*/
      text-align: center;
      border-radius: 15px;
    }
  }
  .active {
    background-color: #3c9bff;
    color: white !important;
  }
  .turnToDetailInfo {
    position: fixed;
    top: 47vw;
    right: 0vw;
    img {
      width: 2rem;
    }
  }
}
.screening-titlebar {
  width: 17.7rem;
  /*height: 9.4%;*/
  border-top: solid 1px $greyColor;
  /*border-bottom: solid 1px $greyColor;*/
  vertical-align: top;
  display: inline-block;
  position: relative;
  margin-top: 80px;
}

.screening-sidebar {
  width: 1.4rem;
  height: calc(100% - 80px);
  border-right: solid 1px $greyColor;
  border-bottom: solid 1px $greyColor;
  display: inline-block;
  position: relative;
  top: 80px;
  div {
    width: 100%;
    height: 50%;
    font-size: 0.36rem;
    color: $blueColor;
    position: relative;
    span {
      display: block;
      width: 51.5%;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .active {
    background-color: $blueColor;
    color: white;
  }
}

.screening-titlebar-list {
  height: 100%;
  padding-left: 0.5rem;
  border-bottom: solid 1px $greyColor;
  display: none;
  span {
    font-size: 0.3rem;
    display: inline-block;
    padding: 0.15rem 0.35rem;
    padding-top: 4.3vh;
  }
  .active {
    color: $blueColor;
    border-bottom: solid 3px $blueColor;
  }
}
.submit {
  display: block;
  margin: 0 auto;
  width: 26vw;
  height: 11.7vh;
  text-align: center;
  font-size: 0.4rem;
  line-height: 11.7vh;
  color: white;
  background-color: #3c9bff;
  border-radius: 15px;
}
.special_y {
  font-family: PingFangSC-Regular;
  font-size: 0.36rem;
  color: #333333;
}
#mycharts{
	width:82vw;
	height: 28vw;
	margin-top: 0.5rem;
}
.patient-num{
	position: absolute;
	top: 30.5vw;
	left: 44.5vw;
	p{
		line-height: 0.6rem;
		color: #adadad;
		font-size: 0.4rem;
		text-align: center;
	}
	p:last-child{
		font-size: 0.65rem;
		color: #000000;
		text-align: center;
	}
}
</style>