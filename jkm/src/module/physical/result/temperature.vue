<template>
	<div class="temfur">
		<div class="dial">
			<div style="color: #7F807F;font-size: 0.64rem;">
				体温
			</div>
			<div style="font-size: 1.1rem; color: #333;">
				{{localdetact.value}}
			<img class="icon" v-if="localdetact.status&&localdetact.status!=='Normal'" :src="localdetact.status=='Lower'?icon[0]:icon[1]"/>
			</div>
			<div class="oc">℃</div>
			<img src="../../../assets/temperature.png" />
		</div>
		<div class="suggest" style="width: calc(100%);margin-top: 0.6rem;">
			<div v-for="item in localdetact.suggestions">
				{{item}}
			</div>
		</div>
		<div class="save cliect" @click="next">
			确认
		</div>
		<queryhis></queryhis>
	</div>
</template>

<script>
	var interval;
   import queryhis from './queryHis'
	export default {
         props: ['detact','icon'],
        inject: ['getresult'],
        methods:{
			next(){
				this.showtoast('保存成功')
				this.$emit('nexttab','BMI',true)
			}
		},
		components:{
			queryhis
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
		padding: 0.4rem;
		position: relative;
		width: calc(100% - 0.8rem);
		.dial {
			height: 18.2vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
			border: 1px solid #d9d9d9;
			&>div:first-child{
				font-size: 0.32rem !important;
			} 
			&>div:nth-child(2){
				font-size: 0.62rem !important;
			}
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
			border-radius: 5px;
			width: 2.3rem;
			line-height: 0.9rem;
			text-align: center;
			font-size: 0.3rem;
			float: right;
			margin-top: 0.3rem;
			color: #fff;
			margin-bottom: 0.6rem;
		}
	}
</style>
