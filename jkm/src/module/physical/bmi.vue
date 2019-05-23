<template>
	<div class="bmi">
		<div class="content">
			<ignore :preindex="5"></ignore>
			<div class="right">
				<div class="write">
					<div class="write_info">
						<span>身高</span>
						<input type="number" maxlength="6" placeholder="请输入" v-model="height">
						<i>cm</i>
					</div>
					<div class="write_info" style="text-align:right;">
						<span>体重</span>
						<input type="number" maxlength="6" placeholder="请输入" v-model="weight">
						<i>kg</i>
					</div>
				</div>
				<div class="shadow">
					<p class="s_name">BMI</p> 
					<p class="s_value">{{bmiValue}}
						<img class="icon" v-if="bmiValue!=='--'&&(bmiValue>24||bmiValue<18.5)" :src="bmiValue<18.5?icon[0]:bmiValue>24?icon[1]:''" />
					</p>
				</div>
				<div class="suggest"  style="width: 100%;margin-top: 0.3rem;">
					<div v-for="item in localdetact.suggestions">
						{{item}}
					</div>
				</div>
				<div class="save cliect" @click="saveData">保存</div>
				<queryhis></queryhis>
			</div>
		</div>
	</div>
</template>
<script>
	var data;
	import { readPatientMsg, savePhysicalExamData } from "API/requst";
	import { getURLParameter } from "utils/util";
	import ignore from "./result/ignore.vue";
	import queryhis from './result/queryHis'
	export default {
		name: "bmi",
		props: ["personId", "recordId", 'icon','detact','tabtoggle'],
		inject: ['getresult'],
		data() {
			return {
				height: "",
				weight: "",
				// bmiValue: "--",
				urlData: "",
				localdetact:this.detact['bmi']?this.detact['bmi']:{}
			};
		},
		components: {
			ignore,
			queryhis
		},
		watch:{
			detact(res){
				this.localdetact=res['bmi']
			}
		},
		methods: {
			getBMI(a, b) {
				var bmi = b / ((a / 100) * (a / 100));
				return bmi;
			},
			saveData() {
				if(this.bmiValue == '--') {
					this.alertDefault({
						text: "请输入完整数据",
						rowButton: false,
						leftButtonText: "取消",
						rightButtonText: "确定"
					});
					return;
				}
				var vm = this;
				 data = [{
						recordTime: Date.now(),
						type: "bmi",
						value: vm.bmiValue,
						unit: ''
					},
					{
						recordTime: Date.now(),
						type: "bmi_weight",
						value: vm.weight,
						unit: 'cm'
					},
					{
						recordTime: Date.now(),
						type: "bmi_height",
						value: vm.height,
						unit: 'cm'
					},
				];
					savePhysicalExamData({
					hospitalCode: sessionStorage.getItem("hospitalCode"),
					medicalRecordFolderId: vm.recordId,
					exams: data
				}).then(function() {
					vm.$emit('promote',5,1)
					vm.showtoast('保存成功')
					vm.getresult()
					vm.$emit('nexttab','尿常规',true)

				});
				
			}
		},
		created() {
		},
		computed: {
			bmiValue() {
				var vm=this
				if(Number(this.height) && Number(this.weight)) {
					return this.getBMI(this.height, this.weight).toFixed(1);
				}
				return "--";
			}
		},
	};
</script>
<style lang="scss" scoped>
	.bmi {
		height: 100%;
	}
	
	.content {
		width: 100%;
		display: flex;
		min-height: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		.right {
			padding: 1.2rem 0.4rem;
			width: 100%;
			box-sizing: border-box;
			.write {
				width: 100%;
				height: 1rem;
				display: flex;
				justify-content: space-between;
				.write_info {
					height: 100%;
					position: relative;
					span {
						font-family: PingFangSC-Medium;
						font-size: 0.4rem;
						color: #333333;
						letter-spacing: 0;
						text-align: right;
					}
					input {
						outline: none;
						margin-left: 0.2rem;
						width: 3.4rem;
						height: 100%;
						padding-left: 0.2rem;
						padding-right: .9rem;
						background: #ffffff;
						border: 1px solid #666666;
						border-radius: 0.12rem;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 0.4rem;
						color: #333;
					}
					input::-webkit-input-placeholder {
						font-family: PingFangSC-Regular;
						font-size: 0.4rem;
						color: #999;
						letter-spacing: 0;
					}
					i {
						line-height: 0.56rem;
						position: absolute;
						right: 0.22rem;
						top: 0.22rem;
						font-family: PingFangSC-Regular;
						font-size: 0.4rem;
						color: #666;
						letter-spacing: 0;
					}
				}
			}
			.shadow {
				margin-top: 0.6rem;
				width: 100%;
				height: 2.5rem;
				background: #ffffff;
				box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
				background: url("../../assets/BMI_bkg.png") no-repeat right bottom;
				background-size: 4.9rem 2.16rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.s_name {
					font-family: PingFangSC-Medium;
					font-size: 0.44rem;
					color: #7f807f;
					letter-spacing: 0;
					text-align: center;
				}
				.s_value {
					font-family: PingFangSC-Medium;
					font-size: 0.8rem;
					color: #333333;
					letter-spacing: 0;
					text-align: center;
				}
			}
			.save {
				background: #3c9bff;
				border-radius: 0.12rem;
				width: 2.3rem;
				height: 0.9rem;
				line-height: 0.9rem;
				text-align: center;
				font-family: PingFangSC-Medium;
				font-size: 0.3rem;
				color: #ffffff;
				letter-spacing: 0;
				margin-top: 0.3rem;
				float: right;
			}
		}
	}
</style>
