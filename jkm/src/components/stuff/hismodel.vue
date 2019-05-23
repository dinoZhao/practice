<template>
<div class="detail">
				<div class="item" v-for="(item, index) in troublelist" v-bind:class="{on:listarr[0]}">
					<img :data-index='index' @click="confirm($event)" v-if="!listarr[index]" src="~assets/notyet.png" />
					<img :data-index='index' @click="cancel($event)" v-if="listarr[index]" src="~assets/already.png" />
					<span>{{item}}</span>
					<date-picker v-if="listarr[index]" class='picker' :date="startTimearr[index]" :option="option" :limit="limit"></date-picker>
				</div>
			</div>
</template>

<script>
	import myDatepicker from 'vue-datepicker'
	import {dateFormat} from 'utils/util'
	import vue from 'Vue'
	export default{
		components: {
			'date-picker': myDatepicker
		},
		data:function(){
			return{
				troublelist: ['高血压', "重性精神病", '糖尿病', '结核病', '冠心病', '肝炎',
					'慢阻肺', '其他传染病', '恶性肿瘤', '职业病', '脑卒中', '其他'
				],
				notyet: '../../../assets/notyet.png',
				already: '../../../assets/already.png',
				status: true,
				startTimearr: [],
				option: {
					type: 'day',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					format: 'YYYY-MM-DD',
					placeholder: '请选择确诊时间',
					inputStyle: {
						'display': 'inline-block',
						'padding': '6px',
						'line-height': '22px',
						'font-size': '16px',
						'border': '1px solid #eee',
						'box-shadow': '0',
						'border-radius': '2px',
						'color': '#5F5F5F',
						'width': '20vw'
					},
					color: {
						header: '#ccc',
						headerText: '#f00'
					},
					buttons: {
						ok: '确定',
						cancel: '取消'
					},
					overlayOpacity: 0.5, // 0.5 as default
					dismissible: true // as true as default
				},
				timeoption: {
					type: 'min',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					format: 'YYYY-MM-DD HH:mm'
				},
				multiOption: {
					type: 'multi-day',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					format: "YYYY-MM-DD HH:mm"
				},
				limit: [{
						type: 'weekday',
						available: [0, 1, 2, 3, 4, 5, 6]
					},
					{
						type: 'fromto',
						from: '1949-01-01',
						to: dateFormat(Date.now()+86400000)
					}
				],
				listarr: []
			}
		},
		props:["pastHistory"],
		methods: {
			confirm(e) {
				vue.set(this.listarr, e.target.dataset['index'], true)
			},
			cancel(e) {
				vue.set(this.listarr, e.target.dataset['index'], false)
			},

		},
		created() {
	for(var i = 0; i < 12; i++) {
					this.listarr.push(false)
					this.startTimearr.push({
						time: ''
					})
				}
		},
		watch:{
			listarr(cur){
				this.$parent.listarr=cur
			},
			startTimearr(cur){
				this.$parent.startTimearr=cur
			},
			pastHistory(cur){
				var self=this
				console.log(555555)
//				疾病类型相关开始
				if(cur===null){
				
			     return
				}
				var diseasenamelist=[]
				var diseasetimelist=[]
				for(var i=0;i<cur.diseaseList.length;i++){
					diseasenamelist.push(cur.diseaseList[i].name)
					diseasetimelist.push(cur.diseaseList[i].time)
				}
				var troublelist=this.troublelist;
				var index1=0;
				this.startTimearr=[]
				this.listarr=troublelist.map(function(item,index){
					if(diseasenamelist.includes(item)){
						self.startTimearr.push({
					        time: diseasetimelist[index1]
				          })
						index1++
					}else{
							self.startTimearr.push({
					          time: ''
				         })
					}
					return diseasenamelist.includes(item)
				})
//				疾病类型相关结束
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
		.detail {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			margin-top: 0.3rem;
			margin-bottom: 0.3rem;
			& /deep/ .cov-datepicker {
				border-radius: 0.12rem !important;
				font-size: 0.25rem !important;
				    width: 160px!important;
			}
		}
		.item {
			height: 0.9rem;
			width: 43%;
			display: flex;
			align-items: center;
			span {
				display: inline-block;
				width: 1.6rem;
				font-size: 0.32rem;
				margin-right: 0.2rem;
			}
			img {
				width: 0.5rem;
				height: 0.5rem;
				margin-right: 0.3rem;
			}
			
		}
</style>