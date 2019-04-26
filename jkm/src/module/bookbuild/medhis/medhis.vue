<template>

	<div id="coat">
		<temp headtxt="个人信息"></temp>
		<div class="main">
			<div class="histitle">既往病史</div>
			<div class="detail">

				<div class="item" v-for="(item, index) in troublelist" v-bind:class="{on:listarr[0]}">
					<img :data-index='index' @click="confirm($event)" v-if="!listarr[index]" src="../../../assets/notyet.png" />
					<img :data-index='index' @click="cancel($event)" v-if="listarr[index]" src="../../../assets/already.png" />
					<span>{{item}}</span>
					<date-picker v-if="listarr[index]" class='picker' :date="startTimearr[index]" :option="option" :limit="limit"></date-picker>
				</div>

			</div>
		</div>
		<btn class='next' @click.native="next" fragment="下一步"></btn>
		<div @click="manu" class="manu">
			跳过
		</div>

	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	import myDatepicker from 'vue-datepicker'
	import {dateFormat} from 'utils/util'
	import vue from 'Vue'
	export default {

		name: 'medhis',
		components: {
			temp,
			btn,
			'date-picker': myDatepicker
		},
		data() {
			return {
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
		methods: {
			confirm(e) {

				vue.set(this.listarr, e.target.dataset['index'], true)
			},
			cancel(e) {

				vue.set(this.listarr, e.target.dataset['index'], false)
			},
			manu() {
				window.location.href = "./sibhis.html"
			},
			next() {
				var listarr = this.listarr;
				var troublelist = this.troublelist;
				var startTimearr = this.startTimearr
				var medicalHistory = []
				for(var i = 0; i < 12; i++) {

					medicalHistory.push({
						"name": troublelist[i],
						"value": listarr[i] ?startTimearr[i].time:'',
						"status": listarr[i] ? "true" : "false"
					})

				}
				sessionStorage.setItem("medicalHistory",JSON.stringify(medicalHistory))
				this.manu()
			}
		},
		created() {
			for(var i = 0; i < 12; i++) {
				this.listarr.push(false)
				this.startTimearr.push({
					time: ''
				})
			}
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped" lang="scss">
	#coat {
		overflow: hidden;
	}
	
	.main {
		display: flex;
		margin-top: 0.7rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		.histitle {
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.5rem;
			width: 100%;
		}
		.detail {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			justify-content: center;
			margin-top: 0.3rem;
		}
		.item {
			height: 0.9rem;
			width: 40vw;
			display: flex;
			align-items: center;
			span {
				display: inline-block;
				width: 1.6rem;
				font-size: 0.32rem;
			}
			img {
				width: 0.6rem;
				height: 0.6rem;
				margin-right: 0.3rem;
			}
			.picker {
				margin-left: 0.3rem;
			}
		}
	}
	
	.next {
		margin-left: 37%;
		position: absolute;
		bottom: 0.6rem;
	}
	
	.manu {
		width: 2.28rem;
		height: 0.8rem;
		font-size: 0.32rem;
		border: 0.02rem solid #FC9452;
		border-radius: 6px;
		text-align: center;
		line-height: 0.8rem;
		color: #FC9452;
		position: absolute;
		right: 0.8rem;
		bottom: 0.6rem;
	}
</style>