<template>
  <div class="requestAssist"> 
  	<div class="head">
  		<headline />
  		<span class="title-p">协诊申请</span>
  	</div>
  	
  	<div class="requestAssist-content">
  		<div class="info">
	  		<span class="info-title">患者信息</span>
	  		<span class="info-name">{{patientName}}</span>
	  		<span class="info-gender">{{gender}}</span>
	  		<span class="info-age"><span id="info-age">{{age}}</span>岁</span>
	  	</div>
	  	<div class="line"></div>
	  	<div class="description">
	  		<div class="info-title description-title">问题描述</div>
	  		<textarea class="description-content" placeholder="请尽可能完整描述症状、检查结果，不少于10个字！" @input="changesymptom($event.target.value)"></textarea>
	  		<div class="voice-btn">
	  			<img class="voice-img" src="../../../assets/chestPain-assist-voice.png" />
	  			<p>按住说话</p>
	  		</div>
	  	</div>
	  	<div class="line line2"></div>
	  	<div class="report">
	  		<div class="info-title report-title">报告</div>
	  		<div class="report-imgs-box">
	  			<template v-for="(item,index) in examReportUrls">
		  			<div class="report-item pinch-zoom" v-bind:data-url = 'item.ecgUrl' style="position: relative;" v-if="item.ecgUrl">
		  				<viewer>
					       <img class="imgbig report-img" v-bind:src="item.ecgUrl" style="width: 100%;height: 100%;"/>
					    </viewer>
					    <div class="report-imgs" style="position: relative;z-index: 1;">
					    	<img class="report-img" src="../../../assets/chestPain-assist-ecg.png" />
					    	<p class="report-p">心电图报告</p>
					    </div>
		  			</div>
	  			</template>
	  			<template v-for="(item,index) in examReportUrls">
		  			<div class="report-imgs" v-bind:data-url = 'item.reportUrl' @click.stop="openpdf(item.reportUrl)" v-if="item.reportUrl">
		  				<img class="report-img" src="../../../assets/chestPain-assist-ecg.png" />
		  				<p class="report-p">报告{{index+1}}</p>
		  			</div>
	  			</template>
	  		</div>
	  	</div>	  	
	  	<div class="btn">
	  		<div @click="toAssist">
	  			提交协诊
	  		</div>	  		
	  	</div>
  	</div>
  	
  </div>
</template>
<script>
import $ from 'jquery'
import {queryPersonalRecord,getPeriodExamRecord,requestAssistClinic,updateTodayExam} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat } from 'utils/util'
import Viewer from 'v-viewer'
export default {

  name: 'requestAssist',
  components: {
  },
  data () {
    return {
     patientIdNumber:'',
     patientName:'',
     age:'',
     gender:'',
     thirdUniqueId:'',
     medicalRecordId:'',
     personId:'',
     symptom:'',
     Options:{
				"inline": true, "button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": false,
				"movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, 
				"fullscreen": true, "keyboard": false, "url": "data-source"
		},
     examReportUrls:["https://ymmsit.verify.fc18.com.cn/att/myprofile/avatar/examReport/1557999862447.pdf","https://ymmsit.verify.fc18.com.cn/att/myprofile/avatar/examReport/1557994906995.pdf"]
    }
  },
  methods:{
  	openpdf:function(reurl){
  		var vm = this;
  		if(window.android){
    			window.android.showPdf(reurl);
    	}else{
    		window.open(reurl);
    	}
  	},
  	toAssist(){
  		var vm = this;
  		var obj = {
  			"type": "exam",
				"doctorId": vm.thirdUniqueId,
				"medicalRecordId": vm.medicalRecordId,
				"patientId": vm.personId,
				"urgent": 1,
				"symptom": vm.symptom,
				"hospital":"FuCongKJXZ",
				"subjectType":"General",
				"ProcedureType":"AssistClinic"
  		}
  		var obj2 = {
  			"medicalRecordFolderId":vm.medicalRecordId,
  			"procedureType":"AssistClinic"
  		}
  		vm.showLoading();
  		requestAssistClinic(obj).then(res=>{
  			updateTodayExam(obj2).then(data=>{
  				vm.hideLoading();
		      vm.showtoast('提交成功');
  	    	sessionStorage.setItem('tabstatus','init')
		 			window.location.href = './assist.html';
		    }).catch(err=>{
		    	vm.hideLoading();
		    })
	    }).catch(err=>{
	    	vm.hideLoading();
	    })
  	},
  	changesymptom:function(val){
  		var vm = this;
  		vm.symptom = val;
  	}
  },
  components:{
    headline
  },
  watch:{
  	patientIdNumber(cur){
  		if(cur.length<14){
  			this.birthday=''
  			this.age=''
  			return
  		}
  		this.birthday=cur.slice(6,10)+'-'+cur.slice(10,12)+'-'+cur.slice(12,14)
  		var d=new Date()
  		var birthdays=new Date(cur.slice(6,10)+'-'+cur.slice(10,12)+'-'+cur.slice(12,14))
  		this.age=d.getFullYear()-birthdays.getFullYear() -(d.getMonth() < birthdays.getMonth() ||(d.getMonth() == birthdays.getMonth() &&d.getDate() < birthdays.getDate())? 1: 0);
  	}
  },
  created () {
  	var vm = this;
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	vm.thirdUniqueId = _doctorMsg.doctorId||417314456;
  	var personId = getURLParameter('personId');
  	var recordId = getURLParameter('recordId');
  	vm.medicalRecordId = recordId;
  	vm.personId = personId;
  	var obj ={
  		"personId": personId
  	}
  	var obj2 ={
  		"patientId": personId,
  		
  	}
  	queryPersonalRecord(obj).then(res=>{
      vm.patientName = res.result.name;
    	vm.patientIdNumber = res.result.idNumber;
    	vm.gender = res.result.gender=='1'?'男':'女';
    })
  	getPeriodExamRecord(obj2).then(res=>{
      vm.examReportUrls = res.examReports;
    })
  	Viewer.setDefaults({
			Options:vm.Options
		});
  },
  mounted(){
//  let id ={'productCode':'YQB00101'};
//  let per = {'content':'h5/homePage/index.h5_default'}
//  getKnowledgeTag(id).then(data=>{
//    console.log(data)
//  })
//  cancelAttention(per).then(data=>{
//    console.log(data)
//  })
  }
}
</script>
<style scoped="scoped">
.requestAssist{
	font-family: PingFangSC-Medium;
	width: calc(100% - 200px);
	height: 100%;
	margin-left: 200px;
	overflow: hidden;
	position: absolute;
	right: 0;
}
.title-p{
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: .36rem;
		color: #3C9BFF;
    position: fixed;
    top: .5rem;
    left: 8%;
}
.requestAssist-content{
	position: relative;
	top: 1.2rem;
	overflow: hidden;
	height: 100%;
}
.info,.description,.report{
	position: relative;
	left: 30px;
}
.info span{
	display: inline-block;
}
.info-title{
	font-family: PingFangSC-Regular;
	color: #333333;
	font-size: 0.3rem;
	line-height: .9rem;
	width: 1.2rem;
}
.info-name{
	margin-left: .45rem;
	margin-right: .26rem;
	font-size: .36rem;
	color: #333333;	
}
.info-gender,.info-age{
	font-family: PingFangSC-Regular;
	font-size: .32rem;
	color: #999999;
}
.line{
	width: 100%;
	opacity: 0.15;
	border: 1px solid #000;
	margin-top: 0.1rem;
}
.description-title,.description-content,.voice-btn{
	display: inline-block;
}
.description-title{
	position: relative;
	top: -.6rem;
}
.description-content{
	border: none;
	outline: none;
	width: 60%;
	height: 1.3rem;
	overflow: auto;
	margin-left: .45rem;
	font-size: .32rem;
	color: #333333;
	line-height: .4rem;
	position: relative;
	top: .4rem;
}
.voice-btn{
	width: 2rem;
	height: 1.2rem;
	border-radius: .65rem;
	border: .05rem solid #3C9BFF;
	text-align: center;
	position: relative;
	top: .2rem;
}
.voice-img{
	width: .5rem;
	height: .88rem;
	position: relative;
	top: .14rem;
}
.voice-btn p{
	font-family: PingFangSC-Medium;
	font-size: .3rem;
	color: #3C9BFF;
  position: relative;
	top: .4rem;
}
.line2{
	margin-top: .52rem;
}
.report{
	position: relative;
	overflow: hidden;
	padding: .4rem 0;
}
.report-title,.report-imgs-box{
	float: left;
}
.report-imgs-box{
	overflow: hidden;
	margin-left: .45rem;
}
.report-imgs-box div{
	display: block;
	float: left;
	text-align: center;
}
.report-imgs{
	width: 1.4rem;
	height: 1.4rem;
	border: .02rem solid #3C9BFF;
	border-radius: .04rem;
	margin-right: .2rem;
	position: relative;
}
.report-img{
	width: .44rem;
	height: .5rem;
	margin-top: .3rem;
	left: .5rem;
}
.report-p{
font-family: PingFangSC-Medium;
font-size: .24rem;
color: #3C9BFF;
margin-top: .1rem;
}
.btn{
	width: 100%;
	bottom: 30px;
	text-align: center;
}
.btn div{
	width: 5rem;
	height: 1.2rem;
	background: #3C9BFF;
	border-radius: .12rem;
	font-size: .48rem;
	color: #FFFFFF;
	text-align: center;
	line-height: 1.2rem;	
	margin: 0 auto;
}
.report-item.pinch-zoom>div:nth-child(1){
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	opacity: 0;
}
</style>

