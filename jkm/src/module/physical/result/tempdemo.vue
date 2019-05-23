<template>
	<div class="ecgfur">
		<div class="process">
            <ignore  :preindex="4"></ignore>
			<img src="../../../assets/tempdemo.png" />
			<div class="below">
				<div>①轻轻拉耳朵，保持耳道畅通</div>
				<div>②将探头深入耳道，按下测量键约1-3秒</div>
			</div>
<manu :manu='4' :type='0'></manu>
		</div>

	</div>
</template>

<script>
	var interval;
	import ignore from './ignore.vue'
	import manu from './manu.vue'
	export default {
		inject: ['getresult'],
		props: ['detact'],
		components:{
			manu,ignore
		},
		activated() {
			var self = this
			if(this.detact['Temperature']) {
				this.$emit('promote', 4,1)
			} else {
				interval = setInterval(function() {
					self.getresult()
					if(self.detact['Temperature']) {
						clearInterval(interval)
						self.$emit('promote', 4,1)
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
			height: 7rem;
			padding: 0.3rem 2.5vw 0 2.5vw;
			position: relative;
			.below {
				height: 30%;
				line-height: 2em;
				width: 50%;
				position: absolute;
				bottom: -0.8rem;
                right: 2.15rem;
				font-size: 0.35rem;
			}
			img {
				width: 71%;
				margin-left: 0.5rem;
			}
		}
		.process /deep/ .manu{
			position: fixed;
			bottom: .4rem;
			font-size: 0.3rem;
		}
	}
	.box{
		display: none !important;
	}
</style>