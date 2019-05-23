<template>
	<div class="mededit">
		<div class="title">家族史</div>
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
		<div class="title">遗传病史</div>
		<div class="content">
			<div class="describe" @click="heritab"><span>遗传病</span><span class="tap" :data-index='0' :class="{on:heriindex==0}">无</span><span class="tap"  :data-index="1"  :class="{on:heriindex==1}">有</span></div>
			<div class="describe"><span>疾病名称</span><input class='big' v-model="geneticHistory" placeholder="请输入" type="text" /></div>
		</div>
	</div>
</template>

<script>
	import vue from 'Vue'
	import { queryPersonalRecord } from 'API/requst'
	export default {
		data() {
			return {
				troublelist: ['高血压', '糖尿病', '冠心病', '慢阻肺', '恶性肿瘤', '脑卒中', '重症精神病', '结核病', '肝炎', '先天畸形', '其他'],
				relations: ["父亲", '母亲', '兄弟姐妹', "子女"],
				heriindex: 0,
				geneticHistory:'',
				records:{},
				personUniqueId:'',
				personDocumentId:'',
				familyHistory:''
			}
		},
		components: {},
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
			heritab(e) {
				var index=e.target.dataset.index
			
				this.heriindex=index
			},
			translate(){
				
			},
			update(){
				var self = this;
				var info = {
					medicalAdditionalInfo: {
						familyHistory: {
							geneticHistoryExist:'',
						    geneticHistory:[],
						    list:[]
						},
						
						
					}
				}
				info.personUniqueId = this.personUniqueId
				info.personDocumentId = this.personDocumentId
			var	familyHistory = JSON.parse(JSON.stringify(this.troublelist))
			for(var i = 0; i < this.troublelist.length; i++) {
					for(var k = 0; k < 4; k++) {
						familyHistory[i].value.splice(k, 1, {
							"status": familyHistory[i].value[k].toString(),
							"name": this.relations[k]
						})
					}
				}
			info.medicalAdditionalInfo.familyHistory.list=familyHistory
			info.medicalAdditionalInfo.familyHistory.geneticHistoryExist=self.heriindex
			info.medicalAdditionalInfo.familyHistory.geneticHistory.push(self.geneticHistory)
//			sessionStorage.setItem('temp',JSON.stringify(info))
			this.updaterecord({
					personalRecord: info,
					personId: sessionStorage.getItem('personId')
				})
			}
		},
		watch:{
			records: {
				handler(cur, pre) {
					var self = this
					this.personUniqueId = cur.personUniqueId;
					this.personDocumentId = cur.personDocumentId;
					this.familyHistory = cur.medicalAdditionalInfo && cur.medicalAdditionalInfo.familyHistory
//					this.familyHistory = JSON.parse(sessionStorage.getItem('temp')).medicalAdditionalInfo.familyHistory
					if(this.familyHistory){
						this.heriindex=this.familyHistory.geneticHistoryExist
					    this.geneticHistory=this.familyHistory.geneticHistory&&this.familyHistory.geneticHistory[0]
					    var arr = [];
					    var list=this.familyHistory.list
					    for(var i = 0; i < list.length; i++) {
					    	var value=[]
					    	list[i].value.forEach(function(item){
					    		value.push(item.status==='true'?true:false)
					    	})
							arr.push({
								name: ['高血压', '糖尿病', '冠心病', '慢阻肺', '恶性肿瘤', '脑卒中', '重症精神病', '结核病', '肝炎', '先天畸形', '其他'][i],
								value: value
							})
						}
					    for(var i=list.length;i<this.troublelist.length;i++){
					    	arr.push({
								name: ['高血压', '糖尿病', '冠心病', '慢阻肺', '恶性肿瘤', '脑卒中', '重症精神病', '结核病', '肝炎', '先天畸形', '其他'][i],
								value: [false,false,false,false]
							})
					    }
						this.troublelist.splice(0, this.troublelist.length, ...arr)
					}else{
						var arr = [];
						for(var i = 0; i < this.troublelist.length; i++) {
							arr.push({
								name: ['高血压', '糖尿病', '冠心病', '慢阻肺', '恶性肿瘤', '脑卒中', '重症精神病', '结核病', '肝炎', '先天畸形', '其他'][i],
								value: [false, false, false, false]
							})
						}
						this.troublelist.splice(0, this.troublelist.length, ...arr)
						
						
					}
					
				},
				deep: true
			},
		},
		created() {
			this.queryrecord()
		}
	}
</script>

<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.mededit {
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
		.detail {
			margin-bottom: 0.4rem;
			.item {
				display: flex;
				line-height: 0.84rem;
				border-bottom: 1px solid #eee;
				padding-left: 0.3rem;
				&>div {
					width: 15vw;
				}
				img {
					width: 0.5rem;
					height: 0.5rem;
					vertical-align: middle;
				}
			}
		}
	}
	
	.content {
		margin-top: 0.3rem;
		.describe {
			margin-bottom: 0.2rem;
			span {
				display: inline-block;
			}
			span:first-child {
				width: 1.3rem;
				margin-right: 0.3rem;
			}
			span:nth-child(3) {
				margin-right: 0.3rem;
			}
			.big {
				margin-right: 0.5rem;
				font-size: 0.3rem;
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
</style>