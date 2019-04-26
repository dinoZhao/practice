<template>
	<div class="screeninghome">
		<headline headtxt="体检套餐" none=""></headline>
		<div class="screeninghome-list">
			<div class="screeninghome-left">
				<div v-bind:class='["screeninghome-left-item",istaocan?"on":""]' @click="choosetaocan($event.target,'体检套餐')"><span>体检套餐</span></div><div v-bind:class='["screeninghome-left-item",!istaocan?"on":""]' @click="choosetaocan($event.target,'预约记录')"><span>预约记录</span></div>
			</div><div class="screeninghome-content">
				<div class="screeninghome-box"  v-if="istaocan">
					<div class="box-head">
						<div class="box-item on" @click="choosefuwu($event.target,'')">公卫服务</div><div class="box-item" @click="choosefuwu($event.target)">优选计划</div><div class="box-item" @click="choosefuwu($event.target)">至尊套餐</div>
					</div>
					<div class="service">
						<span class="service-tag">公卫服务</span>
						<div class="service-bottom">
							<div class="service-item"><img src="../../../assets/healthy-condition.png"/><span>健康状态评估</span></div><div class="service-item">
								<img src="../../../assets/body.png"/><span>体格检查</span></div><div class="service-item">
								<img src="../../../assets/check.png"/><span>辅助检查</span></div><div class="service-item">
								<img src="../../../assets/health-education.png"/><span>健康指导</span></div>
						</div>
					</div>
					<div class="service">
						<span class="service-tag">体检项目</span>
						<div class="service-bottom">
							<div class="service-item"><img src="../../../assets/ECG.png"/><span>心电</span></div><div class="service-item">
								<img src="../../../assets/blood-pressure.png"/><span>血压</span></div><div class="service-item">
								<img src="../../../assets/blood-sugar.png"/><span>血糖</span></div><div class="service-item">
								<img src="../../../assets/B-super.png"/><span>B超</span></div><div class="service-item">
								<img src="../../../assets/BMI.png"/><span>BMI</span></div><div class="service-item">
								<img src="../../../assets/urine-routine.png"/><span>尿常规</span></div><div class="service-item">
								<img src="../../../assets/blood-fat.png"/><span>血脂</span></div>
						</div>
					</div>
				</div>
				<div class="screeninghome-recod"  v-if="!istaocan">
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
				  		</div><div class="reservation-time-right" @click="turnToAllRecord">
				  			<img src="../../../assets/record.png" /><span>全部记录</span>
				  		</div>
				  	</div>
				  	<div class="screeninghome-recod-bottom">
				  		<div class="content-left">
				  			<ul class="content-list">
				  				<template v-for="(item,index) in result">
				  					<li class="content-item">
				  						<template v-for="(str,ind) in item.details">
				  							<div class="item-text item-one done" v-if="str.status=='Success'">
							  						<div class="item-left">
								  						<div class="item-time">
								  							<span class="">{{item.startTime|tim}}</span>
								  						</div>
								  					</div><div class="item-right">
								  						<div class="patient"><span class="name">{{str.name}}</span><span class="sex">{{str.gender}}</span><span class="age">{{str.pAge}}岁</span></div><div class="experts">
								  							<span>项目</span><span class="experts-name">{{str.setMeal}}</span>
								  						</div><div class="status">
								  							<span>状态</span><span class="status-text">已完成</span>
								  						</div>
								  						<div class="right-line"></div>
								  					</div>
							  					</div>
							  					<div class="item-text item-one unfinished" v-else-if="str.status=='InReview'">
							  						<div class="item-left">
								  						<div class="item-time current" v-if="start<item.startTime&&item.startTime<intertime">
								  							<span class="">{{item.startTime|tim}}</span>
								  						</div>
								  						<div class="item-time" v-else>
								  							<span class="">{{item.startTime|tim}}</span>
								  						</div>
								  					</div><div class="item-right">
								  						<div class="patient"><span class="name">{{str.name}}</span><span class="sex">{{str.gender}}</span><span class="age">{{str.pAge}}岁</span></div><div class="experts">
								  							<span>项目</span><span class="experts-name">{{str.setMeal}}</span>
								  						</div><div class="status">
								  							<span>状态</span><span class="status-text">未完成</span>
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
								  						<div class="patient"><span class="name">{{str.name}}</span><span class="sex">{{str.gender}}</span><span class="age">{{str.pAge}}岁</span></div><div class="experts">
								  							<span>项目</span><span class="experts-name">{{str.setMeal}}</span>
								  						</div><div class="status">
								  							<span>状态</span><span class="status-text">已取消</span>
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
								  						<div class="patient"><span class="name">{{str.name}}</span><span class="sex">{{str.gender}}</span><span class="age">{{str.pAge}}岁</span></div><div class="experts">
								  							<span>项目</span><span class="experts-name">{{str.setMeal}}</span>
								  						</div><div class="status">
								  							<span>状态</span><span class="status-text">已取消</span>
								  						</div>
								  						<div class="right-line"></div>
								  					</div>
							  					</div>
				  						</template>
					  				</li>
				  				</template>
				  			</ul>
				  		</div>
				  	</div>
				</div>
			</div>
		</div>
		<div class="screeninghome-btn" @click="startDetection" v-if="istaocan"><div>开始检测</div></div>
	</div>
</template>
<script>
	import { getAppointmentRecord, cancelAttention, createMedicalRecord } from 'API/requst'
	import headline from 'components/headline/headline.vue';
	import { getURLParameter, dateFormat, GetAgeByIdNum } from 'utils/util'
	import $ from 'jquery'
	export default {
		name: 'screeninghome',
		components: {},
		data() {
			return {
			  datelist:[],
			  result:[],
		      start:'',
		      timenum:'',
		      intertime:'',
		      thirdUniqueId:'',
		      istaocan:true
			}
		},
		methods: {
			choosetaocan:function(elem,tex){
				var vm = this;
				$('.screeninghome-left-item').removeClass('on');
				$(elem).parents('.screeninghome-left-item').addClass('on');
				$(elem).addClass('on');
				vm.istaocan = !vm.istaocan;
			},
			choosefuwu:function(elem){
				var vm = this;
				$('.box-item').removeClass('on');
				$(elem).addClass('on');
			},
			clickitem:function(elem,num){
		  		var vm = this;
		  		var timnum = (parseInt(vm.timenum)+86400000*num);
		  		var _timnum = timnum+86400000
		  		$('.time-left-item').removeClass('on');
		  		$(elem).parents('.time-left-item').addClass('on');
		  		$(elem).addClass('on');
		  		vm.getRecord(timnum,_timnum);
		  	},
		  	getRecord:function(start,end){
		  		var vm = this;
		  		var obj = {
		  			'thirdUniqueId':vm.thirdUniqueId,
		  			'startTime':start,'endTime':end
		  		}
		  		getAppointmentRecord(obj).then(data=>{
		  			vm.result = data.result;
		  			
			    }).catch(err=>{
			    	vm.alertDefault({
			    		text:err.data.resultMessage
			    	})
			    })
		  	},
		  	startDetection() {
				var vm = this;
				let personId = window.location.search.split('=')[1];
				let params = {
					"personId": personId,
					"padDeviceCode": "P1",
					"type": "公卫服务"
				}
				createMedicalRecord(params).then(data => {
					console.log(data.recordId);
					sessionStorage.setItem("medicalRecordId", data.recordId)
					window.location.href = "../physical/result.html?recordId=" + data.recordId + '&personId=' + personId;
				})

			},
			turnToAllRecord() {
				window.location.href = '../healthyCheckup/Allrecord.html'
			}
		},
		components: {
			headline
		},
		created() {
			var vm = this;
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
		  	vm.getRecord(vm.timenum,(vm.timenum+86400000));
		},
		mounted() {

		}
	}
</script>
<style scoped>
	.screeninghome{
		height: 100%;
		font-size: 18px;
	}
	.screeninghome-list{
		height: calc(100% - 80px);
	}
	.screeninghome-list>div{
		display: inline-block;
		vertical-align: top;
	}
	.screeninghome-left{
		margin-top: 80px;
		display: inline-block;
		width: 1.4rem;
		height: 100%;
		border-right: 1px solid #eee;
		box-sizing: border-box;
		color:#3c9bff ;
	}
	.screeninghome-left>div{
		width: 100%;
		height: 50%;
		position: relative;
	}
	.screeninghome-left-item.on{
		background: #3c9bff;
		color: #fff;
	}
	.screeninghome-left>div span{
		width:51%;
	    display: inline-block;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    font-size:0.35rem;
	}
	.screeninghome-content{
		display: inline-block;
		width: 90%;
	    border-left: 1px solid #eee;
	}
	.box-head{
		padding:23px 15px 0 15px;
		border-bottom: 1px solid #eee;
	}
	.box-head>div{
		display: inline-block;
		font-size: 0.34rem;
		line-height: 50px;
		margin-right: 15px;
        padding: 0 5px 5px 5px;
	}
	.box-item.on{
		border-bottom: 2px solid #3c9bff;
		color:#3c9bff;
	}
	.service{
		padding: 0.65rem 0.35rem 0.65rem 0.35rem;
	}
	.service>span{
		display: inline-block;
	    background: #ebf5ff;
	    color: #3c9bff;
	    padding: 4px 10px;
	    border-radius: 25px;
	    font-size: 0.32rem;
	    margin: .15rem  0;
	}
	.service-bottom{
		margin-top: 20px;
	}
	.service-bottom>div{
		display: inline-block;
		text-align: center;
		/*margin-right: 4%;*/
		font-size: 0.32rem;
		width: 13.35%;
	}
	.service-item img{
		width: auto;
    	height: 40px;
	}
	.service-item span{
		display: block;
	}
	.screeninghome-btn{
		position: fixed;
	    width: 100%;
	    left: 0;
	    bottom: 20px;
	    text-align: center;
	}
	.screeninghome-btn>div{
		display: inline-block;
		background: #3c9bff;
	    color: #fff;
	    width: 26%;
	    text-align: center;
	    font-size: .48rem;
	    line-height: 1rem;
	    border-radius: 12px;
	}
	.screeninghome .reservation-time {
	    padding: 0 10px 0 20px;
	    border-bottom: 1px solid #eee;
	    padding-top: 20px;
	}
	.screeninghome .reservation-time-left {
	    display: inline-block;
	    vertical-align: middle;
	    width: 85%;
	}
	.screeninghome .reservation-time-right {
	    display: -ms-inline-flexbox;
	    display: inline-flex;
	    vertical-align: middle;
	    width: 15%;
	}
	.screeninghome .time-left-item {
	    display: inline-block;
	    text-align: center;
	    color: #999;
	    padding: 0 3%;
	    position: relative;
	}
	.screeninghome .time-left-item>span:first-child {
	    font-size: 1.5vw;
	}
	.screeninghome .time-left-item span {
	    display: block;
	}
	.screeninghome .time-left-item>span:nth-child(2) {
	    font-size: 1.8vw;
	    padding-bottom: 3px;
	}
	.screeninghome .time-left-item .line {
	    position: absolute;
	    bottom: 0;
	    width: 30%;
	    background: #3c9bff;
	    display: inline-block;
	    height: 2px;
	    left: 35%;
	    display: none;
	}
	.screeninghome .time-left-item.on span {
	    color: #3c9bff;
	}
	.screeninghome .time-left-item.on .line {
	    display: inline-block !important;
	}
	.screeninghome .reservation-time-right img {
	    width: auto;
	    height: 30px;
	    vertical-align: middle;
	}
	.screeninghome .reservation-time-right span {
	    vertical-align: middle;
	    margin-left: 10px;
	    display: inline-block;
	    line-height: 30px;
	    color: #3c9bff;
	    font-size: 1.5vw;
	}
	.screeninghome .content-left {
	    padding: 0 10px 0 20px;
	    padding-top: 20px;
	    vertical-align: top;
	    color: #999;
	}
	.screeninghome .content-list {
	    width: 90%;
	}
	.screeninghome li.content-item {
	    font-size: 1.5vw;
	    margin-bottom: 15px;
	}
	.screeninghome .item-text.unfinished .item-left {
	    color: #333;
	}
	.screeninghome .content-item>div:first-child .item-left {
	    visibility: visible;
	}
	.screeninghome .item-left {
	    visibility: hidden;
	}
	.screeninghome .item-left {
	    display: inline-block;
	    width: 12%;
	    text-align: center;
	    font-size: 1.5vw;
	    line-height: 50px;
	}
	.screeninghome .item-right {
	    width: 88%;
	    display: inline-block;
	    vertical-align: top;
	    white-space: nowrap;
	    position: relative;
	     border-bottom: 1px solid #eee;
	}
	.screeninghome .item-right>div {
	    display: inline-block;
	    width: 22%;
	    line-height: 40px;
	    padding: 5px 0;
	    height: 40px;
	}
	.screeninghome .patient {
	    margin-left: 2%;
	}
	.screeninghome .item-right .right-line {
	    position: absolute;
	    width: 2px;
	    height: 35px;
	    background: #999;
	    left: 0;
	    top: 0;
	}
	.screeninghome .experts-name, .reservation .name {
	    color: #333;
	}
	.screeninghome .item-right>div span {
	    margin-left: 5px;
	}
	.screeninghome .patient>span:nth-child(1) {
	   color: #333;
	}
	.screeninghome .item-text.done .status-text{
		color: #3c9bff;
	}
	.screeninghome .item-text.cancel .status-text, .reservation .item-text.unfinished .status-text {
	    color: #d43c33;
	}
</style>