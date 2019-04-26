<template>
	<div class="temfur">
		<div class="dial">
			<div class="item1"><img src="../../../assets/interval.png" /> 0s</div>
			<div class="item1"><img src="../../../assets/rates.png" /> --</div>
			<div class="item2">开始记录</div>
			<div class="item2">波形冻结</div>
			<div class="item3">清零</div>
			<div class="item3">结束记录</div>
			<div class="item2">心电设置</div>
		</div>
		<img  src="../../../assets/heartbeat.png"/>
	</div>
</template>

<script>
	export default {

		name: 'ecging',
		components: {

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

<style lang="scss" scoped="scoped">
	.temfur {
		padding: 0 0.3rem;
		position: relative;
		width: calc(100% - 0.6rem);
		.dial {
			height: 6.77vw;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.item1 {
				background: rgba(60, 155, 255, 0.10);
				border-radius: 12px;
				width: 2rem;
				height: 0.9rem;
				display: inline-flex;
				color: #3C9BFF;
				font-size: 0.4rem;
				justify-content: center;
				align-items: center;
				margin-right: 0.2rem;
				img {
					width: 0.39rem;
					height: 0.43rem;
					margin-right: 0.2rem;
				}
			}
			.item2 {
				background: #3C9BFF;
				border-radius: 12px;
				width: 1.8rem;
				line-height: 0.9rem;
				font-size: 0.32rem;
				color: #fff;
				text-align: center;
				margin-left: 0.2rem;
			}
			.item3 {
				background: #EEEEEE;
				border-radius: 12px;
				text-align: center;width: 1.8rem;
				font-size: 0.32rem;
				color: #999999;
				line-height: 0.9rem;
				margin-left: 0.2rem;
			}
		}
		&>img{
			margin: 0 0.3rem;
			width: calc(100% - 0.6rem);
		}
	}
</style>