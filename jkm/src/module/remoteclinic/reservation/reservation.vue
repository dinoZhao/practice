<template>
  <div class="reservation"> 
  	<headTop />
  	<div class="navigation">
  		<div :class="['navigation-item',isrecord?'':'on']" @click.stop="changetab('当日就诊')">当日就诊</div><div :class="['navigation-item',isrecord?'on':'']" @click.stop="changetab('预约记录')">预约记录</div>
  		<div class="reservation-time-right" @click="gotorecord" style="float: right;margin-top: 15px;">
	  			<img src="../../../assets/record.png" /><span>全部记录</span>
	  		</div>
  	</div>
  	<div class="navigation-day" v-show="!isrecord">
  		<div class="doctor-content">
	  		<div class="doctor-content-head">
	  			<template v-for="(item,index) in doctorlist">
	  				<template v-if="index==0">
	  					<div :class="['doctor-name-item',item.iselect?'on':'']" v-bind:style="{'z-index':item.zindex}" @click.stop="changedoctor($event.target,item.id)">
			  				<div class="doctor-item-content">
			  					<div class="doctor-item-office"><span class="doctor-department">{{item.department}}</span>
			  						<span class="doctor-circle Visiting" v-if="item.tableStatus=='Visiting'"></span>
			  						<span class="doctor-circle Left" v-else-if="item.tableStatus=='Left'"></span>
			  						<span class="doctor-circle Suspended" v-else-if="item.tableStatus=='Suspended'"></span>
			  						<span class="doctor-circle Visiting" v-else></span></div><span style="font-weight: bold;font-size: .3rem;">{{item.dName}}</span><span class="doctor-line"></span>
			  				</div>
			  				<div class="doctor-item-banner">
			  					<img :src="item.iselect?chebackg:nobackg" class="doctor-name-icon"/>
			  				</div>
			  			</div>
	  				</template>
	  				<template v-if="index!=0" >
	  					<div :class="['doctor-name-item',item.iselect?'on':'']" v-bind:style="{'z-index':item.zindex}" @click.stop="changedoctor($event.target,item.id)">
			  				<div class="doctor-item-content">
			  					<div class="doctor-item-office">
			  						<span class="doctor-department">{{item.department}}</span>
			  						<span class="doctor-circle Visiting" v-if="item.tableStatus=='Visiting'"></span>
			  						<span class="doctor-circle Left" v-else-if="item.tableStatus=='Left'"></span>
			  						<span class="doctor-circle Suspended" v-else-if="item.tableStatus=='Suspended'"></span>
			  						<span class="doctor-circle Visiting" v-else></span></div><span style="font-weight: bold;font-size: .3rem;">{{item.dName}}</span><span class="doctor-line"></span>
			  				</div>
			  				<div class="doctor-item-banner">
			  					<img :src="item.iselect?chebackg:nobackg" class="doctor-name-icon"/>
			  				</div>
			  			</div>
	  				</template>
	  			</template>
	  		</div>
	  		<div class="doctor-content-bottom">
	  			<div class="doctor-bottom-left" v-if="doctorlist.length>0">
	  				<div class="doctor-bottom-status">
	  					<span class="Visiting" v-if="tableStatus=='Visiting'">坐诊中</span>
	  					<span class="Suspended" v-else-if="tableStatus=='Suspended'">离线</span>
	  					<span class="Left" v-else-if="tableStatus=='Left'">离开</span>
	  					<span class="Visiting" v-else>坐诊中</span>
	  				</div>
	  				<div class="doctor-bottom-headurl"><img :src="doctorDeatil.dUrl?doctorDeatil.dUrl:'../../../assets/headUrl.png'"/></div>
	  				<div class="doctor-bottom-name"><span>{{doctorDeatil.dName}}</span>{{doctorDeatil.profession}}</div>
	  				<div class="doctor-bottom-hsp"><span>{{doctorDeatil.organization}}</span><br/>{{doctorDeatil.department}}</div>
	  				<!--<div class="doctor-bottom-number"><span>8</span>/20</div>-->
	  				<div class="doctor-bottom-time" style="font-size: .25rem;text-align: left;padding-left: 10px;"><span>坐诊时间:</span><span>{{doctorDeatil.tableStartTime}}</span>~<span>{{doctorDeatil.tableEndTime}}</span></div>
	  			</div><div class="doctor-bottom-right">
	  				<ul class="doctor-bottom-list" style="margin-bottom: 40px;">
	  					<template v-for="(item,index) in appointments">
	  						<li class="doctor-list-item">
		  						<div class="doctor-item-box">
		  							<span>{{item.id}}</span>
		  						</div><div class="doctor-item-box doctor-box-sex" style="width: 23%;">
		  							<span>{{item.pName}}</span><span>{{item.pSex}}</span><span>{{item.pAge}}岁</span>
		  						</div><div class="doctor-item-box doctor-box-status">
	  									状态<span class="status-text" v-if="item.status=='Revisiting'">已就诊</span>
												<span class="status-text" v-else-if="item.status=='Waiting'">候诊中</span>
												<span class="status-text" v-else-if="item.status=='Calling'">候诊中</span>
												<span class="status-text" v-else-if="item.status=='Pending'">待就诊</span>
												<span class="status-text" v-else-if="item.status=='Missed'">已过号</span>
												<span class="status-text" v-else-if="item.status=='Canceled'">已取消</span>
												<span class="status-text" v-else-if="item.status=='Finish'">已完成</span>
												<span class="status-text" v-else-if="item.status=='Disabled'">已失效</span>
												<span class="status-text" v-else-if="item.status=='Unpaid'">待支付</span>
												<span class="status-text" v-else-if="item.status=='Visiting'">已就诊</span>
												<span class="status-text" v-else-if="item.status=='Success'">预约成功</span>
		  						</div><div class="doctor-item-box doctor-box-operation btn" v-if="item.status!='Disabled'&&item.status!='Finish'&&item.status!='Canceled'" style="width: 20%;">
		  							<span class="Revisiting" v-if="item.status=='Revisiting'"  @click="goshowvideo(item.id)" v-bind:data-id="item.id">重新候诊</span>
										<span class="Waiting" v-else-if="item.status=='Waiting'&&item.frontNum!=0"  v-bind:data-id="item.id">{{item.frontNum}}人/{{item.frontNum*5}}分钟</span>
										<span class="Waiting" v-else-if="item.status=='Waiting'&&item.frontNum==0" v-bind:data-id="item.id">到号请准备</span>
										<span class="Calling Waiting" v-else-if="item.status=='Calling'" v-bind:data-id="item.id">到号请准备</span>
										<span class="Pending" v-else-if="item.status=='Pending'"  v-bind:data-id="item.id">候诊中</span>
										<span class="Missed Revisiting" v-else-if="item.status=='Missed'"  v-bind:data-id="item.id" @click="goshowvideo(item.id)">重新候诊</span>
										<span class="Canceled" v-else-if="item.status=='Canceled'"  v-bind:data-id="item.id">已取消</span>
										<span class="Waiting" v-else-if="item.status=='Unpaid'"  v-bind:data-id="item.id">待支付</span>
										<span class="Pending" v-else-if="item.status=='Visiting'"  v-bind:data-id="item.id">连线中</span>
										<span class="Pending" v-else-if="item.status=='Success'"  v-bind:data-id="item.id">连线中</span>
										<span class="Finish" v-else-if="item.status=='Disabled'"  v-bind:data-id="item.id">已失效</span>
										<span class="Finish" v-else-if="item.status=='Finish'"  v-bind:data-id="item.id">已完成</span>
										<span class="Finish" v-else v-bind:data-id="item.id">重新候诊</span>
		  						</div><div class="doctor-item-box case-history" v-if="item.visitingRecordId" @click="showcheck(item.personId,item.visitingRecordId,item.id)">
		  							<span>病历</span><img src="../../../assets/check-right.png" />
		  						</div>
		  					</li>
	  					</template>
	  				</ul>
	  			</div>
	  		</div>
	  	</div>
  	</div>
  	<div class="navigation-record" v-show="isrecord">
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
	  		</div>
	  	</div>
	  	<div class="reservation-content">
	  		<div class="content-left">
	  			<ul class="content-list">
	  				<template v-for="(item,index) in result">
	  					<li class="content-item">
	  						<template v-for="(str,ind) in item.details">
									<div class="item-text item-one done">
											<div class="item-left">
												<div class="item-time">
													<span class="">{{item.startTime|tim}}</span>
												</div>
											</div><div class="item-right">
												<div class="patient" style="width:20%">
													<span class="name">{{str.pName}}</span><span class="sex">{{str.pSex}}</span><span class="age" style="margin-left:5px;" v-if="str.pAge!='null'">{{str.pAge}}岁</span>
												</div><div class="experts" style="width:26%">
													<span>预约专家</span><span class="experts-name">{{str.dName}}</span><span class="doctor-atatus online" v-if="str.schedulingStatus=='Visiting'" style="margin-left: 5px;">坐诊中</span><span class="doctor-atatus suspend" v-else-if="str.schedulingStatus=='Suspended'" style="margin-left: 5px;">离线</span><span class="doctor-atatus leave" v-else-if="str.schedulingStatus=='Left'" style="margin-left: 5px;">离开</span>
												</div><div class="status" style="width:17%">
													<span>状态</span>
													<span class="status-text" v-if="str.status=='Revisiting'">已就诊</span>
													<span class="status-text" v-else-if="str.status=='Waiting'">候诊中</span>
													<span class="status-text" v-else-if="str.status=='Calling'">候诊中</span>
													<span class="status-text" v-else-if="str.status=='Pending'">待就诊</span>
													<span class="status-text" v-else-if="str.status=='Missed'">已过号</span>
													<span class="status-text" v-else-if="str.status=='Canceled'">已取消</span>
													<span class="status-text" v-else-if="str.status=='Finish'">已完成</span>
													<span class="status-text" v-else-if="str.status=='Disabled'">已失效</span>
													<span class="status-text" v-else-if="str.status=='Unpaid'">待支付</span>
													<span class="status-text" v-else-if="str.status=='Visiting'">已就诊</span>
													<span class="status-text" v-else-if="str.status=='Success'">预约成功</span>
													<span class="status-text" v-else>候诊中</span>
												</div><div class="btn" v-if="item.endTime>intertime">
													<template v-if="item.endTime<=intertime">
														<span class="Revisiting" v-if="str.status=='Revisiting'"  @click="goshowvideo(str.id)" v-bind:data-id="str.id">重新候诊</span>
														<span class="Waiting" v-else-if="str.status=='Waiting'&&str.frontNum!=0"  v-bind:data-id="str.id">{{str.frontNum}}人/{{str.frontNum*5}}分钟</span>
														<span class="Waiting" v-else-if="str.status=='Waiting'&&str.frontNum==0" v-bind:data-id="str.id">到号请准备</span>
														<span class="Calling Waiting" v-else-if="str.status=='Calling'" v-bind:data-id="str.id">到号请准备</span>
														<span class="Pending" v-else-if="str.status=='Pending'"  v-bind:data-id="str.id">候诊中</span>
														<span class="Missed Revisiting" v-else-if="str.status=='Missed'"  v-bind:data-id="str.id" @click="goshowvideo(str.id)">重新候诊</span>
														<span class="Canceled" v-else-if="str.status=='Canceled'"  v-bind:data-id="str.id">已取消</span>
														<span class="Waiting" v-else-if="str.status=='Unpaid'"  v-bind:data-id="str.id">待支付</span>
														<span class="Pending" v-else-if="str.status=='Visiting'"  v-bind:data-id="str.id">连线中</span>
														<span class="Pending" v-else-if="str.status=='Success'"  v-bind:data-id="str.id">连线中</span>
														<span class="Finish" v-else-if="str.status=='Disabled'"  v-bind:data-id="str.id">已失效</span>
														<span class="Finish" v-else-if="str.status=='Finish'"  v-bind:data-id="str.id">已完成</span>
														<span class="Finish" v-else v-bind:data-id="str.id">重新候诊</span>
													</template>
													<template v-else>
														<span class="cancelbtn" v-bind:data-id="str.id" @click.stop="cancelclick(str.id)" v-if="str.status=='Pending'">取消预约</span>
													</template>
												</div><div class="checkrecord" @click="showcheck(str.personId,str.visitingRecordId,str.id)" v-if="str.visitingRecordId" style="width:15%;"><span>查看病历</span><img src="../../../assets/check-right.png"/></div>
												<div class="right-line"></div>
											</div>
									</div>
	  						</template>
		  				</li>
	  				</template>
	  			</ul>
	  		</div>
				<div class="content-right"></div>
	  	</div>
  	</div>
  	<div class="subscribe-btn" @click="gotoexpert"><img src="../../../assets/subscribe.png" /></div>
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
var timerecod = null;var timerGetphoneCode = null;var vitimer = null;var timerAppoint = null;
import {getOutpatientRecord,clinicAppointmentAccess,submitAppointmentRoomId,queryClinicAppointmentInfo,missClinicAppointment,visitClinicAppointment,queryDoctorListToday,queryAppointmentDetailByDoctor,cancelAppointment} from 'API/requst'
import headTop from 'components/common/headTop.vue'
import { getURLParameter,dateFormat } from 'utils/util'
import myDatepicker from 'vue-datepicker'
import $ from 'jquery'
import headUrl from '../../../assets/headUrl.png'
import nobackg from '../../../assets/nobackgrounf.png'
import chebackg from '../../../assets/checkbackground.png'
export default {
  name: 'reservation',
  components: {
  },
  data () {
    return {
      datelist:[],
      result:[],
      appointments:[],
      start:'',
      timenum:'',
      nobackg:nobackg,
      chebackg:chebackg,
      headUrl:headUrl,
      intertime:'',
      thirdUniqueId:'',
      detail:{},
      startTimecha:'',
      endTimecha:'',
      issucess:false,
      isvideo:false,
      isrecord:false,
      iscancel:false,
      lasttimer:30,
      frontNum:'',
      videoid:'',
      videodetail:{},
      doctorDeatil:{},
      doctorlist:[],
      doctorId:'',
      tableStatus:'',
      cancelid:''
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
  	showcheck:function(pid,vid,id){
  		var vm = this;
  		window.location.href='./checkRecord.html?recordId='+pid+'&vid='+vid+'&clinicAppointmentId='+id;
  	},
  	changetab:function(tex){
  		var vm = this;
  		clearInterval(timerAppoint);
  		clearInterval(timerecod);
  		if(tex=='当日就诊'){
  			vm.getDoctorListToday();
  		}else if(tex=='预约记录'){
  			vm.getRecord();
  		}
  		vm.isrecord = !vm.isrecord;
  	},
  	changedoctor:function(elem,id){
  		var vm = this;
  		var doctorlist = vm.doctorlist;
  		clearInterval(timerAppoint);
  		doctorlist.forEach(function(item,index,arr){
  			if(item.id==id){
  				item.iselect = true;
  				item.zindex = arr.length;
  				vm.tableStatus = item.tableStatus;
  			}else{
  				item.iselect = false;
  				item.zindex = arr.length-index;
  			}
  		})
  		clearInterval(timerAppoint);
  		vm.doctorId = id;
  		vm.getAppointmentDetail(id);
  	},
  	closevideo:function(){
  		var vm = this;
  		vm.isvideo=false;
  		vm.lasttimer = 30;
			clearInterval(timerGetphoneCode);//去除远程信息轮询
  		clearInterval(vitimer);//去除倒计时轮询
  	},
  	goshowvideo:function(id){
  		var vm = this;
  		vm.creatromeid(id);
//			vm.frontNum = '';
//			vm.issucess=false;
//			setTimeout(function(){
//				vm.getpatientdetail(id,'wait');
//				vm.isvideo=true;
//			},100)
  	},
  	getDoctorListToday:function(){
  		var vm = this;
  		queryDoctorListToday().then(data=>{
  			var doctors = data.doctors;
  			doctors.forEach(function(item,index,arr){
  				if(index==0){
  					item.iselect = true;
  					item.zindex = arr.length;
  				}else{
  					item.iselect = false;
  					item.zindex = arr.length-1;
  				}
  			})
  			vm.doctorlist = doctors;
  			vm.doctorId = doctors[0].id;
  			vm.tableStatus = doctors[0].tableStatus;
  			vm.getAppointmentDetail(doctors[0].id);
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
  	},
  	getAppointmentDetail:function(id){
  		var vm = this;
  		var obj = {
  			doctorId:vm.doctorId,
  			uniqueId:vm.thirdUniqueId
  		}
  		clearInterval(timerAppoint);
  		clearInterval(timerecod);
  		queryAppointmentDetailByDoctor(obj).then(data=>{
  			var doctorDeatil = data.result;
  			doctorDeatil.tableStartTime = dateFormat(parseInt(doctorDeatil.tableStartTime), 'G:i');
  			doctorDeatil.tableEndTime = dateFormat(parseInt(doctorDeatil.tableEndTime), 'G:i');
  			vm.doctorDeatil = doctorDeatil;
  			vm.appointments = doctorDeatil.appointments;
  			vm.getAppointmentTwo();
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
  	},
  	getAppointmentTwo:function(){
  		var vm = this;
  		timerAppoint = setInterval(function(){
  			vm.getAppointmentDetail();
  		},2000)
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
  	gotojoin:function(id){
  		var vm = this;
  		vm.getpatientdetail(id,'join');
  		vm.visitClinic(id);//就诊
  		//vm.creatromeid(id);
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
  		clearInterval(timerAppoint);
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
  	getpatientdetail:function(id,tex){
  		var vm = this;
  		var obj = {
	  		clinicAppointmentId :id
	  	}
  		vm.videoid = id;
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
	     vm.showtoast('已成功候诊');
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
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
		},
		cancelclick:function(id){
			var vm = this;//取消预约
			vm.cancelid = id;
			vm.iscancel = true;
		},
		closecancel:function(){
  		var vm = this;
  		vm.iscancel = false;
  	},
  	surecancel:function(){
  		var vm = this;
  		var obj={
  			appointmentId:vm.cancelid
  		}
  		cancelAppointment(obj).then(data=>{
  			vm.iscancel = false;
	   }).catch(err=>{
	    	vm.alertDefault({
	    		text:err.data.resultMessage,
					rowButton:false,
					leftButtonText:'取消',
					rightButtonText: '确定'
	    	})
	    })
  	},
  	initialize:function(){
  		var vm = this;
  		setTimeout(function(){
	    	var _height = document.body.clientHeight-190;
	    	var _height2 = document.body.clientHeight-170;
				$('.doctor-bottom-right').css('max-height',_height+'px');
				$('.doctor-bottom-right').css('overflow','auto');
				$('.content-left').css('max-height',_height2+'px');
				$('.content-left').css('overflow','auto');
	    },500)
  	},
  },
  components:{
    headTop,
  },
  created () {
		var vm = this;
		if(window.android){
			window.android.showPopu()
		}
		//获取personId并存入sessionStorge--head
		var personId = getURLParameter('personId');
		if(personId){
			sessionStorage.setItem('personId',personId)
		}
  	var _url = window.location.origin+'/jkjch5/issue/remoteclinic/reservation.html?index=3'+','+window.location.href;
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
  	vm.start = mydatetwo;
  	vm.intertime = mydatetwo+86400000;
  	console.log(vm.start)
  	console.log(vm.intertime)
  	vm.startTimecha = vm.timenum;
		vm.endTimecha = vm.timenum+86400000;
		vm.getDoctorListToday();
		vm.initialize();
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
	.reservation-time{
		padding-left: 220px;
    padding-top: 20px;
    /*position: fixed;
    width: calc(100% - 40px);*/
    top: 0rem;
    left: 0;
    background: #fff;
    z-index: 1;
		border-bottom: 1px solid #eee;
	}
	.reservation-content{
		padding-top: 15px;
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
    height: .9rem;
	}
	.reservation .time-left-item span {
    display: block;
	}
	.reservation .time-left-item>span:nth-child(1){
		font-size: 1.5vw;
	}
	.reservation .time-left-item>span:nth-child(2){
		font-size: 1.8vw;
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
    font-size: .32rem;
	}
	.reservation .content-left{
    padding: 0 10px 0 220px;
    vertical-align: top;
    color: #999;
	}
	.reservation .item-left{
		display: inline-block;
    width: 9%;
    text-align: center;
    font-size: 1.5vw;
    line-height: 69px;
	}
	.reservation .item-right{
		width: 88%;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    border-bottom: 1px solid #eee;
    position: relative;
	}
	.reservation .item-right>div {
    display: inline-block;
    line-height: .7rem;
    padding: 8px 0;
    height: .7rem;
    width: 21%;
    vertical-align: top;
	}
	.reservation .item-right .btn{
		width: 13%;
    padding: 8px 10px;
    padding-left: 0;
	}
	.reservation .patient {
		margin-left: 2%;
	}
	.reservation .btn span{
		width: 100%;
    text-align: center;
    border-radius: 5px;
    color: #3C9BFF;
    font-size: 1.5vw;
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
    top: 4px;
	}
	.reservation .name,.reservation .experts-name{
		color: #333;
	}
	.reservation .name{
		font-size: 1.6vw;
	}
	.reservation .content-list{
		width: 100%;
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
		color: #333;
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
    width: 1.5rem;
    height: auto;
	}
	/*状态*/
	.btn span.Revisiting{
		color: #fff;
		background: #3C9BFF;
	}
	.btn span.Canceled{
		color: #999;
		background: #fff;
	}
	.btn span.Waiting{
		color: #FC9452;
	}
	.btn span.Finish{
		color: #333;
	}
	.btn span.cancelbtn{
		color: #FC9452;
    border: 1px solid #FC9452;
	}
	/*tag*/
	.doctor-atatus{
    padding: 3px 5px;
    font-size: 1.2vw;
    border-radius: 3px;
	}
	.doctor-atatus.online{
		color: #1FAD00;
    background: #efffe5;
	}
	.doctor-atatus.suspend{
		color: #ff3800;
    background: #ffd9cc;
	}
	.doctor-atatus.leave{
		color: #999;
    background: #eee;
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
    background: #fff;
    border-radius: 10px;
    font-size: .32rem;
    position: absolute;
    top: 50%;
    left: 20%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
	}
	.video-content-left{
		width: 40%;
    text-align: center;
    padding-top: 45px;
    height: 100%;
    background: #ebf5ff;
    padding-bottom: 45px;
    border-radius: 10px 0 0 10px;
    min-height: 390px;
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
	/*当日就诊*/
	.navigation{
		border-bottom: 1px solid #eee;
    padding-left: 220px;
	}
	.navigation-day{
		font-size: .32rem;
	}
	.navigation-item{
		display: inline-block;
    font-size: .32rem;
    padding: 15px 20px;
    
	}
	.navigation-item.on{
		color: #3C9BFF;
    border-bottom: 2px solid #3C9BFF;
	}
	.doctor-content{
		padding-left: 220px;
	}
	.doctor-content-head{
		padding-top: 15px;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
	}
	.doctor-content-head>div {
    display: inline-block;
    vertical-align: bottom;
    width: 19%;
    text-align: center;
    height: 75px;
    position: relative;
    margin-left: -5%;
    color: #666;
	}
	.doctor-content-head>div:nth-child(1){
		margin-left: 0;
	}
	.doctor-circle{
		display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    vertical-align: middle;
	}
	.doctor-circle.Visiting{
		background: #68FF00;
	}
	.doctor-circle.Left{
		background: #fc9452 ;
	}
	.doctor-circle.Suspended{
		background: #ccc;
	}
	.doctor-line{
		display: none;
	}
	.doctor-name-item.on{
		color:#3C9BFF;
	}
	.doctor-name-item.on .doctor-line{
		display: inline-block;
    width: 30px;
    height: 2px;
    background: #3C9BFF;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
	}
	.doctor-content-bottom{
		padding: 20px 20px 0 20px;
	}
	.doctor-content-bottom>div {
    display: inline-block;
    vertical-align: top;
	}
	.doctor-bottom-left{
		width: 22%;
    text-align: center;
    margin-right: 2%;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding-bottom: 30px;
    color: #666;
	}
	.doctor-bottom-status>span{
    display: inline-block;
    width: 100%;
    padding: 5px 0;
	}
	.doctor-bottom-status .Visiting{
		background: #efffe5;
    color: #1FAD00;
	}
	.doctor-bottom-status .Suspended{
		background:rgba(204,204,204,0.1);
    color: #666;
	}
	.doctor-bottom-status .Left{
		background:rgba(252,148,82,0.1);
    color: #FC9452;
	}
	.doctor-bottom-headurl img{
		width: 1.2rem;
    height: 1.2rem;
    margin: 20px 0 20px 0;
    border-radius: 50%;
	}
	.doctor-bottom-name>span{
		color: #333;
    margin-right: 10px;
	}
	.doctor-bottom-hsp{
		margin: 10px 0;
		text-align: left;
    padding: 10px 10px 10px 10px;
	}
	
	.doctor-bottom-number>span{
		font-size: 1rem;
		color: #3C9BFF;
	}
	.doctor-bottom-right{
		width: 76%;
	}
	.doctor-list-item>div {
    display: inline-block;
    width: 21%;
    line-height: .7rem;
	}
	.doctor-box-sex>span{
		color: #666;
	}
	.doctor-box-sex>span:nth-child(1){
		color: #333;
	}
	.doctor-box-sex>span:nth-child(1),.doctor-box-sex>span:nth-child(2){
		margin-right: 10px;
	}
	.doctor-box-status{
		color: #666;
	}
	.doctor-box-status span{
		color: #333;
		margin-left: 5px;
	}
	.doctor-list-item .case-history{
		width: 15%;
		text-align: center;
	}
	.case-history span{
		vertical-align: middle;
		color: #3C9BFF;
	}
	.case-history img{
		margin-left: 10px;
		vertical-align: middle;
	}
	.doctor-list-item{
		border-bottom: 1px solid #eee;
    padding: 10px 0;
	}
	.doctor-box-operation span{
		display: inline-block;
    width: 85%;
    text-align: center;
    border-radius: 5px;
	}
	.doctor-box-operation span.anew{
		background: #3C9BFF;
		color: #fff;
	}
	.doctor-box-operation span.waiting{
		color: #FC9452;
	}
	.doctor-box-operation span.pending{
		color:#3C9BFF;
	}
	.doctor-item-office{
    display: block;
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: .22rem;
	}
	.doctor-department{
		display: inline-block;
		margin-right: 5px;
		max-width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
	}
	.doctor-name-item.on .doctor-item-office{
		margin-top: 10px;
	}
	.doctor-item-content{
		position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 75px;
	}
	.doctor-item-banner{
		height: 75px;
	}
	.doctor-item-banner img{
		width: 100%;
		height: 75px;
	}
	.doctor-name-item.on{
		height: 85px;
	}
	.doctor-name-item.on .doctor-item-office{
		font-size: .25rem;
	}
	.doctor-name-item.on .doctor-item-content{
		height: 85px;
	}
	.doctor-name-item.on .doctor-item-banner{
		height: 85px;
	}
	.doctor-name-item.on .doctor-item-banner img{
		 height: 85px;
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
    width: 60%;
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
