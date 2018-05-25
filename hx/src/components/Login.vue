<template>
	<div style="height: 100%;width: 100%;">
		<div class="header">
			<img src="../assets/images/logo.png" alt="" /><span>欢迎登录</span>
		</div>
		<div class="hello">
			<div class="inner">
				<div class="left">
                 <!--<span>助力上进学员 圆梦理想职业</span>-->
				</div>
				<div class="right">
					<div>账 户 登 录</div>
					<div><input v-model="mobile" placeholder="请输入手机号" type="text" /></div>
					<!--<div><input id="code" v-model="code" readonly="readonly" placeholder="" type="text" /> <span :class="{gray:this.mobile.length!=11}" style="cursor: pointer;" @click="getCaptcha" ref="code">获取验证码</span></div>-->
					<div><input id="password" v-model="password" placeholder="请输入密码" type="password" /></div>
					<div><span style="cursor: pointer;" v-on:click="forget">忘记密码</span></div>
					<div id="login" style="cursor: pointer;" @click="login">登 录</div>
				
					<!--<div>暂无账户，立即<span style="cursor: pointer;" @click="register">注册</span></div>-->
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import API from '../api/api'
	export default {
		name: 'Index',
		data() {
			return {
				mobile: "",
				password: '',
				code: "",
				loginId: "",
				agree: true

			}
		},
		created: function() {
//			this.$store.commit('OFFLINE');
//			console.log(this.$store.state)
		},
		components: {
			
		},
		methods: {
			agreed() {
				if(this.agree == false) {
					this.agree = true
					document.getElementById("login").classList.remove("on")

				} else {
					this.agree = false
					document.getElementById("login").classList.add("on")

				}

			},
			forget: function() {
				this.$store.commit('SETCUE', ["", "1", "忘记密码", true])

			},
			register: function() {
//				this.$store.commit('SETCUE', ["", "1", "账户注册", true])

			},
			login: function() {
				if(document.getElementById("login").classList.contains("on")) {
					return
				}
				if(!/^1[34578]\d{9}$/.test(this.mobile)) {
					this.$store.commit('SETCUE', ["手机号码格式错误", "2", "提示", true])
					return false;
				}

				//     		{clientId: "18621506710",clientSecret: "12345678a"}
				if(this.mobile && this.password) {
					API.login({
						clientId: this.mobile,
						clientSecret: this.password
					}).then(data => {
						var accessToken = data.accessToken;
						localStorage.setItem('accessToken', accessToken);

						API.getProfile().then(data => {
							localStorage.setItem("profile", JSON.stringify(data.clientInfo))
							if(localStorage.getItem("preAuthUrl")) {
								location.href = localStorage.getItem("preAuthUrl");
								localStorage.removeItem("preAuthUrl")
								return
							}
							this.$router.push("/hx");

						}, (error) => {
							console.log(error)
						})

					})
				}
				if(this.mobile && this.code) {
					API.onlyLogin({
						loginId: this.loginId,
						mobile: this.mobile,
						smsCaptcha: this.code
					}).then(data => {

						var accessToken = data.accessToken;
						localStorage.setItem('accessToken', accessToken);

						API.getProfile().then(data => {
							localStorage.setItem("profile", JSON.stringify(data.clientInfo))
							if(localStorage.getItem("preAuthUrl")) {
								location.href = localStorage.getItem("preAuthUrl");
								localStorage.removeItem("preAuthUrl")
								return
							}
							this.$router.push("/hx");

						}, (error) => {
							console.log(error)
						})

					})
				}

			},
			getCaptcha() {

				//			验证码相关
				var that = this;
				if(this.$refs.code.classList.contains("gray")) {
					return
				}

				var count = 5;
				var countnum = setInterval(function() {
					count--;
					that.$refs.code.innerHTML = "还剩" + count + "秒";
					console.log(that.$refs.code)
					that.$refs.code.classList.add("gray");
					if(count == "0") {
						clearInterval(countnum)
						that.$refs.code.innerHTML = "重新发送"
						that.$refs.code.classList.remove("gray")
						return;
					}
				}, 1000)

				document.getElementById("code").setAttribute("placeholder", "请输入6位数短信验证码")
				document.getElementById("code").removeAttribute("readonly")
				API.getLoginId().then(data => {
					if(!!data.loginId) {
						var loginId = this.loginId = data.loginId;

						API.validateClientId({
							loginId: loginId,
							clientId: this.mobile
						}).then(data => {
							if(data.isExist == 1) {
								API.getCaptcha({
									loginId: loginId,
									mobile: this.mobile,
									code: 'Sms_ResetLoginPwdCaptcha'
								}).then(data => {
									console.log(data)
								})
							}

						})
					}

				})
			}

		}

	}
</script>

<style lang="scss" scoped="scoped">
.header{
	width: 1100px;
    margin: 0 auto;
    height: 80px;
    line-height: 80px;
    img{
    	vertical-align: middle;
    }
    span{
    	display: inline-block;
    width: 96px;
    height: 80px;
    line-height: 80px;
    vertical-align: middle;
    font-size: 24px;
    color: #666;
    margin-left: 10px;
    }
}
.hello{
		width: 100%;
		height: calc(100% - 174px);
		background:#999 url(../assets/images/bc.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		position: relative;
		&>div {
			width: 1100px;
			height: 100%;
			margin: 0 auto;
			position: relative;
			&>div {
				display: inline-block;
				height: 100%;
			}
			&>.left {
				width: 60%;
				background: url(../assets/images/hxlogo.png) no-repeat center 50%;
				color: #fff;
				text-align: center;
				span{
					font-size:38px ;
					width: 252px;
					height: 95px;
					display: inline-block;
				}
			}
			&>.left:after{
				content: "";
				width: 0;
				height: 100%;
				display: inline-block;
				vertical-align: middle;
			}
			&>.right {
				text-align: center;
				width: 39%;
				height: 380px;
				background: #fff;
				position: absolute;
				top: calc((100% - 380px)/2);
				&>div:nth-child(1) {
					margin: 30px 0 25px 0px;
					font-size: 20px;
				}
				&>div:nth-child(2) {
					width: 337px;
					margin: 0 auto;
					line-height: 44px;
					background: url(../assets/images/mobile.png) no-repeat left center;
					border: 1px solid #ddd;
					input {
						margin-left: 44px;
						height: 40px;
						border: none;
						width: 290px;
						outline: none;
						font-size: 14px;
					}
				}
		
				&>div:nth-child(3) {
					width: 337px;
					margin: 25px auto;
					line-height: 44px;
					background: url(../assets/images/password.png) no-repeat left center;
					border: 1px solid #ddd;
					input {
						margin-left: 44px;
						height: 40px;
						border: none;
						width: 290px;
						outline: none;
						font-size: 14px;
					}
				}
				&>div:nth-child(4) {
					width: 337px;
					height: 35px;
					font-size: 14px;
					text-align: right;
					line-height: 35px;
					margin: 0 auto;
					color: #477AAC;
				}
				&>div:nth-child(5) {
					width: 337px;
					height: 52px;
					background: #d43c33;
					font-size: 20px;
					line-height: 52px;
					color: #fff;
					margin: 15px auto 10px;
					border-radius: 5px;
				}
				&>div:nth-child(5).on {
					background: #fff;
					border: 1px solid #999;
					color: #999;
				}
		
			}
		}
}
</style>