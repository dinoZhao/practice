<template>
	<div class="ecgfur">
		<div class="process">

			<img src="../../../assets/tempdemo.png" />
			<div class="below">
				<div>①将额枪器平行对准眉心</div>
				<div>②测量时距离1~3cm</div>
			</div>

		</div>

	</div>
</template>

<script>
	var interval;
	export default {
		inject: ['getresult'],
		props: ['detact'],
		activated() {
			var self = this
			if(this.detact['Temperature']) {
				this.$emit('promote', 4)
			} else {
				interval = setInterval(function() {
					self.getresult()
					if(self.detact['Temperature']) {
						clearInterval(interval)
						self.$emit('promote', 4)
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
			padding: 0.3rem 0.7rem 0 0.8rem;
			position: relative;
			.below {
				height: 30%;
				line-height: 2em;
				width: 30%;
				position: absolute;
				top: 0.2rem;
				right: 0.15rem;
				font-size: 0.35rem;
			}
			img {
				height: 95%;
			}
		}
	}
	.box{
		display: none !important;
	}
</style>