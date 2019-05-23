<template>
	<div class="allin">
		<div class="content">
			<div class="detail" v-for="(item,index) in result">
				<div class="time">{{item.date}}</div>
				<template v-for="(li,idx) in item.list">
				<div class="item" :class="{problematic:li.tips&&li.tips=='需转诊',unread:li.readStatus==0}">
					<div class="left">
						<img :src="li.patientHeadUrl||headurl" />
						<div class="info" style="margin-right: 0.3rem;">
							<div class="name"><span>{{li.patientName}}</span><span v-if="li.tips=='需转诊'||li.tips=='无需转诊'" class="label">{{li.tips}}</span></div>
							<div style="color: #999;"><span>{{li.patientSex}}</span><span> {{li.patientAge}}岁</span></div>
						</div>
						<span style="color: #999;margin-right: 0.2rem;">协诊反馈</span>
						<div style=""><span style="width:6rem;display:inline-block;vertical-align: middle;text-overflow: ellipsis;overflow: hidden;white-space:nowrap">{{li.feedback?li.feedback:'--'}}</span><span style="display: inline-block;vertical-align: middle;color: #3C9BFF;margin-left: 0.1rem;" :data-index='idx'  @click="check(index,idx,li.medicalRecordFolderId)">{{status[index][idx]?'收起':'查看'}}</span></div>
					</div>
					<div class="right" @click="transfer">
						转诊
					</div>

				</div>
				<div class="qa" v-if="status[index][idx]">
					<div class="question">协诊反馈</div>
				     <div class="answer">{{li.feedback}}</div>
				     <div class="question">协诊医生</div>
				     <div class="answer">{{li.doctor}}</div>
				     <div class="question">问题描述</div>
				     <div class="answer">{{li.description}}</div>
				     <div class="question">病理报告</div>
				     <div class="answer">
				     	<div class="report" @click="printpdf(li.caseReports,0)">
				     		<img src="../../../assets/orangeecg.png"/>
				     		<span>心电报告</span>
				     		<viewer class='viewer'><img :src="li.caseReports[0]"/></viewer>
				     	</div>
				     	<div class="report"  @click="printpdf(li.caseReports,1)"><img src="../../../assets/orangectnl.png"/><span>cTnl报告</span></div>
				     </div>
				</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import { getCoDiagnosisList,updateCpcCache} from "API/requst";
	import headurl from '../../../assets/headUrl.png'
	import viewer from "utils/view"
	export default {
		mixins: [viewer],
		inject: ['getassiststatus'],
           data(){
           	return{
           		padDeviceCode: '', //padcode
				thirdUniqueId: '', //doctorid
				result: {},
				headurl,
				status:[],
           	}
           },
           methods:{
           	printpdf(res,index){
				if(res[index]){
//					if(window.android){
//		    			window.android.showPdf(res[index])
//		    		}
				}else{
					this.showtoast('暂无记录')
				}
		    	
		    },
           	check(index,idx,recordid){
           		var self=this
           		updateCpcCache({
           				"thirdUniqueId": this.thirdUniqueId,
	                    "procedure": "AssistClinic",
	                    "medicalRecordFolderId": recordid
           		}).then(function(res){
           			if(self.status[index][idx]){
           			self.$set(self.status[index],idx,false)
           		}else{
           			self.$set(self.status[index],idx,true)
           		}
           		self.$set(self.result[index].list[idx],"readStatus",1)
           		self.getassiststatus()
           		})
           		
           	},
           	transfer(){
           		window.location.href='./ChestPainCenter.html'
           	}
           },
           created(){
			
			var self = this;
			var padDeviceCode = this.padDeviceCode = sessionStorage.getItem('padcode')
			var thirdUniqueId = this.thirdUniqueId = JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId
			getCoDiagnosisList({
				padDeviceCode,
				thirdUniqueId
			}).then((res) => {
				self.result = res.result
				var arr=[]
				for(var i=0;i<res.result.length;i++){
					var listarr=[]
					for(var j=0;j<res.result[i].list.length;j++){
						listarr.push(false)
					}
					arr.push(listarr)
				}
				self.status=arr
			})
		
		},
	}
</script>

<style lang="scss" scoped="scoped">
*{
	box-sizing: border-box;
}
	.allin {
		width: 100%;
		height: calc(100% - 0.9rem);
        overflow: scroll;
        margin-top: 0.9rem;
        padding-bottom: 0.2rem;
		.content {
			margin-top: 0.1rem;
			.detail {
				margin-bottom: 0.2rem;
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
							position: relative;
							&>img{
							vertical-align: middle;
							width: 0.22rem;
							height: 0.25rem;
							margin-right: 0.1rem;
						}
							.viewer{
								background: #0000FF;
								position: absolute;
								width: 100%;
								height: 100%;
								top:0;
								opacity: 0;
								img{
									width: 100%;
									height: 100%;
								}
							}
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
				.time {
					width: 1.9rem;
					line-height: 0.44rem;
					text-align: center;
					background: #EEEEEE;
					border-radius: 0.22rem;
					margin-left: 0.4rem;
				}
				.item {
					height: 1.4rem;
					margin: 0.1rem 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					    	padding: 0 0.4rem;
				border-bottom: 1px solid #eee;
					    .label{
					    	font-size: 0.24;
                             color: #1FAD00;
                             padding: 0 0.2rem;
                             background: #EFFFE5;
                             border-radius: 1em;
					    }
					.left {
						display: inline-flex;
						align-items: center;
						.info{
							width: 2.3rem;
						}
						img {
							width: 0.9rem;
							height: 0.9rem;
							margin-right: 0.1rem;
							border-radius: 0.9rem;
						}
						&>div {}
					}
					.right {
						width: 1.5rem;
						height: 0.64rem;
						border: 0.02rem solid #3C9BFF;
						border-radius: 6px;
						text-align: center;
						line-height: 0.64rem;
						color: #3C9BFF;
					}
				}
				.problematic{
					/*background: rgba(255,248,235,0.60);*/
					  .label{
					    	font-size: 0.24;
                             color: #D43C33;
                             padding: 0 0.2rem;
                             
                             border-radius: 1em;
					    }
				}
				.unread{
					background: #FFFBF3;
				}
			}
		}
	}
</style>