<template>
  <div class="home">
		<div class="title">
			<span>行走的胸痛中心</span>
		</div>
		<div class="content">
			<div class="check-assist">
				<div class="check">
					<div class="check-p">
						<p>今日检查</p>
						<p class="check-num">{{inspectCount}}</p>
					</div>
				</div>
				<img class="check-to-assist" src="../../../assets/chestPain-home-checkToAssist.png" />
				<div class="check assist">
					<div class="check-p">
						<p>协诊</p>
						<p class="check-num">{{assistDiagnosisCount}}</p>
					</div>
				</div>				
			</div>
			<div class="transfer">
				<img class="check-toReferral" src="../../../assets/chestPain-home-checkToReferral.png" />
				<img class="assist-toReferral" src="../../../assets/chestPain-home-toReferral.png" />
			</div>
			<div class="referral-recovery">
				<div class="check referral">
					<div class="check-p">
						<p>转诊</p>
						<p class="check-num">{{referralCount}}</p>
					</div>
				</div>
				<img class="check-to-assist" src="../../../assets/chestPain-home-toRecovery.png" />
				<div class="check recovery">
					<div class="check-p">
						<p>康复</p>
						<p class="check-num">{{recoveryCount}}</p>
					</div>
				</div>	
			</div>
		</div>
		<div class="bottom">
			<div class="enter-btn" @click="toAssist">立即进入</div>
		</div>
  </div>
</template>
<script>
import $ from 'jquery'
import {getDataSummary} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat } from 'utils/util'
export default {

  name: 'home',
  components: {
  },
  data () {
    return {
     inspectCount:'--',
     assistDiagnosisCount:'--',
     referralCount:'--',
     recoveryCount:'--'
     
    }
  },
  methods:{
  	toAssist(){
  		sessionStorage.setItem('tabstatus','init')
        window.location.href ="./assist.html";
  	}
  },
  components:{
    headline
  },
  created () {
  	var vm = this;
  	var padDeviceCode = sessionStorage.getItem("padcode");
  	var thirdUniqueId = JSON.parse(sessionStorage.getItem("doctorMsg")).doctorId;
  	var obj ={
  		"padDeviceCode": padDeviceCode,
			"thirdUniqueId": thirdUniqueId
  	}
  	getDataSummary(obj).then(data=>{
  		vm.inspectCount = data.inspectCount;
  		vm.assistDiagnosisCount = data.assistDiagnosisCount;
  		vm.referralCount = data.referralCount;
  		vm.recoveryCount = data.recoveryCount;
    })
  },
  mounted(){
//  let id ={'productCode':'YQB00101'};
//  let per = {'content':'h5/homePage/index.h5_default'}
//  getKnowledgeTag(id).then(data=>{
//    console.log(data)
//  })
//  cancelAttention(per).then(data=>{
//    console.log(data)
//  })
  }
}
</script>
<style scoped="scoped">
.home{
	font-family: PingFangSC-Medium;
	width: calc(100% - 200px);
	height: 100%;
	margin-left: 200px;
	overflow: hidden;
}
.title{
	width: 100%;
	text-align: center;
	font-size: .36rem;
	color: #3C9BFF;
	margin-top: .3rem;
	margin-bottom: .15rem;
}
.content{
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 1;
}
.check{
	width: 4.28rem;
	height: 2.28rem;
	background: url('../../../assets/chestPain-home-check.png') no-repeat;
	background-size:100% 100%;
	color: #3C9BFF;
	position: relative;
}
.assist{
	width: 4.28rem;
	height: 2.28rem;
	background: url('../../../assets/chestPain-home-assist.png') no-repeat;
	background-size:100% 100%;
	color: #3C9BFF;
	position: relative;
}
.referral{
	width: 4.28rem;
	height: 2.28rem;
	background: url('../../../assets/chestPain-home-referral.png') no-repeat;
	background-size:100% 100%;
	color: #3C9BFF;
	position: relative;
}
.recovery{
	width: 4.28rem;
	height: 2.28rem;
	background: url('../../../assets/chestPain-home-recovery.png') no-repeat;
	background-size:100% 100%;
	color: #3C9BFF;
	position: relative;
}
.check-p{
	position: absolute;
	right: .3rem;
	top: .4rem;
	width: 2.3rem;
	text-align: center;
}
.check p:first-child{
		font-size: .28rem;
}
.check p:nth-child(2){
		font-size: .58rem;
		margin: .1rem;
}
.check-assist,.referral-recovery{
	overflow: hidden;
	margin: 0 auto;
}
.referral-recovery{
	margin-top: -.5rem;
}
.check,.transfer{
	float: left;
}
.transfer{
	position: relative;
	top: -.4rem;
	height: 1.9rem;
	width: 11rem;
	margin: 0 auto;
}

.check-toReferral{
	display: inline-block;
	width: .62rem;
	height: 1.93rem;
	margin-left: 1.1rem;
	vertical-align: top;
}
.assist-toReferral{
	display: inline-block;
	width: 4.6rem;
	height: 2.8rem;
	margin-left: 1.32rem;
  margin-top: -.5rem;
}
.check-to-assist{
	margin-left: -.34rem;
	margin-right: -.34rem;
	display: block;
	width: 5rem;
	height: .49rem;
	margin-top: .8rem;
	float: left;
}
.check-toReferral,.assist-toReferral{
	/*float: left;*/
}

.bottom {
	width: calc(100% - 200px);
	height: 3.75rem;
	position: fixed;
	bottom: 0;
	left: 200px;
	background: url('../../../assets/chestPain-home-bottombg.png') no-repeat;
	background-size:100% 100%;
}
.enter-btn{
	width: 5rem;
	line-height: 1.2rem;
	background: #3C9BFF;
	border-radius: .12rem;
	font-size: .48rem;
	color: #FFFFFF;
	text-align: center;
	margin: 0 auto;
	margin-top: 2rem;
}
</style>
