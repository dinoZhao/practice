<template>
  <div class="affirmexpert"> 
  	<headTop />
		<headLine />
  	<div class="affirmexpert-content">
  		<div class="content-left">
  				<img v-bind:src="result.doctorHeadUrl?result.doctorHeadUrl:headUrlpng" class="head-icon"/>
  				<div class="doctor-head">
  					<div><span class="name">{{result.doctorName}}</span><span class="job-text">{{result.profession}}</span></div>
  		    	<div class="hospital">{{result.organization}}</div>
  				</div>
  				
  				<div class="item">
  					<div style="margin-right: 0.1rem;color: #999;">预约时间</div>
  						<div class="week">{{wekk}}</div>
  				    <div class="time">{{startTim}}</div>
  				</div>
  					<div class="payment" style="color: #3C9BFF;font-size: 0.4rem;margin-left: 0.36rem;">{{!fee?"义诊":fee}}</div>
  		</div><div class="content-right">
  			<div class="patients-text">
  				<div class="patients-left">患者信息</div><div class="patients-right">
  					<!--<img v-bind:src="result.patientHeadUrl?result.patientHeadUrl:headUrlpng" />-->
  					<P  style="color: #999;"><span style="margin-right: 0.2rem;color: #333;">{{result.patientName}}</span><span>{{result.patientGender}} {{result.patientAge}}岁</span></P>
  					<div class="switch-btn" @click.stop="gotoinfo"><img src="../../../assets/switch-icon.png"/><span>更换</span></div>
  				</div>
  			</div>
  			<div class="patients-issue">
  				<div style="border-bottom: 1px solid #eee;margin-bottom: 0.45rem;">
  					<div class="patients-left">问题描述</div>
  				<div class="issue-text">
  					<textarea class="wenti" placeholder="请尽可能完整描述症状、检查结果，不少于10个字！"></textarea>
  				</div>
  				</div>
					<div class="patients-text" style="padding:0;">
						<div class="patients-left">病历/报告</div><div class="patients-right">
							<div class="patients-item" v-for="item in choselist">
								<div class="patients-item-left"><span>{{item.content}}</span><span class="datetext">{{item.reportTime}}</span></div><div></div>
							</div>
							<div class="add-case" style="color: #3C9BFF ;font-size: .32rem;" @click.stop="showlist"><img src="../../../assets/add.png"/><span>添加</span></div>
						</div>
					</div>
  			</div>
  			<div class="patients-img">
  				<viewer :images="imglist">
		       <img class="report-img" v-for="str in imglist" v-bind:src="str.url"/>
		    	</viewer>
  			<div class="choose-img"><img src="../../../assets/camera.png"/><input type="file"  accept="image/*" class="choose" @change="chanimg($event.target)"/></div>
  			</div>
  			<div class="patients-btn cliect" @click="gotojion" style="margin-bottom: 30px;">确认预约</div>
  		</div>
  	</div>
  	<div class="win-img" @click.stop.prevent="closewin">
  		<div class="win-img-content pinch-zoom">
  			<viewer>
		       <img class="imgbig" src="../../../assets/historyskip.png" />
		    </viewer>
  		</div>
  	</div>
  	<div class="win-list" v-show="ishowlist">
  		<div class="win-list-content">
  			<ul class="caselist">
  				<template v-for="item in caselist">
  					<li class="caselist-item" v-bind:data-id="item.recordId">
	  					<img v-bind:src="item.select?already:notyet" @click.stop="choselistbtn(item.recordId)"/><span>{{item.content}}</span><span class="datetext">{{item.reportTime}}</span>
	  				</li>
  				</template>
  			</ul>
  			<div class="win-list-btn">
  				<div class="list-btn-left" @click.stop="closelist">取消</div><div class="list-btn-right" @click.stop="changelist">确定</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>
<script>
	var timer = null;
import {submitAppointmentCommand,queryPatientInfoCommand,uploadFile,getRecentExamRecord} from 'API/requst'
import headTop from 'components/common/headTop.vue'
import headLine from 'components/headLine/headLine.vue'
import { getURLParameter,dateFormat,empty} from 'utils/util'
import myDatepicker from 'vue-datepicker'
import $ from 'jquery'
import headUrlpng from '../../../assets/headUrl.png'
import Viewer from 'v-viewer'
import notyet from '../../../assets/notyet.png'
import already from '../../../assets/already.png'
export default {
  name: 'affirmexpert',
  data () {
    return {
      playing:true,
      bennLike:false,
      ishowlist:false,
      imglist:[],
      notyet:notyet,
      already:already,
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
      headUrlpng:headUrlpng,
      Options:{
				"inline": true, "button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": false,
				"movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, 
				"fullscreen": true, "keyboard": false, "url": "data-source"
  		},
  		caselist:[],
  		choselist:[],
  		fee:''
    }
  },
  methods:{
  	
  	gotojion:function(){
  		var vm =this;
  		vm.showLoading();
  		var choselist = vm.choselist;
  		var recordIdlist = [];
  		var tex = $('.wenti').val();
  		var objtwo = {
  			'base64Images':vm.bslist
  		}
  		if(!empty(choselist)){
  			choselist.forEach(function(item){
	  			if(item.select){
	  				recordIdlist.push(item);
	  			}
	  		})
  		}
  		if(!empty(vm.bslist)){
  			uploadFile(objtwo).then(data=>{
	  			vm.picUrls = data.urls;
	  			var obj ={
						"clientId":vm.thirdUniqueId,
						"doctorId":vm.did,
						"schedulingId":parseInt(vm.scid),
						"patientId":vm.patientId,
						"description":tex,
						"recordId":vm.choselist,
						"picUrls":data.urls
					}
					submitAppointmentCommand(obj).then(data=>{
						vm.hideLoading();
						sessionStorage.setItem('orderdata',JSON.stringify(data.clinicAppointment))
							window.location.href = 'result.html';
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
						"schedulingId":parseInt(vm.scid),
						"patientId":vm.patientId,
						"description":tex,
						"recordId":vm.choselist,
						"picUrls":vm.imglist
					}
  			submitAppointmentCommand(obj).then(data=>{
					vm.hideLoading();
						sessionStorage.setItem('orderdata',JSON.stringify(data.clinicAppointment))
							window.location.href = 'result.html';
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
  	choselistbtn:function(id){
  		var vm = this;
  		var caselist = vm.caselist;
  		caselist.forEach(function(item){
	  			if(item.recordId==id){
	  				item.select = !item.select;
	  			}
  		})
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
			
		},
		showlist:function(){
			var vm = this;
			if(this.caselist.length==0){
				this.showtoast('暂无病历')
				return
			}
			vm.ishowlist = true;
		},
		closelist:function(){
			var vm = this;
			var chanlsit = vm.caselist;
			var choselist =vm.choselist;
			chanlsit.forEach(function(item){
				item.select = false;
				choselist.forEach(function(str){
					if(item.recordId==str.recordId){
						item.select = true;
					}
				})
			})
			console.log(vm.caselist)
			vm.ishowlist = false;
		},
		changelist:function(){
			var vm = this;
			var chanlsit = vm.caselist;
			var choselist = [];
			chanlsit.forEach(function(item){
				if(item.select){
					choselist.push(item)
				}
			})
			vm.choselist = choselist;
			vm.ishowlist = false;
			console.log(vm.choselist)
		},
		queryPatientInfo:function(){
				var vm = this;
				queryPatientInfoCommand({'patientId':vm.personId,"schedulingTableId":vm.scid}).then(data=>{
	  		vm.result = data;
	  		vm.patientId = data.patientId;
	  		var _end = dateFormat(data.endTime,'G:i');
	  		var _star = dateFormat(data.startTime,'G:i');
	  		vm.startTim = new Date(data.startTime).getHours()<12?' 上午':" 下午";
	  		vm.endTime = _end;
	  		vm.fee=data.fee;
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
	  		vm.wekk = dateFormat(data.startTime,'m.d')+' '+'('+wenm+')';
	    }).catch(err=>{
	    	
	    		vm.alertDefault({
		    		text:err.data.resultMessage,
						rowButton:false,
						leftButtonText:'取消',
						rightButtonText: '确定'
		    	})
	    })
		},
		getcaselist:function(){
			var vm = this;
			getRecentExamRecord({
  			patientId:vm.personId
  		}).then(function(res){
  			var examReports = res.examReports;
  			examReports.forEach(function(item){
  				item.select=false;
  			})
  			vm.caselist=examReports;
  		})
		},
		gotoinfo:function(){
			var vm = this;
			try{
				window.android.ejectUserSwipt();
				setTimeout(function(){
					vm.switchpeople();
				},500)
			}catch(e){
				//TODO handle the exception
			}
		},
		switchpeople:function(){
			var vm = this;
			var istrue = true;var persid = '';
			if(!timer){
				timer = setInterval(function(){
					try{
						istrue = window.android.isShowUserSwiptPopu();
						persid = window.android.getPersonUserId();
					}catch(e){
						//TODO handle the exception
					}
					if(!istrue&&!empty(persid)){
						clearInterval(timer);
						timer = null;
						vm.personId = persid;
						vm.queryPatientInfo();
	    			vm.getcaselist();
					}
				},1000)
			}
		}
  },
  components:{
		headTop,
		headLine,
    'date-picker': myDatepicker
  },
  created () {
  	var vm = this;
  	var scid = getURLParameter('scid');
  	var did = getURLParameter('did');
  	var type = getURLParameter('type');
  	vm.scid = scid;vm.did = did;
  	var _personId = '';
  	try {
			_personId = window.android.getPersonId();
	  	if(!empty(_personId)){
	  		sessionStorage.setItem('personId',_personId);
	  	}
		} catch(err) {
			console.log(err);
		}
  	vm.personId = sessionStorage.getItem('personId')||_personId;
  	var doctorMsg = sessionStorage.getItem('doctorMsg');
  	var _doctorMsg = JSON.parse(doctorMsg);
  	vm.thirdUniqueId = _doctorMsg.doctorId||417314456;
  	if(type=='info'){
  		vm.personId = getURLParameter('personId');
  	}
  	vm.queryPatientInfo();
    vm.getcaselist();
    Viewer.setDefaults({
			Options:vm.Options
		});
  },
  mounted(){
   
  }
}
</script>
<style lang="scss">
	.affirmexpert{
    font-size: 0.28rem;
		height:100%;
	}
	
	.affirmexpert /deep/ .head{
		top: 0rem !important;
		left: 200px;
		position: absolute!important;
	}
	.affirmexpert .head .back{
		top: .3rem;
	}
	
	.affirmexpert-content {
		height: calc(100%);
		padding-left: 200px;
		.content-left {
			display: flex;
			height: 1.26rem;
			background: #F8F8F8;
			padding-left: 150px;
			align-items: center;
			
			
			.head-icon {
				width: 0.9rem;
				height: 0.9rem;
				border-radius: 50%;
				margin-right: 0.2rem;
			}
			.doctor-head{
				display: inline-flex;
				flex-wrap: wrap;
			  width: 3.6rem;
			  color: #999;
			  .name{
			  	color: #333;
			  	margin-right: 0.3rem;
			  }
			}
			.item{
				display: inline-flex;
			}
		}
	}
	.affirmexpert-content .arrows-icon{
		width: auto;
		height: 20px;
		margin-right: 15px;
		float: right;
	}
	
	
	.affirmexpert .specialize{
		text-align: left;
		padding: 0 .4rem;
		font-family: PingFangSC-Regular;
		font-size: .3rem;
		color: #333333;
		margin-bottom: 0.2rem;
	}
	

	.content-right{
		width: 100%;
	}
	.patients-text{
		padding: 20px 0;
		select{
			border: none;
		}
	}
	.patients-text>div {
    display: inline-block;
    vertical-align: top;
	}
	.switch-btn{
		display: inline-block;
    margin-left: 15px;
    color: #3C9BFF;
    vertical-align: middle;
	}
	.patients-right .switch-btn img{
		width: auto;
    height: 36px;
    border-radius: 0;
    vertical-align: middle;
	}
	.switch-btn span{
		vertical-align: middle;
	}
	.patients-left {
		display: inline-block;
    width: 20%;
    text-align: center;
		font-family: PingFangSC-Regular;
		font-size: .31rem;
		color: #333333;
		letter-spacing: 0;
	}
	.patients-right{
		width: 80%;
		font-family: PingFangSC-Medium;
		font-size: .32rem;
		color: #333333;
		letter-spacing: 0;
	}
	.patients-right img{
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 1rem;
		vertical-align: middle;
		margin-right: 10px;
    border-radius: 50%;
	}
	.patients-right p{
		display: inline-block;
		vertical-align: middle;
	}
	.patients-issue{
		padding: .45rem 0;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}
	.issue-text{
		display: inline-block;
		width: 79%;
		vertical-align: top;
	}
	.issue-text textarea{
		width: 90%;
		height: 100px;
		font-family: PingFangSC-Medium;
		font-size: .31rem;
		color: #333;
		letter-spacing: 0;
		outline: none;
		border: none;
	}
	.issue-text textarea::-webkit-input-placeholder{
		color: #999;
	}
	.affirmexpert .patients-btn{
		width: 25%;
		background: #3C9BFF;
		color: #fff;
		text-align: center;
		line-height: 1rem;
		margin: 0 auto;
		border-radius: 10px;
		margin-top: 15px;
		font-size: .48rem;
    margin-top: 5%;
	}
	.affirmexpert .choose-img{
		display: inline-block;
	    color: #3c9bff;
	    border-radius: 5px;
	    position: relative;
	  font-size: 1vw;
    vertical-align: middle;
    text-align: center;
	}
	.affirmexpert .choose-img img{
		width: auto;
		height: 68px;
		vertical-align: bottom;
	}
	.affirmexpert .choose-img span{
		display: block;
	}
	.affirmexpert .patients-img{
		padding: 30px 0 10px 20%;
		position: relative;
	}
	.patients-img>div{
		display: inline-block;
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
    margin-right: 5px;
    vertical-align: middle;
	}
	.patients-item{
		font-size: .31rem;
	}
	.patients-item-left>span:nth-child(1){
		display: inline-block;
    max-width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
		text-align: center;
		position: absolute;
		width: 100%;
		text-align: center;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.viewer-toolbar,.viewer-navbar,.viewer-title{
		display: none !important;
	}
	.win-list{
		position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    z-index: 15;
	}
	.win-list-content{
		position: absolute;
    width: 60%;
    background: #fff;
    left: 20%;
    top: 15%;
    padding-top: 0.3rem;
    border-radius: 10px;
	}
	.caselist li{
    padding: .25rem 0.3rem;
    font-size: 0.32rem;
    border-bottom: 1px solid #eee;
	}
	.win-list-btn>div {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 1.05rem;
    font-size: .4rem;
	}
	.list-btn-left{
    border-right: 1px solid #eee;
    box-sizing: border-box;
    color: #666666;
	}
	.list-btn-right{
    color: #3C9BFF;
	}
	.caselist-item img{
		width: auto;
		height: 45px;
		vertical-align: middle;
		margin-right: 10px;
	}
	.datetext{
		display: inline-block;
		background: #f2f2f2;
		color: #999;
		margin-left: 10px;
		padding: 3px 7px;
		vertical-align: middle;
	}
	.add-case img{
		width: auto;
    height: 20px;
    margin-right: 5px;
	}
	.add-case span{
		vertical-align: middle;
	}
	.caselist{
    max-height: 405px;
    overflow: auto;
	}
</style>
