<template>

	<div id="coat">
		<headTop />
		<div class="fornative">
			<temp headtxt="个人信息"></temp>
			<div class="main">
				<div class="histitle">家族史</div>
				<div class="detail">
					<div class="item">
						<div> </div>
						<div>父亲</div>
						<div>母亲</div>
						<div>兄弟姐妹</div>
						<div>子女</div>
					</div>
					<div class="item" v-for="(item,index) in troublelist">
						<div>{{item.name}}</div>
						<div v-for="(coreitem,coreindex) in item.value">
							<img v-on:click="confirm($event)" :data-relation=coreindex :data-line=index v-if="!item.value[coreindex]" src="../../../assets/notyet.png" />
							<img v-on:click="cancel($event)" v-if="item.value[coreindex]" :data-relation=coreindex :data-line=index src="../../../assets/already.png" />
						</div>
					</div>
				</div>
			</div>
			<btn class='next' @click.native="save" fragment="保存"></btn>
			<div class="manu" style="display: none;">
				跳过
			</div>
		</div>
	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	import headTop from "components/common/headTop.vue";
	import { getURLParameter } from "utils/util";
	import vue from 'Vue'
	import { saveFileEstablishment, queryPersonalRecord } from "API/requst"
	export default {

		name: 'sibhis',
		components: {
			temp,
			btn,
			headTop,
		},
		data() {
			return {
				troublelist: ['高血压', '糖尿病', '冠心病', '慢阻肺', '恶性肿瘤', '脑卒中'],
				status: true,
				relations: ["父亲", '母亲', '兄弟姐妹', "子女"]
			}
		},
		methods: {
			confirm(e) {
				var relation = e.target.dataset["relation"]
				var line = e.target.dataset['line']
				vue.set(this.troublelist[line].value, relation, true)
			},
			cancel(e) {
				var relation = e.target.dataset["relation"]
				var line = e.target.dataset['line']
				vue.set(this.troublelist[line].value, relation, false)
			},
			save() {
				var self = this
				var familyHistory = []
				familyHistory = JSON.parse(JSON.stringify(this.troublelist))
				Object.freeze(this.troublelist)
				for(var i = 0; i < 6; i++) {
					for(var k = 0; k < 4; k++) {
						familyHistory[i].value.splice(k, 1, {
							"status": familyHistory[i].value[k].toString(),
							"name": this.relations[k]
						})
					}
				}
				var medicalHistory = JSON.parse(sessionStorage.getItem('medicalHistory'))
				var FileEstablishment = JSON.parse(sessionStorage.getItem('FileEstablishment'))
				Object.assign(FileEstablishment, {
					"medicalHistory": medicalHistory
				}, {
					"familyHistory": familyHistory
				})
				//  console.log(FileEstablishment)
				saveFileEstablishment(FileEstablishment).then(function(res) {
					sessionStorage.removeItem('medicalHistory');
					sessionStorage.removeItem('FileEstablishment');
					if(self.type == 'switch') {
						window.location.href = '../remoteclinic/affirmexpert.html?personId=' + res.personId + '&did=' + self.did + '&scid=' + self.scid + '&type=info';
					} else {
						window.android ? window.android.getPersonInfo(res.personId) : ""
						window.location.href = '../main/index.html?personId=' + res.personId + '&index=0';
					}
				}, err => {
					self.alertDefault({
						text: err.data.resultMessage,
						rowButton: false,
						leftButtonText: '取消',
						rightButtonText: '确定'
					})
				})
			},
		},
		created() {
			var vm = this;
			var type = getURLParameter('type');
			var scid = getURLParameter('scid');
			var did = getURLParameter('did');
			vm.type = type;
			vm.scid = scid;
			vm.did = did;
			var arr = [];
			var personId = sessionStorage.getItem('personId');
			
			if(personId&&type=='edit') {
				var obj = {
					"personId": personId
				}
				queryPersonalRecord(obj).then(res => {
					if(res.result.medicalAdditionalInfo&&res.result.medicalAdditionalInfo.familyHistory){
						var list = res.result.medicalAdditionalInfo.familyHistory.list
						for(var i = 0; i < list.length; i++) {
							var value = []
							for(var j = 0; j < list[i].value.length; j++) {
								value.push(list[i].value[j].status==='true')
							}
							
							arr.push({
								name: list[i].name,
								value: value
							})
						}
						vm.troublelist.splice(0, 6, ...arr)
					}else{
						for(var i = 0; i < this.troublelist.length; i++) {
							arr.push({
								name: this.troublelist[i],
								value: [false, false, false, false]
							})
						}
						this.troublelist.splice(0, 6, ...arr)
					}
				});
			} else {
				for(var i = 0; i < this.troublelist.length; i++) {
					arr.push({
						name: this.troublelist[i],
						value: [false, false, false, false]
					})
				}
				this.troublelist.splice(0, 6, ...arr)
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
	
	#coat /deep/ .head {
		/*top: 1rem !important;*/
	}
	
	.main {
		display: flex;
		margin-top: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		font-size: 0.32rem;
		.histitle {
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.2rem;
			width: 100%;
		}
		.detail {
			.item {
				display: flex;
				line-height: 0.84rem;
				border-bottom: 1px solid #eee;
				&>div {
					width: 15vw;
					text-align: center;
				}
				img {
					width: 0.6rem;
					height: 0.6rem;
					vertical-align: middle;
				}
			}
		}
	}
	
	.next {
		/*position: absolute;*/
		bottom: 0.6rem;
		left: 200px;
		right: 0;
		margin: auto;
		margin-top: 0.6rem;
		margin-bottom: 0.6rem;
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
		bottom: 0.3rem;
	}
</style>