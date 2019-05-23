<template>
	<div class="screening">
		<!--<div class="headTop">-->
		<!--<headTop></headTop>-->
		<!--</div>-->
		<div id="historyRecord">
			<headline headtxt="历史数据" none=""></headline>
			<div class="hospital-list">
				<!--<div class="hospital-list-title">
				<img :src="patientInfo.headUrl||'http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg'" />
				<div class="hospital-list-title-message">
					<p>{{patientInfo.name}}</p>
					<span>{{patientInfo.sex}}</span><span>{{patientInfo.age}}岁</span>
				</div>
			</div>-->
				<div class="hospital-list-content">
					<ul>
						<li v-for="(item,i) in tabList" :data-index="i" :class="{active:i===tabCurrentIndex}" v-on:click="tabCurrentIndex = i,changeTab($event)">{{item.name}}</li>
					</ul>
				</div>
			</div>
			<div class="history-data-content" v-show="isChart==='1'?false:isChart">
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
					<div class="history-data-content-data-table-detail-data-specification" v-show="tabCurrentIndex==5">
						<span>正常参考值</span><span class="specification">体质指数：</span><span>1.8~2.53kg/㎡</span>
					</div>
					<div class="history-data-content-data-table-detail-data-specification" v-show="tabCurrentIndex==7">
						<span>正常参考值</span><span class="specification">总胆固醇：</span><span>2.8～5.17</span><span class="specification">甘油三酯：</span><span>0.56～1.7</span><span class="specification">高密度脂蛋白胆固醇：</span><span>0.90～1.55</span><span class="specification">低密度脂蛋白胆固醇：</span><span>0～3.1</span>
					</div>
				</div>

				<div class="history-data-content-data-list-record">
					<table border="0" cellspacing="0" cellpadding="">
						<tr>
							<th v-for="(item,i) in currentChartRender.title" v-show="tabCurrentIndex!=8" :style="tabCurrentIndex==2?'padding:0 0.76rem':tabCurrentIndex==3?'padding:0 0.9rem':tabCurrentIndex==4?'padding:0 1.30rem':tabCurrentIndex==5?'padding:0 4vw;':tabCurrentIndex==7?'padding:1vw 0.1vw;line-height:0.4rem;':''">{{item}}</th>
							<!--<th>检测时间</th>
						<th>收缩压(mmHg)</th>
						<th>舒张压(mmHg)</th>
						<th>平均压</th>
						<th>脉率(BPM)</th>-->
						</tr>
						<tr v-for="(item,i) in currentChartRender.content">
							<td v-for="(contentitem,contentIndex) in item" v-show="tabCurrentIndex!=8">{{contentitem}}</td>
							<!--<td>{{item.checkDate}}</td>
						<td>{{item.SBP}}</td>
						<td>{{item.DBP}}</td>
						<td>{{item.MAP}}</td>
						<td>{{item.BPM}}</td>-->
						</tr>
					</table>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
			<!--心电图处理--head-->
			<div class="ecg-body" v-show="isChart=='1'?false:!isChart">
				<div class="history-data-content-data-list-record" v-if="ecg_and_urine_status[ecg_pic]===ecg_and_urine_status[0]">
					<table border="0" cellspacing="0" cellpadding="">
						<tr>
							<th>编号</th>
							<th>检测时间</th>
							<th>诊断提示</th>
							<th>状态</th>
							<th>查看心电图</th>
							<th style="visibility: hidden;"></th>

						</tr>
						<tr v-for="(item,index) in ecgRender.content">
							<td v-for="(ecg_item,ecg_index) in item" :data-msgindex="index" :class="{active:ecg_index===4,inquery:ecg_index===5}" :data-ecgurl="ecg_index!=4?'':item[4]" :data-ecgindex="ecg_index"  @click="checkEcg">{{ecg_index!=4?ecg_item:'查看'}}</td>
						</tr>
					</table>
				</div>
				<div class="history-data-content-data-list-record" v-if="ecg_and_urine_status[ecg_pic]===ecg_and_urine_status[2]">
					<table border="0" cellspacing="0" cellpadding="">
						<tr>
							<th>编号</th>
							<th>检测时间</th>
							<th>诊断提示</th>
							<th class="opacity0">状态</th>
							<th class="opacity0">查看尿常规</th>
						</tr>
						<tr v-for="(item,index) in urineRender.content">
							<td v-for="(ecg_item,ecg_index) in item" :style="ecg_index==2?'width:5.2rem':''" :class="ecg_index===4?'active':''" :data-ecgurl="index" @click="checkurine">{{ecg_index!=4?ecg_item:'查看'}}</td>
						</tr>
					</table>
				</div>
				<div class="ecg-pic" v-if="ecg_and_urine_status[ecg_pic]===ecg_and_urine_status[1]">
					<div class="comment" v-show="diagnosis">
						<div class="result"><span style="margin-right: 0.2rem;">诊断结果</span><span style="color: #000;">{{diagnosis}}</span></div>
						<div class="sign"><span style="margin-right: 0.2rem;">诊断医生</span><span style="margin-right: 0.8rem;">{{diagnosisDoctor}}</span><span style="margin-right: 0.2rem;">诊断时间</span><span>{{diagnosisTime}}</span></div>
					</div>
		<div class="line lines">
			<div class="item">
				<div>HR(bpm)：</div><span>{{localdetact.HeartRateBPM}}</span></div>
			<div class="item">
				<div>PR(ms)：</div><span>{{localdetact.PRDurationMS}}</span></div>
			<div class="item">
				<div>QRS(ms)：</div><span>{{localdetact.QRSTimeLimitMS}}</span></div>
			<div class="item">
				<div>QT/QTc(ms)：</div><span>{{localdetact.QTDurationMS}}/{{localdetact.QTcDurationMS}}</span></div>
		</div>
		<div class="line lines">
			<div class="item">
				<div>P/QRS/T轴(° )：</div><span>{{localdetact.PElectricAxis}}/{{localdetact.QRSElectricAxis}}/{{localdetact.TElectricAxis}}</span></div>
			<div class="item">
				<div>RV5/SV1(mV)：</div><span>{{localdetact.RV5ValueMV}}/{{localdetact.SV1ValueMV}}</span></div>
			<div class="item">
				<div>RV5+SV1(mV)：</div><span v-if='localdetact.RV5ValueMV'>{{(Number(localdetact.RV5ValueMV)+Number(localdetact.SV1ValueMV)).toFixed(3)}}</span></div>
			<!--<div class="item">
				<div>PWidth(ms)：</div><span>{{localdetact.PWidth}}</span></div>-->
		</div>
		<div class="line linesingle">
			<div class="item">
				<div>工频滤波(Hz)：</div><span>100</span></div>
			<!--<div class="item">
				<div>基线漂移滤波(Hz)：</div><span>94</span></div>
			<div class="item">
				<div>肌电滤波(Hz)：</div><span>40Hz</span></div>-->
			<div class="item">
				<div>波形速率(mm/s)：</div><span>25</span></div>
			<div class="item">
				<div>灵敏度(mm/mV)：</div><span>10</span></div>
		</div>
					<viewer class='view'>
						<img :src="current_ecg_pic" />
					</viewer>
					<div class="ecg-back" @click="backEcgTable">
						返回
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
				<div class="urine-pic" v-if="ecg_and_urine_status[ecg_pic]===ecg_and_urine_status[3]">
					<div class="b">
						<div class="subtitle">
							<p>检测项目</p>
							<p>本次结果</p>
							<p>参考值</p>
						</div>
						<div class="common">
							<div>白细胞</div>
							<div>
								<div class="ups" v-if="showData.leuStatus&&showData.leuStatus!='Normal'">
									<span>{{showData.leu}}</span>
									<!-- <span v-if="showData.leuStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.leu}}</div>
							</div>
							<div>{{showData.leuRefValue}}</div>
						</div>
						<div class="common">
							<div>亚硝酸盐</div>
							<div>
								<div class="ups" v-if="showData.nitStatus&&showData.nitStatus!='Normal'">
									<span>{{showData.nit}}</span>
									<!-- <span v-if="showData.nitStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.nit}}</div>
							</div>
							<div>{{showData.nitRefValue}}</div>
						</div>
						<div class="common">
							<div>尿胆原</div>
							<div>
								<div class="ups" v-if="showData.ubgStatus&&showData.ubgStatus!='Normal'">
									<span>{{showData.ubg}}</span>
									<!-- <span v-if="showData.ubgStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.ubg}}</div>
							</div>
							<div>{{showData.ubgRefValue}}</div>
						</div>
						<div class="common">
							<div>蛋白质</div>
							<div>
								<div class="ups" v-if="showData.proStatus&&showData.proStatus!='Normal'">
									<span>{{showData.pro}}</span>
									<!-- <span v-if="showData.proStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.pro}}</div>
							</div>
							<div>{{showData.proRefValue}}</div>
						</div>
						<div class="common">
							<div>酸碱度</div>
							<div>
								<div class="up" v-if="showData.phStatus&&showData.phStatus!='Normal'">
									<span>{{showData.ph}}</span>
									<span v-if="showData.phStatus=='Upper'">&nbsp;↑</span>
									<span v-else>&nbsp;↓</span>
								</div>
								<div v-else>{{showData.ph}}</div>
							</div>
							<div>{{showData.phRefValue}}</div>
						</div>
						<div class="common">
							<div>比重</div>
							<div>
								<div class="up" v-if="showData.sgStatus&&showData.sgStatus!='Normal'">
									<span>{{showData.sg}}</span>
									<span v-if="showData.sgStatus=='Upper'">&nbsp;↑</span>
									<span v-else>&nbsp;↓</span>
								</div>
								<div v-else>{{showData.sg}}</div>
							</div>
							<div>{{showData.sgRefValue}}</div>
						</div>
						<div class="common">
							<div>潜血</div>
							<div>
								<div class="ups" v-if="showData.bloStatus&&showData.bloStatus!='Normal'">
									<span>{{showData.blo}}</span>
									<!-- <span v-if="showData.bloStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.blo}}</div>
							</div>
							<div>{{showData.bloRefValue}}</div>
						</div>
						<div class="common">
							<div>酮体</div>
							<div>
								<div class="ups" v-if="showData.ketStatus&&showData.ketStatus!='Normal'">
									<span>{{showData.ket}}</span>
									<!-- <span v-if="showData.ketStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.ket}}</div>
							</div>
							<div>{{showData.ketRefValue}}</div>
						</div>
						<div class="common">
							<div>胆红素</div>
							<div>
								<div class="ups" v-if="showData.bilStatus&&showData.bilStatus!='Normal'">
									<span>{{showData.bil}}</span>
									<!-- <span v-if="showData.bilStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.bil}}</div>
							</div>
							<div>{{showData.bilRefValue}}</div>
						</div>
						<div class="common">
							<div>葡萄糖</div>
							<div>
								<div class="ups" v-if="showData.gluStatus&&showData.gluStatus!='Normal'">
									<span>{{showData.glu}}</span>
									<!-- <span v-if="showData.gluStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.glu}}</div>
							</div>
							<div>{{showData.gluRefValue}}</div>
						</div>
						<div class="common">
							<div>维生素C</div>
							<div>
								<div class="ups" v-if="showData.vcStatus&&showData.vcStatus!='Normal'">
									<span>{{showData.vc}}</span>
									<!-- <span v-if="showData.vcStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
								</div>
								<div v-else>{{showData.vc}}</div>
							</div>
							<div>{{showData.vcRefValue}}</div>
						</div>
						<div class="common">
							<div>尿微量白蛋白</div>
							<div>
								<div class="up" v-if="showData.albStatus&&showData.albStatus!='Normal'">
									<span>{{showData.alb}}</span>
									<span v-if="showData.albStatus=='Upper'">&nbsp;↑</span>
									<span v-else>&nbsp;↓</span>
								</div>
								<div v-else>{{showData.alb}}</div>
							</div>
							<div>{{showData.albRefValue}}</div>
						</div>
						<!--<div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont"><p v-for="(item, index) in showData.suggestions" :key="index">{{item}}</p></div>
      </div>-->
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
			<!--心电图处理--end-->
		</div>
		<div id="alert-win"  v-show="isasist">
		<div class="alert-shadow" ></div>
		<div id="alert-main">
			<div class="alert-text">
				<div>是否需要请求远程协诊？</div>
				<div style="font-size: 0.32rem;margin-top: 0.2rem;"><img @click="intensify"  :src="intense=='1'?apng:npng"/>加急处理</div>
			</div>
			<div class="alert-button-group" @click="asistconfirm">
				<span id="alert-button-left" data-type='cancel'>取消</span>
				<span id="alert-button-right" data-type='confirm' style="color: #3C9BFF;">确定</span>
			</div>
		</div>
	</div>
	</div>

</template>

<script>
	import Viewer from 'v-viewer'
	import { getSinglePatients, getKnowledgeTag, cancelAttention, getSingleHistoryRecord,requestAssistClinic} from 'API/requst'
	import headline from 'components/headline/headline.vue';
	import headTop from 'components/common/headTop.vue'
	import echarts from '../../../util/echarts.common.min'
	import apng from 'assets/already.png'
	import npng from 'assets/notyet.png'
	import { dateFormat, getURLParameter } from 'utils/util'
	let option_bloodPressure = {
		legendData: [{
			name: '收缩压',
			textStyle: {
				color: '#FFBE96'
			}
		}, {
			name: '舒张压',
			textStyle: {
				color: '#48D1E5'
			}
		}, {
			name: '平均压',
			textStyle: {
				color: '#47A0FF'
			}
		}],
		series: [{
				name: '收缩压',
				type: 'line',
				symbol: 'circle',
				symbolSize: 8,
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
				symbol: 'circle',
				symbolSize: 8,
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
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: {
					normal: {
						lineStyle: {
							color: '#47A0FF'
						}
					}
				},
				data: []
			}
		]
	};
	let option_bloodFat = {
		legendData: [{
			name: '总胆固醇',
			textStyle: {
				color: '#FFBE96'
			}
		}, {
			name: '甘油三酯',
			textStyle: {
				color: '#48D1E5'
			}
		}, {
			name: '高密度脂蛋白胆固醇',
			textStyle: {
				color: '#47A0FF'
			}
		}, {
			name: '低密度脂蛋白胆固醇',
			textStyle: {
				color: '#F29DC3'
			}
		}],
		series: [{
				name: '总胆固醇',
				type: 'line',
				symbol: 'circle',
				symbolSize: 8,
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
				name: '甘油三酯',
				type: 'line',
				symbol: 'circle',
				symbolSize: 8,
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
				name: '高密度脂蛋白胆固醇',
				type: 'line',
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: {
					normal: {
						lineStyle: {
							color: '#47A0FF'
						}
					}
				},
				data: []
			}, {
				name: '低密度脂蛋白胆固醇',
				type: 'line',
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: {
					normal: {
						lineStyle: {
							color: '#F29DC3'
						}
					}
				},
				data: []
			}
		]
	};
	let option_bloodOxygen = {
		legendData: [{
			name: '血氧',
			textStyle: {
				color: '#FFBE96'
			}
		}, {
			name: '脉率',
			textStyle: {
				color: '#48D1E5'
			}
		}],
		series: [{
				name: '血氧',
				type: 'line',
				symbol: 'circle',
				symbolSize: 8,
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
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: {
					normal: {
						lineStyle: {
							color: '#48D1E5'
						}
					}
				},
				data: []
			}
		]
	}
	let option_bloodSugar = {
		legendData: [{
			name: '血糖',
			textStyle: {
				color: '#FFBE96'
			}
		}],
		series: [{
			name: '血糖',
			type: 'line',
			symbol: 'circle',
			symbolSize: 8,
			itemStyle: {
				normal: {
					lineStyle: {
						color: '#FFBE96'
					}
				}
			},
			data: []
		}]
	}
	let option_temp = {
		legendData: [{
			name: '摄氏度',
			textStyle: {
				color: '#FFBE96'
			}
		}],
		series: [{
			name: '摄氏度',
			type: 'line',
			symbol: 'circle',
			symbolSize: 8,
			itemStyle: {
				normal: {
					lineStyle: {
						color: '#FFBE96'
					}
				}
			},
			data: []
		}]
	}
	let option_Bmi = {
		legendData: [{
			name: '体质指数',
			textStyle: {
				color: '#FFBE96'
			}
		}],
		series: [{
			name: '体质指数',
			type: 'line',
			symbol: 'circle',
			symbolSize: 8,
			itemStyle: {
				normal: {
					lineStyle: {
						color: '#FFBE96'
					}
				}
			},
			data: []
		}]
	}
	export default {
		name: 'familyDoctorHome',
		components: {},
		data() {
			return {
				localdetact:{},//心电图信息
				recordId:'',
				ecgarr:[],//心电图信息数组
				diagnosisTime:'',
				diagnosisDoctor:'',
				diagnosis:'',
				apng,
				npng,
				intense:0,
				isasist:false,
				ecgactive: '请求协诊',
				playing: true,
				bennLike: false,
				isChart: false, //显示心电图、尿常规还是图表
				ecg_pic: 0,
				ecg_and_urine_status: {
					'0': 'ecg_table', //显示ecg
					'1': 'ecg_pic',
					'2': 'urine_table',
					'3': 'urine_pic'
				},
				current_ecg_pic: '',
				tabCurrentIndex: 0, //当前的tab页显示
				showData: {}, //尿常规显示数据
				urineSingleRender: [],
				patientInfo: {},
				Options: { //预览插件配置
					"inline": true,
					"button": true,
					"navbar": false,
					"title": false,
					"toolbar": false,
					"tooltip": false,
					"movable": false,
					"zoomable": true,
					"rotatable": false,
					"scalable": false,
					"transition": true,
					"fullscreen": true,
					"keyboard": false,
					"url": "data-source"
				},
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
					name: 'BMI',
					show: false
				}, {
					index: 6,
					name: '尿常规',
					show: false
				}, {
					index: 7,
					name: '血脂',
					show: false
				}, {
					index: 8,
					name: 'B超',
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
				bmiRender: {
					title: ['编号', '检测时间', '身高', '体重', '体质指数'],
					content: [
						[]
					]
				},
				ecgRender: {
					title: ['编号', '检测时间', '诊断提示', '状态'],
					content: [
						[]
					]
				},
				urineRender: {
					title: ['编号', '检测时间', '诊断提示', '状态'],
					content: [
						[]
					]
				},
				bloodFatRender: {
					title: ['编号', '检测时间', '总胆固醇(mmol/L)', '甘油三酯(mmol/L)', '高密度脂蛋白胆固醇(mmol/L)', '低密度脂蛋白胆固醇(mmol/L)'],
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
						data: []
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
						data: ['', '1', '2', '3', '4', '5', '6', '7'],
						offset: 0

					},
					yAxis: {
						type: 'value',
						axisLine: { //y轴刻度线
							show: false
						}
					},
					series: []
				}

			}
		},
		methods: {
			requestclinic(){
				var vm=this;
				requestAssistClinic({
					type:'exam',
					patientId:getURLParameter('personId'),
					medicalRecordId:vm.recordId,
					doctorId: JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId,
					urgent:vm.intense,
					subjectType:"Cardiology",
					hospital:'FuCongKJXZ',
					ProcedureType:'AssistClinic',
					symptom:''
				}).then(function(res){
					vm.intense=0
					if(res.resultCode=='success'){
						vm.showtoast('提交成功')
					}else{
						vm.alertDefault({
						text: res.resultMessage,
						rowButton: true,
					})
					}
					
			getSingleHistoryRecord({
				type: 'ecg',
				personId: getURLParameter('personId'),
				serialNo: '00000'
			}).then(function(data) {
				vm.hideLoading()
				let ecg = [];
				data.ecgs.map(function(item, index) {
					ecg.push([index + 1, new Date(item.examFinishTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.examFinishTime).toTimeString().substr(0, 5), item.conclusion, !item.assistDiagnosisStatus?'':item.assistDiagnosisStatus=='Read'?'已协诊':'请求协诊中', item.ReportUrl, vm.ecgactive]);
				})
				vm.ecgRender.content = ecg;
				vm.ecgarr=data.ecgs
			})
				}).catch(function(err){
					vm.alertDefault({
						text: err,
						rowButton: true,
					})
				})
			},
			asistconfirm(e){
				var type=e.target.dataset.type
				console.log()
				if(type=="confirm"){
					this.isasist=false
					this.requestclinic()
				}
				if(type=="cancel"){
					this.isasist=false
				}
			},
			intensify(){
				if(this.intense){
					this.intense=0
				}else{
					this.intense=1
				}
			},
			changeTab: function(event) {
				let vm = this;
				//				console.log(typeof event.target.dataset.index);
				switch(event.target.dataset.index) {
					case '0':
						vm.isChart = false
						vm.ecg_pic = 0;
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
						vm.Bmi();
						break;
					case '6':
						vm.isChart = false
						vm.ecg_pic = 2;
						break;
					case '7':
						vm.bloodFat()
						break;
					case '8':
						vm.nothing();
						break;
				}
			},
			checkEcg(event) {
				let vm = this;
				var msgindex=event.target.dataset.msgindex
				if(event.target.dataset.ecgurl){
				
				vm.diagnosis=vm.ecgarr[msgindex].diagnosis||vm.ecgarr[msgindex].conclusion
				vm.diagnosisDoctor=vm.ecgarr[msgindex].diagnosisDoctor
				vm.localdetact=vm.ecgarr[msgindex]
				var diagnosisTime=vm.ecgarr[msgindex].diagnosisTime
				vm.diagnosisTime=diagnosisTime?new Date(diagnosisTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(diagnosisTime).toTimeString().substr(0, 5):''
				vm.ecg_pic = 1;
				vm.current_ecg_pic = event.target.dataset.ecgurl;
				}else if(event.target.dataset.ecgindex==5){
					vm.recordId=vm.ecgarr[msgindex].medicalRecordFoldId
					vm.isasist=true
				}
			},
			checkurine(event) {
				let vm = this,
					index;
				vm.ecg_pic = 3;
				index = event.target.dataset.ecgurl;
				console.log(vm.urineSingleRender);
				vm.showData = vm.urineSingleRender[index];
				console.log(index);
			},
			backEcgTable() {
				let vm = this;
				vm.ecg_pic = 0;
			},
			nothing() {
				let vm = this;
				vm.isChart = '1';
				vm.construction()
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
				var arr3 = [{
					name: '收缩压',
					type: 'line',
					max: 300,
					symbol: 'circle',
					symbolSize: 8,
					itemStyle: {
						normal: {
							lineStyle: {
								color: '#FFBE96'
							}
						}
					},
					data: mean_blood_pressuer
				}, {
					name: '舒张压',
					type: 'line',
					max: 300,
					symbol: 'circle',
					symbolSize: 8,
					itemStyle: {
						normal: {
							lineStyle: {
								color: '#48D1E5'
							}
						}
					},
					data: systolic_pressuer
				}, {
					name: '平均压',
					type: 'line',
					max: 300,
					symbol: 'circle',
					symbolSize: 8,
					itemStyle: {
						normal: {
							lineStyle: {
								color: '#47A0FF'
							}
						}
					},
					data: diastolic_pressuer
				}];
				vm.option.series = arr3;
				//				vm.option.series[0].data = mean_blood_pressuer;
				//				vm.option.series[1].data = systolic_pressuer;
				//				vm.option.series[2].data = diastolic_pressuer;
				myChart.setOption(vm.option);
				//				console.log(vm.option);
				//血压图标数据渲染--end	
				vm.currentChartRender = vm.bloodPressureChartRender;
			},
			SpO2() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血氧图标数据渲染--head
				//				vm.option.series.map(function(item, index) {
				//					item.data = [];
				//				})
				let SpO2 = [],
					VS_HeartRate = [];
				vm.bloodOxygenRender.content.map(function(item, index) {
					SpO2.push(item[2]);
					VS_HeartRate.push(item[3])
				})
				vm.option.legend.data = option_bloodOxygen.legendData;
				SpO2.unshift('');
				VS_HeartRate.unshift('');
				//				console.log(VS_HeartRate)
				var arr2 = [{
						name: '血氧',
						type: 'line',
						symbol: 'circle',
						symbolSize: 8,
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#FFBE96'
								}
							}
						},
						data: SpO2
					},
					{
						name: '脉率',
						type: 'line',
						symbol: 'circle',
						symbolSize: 8,
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#48D1E5'
								}
							}
						},
						data: VS_HeartRate
					}
				];
				var _option = {
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
						data: [{
							name: '血氧',
							textStyle: {
								color: '#FFBE96'
							}
						}, {
							name: '脉率',
							textStyle: {
								color: '#48D1E5'
							}
						}]
					},
					grid: {
						left: '1.5%',
						right: '4%',
						bottom: '8%',
						containLabel: true
					},
					toolbox: {},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['', '1', '2', '3', '4', '5', '6', '7'],
						offset: 0

					},
					yAxis: {
						type: 'value',
						axisLine: { //y轴刻度线
							show: false
						}
					},
					series: arr2
				}
				//				vm.option.series[0].data = SpO2;
				//				vm.option.series[1].data = VS_HeartRate;
				//vm.option.series = arr2;
				myChart.clear();
				myChart.setOption(_option);
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
				myChart.clear();
				myChart.setOption(vm.option);
				//				console.log(vm.option)
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
				myChart.clear();
				myChart.setOption(vm.option);
				//           console.log(vm.option.series)
				//血氧图标数据渲染--end
				vm.currentChartRender = vm.tempChartRender;
			},
			Bmi() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血氧图标数据渲染--head
				vm.option.series.map(function(item, index) {
					item.data = [];
				})
				let bmi = [];
				vm.bmiRender.content.map(function(item, index) {
					bmi.push(item[4]);
				})

				bmi.unshift('');

				vm.option.legend.data = option_Bmi.legendData;
				vm.option.series = option_Bmi.series;
				vm.option.series[0].data = bmi;
				myChart.clear();
				myChart.setOption(vm.option);
				//           console.log(vm.option.series)
				//血氧图标数据渲染--end
				vm.currentChartRender = vm.bmiRender;
			},
			bloodFat() {
				let vm = this;
				vm.isChart = true
				var myChart = echarts.init(document.getElementById('mycharts'));
				//血脂图标数据渲染--head
				vm.option.series.map(function(item, index) {
					item.data = [];
				})
				let totalcholestrol = [],
					triglyceride = [],
					high_density_lipoprotein_cholesterol = [],
					low_density_lipoproten_cholesterol = [];
				vm.bloodFatRender.content.map(function(item, index) {
					totalcholestrol.push(item[2]);
					triglyceride.push(item[3]);
					high_density_lipoprotein_cholesterol.push(item[4]);
					low_density_lipoproten_cholesterol.push(item[5]);
				})

				totalcholestrol.unshift('');
				triglyceride.unshift('');
				high_density_lipoprotein_cholesterol.unshift('');
				low_density_lipoproten_cholesterol.unshift('');

				vm.option.legend.data = option_bloodFat.legendData;
				vm.option.series = option_bloodFat.series;
				vm.option.series[0].data = totalcholestrol;
				vm.option.series[1].data = triglyceride;
				vm.option.series[2].data = high_density_lipoprotein_cholesterol;
				vm.option.series[3].data = low_density_lipoproten_cholesterol;
				myChart.clear();
				myChart.setOption(vm.option);
				//console.log(vm.option.series)
				//血脂图标数据渲染--end
				vm.currentChartRender = vm.bloodFatRender;

			}
		},
		components: {
			headline,
			headTop
		},
		created() {
			var vm = this;
			//如果快速体检进来，返回时要保留状态返回开始
			if(getURLParameter("rapidindex") !== null) {
				var historylist = sessionStorage.getItem('historyUrl').split(',')
				var rapidurl = historylist[historylist.length - 2]
				if(rapidurl.includes('rapidindex')) {
					rapidurl = rapidurl.replace(/(rapidindex=)(\d*)/, '$1' + getURLParameter("rapidindex")).replace(/(status=)(\d*)/, '$1' + getURLParameter("status"))

				} else {
					rapidurl = rapidurl + '&rapidindex=' + getURLParameter("rapidindex") + '&status=' + getURLParameter("status")
				}
				historylist.splice(historylist.length - 2, 1, rapidurl)
				sessionStorage.setItem('historyUrl', historylist.toString())
			}

			//如果快速体检进来，返回时要保留状态返回结束

			var personId = getURLParameter('personId');
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
				vm.bloodPressureChart.content = data.result;
				let bloodPressureChart = vm.bloodPressureChart;
				let content = [];
				bloodPressureChart.content.map(function(item, index) {
					if(!!item.value1) {
						content.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.value1, item.value2, item.value3, item.value4])
					} else {

					}

				})
				vm.bloodPressureChartRender.content = content;

				let bloodFatChart = data.bloodFatList;
				let content2 = [];
				bloodFatChart.map(function(item, index) {
					//					if(!!item.cholesterin&&!!item.triglyceride&&!!item.chdl&&!!item.cldl){
					if(true) {
						content2.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.cholesterin, item.triglyceride, item.chdl, item.cldl])
					}
				})
				vm.bloodFatRender.content = content2;
				//				console.log(vm.bloodFatRender.content);

				let urineChart = data.urineList;
				let content3 = [];
				urineChart.map(function(item, index) {
					//					if(!!item.cholesterin&&!!item.triglyceride&&!!item.chdl&&!!item.cldl){
					if(true) {
						content3.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.warning.replace(/；/g, ';'), '', ''])
					}
				})
				vm.urineRender.content = content3;
				vm.urineSingleRender = urineChart;
				//				console.log(vm.urineRender.content);
			})
			//血压数据--end
			//血氧数据--head
			getSingleHistoryRecord(params_SpO2).then(function(data) {
				let SpO2 = [];
				data.result.map(function(item, index) {
					if(!!item.SpO2) {
						SpO2.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.SpO2, item.VS_HeartRate]);
					} else {

					}

				})
				vm.bloodOxygenRender.content = SpO2;
			})
			//血氧数据--end
			//血糖数据--head
			getSingleHistoryRecord(params_Glu).then(function(data) {
				let Glu = [];
				data.result.map(function(item, index) {
					if(!!item.Glu) {
						Glu.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.Glu, item.GluState]);
					} else {

					}

				})
				vm.bloodSugarChartRender.content = Glu;
			})
			//血糖数据--end
			//体温数据和BMI数据--head
			getSingleHistoryRecord(params_Temperature).then(function(data) {
				let Temperature = [],
					Bmi = [];
				data.result.map(function(item, index) {
					if(!!item.Temperature) {
						Temperature.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.Temperature]);
					} else {

					}

				})
				data.bmiList.map(function(item, index) {
					if(!!item.bmi) {
						Bmi.push([index + 1, new Date(item.detectionTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.detectionTime).toTimeString().substr(0, 5), item.bmiHeight, item.bmiWeight, item.bmi]);
					} else {

					}

				})
				vm.tempChartRender.content = Temperature;
				vm.bmiRender.content = Bmi;
				//从result页面进来处理rapidindex--head
				getURLParameter("rapidindex") ? vm.tabCurrentIndex = parseInt(getURLParameter("rapidindex")) : vm.tabCurrentIndex = 0;
				let Event = {
					target: {
						dataset: {}
					}
				}
				Event.target.dataset.index = vm.tabCurrentIndex + '';
				vm.changeTab(Event);
				console.log(Event);
				//从result页面进来处理rapidindex--end
			})
			//体温数据和BMI数据--end
			//心电数据--head
			getSingleHistoryRecord(params_ecg).then(function(data) {
				vm.hideLoading()
				let ecg = [];
				data.ecgs.map(function(item, index) {
//					ecg.push([index + 1, new Date(item.examFinishTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.examFinishTime).toTimeString().substr(0, 5), item.conclusion, item.status, item.ReportUrl]);
					
					ecg.push([index + 1, new Date(item.examFinishTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.examFinishTime).toTimeString().substr(0, 5), item.conclusion, !item.assistDiagnosisStatus?'':item.assistDiagnosisStatus=='Read'?'已协诊':'请求协诊中', item.ReportUrl, vm.ecgactive]);
				})
				vm.ecgRender.content = ecg;
				vm.ecgarr=data.ecgs
			})
			//心电数据--end
			Viewer.setDefaults({
				Options: vm.Options
			});
		},
		mounted() {
			let vm = this;
			vm.showLoading()

		}
	}
</script>

<style lang="scss" scoped type="text/css">
	body {
		overflow: hidden;
	}
	
	.headTop {
		width: 100vw !important;
		margin-left: -240px !important;
		position: relative;
		z-index: 19;
	}
	
	#historyRecord {
		width: calc(100vw - 200px);
		margin-left: 200px;
		/*height: 55.7vw;*/
		overflow: hidden;
		overflow-x: auto;
	}
	
	#historyRecord /deep/ .head {
		top: 1.5%;
		left: calc(15.5% + 200px);
		height: 5%;
	}
	
	#historyRecord /deep/ .head .back {
		top: 0 !important;
	}
	
	.hospital-list {
		width: 14.8vw;
		display: inline-block;
		position: relative;
		border-right: solid 1px rgba(151, 151, 151, .3);
		/*top: 80px;*/
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
			/*height: 55.4vw;*/
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
		width: calc(100% - 16.8vw - 35px);
		height: 52.7vw;
		position: relative;
		top: 5vw;
		vertical-align: top;
		display: inline-block;
		margin-left: 30px;
		overflow-y: scroll;
		overflow-x: hidden;
		.history-data-content-data-table-detail {
			.history-data-content-data-table-detail-data-table {
				width: 100%;
				height: 30vw;
				#mycharts {
					width: 61vw;
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
				width: 94.6%;
				margin: 0 auto;
				th {
					padding: 0 .30rem;
					line-height: .7rem;
					background-color: #f5faff;
					font-size: .20rem;
				}
				th:nth-child(2) {
					padding: 0 .4rem;
				}
				td {
					text-align: center;
					line-height: .5rem;
					font-size: .22rem;
				}
			}
			/*不同table的样式上修改--head*/
			.Glu {
				table {
					th {
						padding: 0 0.85rem;
					}
				}
			}
			.SpO2 {
				table {
					tr {
						th {
							padding: 0 0.85rem;
						}
					}
				}
			}
			.Temperature {
				table {
					th {
						padding: 0 1.45rem;
					}
				}
			}
			/*不同table的样式上修改--end*/
		}
	}
	
	.ecg-body {
		width: calc(100% - 15.3vw);
		height: 50vw;
		position: relative;
		top: 5vw;
		vertical-align: top;
		display: inline-block;
		overflow-y: scroll;
		padding-left: 30px;
		box-sizing: border-box;
		padding-right: 30px;
		table {
			display: block;
			width: calc(100% - 30px);
			position: absolute;
			/*top: 46%;
			left: 50%;
			transform: translate(-50%, -50%);*/
			th {
				padding: 0 .12rem;
				line-height: 70px;
				background-color: #f5faff;
				font-size: .25rem;
			}
			th:nth-child(2) {
				padding: 0 .70rem;
			}
			th:nth-child(3) {
				padding: 0 1.20rem;
			}
			td {
				text-align: center;
				line-height: .5rem;
				font-size: .25rem;
			}
			&>tr>td:nth-child(3) {
				max-width: 3rem;
				overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
			}
		}
		.line {
			line-height: 0.73rem;
			border-bottom: 1px solid #eee;
			display: flex;
			font-size: 0.24rem;
			.item {
				display: inline-flex;
				width: 24%;
				div {
					color: #666;
				}
			}
			&>div:first-child {
				flex-grow: 2;
			}
			&>div:nth-child(2) {
				flex-grow: 2;
			}
		}
		.lines {
			/*width: calc(100% - 2rem);*/
		}
		
		.ecg-pic {
			position: relative;
			img {
				width: 100%;
				height: 100%;
			}
			div.ecg-back {
				display: block;
				margin: 0vw auto;
				width: 14vw;
				height: 6.7vh;
				text-align: center;
				font-size: 30px;
				line-height: 6.7vh;
				color: white;
				background-color: #3C9BFF;
				border-radius: 15px;
			}
			.comment {
				width: 100%;
				color: #333;
				margin: 0.3rem 0;
				box-shadow: rgba(0, 0, 0, .2) 0 5px 20px;
				padding: 0 21px;
				box-sizing: border-box;
				.result {
					font-size: 20px;
					border-bottom: 1px solid #eee;
					padding: 0.25rem 0;
				}
				.sign {
					font-size: 18px;
					line-height: 0.8rem;
					text-align: right;
					padding-right: 0.2rem;
				}
			}
			.view {
				background-color: white;
				width: 100%;
				height: calc(100% - 2.49rem);
				/*margin-bottom: 0.6rem;*/
			}
			.view>img {
				width: 100%;
				height: 100%;
			}
		}
		.ecg-back {
			margin-bottom: 5vw !important;
		}
		.active {
			color: #439FFF;
		}
		.inquery {
			color: #F1C296;
			visibility: hidden;
		}
	}
	
	.b {
		margin-top: 0.6rem;
		display: flex;
		align-items: center;
		flex-direction: column;
		.subtitle {
			background-color: rgba(60, 155, 255, 0.05);
			height: 0.6rem;
			width: 78.125%;
			p {
				display: inline-block;
				height: 0.6rem;
				line-height: 0.6rem;
				width: 32.8%;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 0.32rem;
				color: #333333;
				letter-spacing: 0;
				text-align: center;
			}
		}
		.common {
			width: 78.125%;
			height: 1.03rem;
			border-bottom: 1px solid #eee;
			&>div {
				vertical-align: top;
			}
			div {
				display: inline-block;
				height: 1.03rem;
				line-height: 1.03rem;
				width: 32.8%;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 0.32rem;
				font-weight: 600;
				color: #333333;
				letter-spacing: 0;
				.up {
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
				.ups {
					height: 0.5rem;
					display: inline-block;
					line-height: 0.42rem;
					color: #d43c33;
					vertical-align: middle;
				}
			}
		}
		.suggestion {
			width: 78.125%;
			background-color: rgba(60, 155, 255, 0.05);
			padding: 0.2rem 0.3rem;
			margin-top: 0.5rem;
			box-sizing: border-box;
			.tit {
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #333333;
				letter-spacing: 0;
				line-height: 0.38rem;
				text-align: left;
			}
			.cont {
				margin-top: 0.2rem;
				font-family: PingFangSC-Regular;
				font-size: 0.28rem;
				color: #333;
				letter-spacing: 0;
				text-align: justify;
				p {
					line-height: 0.4rem;
				}
			}
		}
	}
	
	.opacity0 {
		color: #f5faff;
	}
	
	#alert-win{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
    z-index: 11;
	}
	#alert-win .alert-shadow{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 11;
	}
	#alert-main {
		position: absolute;
		width:50%;
		top: 26%;
		left: 25%;
		border-radius: 0.4rem;
		box-shadow: 0 .24rem .48rem 0 rgba(0,0,0,.3);
		background: #fff;
		z-index: 11;
		text-align: center;
	}
	.alert-title, #alert-footer{
		line-height: 1.6;
		text-align: center;
		font-size: 0.44rem;
	}
	.alert-title{
		border-bottom: 1px solid #ddd;
		line-height: 2.4;
	}
	.alert-text{
		text-align: left;
		display: inline-block;
		padding: .5rem .2rem;
		font-family: PingFangSC-Regular;
		font-size: .4rem;
		color: #666666;
		letter-spacing: 0;
		line-height: .4rem;
		img{
			width: 0.4rem;
			height: 0.4rem;
			vertical-align: middle;
			margin-right: 0.2rem;
		}
	}
	#alert-footer{
		color: #3c9bff;
		border-top: 1px solid #ddd;
		height: 1.06rem;
		line-height: 1.06rem;
	}
	.alert-button-group{
		border-top: 1px solid #ddd;
	}
	.alert-button-group span{
		display: inline-block;
		width: 48%;
		line-height: 1.05rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: .4rem;
		letter-spacing: 0;
	}
	.alert-button-group #alert-button-left{
		border-right: 1px solid #ddd;
	}
</style>