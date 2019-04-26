<template>
	<div id="historyRecord">
		<headline headtxt="历史数据" none=""></headline>
		<div class="hospital-list">
			<div class="hospital-list-title">
				<img :src="patientInfo.headUrl||'http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg'" />
				<div class="hospital-list-title-message">
					<p>{{patientInfo.name}}</p>
					<span>{{patientInfo.sex}}</span><span>{{patientInfo.age}}岁</span>
				</div>
			</div>
			<div class="hospital-list-content">
				<ul>
					<li v-for="(item,i) in tabList" :data-index="i" :class="{active:i===tabCurrentIndex}" v-on:click="tabCurrentIndex = i,changeTab($event)">{{item.name}}</li>
					<!--<li v-on:click="changeTab">血压</li>
					<li v-on:click="changeTab">血氧</li>
					<li v-on:click="changeTab">血糖</li>
					<li v-on:click="changeTab">体温</li>
					<li v-on:click="changeTab">B超</li>
					<li v-on:click="changeTab">尿常规</li>
					<li v-on:click="changeTab">生化</li>-->
				</ul>
			</div>
		</div>
		<div class="history-data-content" v-show="isChart">
			<div class="history-data-content-data-table-detail">
				<div class="history-data-content-data-table-detail-data-table">
					<div id="mycharts">

					</div>
					<div>
						<!--<img :src=""/>-->
					</div>
				</div>
				<div class="history-data-content-data-table-detail-data-specification" v-show="tabCurrentIndex==1">
					<span>正常参考值</span><span class="specification">收缩压：</span><span>90-140mmHg</span><span class="specification">舒张压：</span><span>60-90mmHg</span>
				</div>
				<div class="history-data-content-data-table-detail-data-specification" v-show="tabCurrentIndex==2">
					<span>正常参考值</span><span class="specification">血氧饱和度：</span><span>94%-100%</span><span class="specification">脉率：</span><span>60-100次/分</span>
				</div>
				<div class="history-data-content-data-table-detail-data-specification" v-show="tabCurrentIndex==3">
					<span>正常参考值</span><span class="specification">餐前：</span><span>3.6-5.6mmol/L</span><span class="specification">餐后：</span><span>3.6-5.6mmol/L</span><span class="specification">空腹：</span><span>3.6-6.1mmol/L</span>
				</div>
				<div class="history-data-content-data-table-detail-data-specification" v-show="tabCurrentIndex==4">
					<span>正常参考值</span><span class="specification">体温：</span><span>35.9-37.2℃</span>
				</div>
			</div>

			<div class="history-data-content-data-list-record">
				<table border="0" cellspacing="0" cellpadding="" >
					<tr>
						<th v-for="(item,i) in currentChartRender.title" v-show="tabCurrentIndex<5" :style="tabCurrentIndex==2?'padding:0 1.02rem':tabCurrentIndex==3?'padding:0 1.2rem':tabCurrentIndex==4?'padding:0 1.73rem':''">{{item}}</th>
						<!--<th>检测时间</th>
						<th>收缩压(mmHg)</th>
						<th>舒张压(mmHg)</th>
						<th>平均压</th>
						<th>脉率(BPM)</th>-->
					</tr>
					<tr v-for="(item,i) in currentChartRender.content">
						<td v-for="(contentitem,contentIndex) in item" v-show="tabCurrentIndex<5">{{contentitem}}</td>
						<!--<td>{{item.checkDate}}</td>
						<td>{{item.SBP}}</td>
						<td>{{item.DBP}}</td>
						<td>{{item.MAP}}</td>
						<td>{{item.BPM}}</td>-->
					</tr>
				</table>
			</div>
		</div>
		<!--心电图处理--head-->
		<div class="ecg-body" v-show="!isChart">
			<div class="history-data-content-data-list-record" v-if="ecg_pic">
				<table border="0" cellspacing="0" cellpadding="" >
					<tr>
						<th>编号</th>
						<th>检测时间</th>
						<th>诊断提示/医生结论</th>
						<th>状态</th>
						<th>查看心电图</th>
					</tr>
					<tr v-for="(item,index) in ecgRender.content">
						<td v-for="(ecg_item,ecg_index) in item" :class="ecg_index===4?'active':''" :data-ecgurl="ecg_index!=4?'':item[4]" @click="checkEcg">{{ecg_index!=4?ecg_item:'查看'}}</td>
					</tr>
				</table>
			</div>
			<div class="ecg-pic" v-else>
				<img :src="current_ecg_pic"/>
				<div class="ecg-back" @click="backEcgTable">
					返回
				</div>
			</div>
		</div>
		<!--心电图处理--end-->
	</div>
</template>

<script>
	import { getSinglePatients, getKnowledgeTag, cancelAttention, getSingleHistoryRecord } from 'API/requst'
	import headline from 'components/headline/headline.vue';
	import echarts from '../../../util/echarts.common.min'
	import { dateFormat } from 'utils/util'
	let option_bloodPressure = {legendData:[{name:'收缩压',textStyle:{color:'#FFBE96'}}, {name:'舒张压',textStyle:{color:'#48D1E5'}}, {name:'平均压',textStyle:{color:'#47A0FF'}}],series:[{
							name: '收缩压',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#FFBE96'
									}
								}
							},
							data: []
						},
						{
							name: '舒张压',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#48D1E5'
									}
								}
							},
							data: []
						},
						{
							name: '平均压',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#47A0FF'
									}
								}
							},
							data: []
						}]};
						
	let option_bloodOxygen = {legendData:[{name:'血氧',textStyle:{color:'#FFBE96'}}, {name:'脉率',textStyle:{color:'#48D1E5'}}],series:[{
							name: '血氧',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#FFBE96'
									}
								}
							},
							data: []
						},
						{
							name: '脉率',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#48D1E5'
									}
								}
							},
							data: []
						}]}
	let option_bloodSugar = {legendData:[{name:'血糖',textStyle:{color:'#FFBE96'}}],series:[{
							name: '血糖',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#FFBE96'
									}
								}
							},
							data: []
					}]}
	let option_temp = {legendData:[{name:'摄氏度',textStyle:{color:'#FFBE96'}}],series:[{
							name: '摄氏度',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#FFBE96'
									}
								}
							},
							data: []
					}]}
	export default {
		name: 'familyDoctorHome',
		components: {},
		data() {
			return {
				playing: true,
				bennLike: false,
				isChart: true,//显示心电图还是图表
				ecg_pic:true,
				current_ecg_pic:'',
				tabCurrentIndex: 1, //当前的tab页显示
				patientInfo: {},
				tabList: [{
					index: 0,
					name: '心电',
					show: true
				}, {
					index: 1,
					name: '血压',
					show: false
				}, {
					index: 2,
					name: '血氧',
					show: false
				}, {
					index: 3,
					name: '血糖',
					show: false
				}, {
					index: 4,
					name: '体温',
					show: false
				}, {
					index: 5,
					name: 'B超',
					show: false
				}, {
					index: 6,
					name: '尿常规',
					show: false
				}, {
					index: 7,
					name: '生化',
					show: false
				}], //所有tab页结构
				bloodPressureChart: {
					title: ['编号', '检测时间', '收缩压(mmHg)', '舒张压(mmHg)', '平均压', '脉率(BPM)'],
					content: [{
						num: '1',
						checkDate: '2018-12-02 11:00',
						SBP: '118',
						DBP: '74',
						MAP: '89',
						BPM: '68'
					}, {
						num: '1',
						checkDate: '2018-12-02 11:00',
						SBP: '118',
						DBP: '74',
						MAP: '89',
						BPM: '68'
					}]
				}, //血压图标数据结构
				bloodOxygen: {
					title: ['编号', '检测时间', '脉率(BPM)', '血氧饱和度(%)'],
					content: [{
						num: '1',
						checkDate: '2018-12-02 11:00',
						BPM: '68',
						oxyhemoglobin: '99'
					}, {
						num: '2',
						checkDate: '2018-12-02 11:00',
						BPM: '68',
						oxyhemoglobin: '95'
					}]
				},
				HeartRate: {},
				bloodSugar: {
					title: ['编号', '检测时间', '血糖', '测量类型'],
					content: [{}]
				},
				temp: {
					title: ['编号', '检测时间', '体温'],
					content: [{}]
				},
				bloodPressureChartRender: {
					title: ['编号', '检测时间', '收缩压(mmHg)', '舒张压(mmHg)', '平均压', '脉率(BPM)'],
					content: [
						[1, '2018-12-02 11:00', '118', '74', '89', '68']
					]
				},
				bloodOxygenRender: {
					title: ['编号', '检测时间', '脉率(BPM)', '血氧饱和度(%)'],
					content: []
				},
				bloodSugarChartRender: {
					title: ['编号', '检测时间', '血糖', '测量类型'],
					content: [
						[]
					]
				},
				tempChartRender: {
					title: ['编号', '检测时间', '体温'],
					content: [
						[]
					]
				},
				ecgRender: {
					title: ['编号', '检测时间', '诊断提示/医生结论','状态'],
					content: [
						[]
					]
				},
				currentChartRender: [],
				personId: '',
				startTime: {
					time: ''
				},
				option: {
					title: {
//					text: '折线图堆叠'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
					orient: 'horizontal', // 'vertical'
       				x: 'right', // 'center' | 'left' | {number},
        			y: 'bottom', // 'center' | 'bottom' | {number}
					data: [{name:'收缩压',textStyle:{color:'#FFBE96'}}, {name:'舒张压',textStyle:{color:'#48D1E5'}}, {name:'平均压',textStyle:{color:'#47A0FF'}}]
					},
					grid: {
						left: '1.5%',
						right: '4%',
						bottom: '8%',
						containLabel: true
					},
					toolbox: {
						feature: {
							//						saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['','1', '2', '3', '4', '5', '6', '7'],
					    offset:0
						
					},
					yAxis: {
						type: 'value',
						axisLine:{       //y轴刻度线
                         show:false
                              }
					},
					series: [{
							name: '收缩压',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#FFBE96'
									}
								}
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '舒张压',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#48D1E5'
									}
								}
							},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '平均压',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									lineStyle: {
										color: '#47A0FF'
									}
								}
							},
							data: [150, 232, 201, 154, 190, 330, 410]
						}
					]
				}

			}
		},
		methods: {
			changeTab: function(event) {
				let vm = this;
				console.log(typeof event.target.dataset.index);
				switch(event.target.dataset.index) {
					case '0':
                    vm.isChart = false                   
						break;
					case '1':
					vm.bloodPressure();
						break;
					case '2':
					vm.SpO2();
						break;
					case '3':
					vm.Glu();
						break;
					case '4':
					vm.Temperature();
						break;
					case '5':
						break;
					case '6':
						break;
					case '7':
						break;
				}
			},
			checkEcg(event){
				let vm = this;
				vm.ecg_pic=false;
				vm.current_ecg_pic = event.target.dataset.ecgurl;
				console.log(event.target.dataset.ecgurl);
				
			},
			backEcgTable(){
				let vm = this;
				vm.ecg_pic=true;
			},
			bloodPressure: function() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血压图标数据渲染--head
				vm.option.series.map(function(item, index) {
					item.data = [];
				})
				let mean_blood_pressuer = [];
				vm.bloodPressureChartRender.content.map(function(item, index) {
					mean_blood_pressuer.push(item[2]);
				})
				let systolic_pressuer = [];
				vm.bloodPressureChartRender.content.map(function(item, index) {
					systolic_pressuer.push(item[3]);
				})
				let diastolic_pressuer = [];
				vm.bloodPressureChartRender.content.map(function(item, index) {
					diastolic_pressuer.push(item[4]);
				})
				vm.option.legend.data = option_bloodPressure.legendData;
				vm.option.series = option_bloodPressure.series;
				mean_blood_pressuer.unshift('');
				systolic_pressuer.unshift('');
				diastolic_pressuer.unshift('');

				vm.option.series[0].data = mean_blood_pressuer;
				vm.option.series[1].data = systolic_pressuer;
				vm.option.series[2].data = diastolic_pressuer;
				myChart.setOption(vm.option);
//           console.log(vm.option.series[0].data);
				//血压图标数据渲染--end	
				vm.currentChartRender = vm.bloodPressureChartRender;
			},
			SpO2() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血氧图标数据渲染--head
				vm.option.series.map(function(item, index) {
					item.data = [];
				})
				let SpO2 = [],
					VS_HeartRate = [];
				vm.bloodOxygenRender.content.map(function(item, index) {
					SpO2.push(item[2]);
					VS_HeartRate.push(item[3])
				})
				vm.option.legend.data = option_bloodOxygen.legendData;
				vm.option.series = option_bloodOxygen.series;
				
				SpO2.unshift('');
				VS_HeartRate.unshift('');
				vm.option.series[0].data = SpO2;
				vm.option.series[1].data = VS_HeartRate;
				myChart.setOption(vm.option);
				//           console.log(vm.option.series)
				//血氧图标数据渲染--end
				vm.currentChartRender = vm.bloodOxygenRender;
			},
			Glu() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血氧图标数据渲染--head
				vm.option.series.map(function(item, index) {
					item.data = [];
				})
				let Glu = [];
				vm.bloodSugarChartRender.content.map(function(item, index) {
					Glu.push(item[2]);
				})
				vm.option.legend.data = option_bloodSugar.legendData;
				vm.option.series = option_bloodSugar.series;
				Glu.unshift('');
				vm.option.series[0].data = Glu;
				myChart.setOption(vm.option);
				//           console.log(vm.option.series)
				//血氧图标数据渲染--end
				vm.currentChartRender = vm.bloodSugarChartRender;
			},
			Temperature() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血氧图标数据渲染--head
				vm.option.series.map(function(item, index) {
					item.data = [];
				})
				let Temperature = [];
				vm.tempChartRender.content.map(function(item, index) {
					Temperature.push(item[2]);
				})
				
				Temperature.unshift('');
				
				vm.option.legend.data = option_temp.legendData;
				vm.option.series = option_temp.series;				
				vm.option.series[0].data = Temperature;
				myChart.setOption(vm.option);
				//           console.log(vm.option.series)
				//血氧图标数据渲染--end
				vm.currentChartRender = vm.tempChartRender;
			}
		},
		components: {
			headline
		},
		created() {
			var vm = this;
			var personId = window.location.search.split('=')[1];
			let params_BloodPressure = {
				type: 'BloodPressure',
				personId: personId,
				serialNo: '00000'
			} //血压参数
			let params_Temperature = {
				type: 'Temperature',
				personId: personId,
				serialNo: '00000'
			} //温度参数
			let params_SpO2 = {
				type: 'SpO2',
				personId: personId,
				serialNo: '00000'
			} //血氧参数
			let params_Glu = {
				type: 'Glu',
				personId: personId,
				serialNo: '00000'
			} //血糖参数
			let params_ecg = {
				type: 'ecg',
				personId: personId,
				serialNo: '00000'
			} //心电参数
			vm.personId = personId;
			getSinglePatients({
				personId: personId
			}).then(data => {
				let {
					sex,
					phone,
					age,
					name,
					idNumber,
					headUrl
				} = data;
				vm.patientInfo = {
					'sex': parseInt(sex) === 1 ? '男' : '女',
					'phone': phone,
					'age': age,
					'name': name,
					'idNumber': idNumber,
					'headUrl': headUrl
				}
			})
			//血压数据--head
			getSingleHistoryRecord(params_BloodPressure).then(function(data) {
				//				console.log(data);
				vm.bloodPressureChart.content = data.result;
				let bloodPressureChart = vm.bloodPressureChart;
				let content = [];
				bloodPressureChart.content.map(function(item, index) {
					content.push([index + 1, dateFormat(item.detectionTime), item.value1, item.value2, item.value3, item.value4])
				})
				vm.bloodPressureChartRender.content = content;
				//               console.log(content);
				vm.bloodPressure();
			})
			//血压数据--end
			//血氧数据--head
			getSingleHistoryRecord(params_SpO2).then(function(data) {
				let SpO2 = [];
				data.result.map(function(item, index) {
					SpO2.push([index + 1, dateFormat(item.SpO2), item.SpO2, item.VS_HeartRate]);
				})
				vm.bloodOxygenRender.content = SpO2;
			})
			//血氧数据--end
			//血糖数据--head
			getSingleHistoryRecord(params_Glu).then(function(data) {
				let Glu = [];
				data.result.map(function(item, index) {
					Glu.push([index + 1, dateFormat(item.detectionTime), item.Glu, item.GluState]);
				})
				vm.bloodSugarChartRender.content = Glu;
			})
			//血糖数据--end
			//体温数据--head
			getSingleHistoryRecord(params_Temperature).then(function(data) {
				let Temperature = [];
				data.result.map(function(item, index) {
					Temperature.push([index + 1, dateFormat(item.detectionTime), item.Temperature]);
				})
				vm.tempChartRender.content = Temperature;
			})
			//体温数据--end
			//心电数据--head
			getSingleHistoryRecord(params_ecg).then(function(data) {
				let ecg = [];
				data.ecgs.map(function(item, index) {
					ecg.push([index + 1, dateFormat(item.examFinishTime), item.conclusion,item.status,item.ReportUrl]);
				})
				vm.ecgRender.content = ecg;
			})
			//心电数据--end

		},
		mounted() {
			let vm = this;
			//			图标初始化--head
//			var myChart = echarts.init(document.getElementById('mycharts'));
			// 指定图表的配置项和数据
			// 使用刚指定的配置项和数据显示图表。
//			myChart.setOption(vm.option);
			//			图标初始化--end、、

		}
	}
</script>

<style lang="scss" scoped type="text/css">
	body {
		overflow: hidden;
	}
	#historyRecord{
    width: 100vw;
    height: 51vw;
		overflow: hidden;
	}
	.hospital-list {
		width: 16.8vw;
		display: inline-block;
		position: relative;
		top: 80px;
		.hospital-list-title {
			margin: 0 auto;
			text-align: center;
			padding-top: 30px;
			img {
				width: 4.0vw;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
			}
			.hospital-list-title-message {
				display: inline-block;
				vertical-align: middle;
				padding-left: 10px;
				font-size: .26rem;
				p {
					font-weight: bold;
				}
				span {
					color: #999999;
					font-size: .22rem;
				}
				span:last-child {
					padding-left: .08rem;
				}
			}
		}
		.hospital-list-content {
			width: 100%;
			height: 55.4vw;
			margin-top: 15px;
			ul {
				li {
					text-align: center;
					font-size: 20px;
					padding: .27rem 0;
				}
			}
			.active {
				background-color: #3C9BFF;
				color: white;
			}
		}
	}
	
	.history-data-content {
		width: 73vw;
		height: 42vw;
		position: relative;
		top: 80px;
		vertical-align: top;
		display: inline-block;
		margin-left: 30px;
		overflow-y: scroll;
		.history-data-content-data-table-detail {
			.history-data-content-data-table-detail-data-table {
				width: 100%;
				height: 30vw;
				#mycharts {
					width: 65vw;
					height: 32vw;
				}
			}
			.history-data-content-data-table-detail-data-specification {
				font-size: .24rem;
				padding: .4rem 0;
				padding-left: 0.23rem;
				span {
					color: #8e8e8e;
				}
				.specification {
					/*display: inline-block;*/
					color: #8e8e8e;
					padding: 0 .1rem;
				}
			}
		}
		.history-data-content-data-list-record {
			position: relative;
			table {
				display: block;
				width: 94%;
				margin: 0 auto;
				th {
					padding: 0 .52rem;
					line-height: .7rem;
					background-color: #f5faff;
					font-size: .20rem;
				}
				th:nth-child(2) {
					padding: 0 .65rem;
				}
				td {
					text-align: center;
					line-height: .5rem;
					font-size: .22rem;
				}
			}
			/*不同table的样式上修改--head*/
			
			.Glu{
				table{
					th{
						padding: 0 0.85rem;
					}
				}
			}
			.SpO2{
				
				table{
					tr{
					th {
						padding: 0 0.85rem;
					}
						
					}
					
				}
			}
			.Temperature{
				table{
					
					th{
						
						padding: 0 1.45rem;
					}
				}
			}
			/*不同table的样式上修改--end*/
		}
	}
	
	.ecg-body {
		width: 73vw;
		height: 34vw;
		position: relative;
		top: 80px;
		vertical-align: top;
		display: inline-block;
		margin-left: 30px;
		overflow-y: scroll;
		table {
			display: block;
			width: 72%;
			position: absolute;
			top: 20%;
			left: 50%;
			transform: translate(-50%,-50%);
			th {
				padding: 0 .25rem;
				line-height: 70px;
				background-color: #f5faff;
				font-size: .18rem;
			}
			th:nth-child(2) {
				padding: 0 .65rem;
			}
			td {
				text-align: center;
				line-height: .5rem;
				font-size: .22rem;
			}
		}
		.ecg-pic{
			position: relative;
			img{
				width: 100%;
				height: 100%;
			}
			div{
		display: block;
		margin: 5vw auto;
		width: 14vw;
		height: 6.7vh;
		text-align: center;
		font-size: 30px;
		line-height: 6.7vh;
		color: white;
		background-color: #3C9BFF;
		border-radius: 15px;
			}
		}
		.active{
			color: #439FFF;
		}
	}
</style>