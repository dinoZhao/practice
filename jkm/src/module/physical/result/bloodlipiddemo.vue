<template>
	<div class="ecgfur">
		<div class="process">
			<ignore :preindex="7"  @click.native='$emit("liberate")'></ignore>
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

			<div class='demo'>
				<img src="../../../assets/lipids_hint.png" />
				<div class="below">
					<div>①测量环境温度15~35℃</div>
					<div>②按说明操作至显示检测数值</div>
				</div>

			</div>

		</div>
		<manu class='mymanu' :type='0' :manu='7'></manu>
	</div>
</template>

<script>
	var interval;
	import ignore from './ignore.vue'
	import manu from './manu.vue'
	export default {
		inject: ['getresult'],
		props: ['detact'],
		components: {
			ignore,
			manu
		},
		activated() {
			var self = this
			if(this.detact['bloodFat']) {
				this.$emit('promote', 7, 1)
			} else {
				interval = setInterval(function() {
					self.getresult()
					if(this.detact['bloodFat']) {
						clearInterval(interval)
						self.$emit('promote', 7, 1)
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
		.mymanu {
			// margin-left: 0.3rem;
			position: absolute;
			bottom: .4rem;
			left: 2.5vw;
			font-size: 0.3rem;
		}
		.process {
			height: 7rem;
			padding: 0.3rem 0.7rem 0 0.8rem;
			display: flex;
			flex-direction: column;
			position: relative;
			    margin-left: 1rem;
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
			.demo {
				display: flex;
				margin-top: 0.6rem;
				.below {
					height: 30%;
					line-height: 2em;
					width: 60%;
					font-size: 0.35rem;
					    align-self: flex-end;
				}
				img {
					width: 7.10rem;
					height: 5.46rem;
					    flex-shrink: 0;
				}
			}
		}
	}
	
	.box {
		display: none !important;
	}
</style>