<template>
  <div id="index">
    <div class="inner">
      <div class="inner_top">
        <div class="inner_topLeft topLeft">
          <div class="Monthly">
            <div class="Monthly_left">
              <div class="data">
                <span>月度统计</span>
                <span v-if="month<=9">({{years}}-0{{month}})</span>
                <span v-if="month>9">({{years}}-{{month}})</span>
              </div>
              <ul>
                <li data-type="today" :class="{current_index:type==='today'}" @click="choose">今日</li>
                <li data-type="week" :class="{current_index:type==='week'}" @click="choose">每周</li>
                <li data-type="month" :class="{current_index:type==='month'}" @click="choose">本月</li>
              </ul>
            </div>
            <div class="Monthly_number">
              <ul>
                <li>
                  <span>健康检查</span>
                  <h2>{{checkupNum}}</h2>
                  <i></i>
                </li>
                <li>
                  <span>公卫服务</span>
                  <h2>{{serviceNum}}</h2>
                  <i></i>
                </li>
                <li>
                  <span>远程门诊</span>
                  <h2>{{outpatientNum}}</h2>
                  <i></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="inner_topRight topLeft">
          <div class="Tmission">
            <span>今日任务</span>
          </div>
          <div class="Pnumber">
            <div class="Pnumber_content">
              <div class="number_content">
                <div class="content_left">
                  <span>疾病筛查</span>
                  <h2>{{screening.actualNum}}</h2>
                </div>
                <div class="content_right">
                  <span>已处理 <i>{{screening.handled}}</i></span>
                  <span>未处理 <i>{{screening.unhandled}}</i></span>
                </div>
              </div>
              <div class="number_content">
                <div class="content_left">
                  <span>远程门诊</span>
                  <h2>{{outpatient.actualNum}}</h2>
                </div>
                <div class="content_right">
                  <span>已处理 <i>{{outpatient.handled}}</i></span>
                  <span>未处理 <i>{{outpatient.unhandled}}</i></span>
                </div>
              </div>
              <div class="number_content">
                <div class="content_left">
                  <span>随访人数</span>
                  <h2>{{followUp.actualNum}}</h2>
                </div>
                <div class="content_right">
                  <span>已处理 <i>{{followUp.handled}}</i></span>
                  <span>未处理 <i>{{followUp.unhandled}}</i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner_bottom">
        <div class="inner_top">
          <ul>
            <li :class="{active:isShow===true}" @click="chooseItem(true)">检测统计</li>
            <li :class="{active:isShow===false}" @click="chooseItem(false)">公卫统计</li>
          </ul>
        </div>
        <div class="inner_conent" v-show="isShow===true">
          <div class="inner_left">
            <ul>
              <li><span>心电检测</span><span>{{ecg}}</span></li>
              <li><span>血压检测</span><span>{{bloodPressure}}</span></li>
              <li><span>血氧检测</span><span>{{bloodOxygen}}</span></li>
              <li><span>血糖检测</span><span>{{bloodSugar}}</span></li>
              <li><span>体温检测</span><span>{{temperature}}</span></li>
              <li><span>BMI检测</span><span>{{bmi}}</span></li>
              <li><span>尿常规检测</span><span>{{urineRoutine}}</span></li>
              <li><span>血脂检测</span><span>{{bloodFat}}</span></li>
            </ul>
          </div>
          <div class="calendar">
            <div class="calendar_top"><span>{{years}}年{{month}}月</span></div>
            <div class="calendar_bottom">
              <h2>{{day}}</h2>
              <p>{{weekday[week]}}</p>
            </div>
          </div>
        </div>
        <div class="inner_conent" v-show="isShow===false">
          <div class="inner_left">
            <ul>
              <li><span>健康档案</span><span>{{archive}}</span></li>
              <li><span>健康教育</span><span>{{edu}}</span></li>
              <li><span>预防接种</span><span>{{vaccination}}</span></li>
              <li><span>0-6岁儿童</span><span>{{children}}</span></li>
              <li><span>孕产妇</span><span>{{gravida}}</span></li>
              <li><span>老年人</span><span>{{old}}</span></li>
              <li><span>慢性病</span><span>{{chronicDisease}}</span></li>
              <li class="long"><span>严重精神障碍</span><span>{{mentalDisorder}}</span></li>
              <li><span>结核病</span><span>{{tuberculosis}}</span></li>
              <li><span>中医药</span><span>{{tcm}}</span></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="calendar">
            <div class="calendar_top"><span>{{years}}年{{month}}月</span></div>
            <div class="calendar_bottom">
              <h2>{{day}}</h2>
              <p>{{weekday[week]}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="task_info" id="mod_player" v-show="showVideo"></div>-->
    <!--<img src="@/assets/close.png" class="close_video" v-show="showVideo" @click="stopVideo">-->
  </div>
</template>
<script>
  import {
    getMonthlyLists,
    getRecommend,
    getTodayMission,
    missionAccomplished,
    getTaskStatistics,
    getExamStatistics,
    getServiceStatistics
  } from 'API/requst';
  import 'utils/play.js'

  var livePlayer = new ump.Player();
  export default {
    data() {
      return {
        checkupNum: null,
        outpatientNum: null,
        serviceNum: null,
        courseList: [],
        showVideo: false,
        type: 'today',
        doctorId: JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId,
        padDeviceCode: sessionStorage.getItem('padcode'),
        examCount: '',
        doneExamCount: '',
        undoneExamCount: '',
        outpatientCount: '',
        doneOutpatientCount: '',
        undoneOutpatientCount: '',
        screening: {}, //疾病筛查
        outpatient: {}, //远程门诊
        followUp: {},  //随访计划
        years: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        week: new Date().getDay(),
        weekday: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        day: new Date().getDate(),
        ecg: '', //心电检测
        bloodPressure: '', //血压检测
        bloodOxygen: "", //血氧检测
        bloodSugar: '', //血糖检测
        temperature: '', //体温检测
        bmi: '', //bmi检测
        urineRoutine: '', //尿常规检测
        bloodFat: '', //血脂检测
        startTime: '', //检测统计开始时间
        endTime: '', //检测统计结束时间
        isShow: true,
        archive: '', // 档案
        edu: '', //健康教育
        vaccination: '', //预防接种
        children: '', //儿童
        gravida: '', //孕妇
        old: '', //老年人
        chronicDisease: '', //慢性病
        mentalDisorder: '', //精神障碍
        tuberculosis: '', //结核病
        tcm: '',//中医药

      }
    },
    methods: {
      getExam(params) {
        getExamStatistics(params).then(res => { //首页-检测统计
          console.log(res);
          let vm = this
          vm.ecg = res.ecg
          vm.bloodPressure = res.bloodPressure
          vm.bloodOxygen = res.bloodOxygen
          vm.bloodSugar = res.bloodSugar
          vm.temperature = res.temperature
          vm.bmi = res.bmi
          vm.urineRoutine = res.urineRoutine
          vm.bloodFat = res.bloodFat
          vm.startTime = res.startTime.toLocaleString()
          vm.endTime = res.endTime
        })
          .catch(err => {
            console.log(err);
          })
      },
      chooseItem(flag) {
        this.isShow = flag
        let params = {
          padDeviceCode: this.padDeviceCode,
          doctorId: this.doctorId
        }
        if (this.isShow) {
          // this.getExam(params)
          this.getExam(params)
        } else {
          getServiceStatistics(params).then(res => { //首页-公卫统计
            console.log(res);
            let vm = this
            vm.archive = res.archive
            vm.edu = res.edu
            vm.vaccination = res.vaccination
            vm.children = res.children
            vm.gravida = res.gravida
            vm.old = res.old
            vm.chronicDisease = res.chronicDisease
            vm.mentalDisorder = res.mentalDisorder
            vm.tuberculosis = res.tuberculosis
            vm.tcm = res.tcm
          })
            .catch(err => {
              console.log(err);
            })
        }
      },
      playing(index) {
        const {courseList} = this
        this.showVideo = true;
        setTimeout(function () {
          //设置传递给播放器的参数
          var params = {
            autostart: true, //是否自动播放
            file: index,//文件 url
            markname: "视频文字水印" //视频上的随机文字水印
          };
          livePlayer.onInited = function (info) {
            ump.log('播放器初始化完成！')
            for (var o in info) {
              ump.log(o + "=" + info[o]);
            }
            /************收到初始化完成得消息后才可调用flash播放器的方法************/
            //停止播放
            //player.stop();

            //获取当前播放状态，播放状态请参考player.onState里对应的值
            //var state = player.getState();
          };

          //播放状态通知
          livePlayer.onState = function (info) {
            if (!info || (info && typeof info.type == undefined)) {
              return;
            }

            ump.log("播放状态：" + info.type);

            switch (info.type) {
              //视频加载中，调用播放接口时触发
              case "loading":
                break;
              //视频播放中，视频从loading转为可开始播放状态时触发
              case "playing":
                break;
              //视频停止，一般为视频正常结束、用户手动点击停止按钮或外部调用stop
              case "stop":
                break;
            }
          };

          //播放器错误消息处理
          livePlayer.onError = function (info) {
            if (!info) {
              return;
            }

            if (info.type) {
              //不建议针对错误码做处理，用来做统计或定位问题使用
              ump.log("播放器错误码：" + info.type);
            }

            if (info.desc) {
              //显示错误提示给用户即可
              ump.log("播放器错误提示：" + info.desc);
            }
          };

          //用户主动触发的行为消息，通过代码调用的接口不响应此事件，html5版本无此消息
          livePlayer.onUserAction = function (info) {
            if (!info || (info && typeof info.type == undefined)) {
              return;
            }

            ump.log("用户主动触发的行为:" + info.type);

            switch (info.type) {
              //点击播放按钮
              case "playBtnClick":
                break;
              //点击暂停按钮
              case "pauseBtnClick":
                break;
              //点击全屏按钮
              case "fullscreen":
                break;
              //点击退出全屏按钮
              case "normalscreen":
                break;
              //点击静音按钮
              case "muteBtnClick":
                break;
              //点击取消静音按钮
              case "unmuteBtnClick":
                break;
              case "volumeChange":
                ump.log("变化后的音量" + info.value);
                break;
              default:
                ump.log("Unkown user action!");
            }
          };
          livePlayer.create({
            width: '100%',
            height: '100%',
            modId: "mod_player",
            params: params
          })
          //livePlayer.setFullscreen(true)
        }, 200)
      },
      stopVideo() {
        //var livePlayer = new ump.Player();
        livePlayer.stop()
        this.showVideo = false
      },
      choose(e) {
        // console.log(e.target.dataset.type)
        // this.type=e.target.dataset.type
        const type = e.target.dataset.type
        const {doctorId, padDeviceCode} = this
        this.getMonthlyLists(type, doctorId, padDeviceCode)
        this.type = type
      },
      getMonthlyLists(type, doctorId, padDeviceCode) {
        getMonthlyLists({type: type, doctorId: doctorId, padDeviceCode: padDeviceCode})
          .then(res => {
            console.log(res);
            this.checkupNum = res.checkupNum
            this.outpatientNum = res.outpatientNum
            this.serviceNum = res.serviceNum
          })
          .catch(error => {
            console.log(error);
          })
      },
      getTodayMissions(doctorId) {
        var self = this
        getTodayMission({doctorId: doctorId}).then(res => {
          // console.log(res);
          self.examCount = res.examCount
          self.doneExamCount = res.doneExamCount
          self.undoneExamCount = res.undoneExamCount
          self.outpatientCount = res.outpatientCount
          self.doneOutpatientCount = res.doneOutpatientCount
          self.undoneOutpatientCount = res.undoneOutpatientCount
        })
          .catch(error => {
            console.log(error);
          })
      }
    },
    mounted() {
      let params = {
        padDeviceCode: this.padDeviceCode,
        doctorId: this.doctorId
      }
      console.log(this.week);
      console.log(this.doctorId);
      this.getExam(params)
      // missionAccomplished(params).then(res=>{
      //   console.log(res);
      //   this.screening=res.screening
      //   this.service=res.service
      //   this.followUp=res.followUp
      // })
      //   .catch(error=>{
      //     console.log(error);
      //   })
      getTaskStatistics(params).then(res => { //首页-今日任务（数据统计）
        console.log(res);
        this.screening = res.screening
        this.outpatient = res.outpatient
        this.followUp = res.followUp
      })
        .catch(err => {
          console.log(err);
        })
      getRecommend().then(res => {
        // console.log(res);
        this.courseList = res.courseList
      }).catch(error => {
        console.log(error);
      })
      const {type, doctorId, padDeviceCode} = this
      this.getMonthlyLists(type, doctorId, padDeviceCode)
      this.getTodayMissions(doctorId)
      // this.getRecommends()
    },
    beforeMount() {
    }
  }
</script>
<style lang="less">
  @import "../less/index";

  #index {
    width: calc(100% - 200px);
    height: 100%;
    margin-left: 200px;
    .inner {
      width: 90%;
      margin: 0 auto;
      height: 100%;
      .inner_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        .topLeft {
          width: 47.5%;
          overflow: hidden;
        }
        .inner_topLeft {
          overflow: hidden;
          .Monthly_left {
            overflow: hidden;
            margin: 0.3rem 0;

            .data {
              float: left;
              span {
                font-size: 0.33rem;
                font-family: PingFangSC-Medium;
                font-weight: 700;
                vertical-align: middle;
                &:nth-child(1) {
                  color: #333333;
                }
                &:nth-child(2) {
                  color: #afafaf;
                  font-weight: normal;
                  margin-left: 0.05rem;
                }
              }
            }
            ul {
              float: right;
              overflow: hidden;
              li {
                float: left;
                color: #3c9bff;
                font-size: 0.26rem;
                margin-right: 0.22rem;
                padding: 0.1rem;
                &:nth-child(3) {
                  margin: 0;
                  padding-right: 0;
                }
                &.current_index {
                  border-bottom: 2px solid #3c9bff;
                }
              }
            }
          }
          .Monthly_number {
            ul {
              border: 1px solid #eeeeee;
              width: 100%;
              height: 3rem;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              li {
                width: 32%;
                box-sizing: border-box;
                text-align: center;
                height: 2.23rem;
                line-height: 0.93rem;
                position: relative;
                &:nth-child(3) {
                  i {
                    width: 0;
                    height: 0;
                  }
                }
                i {
                  width: .04rem;
                  height: 1rem;
                  background-color: #EEEEEE;
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
                span {
                  color: #333333;
                  font-size: 0.33rem;
                }
                h2 {
                  color: #3C9BFF;
                  font-size: 1rem;
                }
              }
            }
          }
        }
        .inner_topRight {
          .Tmission {
            margin: 0.32rem 0;
            span {
              color: #333333;
              font-family: PingFangSC-Medium;
              font-size: 0.33rem;
              font-weight: 700;
            }
          }
          .Pnumber {

            .Pnumber_content {
              border: 1px solid #eeeeee;
              width: 100%;
              height: 3rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-sizing: border-box;
              padding: .2rem 0;
              .number_content {
                width: 100%;
                height: .7rem;
                display: flex;
                justify-content: space-around;
                &:nth-child(2) {
                  .content_left {
                    h2 {
                      color: #FC9452;
                    }
                  }
                }
                &:nth-child(3) {
                  .content_left {
                    h2 {
                      color: #eb5454
                    }
                  }
                }
                .content_left {
                  width: 40%;
                  height: .7rem;
                  line-height: .7rem;
                  text-align: right;
                  display: flex;
                  justify-content: space-between;
                  h2 {
                    font-size: .8rem;
                    color: #3C9BFF;
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 0.1rem;
                  }
                  span {
                    font-size: 0.33rem;
                    display: inline-block;
                    height: .7rem;
                    line-height: .7rem;
                    vertical-align: middle;
                    width: 60%;
                  }
                }
                .content_right {
                  width: 35%;
                  span {
                    display: block;
                    font-size: 0.28rem;
                    i {
                      font-weight: bolder;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .inner_bottom {
        margin-top: .4rem;
        width: 100%;
        .inner_top {
          margin-bottom: 0.2rem;
          ul {
            li {
              float: left;
              font-size: 0.3rem;
              margin-right: 0.5rem;
              padding-bottom: 0.1rem;
              &.active {
                border-bottom: 3px solid #3C9BFF;
                font-weight: bolder;
              }
            }
          }
        }
        .inner_conent {
          width: 98%;
          margin: 0 auto;
          border: 1px solid #eeeeee;
          overflow: hidden;
          height: 2.5rem;
          padding: 0 2% 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .inner_left {
            width: 75%;
            ul {
              width: 100%;
              height: 1.5rem;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              align-items: center;
              li {
                width: 25%;
                font-size: .8vw;
                position: relative;
                &.long {
                  span {
                    &:nth-child(1) {
                      width: 12.3vw;
                      text-align: center;
                    }
                    &:nth-child(2) {
                      position: absolute;
                      left: 77%;
                    }
                  }
                }
                span {
                  font-size: 1.5vw;
                  vertical-align: middle;
                  display: inline-block;
                  &:nth-child(1) {
                    width: 77%;
                    text-align: right;
                  }
                  &:nth-child(2) {
                    color: #fc9452;
                    font-size: 1.8vw;
                    margin-left: 10%;
                    width: 13%;
                  }
                }
              }
            }
          }
          .calendar {
            width: 20%;
            height: 2.1rem;
            .calendar_top {
              width: 100%;
              height: 0.5rem;
              background-color: #3c9bff;
              border-radius: 5px 5px 0 0;
              line-height: 0.5rem;
              color: white;
              text-align: center;
              span {
                font-size: .25rem;
              }
            }
            .calendar_bottom {
              height: 1.6rem;
              border-radius: 0 0 5px 5px;
              background-color: #f5faff;
              width: 100%;
              text-align: center;
              border: 1px solid #3c9bff;
              box-sizing: border-box;
              h2 {
                font-size: 1rem;
                color: #3c9bff;
              }
              p {
                font-size: .3rem;
                color: #3c9bff;
              }
            }
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
    }
    .close_video {
      position: absolute;
      right: .4rem;
      top: .3rem;
      width: .72rem;
      height: .72rem;
      z-index: 99;
    }
  }
</style>
