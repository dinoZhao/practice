<template>
	<div class="temfur">
		<div class="dial">
			<div style="color: #7F807F;font-size: 0.64rem;">
				血糖
			</div>
			<div style="font-size: 1.1rem; color: #333;">
             {{localdetact.value}}
			<img class="icon" v-if="localdetact.status&&localdetact.status!='Normal'" :src="localdetact.status=='Lower'?icon[0]:icon[1]"/>
			</div>
			<div class="oc">mmol/L</div>
			<img src="../../../assets/sugar1.png" />
		</div>
		<div class="suggest" style="width: calc(100%);margin-top: 0.6rem;">
			<div v-for="item in localdetact.suggestions">
				{{item}}
			</div>
		</div>
		<div class="status" @click="toggle($event)">
		<div style="font-size: 0.3rem;">血糖检测时您的状态：</div>
		<div class="btn" v-bind:class="{on:status}">空腹</div>
		<div  class="btn"  v-bind:class="{on:!status}">餐后</div>
		</div>
		<div class="save" @click="next">
			确认
		</div>
		<queryhis class='queryhis'></queryhis>
	</div>
</template>

<script>
	var interval;
	import {updateglu} from "API/requst"
	import queryhis from './queryHis'
	export default {
        props: ['detact','icon','recordId'],
        inject: ['getresult'],
		name: 'temperature',
		components: {
          queryhis
		},
		data() {
			return {
             status:true,
             localdetact:{}
			}
		},
		methods: {
		toggle(e){
			switch (e.target.innerText){
				case "空腹":
				this.status=true
					break;
					case "餐后":
				this.status=false
					break;
				default:
					break;
			}
		},
		next(){
			var self=this
			updateglu({
				"recordId": this.recordId,
				"condition": this.status?'Fasting':'AfterMeal'
			}).then(res=>{
				self.showtoast('保存成功')
				self.$emit('nexttab','体温',true)
				sessionStorage.setItem('sugarstatus',self.status)
			},err=>{
				self.alertDefault({
						text: err.data.resultMessage,
						rowButton:false,
					leftButtonText:'取消',
					rightButtonText: '确定'
			})
			})
			}
		},
		created() {
			var vm = this;
			
		},
		mounted() {

		},
		 activated(){
        	var self=this
        	self.getresult()
        	self.localdetact=self.detact["Glu"]||{}
        	if(self.detact['Glu']){
//				self.status=self.detact['Glu'].state=="空腹"?true:false	
				}
        	self.status=sessionStorage.getItem("sugarstatus")===null?true:sessionStorage.getItem("sugarstatus")==='true'?true:false
			
			interval = setInterval(function() {
				self.getresult()
				self.localdetact=self.detact["Glu"]||{}
				if(self.detact['Glu']){
//				self.status=self.detact['Glu'].state=="空腹"?true:false	
				}
				
			}, 2000)
			
				
        },
	  deactivated(){
		clearInterval(interval)
	}
	}
</script>

<style lang="scss" scoped="scoped">
	.temfur {
	padding: 0.4rem;
    position: relative;
    width: calc(100% - 0.8rem);
		.dial {
			height: 18.2vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
			border: 1px solid #d9d9d9;
			overflow: hidden;
			&>div:first-child{
				font-size: 0.32rem !important;
			} 
			&>div:nth-child(2){
				font-size: 0.62rem !important;
			}
			.oc {
				font-size: 0.28rem;
				background: #3C9BFF;
				color: #FFFFFF;
				width: 1.4rem;
				line-height: 0.4rem;
				border-radius: 30px;
				text-align: center;
			}
			img {
				width: 3.1rem;
				height: 3.02rem;
				opacity: 0.08;
				position: absolute;
				bottom: -0.4rem;
				right: -0.2rem;
			}
		}
		.status{
			float: left;
			margin-top: 0.3rem;
			display: flex;
			line-height: 0.9rem;
			margin-bottom: 0.6rem;
			.btn{
				
			border-radius: 12px;
			width: 1.8rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.3rem;
			margin: 0 0.3rem;
			color: #333;
			}
			.on{
				background: #FC9452;
				color: #fff;
			}
		}
		.save {
			background: #3C9BFF;
			border-radius: 5px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.3rem;
			float: right;
			margin-top: 0.3rem;
			color: #fff;
		}
		.queryhis{
			margin-right: 0.2rem;
		}
	}
</style>