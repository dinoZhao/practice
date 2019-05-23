<template>
	<div class="temfur">
		<div class="title">
				检测结果
			</div>
			<!--<img class="opic" src="../../../assets/oxyresult.png"/>-->
		<div class="dial">
			
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					血氧饱和度
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.saturation}}
					<img class="icon" v-if="localdetact.status&&localdetact.status!=='Normal'" :src="localdetact.status=='Lower'?icon[0]:icon[1]"/>
				</div>
				<div class="oc">%</div>
				<img src="../../../assets/oxygen1.png" />
			</div>
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					脉率
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.VS_HeartRate}}
					<img class="icon" v-if="localdetact.VS_HeartRateStatus&&localdetact.VS_HeartRateStatus!=='Normal'" :src="localdetact.VS_HeartRateStatus=='Lower'?icon[0]:icon[1]"/>
				</div>
				<div class="oc">BPM</div>
				<img src="../../../assets/pressure4.png" />
			</div>
			
		</div>
		<div class="suggest">
			<div v-for="item in localdetact.suggestions">
				{{item}}
			</div>
		</div>
		<div class="save"  @click="next">
			确认
		</div>
		<queryhis></queryhis>
	</div>
</template>

<script>
	var interval;
	import queryhis from './queryHis'
	export default {
         props: ['detact','icon'],
        inject: ['getresult'],
		name: 'oxygen',
		components: {
          queryhis
		},
		methods:{
			next(){
				this.showtoast('保存成功')
				this.$emit('nexttab','血糖',true)
			}
		},
		data() {
			return{
				localdetact:{}
			}
		},
		 activated(){
        	var self=this
        	self.getresult()
        	self.localdetact=self.detact["SpO2"]||{}
			interval = setInterval(function() {
				self.getresult()
				self.localdetact=self.detact["SpO2"]||{}
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
		width: 100%;
		    box-sizing: border-box;
		.title{
			font-size: 0.48rem;
			margin-bottom: 0.33rem;
		}
		.opic{
			width: calc(100% - 0.6rem);
			margin-bottom: 0.33rem;
		}
		.dial {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.part {
				height: 12.2vw;
				width: 47%;
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
				border: 1px solid #d9d9d9;
				margin-bottom: 0.6rem;
				overflow: hidden;
			}
			.part>div:first-child{
				font-size: 0.32rem !important;
			} 
			.part>div:nth-child(2){
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
				width: 2rem;
				height: 2.02rem;
				/* opacity: 0.08; */
				position: absolute;
				bottom: -0.4rem;
				right: -0.2rem;
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
			margin-bottom: 0.6rem;
		}
	}
</style>