<template>

	<div id="coat">
		<temp v-bind:headtxt=title></temp>
		<div class="content">
			<div class="left" v-on:click='tab($event)'>
				<div class="info">
					<img :src="personinfo.headUrl?personinfo.headUrl:require('../../../assets/headUrl.png')" />
					<div class="detail">
						<div class="" style="color: #333;font-size: 0.32rem;">
							{{personinfo.patientName}}
						</div>
						<div class="" style="color: #999;font-size: 0.26rem;">
							{{personinfo.patientSex==1?"男":'女'}} {{personinfo.patientAge}}岁
						</div>
					</div>
				</div>
				<div class="item" v-bind:class="{ on:tablist[0]}">
					心电
					<img v-show="status[0]" :src="!status[0]?'':tablist[0]? require('../../../assets/complete_un.png'): require('../../../assets/complete_ed.png')" />
				</div>
				<div class="item" v-bind:class="{ on:tablist[1]}">
					血压
					<img  v-show="status[1]" :src="!status[1]?'':tablist[1]? require('../../../assets/complete_un.png'): require('../../../assets/complete_ed.png')" />
				</div>
				<div class="item" v-bind:class="{ on:tablist[2]}">
					血氧
					<img  v-show="status[2]" :src="!status[2]?'':tablist[2]? require('../../../assets/complete_un.png'): require('../../../assets/complete_ed.png')" />
				</div>
				<div class="item" v-bind:class="{ on:tablist[3]}">
					血糖
					<img v-show="status[3]" :src="!status[3]?'':tablist[3]? require('../../../assets/complete_un.png'): require('../../../assets/complete_ed.png')" />
				</div>
				<div class="item" v-bind:class="{ on:tablist[4]}">
					体温
					<img v-show="status[4]" :src="!status[4]?'':tablist[4]? require('../../../assets/complete_un.png'): require('../../../assets/complete_ed.png')" />
				</div>
				<div class="create" @click="report">
					查看报告
				</div>
			</div>
			<div class="right">
				<keep-alive>
					<component v-on:promote='next' :recordId='recordId' :personId='personId' v-on:nexttab="tab" :detact='detactresult' v-bind:is="mould"></component>
				</keep-alive>
			</div>
		</div>
	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	import temperature from './temperature.vue'
	import tempdemo from './tempdemo.vue'
	import pressure from './pressure.vue'
	import pressuredemo from './pressuredemo.vue'
	import oxygendemo from './oxygendemo.vue'
	import oxygen from './oxygen.vue'
	import sugar from './sugar.vue'
	import sugardemo from './sugardemo.vue'
	import ecg from './ecg.vue'
	import ecging from './ecging.vue'
	import ecgdemo from './ecgdemo.vue'
	import Vue from "vue"
	import { getSingleDetectionResult as getresult, readPatientMsg,updatePhysicalExamTime } from "API/requst"
	import { getURLParameter } from "utils/util"
	export default {

		name: 'result',
		components: {
			temp,
			btn,
			temperature,
			ecg,
			ecging,
			pressure,
			oxygen,
			sugar,
			ecgdemo,
			pressuredemo,
			oxygendemo,
			sugardemo,
			tempdemo
		},
		data() {
			return {
				//				mould: "ecg",
				tablist: [],
				title: '心电',
				statuslist: [
					['ecgdemo', "ecg"],
					['pressuredemo', "pressure"],
					['oxygendemo', 'oxygen'],
					["sugardemo", 'sugar'],
					['tempdemo', 'temperature']
				],
				status: [0, 0, 0, 0, 0],
				detactresult: {},
				recordId: '',
				personId: '',
				personinfo: ''

			}
		},
		created() {
			var tablist = []
			tablist.length = 5
			tablist.fill(false)
			tablist[0] = true
			this.tablist = tablist
			this.getresult()

			//		    页面传参
			var recordId = getURLParameter('recordId')
			var personId = getURLParameter('personId')
			this.recordId = recordId
			this.personId = personId

			this.getinfo()
		},
		provide: function() {
			return {
				getresult: this.getresult
			}
		},
		methods: {
			getresult() {
				var self = this;
				return getresult({
					"recordId": self.recordId
//										"recordId": '1258953856'
				}).then(function(res) {
					self.detactresult = res.result
					return res
				})
			},
			tab(e, betray) {

				var content;
				var tablist = []
				var prelist = this.tablist;
				tablist.length = 5
				tablist.fill(false)
				this.tablist = tablist
				if(betray) {
					content = e
				} else {
					content = e.target.innerText.replace(/\s+/g, "")
				}
				var itemlist = ["心电", "血压", "血氧", "血糖", "体温"]

				this.title = content;
				Vue.set(this.tablist, itemlist.findIndex(function(item) {
					return item == content
				}), true)

			},
			next(para) {
				Vue.set(this.status, para, 1)
			},
			report() {
				var self=this
				updatePhysicalExamTime({
					"recordId":this.recordId
				}).then(function(res){
					window.location.href = './report.html?recordId=' + self.recordId + '&personId=' + self.personId
				})
				
			},
			getinfo() {
				var self = this
				readPatientMsg({
					"padDeviceCode": "P1",
					"personId": self.personId
				}).then(function(res) {
					self.personinfo = res
				})
			}
		},

		computed: {
			mould: function() {
				var tabindex = this.tablist.findIndex(function(item) {
					return item === true
				})
				var stepindex = this.status[tabindex]
				return this.statuslist[tabindex][stepindex]

			}
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped" lang="scss">
	#coat {
		overflow: hidden;
		height: 100%;
	}
	
	.content {
		width: 100%;
		display: flex;
		min-height: 100%;
		height: 100%;
		.left {
			width: 20%;
			min-height: 100%;
			border-right: 1px solid #D9D9D9;
			display: inline-flex;
			flex-wrap: wrap;
			align-content: flex-start;
			height: 100%;
			overflow: scroll;
			padding-top:80px;
			.info {
				justify-content: center;
				width: 100%;
				display: inline-flex;
				height: 6.77vw;
				align-items: center;
				img {
					width: 0.9rem;
					height: 0.9rem;
					margin-right: 10px;
					border-radius: 0.9rem;
				}
				/*margin:0.2rem auto;*/
				.detail {
					display: inline-flex;
					flex-direction: column;
				}
			}
			.item {
				width: 100%;
				height: 5.2vw;
				line-height: 5.2vw;
				text-align: center;
				font-size: 0.32rem;
				position: relative;
				img {
					position: absolute;
					width: 0.44rem;
					right: 0.15rem;
					top: 0.25rem;
				}
			}
			.on {
				background: #3C9BFF;
				color: #fff;
			}
			.create {
				width: 80%;
				margin-left: 10%;
				line-height: 5.2vw;
				color: #FC9452;
				border-radius: 10px;
				border: 2px solid #FC9452;
				text-align: center;
				margin-top: 5.2vw;
				font-size: 0.4rem;
			}
		}
		.right {
			width: 80%;
			height: 100%;
			overflow: scroll;
			padding-top: 0.7rem;
		}
	}
	/*.ecgfur >>> .box{
		display: none;
	}*/
</style>