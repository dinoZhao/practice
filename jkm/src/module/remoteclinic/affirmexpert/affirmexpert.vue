<template>
  <div class="affirmexpert"> 
  	<headline headtxt="预约" none=""></headline>
  	<div class="affirmexpert-content">
  		<div class="content-left">
  			<div class="content-left-text">
  				<img v-bind:src="result.doctorHeadUrl?result.doctorHeadUrl:headUrlpng" class="head-icon"/>
  				<p class="doctor-head"><span class="name">{{result.doctorName}}</span><span class="job-text">{{result.profession}}</span></p>
  				<P class="hospital">医院：{{result.organization}}</P>
  				<p class="specialize">擅长：{{result.description}}</p>
  				<p>预约时间</p>
  				<P class="week">{{wekk}}</P>
  				<P class="time">{{startTim}}-{{endTime}}</P>
  			</div>
  		</div><div class="content-right">
  			<div class="patients-text">
  				<div class="patients-left">患者信息</div><div class="patients-right">
  					<img v-bind:src="result.patientHeadUrl?result.patientHeadUrl:headUrlpng" /><P><span>{{result.patientName}}</span><br/><span>{{result.patientGender}} {{result.patientAge}}岁</span></P>
  				</div>
  			</div>
  			<div class="patients-issue">
  				<div class="patients-left">问题描述</div><div class="issue-text">
  					<textarea class="wenti"></textarea>
  				</div>
  			</div>
  			<div class="patients-text medical">
  				<div class="patients-left">病历/报告</div><div class="patients-right">
  					<p>血氧饱和度偏低，尿常规检测异常，疑似糖尿病</p><img class="arrows-icon" src="../../../assets/arrows-left.png" />
  				</div>
  			</div>
  			<div class="patients-img">
  			<img class="report-img" v-for="str in imglist" v-bind:src="str.url" @click="showimg(str.url)"/>
  			<div class="choose-img"><img src="../../../assets/add.png"/><span>添加</span><input type="file"  accept="image/*" class="choose" @change="chanimg($event.target)"/></div>
  			</div>
  			<div class="patients-btn" @click="gotojion">确认预约</div>
  		</div>
  	</div>
  	<div class="win-img" @click.stop.prevent="closewin">
  		<div class="win-img-content">
  			<img class="imgbig" src="../../../assets/historyskip.png" />
  		</div>
  	</div>
  </div>
</template>
<script>
import {submitAppointmentCommand,queryPatientInfoCommand,uploadFile} from 'API/requst'
import headline from 'components/headline/headline.vue'
import { getURLParameter,dateFormat,empty} from 'utils/util'
import myDatepicker from 'vue-datepicker'
import $ from 'jquery'
import headUrlpng from '../../../assets/headUrl.png'
export default {

  name: 'affirmexpert',
  components: {
  },
  data () {
    return {
      playing:true,
      bennLike:false,
      imglist:[],
      scid:'',
      did:'',
      thirdUniqueId:'',
      bslist:[],
      personId:'',
      result:{},
      patientId:'',
      endTime:'',
      startTim:'',
      wekk:'',
      picUrls:[],
      headUrlpng:headUrlpng
    }
  },
  methods:{
  	gotojion:function(){
  		var vm =this;
  		vm.showLoading();
  		var tex = $('.wenti').val();
  		var objtwo = {
  			'base64Images':vm.bslist
  		}
  		if(!empty(vm.bslist)){
  			uploadFile(objtwo).then(data=>{
	  			vm.picUrls = data.urls;
	  			var obj ={
						"clientId":vm.thirdUniqueId,
						"doctorId":vm.did,
						"schedulingId":parseInt(vm.did),
						"patientId":vm.patientId,
						"description":tex,
						"recordId":null,
						"picUrls":data.urls
					}
					submitAppointmentCommand(obj).then(data=>{
						vm.hideLoading();
						vm.showtoast('预约成功');
						setTimeout(function(){
							window.location.href = 'reservation.html';
						},3000)
		    	}).catch(err=>{
		    			vm.hideLoading();
		    			vm.alertDefault({
				    		text:err.data.resultMessage,
								rowButton:false,
								leftButtonText:'取消',
								rightButtonText: '确定'
				    	})
		    	})
		    }).catch(err=>{
		    	vm.alertDefault({
		    		text:err.data.resultMessage,
						rowButton:false,
						leftButtonText:'取消',
						rightButtonText: '确定'
		    	})
		    })
  		}else{
  			var obj ={
						"clientId":vm.thirdUniqueId,
						"doctorId":vm.did,
						"schedulingId":parseInt(vm.did),
						"patientId":vm.patientId,
						"description":tex,
						"recordId":null,
						"picUrls":vm.imglist
					}
  			submitAppointmentCommand(obj).then(data=>{
					vm.hideLoading();
	  			vm.showtoast('预约成功');
					setTimeout(function(){
						window.location.href = 'reservation.html';
					},3000)
	    	}).catch(err=>{
	    			vm.hideLoading();
	    			vm.alertDefault({
			    		text:err.data.resultMessage,
							rowButton:false,
							leftButtonText:'取消',
							rightButtonText: '确定'
			    	})
	    	})
  		}
  	},
  	showimg:function(url){
  		var self = this;
  		$('.imgbig').attr('src',url);
  		$('.win-img').show();
  	},
  	closewin:function(){
  		$('.win-img').hide();
  	},
  	chanimg:function(elem){
  		var vm = this;
  		var file = $(elem)[0].files[0]
  		var reader = new FileReader()
			reader.onloadend = vm.ImgToBase64
			reader.readAsDataURL(file);
  	},
  	ImgToBase64:function(result) {
  			var vm = this;
  			var imglist = vm.imglist;
  			var bslist = vm.bslist;
  			var obj = {};
      	obj.url = result.target.result;
      	imglist.push(obj);
				var _frontFile=result.target.result;
				var frontFile = _frontFile.substr(_frontFile.indexOf('base64,') + 7);
				bslist.push(frontFile);
		},
		upfile:function(files){
			var vm = this;
			
		}
  },
  components:{
    headline,
    'date-picker': myDatepicker
  },
  created () {
  	var vm = this;
  	var scid = getURLParameter('scid');
  	var did = getURLParameter('scid');
  	vm.scid = scid;vm.did = did;
  	vm.personId = sessionStorage.getItem('personId')||'mcse358b069e3b24dc881a54c1797372368';
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	vm.thirdUniqueId = _doctorMsg.doctorId||417314456;
  	queryPatientInfoCommand({'patientId':vm.personId,"schedulingTableId":vm.scid}).then(data=>{
  		vm.result = data;
  		vm.patientId = data.patientId;
  		var _end = dateFormat(data.endTime,'G:i');
  		var _star = dateFormat(data.startTime,'G:i');
  		vm.startTim = _star;
  		vm.endTime = _end;
  		var _date = parseInt(new Date(data.startTime).getDay());
  		switch(_date){
  			case 0:
  				var wenm = '周日';
  			break;
  			case 1:
  				var wenm = '周一';
  			break;
  			case 2:
  				var wenm = '周二';
  			break;
  			case 3:
  				var wenm = '周三';
  			break;
  			case 4:
  				var wenm = '周四';
  			break;
  			case 5:
  				var wenm = '周五';
  			break;
  			case 6:
  				var wenm = '周六';
  			break;
  		}
  		vm.wekk = dateFormat(data.startTime,'m.d')+' '+wenm;
    }).catch(err=>{
    	
    		vm.alertDefault({
	    		text:err.data.resultMessage,
					rowButton:false,
					leftButtonText:'取消',
					rightButtonText: '确定'
	    	})
    })
  },
  mounted(){
   
  }
}
</script>
<style>
	.affirmexpert{
		min-height: calc(100% - 120px);
    height: calc(100% - 120px);
    font-size: 1.5vw;
	}
	.affirmexpert-content{
		height: 100%;
	}
	.affirmexpert-content .arrows-icon{
		width: auto;
		height: 20px;
		margin-right: 15px;
		float: right;
	}
	.affirmexpert-content>div {
	    display: inline-block;
	    vertical-align: top;
	    height: 100%;
	}
	.content-right{
    padding-top: 60px;
	}
	.content-left{
			width: 30%;
	    background: #ebf5ff;
	    padding: 120px 0 0px 0;
	}
	.content-left-text{
			width: 80%;
	    margin-left: 10%;
	    background: #fff;
	    border-radius: 5px;
	    font-size: 1.5vw;
	    text-align: center;
	    padding-bottom: 40px;
	}
	.head-icon{
		width: auto;
    height:90px;
		margin-top: -30px;
    border-radius: 50%;
	}
	.doctor-head{
		margin-top: 20px;
	}
	.affirmexpert .name{
	    font-weight: bold;
	}
	.doctor-head>span {
	    display: block;
	    font-size: 1.7vw;
	}
	.hospital{
		text-align: left;
	  padding: 0px 35px;
    margin-top: 30px;
	}
	.affirmexpert .specialize{
		text-align: left;
		padding: 0 35px;
	}
	.affirmexpert .week{
		font-size: 2vw;
    font-weight: bold;
    line-height: 78px;
	}
	.affirmexpert .time{
		font-size: 2vw;
		font-weight: bold;
    line-height: 78px;
	}
	.content-left-text>p:nth-child(5){
	  margin-top: 70px;
	  margin-bottom: 10px;
	}
	.content-right{
		width: 70%;
	}
	.patients-text{
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}
	.affirmexpert .medical{
		padding: 25px 0;
	}
	.patients-text>div {
    display: inline-block;
    vertical-align: middle;
	}
	.patients-left {
    display: inline-block;
	}
	.patients-left {
    width: 20%;
    text-align: center;
	}
	.patients-right{
		width: 80%;
	}
	.patients-right img{
		width: auto;
		height: 70px;
		vertical-align: middle;
		margin-right: 10px;
    border-radius: 50%;
	}
	.patients-right p{
		display: inline-block;
		vertical-align: middle;
	}
	.patients-issue{
		padding: 30px 0;
		border-bottom: 1px solid #eee;
	}
	.issue-text{
		display: inline-block;
		width: 80%;
		vertical-align: top;
	}
	.issue-text textarea{
		width: 90%;
		height: 100px;
		padding:0 10px;
		font-size: 1.5vw;
	}
	.affirmexpert .patients-btn{
		width: 37%;
		background: #3C9BFF;
		color: #fff;
		text-align: center;
		line-height: 1rem;
		margin: 0 auto;
		border-radius: 10px;
		margin-top: 15px;
		font-size: .48rem;
	}
	.affirmexpert .choose-img{
		display: inline-block;
	    padding: 10px 20px;
	    border: 1px solid #3c9bff;
	    color: #3c9bff;
	    border-radius: 5px;
	    margin-left: 10px;
	    position: relative;
	  font-size: 1vw;
    vertical-align: middle;
    text-align: center;
	}
	.affirmexpert .choose-img img{
		width: auto;
		height: 25px;
	}
	.affirmexpert .choose-img span{
		display: block;
	}
	.affirmexpert .patients-img{
		padding: 30px 0 10px 20%;
		position: relative;
	}
	.affirmexpert .choose{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left:0;
		opacity: 0;
	}
	.report-img{
		width: 65px;
    height: 65px;
    vertical-align: middle;
	}
	.win-img{
		display: none;
		position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    z-index: 15;
	}
	.win-img-content{
		margin-top:20%;
		text-align: center;
	}
</style>
