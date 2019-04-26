<template>
	<div class="temfur">
		<div class="dial">
			<div style="color: #7F807F;font-size: 0.64rem;">
				体温
			</div>
			<div style="font-size: 1.1rem; color: #333;">
				{{localdetact.value}}
			</div>
			<div class="oc">℃</div>
			<img src="../../../assets/temperature.png" />
		</div>
		<div class="save" @click="next">
			保存
		</div>
	</div>
</template>

<script>
	var interval;
	export default {
         props: ['detact'],
        inject: ['getresult'],
        methods:{
			next(){
				this.showtoast('保存成功')
			}
		},
		data() {
			return{
				localdetact:{}
			}
		},
		 activated(){
        	var self=this
        	self.getresult()
        	self.localdetact=self.detact["Temperature"]||{}
			interval = setInterval(function() {
				self.getresult()
				self.localdetact=self.detact["Temperature"]||{}
			}, 2000)
				
        },
	  deactivated(){
		clearInterval(interval)
	}
	}
</script>

<style lang="scss" scoped="scoped">
	.temfur {
		width: 100%;
		padding: 0.6rem;
		position: relative;
		width: calc(100% - 1.2rem);
		.dial {
			height: 31.2vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
			border: 1px solid #d9d9d9;
			.oc {
				font-size: 0.28rem;
				background: #3C9BFF;
				color: #FFFFFF;
				width: 1.4rem;
				line-height: 0.4rem;
				border-radius: 30px;
				text-align: center;
			}
			img {
				width: 3.1rem;
				height: 3.02rem;
				opacity: 0.08;
				position: absolute;
				bottom: -0.4rem;
				right: -0.2rem;
			}
		}
		.save {
			background: #3C9BFF;
			border-radius: 12px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.4rem;
			float: right;
			margin-top: 0.6rem;
			color: #fff;
		}
	}
</style>