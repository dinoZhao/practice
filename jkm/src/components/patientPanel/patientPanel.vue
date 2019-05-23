<template>
	<div id="patien-panel">
		<div class="patient-panel-body">
			<div class="patient-panel-item">
				<div class="hospital-list-title">
					<img src="http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg" />
					<div class="hospital-list-title-message">
						<p>李明栋</p>
						<span>男</span><span>34岁</span>
					</div>
				</div>
				<div class="patient-label">
					<span class="age-range">中年人</span><span class="disease-type">高血压</span>
				</div>
				<div class="time-specification">服务有效期：<span>2019-12-30</span></div>
			</div>
			<div class="patient-panel-item">
				<div class="hospital-list-title">
					<img src="http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg" />
					<div class="hospital-list-title-message">
						<p>李明栋</p>
						<span>男</span><span>34岁</span>
					</div>
				</div>
				<div class="patient-label">
					<span class="age-range">中年人</span><span class="disease-type">高血压</span>
				</div>
				<div class="time-specification">服务有效期：<span>2019-12-30</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['patientPanel'],
		data() {
			return {
				tabShow: true
			}
		},
		methods: {

		},
		created() {

		}

	}
</script>

<style scoped lang="scss" type="text/css">
	.patient-panel-body {
		.patient-panel-item {
			width:21vw;
			box-shadow:  0px 0px 15px 6px #f3f8fd; 
			margin:0.35rem 0.3rem;
			display:inline-block;
			.hospital-list-title {
				margin: 0 auto;
				text-align: left;
				padding-top: 0.3rem;
				padding-left: 0.35rem;
				padding-bottom: 0.3rem;
				img {
					width: 4.0vw;
					border-radius: 50%;
					display: inline-block;
					vertical-align: middle;
				}
				.hospital-list-title-message {
					display: inline-block;
					vertical-align: middle;
					padding-left: 10px;
					font-size: .26rem;
					p {
						font-weight: bold;
					}
					span {
						color: #999999;
						font-size: .22rem;
					}
					span:last-child {
						padding-left: .08rem;
					}
				}
			}
			
			.age-range{
				padding: 0.07rem 0.15rem;
				background-color: #EBF5FF;
				color: #3C9BFF;
				font-size: 0.2rem;
				border-radius: 22%;
				margin: 0.05rem 0.25rem;
			}
			.disease-type{
				font-size: 0.2rem;
				color: #D43C33;
				background-color: #f6d8d6;
				padding: 0.07rem 0.15rem;
				border-radius: 22%;
			}
			.time-specification{
				padding: 0.35rem 0.25rem;
				font-size: 0.28rem;
				color: #b9b9b9;
			}
		}
	}
</style>