<template>
  <div class="login" :style="styObj">
    <img class="img1" src="../../../assets/login_democratic_logo.png" alt>
    <div class="content">
      <div class="left">
        <img class="img2" src="../../../assets/login_hospital_explain.png" v-show="loginByPassword">
        <div class="write" v-show="loginByPassword">
          <span>用户名</span>
          <input type="text" placeholder="请输入用户名" v-model="userName">
        </div>
        <div class="write" v-show="loginByPassword">
          <span>密&nbsp;&nbsp;&nbsp;码</span>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="write" v-show="loginByPassword">
          <span></span>
          <button @click="readyGo">登录</button>
        </div>
        <div class="logo_idcard" v-show="loginByCard">
          <img class="guid" src="@/assets/login_guid_idcard.png">
          <p>刷身份证示意</p>
        </div>
      </div>
      <div class="right">
        <img class="img3" src="@/assets/login_face.png" @click="loginByFace">
        <img class="img4" src="@/assets/login_idcard.png" v-show="loginByPassword" @click="loginByIdcard" >
        <img class="img4" src="@/assets/login_bypassword.png" v-show="loginByCard" @click="byPassword">
      </div>
    </div>
    <!-- <div class="login-card" @click="loginByIdcard">使用身份证登录</div> -->
    <footer>
      <img class="imgf1" src="../../../assets/login_footer_logo.png" alt>
      <img class="imgf2" src="../../../assets/login_footer_text.png" alt>
    </footer>
    <div class="win-gif" v-if="isgif">
    	<div class="isgif-content">
    		<img src="https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5608213348" />
    	</div>
    </div>
  </div>
</template>
<script>
import { userLogin, readPatientMsg, rakeCareEnd, judgePadStandalone} from "API/requst";
import "utils/util";
var interTimer = null;

$(function() {
  //防止页面后退
  history.pushState(null, null, document.URL);
  window.addEventListener("popstate", function() {
    history.pushState(null, null, document.URL);
  });
});
export default {
  name: "login",
  components: { alert },
  data() {
    return {
      userName: "",
      password: "",
      isgif:false,
      loginByPassword: true,
      loginByCard: false,
      padcode: "",
      padCode: sessionStorage.getItem("padCode"), //padCode
      styObj: {
        height:'100%',
      },
    };
  },
  methods: {
    readyGo() {
      var self = this;
      var userName = self.userName.replace(/^\s*|\s*$/, ""),
        password = self.password.replace(/^\s*|\s*$/, "");
      if (!userName) {
        self.alertDefault({
          text: "请输入用户名",
          rowButton: false,
          leftButtonText: "取消",
          rightButtonText: "确定",
          isShowMenu: 'show'
        });
        return;
      }
      if (!password) {
        self.alertDefault({
          text: "请输入密码",
          rowButton: false,
          leftButtonText: "取消",
          rightButtonText: "确定",
          isShowMenu: 'show'
        });
        return;
      }
      var info = userName + "," + password;
      userLogin({
        username: userName,
        password: password
      }).then(data => {
          if (data.resultCode == "success") {
            sessionStorage.setItem("doctorId", data.doctorId); //mcsid
            var obj = {
              headUrl: data.headUrl,
              docName: data.name,
              doctorId: data.thirdUniqueId,
              province: data.province,
              city: data.city,
              area: data.area,
            };
            sessionStorage.setItem("doctorMsg", JSON.stringify(obj)); //医生信息
            if(window.android){
            		self.isgif = true;
            		setTimeout(function(){
            			self.isgif = false;
            			window.android ? window.android.getUserInfo(info) : "";
			            window.android ? window.android.getDocId(data.thirdUniqueId) : "";
			            window.android?window.android.loginSuccess():""
			            window.android?window.android.getDoctor(data.thirdUniqueId,data.headUrl,data.name):""
            			window.location.replace("../main/index.html?index=0");
            		},6500)
            }else{
            	window.location.replace("../main/index.html?index=0");
            }
          }
        })
        .catch(err => {
          self.alertDefault({
            text: err.data.resultMessage,
            rowButton: false,
            leftButtonText: "取消",
            rightButtonText: "确定",
            isShowMenu: 'show'
          });
        });
    },
    loginByIdcard() {
      var self = this;
      if (sessionStorage.getItem("padDeviceCode") == "P3") {
        self.alertDefault({
          text: "信息盒未连接，功能暂不可用",
          rowButton: true,
          isShowMenu: 'show'
        });
        return;
      }
      self.loginByPassword = false;
      self.loginByCard = true;
      interTimer = setInterval(() => {
        readPatientMsg({
          serialNo: "",
          padDeviceCode: self.padcode || sessionStorage.getItem("padcode")
        }).then(res => {
          // console.log(res);
          if (!res.patientIdNumber) {
            // self.alertDefault({
            //   text: "未检测到身份证",
            //   rowButton: false,
            //   leftButtonText: "取消",
            //   rightButtonText: "确定"
            // });
            return;
          }
          userLogin({
            idNumber: res.patientIdNumber
          })
            .then(data => {
              if (data.resultCode == "success") {
                sessionStorage.setItem("doctorId", data.doctorId); //mcsid
                var obj = {
                  headUrl: data.headUrl,
                  docName: data.name,
                  doctorId: data.thirdUniqueId
                };
                window.android? window.android.getDocId(data.thirdUniqueId): "";
                window.android?window.android.loginSuccess():""
                sessionStorage.setItem("doctorMsg", JSON.stringify(obj)); //医生信息
                rakeCareEnd({
                  idNumber: res.patientIdNumber,
                  padDeviceCode:self.padcode || sessionStorage.getItem("padcode"),
                  serialNo: ""
                })
                  .then(data => {
                    // console.log(data)
                    if (data.resultCode == "success") {
                      window.location.replace("../main/index.html?index=0");
                    }
                  })
                  .catch(err => {
                    console.log(err.data.resultMessage);
                  });
              }
            })
            .catch(data => {
              console.log(data);
              // self.alertDefault({
              //   text: data.data.resultMessage,
              //   rowButton: false,
              //   leftButtonText: "取消",
              //   rightButtonText: "确定",
              //   isShowMenu:false
              // });
            });
        });
      }, 1000);
    },
    byPassword() {
      this.loginByPassword = true;
      this.loginByCard = false;
      clearInterval(interTimer);
    },
    loginByFace() {
      this.construction();
      clearInterval(interTimer);
    }
  },
  created() {
    var vm = this;
    if (window.android) {
      window.android.hidePopu();
      window.android.hideLeftLayout();
      var padCode = window.android.getPadCode();
      sessionStorage.setItem("padCode", padCode);
      sessionStorage.setItem("padcode", padCode);
      vm.padcode = padCode;
      var userName = window.android.sendUserInfo();
      if (userName) {
        vm.userName = userName.split(",")[0];
      }
      var obj = {
      	"padDeviceCode":padCode
      }
      judgePadStandalone(obj).then(data=>{
      	var isStandalone = data.isStandalone;
      	if(isStandalone){
      		sessionStorage.setItem("padDeviceCode", "P3");
      	}else{
      		sessionStorage.setItem("padDeviceCode", "P1");
      	}
	    }).catch(err=>{
	    	vm.showtoast(err.data.resultMessage);
	      sessionStorage.setItem("padDeviceCode", "P1");
	    })
    } else {
      sessionStorage.setItem("padcode", "961ba23e7cce3976");
      sessionStorage.setItem("padCode", "961ba23e7cce3976");
      sessionStorage.setItem("padDeviceCode", "961ba23e7cce3976");
    }
    sessionStorage.setItem("hospitalCode", "FuCongKJXZ");
  },
  mounted() {
    var vm = this;
    setTimeout(()=>{
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      var box =document.getElementsByClassName("login")
      vm.$nextTick(function(){
        vm.styObj.height = box[0].clientHeight+'px'
      })
    },1000)
    window.android?window.android.getH5TitlePx(parseInt(document.body.clientWidth/1920*100)):''
//  vm.alertDefault({
//    text: width+'-'+height,
//    rowButton: false,
//    leftButtonText: "取消",
//    rightButtonText: "确定"
//  });
  }
};
</script>
<style lang="scss" scope>
.login {
  width: 100%;
  background: url("../../../assets/login_bg.png") no-repeat center center;
  background-size: cover;
  height: 100%;
  position: relative;
  .img1 {
    position: absolute;
    height: 0.9rem;
    left: 2.6%;
    top: 4.6%;
  }
  .content {
    width: 100%;
    display: flex;
    padding-top: 1.9rem;
    box-sizing: border-box;
    .login-card {
      padding-left: 10.1%;
      margin-top: 0.4rem;
      font-family: PingFangSC-Medium;
      font-size: 0.48rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      overflow: hidden;
    }
    .logo_idcard {
      text-align: center;
      .guid {
        width: 4.456rem;
        height: 5.224rem;
        margin-right: 6%;
      }
      p {
        font-family: PingFangSC-Medium;
        font-size: 0.48rem;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 0.65rem;
      }
    }
  }
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 78%;
  text-align: right;
  padding-right: 10%;
  box-sizing: border-box;
  .img2 {
    height: 1.06rem;
    margin-bottom: 0.63rem;
    margin-right: 2%;
  }
  .write {
    font-family: PingFangSC-Medium;
    font-size: 0.48rem;
    color: #ffffff;
    letter-spacing: 0;
    &:nth-of-type(2) {
      margin-top: 0.3rem;
    }
    &:nth-of-type(3) {
      margin-top: 0.3rem;
    }
    span {
      color: #fff;
      display: inline-block;
      margin-right: 0.4rem;
      width: 1.44rem;
    }
    input {
      height: 1rem;
      width: 6.6rem;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #999999;
      border-radius: 0.12rem;
      font-family: PingFangSC-Regular;
      font-size: 0.46rem;
      color: #333;
      letter-spacing: 0;
      padding-left: 0.41rem;
    }
    ::-webkit-input-placeholder {
      /*Chrome/Safari*/
      font-family: PingFangSC-Regular;
      font-size: 0.46rem;
      color: #999;
      letter-spacing: 0;
    }
    button {
      height: 1.2rem;
      width: 6.6rem;
      text-align: center;
      background-image: linear-gradient(0deg, #ff8b4b 0%, #ffa884 100%);
      border-radius: 0.12rem;
      font-family: PingFangSC-Medium;
      font-size: 0.48rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.65rem;
    }
  }
}
.right {
  display: inline-block;
  .img3 {
    display: block;
    width: 2.9rem;
    height: 2.9rem;
  }
  .img4 {
    margin-top: 0.4rem;
    width: 2.9rem;
    height: 2.9rem;
  }
}
footer {
  margin-top: 2.2%;
  display: flex;
  justify-content: space-between;
  padding: 0 2.6%;
  .imgf1 {
    width: 5.8rem;
    height: 0.76rem;
  }
  .imgf2 {
    width: 7.4rem;
    height: 0.9rem;
  }
}
/**/
.win-gif{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.6);
}
.win-gif .isgif-content{
	position: absolute;
	top: 0;
    right: 0;
    height: 100%;
    width: 100%;
}
.win-gif .isgif-content img{
	width: 100%;
    height: 100%;
    vertical-align: middle;
}
</style>
