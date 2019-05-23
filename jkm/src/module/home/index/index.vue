<template>
<div class="index">
  <div class="main">
    <!-- <head>
      <img class="head_logo" src="@/assets/index_head_logo.png" alt>
      <div class="head_right">
        <img class="doctor_headurl" :src="doctorMsg.headUrl||require('@/assets/headUrl.png')">
        <span class="doctor_name">{{doctorMsg.docName}}</span>
        <div class="today_task" @click="openTodayTask">
          <img src="../../../assets/calendar.png">
          <span>今日任务</span>
        </div>
        <div class="out_set">
          <span @click="doctorSetting">设置</span>
          <b>|</b>
          <span @click="loginAgain">注销</span>
        </div>
      </div>
    </head> -->
    <headTop />
    <div class="content">
      <div class="left">
        <div class="top" v-show="hadIdCard">
          <img class="head_url" :src="patientMsg.headUrl||'http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg'">
          <div class="personal_msg" v-show="patientMsg.patientName">
            <span style="margin-right:.32rem;">{{patientMsg.patientName}}</span>
            <span>{{patientMsg.patientSex}}&nbsp;&nbsp;{{patientMsg.patientAge}}岁</span>
          </div>
          <div class="telphone">
            <input type="text" maxlength="11" :value="patientMsg.patientPhone" disabled>
            <img src="@/assets/edit.png" alt @click="changePersonMsg">
          </div>
          <div class="subtitle">
            <h6>既往病史</h6>
            <p>{{patientMsg.medicalHistory}}</p>
          </div>
          <div class="subtitle" @click="openWaiting">
            <h6>待办事项<span style="background:#FF0000;" v-if="waitingList.length"></span></h6>
            <p>{{waitTodo}}</p>
          </div>
          <div class="finished" @click="endTakacare">诊疗完毕</div>
        </div>
        <div class="top" v-show="!hadIdCard">
          <img class="nocard" src="@/assets/home_index_charge.png">
          <p>先刷身份证后就医</p>
          <div class="button" @click="establishmentBySelf">手动建档</div>
        </div>
        <img class="logo" src="@/assets/home_index_xinxia.png" alt>
      </div>
      <div class="right">
        <swiper :options="swiperOption"  ref="mySwiper">
          <!-- slides -->
          <swiper-slide>
            <div class="scroll_x move">
              <div
                class="item"
                v-for="(item, index) in items"
                :key="index"
              > 
                <img class="bkg" :src="item.src" @click.stop="clickItem(index)">
                <span @click.stop="clickItem(index)">{{item.name}}</span>
              </div>
              <img class="swiper-next" src="@/assets/more_right.png" alt="">
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="scroll_x">
              <div class="item" v-for="(item, index) in moreItems" :key="index+'i'">
                <img class="bkg" :src="item.src" @click.stop="clickItem(index+6)">
                <span @click.stop="clickItem(index+6)">{{item.name}}</span>
              </div>
              <img class="swiper-prev" src="@/assets/more_left.png" alt="">
            </div>
          </swiper-slide>
          <!-- Optional controls -->
        </swiper>
      </div>
      <div class="waiting" v-show="showWaiting">
        <div style="width:100%;">
          <div class="number">
            您有 {{waitingNum}} 条待办事项
            <img src="@/assets/close.png" @click="closeWaitPage">
          </div>
          <div class="waiting_list" v-for="(item,index) in waitingList" :key="index">
            <div class="date">
              <p>待办事项</p>
              <div>{{item.name}}</div>
            </div>
            <div class="date">
              <p>计划时间</p>
              <div>{{item.planTime}}</div>
            </div>
            <div v-bind:class="['button',{'active':item.type=='exam'||item.startChat}]" @click="openNextPage(item.type)">
              {{item.type=='exam'?"开始检测":"候诊"}}
              <span
                class="rest_time"
                v-if="item.type=='outpatient'&&!item.startChat"
              >还有{{item.restTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task_info" v-show="showToadyTask">
      <div class="task_element">
        <div class="task_el_tit">
          今日任务
          <img src="@/assets/close.png" alt @click="closeTodayTask">
        </div>
        <div class="task_flex">
          <div class="task_el_local">
            <div class="el_local_tit">体检人数</div>
            <div class="el_local_num1">{{examCount}}</div>
            <div class="el_local_rest">
              <p>
                <span>已处理</span>
                <span>{{doneExamCount}}</span>
              </p>
              <p>
                <span>未处理</span>
                <span>{{undoneExamCount}}</span>
              </p>
            </div>
          </div>
          <div class="task_el_local">
            <div class="el_local_tit">远程门诊人数</div>
            <div class="el_local_num1" style="color: #FC9452;">{{outpatientCount}}</div>
            <div class="el_local_rest">
              <p>
                <span>已处理</span>
                <span>{{doneOutpatientCount}}</span>
              </p>
              <p>
                <span>未处理</span>
                <span>{{undoneOutpatientCount}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="task_work">
          <div :class="['task_work_tit',{'active':todayTaskActOne}]" @click="todaySubTit(0)">健康体检</div>
          <div :class="['task_work_tit',{'active':!todayTaskActOne}]" @click="todaySubTit(1)">远程问诊</div>
        </div>
        <div class="subtitle">
          <span>计划时间</span>
          <span>姓名</span>
          <span>性别</span>
          <span>套餐</span>
          <span>状态</span>
        </div>
        <div class="scroll_y">
          <div class="subtitle sub_list" v-for="(item,index) in todayTasks" :key="index">
            <span>{{item.examinationDate||item.startTime}}</span>
            <span>{{item.name||item.patientName}}</span>
            <span>{{item.gender||item.patientGender}}</span>
            <span>{{item.setMeal}}</span>
            <span
              :class="{wait:item.status=='Success',cancel:item.status=='Canceled'}"
             v-if="item.status">{{item.status=='Success'?"未完成":item.status=='Finish'?'已完成':'已取消'}}</span>
            <!-- 状态(Success:预约成功,Finish:体检完成,Canceled：已取消) -->
            <span
              :class="{wait:item.patientStatus=='Pending',cancel:item.patientStatus=='Canceled'}"
             v-if="item.patientStatus">{{item.patientStatus=='Pending'?"未完成":item.patientStatus=='Finish'?'已完成':'已取消'}}</span>
            <!-- 状态(Pending:预约成功,Finish:体检完成,Canceled：已取消) -->
          </div>
        </div>
      </div>
    </div>
    <div class="task_info" id="mod_player" v-show="showVideo"></div>
    <img src="@/assets/close.png" class="close_video" v-show="showVideo" @click="stopVideo">
  </div>
</div>
</template>
<script>
import { readPatientMsg, getTodayTasks, getSomethingDo,checkArchives,rakeCareEnd } from "API/requst";
import headline from "../../../components/headline/headline.vue";
import headTop from "../../../components/common/headTop.vue";
import { dateFormat,getURLParameter } from "utils/util";
import 'swiper/dist/css/swiper.css'     //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'utils/play'
import $ from 'jquery'

export default {
  name: "index",
  data() {
    return {
      swiperOption:{
        notNextTick: true,
        preventClicksPropagation: true,//阻止click冒泡。拖动Swiper时阻止click事件。
        //左右点击
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
      },    //轮播图信息
      doctorMsg: {},
      patientMsg: {},
      showMore: true,
      items: [
        { name: "远程门诊", src: require("@/assets/mod-1.png") },
        { name: "疾病筛查", src: require("@/assets/mod-2.png") },
        { name: "健康体检", src: require("@/assets/mod-3.png") },
        { name: "快速检测", src: require("@/assets/mod-7.png") },
        { name: "药品配送", src: require("@/assets/mod-4.png") },
        { name: "健康档案", src: require("@/assets/mod-5.png") },
      ],
      moreItems: [
        { name: "慢病管理", src:require("@/assets/patient_manage.png")},
        { name: "家庭医生/随访", src: require("@/assets/mod-8.png") },
        { name: "优才计划", src: require("@/assets/mod-6.png") },
        { name: "政策宣传", src: require("@/assets/mod-9.png") },
        { name: "使用说明", src:require("@/assets/Instructions.png")},
      ],
      hadIdCard: false,     //是否建档
      isAllowInterval: true,    //是否可以轮询
      // 视频播放
      showVideo: false,
      //待办事项
      showWaiting: false,
      waitingNum: 1,
      waitingList: [],
      waitTodo: '暂无',
      //今日任务
      showToadyTask: false, //是否展示今日任务
      todayTaskActOne: true,
      examCount: 0, //体检人数
      doneExamCount: 0, //已处理体检人数
      undoneExamCount: 0, //未处理体检人数
      medicalExaminers: [], //体检人员列表
      todayTasks: [], //展示的今日任务列表
      outpatientCount: 0, //远程门诊人数
      doneOutpatientCount: 0, //已处理门诊人数
      undoneOutpatientCount: 0, //未处理门诊人数
      appointments: [],     //远程门诊列表
        
      personId: '',   //病人id
      patientIdNumber:'',   //病人身份证
      padcode:''
    };
  },
  methods: {
    clickItem(index) {
      switch (index) {
        case 0:
          window.location.href ='../remoteclinic/reservation.html?index=3';
          break;
        case 1:
          if (!this.personId) {
            window.location.href = "../bookbuild/personal.html";
            return 
          }
          window.location.href = '../screening/screeninghome.html?personId='+this.personId+'&index=6';
          break;
        case 2:
          if (!this.personId) {
            window.location.href = "../bookbuild/personal.html";
            return 
          }
          window.location.href ='../healthyCheckup/healthyCheckupHome.html?personId='+this.personId+'&index=5'
          break;
        case 3:
          window.location.href = '../rapidetection/rapidhome.html'
          break;
        case 4:
          window.location.href = 'http://apitest.cipmr.cn/distribution/index'
          // 清除历史栈记录
          history.pushState(null, null, document.URL);
          window.addEventListener("popstate", function() {
            history.pushState(null, null, document.URL);
          });
          break;
        case 5:
          // if (!this.personId) {
          //   window.location.href = "../bookbuild/personal.html";
          //   return 
          // }
          window.location.href = "../healthrecord/healthhome.html?personId="+this.personId+'&index=2';
          break;
        case 6:
          this.construction()
          break;
        case 7:
          this.construction()
          break;
        case 8:
          window.location.href='./excellentPlan.html?index=9'
          break;
        case 9:
          window.android.startPolicyPropaganda()
          break;
        case 10:
          this.showVideo = true
          this.playing()
          break;  
      }
    },
    doctorSetting(){
      this.construction()
    },
    endTakacare(){
      var vm = this;
      rakeCareEnd({idNumber: vm.patientIdNumber,padDeviceCode: vm.padcode||sessionStorage.getItem('padcode'),serialNo: '',}).then(data=>{
        // console.log(data)
        if(data.resultCode=='success'){
          vm.personId =''
          vm.patientIdNumber =''
          vm.hadIdCard =false
          vm.isAllowInterval = true
          vm.interVal()
        }
      }).catch(err=>{console.log(err.data.resultMessage)})
    },
    changePersonMsg(){
      window.location.href = '../bookbuild/noPerson.html?index=11'
    },
    closeWaitPage() {
      this.showWaiting = false;
      this.isAllowInterval = true
      this.interVal()
    },
    openTodayTask() {
      this.showToadyTask = true;
      var vm = this;
      vm.isAllowInterval = false
      vm.showWaiting = false
      getTodayTasks({ doctorId: vm.doctorMsg.doctorId}).then(
        res => {
          // console.log(res);
          vm.examCount = res.examCount;
          vm.doneExamCount = res.doneExamCount;
          vm.undoneExamCount = res.undoneExamCount;
          var arr = res.medicalExaminers;
          if(arr&&arr.length){
            res.medicalExaminers.map((value, index) => {
              arr[index].examinationDate = dateFormat(
                value.examinationDate,
                "Y-m-d H:i"
              );
              // arr[index].setMeal =
              //   value.setMeal == "base" ? "基础套餐" : "优选体检";
            });
          }
          vm.medicalExaminers = arr;
          vm.todayTasks = arr;
          vm.outpatientCount = res.outpatientCount
          vm.doneOutpatientCount = res.doneOutpatientCount
          vm.undoneOutpatientCount = res.undoneOutpatientCount
          var arrT = res.appointments
          if(arrT.length){
            res.appointments.map((value,index)=>{
              arrT[index].startTime = dateFormat(value.startTime,"Y-m-d H:i")
              arrT[index].patientStatus = value.status
              arrT[index].status =null
            })
          }
          vm.appointments = res.appointments
        }
      ).catch(err=>{
        console.log(err.data.resultMessage)
      });
    },
    closeTodayTask() {
      this.showToadyTask = false;
      this.isAllowInterval = true
      this.interVal()
    },
    todaySubTit(index) {
      this.todayTaskActOne = !index;
      if(index){
        this.todayTasks = this.appointments
      }else{
        this.todayTasks = this.medicalExaminers
      }
    },
    establishmentBySelf() {
      this.isAllowInterval = false
      window.location.href = "../bookbuild/info.html?index=11";
    },
    openWaiting() {
      var vm = this;
      if (vm.waitingNum) {
        vm.showWaiting = true;
        vm.isAllowInterval = false
        vm.showToadyTask = false
      }
    },
    getPatientMsg(){
      var vm = this;
      var docMsg = JSON.parse(sessionStorage.getItem("doctorMsg"));
      vm.doctorMsg = docMsg;
      readPatientMsg({ serialNo: "", padDeviceCode:vm.padcode||sessionStorage.getItem('padcode'),thirdUniqueId:docMsg.doctorId,personId:vm.personId}).then(res => {
        // console.log(res)
        if (res.resultCode == "success") {
          vm.patientMsg = res;
          if(res.patientIdNumber){
            getSomethingDo({ idNumber: res.patientIdNumber,thirdUniqueId:docMsg.doctorId,personId:res.personId }).then(data => {
              // console.log(data);
              vm.waitingNum = data.size;
              if (data.size) {
                var arr = data.todoList;
                if(arr&&arr.length){
                  data.todoList.map((value, index) => {
                    if(value.type=='outpatient'&&value.planTime<(Date.now()+30*60*1000)){   //30分钟内允许接入
                      arr[index].startChat = true
                    }else if(value.type=='outpatient'){
                      arr[index].restTime = new Date(Date.now()-value.planTime).getHours()+'时'+new Date(Date.now()-value.planTime).getMinutes()+'分钟'
                    }
                    arr[index].planTime = dateFormat(value.planTime, "Y-m-d H:i");
                  });
                }
                vm.waitingList = arr;
                vm.waitTodo = data.todo||'暂无';
              }
            }).catch(err=>{
              console.log(err)
            });
            if(!vm.patientIdNumber){
              vm.checkHadFils(res.patientIdNumber)
              vm.patientIdNumber = res.patientIdNumber
            }else{
              vm.hadIdCard = true
            }
          }else if(vm.patientIdNumber){
            vm.checkHadFils(vm.patientIdNumber)
          }else{
            vm.hadIdCard = false
          }
        }else{
          vm.hadIdCard = false
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    checkHadFils(idNumber){
      var vm = this;
      checkArchives({idNumber: idNumber,}).then(data=>{
        // console.log(data)
        vm.hadIdCard = data.status
        if(data.personId){
          vm.personId = data.personId
          vm.hadIdCard = true
          sessionStorage.setItem('personId',data.personId)      //病人id
        }else{
          vm.hadIdCard = false
          window.location.href ='../bookbuild/personal.html'
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    openNextPage(Type){
      if(Type=='outpatient'){
        window.location.href ='../remoteclinic/reservation.html?index=3';
      }
      // if(Type=='exam'){
      // }
    },
    loginAgain(){
      window.location.href = '../user/login.html'
      sessionStorage.clear()
    },
    interVal(){
      var vm = this;
      if(vm.hadIdCard||!vm.isAllowInterval){
        return false
      }else{
        setTimeout(()=>{
          vm.interVal()
        },2000)
      }
      vm.getPatientMsg()
    },
    playing(){
      var livePlayer = new ump.Player();
      var params = {
        autostart:true, //是否自动播放
        file:"http://fczb.ufile.ucloud.com.cn/xzyy%2Fxzyy-20190312.mp4",//文件 url
        markname:"视频文字水印" //视频上的随机文字水印
      };
      livePlayer.create({
        width : '100%',
        height : '100%',
        modId : "mod_player",
        params : params
      })
      livePlayer.setFullscreen(true)
      livePlayer.play()
    },
    stopVideo(){
      var livePlayer = new ump.Player();
      var params = {
        autostart:false, //是否自动播放
        file:"http://fczb.ufile.ucloud.com.cn/chest%2F20190129%2Faa49379eb0754be9f990fb85bb3644bc.mp4",//文件 url
        markname:"视频文字水印" //视频上的随机文字水印
      };
      livePlayer.create({
        width : '100%',
        height : '100%',
        modId : "mod_player",
        params : params
      })
      livePlayer.stop()
      this.showVideo = false
    }
  },
  components: {
    headline,
    swiper,
    swiperSlide,
    headTop
  },
  created(){
    var idNumber = getURLParameter('patientIdNumber'),vm = this;
    var personId = getURLParameter('personId')
    if(idNumber){
      vm.patientIdNumber = idNumber; 
    }else[
      vm.patientIdNumber =''
    ]
    if(personId){
      vm.personId = personId; 
    }else{
      vm.personId =''
    }
    vm.interVal();
    try {
			var padcode = window.android.getPadCode();
	  	vm.padcode = padcode;
		} catch(err) {
			console.log(err);
		}
  },
  beforeMount() {
    var vm = this;
    // vm.getPatientMsg()
  },
  mounted() {
    var vm = this;
  },
  destroyed() {
    
  },
};
</script>
<style lang='scss' scope>
.index {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.main {
  height: 100%;
  width: 100%;
  display: inline-block;
  position: relative;
  head {
    height: 1rem;
    background-color: rgba(60, 155, 255, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head_logo {
      height: 0.5rem;
      margin-left: .28rem;
    }
    .head_right {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 0.32rem;
      color: #3c9bff;
      letter-spacing: 0;
      .doctor_headurl {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 0.6rem;
        margin-right: 0.2rem;
      }
      .doctor_name {
        font-family: PingFangSC-Medium;
        font-size: 0.32rem;
        color: #333333;
        letter-spacing: 0;
        margin-right: 0.28rem;
        font-weight: 600;
      }
      .today_task {
        width: 2.2rem;
        height: 0.66rem;
        line-height: 0.66rem;
        text-align: center;
        border: 0.02rem solid #3c9bff;
        border-radius: 0.12rem;
        margin-right: 0.5rem;
        img {
          vertical-align: middle;
          width: 0.44rem;
        }
      }
      .out_set {
        font-family: PingFangSC-Medium;
        font-size: 0.32rem;
        color: rgba(60, 155, 255, 0.3);
        margin-right: 0.4rem;
        letter-spacing: 0;
        span {
          display: inline-block;
          letter-spacing: 0;
          font-family: PingFangSC-Medium;
          font-size: 0.32rem;
          color: #3c9bff;
          letter-spacing: 0;
        }
      }
    }
  }
  .content {
    background: url("../../../assets/home_index_bg.png") no-repeat center center;
    background-size: cover;
    height: 100%;
    display: flex;
    position: relative;
    .left {
      width: 4rem;
      height: 100%;
      display: inline-block;
      .top {
        width: 4rem;
        height: 81.9%;
        background: rgba(60, 155, 255, 0.1);
        border-radius: 0 0.12rem 0.12rem 0;
        margin-top: 0.7rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .head_url {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 0.9rem;
          margin-top: 0.5rem;
        }
        .personal_msg {
          margin-top: 0.23rem;
          font-family: PingFangSC-Medium;
          font-size: 0.32rem;
          color: #333;
          letter-spacing: 0;
        }
        .telphone {
          height: 0.42rem;
          display: flex;
          align-items: center;
          margin-top: 0.18rem;
          input {
            border: none;
            background: none;
            outline: none;
            width: 1.91rem;
            font-family: PingFangSC-Medium;
            font-size: 0.28rem;
            color: #333333;
            letter-spacing: 0;
            margin-right: 0.27rem;
            line-height: .38rem;
          }
          img {
            width: 0.72rem;
            height: 0.72rem;
          }
        }
        .subtitle {
          text-align: center;
          margin-top: 0.4rem;
          h6 {
            font-family: PingFangSC-Regular;
            font-size: 0.32rem;
            color: #666666;
            letter-spacing: 0;
            line-height: 0.38rem;
            display: inline-block;
            position: relative;
            span{
              display:inline-block;
              width: .12rem;
              height: .12rem;
              border-radius: .08rem;
              position: absolute;
              right: -.18rem;
              top: .04rem;
            }
          }
          p {
            font-family: PingFangSC-Medium;
            font-size: 0.26rem;
            color: #333333;
            text-align: left;
            letter-spacing: 0;
            line-height: 0.38rem;
            margin-top: 0.1rem;
            padding: 0 .2rem;
          }
        }
        .finished {
          width: 3.2rem;
          height: 0.8rem;
          line-height: 0.8rem;
          background: rgba(60, 155, 255, 0.6);
          border-radius: 0.12rem;
          font-family: PingFangSC-Medium;
          font-size: 0.36rem;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          margin-top: 0.7rem;
        }
        .nocard {
          margin-top: 0.77rem;
          width: 3.3rem;
          height: 3.89rem;
          margin-right: 0.34rem;
        }
        p {
          margin-top: 0.3rem;
          font-family: PingFangSC-Regular;
          font-size: 0.32rem;
          color: #333333;
          letter-spacing: 0;
          line-height: 0.45rem;
        }
        .button {
          width: 2.28rem;
          height: 0.8rem;
          line-height: 0.8rem;
          margin-top: 0.41rem;
          background: rgba(60, 155, 255, 0.6);
          border-radius: 0.06rem;
          font-family: PingFangSC-Medium;
          font-size: 0.36rem;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
        }
      }
      .logo {
        margin-top: 0.26rem;
        margin-left: 0.2rem;
        width: 3.79rem;
        height: 0.5rem;
      }
    }
    .right {
      width: calc(100% - 4.16rem);
      height: 100%;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      position: relative;
      display: flex;
      overflow-x: scroll;
      .scroll_x{
        width: 100%;
        box-sizing: border-box;
        padding-left: .4rem;
        position: relative;
        &:nth-of-type(1){
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
        }
        .swiper-next{
          width: .74;
          height: 1.54rem;
          position: absolute;
          right: 2%;
          top: 39%;
        }
        flex-shrink: 0;
        .swiper-prev{
          width: .74rem;
          height: 1.54rem;
          position: absolute;
          left: .3rem;
          top: 39%;
        }
      }
      .item {
        width: 3.4rem;
        height: 3.4rem;
        display: inline-block;
        position: relative;
        margin-left: 4.5%;  //.9rem
        margin-top: 5%;
        // &:nth-of-type(7),&:nth-of-type(8),&:nth-of-type(9) {
        //   margin-bottom: 0.6rem;
        // }
        .bkg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 100%;
          text-align: center;
          font-family: PingFangSC-Medium;
          font-size: 0.48rem;
          color: #ffffff;
          letter-spacing: 0;
          height: .6rem;
          line-height: 0.6rem;
          z-index: 9;
        }
      }
    }
    .waiting {
      position: absolute;
      right: 0;
      top: 0;
      width: calc(100% - 4.16rem);
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .number {
        width: 100%;
        height: 0.92rem;
        line-height: 0.92rem;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 0.36rem;
        color: #ffffff;
        letter-spacing: 0;
        margin-bottom: 0.27rem;
        img {
          width: 0.54rem;
          height: 0.54rem;
          float: right;
          margin-top: 0.16rem;
          margin-right: 12.485%;
        }
      }
      .waiting_list {
        margin: 0 auto;
        width: 75.03%;
        height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: #ffffff;
        border-radius: 0.25rem 0.3rem 0.3rem 0.3rem;
        margin-bottom: 0.6rem;
        .date {
          &:nth-of-type(1) {
            flex: 1;
            margin-left: 0.54rem;
          }
          &:nth-of-type(2) {
            margin-right: 1.7rem;
          }
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #666666;
            letter-spacing: 0;
            line-height: 0.38rem;
          }
          div {
            margin-top: 0.2rem;
            font-family: PingFangSC-Medium;
            font-size: 0.32rem;
            color: #333333;
            letter-spacing: 0;
            line-height: 0.38rem;
          }
        }
        .button {
          background: #eeeeee;
          color: #999999;
          border-radius: 0.12rem;
          width: 2.5rem;
          height: 1rem;
          text-align: center;
          line-height: 1rem;
          font-family: PingFangSC-Medium;
          font-size: 0.36rem;
          letter-spacing: 0;
          text-align: center;
          margin-right: 0.5rem;
          position: relative;
          .rest_time {
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #d43c33;
            letter-spacing: 0;
            position: absolute;
            left: 0;
            width: 100%;
            text-align: center;
            bottom: -0.5rem;
            line-height: 0.4rem;
          }
        }
        .active {
          background: #3c9bff;
          color: #ffffff;
        }
      }
    }
  }
  .task_info {
    position: absolute;
    left: 0;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
    text-align: center;
    .task_element {
      display: inline-block;
      padding: 0 0.53rem;
      box-sizing: border-box;
      width: 80.5%;
      height: 81%;
      margin-top: 0.75rem;
      background-color: #fff;
      border-radius: 0.12rem;
      .task_el_tit {
        width: 100%;
        height: 1.3rem;
        text-align: center;
        line-height: 1.4rem;
        font-family: PingFangSC-Medium;
        font-size: 0.36rem;
        color: #333333;
        letter-spacing: 0;
        position: relative;
        img {
          width: 0.54rem;
          height: 0.54rem;
          position: absolute;
          right: -0.1rem;
          top: 0.43rem;
        }
      }
      .task_flex {
        display: flex;
        justify-content: space-between;
      }
      .task_el_local {
        width: 48.28%;
        height: 1.7rem;
        border: 1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        .el_local_tit {
          font-family: PingFangSC-Medium;
          font-size: 0.36rem;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
        }
        .el_local_num1 {
          font-family: PingFangSC-Medium;
          font-size: 1rem;
          color: #3c9bff;
          letter-spacing: 0;
          text-align: center;
          margin-left: 0.2rem;
          margin-right: 0.6rem;
        }
        .el_local_rest {
          p {
            line-height: 0.5rem;
          }
          p span:nth-of-type(1) {
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
            margin-right: 0.25rem;
          }
          p span:nth-of-type(2) {
            font-family: PingFangSC-Medium;
            font-size: 0.36rem;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
          }
        }
      }
      .task_work {
        width: 100%;
        height: 0.85rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        margin-top: 0.18rem;
        box-sizing: border-box;
        text-align: left;
        .task_work_tit {
          display: inline-block;
          width: 1.92rem;
          height: 100%;
          box-sizing: border-box;
          font-family: PingFangSC-Regular;
          font-size: 0.32rem;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          line-height: .8rem;
        }
        .active {
          color: #3c9bff;
          border-bottom: 0.05rem solid #3c9bff;
        }
      }
      .subtitle {
        background-color: rgba(60, 155, 255, 0.05);
        height: 0.8rem;
        margin-top: 0.2rem;
        border-radius: 0.06rem;
        text-align: center;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        span {
          height: 100%;
          line-height: 0.8rem;
          font-family: PingFangSC-Medium;
          font-size: 0.32rem;
          color: #333333;
          letter-spacing: 0;
          &:nth-of-type(1) {
            width: 3.44rem;
          }
          &:nth-of-type(2) {
            flex: 1;
          }
          &:nth-of-type(3) {
            width: 1rem;
          }
          &:nth-of-type(4) {
            flex: 1;
          }
          &:nth-of-type(5) {
            width: 1.96rem;
          }
        }
      }
      .sub_list {
        background-color: #fff;
        margin-top: 0;
        .wait {
          color: #d43c33;
        }
        .cancel {
          color: #fc9452;
        }
      }
      .scroll_y {
        height: 2.6rem;
        overflow-y: scroll;
      }
    }
  }
  .close_video{
    position: absolute;
    right: .4rem;
    top: .3rem;
    width: .72rem;
    height: .72rem;
    z-index: 99;
  }
}
</style>
