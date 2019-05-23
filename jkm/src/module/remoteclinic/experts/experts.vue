<template>
	<div class="experts">
		<headTop />
		<div class="experts-content">
			<div class="content-right">
				<div class="right_header">
					<div class="header_content">
						<div class="province" :class="{on:location}" @click="locationcheck">
              <img src="https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5533859848" alt="">
              <span>{{doctorarea}}</span>
            </div>
						<div class="hospital_wrap">
							<div class="hospital">
								<span @click.stop="nationwide" style="margin-right: 0.1rem;" :class="['nationwide',isnationwide?'on':'']">全国</span>
								<ul>
									<li @click.stop="showProvince" style="width: 90%;">{{ProvinceName}}</li>
									<li v-if="currentProvince">{{ProvinceName}}</li>
								</ul>
								<img src="https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5533859856" alt="">
							</div>
							<div class="hospital" style="width: 39%;">
								<span>医院</span>
								<select class="hospital-list" v-model="hospital" @change="choosehospital" style="padding-right: 10%;width: 80%;">
									<template v-for="item in hospitallist">
										<option :value="item.name">{{item.name}}</option>
									</template>
								</select>
								<img src="https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5533859856" alt="" style="right: 10%;">
							</div>
							<div class="hospital" style="width: 26%;">
								<span>科室</span>
								<select class="departments-list" v-model="department" @change="choseexpert" style="padding-right: 10%;">
									<template v-for="item in departments">
										<option :value="item">{{item}}</option>
									</template>
								</select>
								<img src="https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5533859856" alt="" style="right: 10%;">
							</div>
						</div>
					</div>
				</div>
				<!--时间选择开始-->
					<div class="reservation-time-left">
				<template v-for="(item,index) in datelist">
					<div class="time-left-item on" @click="clickitem($event.target,index)" v-if="index==0" v-bind:data-code="index">
						<span>{{item.wenm}}</span><span>{{item.dat}}</span><span class="line"></span>
					</div>
					<div class="time-left-item" @click="clickitem($event.target,index)" v-bind:data-code="index" v-else>
						<span>{{item.wenm}}</span><span>{{item.dat}}</span><span class="line"></span>
					</div>
				</template>
				<div class="select"><input type="text" name="" v-model="doctorname" id=""  placeholder="医生姓名" value="" /><img @click="getnamedlist" src="../../../assets/fangdajing.png"/></div>
			</div>
				<!--时间选择结束-->
				
				<ul class="right-list">
					<template v-for="(str,inde) in doctorList">
						<template v-for="(item,index) in str.doctors">
							<li class="right-item"  v-bind:data-id="item.doctorId">
								<div class="right-item-left">
									<img v-bind:src="item.nickUrl" class="head-icon">
									<div class="detail">
										<p>
											<span class="name">{{item.name}}</span>
											<span>{{item.profession}}</span>
										</p>
										<p>医院：
											<span>{{item.organization}}</span>
										</p>
										<p>擅长：
											<span>{{item.description}}</span>
										</p>
									</div>
								</div>
								<div class="right-item-right">
									<span v-for="status in item.schedules"  @click="gotodoctor(item.doctorId,status.schedulingTableId,status.remain,status.section==='0'&&overtime)" :class="{full:!status.remain||(status.section==='0'&&overtime),danger:(status.remain==1||status.remain==2)}">{{!status.remain?"约满":status.section==='0'?"上午("+status.remain+")":"下午("+status.remain+")"}}</span>
								</div>
							</li>
						</template>
					</template>
				</ul>
			</div>
		</div>
		<div class="wind-location">
			<div class="location-content">
				<div class="location-head">请选择专家所在区域</div>
				<div class="location-bottom">
					<div class="location-item">浙江省</div>
					<div class="location-item">全国</div>
				</div>
			</div>
		</div>
		<div class='page' v-show="isShow">
			<div class='content'>
				<div class='box'>
					<div class="box_content">
						<div class="active">请选择</div>
					</div>
					<div class="box_content">
						<div class="active" @click.stop="changeProvince('','provalue')">{{provalue}}</div>
					</div>
					<div class="box_content">
						<div class="active" @click.stop="changeProvince(procode,'cityvalue')">{{cityvalue}}</div>
					</div>
					<div class="box_content">
						<div class="active" @click.stop="changeProvince(citycode,'district')">{{district}}</div>
					</div>
					<div  @click='exitOut' style="margin-left: auto;margin-right: 15px;">取消</div>
				</div>
				<div class='scroll'>
					<template v-for="item in province">
						<div v-bind:class="['address',item.select?'on':'']" @click="chooseProvince(item.value,item.name)">{{item.name}}</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import headTop from "components/common/headTop.vue";
	import { getURLParameter, dateFormat, empty } from "utils/util";
	import { getRemoteClinic, getAddress, getHospital } from '../../../api/requst'
	import myDatepicker from "vue-datepicker";
	import $ from "jquery";
	export default {
		name: "experts",
		components: {},
		data() {
			return {
				result: [],
				doctorList: [],
				address: '',
				province: null,
				currentProvince: "",
				isShow: false,
				ProvinceName: "请选择省市",
				city: null,
				county: null,
				currentCity: "",
				reqindex: 1,
				provinceValue: '',
				provalue: '',
				cityvalue: '',
				district: '',
				prostatus: 'provalue',
				hospitallist: [],
				departments: [],
				procode: '',
				citycode: '',
				discode: '',
				isnationwide: false,
				chooseArr: [{
					currentProvince: '',
					ProvinceName: '请选择',
					provinceValue: ""
				}],
				originprovince:null,
				datelist:[],
				hospital:'',//医院
				department:'',//科室
				startTimecha:'',//开始时间戳
				endTimecha:'',//结束时间戳
				timenum:'',
				doctorprovince:'',
				doctorcity:'',
				doctorarea:'',
				location:true,
				doctorname:''
				
			};
		},
		watch:{
			doctorname(cur){
				this.getnamedlist()
			}
		},
		methods: {
			clickitem: function(elem, num) {
				var vm = this;
				var timnum = (parseInt(vm.timenum) + 86400000 * num);
				var _timnum = timnum + 86400000;
				vm.startTimecha = timnum;
				vm.endTimecha = _timnum;
				$('.time-left-item').removeClass('on');
				$(elem).parents('.time-left-item').addClass('on');
				$(elem).addClass('on');
				vm.getRemotelist();
			},
			gotodoctor: function(did,scid,remain,overtime) {
				var vm = this;
				if(!remain||overtime){
					return 
				}
				 window.location.href =
        "affirmexpert.html?scid=" + scid + "&did=" + did;
			},
			nationwide: function() {
				var vm = this;
				vm.isnationwide = true;
				vm.location=false;
				vm.gethopstip('', '', '')
			    this.initprovincelist()
			},
			locationcheck(){
				var vm = this;
				vm.isnationwide = false;
				vm.location=true
			    vm.gethopstip(vm.doctorprovince, vm.doctorcity, vm.doctorarea)
			    this.initprovincelist()
			},
			initprovincelist(){
				var vm=this
					this.ProvinceName='请选择省市'
					vm.province=JSON.parse(JSON.stringify(vm.originprovince))
					this.citycode=''
					this.cityvalue=''
					this.discode=''
					this.district=''
					this.procode=''
					this.provalue=''
					this.prostatus="provalue"
			},
			choosehospital: function() {
				var vm = this;
				var tex = vm.hospital;
				var hospitallist = vm.hospitallist;
				hospitallist.forEach(function(item) {
					if(item.name == tex) {
						vm.departments = item.departments;
					}
				})
				vm.department=vm.departments[0]
				vm.getRemotelist();
			},
			exitOut() {
				this.isShow = false
			},
			showProvince: function() {
				var vm = this;
				vm.isShow = true;
				vm.showcitylist();
			},
			ChooseItem(name) {
				this.ProvinceName = name
			},
			changeProvince(code, sta) {
				var vm = this;
				var obj = code ? {
					'code': code
				} : {};
				getAddress(obj).then(data => {
					if(data.resultCode === 'success') {
						this.province = data.result;
						if(vm.originprovince===null){
							vm.originprovince=JSON.parse(JSON.stringify(data.result));
						}
						if(!empty(sta)) {
							vm.prostatus = sta;
						}
						vm.showcitylist()
					}
				}).catch(err => {
					console.log(err);
				})
			},
			choseexpert: function() {
				var vm = this;
				vm.getRemotelist();
			},
			chooseProvince(code, tex) {
				var vm = this;
				var province = vm.province;
				if(vm.prostatus == 'provalue') {
					vm.provalue = tex;
					vm.cityvalue = '';
					vm.district = '';
					vm.procode = code;
//					修改为只选省开始
                    vm.ProvinceName = vm.provalue + vm.cityvalue + vm.district;
					vm.isShow = false;
					vm.isnationwide = false;
					vm.location=false
					vm.gethopstip(vm.provalue, vm.cityvalue, vm.district);
					return
//					修改为只选省结束
					vm.changeProvince(code, 'cityvalue');
				} else if(vm.prostatus == 'cityvalue') {
					vm.cityvalue = tex;
					vm.citycode = code;
					vm.changeProvince(code, 'district');
				} else if(vm.prostatus == 'district') {
					vm.district = tex;
					vm.discode = code;
					vm.ProvinceName = vm.provalue + vm.cityvalue + vm.district;
					vm.isShow = false;
					vm.isnationwide = false;
					vm.gethopstip(vm.provalue, vm.cityvalue, vm.district);
				}
			},
			gethopstip: function(pcode, cicode, acode) {
				var vm = this;
				var obj = {
					"province": pcode,
					"city": cicode,
					"area": acode
				}
				getHospital(obj).then(data => {
					vm.hospitallist = data.result;
					vm.departments = data.result[0] ? data.result[0].departments : [];
					vm.hospital = data.result[0] ? data.result[0].name : '';
					vm.department = data.result[0] ? data.result[0].departments[0] : '';
					vm.getRemotelist();
				}).catch(err => {
					console.log(err);
				})
			},
			showcitylist: function() {
				var vm = this;
				var code = '';
				var province = vm.province;
				
				if(vm.prostatus == 'provalue') {
					code = vm.procode;
				} else if(vm.prostatus == 'cityvalue') {
					code = vm.citycode;
				} else if(vm.prostatus == 'district') {
					code = vm.discode;
				}
				province.forEach(function(item) {
					if(item.value == code) {
						item.select = true;
					} else {
						item.select = false;
					}
				})
				vm.province = province;
			},
			getnamedlist(){
				var vm=this
				var vm = this;
				var start = vm.startTimecha;
				var end = vm.endTimecha;
				getRemoteClinic({
					startTime: start,
					endTime: end,
					name:vm.doctorname
				}).then(data => {
					vm.result = data.result;
					if(!empty(data.result)) {
						vm.doctorList = data.result;
					} else {
						vm.doctorList = [];
					}
				}).catch(err => {

				});
			},
			getRemotelist: function() {
				var vm = this;
				var start = vm.startTimecha;
				var end = vm.endTimecha;
				var obj = {
					startTime: start,
					endTime: end,
					hospital: vm.hospital,
					department: vm.department,
					province:vm.isnationwide?"":vm.location?vm.doctorprovince:vm.provalue,
					city:vm.isnationwide?"":vm.location?vm.doctorcity:vm.cityvalue,
					area:vm.isnationwide?"":vm.location?vm.doctorarea:vm.district,
					
				};
//			    vm.gethopstip(vm.doctorprovince, vm.doctorcity, vm.doctorarea)
				
				getRemoteClinic(obj).then(data => {
					vm.result = data.result;
					if(!empty(data.result)) {
						vm.doctorList = data.result;
					} else {
						vm.doctorList = [];
					}
				}).catch(err => {

				});
			}
		},
		components: {
			headTop
		},
		computed:{
			overtime:{
				get:function(){
					var timer = dateFormat(new Date().getTime(), 'Y-m-d') + ' ' + '0:0:0';
			       var mydatetwo = new Date(timer).getTime();
					return new Date().getHours()>11&&this.startTimecha==mydatetwo
				},
				set:function(){
					
				}
			}
		},
		created() {
			var vm = this;
			var personId = getURLParameter('personId');
			if(personId) {
				sessionStorage.setItem('personId', personId)
			} else if(empty(sessionStorage.getItem('personId'))) {
				vm.alertDefault({
					text: '患者未登记，请先进行"身份读取"',
					rowButton: true
				})
			}
//			获取医生定位信息开始
            vm.doctorprovince=JSON.parse(sessionStorage.getItem('doctorMsg')).province
			vm.doctorcity=JSON.parse(sessionStorage.getItem('doctorMsg')).city
			vm.doctorarea=JSON.parse(sessionStorage.getItem('doctorMsg')).area
//			获取医生定位信息结束
			vm.changeProvince();
			this.locationcheck()
			
//			选择时间开始
            var arrlist = [];
			var arr = [];
			var myDate = new Date();
			var timer = dateFormat(myDate.getTime(), 'Y-m-d') + ' ' + '0:0:0';
			var mydatetwo = new Date(timer).getTime();
			var year = parseInt(myDate.getFullYear());
			var month = parseInt(myDate.getMonth() + 1);
			var day = parseInt(myDate.getDate());
			var week = parseInt(myDate.getDay());
			var cond1 = year % 4 == 0; //条件1：年份必须要能被4整除
			var cond2 = year % 100 != 0; //条件2：年份不能是整百数
			var cond3 = year % 400 == 0;
			var cond = cond1 && cond2 || cond3;
			vm.timenum = mydatetwo;
			switch(month) {
				case 1:
					var numday = 31;
					var nummonth = '01';
					break;
				case 2:
					if(cond) {
						var numday = 29;
					} else {
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
			for(var i = 0; i < 7; i++) {
				var obj = {};
				obj.wenm = week;
				obj.monm = month;
				obj.dynm = day;
				arrlist.push(obj);
				if(week >= 6) {
					week = 0;
				} else {
					week++;
				}
				if(day >= numday) {
					if(month >= 12) {
						month = 1;
					} else {
						month++;
					}
					day = 1;
				} else {
					day++;
				}
			}
			arrlist.forEach(function(item) {
				var objtwo = {};
				if((item.dynm.toString()).length == 1) {
					objtwo.dynm = '0' + item.dynm;
				} else {
					objtwo.dynm = item.dynm;
				}
				if((item.monm.toString()).length == 1) {
					objtwo.monm = '0' + item.monm;
				} else {
					objtwo.monm = item.monm;
				}
				objtwo.dat = objtwo.monm + '.' + objtwo.dynm;
				switch(item.wenm) {
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
			vm.intertime = mydatetwo + 86400000;
			console.log(vm.start)
			console.log(vm.intertime)
			vm.startTimecha = vm.timenum;
			vm.endTimecha = vm.timenum + 86400000;
//选择时间结束
		},
		mounted() {}
	};
</script>
<style  lang="scss">
	.experts {
		min-height: calc(100% - 80px);
		height: calc(100% - 80px);
	}
	
	.experts-content {
		height: 100%;
		display: flex;
		padding-left: 200px;
	}
	
	.experts-content>div {
		display: inline-block;
		vertical-align: top;
	}
	
	.experts .content-left {
		/*width:18% ;*/
		/* padding-top: 80px; */
		height: 100%;
		border-right: 1px solid #eee;
		box-sizing: border-box;
	}
	
	.experts .content-right {
		width: 100%;
		/* padding-top: 30px; */
		
	}
	
	.content-right .right_header {
		width: 100%;
		padding: 10px 0;
		background-color: #f8f8f8;
		overflow: hidden;
	}
	
	.content-right .right_header .header_content {
		width: 99%;
		margin: 0 auto;
	}
	
	.header_content .province {
		float: left;
		width: 10%;
		height: 45px;
		text-align: right;
		line-height: 45px;
		border-radius: 5px;
	}
	.header_content .province.on span{
		color: #3C9BFF;
	}
	.header_content .province span {
		color: #333;
		font-size: 1.5vw;
		vertical-align: middle;
	}
	
	.header_content .province img {
		vertical-align: middle;
		margin-right: 2%;
	}
	
	.header_content .hospital_wrap {
		float: left;
		display: flex;
		justify-content: space-between;
		margin-left: 1%;
		width: 88%;
	}
	
	.header_content .hospital {
		height: 45px;
		line-height: 45px;
		width: 33%;
		position: relative;
	}
	
	.header_content .hospital span {
		font-size: 1.5vw;
		color: #333;
		float: left;
		line-height: 42px;
		height: 42px;
		margin-top: 2px;
		display:inline-block;
		width: 0.6rem;
		text-align: center;
	}
	
	.header_content .hospital img {
		position: absolute;
		right: 7%;
		top: 50%;
		transform: translateY(-50%);
		width: 17px;
	}
	
	.header_content .hospital .name {}
	
	.header_content .hospital ul,
	.header_content .hospital select {
		width: 75%;
		height: 45px;
		background-color: #FFFFFF;
		margin-left: 1%;
		border: 1px solid #3C9BFF;
		border-radius: 5px;
		font-size: 1.5vw;
		color: #3C9BFF;
		outline: none;
		padding-left: 3%;
		float: left;
		box-sizing: border-box;
	}
	
	li.right-item {
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}
	
	li.right-item>div {
		display: inline-block;
		vertical-align: middle;
	}
	
	.experts .right-item-left {
		width: 73%;
	}
	
	.experts .right-item-left img {
		width: auto;
		height: 80px;
		vertical-align: middle;
		margin-right: 10px;
		margin-left: 20px;
		border-radius: 50%;
	}
	
	.experts .detail {
		display: inline-block;
		vertical-align: middle;
		width: calc(100% - 120px);
		font-size: 1.5vw;
	}
	
	.experts .detail p:nth-of-type(1) {
		margin-bottom: 8px;
	}
	
	.experts .name {
		font-size: 1.8vw;
		font-weight: bold;
		margin-right: 12px;
	}
	
	.experts .right-item-right {
		width: 26%;
		text-align: right;
		font-size: 1.5vw;
	}
	
	.experts .right-item-right span {
		vertical-align: middle;
		display: inline-block;
		background: #3c9bff;
		color: #fff;
		border-radius: 5px;
		margin-right: 20px;
		width: 1.5rem;
       line-height: 2.3em;
       text-align: center;
       font-size: 0.28rem;
	}
	.experts .right-item-right span.full{
		background: #eee;
		color: #9b9b9b;
	}
	.experts .right-item-right span.danger{
		background: #FC9452;
		color: #fff;
	}
	.content-left {}
	
	.experts .left-item {
		text-align: center;
		line-height: 5.2vw;
		font-size: 0.32rem;
	}
	
	.experts .left-item.on {
		background: #3c9bff;
		color: #fff;
	}
	
	.right-item-right.full span {
		background: #eee;
		color: #999;
	}
	.right-item-right span {
		background: #eee;
		color: #999;
	}
	.experts-location {
		display: none;
		text-align: center;
		line-height: 5.2vw;
		font-size: 0.32rem;
	}
	
	.experts-location img {
		width: auto;
		height: 20px;
		vertical-align: middle;
	}
	
	.experts-location span {
		display: inline-block;
		vertical-align: middle;
	}
	
	.wind-location {
		display: none;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 12;
		left: 0;
		background: rgba(0, 0, 0, 0.7);
	}
	
	.location-content {
		background: #fff;
		position: absolute;
		width: 50%;
		left: 25%;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		font-size: 1.5vw;
		padding: 30px 30px;
		border-radius: 10px;
	}
	
	.location-item {
		display: inline-block;
		border: 1px solid #3c9bff;
		width: 25%;
		line-height: 80px;
		border-radius: 10px;
		color: #3c9bff;
	}
	
	.location-head {
		margin-bottom: 30px;
	}
	
	.location-bottom>div:nth-child(1) {
		margin-right: 10%;
	}
	
	.page {
		position: fixed;
		left: 0px;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 99;
	}
	
	.content {
		width: 100%;
		height: 68%;
		background-color: #fff;
		padding-bottom: 20px;
		margin-left: 200px;
		padding-left: 0.2rem;
	}
	
	.content .certain {
		padding-right: 30px;
		height: 10%;
		text-align: right;
		line-height: 40px;
		font-family: PingFangSC-Regular;
		font-size: 17px;
		color: #666;
	}
	
	.content .box {
		padding: 0 15px;
		height: 10%;
		border-bottom: 1px solid #eee;
		border-top: 1px solid #eee;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		line-height: 40px;
		font-size: 1.5vw;
	}
	
	.box .box_content {
		float: left;
		margin-right: 20px;
	}
	
	.content .box div.active {
		color: #3c9bff;
		border-bottom: 1px solid #3c9bff;
	}
	
	.content .box .active {
		color: #3c9bff;
		border-bottom: 1px solid #3c9bff;
	}
	
	.content .address {
		padding-left: 15px;
		height: 45px;
		line-height: 45px;
		font-family: PingFangSC-Regular;
		font-size: 1.5vw;
		color: #333;
	}
	
	.content .address.on {
		color: #3C9BFF;
	}
	
	.content .scroll {
		height: 90%;
		overflow: scroll;
	}
	
	.content .scroll div.active {
		color: #3c9bff;
	}
	
	.content .scroll .active {
		color: #3c9bff;
	}
	
	.nationwide {
		display: inline-block;
		padding: 0 2%;
		border-radius: 3px;
	}
	
	.nationwide.on {
		background: #3C9BFF;
		color: #fff !important;
	}
	
	
	/*时间相关*/
		.reservation-time-left {
		display: inline-block;
		vertical-align: middle;
		width: 100%;
		border-bottom: 1px solid #eee;
        height: 0.9rem;
        
        .select{
			display: inline-block;
			width: 20%;
			height: 0.6rem;
			border: 1px solid #999;
			border-radius: 0.5rem;
			    padding: 0 0.25rem;
			        float: right;
    margin-right: 0.4rem;
    margin-top: 0.15rem;
			    input{
			    	border: none;
			    	line-height: 0.6rem;
			    	width: calc(100% - 0.3rem);
			    	font-size: 0.28rem;
			    }
			    img{
			    	width: 0.3rem;
			    	vertical-align: middle;
			    }
		}
	}
	/*.reservation-time-left:after{
		content: '';
        width: 0px;
        height: 100%;
        display: inline-block;
        vertical-align: middle;	
        }*/
	.time-left-item {
		display: inline-block;
		text-align: center;
		color: #999;
		padding: 0 2%;
		position: relative;
		height: .9rem;
	}
	
	.time-left-item span {
		display: block;
	}
	
	.time-left-item>span:nth-child(1) {
		font-size: 1.5vw;
	}
	
	.time-left-item>span:nth-child(2) {
		font-size: 1.8vw;
		padding-bottom: 3px;
	}
	
	 .time-left-item .line {
		position: absolute;
		bottom: 0;
		width: 30%;
		background: #3c9bff;
		display: inline-block;
		height: 2px;
		left: 35%;
		display: none;
	}
	
.time-left-item.on span {
		color: #3c9bff;
	}
	
	.time-left-item.on .line {
		display: block;
	}
</style>