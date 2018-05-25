<template>
	<div class="pop" v-show="popshow">
		<div class="inner">
			<div><img style="cursor: pointer;" src="../assets/images/close.png" alt="" /></div>
			<div>{{popkind}}</div>
			<div v-show="cuestatus==1" class="cue1">
				<div>请拨打富聪金融客服电话：</div>
				<div>400-620-6188</div>
				<div>我们会及时安排专门的客户经理为您服务</div>
			</div>
			<div  v-show="cuestatus==2" class="cue2">
				{{cuemsg}}
			</div>
			<div style="cursor: pointer;" v-on:click="hide">好的</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'Pop',
		data() {
			return {
				cue: 2,
			}
		},
		computed: mapGetters([
			'cuemsg',
			'cuestatus',
			'popkind',
			'popshow'
		]),
	methods:mapActions([
      'hide'
    ])
	}
</script>

<style lang="scss" scoped>
	.pop {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
	}
	
	.inner {
		position: absolute;
		width: 404px;
		height: 379px;
		background: #fff;
		left: calc((100% - 404px)/2);
		top: calc((100% - 379px)/2);
		border-radius: 5px;
		text-align: center;
		&>div:first-child {
			text-align: right;
			padding: 15px 15px 0 0;
		}
		&>div:nth-child(2) {
			margin-top: -25px;
			font-size: 20px;
			color: #666;
		}
		&>div.cue1 {
			&>div:nth-child(1) {
				margin-top: 25px;
				font-size: 18px;
			}
			&>div:nth-child(2) {
				margin-top: 25px;
				font-size: 28px;
				color: #477AAC;
			}
			&>div:nth-child(3) {
				margin-top: 25px;
				font-size: 18px;
			}
		}
		&>div.cue2 {
			font-size: 26px;
			color: #d43c33;
			height: 5em;
			padding: 20px;
		}
		&>div.cue2:after {
			content: "";
			height: 100%;
			width: 0;
			display: inline-block;
			vertical-align: middle;
		}
		&>div:nth-child(5) {
			margin: 0 auto;
			margin-top: 60px;
			font-size: 20px;
			width: 197px;
			height: 48px;
			color: #fff;
			background: #d43c33;
			border-radius: 5px;
			line-height: 48px;
			text-align: center;
		}
	}
</style>