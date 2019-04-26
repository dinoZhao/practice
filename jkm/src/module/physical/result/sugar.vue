<template>
	<div class="temfur">
		<div class="dial">
			<div style="color: #7F807F;font-size: 0.64rem;">
				血糖
			</div>
			<div style="font-size: 1.1rem; color: #333;">
             {{localdetact.value}}
			</div>
			<div class="oc">mmol/L</div>
			<img src="../../../assets/sugar1.png" />
		</div>
		<div class="status" @click="toggle($event)">
		<div style="font-size: 0.4rem;">血糖检测时您的状态：</div>
		<div class="btn" v-bind:class="{on:status}">空腹</div>
		<div  class="btn"  v-bind:class="{on:!status}">餐后</div>
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
		name: 'temperature',
		components: {

		},
		data() {
			return {
             status:true,
             localdetact:{}
			}
		},
		methods: {
		toggle(e){
			switch (e.target.innerText){
				case "空腹":
				this.status=true
					break;
					case "餐后":
				this.status=false
					break;
				default:
					break;
			}
		},
		next(){
				this.showtoast('保存成功')
				this.$emit('nexttab','体温',true)
			}
		},
		created() {
			var vm = this;
			
		},
		mounted() {

		},
		 activated(){
        	var self=this
        	self.getresult()
        	self.localdetact=self.detact["Glu"]||{}
        	if(self.detact['Glu']){
//				self.status=self.detact['Glu'].state=="空腹"?true:false	
				}
			interval = setInterval(function() {
				self.getresult()
				self.localdetact=self.detact["Glu"]||{}
				if(self.detact['Glu']){
//				self.status=self.detact['Glu'].state=="空腹"?true:false	
				}
				
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
			overflow: hidden;
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
		.status{
			float: left;
			margin-top: 0.6rem;
			display: flex;
			line-height: 0.9rem;
			.btn{
				
			border-radius: 12px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.4rem;
			margin: 0 0.3rem;
			color: #333;
			}
			.on{
				background: #FC9452;
				color: #fff;
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