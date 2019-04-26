<template>
  <div class="record"> 
  	<headline none=""></headline><titleline headtxt="历史记录"></titleline>
  	<div class="record-head">
  		<div class="record-head-left">
  				姓名<div class="name-text"><input type="text" placeholder="请输入" @input="seartext($event.targe)" class="name"/></div>
  		</div><div class="record-head-center">
  			日期<div class="time"><date-picker :date="startTime" :option="option" :limit="limit"></date-picker></div>
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
  	<input type="text" @change="changeint" v-model="startTime.time" style="position: absolute;top: -10%;opacity: 0;"/>
  	<div class="record-content">
  		<div class="record-content-head">
  			<div class="make-time">
  				预约时间
  			</div><div class="make-name">
  				姓名
  			</div><div class="make-sex">
  				性别
  			</div><div class="make-paly">
  				计划时间
  			</div><div class="make-doctor">
  				预约医生
  			</div><div class="make-status">
  				状态
  			</div><div class="make-operate">
  				操作
  			</div>
  		</div>
  		<ul class="record-list">
  			<template v-for="(item,index) in details">
  				<li class="record-item">
						<div class="make-time">
		  				{{item.appointTime|fmat}}
		  			</div><div class="make-name">
		  				{{item.pName}}
		  			</div><div class="make-sex">
		  				{{item.pSex}}
		  			</div><div class="make-paly">
		  				{{item.startTime|fmat}}
		  			</div><div class="make-doctor">
		  				{{item.dName}}
		  			</div><div class="make-status">
		  				<span class="Finish" v-if="item.status=='Finish'">已完成</span><span class="Pending" v-else-if="item.status=='Pending'">预约中</span><span class="Canceled" v-else-if="item.status=='Canceled'">已取消</span>
		  			</div><div class="make-operate">
		  				<span @click="gotodoctor" class="Finish" v-if="item.status=='Finish'" v-bind:data-code="item.id" style="color: #3C9BFF;border: 1px solid #3C9BFF;background: #fff;">再次预约</span>
		  				<span class="Pending" v-else-if="item.status=='Pending'&&start<item.startTime&&item.startTime<intertime" v-bind:data-code="item.id" @click="gotojoin(item.id)">候诊</span>
		  				<span class="Pending overdue" v-else-if="item.status=='Pending'" v-bind:data-code="item.id" @click="gotojoin(item.id)">候诊</span>
		  				<span class="Canceled" v-else-if="item.status=='Canceled'" v-bind:data-code="item.id" @click="gotodoctor">再次预约</span>
		  			</div>
					</li>  		
  			</template>
  		</ul>
  	</div>
  </div>
</template>
<script>
import {getOutpatientHistory,clinicAppointmentAccess,submitAppointmentRoomId} from 'API/requst'
import headline from 'components/headline/headline.vue'
import titleline from 'components/titleline/titleline.vue'
import { getURLParameter,dateFormat,empty } from 'utils/util'
import myDatepicker from 'vue-datepicker'
export default {

  name: 'record',
  components: {
  },
  data () {
    return {
    	details:[],
    	thirdUniqueId:'',
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
        from: '2000-01-01',
        to: '2030-02-20'
      }]
    }
  },
  methods:{
  	gotodoctor:function(){
  		var vm =this;
  		window.location.href = 'experts.html';
  	},
  	gotojoin:function(id){
  		var vm = this;
  		vm.getdoctordetail(id);
  		vm.creatromeid(id);
  		//window.location.href = 'joinup.html?id='+id;
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
  		console.log(tex);
  		vm.getrecord(tex,start,end,staus);
  	},
  	changestatus:function(){
  		var vm =this;
  		if(!empty(vm.startTime.time)){
  			var _start = vm.startTime.time+' '+'0:0:0';
  			var start = new Date(vm.startTime.time).getTime();
  			var end = parseInt(start)+86400000;
  		}else{
  			var start = '';
  		}
  		var staus = $('.status-select').val()
  		var tex = $('.name').val();
  		vm.getrecord(tex,start,end,staus);
  	},
  	getdoctordetail:function(id){
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
    headline,
    'date-picker': myDatepicker,
    titleline
  },
  created () {
  	var vm = this;
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	var newdate = parseInt(new Date().getTime());
  	vm.start = newdate;
  	vm.intertime = newdate + 3600000;
  	vm.thirdUniqueId = _doctorMsg.doctorId||417314456;
  	vm.getrecord();
  	vm.initialize();
  },
  mounted(){
    
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
  		vm.getrecord(tex,start,end,staus);
  	}
  }
}
</script>
<style>
	.record{
		font-size: 1.6vw;
	}
	input,select{
		font-size: 16px;
	}
	.cov-date-body{
	}
	.record-head{
		margin-top: 80px;
		padding: 20px 10px;
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
	    padding: 0px 2%;
	}
	.record-content-head{
		background: #f5faff;
    line-height: 60px;
    border-radius: 5px;
	}
	.record-list{
		padding-top: 10px;
	}
	.record-content-head>div,.record-item>div {
	    display: inline-block;
	    text-align: center;
	 }
	 .make-time,.make-paly{
	 	    width: 17.5%;
	 }
	 .make-doctor{
	 	width: 17%;
	 }
	 .make-name,.make-sex,.make-status,.make-operate{
	 	width: 12%;
	 }
	 .record-item{
	 		line-height: 60px;
	 		font-size: 1.5vw;
	 		padding: 8px 0;
	 }
	 .make-operate span{
	 		display: inline-block;
	    background: #fc9453;
	    line-height: 60px;
	    width: 75%;
	    color: #fff;
	    border-radius: 5px;
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
	 	color: #3C9BFF;
	 }
	 .make-status .Pending{
	 	color: #d43c33;
	 }
	 .make-status .Canceled{
	 	color: #d43c33;
	 }
	 .make-operate .Pending{
	 		background:#3C9BFF;
	 }
	 .make-operate .Pending.overdue{
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
	 	font-size: 1.5vw !important;
	 }
	 .cov-date-body,.cov-picker-box{
	 	width: 647px !important;
	 }
	 .cov-picker-box{
	 	height: 420px !important;
	 }
	 .day{
	 	width: 65px !important;
	 	height: 65px !important;
    line-height: 65px !important;
    font-size: 23px;
	 }
</style>
