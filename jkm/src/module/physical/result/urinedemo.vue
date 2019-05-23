<template>
	<div class="ecgfur">
		<div class="process">
			<ignore :preindex="6"></ignore>
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
				<img src="../../../assets/urine_routine_hint.png" />
				<div class="below">
					<div>①将测试条浸润在待测标本中2秒</div>
					<div>②取出试纸条并用吸水纸清理多余液体</div>
					<div>③将试纸条放入试条架，并将试条轻推到试条架凹槽的最前端</div>
				</div>

			</div>

		</div>
		<manu class='mymanu' :type='0' :manu='6'></manu>
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
			if(this.detact['urine']) {
				this.$emit('promote',6, 1)
			} else {
				interval = setInterval(function() {
					self.getresult()
					if(this.detact['urine']) {
						clearInterval(interval)
						self.$emit('promote', 6, 1)
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
			height: 8rem;
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
				height: 8rem;
				width: 100%;
				position: relative;
				.below {
					height: 35%;
					line-height: 2em;
					width: 55%;
					font-size: 0.35rem;
					align-self: flex-end;
					position: absolute;
                    right: 0;
				}
				img {
					width: 10.22rem;
					height: 5.89rem;
					flex-shrink: 0;
					position: absolute;
				}
			}
		}
	}
	
	.box {
		display: none !important;
	}
</style>