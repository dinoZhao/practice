<template>
		<div id="coat">
		<div class="main">
			<!-- <div class="histitle">既往病史</div> -->
			<div class="detail">
				<div class="item" v-for="(item, index) in medicalHistory" v-bind:class="{on:item.status}">
					<img :data-index='index'  v-if="item.status==='false'" src="../../assets/notyet.png" />
					<img :data-index='index'  v-else src="../../assets/already.png" />
					<span>{{item.name}}</span>
					<div class="date-confirmed" v-show="item.value!=''?true:false">{{item.value}}</div>
					<!--<date-picker v-if="medicalHistory[status]" class='picker' :date="startTimearr[index]" :option="option" :limit="limit"></date-picker>-->
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import vue from 'Vue'
	export default {
		props:['medicalHistory'],
		name: 'medhis',
		components: {
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
					placeholder: '请选择',
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
						ok: 'Ok',
						cancel: 'Cancel'
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
						to: '2020-02-20'
					}
				],
				listarr: []

			}
		},
		methods: {

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
		margin-top: 0.6vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		.histitle {
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.2rem;
			width: 100%;
			height: 1em;
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
			height: 0.8rem;
			width: 28vw;
			display: flex;
			align-items: center;
			span {
				display: inline-block;
				width: 2rem;
			}
			img {
				width: 0.45rem;
				height: 0.45rem;
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
		border: 3px solid #FC9452;
		border-radius: 6px;
		text-align: center;
		line-height: 0.8rem;
		color: #FC9452;
		position: absolute;
		right: 0.8rem;
		bottom: 0.6rem;
	}
	.date-confirmed{
		border: 1px solid rgb(238, 238, 238);
		padding: 0.1rem 0.15rem;
		width: 17vw;
		position: relative;
		left: -2vw;
	}
</style>