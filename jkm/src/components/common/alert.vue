<template>
	<div id="alert-win" v-show="isShow">
		<div class="alert-shadow" @click="close"></div>
		<div id="alert-main">
			<div class="alert-title" v-show="hasTitle">{{title}}</div>
			<div class="alert-text">{{text}}</div>
			<div id="alert-footer" v-show="rowButton" @click="close">{{rowButtonText}}</div>
			<div class="alert-button-group" v-show="!rowButton">
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
				isModal: false,//是否为模态窗
                hasTitle: true,
                title: '提示',
				text: 'Noop',
				
				rowButton: true,
				rowButtonText: '我知道了',
				rowButtonCallback: null,
				
				leftButtonText: '取消',
				leftButtonCallback: null,
				leftTextColor: '#000',
				
				rightButtonText: '确定',
				rightButtonCallback: null,
				rightTextColor: '#000',
				
				isShow: false
			}
		},
		
		methods: {
			show (params) {
                //若传入的是一个字符串，则为默认样式
                if (typeof params === 'string') {
					this.text = params
				} else if (typeof params === 'object') {
                    this.isModal = params.isModal || this.isModal
                    this.hasTitle = (typeof params.hasTitle === 'undefined') ? this.hasTitle : params.hasTitle
                    this.title = params.title || this.title
                    this.text = params.text || ''
                    this.rowButton = (typeof params.rowButton === 'undefined') ? this.rowButton : params.rowButton
                    this.rowButtonText = params.rowButtonText || this.rowButtonText
                    this.rowButtonCallback = params.rowButtonCallback || null
                    this.leftButtonText = params.leftButtonText || this.leftButtonText
                    this.leftButtonCallback = params.leftButtonCallback || null
                    this.leftTextColor = params.leftTextColor || this.leftTextColor
                    this.rightButtonText = params.rightButtonText || this.rightButtonText
                    this.rightButtonCallback = params.rightButtonCallback || null
                    this.rightTextColor = params.rightTextColor || this.rightTextColor
                }
				
				this.isShow = true;
			},
			
			close (e) {
				let targetNodeId = e.target.id
				this.isShow = (targetNodeId === 'alert-footer' || targetNodeId === 'alert-button-left' || targetNodeId === 'alert-button-right') ? false : this.isModal
				switch (targetNodeId) {
					case 'alert-footer':
						if (typeof this.rowButtonCallback === 'function')
							this.rowButtonCallback()
						break;
					case 'alert-button-left':
						if (typeof this.leftButtonCallback === 'function')
							this.leftButtonCallback()
						break;	
					case 'alert-button-right':
						if (typeof this.rightButtonCallback === 'function')
							this.rightButtonCallback()
						break;	
				}
			},

			end () {
				this.isShow = false
			}
			
		}
		
	}
</script>

<style scoped>
	#alert-win{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
        z-index: 2;
	}
	#alert-win .alert-shadow{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 3;
	}
	#alert-main {
		position: absolute;
		width: 74%;
		top: 35%;
		left: 13%;
		border-radius: .12rem;
		box-shadow: 0 .24rem .48rem 0 rgba(0,0,0,.3);
		background: #fff;
		z-index: 4;
	}
	.alert-title, #alert-footer{
		line-height: 2.6;
		text-align: center;
		font-size: .3rem;
	}
	.alert-title{
		border-bottom: 1px solid #ddd;
	}
	.alert-text{
		text-align: center;
		padding: .5rem .2rem;
		font-size: .28rem;
	}
	#alert-footer{
		color: #d43c33;
		border-top: 1px solid #ddd;
	}
	.alert-button-group{
		border-top: 1px solid #ddd;
	}
	.alert-button-group span{
		display: inline-block;
		width: 48%;
		line-height: 2.6;
		text-align: center;
		font-size: .3rem;
	}
	.alert-button-group #alert-button-left{
		border-right: 1px solid #ddd;
	}
</style>
