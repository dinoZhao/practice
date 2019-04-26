<template>

	<div id="coat">
		<temp headtxt="个人信息"></temp>
		<div class="main">
			<div class="left">
				<div v-if="!status">
					<img class="swing" src="../../../assets/personal_swing.png" />
					<div class="explain">
						刷身份证示意
					</div>
				</div>
				<div v-if="status">
					<idcard :name='name' :info="info"></idcard>

				</div>

			</div>
			<div class="right">
				<div @click="change" class="">
					请输入以下信息
				</div>
				<div class="tel">
					<label for="">联系方式</label><input v-model="patientPhone" type="text" maxlength="11" name="" placeholder="请输入" id="" value="" />
				</div>
				<div class="address">
					<label for="">住址</label><textarea v-model="patientAddress" name="" rows="3" placeholder="请输入" cols=""></textarea>
				</div>
			</div>
		</div>
		<btn class='next'  @click.native="next" fragment="下一步"></btn>
		<div @click="manu" class="manu">
			手动建档
		</div>

	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	import { isType } from 'utils/util'
	import { getFileEstablishment } from "API/requst"
	import idcard from './idcard.vue'
	import vue from "vue"
	export default {

		name: 'personal',
		components: {
			temp,
			btn,
			idcard
		},
		data() {
			return {
				status: false,
				info:{},
				name:'xiaoming',
				patientPhone:'',
				patientAddress:''
			}
		},
		methods: {
			manu() {
				window.location.href = './info.html'
			},
			getfile() {
				return getFileEstablishment({
					"serialNo": Math.floor(Math.random() * 1000),
					"padDeviceCode": "P1"
				})
			},
			change(){
//				vue.set(this.info,"patientName",'5')
//				this.name='xiaohong'
			},
			next(){
				if(false){
					this.alert('联系方式不能为空或格式错误')
				}else{
					var FileEstablishment={
						serialNo:Math.floor(Math.random()*1000),
						patientName:this.info.patientName,
						patientIdNumber:this.info.patientIdNumber,
						patientPhone:this.patientPhone,
						patientAddress:this.patientAddress,
						patientSex:this.info.patientSex=="男"?"1":'0',
						nickUrl:this.info.headUrl
					}
					sessionStorage.setItem("FileEstablishment",JSON.stringify(FileEstablishment))
					window.location.href='./medhis.html'
				}
			},
				alert(msg) {
				this.alertDefault({
					text: msg,
					rowButton: true,

				})
			}
		},
		created() {
			this.showLoading()
			var self = this
			var interval = setInterval(function() {
				self.getfile().then(function(res) {
					if(res.patientIdNumber) {
						self.status = true
						self.info=res
						clearInterval(interval)
						self.hideLoading()
					}
				})
			}, 1000)
		},
		mounted() {

		}
	}
</script>
<style scoped="scoped" lang="scss">
	#coat {
		overflow: hidden;
	}
	
	.main {
		height: 5rem;
		display: flex;
		margin-top: 21.6vh;
	}
	
	.main>.left {
		width: 40%;
		border-right: 1px solid #D9D9D9;
		display: inline-flex;
		justify-content: center;
		align-items: flex-end;
		flex-direction: column;
		img.swing {
			width: 3.67rem;
			height: 4.32rem;
			margin-right: 1.86rem;
		}
		.explain {
			font-size: 0.32rem;
			margin-top: -20px;
			margin-right: 1.86rem;
			text-align: right;
		}
		
	}
	
	.main>.right {
		font-size: 0.36rem;
		width: 60%;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 0.59rem;
		.address {
			textarea {
				width: 60%;
				vertical-align: text-top;
				font-size: 0.36rem;
				padding: 10px;
				border-radius: 12px;
				border: 1px solid #666666;
			}
		}
		input {
			font-size: 0.36rem;
			padding: 10px;
			border-radius: 12px;
			border: 1px solid #666;
		}
		label {
			font-weight: normal;
			display: inline-block;
			width: 2rem;
			text-align: right;
			margin-right: 0.2rem;
		}
		.tel {
			margin: 0.4rem 0;
		}
	}
	
	.next {
		margin-left: 37%;
		margin-top: 1rem;
	}
	
	.manu {
		width: 2.28rem;
		height: 0.8rem;
		font-size: 0.32rem;
		border: .02rem solid #FC9452;
		border-radius: 6px;
		text-align: center;
		line-height: 0.8rem;
		color: #FC9452;
		float: right;
		margin-right: 0.8rem;
        margin-top: -0.8rem;
	}
</style>