<template>
  <div class="login">
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
        <img
          class="img4"
          src="@/assets/login_idcard.png"
          v-show="loginByPassword"
          @click="loginByIdcard"
        >
        <img
          class="img4"
          src="@/assets/login_bypassword.png"
          v-show="loginByCard"
          @click="byPassword"
        >
      </div>
    </div>
    <!-- <div class="login-card" @click="loginByIdcard">使用身份证登录</div> -->
    <footer>
      <img class="imgf1" src="../../../assets/login_footer_logo.png" alt>
      <img class="imgf2" src="../../../assets/login_footer_text.png" alt>
    </footer>
  </div>
</template>
<script>
import { userLogin, readPatientMsg,rakeCareEnd } from "API/requst";
import "utils/util";
var interTimer = null

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
      loginByPassword: true,
      loginByCard: false
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
          rightButtonText: "确定"
        });
        return;
      }
      if (!password) {
        self.alertDefault({
          text: "请输入密码",
          rowButton: false,
          leftButtonText: "取消",
          rightButtonText: "确定"
        });
        return;
      }
      var info = userName + "," + password;
      userLogin({
        username: userName,
        password: password
      })
        .then(data => {
          if (data.resultCode == "success") {
            if (window.android) {
              window.android.getUserInfo(info);
            }
            sessionStorage.setItem("doctorId", data.doctorId); //mcsid
            var obj = {
              headUrl: data.headUrl,
              docName: data.name,
              doctorId: data.thirdUniqueId
            };
            sessionStorage.setItem("doctorMsg", JSON.stringify(obj)); //医生信息
            window.location.href = "../home/index.html";
          }
        })
        .catch(err => {
          self.alertDefault({
            text: err.data.resultMessage,
            rowButton: false,
            leftButtonText: "取消",
            rightButtonText: "确定"
          });
        });
    },
    loginByIdcard() {
      var self = this;
      self.loginByPassword = false;
      self.loginByCard = true;
      interTimer = setInterval(()=>{
        readPatientMsg({ serialNo: "", padDeviceCode: "P1" }).then(res => {
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
          }).then(data => {
              if (data.resultCode == "success") {
                sessionStorage.setItem("doctorId", data.doctorId); //mcsid
                var obj = {
                  headUrl: data.headUrl,
                  docName: data.name,
                  doctorId: data.thirdUniqueId
                };
                sessionStorage.setItem("doctorMsg", JSON.stringify(obj)); //医生信息
                rakeCareEnd({idNumber: res.patientIdNumber,padDeviceCode: 'P1',serialNo: '',}).then(data=>{
                  // console.log(data)
                  if(data.resultCode=='success'){
                    window.location.href = "../home/index.html";
                  }
                }).catch(err=>{console.log(err.data.resultMessage)})
              }
            }).catch(data => {
              console.log(data)
              // self.alertDefault({
              //   text: data.data.resultMessage,
              //   rowButton: false,
              //   leftButtonText: "取消",
              //   rightButtonText: "确定"
              // });
            });
        });
      },1000)
    },
    byPassword() {
      this.loginByPassword = true;
      this.loginByCard = false;
      clearInterval(interTimer)
    },
    loginByFace(){
      this.construction()
      clearInterval(interTimer)
    }
  },
  created() {
    var vm = this;
    if (window.android) {
      var userName = window.android.sendUserInfo();
      if (userName) {
        vm.userName = userName.split(",")[0];
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scope>
.login {
  width: 100%;
  height: 100%;
  background: url("../../../assets/login_bg.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .img1 {
    position: absolute;
    height: 0.9rem;
    left: 2.6%;
    top: 4.6%;
  }
  .content{
    width: 100%;
    display: flex;
    padding-top: 2.2rem;
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
  padding-right: 2.86rem;
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
  padding:0 2.6%;
  .imgf1 {
    width: 5.8rem;
    height: 0.76rem;
  }
  .imgf2 {
    width: 7.4rem;
    height: 0.9rem;
  }
}
</style>
