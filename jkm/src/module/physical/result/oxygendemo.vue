<template>
	<div class="ecgfur">
		<div class="process">

			<div class="box">
				<div class="boxleft">
					<div class="step step1 on"></div>
					<div class="medium"></div>
					<div class="step step2"></div>

				</div>
				<div class="boxright">
					<div>手指脱落</div>
					<div>探索脉搏</div>
				</div>
			</div>

			<div class>
				<img src="../../../assets/oxygendemo.png" />
				<div class="below">
					<div>①按图示插入手指</div>
					<div>②测量环境温度5~40℃</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
	var interval;
	export default {
		inject: ['getresult'],
		props: ['detact'],
		activated() {
			var self = this
			if(this.detact['SpO2']) {
				this.$emit('promote', 2)
			} else {
				interval = setInterval(function() {
					self.getresult()
					if(self.detact['SpO2']) {
						clearInterval(interval)
						self.$emit('promote', 2)
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
			padding: 0.3rem 0.7rem 0 0.8rem;
			display: flex;
			flex-direction: column;
			.box {
				width: 4.5rem;
				height: 2rem;
				border: 1px solid #D9D9D9;
				padding: 0.3rem;
				box-sizing: border-box;
				display: flex;
				flex-shrink: 0;
				align-self: flex-end;
				.boxleft {
					width: 0.7rem;
					height: 100%;
					display: inline-flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					margin-right: 0.1rem;
					.step {
						width: 0.22rem;
						height: 0.22rem;
						border-radius: 0.22rem;
						background: rgba(0, 0, 0, 0.2);
					}
					.step1 {
						margin-top: 0.1rem;
					}
					.step.on {
						background-image: linear-gradient(-180deg, #5EB6F3 0%, #307FE2 100%);
						box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.2);
					}
					.medium {
						width: 1px;
						height: 10px;
						flex-grow: 1;
						background: rgba(0, 0, 0, 0.2);
					}
					.step2 {
						margin-bottom: 0.1rem;
					}
				}
				.boxright {
					display: inline-flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}
			.below {
				height: 30%;
				line-height: 2em;
				width: 60%;
				margin-left: 40%;
				font-size: 0.35rem;
			}
			img {
				width: 10rem;
				height: 4.8rem;
			}
		}
	}
	.box{
		display: none !important;
	}
</style>