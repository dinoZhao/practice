<template>
  <div class="joinup"> 
  	<headline headtxt="远程问诊" none=""></headline>
  	<div class="joinup-head">
  		<div class="joinup-head-left">
  			<img v-bind:src="result.doctorHeadUrl" class="head-icon" /><div class="head-left-text">
  				<p><span>{{result.doctorName}}</span><span>{{result.profession}}</span><span>坐诊中</span></p><p>{{result.organization}}</p>
  			</div>
  		</div><div class="joinup-head-right">
  			医生随时叫号，建议您不要离开当前页面
  		</div>
  	</div>
  	<div class="joinup-conent">
  		<div class="joinup-conent-left">
  			<div class="joinup-content-top">
  				<img v-bind:src="result.patientHeadUrl" /><p><span>{{result.patientName}}</span><span v-if="result.patientGender==1">男</span><span v-if="result.patientGender==0">女</span><span>{{result.patientAge}}岁</span></p>
  			</div><div class="joinup-content-bottom">
  				前面还有<br/><span class="num">{{frontNum}}</span>人<br/>预计还需要等待<span>--</span>分钟
  			</div>
  		</div><div class="joinup-conent-right">
  				<img src="../../../assets/home_index_bg.png" />
  		</div>
  	</div>
  	<div class="joinup-bottom">
  		<div class="joinup-bottom-left">
  			病历/报告
  		</div><div class="joinup-bottom-center">
  			<textarea class="jointext"></textarea>
  		</div><div class="joinup-bottom-right">
  				<img v-for="(str,index) in imglist" v-bind:src="str" class="joinup-report" @click="showimg(str)"/><div class="choose-img"><img src="../../../assets/add.png"/><span>添加</span><input type="file" accept="image/*" class="choose" @change="chanimg($event.target)"/></div>
  		</div>
  	</div>
  	<div class="win-img" @click.stop.prevent="closewin">
  		<div class="win-img-content">
  			<img class="imgbig" src="../../../assets/historyskip.png" />
  		</div>
  	</div>
  	<div class="countdown">
  		<span>{{countnum}}</span>
  		<p>正在为您连接通话，请稍后。</p>
  	</div>
  </div>
</template>
<script>
var timer = null;
import {clinicAppointmentAccess,queryClinicAppointmentInfo,uploadFile,updateAppointment,submitAppointmentRoomId,visitClinicAppointment} from 'API/requst'
import headline from 'components/headline/headline.vue'
import myDatepicker from 'vue-datepicker'
import { getURLParameter,dateFormat,empty} from 'utils/util'
export default {

  name: 'joinup',
  components: {
  },
  data () {
    return {
      imglist:[],
      bslist:[],
      clinicAppointmentId:'',
      result:{},
      videoRoomId:'',
      frontNum:'',
      picUrls:[],
      recordId:'',
      piurlist:[],
      countnum:5
    }
  },
  methods:{
  	chanimg:function(elem){
  		var vm = this;
  		var file = $(elem)[0].files[0]
  		var reader = new FileReader()
			reader.onloadend = vm.ImgToBase64
			reader.readAsDataURL(file);
  	},
  	showimg:function(url){
  		var self = this;
  		$('.imgbig').attr('src',url);
  		$('.win-img').show();
  	},
  	closewin:function(){
  		$('.win-img').hide();
  	},
  	ImgToBase64:function(result) {
  			var vm = this;
  			var imglist = vm.imglist;
  			var bslist = vm.bslist;
  			var obj = {};
      	imglist.push(result.target.result);
				var _frontFile=result.target.result;
				var frontFile = _frontFile.substr(_frontFile.indexOf('base64,') + 7);
				bslist.push(frontFile);
				vm.upfile();
		},
		upfile:function(){
			var vm = this;
			var objtwo = {
  			'base64Images':vm.bslist
  		}
			uploadFile(objtwo).then(data=>{
				var list = data.urls;
				vm.updateDetail(list);
	    }).catch(err=>{
	    	vm.alertDefault({
	    		text:err.data.resultMessage
	    	})
	    })
		},
		updateDetail:function(list){
			var vm = this;
			var _imgs =JSON.parse(sessionStorage.getItem('imgs'))['imgs'];
			var upimgs = _imgs.concat(list);
			console.log(_imgs);
			var obj ={
				"clinicAppointmentId":vm.clinicAppointmentId,
				"description":$('.jointext').val(),
				"recordId":vm.recordId,
				"picUrls":upimgs
			}
			updateAppointment(obj).then(data=>{
				
	    }).catch(err=>{
	    	vm.alertDefault({
	    		text:err.data.resultMessage
	    	})
	    })
		},
		queryClinic:function(){
			var vm = this;
			var _href = window.location.href;
			if(!(_href.indexOf('joinup.html')>-1)){
				clearInterval(timer);
			}
			queryClinicAppointmentInfo({"clinicAppointmentId":vm.clinicAppointmentId}).then(data=>{
	      var videoRoomId =parseInt(data.videoRoomId);
	      var frontNum = data.frontNum;
	      vm.videoRoomId = videoRoomId;vm.frontNum = frontNum;
	      
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	    })
		},
		creatromeid:function(){
			var vm = this;
			var romeobj = {
				clinicAppointmentId: vm.clinicAppointmentId,
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
    'date-picker': myDatepicker
  },
  created () {
  	var vm = this;
  	var clinicAppointmentId = getURLParameter('id')||423607872;
  	vm.clinicAppointmentId = clinicAppointmentId;
  	var obj = {
  		clinicAppointmentId :vm.clinicAppointmentId
  	}
  	clinicAppointmentAccess(obj).then(data=>{
  		var _data = data;
  		var imgobj = {
  			'imgs':data.otherReports
  		}
  		sessionStorage.setItem('imgs',JSON.stringify(imgobj));
      vm.result = _data;
      vm.recordId = _data.recordId;
     	vm.imglist = _data.otherReports||[];
    }).catch(err=>{
    	vm.showtoast(err.data.resultMessage);
    })
	 	vm.queryClinic();
	 	vm.creatromeid();
  },
  mounted(){
   
  }
}
</script>
<style>
	.joinup-head{
    padding: 20px 15px;
    padding-left: 130px;
	}
	.joinup-head>div {
	    display: inline-block;
	    vertical-align: middle;
	}
	.head-left-text{
		display: inline-block;
		vertical-align: middle;
		text-align: left;
	}
	.joinup-head-left{
		width: 40%;
		text-align: right;
	}
	.joinup-head-right{
		width: 60%;
		text-align: right;
		color: #d43c33;
		font-size: 1.8vw;
	}
	.joinup-head-left img{
		width: auto;
    height: 50px;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 25px;
	}
	.head-left-text>p span:nth-child(1){
		font-size: 2vw;
    font-weight: bold;
	}
	.head-left-text>p span:nth-child(2){
		margin: 0 5px;
    font-weight: bold;
	}
	.head-left-text>p span:nth-child(3){
		display: inline-block;
    background: #e9f4de;
    color: #4e9900;
    font-size: 1.5vw;
    padding: 2px 5px;
	}
	.joinup-conent{
		height: 500px;
    position: relative;
	}
	.joinup-conent-left {
		position: absolute;
    height: 500px;
		width: 20%;
    text-align: center;
    background: rgba(48,132,218,0.7);
    color: #fff;
    padding: 0px 15px 0px 15px;
	}
	.joinup-conent-right{
		    height: 100%;
	}
	.joinup-conent-right img{
		height: 500px;
    width: 100%;
	}
	.joinup-content-top{
	  border-bottom: 1px solid #fff;
		padding-bottom: 10px;
		margin-top: 40%;
	}
	.joinup-content-top img{
		width: auto;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 25px;
	}
	.joinup-content-bottom{
		margin-top: 10px;
	}
	.joinup .num {
		font-size: 5vw;
	}
	.joinup .choose-img{
		display: inline-block;
	    padding: 10px 20px;
	    border: 1px solid #3c9bff;
	    color: #3c9bff;
	    border-radius: 5px;
	    margin-left: 10px;
	    position: relative;
	    font-size: 1vw;
	    vertical-align: middle;
	}
	.joinup .choose-img img{
		width: auto;
		height: 25px;
	}
	.joinup .choose-img span{
		display: block;
	}
	.joinup .patients-img{
		padding:10px 0;
	}
	.joinup .choose{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left:0;
		opacity: 0;
	}
	.joinup-bottom>div{
    display: inline-block;
    vertical-align: middle;
	}
	.joinup-bottom-left{
		width: 10%;
    text-align: center;
	}
	.joinup-bottom-center{
		width: 30%;
	}
	.joinup-bottom-center textarea{
		width: 100%;
    height: 65px;
	}
	.joinup-bottom-right{
    margin-left: 10px;
	}
	.joinup-bottom{
		padding: 10px 0;
	}
	.joinup-report{
		width: 65px;
    height: 65px;
    vertical-align: middle;
    margin-left: 5px;
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
	.countdown{
		position: fixed;
    width: 20%;
    left: 40%;
    top: 35%;
    text-align: center;
    background: rgba(0,0,0,0.7);
    color: #fff;
    padding: 25px 0;
    border-radius: 10px;
    font-size:20px;
	}
	.countdown span{
		display: block;
		font-size:25px;
		padding-bottom: 10px;
	}
</style>
