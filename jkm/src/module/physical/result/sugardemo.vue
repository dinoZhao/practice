<template>
	<div class="ecgfur">
		<div class="process">
			<div class="express">
				<div class="below">
					<div>①安装针头，清洁手指</div>
					<div>②使用采血针采取血样</div>
                    <div>③使用试纸吸取血样后，
                    	   &nbsp&nbsp&nbsp 将试纸插入血糖仪</div>
				</div>
			</div>

			<div class="box">
				<div class="boxleft">
					<div class="step step1 on"></div>
					<div class="medium"></div>
					<div class="step step2"></div>
					<div class="medium"></div>
					<div class="step step3"></div>
				</div>
				<div class="boxright">
					<div>安装针头，清洁手指</div>
					<div>插入试条</div>
					<div>测量中</div>

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
        activated(){
        	var self=this
        	if(this.detact['Glu']){
					this.$emit('promote',3)
				}else{
					interval = setInterval(function() {
						self.getresult()
						if(self.detact['Glu']) {
							clearInterval(interval)
							self.$emit('promote',3)
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
			height: 8rem;
			padding: 0.3rem 0.7rem 0 0.8rem;
			display: flex;
			justify-content: space-between;
			.express {
				background: url(../../../assets/sugardemo.png) no-repeat center;
				background-size: contain;
				width: 100%;
			}
			.box {
				width: 4.5rem;
				height: 2.87rem;
				border: 1px solid #D9D9D9;
				padding: 0.3rem;
				box-sizing: border-box;
				display: flex;
				flex-shrink: 0;
				/*align-self: flex-end;*/
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
						background: rgba(0, 0,0, 0.2);
					}
					.step.on{
								background-image: linear-gradient(-180deg, #5EB6F3 0%, #307FE2 100%);
								box-shadow: 0px 0px 0px 3px rgba(0, 0,0, 0.2);
					}
					.step1 {
						margin-top: 0.1rem;
					}
					.medium {
						width: 2px;
						height: 10px;
						flex-grow: 1;
						background: rgba(0, 0, 0, 0.2);
					}
					.step3 {
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
				    margin-top: 35%;
				    font-size: 0.35rem;
				    width: 4rem;
				    margin-left: 2rem;
			}
			img {
				height: 110%;
			}
		}
	}
	.box{
		display: none !important;
	}
</style>