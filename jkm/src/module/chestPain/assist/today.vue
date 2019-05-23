<template>
	<div class="allin">
		<div class="content">
			<div class="detail"  v-for="(item,index) in result">
			<div class="item" >
				<div class="left">
					<img :src="item.nickUrl||headurl" />
					<div class="info" style="margin-right: 0.8rem;">
						<div class="name">{{item.name}}</div>
						<div style="color: #999;"><span>{{item.gender}}</span><span> {{item.age}}岁</span></div>
					</div>
					<span style="color: #999;margin-right: 0.2rem;">健康预警</span>
					<span style="margin-right: 0.6rem;width: 3rem;text-overflow: ellipsis;overflow: hidden;white-space:nowrap">{{item.healthWarning}}</span>
					<span  :data-index='index'  style="color: #3C9BFF;"   @click="check">{{status[index]?'收起病历':'查看病历'}}</span>
				</div>
				<div class="right" v-if="item.procedureType!='Healthy'&&item.procedureType!='AssistClinic'&&item.procedureType!='TransferHospital'">
					<div class="btn">
						<span @click="ensure(item.medicalRecordFolderId,index)">安全</span>
						<span @click="requestAssit(item.medicalRecordFolderId,index,item.personId)">协诊</span>
						<span @click="transfer(item.medicalRecordFolderId,index,item.personId)">转诊</span>
					</div>
				</div>
				<div class="right" v-else>
					<div class="tag">
						{{statusmap[item.procedureType]}}
					</div>
					<div :style="{visibility:item.procedureType=='Healthy'?'':'hidden'}" @click='statuschange(index)' class="modify">修改</div>
				</div>
			</div>
			<div class="qa" v-if="status[index]">
				     <div class="question">病理报告</div>
				     <div class="answer" @click="printpdf(item.reportLink)">
				     	<div class="report"><img src="../../../assets/orangectnl.png"/><span>报告</span></div>
				     </div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { getTodayExamList,updateTodayExam,getpdf } from "API/requst";
	import headurl from '../../../assets/headUrl.png'
	export default {
		data() {
			return {
				padDeviceCode: '', //padcode
				thirdUniqueId: '', //doctorid
				result: {},
				headurl,
				statusmap: {
					"Healthy": "安全",
					"AssistClinic": "协诊",
					"TransferHospital": "转诊",
				},
				status:[],
			}
		},
		methods: {
			check(e){
           		if(this.status[e.target.dataset['index']]){
           			this.$set(this.status,e.target.dataset['index'],false)
           		}else{
           			this.$set(this.status,e.target.dataset['index'],true)
           		}
           		
           	},
			printpdf(res){
				if(res){
					if(window.android){
		    			window.android.showPdf(res)
		    		}
				}else{
					this.showtoast('暂无记录')
				}
		    	
		    },
			requestAssit(id,index,personId) {
				var status = "AssistClinic"
				var self=this;
				self.$set(self.result[index],"procedureType",status)
				    window.location.href = './requestAssist.html?personId='+personId+'&recordId='+id
				    return
				updateTodayExam({
					medicalRecordFolderId: id,
					"procedureType": status
				}).then(function(res) {
					
				})
				
			},
			transfer(id,index,personId) {
				var status = "TransferHospital"
				var self=this;
					self.$set(self.result[index],"procedureType",status)
				    window.location.href = './ChestPainCenter.html?personId='+personId+'&recordId='+id
				    return
				updateTodayExam({
					medicalRecordFolderId: id,
					"procedureType": status
				}).then(function(res) {
					self.$set(self.result[index],"procedureType",status)
				    window.location.href = './ChestPainCenter.html?personId='+personId+'&recordId='+id
				})

			},
			ensure(id,index) {
				var status = "Healthy"
				var self=this;
				updateTodayExam({
					medicalRecordFolderId: id,
					"procedureType": status,
					thirdUniqueId:JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId
				}).then(function(res) {
					self.$set(self.result[index],"procedureType",status)
				})
			},
			statuschange(index){
				var self=this;
				self.$set(self.result[index],"procedureType",'')
			}
		},
		created(){
			
			var self = this;
			var padDeviceCode = this.padDeviceCode = sessionStorage.getItem('padcode')
			var thirdUniqueId = this.thirdUniqueId = JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId
			getTodayExamList({
				padDeviceCode,
				thirdUniqueId
			}).then((res) => {
				self.result = res.result
				var arr=[]
				for(var i=0;i<res.result.length;i++){
					arr.push(false)
				}
				self.status=arr
			})
		
		},
		activated() {}
	}
</script>

<style lang="scss" scoped="scoped">
	.allin {
		width: 100%;
		height: calc(100% - 0.9rem);
		overflow: scroll;
		margin-top: 0.9rem;
		padding-bottom: 0.2rem;
		.content {
			margin-top: 0.1rem;
			.detail{
				border-bottom: 1px solid #eee;
				.qa{
					padding: 0 0.4rem;
					width: 100%;
					.question{
						color: #999999;
						font-size: 0.28rem;
						margin-bottom: 0.1rem;
					}
					.answer{
						color: #333333;
						font-size: 0.28rem;
						margin-bottom: 0.1rem;
						display: flex;
						.report{
							color: #F59C31;
							margin-right: 0.2rem;
						}
						img{
							vertical-align: middle;
							width: 0.22rem;
							height: 0.25rem;
							margin-right: 0.1rem;
						}
						&>div{
							width: 2rem;
							line-height: 0.5rem;
							border: 1px solid #F59C31;
                             border-radius: 4px;
                             text-align: center;
                             font-size: 0.28rem;
						}
					}
				}
			}
			.item {
				height: 1.4rem;
				padding: 0 0.4rem;
				
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left {
					display: inline-flex;
					align-items: center;
					img {
						width: 0.9rem;
						height: 0.9rem;
						margin-right: 0.1rem;
						border-radius: 0.9rem;
					}
					&>div {}
				}
				.right {
					width: 4.5rem;
					text-align: center;
					.btn {
						span {
							display: inline-block;
							width: 1.2rem;
							line-height: 0.5rem;
							border: 2px solid #3C9BFF;
							border-radius: 6px;
							color: #3C9BFF;
							text-align: center;
						}
					}
					.tag {
						/*width: 100%;*/
						text-align: center;
						display: inline-block;
						margin-left: 0.9rem;
					}
					.modify {
						display: inline-block;
						margin-left: 0.2rem;
						color: #3C9BFF;
					}
				}
			}
		}
	}
</style>