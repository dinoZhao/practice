<template>
    <div id="panel">
      <div class="panel_content">
        <div class="title_top">
          <span>健康评价</span>
        </div>
        <div class="button_content">
          <span>健康评价</span>
          <input type="button" v-for="item of assessmentList"  :class="{active:bCheck===item.type}" @click="checkedes(item.type)"  :value="item.type">
          <p v-if="evaluationGuide.healthAbnormal" v-for="item of evaluationGuide.healthAbnormal">{{item}}</p>
        </div>
        <div class="title_top marginTop">
          <span>健康指导</span>
        </div>
        <div class="radio_content marginTop">
          <span class="title">健康指导</span>
          <div class="check_content">
            <div class="habits" v-for="(item,index) in guideList" data-index = "index" :key = "item.index" @click="changedrinkType(item.code,guideList,'healthGuide')">
              <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
            </div>
          </div>
        </div>
        <div class="radio_content marginTop">
          <span class="title hazards">危险因素控制</span>
          <div class="check_content smallWidth">
            <div class="habits" v-for="(item,index) in hazardsList" data-index = "index" :key = "item.index" @click="changedrinkType(item.code,hazardsList,'riskFactorControl')">
              <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
            </div>
            <div class="habits habites" v-for="(item,index) in hazardesList" data-index = "index" :key = "item.index" @click="changedrinkType(item.code,hazardesList,'riskFactorControl')">
              <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
            </div>
            <div class="weightLossGoal"><input type="tel" v-model="evaluationGuideList.weightLossGoal" placeholder="请输入"><span>kg</span></div>
            <div class="recommendedVaccination"><input type="text" v-model="evaluationGuideList.recommendedVaccination" placeholder="请输入疫苗种类"></div>
            <div class="riskFactorControlOther"><input type="text" v-model="evaluationGuideList.riskFactorControlOther" placeholder="请输入"></div>
          </div>
        </div>
        <div class="duty">
          <span class="text">体检日期</span>
          <span class="date">{{evaluationGuideList.recordTime | filterDate}}</span>
        </div>
        <div class="dutyName">
          <span>责任医生</span>
          <span v-if="evaluationGuideList.doctorName">{{evaluationGuideList.doctorName}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import {empty} from "../../../util/util";
    export default {
      props: ['evaluationGuide'],
      data() {
        return {
          date: '',
          bCheck: '',
          evaluationGuideList:
            {
              "healthAssessment": "",
              "healthAbnormal": [
              ],
              "recordTime": null,
              "doctorId": JSON.parse(sessionStorage.getItem('doctorMsg')).doctorId,
              "doctorName": JSON.parse(sessionStorage.getItem('doctorMsg')).docName,
              "healthGuide": [
              ],
              "riskFactorControl": [
              ],
              "weightLossGoal": "",
              "recommendedVaccination": "",
              "riskFactorControlOther": ""
            },
          assessmentList: [
            {code: '1', type: '无异常', check: false},
            {code: '2', type: '有异常', check: false},
          ],
          guideList: [
            {code: '1', type: '纳入慢性病患者健康管理', check: false},
            {code: '2', type: '建议复查', check: false},
            {code: '3', type: '建议转诊', check: false},
          ],
          hazardsList: [
            {code: '1', type: '戒烟', check: false},
            {code: '2', type: '健康饮酒', check: false},
            {code: '3', type: '饮食', check: false},
            {code: '4', type: '锻炼', check: false},
          ],
          hazardesList:[
            {code: '5', type: '减体重,目标', check: false},
            {code: '6', type: '建议接种疫苗', check: false},
            {code: '7', type: '其他', check: false},
          ]
        }
      },
      methods: {
        changedrinkType(code,diseasesList,type) {
          let arr=this.evaluationGuideList[type]
          diseasesList.forEach(item=>{
              if(item.code==code){
                item.check=!item.check
                if(item.check){
                  arr.push(code)
                }else{
                  arr.forEach(function(str,index){
                    if(str==code){
                      arr.splice(index,1);
                    }
                  })
                }
              }
          })
        },
        checkedes(type) {
          this.bCheck = type
          this.evaluationGuideList.healthAssessment = type
        },
        saveDate() {
          return sessionStorage.setItem('evaluationGuideDate', JSON.stringify(this.evaluationGuideList));
        },
        upData() {
          var vm = this;
          vm.bCheck = vm.evaluationGuide.healthAssessment
          var result = this.evaluationGuide;
          var _symptom = result.healthGuide;
          var _diseasesList = vm.guideList;
          var subdata=vm.evaluationGuideList
          if(!empty(result)) {
            Object.keys(result).forEach(function (keystr, index) {
              Object.keys(subdata).forEach(function (key) {
                if (keystr == key) {
                  if (!empty(result[keystr])) {
                    subdata[key] = result[keystr];
                  }
                }
              });
            })
          }
            _diseasesList.forEach(function(item,index,arr){
              if(!empty(result)){
                if(_symptom&&_symptom.includes(item.code)){
                  item.check = true;
                }else{
                  item.check = false;
                }
              }
            })
          var _hazardesList = vm.hazardesList;
          _hazardesList.forEach(function(item,index,arr){
            if(!empty(result)) {
              if (result.riskFactorControl&&result.riskFactorControl.includes(item.code)) {
                item.check = true;
              } else {
                item.check = false;
              }
            }
          })
          var _hazardsList = vm.hazardsList;
          _hazardsList.forEach(function(item,index,arr){
            if(!empty(result)) {
              if (result.riskFactorControl&&result.riskFactorControl.includes(item.code)) {
                item.check = true;
              } else {
                item.check = false;
              }
            }
          })
        },
        updateTime() {
          var cd = new Date();
          this.evaluationGuideList.recordTime = cd.getTime()
        },
        zeroPadding(num, digit) {
          var zero = '';
          for (var i = 0; i < digit; i++) {
            zero += '0';
          }
          return (zero + num).slice(-digit);
        }
      },
      filters:{
        filterDate (value){
          return moment(value).format('YYYY-MM-DD')
        }
      },
      created (){
        this.updateTime()
        this.upData()
      }
    }
</script>

<style lang="less">
#panel{
  font-size: 0.28rem;
  height: 100%;
  .panel_content{
    width: 96%;
    padding: 0.3rem 2% 0.3rem;
    overflow: hidden;
    span{
      font-size: 0.28rem;
      color: #333333;
      font-family: PingFangSC-Regular;
    }
    input{
      width: 14vw;
      height: 0.6rem;
      font-size: 0.28rem;
      padding-left: 15px;
      border: 1px solid #eee;
      border-radius: 10px;
      margin-left: 1.6%;
      outline: none;
      color: #666;
      box-sizing: border-box;
      &.left{
        position: relative;
        left: -2%;
      }
    }
    .title_top{
      width: 9.4vw;
      line-height: 2.6vw;
      background: rgba(60, 155, 255, 0.1);
      text-align: center;
      border-radius: 30px;
      span{
        color: #3C9BFf;
      }
    }

    .button_content{
      margin-top: 0.28rem;
      width: 100%;
      p{
        width: 80%;
        margin: 0.28rem 0 0 8%;
      }
      span{
        width: 11vw;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        margin-right: 1.6%;
      }
      input[type='button']{
        height: 0.6rem;
        display: inline-block;
        line-height: 0.6rem;
        border: 1px solid #3C9BFF;
        font-size: 0.26rem;
        border-radius: 0.1rem;
        color: #3C9BFF;
        background-color: #FFFFFF;
        width: 1.5rem;
        margin-right: 1.6%;
        vertical-align: middle;
        outline: none;
        padding: 0;
        position: relative;
        left: -1%;
        &.active{
          background-color: #3C9BFF;
          color: #FFFFFF;
        }
      }
    }
    .marginTop{
     margin: 0.28rem 0;
      overflow: hidden;
    }
    .radio_content{
      span.title{
        float: left;
        margin-right: 1.6%;
        width: 11vw;
        text-align: right;
        height: 0.5rem;
        line-height: 0.5rem;
      }
      span.hazards{
        height: 1.5rem;
      }
      .habits{
        float: left;
        margin-right: 60px;
        img{
          width: 0.5rem;
          height: 0.5rem;
          vertical-align: middle;
          margin-right: 10px;
        }
        span{
          vertical-align: middle;
          &.bigWidth{
            width: 5vw;
            display: inline-block;
          }
        }
      }
      .habites{
        width: 50%;
        position: relative;
        top: -4px;
        margin-top: 0.28rem;
        height: .5rem;
        span{
          display: inline-block;
          width: 11vw;
          text-align: left;
        }
        input{
          position: relative;
          left: -2%;
        }
      }
    }
    .smallWidth{
      width: 80%;
      float: left;
      position: relative;
      .weightLossGoal{
        position: absolute;
        top: 24%;
        left: 25%;
        span{
          position: absolute;
          left: 80%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .recommendedVaccination{
        position: absolute;
        top: 51.5%;
        left: 25%;
      }
      .riskFactorControlOther{
        position: absolute;
        top: 79%;
        left: 25%;
      }
    }
    .dutyName{
      margin-top: 0.28rem;
    }
  }
}
</style>
