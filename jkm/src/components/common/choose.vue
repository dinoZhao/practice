<template>
	<div id="alert-win" v-show="isShow">
		<div class="alert-shadow" @click="close"></div>
		<div id="alert-main">
			<div class="choosemodel">
				<div class="alert-text" :data-index='index' @click="tap" v-for="(item,index) in arr">{{item}}<img v-if="chooseindex==index" src="../../assets/already.png"/></div>
			</div>
			<div class="alert-button-group">
				<span id="alert-button-left" @click="close" :style="{'color': leftTextColor}">{{leftButtonText}}</span>
				<span id="alert-button-right" @click="close" :style="{'color': rightTextColor}">{{rightButtonText}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				arr: [],
				leftButtonText: '取消',
				cancelcb: null,
				leftTextColor: '#666',
				rightButtonText: '确定',
				confirmcb: null,
				rightTextColor: '#3c9bff',
				isShow: false,
				chooseindex:0
			}
		},
		
		methods: {
			show (params) {
				    this.arr=params.arr;
                    this.cancelcb= params.cancelcb || null
                    this.confirmcb = params.confirmcb || null
				
				this.isShow = true;
			},
			
			close (e) {
				let targetNodeId = e.target.id
				switch (targetNodeId) {
					case 'alert-button-left':
						if (typeof this.cancelcb === 'function'){
							this.cancelcb()
						}
							this.isShow = false
						break;	
					case 'alert-button-right':
						if (typeof this.confirmcb === 'function'){
							this.confirmcb()
						}
							this.isShow = false
						break;	
				}
			},
			tap(e){
			 this.chooseindex=e.target.dataset['index']
			}

			
		},
	}
</script>

<style scoped>
	#alert-win{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
    z-index: 11;
	}
	#alert-win .alert-shadow{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 11;
	}
	#alert-main {
		position: absolute;
		width:50%;
		top: 26%;
		left: 25%;
		border-radius: 0.4rem;
		box-shadow: 0 .24rem .48rem 0 rgba(0,0,0,.3);
		background: #fff;
		z-index: 11;
	}
	.choosemodel{
		padding: 0.7rem 0;
	}
	.alert-title, #alert-footer{
		line-height: 1.6;
		text-align: center;
		font-size: 0.44rem;
	}
	.alert-title{
		border-bottom: 1px solid #ddd;
		line-height: 2.4;
	}
	.alert-text{
		text-align: center;
		padding: .1rem 0.2rem;
		font-family: PingFangSC-Regular;
		font-size: .4rem;
		color: #666666;
		letter-spacing: 0;
		line-height: .4rem;
		height: 0.4rem;
	}
	.alert-text img{
		width: 1em;
		height: 1em;
		margin-left: 0.2rem;
		vertical-align: middle;
	}
	#alert-footer{
		color: #3c9bff;
		border-top: 1px solid #ddd;
		height: 1.06rem;
		line-height: 1.06rem;
	}
	.alert-button-group{
		border-top: 1px solid #ddd;
	}
	.alert-button-group span{
		display: inline-block;
		width: 48%;
		line-height: 1.05rem;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: .4rem;
		letter-spacing: 0;
	}
	.alert-button-group #alert-button-left{
		border-right: 1px solid #ddd;
	}
</style>
