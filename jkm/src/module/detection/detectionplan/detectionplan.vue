<template>
	<div id="coat">
		<temp headtxt='快速检测'></temp>
		<div id="list">
			<div class="item">
				心电
			</div>
			<div class="item">
				心电
			</div>
			<div class="item on">
				心电
			</div>
			<div class="item">
				心电
			</div>
			<div class="item">
				心电
			</div>
			<div class="item">
				心电
			</div>
		</div>
		<btn class='btn' fragment="开始检测"></btn>
	</div>
</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	console.log(temp)
	export default {

		name: 'detectionplan',
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
#coat{
	overflow: hidden;
}
	#list {
		display: flex;
		margin: 160px 7.8%;
		flex-wrap: wrap;
		.item {
			width: 18.8%;
			border: 3px solid #FC9452;
			border-radius: 12px;
			margin-right: 0.6rem;
			height: 6.2vw;
			margin-bottom: 3.1vw;
			color: #FC9452;
			font-size: 0.36rem;
			text-align: center;
			line-height: 6.2vw;
		}
		.on {
			background: #FC9452;
			border-radius: 12px;
			color: #fff;
		}
	}
	
	.btn {
		width: 26%;
		margin-left: 37%;
		position: absolute;
		bottom: 0.6rem;
	}
</style>