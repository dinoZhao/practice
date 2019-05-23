<template>
	<div class="allin">
		<div class="content">
			<div class="detail" v-for="(item,index) in result">
				<div class="time">{{item.date}}</div>
				<div class="item"  v-for="(li,idx) in item.list">
					<div class="left">
						<img  :src="li.patientHeadUrl||headurl"  />
						<div class="info" style="margin-right: 0.8rem;">
							<div class="name">{{li.patientName}}</div>
							<div style="color: #999;"><span>{{li.patientSex}}</span><span> {{li.patientAge}}岁</span></div>
						</div>
					</div>
                    <div class="element">
                    	<span class="key">当前救治</span>
                    	<span class="value">{{li.currentStep}}</span>
                    </div>
                    <div class="element">
                    	<span class="key">诊断结果</span>
                    	<span class="value">{{li.result}}</span>
                    </div>
                    <div class="element">
                    	<span class="key">状态</span>
                    	<span class="value">{{li.status}}</span>
                    </div>
                    <div class="element" @click="transfer" style="color: #3C9BFF;">查看</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { getReferralList} from "API/requst";
	import headurl from '../../../assets/headUrl.png'
	export default {
		 data(){
           	return{
           		padDeviceCode: '', //padcode
				thirdUniqueId: '', //doctorid
				result: {},
				headurl,
           	}
           },
		methods: {
			transfer() {
				window.location.href = './caseHistory.html'
			}
		}, 
		created(){
			
			var self = this;
			var padDeviceCode = this.padDeviceCode = sessionStorage.getItem('padcode')
			var thirdUniqueId = this.thirdUniqueId = JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId
			getReferralList({
				padDeviceCode,
				thirdUniqueId
			}).then((res) => {
				self.result = res.result
			})
		
		},
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
			.detail {
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
						padding: 0 0.4rem;
				border-bottom: 1px solid #eee;
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
					.element{
						display: inline-block;
						.key{
							color: #999;
						}
					}
					.element:nth-child(2){
						width: 20%;
					}
					.element:nth-child(3){
						width: 28%;
					}
					.element:nth-child(4){
						width: 15%;
					}
					.element:nth-child(5){
						width: 3em;
					}
				}
			}
		}
	}
</style>