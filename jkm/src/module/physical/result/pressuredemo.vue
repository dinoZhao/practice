<template>
	<div class="ecgfur">
		
		<div class="process">
			<ignore  :preindex="1"></ignore>
			<img src="../../../assets/pressuredemo.png" />
			<div class="describe">
				<div class="above">
					<div class="box">
						<div class="boxleft">
							<div class="step step1 on"></div>
							<div class="medium"></div>
							<div class="step step2"></div>
							
						</div>
						<div class="boxright">
							<div>请按照提示绑好袖带并选择测量模式</div>
							<div>测量中</div>
						</div>
					</div>
				</div>
				<div class="below">
					<div>①桌椅理想高度差25cm~30cm</div>
					<div>②测量环境温度5~40℃</div>
				</div>
			</div>
		</div>

		<div class="line">
			<manu :type='0' :manu='1'></manu>
			<div class="left"  @click="toggle($event)">
				<div  :class="{on:mode==0}">成人模式</div>
				<div  :class="{on:mode==1}">儿童模式</div>
				<div  :class="{on:mode==2}">婴幼儿模式</div>
			</div>
			<!--<div class="right"  @click="$emit('promote',1,1)">
				开始测量
			</div>-->
		</div>
	</div>
</template>

<script>
	import ignore from './ignore.vue'
	import manu from './manu.vue'
	var  interval;
	export default {
data(){
   	return {
   		mode:0
   	}
   },
   components:{
   	ignore,manu
   },
   props: ['detact'],
   inject: ['getresult'],
   methods:{
   		toggle(e){
   			switch (e.target.innerText){
   				case "成人模式":
   				this.mode=0
   					break;
   				case "儿童模式":
   				this.mode=1
   					break;
   					case "婴幼儿模式":
   				this.mode=2
   					break;
   					defaut:
   					break
   			}
   		}
   },
 
		activated() {
			var self = this
			if(this.detact['bloodPressure']) {
				this.$emit('promote', 1,1)
			} else {
				interval = setInterval(function() {
					self.getresult()
					if(self.detact['bloodPressure']) {
						clearInterval(interval)
						self.$emit('promote', 1,1)
					}
				}, 2000)
			}
		},
		deactivated() {
			clearInterval(interval)
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.ecgfur {
		box-sizing: border-box;
		.process {
			height: 7rem;
			padding: 0.3rem 0.7rem 0 2.34rem;
			display: flex;
			position: relative;
			.describe {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 100%;
				width: 100%;
				.above {
					height: 70%;
					display: flex;
					justify-content: flex-end;
					.box {
						width: 4.5rem;
						height: 2.47rem;
						border: 1px solid #D9D9D9;
						padding: 0.3rem;
						box-sizing: border-box;
						display: flex;
						.boxleft {
							width: 0.7rem;
							height: 100%;
							display: inline-flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: center;
							margin-right: 0.1rem;
							.step{
								width: 0.22rem;
								height: 0.22rem;
								border-radius: 0.22rem;
								background: rgba(0, 0,0, 0.2);
								
							}
							.step.on{
								background-image: linear-gradient(-180deg, #5EB6F3 0%, #307FE2 100%);
								box-shadow: 0px 0px 0px 3px rgba(0, 0,0, 0.2);
							}
							.step1{
								margin-top: 0.1rem;
								
							}
							.medium{
								width: 1px;
								height: 10px;
								flex-grow: 1;
								background: rgba(0, 0,0, 0.2);
							}
							.step2{
								margin-bottom: 0.1rem;
							}
						}
						.boxright {
							display: inline-flex;
							flex-direction: column;
							justify-content: space-between;
						}
					}
				}
				.below {
					height: 30%;
					line-height: 2em;
					font-size: 0.35rem;
				}
			}
			img {
				height: 90%;
				    margin-left: 20%;
			}
		}
		.line {
			width: 100%;
			position: absolute;
			bottom: .4rem;
			// left: -1.3rem;
			display: flex;
			margin-top: 0.2rem;
			padding-left: 2.5vw;
			box-sizing: border-box;
			margin-right: 0.3rem;
			font-size: 0.3rem;
			// justify-content: space-between;
			.left {
				width: 64%;
				display: flex;
				overflow: hidden;
				div {
					border-radius: 12px;
					width: 3.2rem;
					color: #FC9452;
					line-height: 0.9rem;
					text-align: center;
					margin-right: 0.2rem;
				}
				.on {
					background: #FC9452;
					color: #FFFFFF;
				}
			}
			.right {
				width: 4.5rem;
				line-height: 0.9rem;
				background: #3C9BFF;
				border-radius: 12px;
				text-align: center;
				color: #fff;
			}
			/deep/ .manu{
				margin-right: .5rem;
			}
		}
	}
	.box{
		display: none !important;
	}
</style>