<template>
	<div class="hisedit">
		<div class="title">疾病类型</div>
		<hismodel :pastHistory=pastHistory></hismodel>
		<div class="title">手术</div>
		<div class="content">
			<div class="describe" data-index='0' @click="tap"><span>手术</span><span class="tap" :class="{on:taplist[0]=='无'}">无</span><span class="tap" :class="{on:taplist[0]=='有'}">有</span></div>
			<div class="describe"><span>名称</span><input class='big' v-model="exp0" placeholder="请输入" type="text" /><span>时间</span>
				<date-picker class='picker' :date="mixarr[0]" :option="option" :limit="limit"></date-picker>
			</div>
			<div class="describe"><span>名称</span><input class='big' v-model="exp1" placeholder="请输入" type="text" /><span>时间</span>
				<date-picker class='picker' :date="mixarr[1]" :option="option" :limit="limit"></date-picker>
			</div>
		</div>
		<div class="title">外伤</div>
		<div class="content">
			<div class="describe" data-index='1' @click="tap"><span>外伤</span><span class="tap" :class="{on:taplist[1]=='无'}">无</span><span class="tap" :class="{on:taplist[1]=='有'}">有</span></div>
			<div class="describe"><span>名称</span><input class='big' v-model="exp2" placeholder="请输入" type="text" /><span>时间</span>
				<date-picker class='picker' :date="mixarr[2]" :option="option" :limit="limit"></date-picker>
			</div>
			<div class="describe"><span>名称</span><input class='big' v-model="exp3" placeholder="请输入" type="text" /><span>时间</span>
				<date-picker class='picker' :date="mixarr[3]" :option="option" :limit="limit"></date-picker>
			</div>
		</div>
		<div class="title">输血</div>
		<div class="content">
			<div class="describe" data-index='2' @click="tap"><span>输血</span><span class="tap" :class="{on:taplist[2]=='无'}">无</span><span class="tap" :class="{on:taplist[2]=='有'}">有</span></div>
			<div class="describe"><span>原因</span><input class='big' v-model="exp4" placeholder="请输入" type="text" /><span>时间</span>
				<date-picker class='picker' :date="mixarr[4]" :option="option" :limit="limit"></date-picker>
			</div>
			<div class="describe"><span>原因</span><input class='big' v-model="exp5" placeholder="请输入" type="text" /><span>时间</span>
				<date-picker class='picker' :date="mixarr[5]" :option="option" :limit="limit"></date-picker>
			</div>
		</div>
	</div>
</template>

<script>
	import hismodel from 'components/stuff/hismodel'
	import dateinput from 'components/stuff/dateinput'
	import { queryPersonalRecord } from 'API/requst'
	export default {
		data() {
			return {
				taplist: ['无', '无', '无'],
				pastHistory: null,
				personUniqueId: '',
				personDocumentId: '',
				startTimearr: [],
				listarr: [],
				troublelist: ['高血压', "重性精神病", '糖尿病', '结核病', '冠心病', '肝炎',
					'慢阻肺', '其他传染病', '恶性肿瘤', '职业病', '脑卒中', '其他'
				],
				mixarr: [],
				exp0: '',
				exp1: '',
				exp2: '',
				exp3: '',
				exp4: '',
				exp5: '',
				records: {}

			}
		},
		mixins: [dateinput],
		inject: ['updaterecord'],
		methods: {
			queryrecord() {
				var self = this;
				queryPersonalRecord({
					personId: sessionStorage.getItem('personId')
				}).then(function(res) {
					self.records = res.result
				})
			},
			tap(e) {
				var index = e.currentTarget.dataset['index']
				console.log(index, e.target.innerText)
				if(e.target.innerText === '有') {
					this.$set(this.taplist, index, '有')
				} else if(e.target.innerText === '无') {
					this.$set(this.taplist, index, '无')
				}
			},
			update() {
				var self = this;
				var info = {
					medicalAdditionalInfo: {
						pastHistory: {
							diseaseList: [],
							surgeryExist: '',
							surgeryList: [],
							traumaExist: '',
							traumaList: [],
							bloodTransfusionExist: '',
							bloodTransfusionList: []
						}
					}
				}
				info.personUniqueId = this.personUniqueId
				info.personDocumentId = this.personDocumentId
				var diseaseList = []
				for(var i = 0; i < this.listarr.length; i++) {
					if(this.listarr[i]) {
						diseaseList.push({
							name: this.troublelist[i],
							time: this.startTimearr[i].time
						})
					}
				}
				var pastHistory = info.medicalAdditionalInfo.pastHistory
				pastHistory.diseaseList = diseaseList //疾病
				pastHistory.surgeryExist = this.taplist[0]
				pastHistory.traumaExist = this.taplist[1]
				pastHistory.bloodTransfusionExist = this.taplist[2]
				for(var i = 0; i < 6; i++) {
					if(i == 0 || i == 1) {
						pastHistory.surgeryList.push({
							name: this["exp" + i],
							time: this.mixarr[i].time
						})
					} else if(i == 2 || i == 3) {
						pastHistory.traumaList.push({
							name: this["exp" + i],
							time: this.mixarr[i].time
						})
					} else {
						pastHistory.bloodTransfusionList.push({
							name: this["exp" + i],
							time: this.mixarr[i].time
						})
					}
				}
				this.updaterecord({
					personalRecord: info,
					personId: sessionStorage.getItem('personId')
				})
			},
		},
		components: {
			hismodel
		},
		watch: {
			records: {
				handler(cur, pre) {
					var self = this
					this.personUniqueId = cur.personUniqueId;
					this.personDocumentId = cur.personDocumentId;
					this.pastHistory = cur.medicalAdditionalInfo && cur.medicalAdditionalInfo.pastHistory

				},
				deep: true
			},
			pastHistory: {
				handler(cur) {
					this.taplist = []
					var self = this
					self.taplist.push(cur.surgeryExist, cur.traumaExist, cur.bloodTransfusionExist)
					if(cur.surgeryList || cur.traumaList || cur.bloodTransfusionList) {
						self["mixarr"] = []
						if(cur.surgeryList) {
							cur.surgeryList.forEach(function(item, index) {
								self['exp' + index] = item.name
								self["mixarr"].push({
									time: item.time
								})
							})
						} else {
							self["mixarr"].push({
								time: item.time
							}, {
								time: item.time
							})
						}
						if(cur.traumaList) {
							cur.traumaList.forEach(function(item, index) {
								index = index + 2
								self['exp' + index] = item.name
								self["mixarr"].push({
									time: item.time
								})
							})
						} else {
							self["mixarr"].push({
								time: item.time
							}, {
								time: item.time
							})
						}

						if(cur.bloodTransfusionList) {

							cur.bloodTransfusionList.forEach(function(item, index) {
								index = index + 4
								self['exp' + index] = item.name
								self["mixarr"].push({
									time: item.time
								})
							})
						} else {
							self["mixarr"].push({
								time: item.time
							}, {
								time: item.time
							})
						}
					}

				},
				deep: true
			}
		},
		created() {
			for(var i = 0; i < 6; i++) {
				this.mixarr.push({
					time: ''
				})
			}
			this.queryrecord()

		},
		activated() {

		},
	}
</script>

<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.hisedit {
		width: 100%;
		padding: 0.4rem;
		font-size: 0.3rem;
		height: calc(100% - 0.95rem);
		overflow: scroll;
		&>.title {
			width: 1.7rem;
			line-height: 0.5rem;
			background: rgba(60, 155, 255, 0.10);
			border-radius: 0.33rem;
			color: #3C9BFF;
			text-align: center;
		}
		.content {
			margin-top: 0.3rem;
			.picker /deep/ .cov-datepicker {
				border-radius: 0.12rem !important;
				font-size: 0.28rem !important;
			}
			.describe {
				margin-bottom: 0.2rem;
				span {
					display: inline-block;
				}
				span:first-child,
				span:nth-child(3) {
					margin-right: 0.3rem;
				}
				.big {
					margin-right: 0.5rem;
					font-size: 0.3rem !important;
				}
				.tap {
					width: 1.6rem;
					line-height: 0.6rem;
					border: 2px solid #3C9BFF;
					border-radius: 12px;
					color: #3C9BFF;
					text-align: center;
					margin-right: 0.3rem;
				}
				.tap.on {
					background: #3C9BFF;
					border-radius: 12px;
					color: #fff;
				}
			}
		}
	}
</style>