<template>
  <div class="record"> 
  	<div class="record-head-top">
  		<headTop/>
	  	<headline headtxt="预约" none></headline>
	  	<div class="record-head">
	  		<div class="record-head-left">
	  				姓名<div class="name-text"><input type="text" placeholder="请输入" @input="seartext($event.targe)" class="name"/></div>
	  		</div><div class="record-head-center">
	  			日期<div :class="['time','hidetime',isinputhide?'opcinput':'showinput']" @click.stop="clicktime"><date-picker :date="startTime" :option="option" :limit="limit"></date-picker></div>
	  				 <div class="time" v-if="isinputhide" @click.stop="hideinput"><input type="text" placeholder="请选择" class="hideinput"/></div>
	  		</div><div class="record-head-right">
	  			状态<div class="status-text">
	  					<select name="status-select" class="status-select" @change="changestatus">
	  						<option value="all">全部</option>
	  						<option value="Finish">已完成</option>
	  						<option value="Pending">预约中</option>
	  						<option value="Canceled">已取消</option>
	  					</select>
	  			</div>
	  		</div>
	  	</div>
  	</div>
  	<input type="text" @change="changeint" v-model="startTime.time" style="position: absolute;top: -10%;opacity: 0;"/>
  	<div class="record-content">
  		<div class="record-content-head">
  			<div class="make-time">
  				预约时间
  			</div><div class="make-bumber">
  				预约号码
  			</div><div class="make-name">
  				姓名
  			</div><div class="make-paly">
  				计划时间
  			</div><div class="make-doctor" style="width: 12%;">
  				预约医生
  			</div><div class="make-status">
  				状态
  			</div>
  		</div>
  		<ul class="record-list">
  			<template v-for="(item,index) in details">
  				<li class="record-item">
						<div class="make-time">
		  				{{item.appointTime|fmat}}
		  			</div><div class="make-bumber">
		  				{{item.id}}
		  			</div><div class="make-name">
		  				{{item.pName}}
		  			</div><div class="make-paly">
		  				{{item.startTime|fmat}}
		  			</div><div class="make-doctor">
		  				{{item.dName}}
		  			</div><div class="make-status">
		  				<span class="Revisiting Pending" v-if="item.status=='Revisiting'">已就诊</span>
		  				<span class="Finish" v-else-if="item.status=='Finish'">已完成</span>
		  				<span class="Pending" v-else-if="item.status=='Pending'||item.status=='Success'">预约成功</span>
		  				<span class="Pending" v-else-if="item.status=='Waiting'||item.status=='Calling'">候诊中</span>
		  				<span class="Canceled" v-else-if="item.status=='Missed'">已过号</span>
		  				<span class="Canceled" v-else-if="item.status=='Canceled'">已取消</span>
		  				<span class="Canceled" v-else-if="item.status=='Disabled'">已失效</span>
							<span class="Unpaid" v-else-if="item.status=='Unpaid'">待支付</span>
							<span class="Revisiting Pending" v-else-if="item.status=='Visiting'">已就诊</span>
		  				<span class="Pending" v-else>未完成</span>
		  			</div>
					</li>  		
  			</template>
  		</ul>
  	</div>
  	<div class="win-video" v-if="isvideo">
  		<div class="win-video-content">
  			<div class="video-content-left">
  				<div class="video-left-bottom">
  					<img :src="videodetail.doctorHeadUrl?videodetail.doctorHeadUrl:headUrl" class="vi-icon"/>
  					<p class="vd-nam">{{videodetail.doctorName}}</p><p style="font-weight: bold;"><span style="margin-right: 5px;">{{videodetail.department}}</span><span>{{videodetail.profession}}</span></p><p><span class="vi-status">坐诊中</span></p>
  					<p style="margin-top: 25px;margin-bottom: 5px;text-align: left;padding: 0 10px;"><span>医院：</span>{{videodetail.organization}}</p>
  					<p style="text-align: left;padding: 0 10px;"><span>擅长：</span>{{videodetail.description}}</p>
  				</div>
  			</div><div class="video-content-roght">
  				<p class="wait-time" v-if="issucess"><span class="timenum">{{lasttimer}}</span>s后自动过号</p>
  				<p class="wait-time-text" v-if="!issucess">等待叫号不要离开</p>
  				<div class="patient-mess">
  					<P><img :src="videodetail.patientHeadUrl?videodetail.patientHeadUrl:headUrl"/>{{videodetail.patientName}}</P>
  				</div>
  				<div class="wait-detail" v-if="!issucess">
  					<p>前面还有<span>{{frontNum}}</span><span>人</span></p>
  					<p>预计还需等待  <span v-if="frontNum" style="color: #333;font-size:.4rem;">{{frontNum*5}}</span> 分钟</p>
  				</div>
  				<div class="wait-success" v-if="issucess">
  					请就诊
  				</div>
  				<div class="wait-hint" v-if="!issucess" @click.stop="closevideo"><p>我知道了</p></div>
  				<div class="wait-btn" v-if="issucess"><p class="canceljoin" @click.stop="missClinic(videoid)">过号</p><p class="joinroom" @click="gotojoin(videoid)">进入诊室</p></div>
  			</div>
  			<div class="vi-close" @click.stop="closevideo"><img src="../../../assets/close.png"/></div>
  		</div>
  	</div>
  	<div class="win-cancel" v-if="iscancel">
  		<div class="win-cancel-content">
  			<p class="cancel-hint">温馨提示</p>
  			<p class="cancel-hint-text">再次预约需要重新挂号排队，是否确定要取消本次预约？</p>
  			<div class="win-cancel-btn">
  				<div class="cancel-btn-left" @click.stop="closecancel">再想想</div><div class="cancel-btn-right" @click.stop="surecancel(videoid)">是的，我要取消</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>
<script>
var timerecod = null;var timerGetphoneCode = null;var vitimer = null;
import {getOutpatientHistory,clinicAppointmentAccess,submitAppointmentRoomId,queryClinicAppointmentInfo,missClinicAppointment} from 'API/requst'
import headTop from 'components/common/headTop.vue'
import headline from "components/headline/headline.vue"
import { getURLParameter,dateFormat,empty } from 'utils/util'
import myDatepicker from 'vue-datepicker'
import headUrl from '../../../assets/headUrl.png'
export default {

  name: 'record',
  components: {
  },
  data () {
    return {
    	details:[],
    	thirdUniqueId:'',
    	tex:'',
    	start:'',
    	intertime:'',
      startTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD',
        placeholder: '请选择',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '1px solid #eee',
          'box-shadow': '0',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'width': '90px'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
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
      limit: [{
        type: 'weekday',
        available: [0,1, 2, 3, 4, 5,6]
      },
      {
        type: 'fromto',
        from: '2019-04-02',
        to: '2030-02-20'
      }],
      issucess:false,
      isvideo:false,
      iscancel:false,
      isinputhide:true,
      lasttimer:30,
      frontNum:'',
      videoid:'',
      headUrl:headUrl,
      videodetail:{},
      isonce:false
    }
  },
  methods:{
  	gotodoctor:function(){
  		var vm =this;
  		window.location.href = 'experts.html';
  	},
  	clicktime:function(){
  		var vm = this;
  		vm.isinputhide = false;
  		vm.isonce=true;
  		if(!empty(vm.startTime.time)){
  			var _start = vm.startTime.time+' '+'0:0:0';
  			var start = new Date(_start).getTime();
  			var end = parseInt(start)+86400000;
  		}else{
  			var start = '';
  			var end = '';
  		}
  		var staus = $('.status-select').val()
  		var tex = $('.name').val();
  		if(vm.isonce){
  			vm.getrecord(tex,start,end,staus);
  		}
  	},
  	gotojoin:function(id){
  		var vm = this;
  		vm.showtoast('敬请期待');
			vm.getdoctordetail(id,'join');
  	},
  	gotohint:function(id){
  		var vm = this;
  		vm.videoid = id;
  		vm.showtoast('未在工作时间');
  	},
  	goshowvideo:function(id){
  		var vm = this;
  		vm.issucess=false;
  		vm.creatromeid(id);
  		vm.frontNum = '';
  		setTimeout(function(){
  			vm.getdoctordetail(id,'wait');
  			vm.isvideo=true;
  		},100)
  	},
  	gotocancel:function(){
  		var vm = this;
  		vm.iscancel = true;
  	},
  	surecancel:function(){
  		var vm = this;
  		
  	},
  	closecancel:function(){
  		var vm = this;
  		vm.iscancel = false;
  	},
  	hideinput:function(){
  		var vm = this;
  		vm.isinputhide = false;
  	},
  	getphoneCode:function() {
  		var vm = this;
			var lasttimer = vm.lasttimer;
			clearInterval(timerGetphoneCode);
			timerGetphoneCode = setInterval(function() {
				if(lasttimer > 1) {
					lasttimer--;
					vm.lasttimer = lasttimer;
				} else {
					vm.lasttimer = 30;
					vm.isvideo=false;
					clearInterval(timerGetphoneCode);
				}
			}, 1000);
		},
  	getrecord:function(nam,start,end,sta){
  		var vm =this;
  		var obj={
  			'name':nam,
  			'startTime':start,
  			'status':sta,
  			'endTime':end,
  			'thirdUniqueId':vm.thirdUniqueId
  		}
  		getOutpatientHistory(obj).then(data=>{
  			vm.details = data.details;
	    }).catch(err=>{
	    	vm.alertDefault({
	    		text:err.data.resultMessage
	    	})
	    })
  	},
  	changeint:function(){
  		var vm = this;
  		console.log('1111');
  	},
  	initialize:function(){
  		var vm = this;
  		setTimeout(function(){
	    	var _height = document.body.clientHeight-$('.record-head-top').height()-60-15;
				$('.record-list').css('max-height',_height+'px');
	    },500)
  	},
  	seartext:function(elem){
  		var vm = this;
  		if(!empty(vm.startTime.time)){
  			var _start = vm.startTime.time+' '+'0:0:0';
  			var start = new Date(_start).getTime();
  			var end = parseInt(start)+86400000;
  		}else{
  			var start = '';
  		}
  		var staus = $('.status-select').val()
  		var tex = $('.name').val();
  		vm.getrecord(tex,start,end,staus);
  	},
  	changestatus:function(){
  		var vm =this;
  		if(!empty(vm.startTime.time)&&!vm.isinputhide){
  			var _start = vm.startTime.time+' '+'0:0:0';
  			var start = new Date(vm.startTime.time).getTime();
  			var end = parseInt(start)+86400000;
  		}else{
  			var start = '';
  			var end = '';
  		}
  		var staus = $('.status-select').val()
  		var tex = $('.name').val();
  		vm.tex = tex;
  		vm.getrecord(tex,start,end,staus);
  	},
  	getdoctordetail:function(id,tex){
  		var vm = this;
  		vm.videoid = id;
  		var obj = {
	  		clinicAppointmentId :id
	  	}
  		clinicAppointmentAccess(obj).then(data=>{
	  		var _data = data;
	  		vm.videodetail = data;
	  		var doctorHeadUrl = _data.doctorHeadUrl;
	  		var doctorName = _data.doctorName;
	  		var profession = _data.profession;
	  		var doctorState = '坐诊中';
	  		var doctorCompany = _data.organization;
	  		var department = _data.department;
	  		var patientHeadUrl = _data.patientHeadUrl;
	  		var patientName = _data.patientName;
	  		var patientGender = _data.patientGender;
	  		var patientAge = _data.patientAge;
	  		var patientId = _data.patientId;
	  		if(tex=='join'){
	  			window.android.startVideo(id,doctorHeadUrl,doctorName,profession,doctorState,doctorCompany,department,patientHeadUrl,patientName,patientGender,patientAge,patientId);
	  			vm.lasttimer = 30;
					vm.isvideo=false;
					clearInterval(timerGetphoneCode);
	  		}else{
	  			vm.getvideodetail();
	  		}
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
  	},
  	creatromeid:function(id){
			var vm = this;
			var romeobj = {
				clinicAppointmentId:id,
        videoRoomId:id
			}
			submitAppointmentRoomId(romeobj).then(data=>{
	     
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
		},
		closevideo:function(){
  		var vm = this;
  		vm.isvideo=false;
  		vm.lasttimer = 30;
			clearInterval(timerGetphoneCode);//去除远程信息轮询
  		clearInterval(vitimer);//去除倒计时轮询
  	},
  	getvideodetail:function(){
			var vm = this;
			clearInterval(vitimer);
			queryClinicAppointmentInfo({"clinicAppointmentId":vm.videoid}).then(data=>{
	      var videoRoomId =parseInt(data.videoRoomId);
	      var frontNum = data.frontNum;
	      vm.videoRoomId = videoRoomId;
	      vm.frontNum = frontNum;
	      if(frontNum<1){
	      	 vm.issucess=true;
	      	clearInterval(vitimer);
	      	vm.getphoneCode();
	      }else{
	      	 vm.setintvideo();
	      }
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
		},
		setintvideo:function(){
			var vm = this;
			vitimer = setInterval(function(){
				vm.getvideodetail();
  		},1200)
		},
		missClinic:function(id){
			var vm = this;
			var romeobj = {
				clinicAppointmentId:id
			}
			missClinicAppointment(romeobj).then(data=>{
	      vm.lasttimer = 30;
				vm.isvideo=false;
				clearInterval(timerGetphoneCode);
	      vm.showtoast('过号成功');
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
		},
		visitClinic:function(id){
			var vm = this;
			var romeobj = {
				clinicAppointmentId:id
			}
			visitClinicAppointment(romeobj).then(data=>{
	    }).catch(err=>{
	    })
		}
  },
  components:{
    headTop,
    headline,
    'date-picker': myDatepicker,
  },
  created () {
		var vm = this;
		var personId = getURLParameter('personId');
		if(personId){
			sessionStorage.setItem('personId',personId)
		}
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	var myDate = new Date();
  	var _startimer = dateFormat(myDate.getTime(),'Y-m-d');
  	var timer = dateFormat(myDate.getTime(),'Y-m-d')+' '+'0:0:0';
  	var mydatetwo = new Date(timer).getTime();
  	vm.start = parseInt(mydatetwo);
  	vm.intertime = parseInt(mydatetwo) + 86400000;
  	vm.thirdUniqueId = _doctorMsg.doctorId||417314456;
  	vm.startTime.time = _startimer;
  	vm.getrecord();
  	vm.initialize();
  },
  mounted(){
    var vm = this;
  },
  watch:{
  	'startTime.time':function(newVal){
  		var vm = this;
  		if(!empty(vm.startTime.time)){
  			var _start = vm.startTime.time+' '+'0:0:0';
  			var start = new Date(_start).getTime();
  			var end = parseInt(start)+86400000;
  		}else{
  			var start = '';
  		}
  		var staus = $('.status-select').val()
  		var tex = $('.name').val();
  		if(vm.isonce){
  			vm.getrecord(tex,start,end,staus);
  		}
  	}
  }
}
</script>
<style>
	.record{
		font-size: 1.6vw;
	}
	.record div.head{
			position: absolute;
    	top: 0rem;
    	left: 230px;
	}
	.record div.head .back{
		top: 50%;
		left:0;
    -webkit-transform: translateY(-45%);
    transform: translateY(-45%);
	}
	input,select{
		font-size: 16px;
	}
	.cov-date-body{
	}
	.record-head{
		line-height: 81px;
		padding-left: 350px;
	}
	.record-head-left{
    margin-left: 20px;
    margin-right: 10px;
	}
	.record-head>div {
    display: inline-block;
    margin-right: 20px;
	}
	.record .name-text{
		display: inline-block;
    height: 40px;
    margin-left: 14px;
	}
	.record .name-text input{
		height: 40px;
    width: 150px;
		padding-left: 10px;
    border: 1px solid #999;
	}
	.record .time,.record .status-text{
		display: inline-block;
		margin-left: 14px;
	}
	.status-select{
		outline: none;
    border: 0;
    background: #fff;
    border: 1px solid #999;
    height: 40px;
    width: 150px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.record-content{
    padding: 0px 1%;
    padding-left: 230px;
    padding-right: 30px;
	}
	.record-content-head{
		background: #f5faff;
    line-height: 60px;
    border-radius: 5px;
	}
	.record-list{
		padding-top: 10px;
		overflow: auto;
	}
	.record-content-head>div,.record-item>div {
	    display: inline-block;
	    text-align: center;
	 }
	 .make-time,.make-paly,.make-bumber{
	 	    width:20%;
	 }
	 .make-doctor{
	 	width: 14%;
	 }
	 .make-name,.make-status{
	 	width: 13%;
	 }
	 .record-item{
	 		line-height: 60px;
	 		font-size: 1.5vw;
	 		padding: 8px 0;
	 }
	 .make-operate span{
	 		display: inline-block;
	    background: #fc9453;
	    line-height: 55px;
	    width: 85%;
	    color: #fff;
	    border-radius: 5px;
	 }
	 .make-operate .cancelbtn{
	 	color: #fc9453;
    background: #fff;
    border: 1px solid #fc9453;
	 }
	 .make-operate .waiting{
 	    background: #3C9BFF;
	 }
	 .make-status.done{
	 	color: #3C9BFF;
	 }
	 .make-operate.done span{
	 		background: #fc9453;
	 }
	 .make-statu.unfinished{
	 	 color: #d43c33;
	 }
	 .make-operate.unfinished span{
	 		background: #3C9BFF;
	 }
	 .make-status .Finish{
	 	color: #333;
	 }
	 .make-status .Pending{
	 	color: #3C9BFF;
	 }
	 .make-status .Canceled{
	 	color: #999;
	 }
	 .make-status .Unpaid{
	 	color: #FC9452 ;
	 }
	 .make-operate .Pending{
	 		background:#3C9BFF;
	 }
	 .make-operate .Pending.overdue,.make-operate .Canceled{
	 		background:#eee;
	 		color: #999;
	 }
	 .cov-date-caption{
	 	color:#3C9BFF !important;
	 }
	 .checked{
	 	background:#3C9BFF !important;
	 }
	 .cov-datepicker{
	 	border-color:#999 !important;
	 	padding: 0 0 0 10px !important;
		box-sizing: border-box;
	 	width: 150px !important;
	 	height: 40px !important;
	 	line-height: 40px !important;
	 }
	 .cov-date-caption{
	 	font-size: 2vw !important;
	 	line-height: 1;
	 }
	 .cov-date-body,.cov-picker-box{
	 	width: 647px !important;
	 }
	 .cov-picker-box{
	 	height: 542px !important;
	 }
	 .day{
	 	width: 65px !important;
	 	height:60px !important;
    line-height: 60px !important;
    font-size: 23px;
	 }
	 .week ul{
 	    margin: 0 0 -20px !important;
	 }
	 .cov-picker-box{
	 	    padding: 10px 25px !important;
	 }
	 .cov-date-box{
	 	    background: #fff !important;
	 }
	 .cov-date-monthly{
	 	 height: 100px !important;
	 }
	 .cov-date-monthly > div{
 	    height: 100px !important; 
	 }
	 .cov-date-body .cov-date-monthly .cov-date-caption{
 	    padding: 30px 0!important;
	 }
	 .record-head-center{
	 	position: relative;
	 }
	 .opcinput{
	 	position: absolute;
    top: 0;
    left: 50px;
    z-index: 1;
	 	opacity: 0;
	 }
	 .hideinput{
    height: 40px;
    width: 140px;
    padding-left: 10px;
    border: 1px solid #999;
	 }
	 /**/
	.win-video{
	  position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    z-index: 2;
	}
	.win-video-content{
    width: 70%;
    margin-left: 15%;
    margin-top: 10%;
    background: #fff;
    border-radius: 10px;
    font-size: .32rem;
    position: relative;
	}
	.video-content-left{
		width: 40%;
    text-align: center;
    padding-top: 45px;
    height: 100%;
    background: #ebf5ff;
    padding-bottom: 45px;
    border-radius: 10px 0 0 10px;
    min-height: 370px;
	}
	.win-video-content>div {
    display: inline-block;
    vertical-align: text-top;
	}
	.video-left-bottom{
		background: #fff;
    width: 80%;
    margin-left: 10%;
    border-radius: 7px;
    margin-top: 30px;
    padding-bottom: 30px;
	}
	.video-left-bottom>p{
		margin-bottom: 10px;
	}
	.vi-icon{
		width: auto;
		height: 1.1rem;
		margin-top: -0.4rem;
    border-radius: 50%;
	}
	.vd-nam{
		font-size: 1.8vw;
    font-weight: bold;
	}
	.vi-status{
    background: #e9f4de;
		color: #4b9705;
    padding: 3px 5px;
	}
	.video-content-roght{
    text-align: center;
    width: 60%;
    padding: 30px 0;
	}
	.win-video-content>div {
    display: inline-block;
    vertical-align: text-top;
	}
	.wait-time,.wait-time-text{
		color: #d43c33;
		font-size: 0.36rem;
	}
	.patient-mess{
		padding: 0px 20%;
	}
	.patient-mess>p{
		border-bottom: 1px solid #eee;
    padding: 20px 0;
    font-size: 0.7rem;
	}
	.patient-mess>p img{
		width: 1.15rem;
    height: 1.15rem;
    vertical-align: middle;
    margin-right: 15px;
    border-radius: 50%;
	}
	.wait-detail{
    padding: 20px 0 35px 0;
    font-size: .4rem;
	}
	.wait-detail>p span{
		color: #F59C31;
	}
	.wait-detail>p span:nth-child(1){
		font-size: 1rem;
	}
	.wait-success{
		padding: 30px 0;
    font-size: 1rem;
    color: #3C9BFF;
	}
	.wait-hint{
		text-align: center;
	}
	.wait-hint p{
		display: inline-block;
    width: 45%;
    background: #3C9BFF;
    color: #fff;
    line-height: 1rem;
    border-radius: 10px;
    font-size: .48rem;
	}
	.wait-btn>p{
   	display: inline-block;
    line-height: 1rem;
	}
	.canceljoin{
		width: 20%;
    border: 1px solid #F59C31;
    color: #F59C31;
    border-radius: 5px;
    font-size: .48rem;
    margin-right: 10%;
	}
	.joinroom{
		width: 45%;
    background: #3C9BFF;
    color: #fff;
    line-height: 1rem;
    border-radius: 5px;
    font-size: .48rem;
	}
	.vi-close{
		position: absolute;
    top: 10px;
    right: 15px;
	}
	.vi-close img{
		width: auto;
    height: .6rem;
	}
	/**/
	.win-cancel{
		position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.6);
	}
	.win-cancel-content{
		position: absolute;
    width: 56%;
    left: 22%;
    background: #fff;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
    text-align: center;
    padding-top: .45rem;
	}
	.cancel-hint{
		font-size: 0.44rem;
    font-weight: bold;
	}
	.cancel-hint-text{
		padding: .5rem .2rem;
    font-size: .38rem;
    border-bottom: 1px solid #eee;
    color: #666;
	}
	.win-cancel-btn>div {
    display: inline-block;
    width: 50%;
    line-height: 1.08rem;
    font-size: .4rem;
	}
	.cancel-btn-left{
		border-right: 1px solid #eee;
    box-sizing: border-box;
    color: #666;
	}
	.cancel-btn-right{
		color: #3C9BFF;
	}
</style>
