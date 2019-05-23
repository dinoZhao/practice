<template>
	<div class="startdetection">
		<headline headtxt="首页" none=""></headline>
		<div class="startdetection-content">
			<div class="startdetection-left">
				<div class="startdetection-left-head">
					<img v-bind:src="result.headUrl?result.headUrl:headUrlpng" />
					<div class="startdetection-detail"><span style="font-size: 0.32rem;">{{result.name}}</span><span v-if="result.sex==1" style="display: inline-block;color: #999;font-size: 0.26rem;">男</span><span v-if="result.sex==0" style="display: inline-block;color: #999;">女</span> <span style="display: inline-block;color: #999;font-size: 0.26rem;">{{result.age}}岁</span></div>
				</div>
				<ul class="startdetection-list">
					<li v-bind:class='["startdetection-item",isreuslt?"result":""]' v-for="item in choselist">{{item.value}}</li>
				</ul>
			</div>
			<div class="startdetection-right">
				<div class="ecg" v-if="istype=='ecg'&&!isreuslt">
					<img v-bind:src="ecgdemo" />
					<div class="line">
						<div class="left">
							<div v-bind:class='["left-item",isegs?"on":""]' @click="clickitem">心电模式十二导</div>
							<div v-bind:class='["left-item",!isegs?"on":""]' @click="clickitem">心电模式六导</div>
						</div>
						<div class="right cliect" @click="androidApp">
							开始测量
						</div>
					</div>
					<div class="printing print1" @click="startecg">
						<img src="@/assets/refresh.png" alt="">
						<p>{{'刷新'}}</p>
					</div>
					<div class="printing" @click="printFrom">
						<img src="@/assets/printing.png" alt="">
						<p>{{'样张打印'}}</p>
					</div>
				</div>
				<div class="blood" v-if="istype=='blood'&&!isreuslt">
					<div class="process">
						<img src="../../../assets/pressuredemo.png">
						<div class="describe">
							<div class="above">
								<div class="box" style="display: none;">
									<div class="boxleft">
										<div class="step step1 on"></div>
										<div class="medium"></div>
										<div class="step step2"></div>
									</div>
									<div class="boxright">
										<div></div>
										<div></div>
									</div>
								</div>
							</div>
							<div class="below">
								<div>①桌椅理想高度差25cm~30cm</div>
								<div>②测量环境温度5~40℃</div>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="left">
							<div class="blooditem on" @click="blooditen($event.target)">成人模式</div>
							<div class="blooditem" @click="blooditen($event.target)">儿童模式</div>
							<div class="blooditem" @click="blooditen($event.target)">婴幼儿模式</div>
						</div>
						<div class="right cliect" @click="startecg">
							开始测量
						</div>
					</div>
				</div>
				<div class="oxygen" v-if="istype=='oxygen'&&!isreuslt">
					<div class="process">
						<div class="box" style="display: none;">
							<div class="boxleft">
								<div class="step step1 on"></div>
								<div class="medium"></div>
								<div class="step step2"></div>
							</div>
							<div class="boxright">
								<div>手指脱落</div>
								<div>探索脉搏</div>
							</div>
						</div>
						<div><img src="../../../assets/oxygendemo.png">
							<div class="below">
								<div>①按图示插入手指</div>
								<div>②测量环境温度5~40℃</div>
							</div>
						</div>
					</div>
				</div>
				<div class="glucose" v-if="istype=='glucose'&&!isreuslt">
					<div class="process">
						<div class="express">
							<div class="below">
								<div>①安装针头，清洁手指</div>
								<div>②使用采血针采取血样</div>
								<div>③使用试纸吸取血样后，将试纸插入血糖仪</div>
							</div>
						</div>
						<div class="box" style="display: none;">
							<div class="boxleft">
								<div class="step step1"></div>
								<div class="medium"></div>
								<div class="step step2"></div>
								<div class="medium"></div>
								<div class="step step3"></div>
							</div>
							<div class="boxright">
								<div>安装针头，清洁手指</div>
								<div>插入试条</div>
								<div>测量中</div>
							</div>
						</div>
					</div>
				</div>
				<div class="animalheat" v-if="istype=='animalheat'&&!isreuslt">
					<div class="process"><img src="../../../assets/tempdemo.png">
						<div class="below">
							<div>①将额枪器平行对准眉心</div>
							<div>②测量时距离1~3cm</div>
						</div>
					</div>
				</div>
				<div class="ecg-result" v-if="istype=='ecg'&&isreuslt">
					<div class="ecgfur">
						<div class="line">
							<div class="item">
								<div>HR(bpm)：</div><span v-if="ecg">{{ecg.HeartRateBPM}}</span></div>
							<div class="item">
								<div>PR(ms)：</div><span v-if="ecg">{{ecg.PRDurationMS}}</span></div>
							<div class="item">
								<div>QRS(ms)：</div><span v-if="ecg">{{ecg.QRSTimeLimitMS}}</span></div>
							<div class="item">
								<div>QT/QTc(ms)：</div><span v-if="ecg">{{ecg.QTDurationMS}}/{{ecg.QTcDurationMS}}</span></div>
						</div>
						<div class="line">
							<div class="item">
								<div>P/QRS/T轴(° )：</div><span v-if="ecg">{{ecg.PRDurationMS}}/{{ecg.QRSTimeLimitMS}}/{{ecg.TElectricAxis}}</span></div>
							<div class="item">
								<div>RV5/SV1(mV)：</div><span v-if="ecg">{{ecg.RV5ValueMV}}/{{ecg.SV1ValueMV}}</span></div>
							<div class="item">
								<div>RV5+SV1(mV)：</div><span v-if="ecg">{{addnum}}</span></div>
							<div class="item">
								<div>PWidth(ms)：</div><span v-if="ecg">{{ecg.PWidth}}</span></div>
						</div>
						<div class="line">
							<div class="item">
								<div>工频滤波(Hz)：</div><span>94</span></div>
							<div class="item">
								<div>基线漂移滤波(Hz)：</div><span>94</span></div>
							<div class="item">
								<div>肌电滤波(Hz)：</div><span>40Hz</span></div>
							<div class="item">
								<div>波形速率(mm/s)：</div><span>94</span></div>
							<div class="item">
								<div>灵敏度(mm/mV)：</div><span>94</span></div>
						</div><img v-if="ecg" v-bind:src="ecg.ReportUrl">
					</div>
				</div>
				<div class="blood-result" v-if="istype=='blood'&&isreuslt">
					<div class="temfur">
						<div class="dial">
							<div class="part">
								<div style="color: rgb(127, 128, 127); font-size: 0.64rem;">
									收缩压
								</div>
								<div style="font-size: 1.1rem; color: rgb(51, 51, 51);" v-if="bloodPressure">
									{{bloodPressure.BloodPressure_Systolic}}
								</div>
								<div class="oc">mmHg</div> <img src="../../../assets/pressure1.png" /></div>
							<div class="part">
								<div style="color: rgb(127, 128, 127); font-size: 0.64rem;">
									舒张压
								</div>
								<div style="font-size: 1.1rem; color: rgb(51, 51, 51);" v-if="bloodPressure">
									{{bloodPressure.BloodPressure_Diastolic}}
								</div>
								<div class="oc">mmHg</div> <img src="../../../assets/pressure2.png" /></div>
							<div class="part">
								<div style="color: rgb(127, 128, 127); font-size: 0.64rem;">
									平均压
								</div>
								<div style="font-size: 1.1rem; color: rgb(51, 51, 51);" v-if="bloodPressure">
									{{bloodPressure.BloodPressure_Mean}}
								</div>
								<div class="oc">mmHg</div> <img src="../../../assets/pressure3.png" /></div>
							<div class="part">
								<div style="color: rgb(127, 128, 127); font-size: 0.64rem;">
									脉率
								</div>
								<div style="font-size: 1.1rem; color: rgb(51, 51, 51);" v-if="bloodPressure">
									{{bloodPressure.VS_HeartRate}}
								</div>
								<div class="oc">BPM</div> <img src="../../../assets/pressure4.png" style="width: 2rem;" /></div>
						</div>
						<div class="save cliect" @click="savego">
							保存
						</div>
					</div>
				</div>
				<div class="oxygen-result" v-if="istype=='oxygen'&&isreuslt">
					<div class="temfur">
						<div class="title">
							检测结果
						</div>
						<img class="opic" src="../../../assets/pleth.png" />
						<div class="dial">
							<div class="part">
								<div style="color: rgb(127, 128, 127); font-size: 0.64rem;">
									血氧饱和度
								</div>
								<div style="font-size: 1.1rem; color: rgb(51, 51, 51);">
									{{SpO2.saturation}}
								</div>
								<div class="oc">%</div> <img src="../../../assets/oxygen1.png" /></div>
							<div class="part">
								<div style="color: rgb(127, 128, 127); font-size: 0.64rem;">
									脉率
								</div>
								<div style="font-size: 1.1rem; color: rgb(51, 51, 51);">
									{{SpO2.VS_HeartRate}}
								</div>
								<div class="oc">BPM</div> <img src="../../../assets/pressure4.png" /></div>
						</div>
						<div class="save cliect" @click="savego">
							保存
						</div>
					</div>
				</div>
				<div class="glucose-result" v-if="istype=='glucose'&&isreuslt">
					<div class="temfur">
						<div class="dial">
							<div style="color: #7F807F;font-size: 0.64rem;">
								血糖
							</div>
							<div style="font-size: 1.1rem; color: #333;">
								{{Glu.value}}
							</div>
							<div class="oc">mmol/L</div>
							<img src="../../../assets/sugar1.png" />
						</div>
						<div class="status">
							<div>血糖检测时您的状态：</div>
							<div class="btnitem btn on" @click="clickbtnitem($event.target)">空腹</div>
							<div class="btnitem btn" @click="clickbtnitem($event.target)">餐后</div>
						</div>
						<div class="save cliect" @click="savego">
							保存
						</div>
					</div>
				</div>
				<div class="animalheat-result" v-if="istype=='animalheat'&&isreuslt">
					<div class="temfur">
						<div class="dial">
							<div style="color: #7F807F;font-size: 0.64rem;">
								体温
							</div>
							<div style="font-size: 1.1rem; color: #333;">
								{{Temperature.value}}
							</div>
							<div class="oc">℃</div>
							<img src="../../../assets/temperature.png" />
						</div>
						<div class="save cliect" @click="savego">
							保存
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="printmeun" v-show="show_print">
			<div class="print_content">
				<img class="print_content_main" src="@/assets/ecgsample.png" style="margin-top:.05rem;">
				<img class="print_content_del" src="@/assets/close.png" @click="closePrint">
			</div>
		</div>
	</div>
</template>
<script>
	var timresult = null;
	import { getDetectionResult, printingReport } from 'API/requst'
	import headline from 'components/headline/headline.vue'
	import { getURLParameter, dateFormat, empty } from 'utils/util'
	import $ from 'jquery'
	import ecgimg from '../../../assets/ecgdemo.png'
	import ecgimgsix from '../../../assets/ecg-six.png'
	import headUrlpng from '../../../assets/headUrl.png'
	export default {

		name: 'hometest',
		components: {},
		data() {
			return {
				choselist: [],
				isegs: true,
				ecgdemo: ecgimg,
				istype: '',
				bloodPressure: {},
				SpO2: {},
				Glu: {},
				Temperature: {},
				ecg: {},
				heartRate: {},
				isreuslt: false,
				addnum: '',
				personId: '',
				result: {},
				recordId: '',
				headUrlpng: headUrlpng,
				show_print: false,
				padcode:''
			}
		},
		methods: {
			clickitem: function(elem, tex) {
				var vm = this;
				vm.isegs = !vm.isegs;
				if(vm.isegs) {
					vm.ecgdemo = ecgimg;
				} else {
					vm.ecgdemo = ecgimgsix;
				}
			},
			clickbtnitem: function(elem) {
				var vm = this;
				$('.btnitem').removeClass('on');
				$(elem).addClass('on');
			},
			blooditen: function(elem) {
				var vm = this;
				$('.blooditem').removeClass('on');
				$(elem).addClass('on')
			},
			startblood: function() {
				var vm = this;
				vm.isreuslt = true;
				vm.setinter();
			},
			startecg: function() {
				var vm = this;
				vm.isreuslt = true;
				vm.setinter();
			},
			setinter: function() {
				var vm = this;
				timresult = setInterval(function() {
					vm.getresult();
				}, 1000)
			},
			getresult: function() {
				var vm = this;
				var daobj = {
					'recordId': vm.recordId,
					'personId': vm.personId
				}
				getDetectionResult(daobj).then(data => {
					var msg = data.result;
					vm.result = data;
					vm.bloodPressure = msg.bloodPressure;
					vm.SpO2 = msg.SpO2;
					vm.Glu = msg.Glu;
					vm.Temperature = msg.Temperature;
					vm.ecg = msg.ecg;
					vm.heartRate = msg.heartRate;
					vm.addnum = msg.ecg ? parseFloat(ecg.RV5ValueMV) + parseFloat(ecg.SV1ValueMV) : '';
					switch(vm.istype) {
						case 'ecg':
							if(!empty(msg.ecg) && !empty(msg.ecg.HeartRateBPM)) {
								vm.isreuslt = true;
								//clearInterval(timresult);
							}
							break;
						case 'blood':
							if(!empty(msg.bloodPressure) && !empty(msg.bloodPressure.BloodPressure_Systolic)) {
								vm.isreuslt = true;
								//clearInterval(timresult);
							}
							break;
						case 'glucose':
							console.log('glucose')
							if(!empty(msg.Glu) && !empty(msg.Glu.value)) {
								vm.isreuslt = true;
								//clearInterval(timresult);
							}
							break;
						case 'oxygen':
							if(!empty(msg.SpO2) && !empty(msg.SpO2.saturation)) {
								vm.isreuslt = true;
								//clearInterval(timresult);
							}
							break;
						case 'animalheat':
							if(!empty(msg.Temperature) && !empty(msg.Temperature.value)) {
								vm.isreuslt = true;
								//clearInterval(timresult);
							}
							break;
					}
				}).catch(err => {

				})
			},
			savego: function() {
				var vm = this;
				clearInterval(timresult);
				window.location.href = '../physical/report.html?recordId=' + vm.recordId + '&personId=' + vm.personId;
			},
			androidApp() {
				window.android.startThirdAPP()
			},
			printFrom() {
				var vm = this;
				vm.show_print = true;
				printingReport({
					recordId: vm.recordId,
					padDeviceCode: vm.padcode||sessionStorage.getItem('padcode'),
					personId: vm.personId,
					type: 'ECG'
				}).then(res => {
					console.log(res)
				})
			},
			closePrint() {
				this.show_print = false;
			},
			manualinput(){
				window.location.href='./startdetection.html?recordId'+this.recordId+'&ismanu=true&personId='+vm.personId
			}
		},
		components: {
			headline
		},
		created() {
			var vm = this;
			var choselist = JSON.parse(sessionStorage.getItem('choselist')).value;
			vm.choselist = choselist;
			vm.istype = choselist[0].code;
			vm.personId = sessionStorage.getItem('personId') || 'mcse358b069e3b24dc881a54c1797372368';
			vm.recordId = getURLParameter('recordId');
			var ismanu=getURLParameter('ismanu');
			if(ismanu){
				vm.isreuslt=true
				vm.setinter();
			}else{
				if(vm.istype != 'ecg' && vm.istype != 'blood') {
				vm.setinter();
			} else {
				vm.getresult();
			}
			}
			try {
				var padcode = window.android.getPadCode();
		  	vm.padcode = padcode;
			} catch(err) {
				console.log(err);
			}

		},
		mounted() {

		}
	}
</script>
<style>
	.startdetection {
		overflow: hidden;
		height: 100%;
	}
	
	.startdetection .printmeun {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		z-index: 100;
	}
	
	.startdetection .printmeun .print_content {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border-radius: 2%;
		width: 80%;
		height: 80%;
		margin: auto;
		background: #fff;
		padding: 5%;
		box-sizing: border-box;
	}
	
	.startdetection .printmeun .print_content_main {
		width: 100%;
		height: 100%;
	}
	
	.startdetection .printmeun .print_content_del {
		width: .54rem;
		height: .54rem;
		position: absolute;
		right: 2%;
		top: 3%;
	}
	
	.startdetection-content {
		width: 100%;
		display: -ms-flexbox;
		display: flex;
		height: 100%;
	}
	
	.startdetection-content>div {
		display: inline-block;
	}
	
	.startdetection-left {
		width: 16.8%;
		min-height: 100%;
		border-right: 1px solid #d9d9d9;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		-ms-flex-line-pack: start;
		align-content: flex-start;
		height: 100%;
		overflow: scroll;
		padding-top: 80px;
	}
	
	.startdetection-right {
		width: 80%;
		height: 100%;
		overflow: scroll;
		font-size: 1.5vw;
	}
	
	.startdetection-left-head {
		-ms-flex-pack: center;
		justify-content: center;
		width: 100%;
		display: -ms-inline-flexbox;
		display: inline-flex;
		height: 6.77vw;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.startdetection-left-head span {
		display: block;
	}
	
	.startdetection-left-head img {
		width: .9rem;
		height: .9rem;
		vertical-align: middle;
		margin-right: 10px;
		border-radius: 50%;
	}
	
	.startdetection-detail {
		display: inline-block;
		vertical-align: middle;
		font-size: 1.2vw;
	}
	
	.startdetection-item {
		width: 100%;
		height: 5.2vw;
		line-height: 5.2vw;
		text-align: center;
		font-size: .32rem;
		background: #3c9bff;
		color: #fff;
	}
	
	.startdetection-item.result {
		background: #3c9bff url('../../../assets/result.png') no-repeat center right;
		background-size: 15%;
		background-position-x: 95%;
	}
	
	.ecg,
	.blood,
	.oxygen,
	.glucose,
	.animalheat,
	.ecg-result,
	.blood-result,
	.glucose-result,
	.animalheat-result {
		/*display: none;*/
	}
	
	.startdetection .ecg {
		padding: .3rem 2.34rem;
		box-sizing: border-box;
		padding-top: 1rem;
	}
	
	.startdetection .ecg img {
		width: 100%;
	}
	
	.startdetection .line {
		display: -ms-flexbox;
		display: flex;
		margin-top: .1rem;
	}
	
	.startdetection-right .ecg {
		position: relative;
	}
	
	.startdetection-right .ecg .printing {
		position: absolute;
		right: .5rem;
		top: 2.2rem;
		width: 1.5rem;
		height: 1.5rem;
		padding: .1rem 0;
		box-sizing: border-box;
		border: 2px solid #3C9BFF;
		border-radius: .24rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}
	
	.startdetection-right .ecg .print1 {
		position: absolute;
		right: .5rem;
		top: .4rem;
	}
	
	.startdetection-right .ecg .printing img {
		width: .9rem;
		/* margin-bottom: .1rem; */
	}
	
	.startdetection-right .ecg .print1 img {
		width: .66rem;
	}
	
	.startdetection-right .ecg .printing P {
		font-family: PingFangSC-Medium;
		font-size: .28rem;
		color: #3C9BFF;
		letter-spacing: 0;
		text-align: center;
	}
	
	.startdetection .line .left {
		width: 64%;
		display: -ms-flexbox;
		display: flex;
		overflow: hidden;
	}
	
	.startdetection .line .right {
		width: 36%;
		line-height: .9rem;
		background: #3c9bff;
		border-radius: 12px;
		text-align: center;
		color: #fff;
	}
	
	.startdetection .left>div {
		border-radius: 12px;
		width: 3.2rem;
		color: #fc9452;
		line-height: .9rem;
		text-align: center;
		margin-right: .2rem;
	}
	
	.startdetection .left .on {
		background: #fc9452;
		color: #fff;
	}
	
	.blood .line {
		display: -ms-flexbox;
		display: flex;
		margin-top: .2rem;
		margin-left: .8rem;
		margin-right: .8rem;
	}
	
	.blood .process {
		height: 7rem;
		padding: 1rem .7rem 0 2.34rem;
		display: -ms-flexbox;
		display: flex;
	}
	
	.blood .below {
		height: 30%;
		line-height: 2em;
		font-size: .35rem;
	}
	
	.blood .process img {
		height: 100%;
	}
	
	.blood .process .describe {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: distribute;
		justify-content: space-around;
		height: 100%;
		width: 100%;
	}
	
	.blood .process .describe .above {
		height: 70%;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: end;
		justify-content: flex-end;
	}
	
	.blood .process .describe .above .box {
		width: 4.5rem;
		height: 2.47rem;
		border: 1px solid #d9d9d9;
		padding: .3rem;
		box-sizing: border-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.blood .process .describe .above .box .boxleft {
		width: .7rem;
		height: 100%;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-ms-flex-align: center;
		align-items: center;
		margin-right: .1rem;
	}
	
	.blood .process .describe .above .box .boxleft .step {
		width: .22rem;
		height: .22rem;
		border-radius: .22rem;
		background: rgba(0, 0, 0, .2);
	}
	
	.blood .process .describe .above .box .boxleft .medium {
		width: 1px;
		height: 10px;
		-ms-flex-positive: 1;
		flex-grow: 1;
		background: rgba(0, 0, 0, .2);
	}
	
	.blood .process .describe .above .box .boxleft .step2 {
		margin-bottom: .1rem;
	}
	
	.blood .process .describe .above .box .boxleft .step {
		width: .22rem;
		height: .22rem;
		border-radius: .22rem;
		background: rgba(0, 0, 0, .2);
	}
	
	.blood .process .describe .above .box .boxright {
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	
	.blood .process .describe .above .box .boxleft .step.on {
		background-image: linear-gradient(-180deg, #5eb6f3, #307fe2);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, .2);
	}
	/*血氧*/
	
	.oxygen .process {
		height: 7rem;
		padding: 1rem .7rem 0 .8rem;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	
	.oxygen .process .box {
		width: 4.5rem;
		height: 2rem;
		border: 1px solid #d9d9d9;
		padding: .3rem;
		box-sizing: border-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		-ms-flex-item-align: end;
		align-self: flex-end;
	}
	
	.oxygen .process .box .boxleft {
		width: .7rem;
		height: 100%;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-ms-flex-align: center;
		align-items: center;
		margin-right: .1rem;
	}
	
	.oxygen .process .box .boxright {
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	
	.oxygen .process .box .boxleft .step.on {
		background-image: linear-gradient(-180deg, #5eb6f3, #307fe2);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, .2);
	}
	
	.oxygen .process .box .boxleft .step1 {
		margin-top: .1rem;
	}
	
	.oxygen .process .box .boxleft .step {
		width: .22rem;
		height: .22rem;
		border-radius: .22rem;
		background: rgba(0, 0, 0, .2);
	}
	
	.oxygen .process .box .boxleft .medium {
		width: 1px;
		height: 10px;
		-ms-flex-positive: 1;
		flex-grow: 1;
		background: rgba(0, 0, 0, .2);
	}
	
	.oxygen .process .box .boxleft .step2 {
		margin-bottom: .1rem;
	}
	
	.oxygen .process .box .boxleft .step {
		width: .22rem;
		height: .22rem;
		border-radius: .22rem;
		background: rgba(0, 0, 0, .2);
	}
	
	.oxygen .process .box .boxright {
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	
	.oxygen .process img {
		width: 10rem;
		height: 4.8rem;
	}
	
	.oxygen .process .below {
		height: 30%;
		line-height: 2em;
		width: 60%;
		margin-left: 40%;
		font-size: .35rem;
	}
	/*血糖*/
	
	.glucose .process {
		height: 8rem;
		padding: 1rem .7rem 0 .8rem;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	
	.glucose .process .express {
		background: url('../../../assets/sugardemo.png') no-repeat;
		background-size: contain;
		width: 100%;
	}
	
	.glucose .process .box {
		width: 4.5rem;
		height: 2.87rem;
		border: 1px solid #d9d9d9;
		padding: .3rem;
		box-sizing: border-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-negative: 0;
		flex-shrink: 0;
	}
	
	.glucose .process .box .boxleft {
		width: .7rem;
		height: 100%;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-ms-flex-align: center;
		align-items: center;
		margin-right: .1rem;
	}
	
	.glucose .process .box .boxleft .step1 {
		margin-top: .1rem;
	}
	
	.glucose .process .box .boxleft .step {
		width: .22rem;
		height: .22rem;
		border-radius: .22rem;
		background-image: linear-gradient(-180deg, #5eb6f3, #307fe2);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, .2);
	}
	
	.glucose .process .box .boxleft .medium {
		width: 2px;
		height: 10px;
		-ms-flex-positive: 1;
		flex-grow: 1;
		background: rgba(0, 0, 0, .2);
	}
	
	.glucose .process .box .boxright {
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	
	.glucose .process .below {
		height: 30%;
		line-height: 2em;
		margin-top: 35%;
		font-size: .35rem;
	}
	/*体温*/
	
	.animalheat {}
	
	.animalheat .process {
		height: 7rem;
		padding: 1rem .7rem 0 .8rem;
		position: relative;
	}
	
	.animalheat .process img {
		height: 90%;
	}
	
	.animalheat .process .below {
		height: 30%;
		line-height: 2em;
		width: 30%;
		position: absolute;
		top: .9rem;
		right: 0;
		font-size: .35rem;
	}
	/*心电结果*/
	
	.ecg-result {
		padding: 0 .6rem .6rem;
		box-sizing: border-box;
	}
	
	.ecg-result .line {
		line-height: .73rem;
		border-bottom: 1px solid #eee;
		display: -ms-flexbox;
		display: flex;
		font-size: .5em;
	}
	
	.ecg-result .line>div:first-child,
	.ecgfur .line>div:nth-child(2) {
		-ms-flex-positive: 2;
		flex-grow: 2;
	}
	
	.ecg-result .line .item {
		display: -ms-inline-flexbox;
		display: inline-flex;
		width: 24%;
	}
	
	.ecg-result .line .item div[data-v-aed6d486] {
		color: #666;
	}
	
	.ecg-result .ecgfur>img {
		width: 100%;
		height: 35vw;
	}
	/*血压*/
	
	.blood-result .temfur {
		width: 100%;
		padding: .5rem 0 .5rem .6rem;
		position: relative;
		width: calc(100% - .6rem);
	}
	
	.blood-result .dial {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}
	
	.blood-result .dial .part {
		height: 17.2vw;
		width: 45%;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: center;
		justify-content: center;
		-ms-flex-align: center;
		align-items: center;
		position: relative;
		box-shadow: 0 10px 24px 10px rgba(48, 127, 226, .08);
		border: 1px solid #d9d9d9;
		margin-right: .6rem;
		margin-bottom: .6rem;
		overflow: hidden;
	}
	
	.blood-result .dial .oc {
		font-size: .28rem;
		background: #3c9bff;
		color: #fff;
		width: 1.4rem;
		line-height: .4rem;
		border-radius: 30px;
		text-align: center;
	}
	
	.blood-result .dial img {
		width: 1.5rem;
		height: 2.02rem;
		position: absolute;
		bottom: -.4rem;
		right: -.2rem;
	}
	
	.blood-result .save {
		background: #3c9bff;
		border-radius: 12px;
		width: 2.3rem;
		line-height: .9rem;
		text-align: center;
		font-size: .4rem;
		float: right;
		margin-right: .6rem;
		color: #fff;
		margin-bottom: .6rem;
	}
	/*血糖*/
	
	.glucose-result .temfur {
		width: 100%;
		padding: 0.6rem;
		position: relative;
		width: calc(100% - 1.2rem);
	}
	
	.glucose-result .dial {
		height: 31.2vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
		border: 1px solid #d9d9d9;
		overflow: hidden;
	}
	
	.glucose-result .status {
		float: left;
		margin-top: 0.8rem;
		display: flex;
		line-height: 0.9rem;
	}
	
	.glucose-result .save {
		background: #3C9BFF;
		border-radius: 12px;
		width: 2.3rem;
		line-height: 0.9rem;
		text-align: center;
		font-size: 0.4rem;
		float: right;
		margin-top: 0.8rem;
		color: #fff;
	}
	
	.glucose-result .dial .oc {
		font-size: 0.28rem;
		background: #3C9BFF;
		color: #FFFFFF;
		width: 1.4rem;
		line-height: 0.4rem;
		border-radius: 30px;
		text-align: center;
	}
	
	.glucose-result .dial img {
		width: 3.1rem;
		height: 3.02rem;
		opacity: 0.08;
		position: absolute;
		bottom: -0.4rem;
		right: -0.2rem;
	}
	
	.glucose-result .status .btn {
		border-radius: 12px;
		width: 2.3rem;
		line-height: 0.9rem;
		text-align: center;
		font-size: 0.4rem;
		margin: 0 0.3rem;
		color: #333;
	}
	
	.glucose-result .status .on {
		background: #FC9452;
		color: #fff;
	}
	/*体温*/
	
	.animalheat-result .temfur {
		width: 100%;
		padding: 0.6rem;
		position: relative;
		width: calc(100% - 1.2rem);
	}
	
	.animalheat-result .dial {
		height: 31.2vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
		border: 1px solid #d9d9d9;
	}
	
	.animalheat-result .save {
		background: #3C9BFF;
		border-radius: 12px;
		width: 2.3rem;
		line-height: 0.9rem;
		text-align: center;
		font-size: 0.4rem;
		float: right;
		margin-top: 0.8rem;
		color: #fff;
	}
	
	.animalheat-result .dial .oc {
		font-size: 0.28rem;
		background: #3C9BFF;
		color: #FFFFFF;
		width: 1.4rem;
		line-height: 0.4rem;
		border-radius: 30px;
		text-align: center;
	}
	
	.animalheat-result .dial img {
		width: 3.1rem;
		height: 3.02rem;
		opacity: 0.08;
		position: absolute;
		bottom: -0.4rem;
		right: -0.2rem;
	}
	/*血氧*/
	
	.oxygen-result .temfur {
		width: 100%;
		padding: .5rem 0 .5rem .6rem;
		position: relative;
		width: calc(100% - .6rem);
	}
	
	.oxygen-result .title {
		font-size: 0.48rem;
		margin-bottom: 0.33rem;
	}
	
	.oxygen-result .opic {
		width: calc(100% - 0.6rem);
		margin-bottom: 0.33rem;
	}
	
	.oxygen-result .dial .part {
		height: 17.2vw;
		width: 45%;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: center;
		justify-content: center;
		-ms-flex-align: center;
		align-items: center;
		position: relative;
		box-shadow: 0 10px 24px 10px rgba(48, 127, 226, .08);
		border: 1px solid #d9d9d9;
		margin-right: .6rem;
		margin-bottom: .6rem;
		overflow: hidden;
	}
	
	.oxygen-result .dial .oc {
		font-size: .28rem;
		background: #3c9bff;
		color: #fff;
		width: 1.4rem;
		line-height: .4rem;
		border-radius: 30px;
		text-align: center;
	}
	
	.oxygen-result .dial img {
		width: 2rem;
		height: 2.02rem;
		position: absolute;
		bottom: -.4rem;
		right: -.2rem;
	}
	
	.oxygen-result .save {
		background: #3c9bff;
		border-radius: 12px;
		width: 2.3rem;
		line-height: .9rem;
		text-align: center;
		font-size: .4rem;
		float: right;
		margin-right: .6rem;
		color: #fff;
		margin-bottom: .6rem;
	}
</style>
