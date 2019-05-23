<template>
	<div class="ecgfur">
		<div class="btngroup">
			<div class="btn btn1" @click="$emit('promote',0,1)">
				<img src="../../../assets/refresh.png" />
				<div>刷新</div>
			</div>
			<div class="btn btn2" @click="print">
				<img src="../../../assets/printing.png" />
				<div>样张打印</div>
			</div>

		</div>
		<ignore :preindex="0"></ignore>
		<img :src="mode==0?require('../../../assets/ecgdemo.png'):require('../../../assets/ecg-six.png')" />
		<div class="line">
			<div class="file" style="display: none;">
				手动输入
				<input type="file" class='fileinput' accept="image/*" placeholder="照相" capture='camera'>
			</div>
			<div class="left" @click="toggle($event)">
				<div :class="{on:mode==0}">心电模式十二导</div>
				<div :class="{on:mode==1}">心电模式六导</div>
			</div>
			<div class="right cliect" @click="startthirdapp">
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
	import { printingReport, savePhysicalExamData } from "API/requst"
	import ignore from './ignore.vue'
	import manu from './manu.vue'
   var interval;
	export default {
		props: ['detact', 'personId', 'recordId'],
		inject: ['getresult', "tab"],
		data() {
			return {
				mode: 0,
				localdetact: {},
				show_print: false,
			}

		},
		components: {
			ignore,
			manu
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
				var self = this

				if(sessionStorage.getItem('padDeviceCode') == 'P3') {
					this.alertDefault({
						text: '信息盒未连接，心电功能暂不可用',
						rowButton: true,
					})
				} else {
					window.android.showXindian()
				}

			},
			print() {
				var vm = this;
				vm.show_print = true;
				printingReport({
					recordId: vm.recordId,
					padDeviceCode: sessionStorage.getItem('padcode'),
					personId: vm.personId,
					type: 'ECG'
				}).then(res => {

				})
			},
			closePrint() {
				this.show_print = false;
			},
			//			manu(para){
			//				this.manualinput(para)
			//			}
		},
		created() {

		},
		mounted() {
			var self = this
			document.getElementsByClassName('fileinput')[0].addEventListener('change', function() {
				var reader = new FileReader();
				reader.onload = function(e) {
					//调用图片压缩方法：compress();
					savePhysicalExamData({
						hospitalCode: sessionStorage.getItem("hospitalCode"),
						medicalRecordFolderId: self.recordId,
						exams: [{
							recordTime: new Date().getTime(),
							type: 'ecg',
							value: e.target.result.split('base64,')[1],
							unit: 'base64',
							condition: ''
						}]
					}).then(function(res) {
						self.$emit('promote', 0, 1)
					})
				};
				reader.readAsDataURL(this.files[0]);

			}, false);
		},

		deactivated() {
        clearInterval(interval)
		},
		activated() {
			var self=this;
						if(sessionStorage.getItem('padDeviceCode')=='P3'){
							this.alertDefault({
						text: '信息盒未连接，心电功能暂不可用',
						rowButton: true,
					})
			}else{
				
					interval = setInterval(function() {
						self.getresult()
						console.log(self.detact)
						if(self.detact['ecg']&&self.detact['ecg'].ReportUrl) {
							clearInterval(interval)
							self.$emit('promote', 0, 1)
						}
					}, 2000)
										
		  }
		},
	}
</script>

<style scoped="scoped" lang="scss">
	$lan:#3C9BFF;
	.ecgfur {
		padding: 0.3rem;
		box-sizing: border-box;
		position: relative;
		height: 100%;
		.btngroup {
			position: absolute;
			right: 0.6rem;
			display: flex;
			flex-direction: column;
			display: none;
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
			margin-left: 0.5rem;
			height: 70%;
		}
		.line {
			width: 100%;
			padding: 0 0.7rem;
			box-sizing: border-box;
			position: absolute;
			bottom: .4rem;
			left: 0;
			display: flex;
			margin-top: 0.1rem;
			font-size: 0.3rem;
			justify-content: flex-end;
			.file {
				width: 2.3rem;
				line-height: 0.9rem;
				color: $lan;
				border: 0.02rem solid $lan;
				border-radius: 0.12rem;
				text-align: center;
				margin-right: 0.5rem;
				flex-shrink: 0;
				position: relative;
				input {
					width: 100%;
					height: 100%;
					opacity: 0;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
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
				width: 30%;
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
