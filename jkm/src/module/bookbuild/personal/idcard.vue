<template>
	<div class="idcard">
		<div class="upper">
			<div class="left">
				<div class="line">
					<div class="infok color1">姓名</div>
					<div class="infov color2">{{info.patientName}}</div>
				</div>
				<div class="line">
					<div class="infok color1">性别</div>
					<div class="infov color2">{{info.patientSex}}</div>
					<div class="color1" style="margin:0 0.14rem 0 0.3rem">民族</div>
					<div class="infov color2">{{info.patientNation}}</div>
				</div>
				<div class="line">
					<div class="infok color1">出生</div>
					<div>
						<span class="color2">{{info.patientIdNumber.slice(6,10)}}</span>
						<span class="color1">年</span>
						<span class="color2">{{info.patientIdNumber.slice(10,12)}}</span>
						<span class="color1">月</span>
						<span class="color2">{{info.patientIdNumber.slice(12,14)}}</span>
						<span class="color1">日</span>
					</div>

				</div>
				<div class="line">
					<div class="infok color1" style="">住址</div>
					<div class="infov color2">{{info.patientAddress}}</div>
				</div>
			</div>
			<div  :style="{backgroundImage: 'url(' + imgurl + ')', backgroundSize:'contain'}" class="right"></div>
		</div>
		<div class="below">
			<span class="color1" style="margin-right: 0.2rem;">公民身份证号码</span><span class="color2">{{info.patientIdNumber}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'idcard',
		data() {
			return {
                imgurl:''
			}
		},
		props: ['info','name'],
		created(){
			this.imgurl=this.info.headUrl
		}

	}
</script>

<style lang="scss" scoped="scoped">
	.idcard {
		width: 5.6rem;
		height: 3.38rem;
		margin-right: 0.6rem;
		background: url('../../../assets/idbg.png');
		background-size: contain;
		padding: 0.5rem 0.5rem 0.3rem 0.5rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 0.22rem;
		.upper {
			display: flex;
			flex-direction: row;
			height: 1.88rem;
			justify-content: space-around;
			.right {
				width: 1.44rem;
			}
			.left {
				width: 3.1rem;
				display: inline-flex;
				flex-direction: column;
				justify-content: space-around;
				.line {
					display: flex;
					align-items: flex-start;
					.infok {
						margin-right: 0.14rem;
						width: 2em;
						flex-shrink: 0
					}
					.infov {
						/*margin-right: 0.2rem;*/
					}
				}
			}
			.right {
				background: url(../../../assets/head-pic.png) no-repeat;
				background-size: 100%;
			}
		}
		.below {
			height: 0.3rem;
		}
		.color1 {
			color: #307FE2;
		}
		.color2 {
			color: #666;
		}
	}
</style>