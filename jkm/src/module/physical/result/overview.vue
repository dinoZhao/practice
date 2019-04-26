<template>

	<div id="coat">
		<temp headtxt="个人信息"></temp>
		<div class="content">
			<div class="left">
				<div class="info">
					<img src="../../../assets/weixin.png"/>
					<div class="detail">
						<div class="" style="color: #333;font-size: 0.32rem;">
							李明栋
						</div>
						<div class="" style="color: #999;font-size: 0.26rem;">
							男  34岁
						</div>
					</div>
				</div>
				<div class="item">
					心电
				</div>
				<div class="item on">
					血压
				</div>
			</div>
			<div class="right">
			<slot></slot>
			</div>
		</div>
	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	export default {

		name: 'result',
		components: {
			temp,
			btn
		},
		data() {
			return {

			}
		},
		methods: {

		},
		created() {
			var vm = this;
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped" lang="scss">
	#coat {
		overflow: hidden;
		height: 100%;
	}
	
	.content {
		margin-top: 80px;
		width: 100%;
		display: flex;
		min-height: calc(100% - 80px);
		.left {
			width: 20%;
			min-height: calc(100% - 80px);
			border-right: 1px solid #D9D9D9;
			display: inline-flex;
			flex-wrap: wrap;
			align-content: flex-start;
			.info{
				justify-content: center;
				width: 100%;
				display: inline-flex;
				img{
					width: 0.9rem;
					height: 0.9rem;
					margin-right: 10px;
				}
				margin:0.2rem auto;
			.detail{
				display: inline-flex;
				flex-direction: column;
				
			}	
			}
			.item {
				width: 100%;
				height: 5.2vw;
				line-height: 5.2vw;
				text-align: center;
				font-size: 0.32rem;
			}
			.on {
				background: #3C9BFF;
				color: #fff;
			}
		}
		.right {
			width: 80%;
		}
	}
</style>