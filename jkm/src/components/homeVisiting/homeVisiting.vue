<template>
  <div class="record"> 
  	<headline headtxt="全部记录" none=""></headline>
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
  				计划时间
  			</div><div class="make-name">
  				姓名
  			</div><div class="make-sex">
  				性别
  			</div><div class="make-paly">
  				随访类型
  			</div><div class="make-status">
  				状态
  			</div>
  		</div>
  		<ul class="record-list">
  			<template v-for="(item,index) in details">
  				<li class="record-item">
						<div class="make-time">
		  				{{item.examinationDate|fmat}}
		  			</div><div class="make-name">
		  				{{item.name}}
		  			</div><div class="make-sex">
		  				{{item.gender}}
		  			</div><div class="make-paly">
		  				{{item.setMeal|fmat}}
		  			</div><div class="make-status">
		  				<span class="Finish" v-if="item.status=='Success'">已完成</span><span class="Pending" v-else-if="item.status=='Pending'">预约中</span><span class="Canceled" v-else-if="item.status=='Canceled'">已取消</span>
		  			</div><div class="make-operate">
		  				<span @click="gotodoctor" class="Finish" v-if="item.status=='Finish'" v-bind:data-code="item.id">再次预约</span>
		  				<span class="Pending" v-else-if="item.status=='Pending'" v-bind:data-code="item.id" @click="gotojoin(item.id)">接入</span>
		  				<span class="Canceled" v-else-if="item.status=='Canceled'" v-bind:data-code="item.id" @click="gotodoctor">再次预约</span>
		  			</div>
					</li>  		
  			</template>
  		</ul>
  	</div>
  </div>
</template>

<script>
import {getAllAppointmentRecord} from 'API/requst'
import { getURLParameter,dateFormat,empty } from 'utils/util'
import myDatepicker from 'vue-datepicker'
export default {
props: ['homeVisiting'],
  data () {
    return {
      details:[],
      thirdUniqueId:'',
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
  		window.location.href = 'joinup.html?id='+id;
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
  		getAllAppointmentRecord(obj).then(data=>{
  			console.log(data);
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
  			 $('.datepickbox').find('input').on('input',function(){
  			 	console.log('bbb')
  			 })
  		},3000)
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
  	}
  },
  components:{
    'date-picker': myDatepicker
  },
  created () {
  	var vm = this;
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	vm.thirdUniqueId = 417314456;
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
		.cov-date-body{
		top: 30%!important;
	}
	.record-head{
		margin-top: 80px;
		padding: 10px 10px;
	}
	.record-head-left{
    margin-left: 20px;
    margin-right: 10px;
	}
	.record-head>div {
    display: inline-block;
    margin-right: 10px;
	}
	.record .name-text{
		display: inline-block;
    height: 40px;
    margin-left: 10px;
	}
	.record .name-text input{
		height: 40px;
    width: 150px;
    border: 1px solid #eee;
	}
	.record .time,.record .status-text{
		display: inline-block;
		margin-left: 10px;
	}
	.status-select{
		outline: none;
    border: 0;
    background: #fff;
    border: 1px solid #eee;
    height: 40px;
    width: 150px;
	}
	.record-content{
	    padding: 0px 2%;
	}
	.record-content-head{
		background: #f5faff;
    line-height: 40px;
    border-radius: 5px;
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
 		line-height: 50px;
 		font-size: 15px;
 }
 .make-operate span{
 		display: inline-block;
    background: #fc9453;
    line-height: 35px;
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
 .cov-date-caption{
 	color:#3C9BFF !important;
 }
 .checked{
 	background:#3C9BFF !important;
 }
 .cov-datepicker{
 	border-color:#eee !important;
 	padding: 0 !important;
 	width: 150px !important;
 	height: 40px !important;
 	line-height: 40px !important;
 }
</style>