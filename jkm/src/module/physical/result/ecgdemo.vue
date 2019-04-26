<template>
	<div class="ecgfur">
		<div class="btngroup">
			<div class="btn btn1" @click="$emit('promote',0)">
				<img src="../../../assets/refresh.png" />
				<div>刷新</div>
			</div>
			<div class="btn btn2" @click="print">
				<img src="../../../assets/printing.png" />
				<div>样张打印</div>
			</div>

		</div>
		<img :src="mode==0?require('../../../assets/ecgdemo.png'):require('../../../assets/ecg-six.png')" />
		<div class="line">
			<div class="left" @click="toggle($event)">
				<div :class="{on:mode==0}">心电模式十二导</div>
				<div :class="{on:mode==1}">心电模式六导</div>
			</div>
			<div class="right" @click="startthirdapp">
				开始测量
			</div>
		</div>
		<div class="printmeun" v-show="show_print">
		<div class="print_content">
			<img class="print_content_main" src="@/assets/ecgsample.png">
			<img class="print_content_del" src="@/assets/close.png" @click="closePrint">
		</div>
	</div>
	</div>
</template>

<script>
	import vue from "vue"
	import { printingReport } from "API/requst"
	export default {
		props: ['detact', 'personId', 'recordId'],
		data() {
			return {
				mode: 0,
				localdetact: this.detact,
				show_print: false,
			}

		},
		methods: {
			toggle(e) {
				switch(e.target.innerText) {
					case "心电模式十二导":
						this.mode = 0
						break;
					case "心电模式六导":
						this.mode = 1
						break;
						defaut:
							break
				}
			},
			startthirdapp() {
				window.android.startThirdAPP()
			},
			print() {
				var vm = this;
				vm.show_print = true;
				printingReport({
					recordId: vm.recordId,
					padDeviceCode: 'P1',
					personId: vm.personId,
					type: 'ECG'
				}).then(res => {

				})
			},
			closePrint(){
		this.show_print = false;
	}
		},
		created() {

		},
		mounted() {

		},
		inject: ['getresult'],

		watch: {
			//			detact:function(val){
			//				if(val['ecg']){
			//					this.$emit('promote',0)
			//				}
			//			}
		},
		deactivated() {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.ecgfur {
		padding: 0.3rem 1.34rem;
		box-sizing: border-box;
		text-align: center;
		position: relative;
		.btngroup {
			position: absolute;
			right: 0.6rem;
			display: flex;
			flex-direction: column;
			.btn {
				width: 1.5rem;
				height: 1.5rem;
				margin-bottom: 0.3rem;
				border: 0.02rem solid #3C9BFF;
				border-radius: 0.2rem;
				justify-content: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 0.28rem;
				color: #3C9BFF;
				img {
					width: 0.8rem;
					margin-bottom: 0.05rem;
				}
			}
		}
		&>img {
			width: 80%;
		}
		.line {
			display: flex;
			margin-top: 0.1rem;
			font-size: 0.4rem;
			justify-content: center;
			margin-top: 0.5rem;
			.left {
				display: flex;
				overflow: hidden;
				div {
					border-radius: 12px;
					padding: 0 0.25rem;
					color: #FC9452;
					line-height: 0.9rem;
					text-align: center;
					margin-right: 0.2rem;
				}
				.on {
					background: #FC9452;
					color: #FFFFFF;
				}
			}
			.right {
				width: 36%;
				line-height: 0.9rem;
				background: #3C9BFF;
				border-radius: 12px;
				text-align: center;
				color: #fff;
			}
		}
	}
	
	.printmeun {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
	}
	
	.printmeun .print_content {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border-radius: 2%;
		width: 80%;
		height: 80%;
		margin: auto;
		background: #fff;
		padding: 5%;
		box-sizing: border-box;
	}
	
	.printmeun .print_content_main {
		width: 100%;
		height: 100%;
	}
	
	.printmeun .print_content_del {
		width: .54rem;
		height: .54rem;
		position: absolute;
		right: 2%;
		top: 3%;
	}
</style>