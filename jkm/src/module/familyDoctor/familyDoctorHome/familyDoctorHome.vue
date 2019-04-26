<template>
<div class="screeninghome">
<headline headtxt="家庭医生/随访" none=""></headline>

			<div class="screening-sidebar">
				<div class="active">
					<span>体检套餐</span>
				</div>
				<div class="">
					<span id="">
  				预约记录
  			</span>
				</div>
			</div>

</div>
</template>

<script>
	import { getKnowledgeTag, cancelAttention } from 'API/requst'
	import headline from 'components/headline/headline.vue';
	export default {
		name: 'familyDoctorHome',
		components: {},
		data() {
			return {
				playing: true,
				bennLike: false,
				startTime: {
					time: ''
				}

			}
		},
		methods: {},
		components: {
			headline
		},
		created() {
			var vm = this;
		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped type="text/css">
	$blueColor :#3C9BFF;
	$greyColor: #ECECEC;
	.screening-sidebar {
		width: 1.4rem;
		height: 63vw;
		border-right: solid 1px $greyColor;
		border-bottom: solid 1px $greyColor;
		display: inline-block;
		position: relative;
		top: 80px;
		div {
			width: 100%;
			height: 50%;
			font-size: 30px;
			color: $blueColor;
			position: relative;
			span {
				display: block;
				width: 29px;
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		.active {
			background-color: $blueColor;
			color: white;
		}
	}
</style>