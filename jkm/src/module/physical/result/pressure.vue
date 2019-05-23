<template>
	<div class="temfur">
		<div class="dial">
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					收缩压
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.BloodPressure_Systolic}}
					<img class="icon"  v-if="localdetact.SystolicStatus&&localdetact.SystolicStatus!='Normal'"  :src="localdetact.SystolicStatus=='Lower'?icon[0]:icon[1]"/>
				</div>
				<div class="oc">mmHg</div>
				<img src="../../../assets/pressure1.png" />
			</div>
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					舒张压
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.BloodPressure_Diastolic}}
					<img class="icon" v-if="localdetact.DiastolicStatus&&localdetact.DiastolicStatus!='Normal'" :src="localdetact.DiastolicStatus=='Lower'?icon[0]:icon[1]"/>
				</div>
				<div class="oc">mmHg</div>
				<img src="../../../assets/pressure2.png" />
			</div>
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					平均压
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.BloodPressure_Mean}}
					<img class="icon"  v-if="localdetact.MeanStatus&&localdetact.MeanStatus!='Normal'"  :src="localdetact.MeanStatus=='Lower'?icon[0]:icon[1]"/>
				</div>
				<div class="oc">mmHg</div>
				<img src="../../../assets/pressure3.png" />
			</div>
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					脉率
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.VS_HeartRate}}
					<img class="icon"  v-if="localdetact.VS_HeartRateStatus&&localdetact.VS_HeartRateStatus!='Normal'"  :src="localdetact.VS_HeartRateStatus=='Lower'?icon[0]:icon[1]"/>
				</div>
				<div class="oc">BPM</div>
				<img style="width: 2rem;" src="../../../assets/pressure4.png" />
			</div>
		</div>
		<div class="suggest">
			<div v-for="item in localdetact.suggestions">
				{{item}}
			</div>
		</div>
		
		<div class="save" @click="save">
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
		name: 'pressure',
		components: {
         queryhis
		},
		methods:{
			save(){
				this.showtoast('保存成功')
				this.$emit('nexttab','血氧',true)
			}
		},
		data() {
			return{
				localdetact:{},
			}
		},
	  activated(){
        	var self=this
        	self.getresult()
        	self.localdetact=self.detact["bloodPressure"]||{}
			interval = setInterval(function() {
				self.getresult()
				self.localdetact=self.detact["bloodPressure"]||{}
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
		.suggest{
			
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
				margin-bottom: 0.3rem;
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
				width: 1.5rem;
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
			/*margin-top: 0.6rem;*/
			color: #fff;
			margin-bottom: 0.6rem;
			margin-top: 0.3rem;
		}
	}
</style>