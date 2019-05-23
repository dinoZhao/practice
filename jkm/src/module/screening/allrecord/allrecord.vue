<template>
  <div class="allrecord"> 
  	<div class="allrecord-head-top">
  		<!--<headTop/>-->
	  	<headline headtxt="预约" none></headline>
	  	<div class="allrecord-head">
	  		<div class="allrecord-head-left">
	  			日期<div class="time"><date-picker :date="startTime" :option="option" :limit="limit"></date-picker></div>
	  		</div><div class="allrecord-head-center">
	  				姓名<div class="name-text"><input type="text" placeholder="请输入" @input="seartext($event.targe)" class="name"/></div>
	  		</div><div class="allrecord-head-right">
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
  	<div class="allrecord-content">
  		<div class="allrecord-content-head">
  			<div class="make-time">
  				检查时间
  			</div><div class="make-name">
  				姓名
  			</div><div class="make-sex">
  				性别
  			</div><div class="make-paly">
  				类型
  			</div><div class="make-status">
  				状态
  			</div>
  		</div>
  		<ul class="allrecord-list">
  			<template v-for="(item,index) in details">
  				<li class="allrecord-item" @click.stop.prevent="gotoreport(item.medicalrecordId,item.personId)">
						<div class="make-time">
		  				{{item.examinationDate|fmat}}
		  			</div><div class="make-name">
		  				{{item.name}}
		  			</div><div class="make-sex" v-if="item.gender=='1'">
		  				男
		  			</div><div class="make-sex" v-if="item.gender=='0'">
		  				女
		  			</div><div class="make-paly">
		  				{{item.setMeal}}
		  			</div><div class="make-status">
		  				<span class="Finish" v-if="item.status=='Revisiting'||item.status=='Finish'||item.status=='Success'">已完成</span><span class="Pending" v-else-if="item.status=='Pending'">未完成</span><span class="Canceled" v-else-if="item.status=='Canceled'">已取消</span><span class="" style="color:333;" v-else>已完成</span>
		  			</div><div class="make-operate" v-if="item.medicalrecordId">
		  				查看
		  			</div>
					</li>  		
  			</template>
  		</ul>
  	</div>
  </div>
</template>
<script>
import $ from 'jquery'
import {getExamAndScreenList,clinicAppointmentAccess,submitAppointmentRoomId} from 'API/requst'
import headTop from 'components/common/headTop.vue'
import headline from "components/headline/headline.vue"
import { getURLParameter,dateFormat,empty } from 'utils/util'
import myDatepicker from 'vue-datepicker'
export default {

  name: 'hometest',
  components: {
  },
  data () {
    return {
    	details:[],
    	thirdUniqueId:'',
    	tex:'',
    	start:'',
    	type:'',
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
  	getrecord:function(nam,start,end,sta){
  		var vm =this;
  		var obj={
  			'name':nam,
  			'startTime':start,
  			'status':sta,
  			'endTime':end,
  			"type":vm.type,
  			'padDeviceCode':sessionStorage.getItem("padcode")||sessionStorage.getItem("padCode")
  		}
  		getExamAndScreenList(obj).then(data=>{
  			vm.details = data.result;
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
	    	var _height = document.body.clientHeight-$('.allrecord-head-top').height()-60-15;
				$('.allrecord-list').css('max-height',_height+'px');
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
  		if(!empty(vm.startTime.time)){
  			var _start = vm.startTime.time+' '+'0:0:0';
  			var start = new Date(vm.startTime.time).getTime();
  			var end = parseInt(start)+86400000;
  		}else{
  			var start = '';
  		}
  		var staus = $('.status-select').val()
  		var tex = $('.name').val();
  		vm.tex = tex;
  		vm.getrecord(tex,start,end,staus);
  	},
  	gotoreport:function(rid,pid){
  		var vm = this;
  		if(!empty(rid)&&!empty(pid)){
  			window.location.href = '../physical/report.html?recordId='+rid+'&personId='+pid;
  		}
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
		var type = getURLParameter('type');
		if(type=='ksjc'){
			vm.type = '快速检测';
		}else if(type=='jbsc'){
			vm.type = '疾病筛查';
		}
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	var myDate = new Date();
  	var timer = dateFormat(myDate.getTime(),'Y-m-d')+' '+'0:0:0';
  	var mydatetwo = new Date(timer).getTime();
  	vm.start = parseInt(mydatetwo);
  	vm.intertime = parseInt(mydatetwo) + 86400000;
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
	.allrecord{
		font-size: 1.6vw;
	}
	.allrecord div.head{
			position: absolute;
    	top: 0rem;
    	left: 230px;
	}
	.allrecord div.head .back{
		top: 50%;
		left: 0;
    -webkit-transform: translateY(-45%);
    transform: translateY(-45%);
	}
	input,select{
		font-size: 16px;
	}
	.cov-date-body{
	}
	.allrecord-head{
		line-height: 81px;
		padding-left: 380px;
	}
	.allrecord-head-left{
    margin-left: 20px;
    margin-right: 10px;
	}
	.allrecord-head>div {
    display: inline-block;
    margin-right: 20px;
	}
	.allrecord .name-text{
		display: inline-block;
    height: 40px;
    margin-left: 14px;
	}
	.allrecord .name-text input{
		height: 40px;
    width: 150px;
		padding-left: 10px;
    border: 1px solid #999;
	}
	.allrecord .time,.allrecord .status-text{
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
	.allrecord-content{
    padding: 0px 1%;
    padding-left: 230px;
    padding-right: 30px;
	}
	.allrecord-content-head{
		background: #f5faff;
    line-height: 60px;
    border-radius: 5px;
	}
	.allrecord-list{
		padding-top: 10px;
		overflow: auto;
	}
	.allrecord-content-head>div,.allrecord-item>div {
	    display: inline-block;
	    text-align: center;
	    width: 18%;
	 }
	 .allrecord-item .make-operate{
	 	width: 10%;
	 }
	 .allrecord-item{
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
	 	font-size: 2vw !important;
	 	line-height: 1;
	 }
	 .cov-date-body,.cov-picker-box{
	 	width: 647px !important;
	 }
	 .cov-picker-box{
	 	height: 522px !important;
	 }
	 .day{
	 	width: 65px !important;
	 	height: 65px !important;
    line-height: 65px !important;
    font-size: 23px;
	 }
</style>
