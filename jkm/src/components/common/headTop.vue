<template>
<div id="head">
  <head>
    <img class="head_logo" src="@/assets/index_head_logo.png" alt>
    <div class="head_right">
      <div class="today_task" @click="openTodayTask">
        <img src="@/assets/calendar.png">
        <span>今日任务</span>
      </div>
      <img class="doctor_headurl" :src="doctorMsg.headUrl||require('../../assets/headUrl.png')">
      <span class="doctor_name">{{doctorMsg.docName}}</span>
      <div class="out_set">
        <span @click="doctorSetting">设置</span>
        <b>|</b>
        <span @click="loginAgain">注销</span>
      </div>
      <div class="electricity">
        <p :class="{bad_ele:delate>1000}"></p>
        <p :class="{opacity:delate>3000,bad_ele:delate>1000}"></p>
        <p :class="{opacity:delate>1000,bad_ele:delate>1000}"></p>
        <p :class="{opacity:delate>500,bad_ele:delate>1000}"></p>
        <span :class="['value',{bad_color:delate>1000}]">{{delate}}ms</span>
      </div>
    </div>
  </head>
  <div class="task_info" v-show="showToadyTask">
    <div class="task_element">
      <div class="task_el_tit">
        今日任务
        <img src="../../assets/close.png" alt @click="closeTodayTask">
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
            v-if="item.status"
          >{{item.status=='Success'?"未完成":item.status=='Finish'?'已完成':'已取消'}}</span>
          <!-- 状态(Success:预约成功,Finish:体检完成,Canceled：已取消) -->
          <span
            :class="{wait:item.patientStatus=='Pending',cancel:item.patientStatus=='Canceled'}"
            v-if="item.patientStatus"
          >{{item.patientStatus=='Pending'?"未完成":item.patientStatus=='Finish'?'已完成':item.patientStatus=='Revisiting'?'待回诊':'已取消'}}</span>
          <!-- 状态(Pending:预约成功,Finish:体检完成,Canceled：已取消) -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getTodayTasks } from "API/requst";
import { dateFormat } from "utils/util";

export default {
  name: "headTop",
  data() {
    return {
      doctorMsg: {},
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
      appointments: [], //远程门诊列表
      delate: "10"
    };
  },
  methods: {
    doctorSetting() {
      this.construction();
    },
    loginAgain() {
      var vm = this;
      vm.alertDefault({
        text: "注销当前账号吗？",
        rowButton: false,
        rightButtonCallback:function(){
          window.location.href = "../user/login.html";
          window.android ? window.android.cancellation() : "";
          sessionStorage.clear();
        }
      });
    },
    openTodayTask() {
      this.showToadyTask = true;
      var vm = this;
      window.android?window.android.hideLeftLayout():""
      getTodayTasks({ doctorId: vm.doctorMsg.doctorId })
        .then(res => {
          // console.log(res);
          vm.examCount = res.examCount;
          vm.doneExamCount = res.doneExamCount;
          vm.undoneExamCount = res.undoneExamCount;
          var arr = res.medicalExaminers;
          if (arr && arr.length) {
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
          vm.outpatientCount = res.outpatientCount;
          vm.doneOutpatientCount = res.doneOutpatientCount;
          vm.undoneOutpatientCount = res.undoneOutpatientCount;
          var arrT = res.appointments;
          if (arrT.length) {
            res.appointments.map((value, index) => {
              arrT[index].startTime = dateFormat(value.startTime, "Y-m-d H:i");
              arrT[index].patientStatus = value.status;
              arrT[index].status = null;
            });
          }
          vm.appointments = res.appointments;
        })
        .catch(err => {
          console.log(err.data.resultMessage);
        });
    },
    todaySubTit(index) {
      this.todayTaskActOne = !index;
      if (index) {
        this.todayTasks = this.appointments;
      } else {
        this.todayTasks = this.medicalExaminers;
      }
    },
    closeTodayTask() {
      this.todayTaskActOne = true;
      this.showToadyTask = false;
      window.android?window.android.showLeftLayout():""
    }
  },
  created() {
    var vm = this;
    window.android?vm.delate= window.android.getNetworkDelayMs():""
    var docMsg = JSON.parse(sessionStorage.getItem("doctorMsg"));
    vm.doctorMsg = docMsg;
  },
  mounted(){
    
  }
};
</script>
<style lang="scss" scoped>
#head {
  head {
    display: none;
    height: .8rem;
    background-color: rgba(60, 155, 255, 0.3);
    position: relative;
    // display: flex;
    justify-content: space-between;
    align-items: center;
    .head_logo {
      height: 0.4rem;
      margin-left: 0.28rem;
    }
    .head_right {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 0.3rem;
      color: #3c9bff;
      letter-spacing: 0;
      .doctor_headurl {
        width: 0.528rem;
        height: 0.528rem;
        border-radius: 0.6rem;
        margin-right: 0.2rem;
      }
      .doctor_name {
        font-family: PingFangSC-Medium;
        font-size: 0.3rem;
        color: #333333;
        letter-spacing: 0;
        margin-right: 0.28rem;
        font-weight: 600;
      }
      .today_task {
        width: 2.2rem;
        height: 0.56rem;
        line-height: 0.56rem;
        text-align: center;
        border: 0.02rem solid #3c9bff;
        border-radius: 0.12rem;
        margin-right: 0.5rem;
        font-size: 0.3rem;
        img {
          vertical-align: middle;
          width: 0.44rem;
        }
      }
      .out_set {
        font-family: PingFangSC-Medium;
        font-size: 0.3rem;
        color: rgba(60, 155, 255, 0.3);
        margin-right: 0.5rem;
        letter-spacing: 0;
        span {
          display: inline-block;
          letter-spacing: 0;
          font-family: PingFangSC-Medium;
          font-size: 0.3rem;
          color: #3c9bff;
          letter-spacing: 0;
        }
      }
      .electricity {
        display: inline-block;
        height: 0.42rem;
        line-height: 0.42rem;
        margin-right: 0.4rem;
        min-width: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        p {
          background-color: #2CA61E;
          width: 0.06rem;
          border-radius: 0.02rem;
          margin-bottom: .08rem;
          &:nth-of-type(1) {
            height: 0.1rem;
            margin-right: 0.04rem;
          }
          &:nth-of-type(2) {
            height: 0.2rem;
            margin-right: 0.04rem;
          }
          &:nth-of-type(3) {
            height: 0.3rem;
            margin-right: 0.04rem;
          }
          &:nth-of-type(4) {
            height: 0.4rem;
            margin-right: 0.12rem;
          }
        }
        .bad_ele{
          background-color: #D43C33;
        }
        .bad_color{
          color:#D43C33;
        }
        .opacity{
          opacity: .3;
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: 0.3rem;
          color: #666;
          color: #2CA61E;
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
    z-index: 99;
    text-align: center;
    .task_element {
      display: inline-block;
      padding: 0 0.53rem;
      box-sizing: border-box;
      width: 82.5%;
      height: 81%;
      background-color: #fff;
      border-radius: 0.12rem;
      margin-top: 0.75rem;
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
          line-height: 0.8rem;
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
}
</style>

