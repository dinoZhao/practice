<template>
  <div class="reservation"> 
  	<headline headtxt="远程门诊" none=""></headline>
  	<div class="reservation-time">
  		<div class="reservation-time-left">
  			<template v-for="(item,index) in datelist">
	  			<div class="time-left-item on" @click="clickitem($event.target,index)" v-if="index==0" v-bind:data-code="index">
	  				<span>{{item.wenm}}</span><span>{{item.dat}}</span><span class="line"></span>
	  			</div>
	  			<div class="time-left-item" @click="clickitem($event.target,index)" v-bind:data-code="index"  v-else>
	  				<span>{{item.wenm}}</span><span>{{item.dat}}</span><span class="line"></span>
	  			</div>
  			</template>
  		</div><div class="reservation-time-right" @click="gotorecord">
  			<img src="../../../assets/record.png" /><span>全部记录</span>
  		</div>
  	</div>
  	<div class="reservation-content">
  		<div class="content-left">
  			<ul class="content-list">
  				<template v-for="(item,index) in result">
  					<li class="content-item">
  						<template v-for="(str,ind) in item.details">
  							<div class="item-text item-one done" v-if="str.status=='Finish'">
			  						<div class="item-left">
				  						<div class="item-time">
				  							<span class="">{{item.startTime|tim}}</span>
				  						</div>
				  					</div><div class="item-right">
				  						<div class="patient"><span class="name">{{str.pName}}</span><span class="sex">{{str.pSex}}</span><span class="age" style="margin-left:5px;">{{str.pAge}}岁</span></div><div class="experts">
				  							<span>预约专家</span><span class="experts-name">{{str.dName}}</span>
				  						</div><div class="status">
				  							<span>状态</span><span class="status-text">已完成</span>
				  						</div><div class="btn" @click="doctorBtn" v-bind:data-id="str.id">
				  							<span style="color: #3C9BFF;border: 1px solid #3C9BFF;background: #fff;">再次预约</span>
				  						</div>
				  						<div class="checkrecord" @click="showcheck"><span>查看病历</span><img src="../../../assets/check-right.png"/></div>
				  						<div class="right-line"></div>
				  					</div>
			  					</div>
			  					<div class="item-text item-one unfinished" v-else-if="str.status=='Pending'">
			  						<div class="item-left">
				  						<div class="item-time current" v-if="start<item.startTime&&item.startTime<intertime">
				  							<span class="">{{item.startTime|tim}}</span>
				  						</div>
				  						<div class="item-time" v-else>
				  							<span class="">{{item.startTime|tim}}</span>
				  						</div>
				  					</div><div class="item-right">
				  						<div class="patient"><span class="name">{{str.pName}}</span><span class="sex">{{str.pSex}}</span><span class="age" style="margin-left:5px;">{{str.pAge}}岁</span></div><div class="experts">
				  							<span>预约专家</span><span class="experts-name">{{str.dName}}</span>
				  						</div><div class="status">
				  							<span>状态</span><span class="status-text">未完成</span>
				  						</div><div class="btn" @click="gotojoin(str.id)" v-bind:data-id="str.id">
				  							<span class="current" v-if="start<item.startTime&&item.startTime<intertime">候诊</span>
				  							<span class="" v-else>候诊</span>
				  						</div>
				  						<div class="right-line current" v-if="start<item.startTime&&item.startTime<intertime"></div>
				  						<div class="right-line" v-else></div>
				  					</div>
			  					</div>
			  					<div class="item-text item-one cancel" v-else-if="str.status=='Canceled'">
			  						<div class="item-left">
				  						<div class="item-time">
				  							<span class="">{{item.startTime|tim}}</span>
				  						</div>
				  					</div><div class="item-right">
				  						<div class="patient"><span class="name">{{str.pName}}</span><span class="sex">{{str.pSex}}</span><span class="age" style="margin-left:5px;">{{str.pAge}}岁</span></div><div class="experts">
				  							<span>预约专家</span><span class="experts-name">{{str.dName}}</span>
				  						</div><div class="status">
				  							<span>状态</span><span class="status-text">已取消</span>
				  						</div><div class="btn" @click="doctorBtn" v-bind:data-id="str.id">
				  							<span>再次预约</span>
				  						</div>
				  						<div class="right-line"></div>
				  					</div>
			  					</div>
			  					<div class="item-text item-one cancel" v-else>
			  						<div class="item-left">
				  						<div class="item-time">
				  							<span class="">{{item.startTime|tim}}</span>
				  						</div>
				  					</div><div class="item-right">
				  						<div class="patient"><span class="name">{{str.pName}}</span><span class="sex">{{str.pSex}}</span><span class="age" style="margin-left:5px;">{{str.pAge}}岁</span></div><div class="experts">
				  							<span>预约专家</span><span class="experts-name">{{str.dName}}</span>
				  						</div><div class="status">
				  							<span>状态</span><span class="status-text">已取消</span>
				  						</div><div class="btn" @click="doctorBtn" v-bind:data-id="str.id">
				  							<span>再次预约</span>
				  						</div>
				  						<div class="right-line"></div>
				  					</div>
			  					</div>
  						</template>
	  				</li>
  				</template>
  			</ul>
  		</div><div class="content-right">
  		</div>
  	</div>
  	<div class="subscribe-btn" @click="gotoexpert"><img src="../../../assets/subscribe.png" /></div>
  	<div class="win-check" v-if="ischeck" @click="closecheck">
  		<div class="check-content"><img src="../../../assets/casehistory.png"/></div>
  	</div>
  </div>
</template>
<script>
	var timerecod = null;
import {getOutpatientRecord,clinicAppointmentAccess,submitAppointmentRoomId} from 'API/requst'
import headline from 'components/headline/headline.vue'
import { getURLParameter,dateFormat } from 'utils/util'
import myDatepicker from 'vue-datepicker'
import $ from 'jquery'
export default {
  name: 'reservation',
  components: {
  },
  data () {
    return {
      datelist:[],
      result:[],
      start:'',
      timenum:'',
      intertime:'',
      thirdUniqueId:'',
      detail:{},
      ischeck:false,
      startTimecha:'',
      endTimecha:''
    }
  },
  methods:{
  	gotoexpert:function(){
  		var vm = this;
  		window.location.href = 'experts.html';
  	},
  	gotorecord:function(){
  		var vm = this;
  		window.location.href = 'record.html';
  	},
  	doctorBtn:function(){
  		var vm = this;
  		window.location.href = 'experts.html';
  	},
  	showcheck:function(){
  		var vm = this;
  		vm.ischeck = true;
  	},
  	closecheck:function(){
  		var vm = this;
  		vm.ischeck = false;
  	},
  	gotojoin:function(id){
  		var vm = this;
  		vm.getpatientdetail(id);
  		vm.creatromeid(id);
  	},
  	clickitem:function(elem,num){
  		var vm = this;
  		var timnum = (parseInt(vm.timenum)+86400000*num);
  		var _timnum = timnum+86400000;
  		vm.startTimecha = timnum;
  		vm.endTimecha = _timnum;
  		$('.time-left-item').removeClass('on');
  		$(elem).parents('.time-left-item').addClass('on');
  		$(elem).addClass('on');
  		clearInterval(timerecod);
  		vm.getRecord();
  	},
  	getRecord:function(){
  		var vm = this;
  		clearInterval(timerecod);
  		var obj = {
  			'thirdUniqueId':vm.thirdUniqueId,
  			'startTime':vm.startTimecha,'endTime':vm.endTimecha
  		}
  		getOutpatientRecord(obj).then(data=>{
  			vm.result = data.result;
  			vm.getRecordTwo();
	    }).catch(err=>{
	    	vm.alertDefault({
	    		text:err.data.resultMessage,
					rowButton:false,
					leftButtonText:'取消',
					rightButtonText: '确定'
	    	})
	    })
  	},
  	getRecordTwo:function(){
  		var vm = this;
  		timerecod = setInterval(function(){
  			vm.getRecord();
  		},2000)
  		
  	},
  	getpatientdetail:function(id){
  		var vm = this;
  		var obj = {
	  		clinicAppointmentId :id
	  	}
  		clinicAppointmentAccess(obj).then(data=>{
	  		var _data = data;
	  		var doctorHeadUrl = _data.doctorHeadUrl;
	  		var doctorName = _data.doctorName;
	  		var profession = _data.profession;
	  		var doctorState = '坐诊中';
	  		var doctorCompany = _data.organization;
	  		var department = _data.department;
	  		window.android.startVideo(118,doctorHeadUrl,doctorName,profession,doctorState,doctorCompany,department);
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
  	},
  	creatromeid:function(id){
			var vm = this;
			var romeobj = {
				clinicAppointmentId:id,
        videoRoomId: 118
			}
			submitAppointmentRoomId(romeobj).then(data=>{
	     
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
		}
  },
  components:{
    headline
  },
  created () {
  	var vm = this;
  	var _url = window.location.origin+'/jkjch5/issue/home/index.html'+','+window.location.href;
  	sessionStorage.setItem('historyUrl',_url);
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	vm.thirdUniqueId = _doctorMsg.doctorId||417314456;
  	var arrlist = [];
  	var arr = [];
  	var myDate = new Date();
  	var timer = dateFormat(myDate.getTime(),'Y-m-d')+' '+'0:0:0';
  	var mydatetwo = new Date(timer).getTime();
  	var year = parseInt(myDate.getFullYear());
  	var month = parseInt(myDate.getMonth()+1);
  	var day = parseInt(myDate.getDate());
  	var week = parseInt(myDate.getDay());
  	var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
    var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
    var cond3 = year % 400 ==0;
    var cond = cond1 && cond2 || cond3;
    vm.timenum = mydatetwo;
  	switch(month){
  		case 1:
  			var numday = 31;
  			var nummonth = '01';
  		break;
  		case 2:
	  		if(cond){
	  			var numday = 29;
	  		}else{
	  			var numday = 28;
	  		}
  			var nummonth = '02';
  		break;
  		case 3:
  			var numday = 31;
  			var nummonth = '03';
  		break;
  		case 4:
  			var numday = 30;
  			var nummonth = '04';
  		break;
  		case 5:
  			var numday = 31;
  			var nummonth = '05';
  		break;
  		case 6:
  			var numday = 30;
  			var nummonth = '06';
  		break;
  		case 7:
  			var numday = 31;
  			var nummonth = '07';
  		break;
  		case 8:
  			var numday = 31;
  			var nummonth = '08';
  		break;
  		case 9:
  			var numday = 30;
  			var nummonth = '09';
  		break;
  		case 10:
  			var numday = 31;
  			var nummonth = '10';
  		break;
  		case 11:
  			var numday = 30;
  			var nummonth = '11';
  		break;
  		case 12:
  			var numday = 31;
  			var nummonth = '12';
  		break;
  	}
  	for(var i=0;i<7;i++){
  		var obj={};
  		obj.wenm = week;
  		obj.monm = month;
  		obj.dynm = day;
  		arrlist.push(obj);
  		if(week>=6){
  			week = 0;
  		}else{
  			week++;
  		}
  		if(day>=numday){
  			if(month>=12){
  				month=1;
  			}else{
  				month++;
  			}
  			day = 1;
  		}else{
  			day++;
  		}
  	}
  	arrlist.forEach(function(item){
  		var objtwo = {};
  		if((item.dynm.toString()).length==1){
  			objtwo.dynm = '0'+item.dynm;
  		}else{
  			objtwo.dynm = item.dynm;
  		}
  		if((item.monm.toString()).length==1){
  			objtwo.monm = '0'+item.monm;
  		}else{
  			objtwo.monm = item.monm;
  		}
  		objtwo.dat = objtwo.monm+'.'+objtwo.dynm;
  		switch(item.wenm){
  			case 0:
  				objtwo.wenm = '周日';
  			break;
  			case 1:
  				objtwo.wenm = '周一';
  			break;
  			case 2:
  				objtwo.wenm = '周二';
  			break;
  			case 3:
  				objtwo.wenm = '周三';
  			break;
  			case 4:
  				objtwo.wenm = '周四';
  			break;
  			case 5:
  				objtwo.wenm = '周五';
  			break;
  			case 6:
  				objtwo.wenm = '周六';
  			break;
  		}
  		arr.push(objtwo);
  	})
  	vm.datelist = arr;
  	var newdate = parseInt(new Date().getTime());
  	vm.start = newdate;
  	vm.intertime = newdate + 3600000;
  	vm.startTimecha = vm.timenum;
		vm.endTimecha = vm.timenum+86400000;
  	vm.getRecord();
  },
  mounted(){
   
  }
}
</script>
<style>
	.reservation{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.back{
		line-height: 112px !important;
	}
	.reservation-time{
    padding: 0 10px 0 130px;
    border-bottom: 1px solid #eee;
    padding-top: 30px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 1;
	}
	.reservation-content{
	    padding-top: 112px;
	}
	.reservation-time-left{
		display: inline-block;
    vertical-align: middle;
    width: calc(85% - 130px);
	}
	.reservation .time-left-item {
    display: inline-block;
    text-align: center;
    color: #999;
    padding: 0 3%;
    position: relative;
	}
	.reservation .time-left-item span {
    display: block;
	}
	.reservation .time-left-item>span:nth-child(1){
		font-size: 1.5vw;
	}
	.reservation .time-left-item>span:nth-child(2){
		font-size: 1.5vw;
    padding-bottom: 3px;
	}
	.reservation .time-left-item .line{
		position: absolute;
    bottom: 0;
    width: 30%;
    background: #3c9bff;
    display: inline-block;
    height: 2px;
    left: 35%;
    display: none;
	}
	.reservation .time-left-item.on span{
		color: #3c9bff;
	}
	.reservation .time-left-item.on .line{
		display: block;
	}
	.reservation-time-right{
		display: inline-flex;
    vertical-align: middle;
    width: 15%;
	}
	.reservation-time-right img{
		width: auto;
    height: 30px;
    vertical-align: middle;
	}
	.reservation-time-right span{
		vertical-align: middle;
    margin-left: 10px;
    display: inline-block;
    line-height: 30px;
    color: #3c9bff;
    font-size: 1.5vw;
	}
	.reservation .content-left{
    padding: 0 10px 0 40px;
    padding-top: 20px;
    vertical-align: top;
    color: #999;
	}
	.reservation .item-left{
		display: inline-block;
    width: 12%;
    text-align: center;
    font-size: 1.5vw;
    line-height: 50px;
	}
	.reservation .item-right{
		width: 88%;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    position: relative;
	}
	.reservation .item-right>div {
    display: inline-block;
    width: 22%;
    border-bottom: 1px solid #eee;
    line-height: 60px;
    padding: 8px 0;
    height: 60px;
	}
	.reservation .item-right .btn{
		width: 10%;
    padding: 8px 10px;
	}
	.reservation .patient {
		margin-left: 2%;
	}
	.reservation .btn span{
		width: 100%;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 1.5vw;
    background: #fc9542;
    display: inline-block;
	}
	.item-right>div span {
		margin-left: 10px;
	}
	.reservation .item-right .right-line{
	    position: absolute;
    width: 2px;
    height: 35px;
    background: #999;
    left: 0;
    top: 0;
	}
	.reservation .name,.reservation .experts-name{
		color: #333;
	}
	.reservation .name{
		font-size: 1.6vw;
	}
	.reservation .content-list{
		width: 90%;
	}
	li.content-item {
    font-size: 1.5vw;
    margin-bottom: 15px;
	}
	
	.reservation .item-left{
		visibility: hidden;
	}
	.content-item>div:nth-child(1) .item-left{
		visibility: visible;
	}
	.reservation .item-text.done .status-text{
		color: #3c9bff;
	}
	.reservation .item-text.cancel .status-text,.reservation .item-text.unfinished .status-text{
		color: #d43c33;
	}
	.reservation .item-text.current .right-line{
		background: #3c9bff;
	}
	.reservation .item-text.unfinished .btn span{
		background: #eee;
		color:#999;
	}
	.reservation .item-text.unfinished .item-left{
		color: #333;
	}
	.reservation .item-time.current{
		color: #3c9bff;
	}
	.reservation .right-line.current{
		background: #3c9bff;
	}
	.btn .current{
		color: #fff !important;
		background: #3c9bff !important;
	}
	.reservation .subscribe-btn{
		display: inline-block;
		position: fixed;
    right: 0px;
   	bottom: .5rem;
	}
	.reservation .subscribe-btn img{
    width: 2rem;
    height: auto;
	}
	.checkrecord{
		color: #3c9bff;
		border-bottom: 0 !important;
	}
	.checkrecord img{
		width: auto;
		height: 25px;
		vertical-align: middle;
		margin-left: 10px;
	}
	.checkrecord span{
		vertical-align: middle;
	}
	.win-check{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.7);
		z-index: 12;
	}
	.check-content{
		position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    text-align: center;
	}
	.check-content img{
		width: 100%;
	}
</style>
