<template>

	<div id="coat">
		<temp headtxt="个人信息"></temp>
		<div class="main">
			<div class="histitle">请输入您的个人信息</div>
			<div class="detail">
				<div class="content">
					<div class="item">
						<div class="label">姓名</div><input v-model="patientName" type="text" name="" placeholder="请输入" id="" value="" />
					</div>
					<div class="item">
						<div class="label">身份证号</div><input v-model="patientIdNumber" maxlength="18" type="text" placeholder="请输入" />
					</div>
					<div class="item sex" @click="toggle($event)">
						<div class="label">性别</div>
						<div class="option" :class="{on:patientSex=='1'}">男</div>
						<div class="option" :class="{on:patientSex=='0'}">女</div>
					</div>
					<div class="item">
						<div class="label">年龄</div><input type="text" placeholder="请输入" />
					</div>
					<div class="item">
						<div class="label">联系方式</div><input v-model="patientPhone" type="text" placeholder="请输入" />
					</div>
					<div class="item">
						<div class="label">住址</div><textarea v-model="patientAddress" name="" rows="2" cols=""></textarea>
					</div>
				</div>

			</div>
		</div>
		<btn class='next' @click.native='gonext' fragment="下一步"></btn>
		<!--<div class="manu">
			跳过
		</div>-->

	</div>

</template>
<script>
	import temp from "components/headline/headline.vue"
	import btn from "components/stuff/btn.vue"
	import { isType } from 'utils/util'
	import vue from 'Vue'
	export default {

		name: 'info',
		components: {
			temp,
			btn,

		},
		data() {
			return {
				patientName: '',
				patientIdNumber: '',
				patientPhone: '',
				patientAddress: '',
				patientSex: '1'

			}
		},
		methods: {
			gonext() {
//				if(!isType(this.patientName, 'cnName')) {
//                      this.alert("姓名不能为空且只能为中文")
//				}else
				if(!isType(this.patientIdNumber, 'idNo')){
					this.alert("身份证不能为空或格式错误")
				}else if(false){
					this.alert('联系方式错误')
				}else{
					var FileEstablishment={
						serialNo:Math.floor(Math.random()*1000),
						patientName:this.patientName,
						patientIdNumber:this.patientIdNumber,
						patientPhone:this.patientPhone,
						patientAddress:this.patientAddress,
						patientSex:this.patientSex
					}
					sessionStorage.setItem("FileEstablishment",JSON.stringify(FileEstablishment))
					window.location.href='./medhis.html'
				}

			},
			toggle(e) {
				switch(e.target.innerText) {
					case "男":
						this.patientSex = '1'
						break;
					case "女":
						this.patientSex = '0'
						break;
					default:
						break;
				}
			},
			alert(msg) {
				this.alertDefault({
					text: msg,
					rowButton:false,
					leftButtonText:'取消',
					rightButtonText: '确定'

				})
			}
		},
		created() {

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
		display: flex;
		margin-top: 0.7rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		.histitle {
			font-size: 0.36rem;
			text-align: center;
			margin-bottom: 0.2rem;
			width: 100%;
			height: 1em;
		}
		.content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			font-size: 0.32rem;
			.item {
				display: flex;
				flex-direction: row;
				height: 0.9rem;
				line-height: 0.9rem;
				margin-top: 0.2rem;
				.label {
					width: 10vw;
					text-align: right;
					margin-right: 0.3rem;
				}
				input {
					background: #FFFFFF;
					border: 1px solid #666666;
					border-radius: 12px;
					width: 26vw;
					padding-left: 0.1rem;
					font-size: 0.32rem;
				}
				textarea {
					width: 46vw;
					border: 1px solid #666666;
					border-radius: 12px;
					font-size: 0.32rem;
				}
			}
			.sex {
				.option {
					width: 10vw;
					height: 0.8rem;
					line-height: 0.8rem;
					color: #3C9BFF;
					border-radius: 12px;
					border: 0.02rem solid #3C9BFF;
					text-align: center;
					box-sizing: border-box;
					margin-right: 0.2rem;
					background: #fff;
				}
				.on {
					background: #3C9BFF;
					border-radius: 12px;
					color: #fff;
					border-radius: 12px;
				}
			}
		}
	}
	
	.next {
		margin-left: 37%;
		/*position: absolute;
		bottom: 0.6rem;*/
		margin-top: 0.5rem;
	}
	
	.manu {
		width: 2.28rem;
		height: 0.8rem;
		font-size: 0.32rem;
		border: 3px solid #FC9452;
		border-radius: 6px;
		text-align: center;
		line-height: 0.8rem;
		color: #FC9452;
		position: absolute;
		right: 0.8rem;
		bottom: 0.6rem;
	}
</style>