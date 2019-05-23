<template>
	<div class="fur">
		<div class="title">
			<div class="item on">服务登记</div>
			<div class="item">到期提醒</div>
		</div>
		<div class="basic">
			<div class="title">
				基本信息
			</div>
			<div class="content">
				<div style="width: 20%;">
					<div class="item">
						<div class="key">姓名</div>
						<div class="value">李明栋</div>
					</div>
					<div class="item">
						<div class="key">性别</div>
						<div class="value">男</div>
					</div>
				</div>
				<div style="width: 30%;">
					<div class="item">
						<div class="key">身份证</div>
						<div class="value">3101151985102610384</div>
					</div>
					<div class="item">
						<div class="key">年龄</div>
						<div class="value">34</div>
					</div>

				</div>
				<div style="width: 50%;">
					<div class="item">
						<div class="key">联系方式</div>
						<div class="value">18060488688</div>
					</div>
					<div class="item">
						<div class="key">住址</div>
						<div class="value">云南省大理白族自治州永平县安培路10号</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tag">
			<div class="title">
				人群标签
			</div>
			<div class="content">
				<div class="tag tag1">老年人</div>
				<div class="tag tag2">高血压</div>
			</div>
		</div>
		<div class="service">
			<div class="title">
				服务包
			</div>
			<div class="content">
				<img :src="provide?require('assets/already.png'):require('assets/notyet.png')" /> 基本服务包
			</div>
		</div>
		<div class="doctor">
			<div class="title">
				服务医生
			</div>
			<div class="content">
				<div class="item">
					<div>医生</div>
					<select name="status-select" class="status-select">
						<option value="all">全部</option>
						<option value="Finish">已完成</option>
						<option value="Pending">预约中</option>
						<option value="Canceled">已取消</option>
					</select>
					<div style="margin-left: 1rem;margin-right: 0.24rem;">服务有效期</div>
					<calendar class='calendar' @calendar='change'></calendar>
				</div>
			</div>
		</div>
        <btn class='btn' fragment="保存"></btn>
	</div>
</template>

<script>
	import calendar from 'components/stuff/calendar.vue'
	import btn from 'components/stuff/btn.vue'
	
	export default {
		data() {
			return {
				provide: true
			}
		},
		components: {
			calendar,
			btn 
		},
		methods: {
			change(para) {
				console.log(1)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	$lan:#3C9BFF;
	.fur {
		width: 100%;
		display: inline-flex;
		padding: 0.6rem 0 0 0.6rem;
		min-height: 100%;
		box-sizing: border-box;
		flex-direction: column;
		&>.title {
			height: 0.8rem;
			font-size: 0.32rem;
			width: 100%;
			display: flex;
			flex-direction: row;
			border-bottom: 0.02rem solid #eee;
			.item {
				width: 1.9rem;
				line-height: 0.8rem;
				text-align: center;
			}
			.on {
				border-bottom: 0.02rem solid $lan;
				color: $lan;
			}
		}
		.basic {
			padding: 0.4rem 0 0;
			.title {
				font-size: 0.32rem;
			}
			.content {
				display: flex;
				flex-wrap: wrap;
				&>div {
					width: 20%;
					display: inline-flex;
					flex-direction: column;
					.item {
						display: inline-flex;
						font-size: 0.28rem;
						margin-top: 0.2rem;
						.key {
							color: #666;
							margin-right: 0.45rem;
						}
						.value {
							color: #333;
						}
					}
				}
			}
		}
		.tag {
			padding: 0.4rem 0 0;
			.title {
				font-size: 0.32rem;
			}
			.content {
				margin-top: 0.17rem;
				display: flex;
				.tag {
					line-height: 0.8rem;
					padding: 0 0.58rem;
					border: 1px solid #eee;
					font-size: 0.28rem;
					margin-right: 0.2rem;
					border-radius: 0.4rem;
				}
				.tag1 {
					color: $lan;
					background: rgba(60, 155, 255, 0.10);
				}
				.tag2 {
					color: #D43C33;
					background: rgba(212, 60, 51, 0.20);
				}
			}
		}
		.service {
			padding: 0.4rem 0 0;
			.title {
				font-size: 0.32rem;
			}
			.content {
				margin-top: 0.18rem;
				img {
					width: 0.6rem;
					height: 0.6rem;
					margin-right: 0.24rem;
					vertical-align: middle;
				}
			}
		}
		.doctor {
			padding: 0.4rem 0 0;
			.title {
				font-size: 0.32rem;
			}
			.content {
				display: flex;
				line-height: 0.6rem;
				margin-top: 0.17rem;
				.item {
					display: inline-flex;
				}
				.status-select {
					outline: none;
					border: 0;
					background: #fff;
					border: 1px solid #999;
					height: 0.6rem;
					width: 2rem;
					padding-left: 10px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					-webkit-appearance: menulist-button;
					appearance: menulist-button;
					margin-left: 0.17rem;
					border-radius: 0.12rem;
				}
			}
		}
		/deep/ .cov-datepicker {
			width: 2rem !important;
			height: 0.6rem !important;
		}
		.btn{
			margin: 0 auto;
			margin-top: 0.35rem;
		}
	}
</style>