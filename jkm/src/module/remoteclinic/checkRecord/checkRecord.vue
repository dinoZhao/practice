<template>
	<div class="checkRecord" style="overflow: hidden">
		<div class="back" style="position: absolute;">
			<headline headtxt="" none=""></headline>
		</div>
		<headTop></headTop>
		<div class="checkRecord-head">
			<div id="info">
				<div class="outpatient-part">
					<span v-if="all_info.departmentCode">{{all_info.departmentCode}}</span>
					<span>{{all_info.achiveTime}}</span>
				</div>
				<div class="info-right">
					<div class="info-right-top">
						<div class="littleinfobox">
							<div class="infotip">接诊医生</div>
							<div class="inforeal">{{all_info.doctor}} {{all_info.profession}}</div>
						</div>
						<div class="littleinfobox">
							<div class="infotip">医院</div>
							<div class="inforeal2">{{all_info.diagnosisHospital}}</div>
						</div>

					</div>
				</div>
				<div class="printing" @click="nothing">
					<img src="@/assets/printing.png" alt="">
					<p>打印</p>
					<!--先放假的，以后整合的时候放真的-->
				</div>
			</div>
		</div>
		<div class="checkRecord-content">
		<div class="checkRecord-introduce">
			<div class="introduce-child diagnose">
				<span class="wathet">诊断</span><span>{{all_info.conclusionDesc}}</span>
			</div>
			<div class="introduce-child symptom">
				<span class="wathet">症状</span><span>{{all_info.patientComment}}</span>
			</div>
			<div class="introduce-child advice">
				<span class="wathet">建议</span><span>{{all_info.patientCaseStatement}}</span>
			</div>
		</div>
		<div class="checkRecord-table">
			<div class="from">
				<div class="equals">
					<div class="title">药品</div>
					<template v-if="!!medicine.medicinetype">
						<div class="value" v-for="(item,index) in medicine.medicinetype">{{item}}</div>
					</template>
				</div>
				<div class="equals">
					<div class="sp">
						<div class="title">剂量</div>
						<template v-if="!!medicine.medicineMount">
							<div class="value" v-for="(item,index) in medicine.medicineMount">{{item}}
							</div>
						</template>
					</div>
					<div class="sp">
						<div class="title">备注</div>
						<template v-if="!!medicine.medicineRemark">
							<div class="value" v-for="(item,index) in medicine.medicineRemark">{{item}}</div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<div class="doctorName">
			<span>医生签名</span>
			<span>{{all_info.doctor}}</span>
		</div>
		<div class="doctorAdvice" v-if="doctorAdvice">
			<div class="Advice">
				<span class="wathet">医嘱</span><span>{{doctorAdvice}}</span>
			</div>
		</div>
		<div class="doctorName" v-if="doctorAdvice" style="margin-bottom: 30px;">
			<span>医生签名</span>
			<span v-if="doctorAdvice">{{doctorMsg.docName}}</span>
		</div>
		<div class="footer_btn" v-if="!doctorAdvice">
			<img src="https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5608211608" alt="" @click.stop="show(true)">
		</div>
		</div>
		<div class="toast_wrap" v-if="isShow">
			<div class="toast">
				<div class="toast_top">
					<span>填写医嘱</span>
					<textarea placeholder="根据专家的建议填写助诊医嘱和备注" v-model="advice"></textarea>
				</div>
				<div class="toast_bottom">
					<div class="close" @click="show(false)"><span>取消</span></div>
					<div class="check" @click="check(false)"><span>确定</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import headline from "components/headline/headline.vue";
	import headTop from "components/common/headTop.vue";
	import { viewMedicalRecord, doctorUpdatePhysicalExam } from 'API/requst'
	import { dateFormat, getURLParameter } from 'utils/util';
	export default {
		components: {
			headline,
			headTop
		},
		data() {
			return {
				all_info: {},
				checkRecord_detail: {},
				medicine: [],
				isShow: false,
				advice: '',
				doctorAdvice: null,
				doctorMsg: JSON.parse(sessionStorage.getItem('doctorMsg'))
			}
		},
		methods: {
			viewMedicalRecordUpdate(params) {},
			check(flag) {
				let vm = this
				vm.isShow = flag
				let params = {
					personId: getURLParameter('recordId'),
					clinicAppointmentId: parseInt(getURLParameter('clinicAppointmentId')),
					visitingRecordId: getURLParameter('vid'),
					doctorAdvice: vm.advice ? vm.advice : ''
				}
				doctorUpdatePhysicalExam(params).then(data => {
					if(data.resultCode === 'success') {
						let parames = {
							personId: getURLParameter('recordId'),
							visitingRecordId: getURLParameter('vid')
						}
						viewMedicalRecord(parames).then(data => {
							// console.log(data);
							vm.doctorAdvice = data.result.doctorAdvice;
						}).catch(error => {
							console.log(error);
						})
					}
				}).catch(error => {})
			},
			show(flag) {
				this.isShow = flag
			},
			nothing() {
				let vm = this;
				vm.alertDefault({
					text: '信息盒未连接，打印功能暂不可用',
					rowButton: true
				})
			},
			initialize:function(){
		  		var vm = this;
		  		setTimeout(function(){
			    	var _height = document.body.clientHeight-150;
						$('.checkRecord-content').css('max-height',_height+'px');
						$('.checkRecord-content').css('overflow','auto');
			    },500)
		  	},
		},
		created() {
			var vm = this;
		},
		mounted() {
			let vm = this;
			let params = {
				personId: getURLParameter('recordId'),
				visitingRecordId: getURLParameter('vid')
			}
			viewMedicalRecord(params).then(data => {
				console.log(data);
				let all_info = {},
					checkRecord_detail = {},
					medicine = {},
					medicinetype = [],
					medicineMount = [],
					medicineRemark = [];
					all_info = data.result;
					data.result.achiveTime = dateFormat(data.result.achiveTime);
					medicine = data.result.medications ? data.result.medications : [];
					vm.doctorAdvice = data.result.doctorAdvice;
				//			if(medicine){
				medicine.map(function(item, index) {
					medicinetype.push(item ? item.split('|')[0] : [])
					medicineMount.push(item ? item.split('|')[1] : [])
					medicineRemark.push(item ? item.split('|')[2] : [])
				})
				//			}
				//			else{
				//				console.log(medicine);
				//			}
				//
				medicine.medicinetype = medicinetype;
				medicine.medicineMount = medicineMount;
				medicine.medicineRemark = medicineRemark;
				vm.all_info = all_info;
				vm.medicine = medicine;

			})
		}
	}
</script>

<style lang="scss">
	/*头部医生信息样式--head*/
	
	body {
		overflow: hidden;
	}
	
	.checkRecord {
		overflow: hidden;
	}
	
	#info {
		height: 2rem;
		overflow: hidden;
		border-bottom: solid 1px #DDDDDD;
		padding-left: 280px;
		position: relative;
	}
	
	#info img {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		margin-top: 0.5rem;
		margin-left: 0.5rem;
		float: left;
	}
	
	.outpatient-part {
		background-image: url(../../../assets/border.png);
		background-repeat: no-repeat;
		background-size: 100%;
		width: 20%;
		vertical-align: middle;
		height: 1.0rem;
		padding-top: 0.05rem;
		text-align: center;
		line-height: 0.4rem;
		color: #0b55a3;
		display: inline-block;
		span {
			display: block;
			font-size: 0.25rem;
		}
	}
	
	.info-right {
		height: 2rem;
		width: 60%;
		padding-left: .5rem;
		padding-top: .4rem;
		padding-bottom: .5rem;
		box-sizing: border-box;
		display: inline-block;
		vertical-align: middle;
	}
	
	.checkRecord .back .head {
		top: 0.15rem !important;
		left: 160px;
		position: relative;
	}
	
	.checkRecord .back .back {
		left: 0 !important;
		position: relative;
	}
	
	.info-right-top,
	.info-right-bottom {
		height: 0.5rem;
	}
	
	.info-right-top>div:last-child {
		/*width: 1.5rem;*/
	}
	
	.littleinfobox {
		float: left;
		font-size: 0.2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.infotip {
		height: 100%;
		margin: 0 0.2rem;
		line-height: 0.5rem;
		color: #acacac;
		font-size: 0.3rem;
	}
	
	.inforeal {
		height: 100%;
		margin: 0 0.2rem;
		line-height: 0.5rem;
		color: #333;
		width: 2.2rem;
		font-size: .28rem;
		font-weight: normal;
	}
	
	.inforeal2 {
		height: 100%;
		margin: 0 0.2rem;
		line-height: 0.5rem;
		color: #333;
		font-size: .28rem;
		/*width: 1rem;*/
		font-weight: normal;
	}
	
	.inforeal3 {
		height: 100%;
		margin: 0 0.2rem;
		line-height: 0.5rem;
		float: left;
		color: #333;
		font-size: .28rem;
		width: 1.8rem;
		font-weight: normal;
	}
	
	.printing {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		right: 4%;
		top: 10.9%;
		padding: .1rem 0;
		box-sizing: border-box;
		border: 2px solid #3C9BFF;
		border-radius: .24rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		vertical-align: middle;
		img {
			width: .9rem;
			border-radius: 0 !important;
			margin-top: 0rem !important;
			margin-left: 0rem !important;
		}
		P {
			font-family: PingFangSC-Medium;
			font-size: .28rem;
			color: #3C9BFF;
			letter-spacing: 0;
			text-align: center;
		}
	}
	/*头部医生信息样式--end*/
	
	.checkRecord-introduce {
		margin-top: 0.25rem;
		padding-left: 160px;
	}
	
	.introduce-child {
		padding: 0.1rem 0 0.25rem 0.1rem;
		span:last-child {
			margin-left: 0.35rem;
			font-weight: 700;
			font-size: 0.30rem;
		}
	}
	
	.wathet {
		display: inline-block;
		padding: 0.15rem 0.7rem;
		background-color: rgba(60, 155, 255, 0.10);
		border-radius: 33px;
		color: #3C9BFF;
	}
	/*表格样式--head*/
	
	.checkRecord-table {
		padding-left: 160px;
		padding-right: 30px;
	}
	
	.from {
		display: flex;
		height: 1.62rem;
		/*width: 88.5vw;*/
		border-bottom: 1px solid #eee;
		margin: 0 auto;
		.equals {
			width: 25%;
			height: 100%;
			background-color: rgba(60, 155, 255, 0.05);
			&:nth-of-type(2) {
				display: flex;
				width: 75%;
			}
			.sp {
				width: 33%;
				display: flex;
				flex-direction: column;
				&:nth-of-type(2) {
					width: 67%;
				}
			}
			.title {
				height: 0.6rem;
				line-height: 0.6rem;
				font-family: PingFangSC-Regular;
				font-size: 0.32rem;
				color: #333333;
				letter-spacing: 0;
				text-align: center;
			}
			.value {
				height: 1.02rem;
				line-height: 1.02rem;
				font-family: PingFangSC-Medium;
				font-size: .32rem;
				color: #333333;
				letter-spacing: 0;
				text-align: center;
				font-weight: 600;
				background-color: #fff;
				p {
					display: inline-block;
					width: auto;
					line-height: 0.42rem;
					padding: 0.04rem 0.24rem;
					background: #d43c33;
					border-radius: 0.25rem;
					color: #fff;
					height: 0.5rem;
					box-sizing: border-box;
					vertical-align: middle;
				}
			}
		}
	}
	
	.footer_btn {
		padding-left: 160px;
		box-sizing: border-box;
		width: 100%;
		text-align: center;
		margin-top: -0.3rem;
		img {
			width: 3.5rem;
			height: 0.9rem;
		}
	}
	
	.toast_wrap {
		background-color: #5f6164;
		width: 100%;
		height: 110%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		padding-left: 160px;
		box-sizing: border-box;
		overflow: hidden;
		.toast {
			width: 70%;
			background-color: #ffffff;
			border-radius: 10px;
			padding-top: .5rem;
			box-sizing: border-box;
			overflow: hidden;
			.toast_top {
				width: 100%;
				text-align: center;
				span {
					color: #000000;
					font-size: 0.36rem;
					font-weight: bolder;
					width: 100%;
					text-align: center;
					display: inline-block;
				}
				textarea {
					width: 94%;
					display: inline-block;
					color: #333;
					border: 1px solid #b4b4b4;
					border-radius: 10px;
					height: 3rem;
					padding: .2rem 0 0 .2rem;
					box-sizing: border-box;
					font-size: 0.28rem;
					margin-top: .5rem;
					&:focus {
						outline: none;
					}
				}
			}
			.toast_bottom {
				width: 100%;
				border-top: 1px solid #EDEDED;
				margin-top: 0.3rem;
				div {
					width: 50%;
					height: 1rem;
					text-align: center;
					line-height: 1rem;
					float: left;
					border-right: 1px solid #EDEDED;
					box-sizing: border-box;
					span {
						font-size: 0.36rem;
						font-weight: 700;
					}
					&.close {
						span {
							color: #5f5f5f;
						}
					}
					&.check {
						border: none;
						span {
							color: #3C9BFf;
						}
					}
				}
			}
		}
	}
	
	.doctorAdvice {
		padding: 0.2rem 30px 0.2rem 160px;
		box-sizing: border-box;
		width: 100%;
		.Advice {
			span {
				&:nth-child(2) {
					font-weight: 700;
					margin-left: 0.35rem;
					font-size: 0.3rem;
				}
			}
		}
	}
	
	.doctorName {
		text-align: right;
		padding-right: 5%;
		span {
			font-size: 0.36rem;
			&:nth-child(1) {
				font-size: 0.28rem;
			}
			&:nth-child(2) {
				font-weight: 700;
				margin-left: 1%;
			}
		}
	}
	
	.change {
		margin-top: 0;
	}
	/*表格样式--end*/
</style>
