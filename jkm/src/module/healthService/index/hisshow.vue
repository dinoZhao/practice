<template>
	<div class="hisshow">
		<div class="title">疾病类型</div>
		<div class="illtype">
			<div class="item" v-for='item in diseaseList'><img src="../../../assets/already.png" />
				<div class="illname">{{item.name}}</div>
				<div class="time1 time" :class="{'hidden':!item.time}">确诊时间</div>
				<div class="time">{{item.time}}</div>
			</div>
			<div v-if='diseaseList.length==0' style="margin-bottom: 0.2rem;">无</div>

		</div>
		<div class="title">手术</div>
		<div class="content">
			<div class="item">
				<div style="margin-right: 0.33rem;">手术</div>
				<div>{{surgeryExist}}</div>
			</div>
			<div class="item" v-if="item.name||item.time" v-for="item in surgeryList">
				<div class="apart">
					<div>名称</div>
					<div>{{item.name}}</div>
				</div>
				<div class="apart">
					<div>时间</div>
					<div>{{item.time}}</div>
				</div>
			</div>
		</div>
		<div class="title">外伤</div>
		<div class="content">
			<div class="item">
				<div style="margin-right: 0.33rem;">外伤</div>
				<div>{{traumaExist}}</div>
			</div>
			<div class="item" v-if="item.name||item.time" v-for="item in traumaList">
				<div class="apart">
					<div>名称</div>
					<div>{{item.name}}</div>
				</div>
				<div class="apart">
					<div>时间</div>
					<div>{{item.time}}</div>
				</div>
			</div>
		</div>
		<div class="title">输血</div>
		<div class="content">
			<div class="item">
				<div style="margin-right: 0.33rem;">输血</div>
				<div>{{bloodTransfusionExist}}</div>
			</div>
			<div class="item" v-if="item.name||item.time" v-for="item in bloodTransfusionList">
				<div class="apart">
					<div>名称</div>
					<div>{{item.name}}</div>
				</div>
				<div class="apart">
					<div>时间</div>
					<div>{{item.time}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				diseaseList: [],
				surgeryExist: '',
				surgeryList: [],
				traumaExist: '',
				traumaList: [],
				bloodTransfusionExist: '',
				bloodTransfusionList: []
			}
		},
		components: {},
		props: ["records"],
		inject: ['updaterecord', 'queryrecord'],
		activated() {
			this.queryrecord()

		},
		watch: {
			records: {
				handler(cur, pre) {
					Object.assign(this, cur.medicalAdditionalInfo && cur.medicalAdditionalInfo.pastHistory)
				},
				deep: true
			}
		},
	}
</script>

<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.hisshow {
		width: 100%;
		padding: 0.4rem;
		font-size: 0.3rem;
		height: calc(100% - 0.95rem);
		overflow: scroll;
		&>.title {
			width: 1.7rem;
			line-height: 0.5rem;
			background: rgba(60, 155, 255, 0.10);
			border-radius: 0.33rem;
			color: #3C9BFF;
			text-align: center;
		}
		.illtype {
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.28rem;
			.item {
				display: inline-flex;
				align-items: flex-start;
				margin-bottom: 0.2rem;
				margin-right: 0rem;
				line-height: 0.6rem;
				img {
					width: 0.5rem;
					height: 0.5rem;
					margin-right: 0.1rem;
				}
				.time {
					font-size: 0.3rem;
					width: 1.7rem;
				}
				.time1{
					width: 1.3rem;
				}
				.illname {
					width: 1.5rem;
					margin-right: 0.2rem;
				}
			}
		}
		.content {
			margin: 0.28rem 0;
			.item {
				display: flex;
				margin-bottom: 0.2rem;
				line-height: 0.6rem;
				.apart {
					display: flex;
					margin-right: 0.1rem;
					&>div:first-child {
						margin-right: 0.33rem;
					}
					&>div:last-child {
						width:3rem;
					}
				}
			}
		}
	}
	.hidden{
		opacity: 0;
	}
</style>