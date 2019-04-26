<template>
	<div class="temfur">
		<div class="title">
				检测结果
			</div>
			<img class="opic" src="../../../assets/oxyresult.png"/>
		<div class="dial">
			
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					血氧饱和度
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.saturation}}
				</div>
				<div class="oc">mmHg</div>
				<img src="../../../assets/oxygen1.png" />
			</div>
			<div class="part">
				<div style="color: #7F807F;font-size: 0.64rem;">
					脉率
				</div>
				<div style="font-size: 1.1rem; color: #333;">
					{{localdetact.VS_HeartRate}}
				</div>
				<div class="oc">BPM</div>
				<img src="../../../assets/pressure4.png" />
			</div>
			
		</div>
		<div class="save"  @click="next">
			保存
		</div>
	</div>
</template>

<script>
	var interval;
	export default {
         props: ['detact'],
        inject: ['getresult'],
		name: 'oxygen',
		components: {

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
		width: 100%;
		padding: 0.33rem 0 0.6rem 0.6rem;
		position: relative;
		width: calc(100% - 0.6rem);
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
			.part {
				height: 19.2vw;
				width: 45%;
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
				border: 1px solid #d9d9d9;
				margin-right: 0.6rem;
				margin-bottom: 0.6rem;
				overflow: hidden;
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
			border-radius: 12px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.4rem;
			float: right;
			/*margin-top: 0.6rem;*/
			margin-right: 0.6rem;
			color: #fff;
			margin-bottom: 0.6rem;
		}
	}
</style>