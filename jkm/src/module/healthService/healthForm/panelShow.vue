<template>
  <div id="panelShow">
    <div class="panelShow_content">
      <div class="title_top">
        <span>健康评价</span>
      </div>
      <div class="button_content">
        <span>健康评价</span>
        <input type="button" v-for="item of assessmentTypes"  class="active"  :value="item.type" v-if="evaluationGuide.healthAssessment">
        <p v-if="evaluationGuide.healthAssessment==='有异常' && evaluationGuide.healthAbnormal" v-for="item of evaluationGuide.healthAbnormal">{{item}}</p>
      </div>
      <div class="title_top marginTop">
        <span>健康指导</span>
      </div>
      <div class="radio_content marginTop">
        <span class="title">健康指导</span>
        <div class="check_content">
          <div class="habits" v-for="(item,index) in sliceGuide" data-index = "index" :key = "item.index" v-if="evaluationGuide.healthGuide">
            <img src="../../../assets/already.png" alt=""><span>{{item.type}}</span>
          </div>
        </div>
      </div>
      <div class="radio_content marginTop">
        <span class="title hazards">危险因素控制</span>
        <div class="check_content smallWidth">
          <div class="habits" v-for="(item,index) in sliceRisk" data-index = "index" :key = "item.index" v-if="evaluationGuide.riskFactorControl">
            <img src="../../../assets/already.png" alt=""><span>{{item.type}}</span>
          </div>
          <div class="habits habites" v-for="(item,index) in sliceRisks" data-index = "index" :key = "item.index" v-if="evaluationGuide.riskFactorControl && item.name">
            <img src="../../../assets/already.png" alt=""><span>{{item.type}}</span>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="duty">
        <span class="text">体检日期</span>
        <span class="date" v-if="evaluationGuide.recordTime">{{evaluationGuide.recordTime | filterDate}}</span>
      </div>
      <div class="dutyName">
        <span>责任医生</span>
        <span v-if="evaluationGuide.doctorName">{{evaluationGuide.doctorName}}</span>
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
        addClass:false,
        assessmentType:[],
        assessmentList: [
          {code: '1', type: '无异常', check: true},
          {code: '2', type: '有异常', check: true},
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
          {code: '5', type: '减体重,目标', check: false,name:''},
          {code: '6', type: '建议接种疫苗', check: false,name:''},
          {code: '7', type: '其他', check: false,name:''},
        ]
      }
    },
    computed :{
      sliceGuide() {
        let sliceGuideArr = []
        if(!empty(this.evaluationGuide.healthGuide)){
          this.evaluationGuide.healthGuide.forEach(item => {
            this.guideList.forEach(items => {
              if (item === items.code) {
                sliceGuideArr.push(items)
              }
            })
          })
        }
        return sliceGuideArr
      },
      sliceRisk() {
        let sliceRiskArr = []
        if(!empty(this.evaluationGuide.riskFactorControl)){
          this.evaluationGuide.riskFactorControl.forEach(item => {
            this.hazardsList.forEach(items => {
              if (item === items.code) {
                sliceRiskArr.push(items)
              }
            })
          })
        }
        return sliceRiskArr
      },
      sliceRisks() {
        let sliceRiskArr = []
        if(!empty(this.evaluationGuide.riskFactorControl)){
          this.evaluationGuide.riskFactorControl.forEach(item => {
            this.hazardesList.forEach(items => {
              if (item === items.code) {
                sliceRiskArr.push(items)
              }
            })
          })
        }
        return sliceRiskArr
      },
      assessmentTypes (){
        let {assessmentType}=this
        let arr=[]
        let assessmentListArr
        let assessmentNum
        if(this.evaluationGuide['healthAssessment']){
          assessmentNum=this.evaluationGuide['healthAssessment'].indexOf(",")? assessmentListArr=this.evaluationGuide['healthAssessment'].split(","):assessmentListArr=this.evaluationGuide['healthAssessment'].split("")
        }else{
          assessmentNum=[]
        }
        if(!empty(assessmentNum)){
          assessmentNum.forEach(item=> {
            this.assessmentList.forEach(items=>{
              if(item===items.type){
                arr.push(items)
              }
            })
          })
        }
        return arr
      }
    },
      filters: {
        filterDate(value) {
          return moment(value).format('YYYY-MM-DD')
        }
      },
    watch:{
      evaluationGuide (){
        this.hazardesList[0].name=this.evaluationGuide.weightLossGoal
        this.hazardesList[1].name=this.evaluationGuide.recommendedVaccination
        this.hazardesList[2].name=this.evaluationGuide.riskFactorControlOther
      }
    }
    }
</script>

<style lang="less">
  #panelShow{
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    .panelShow_content{
      width: 96%;
      padding: 0.3rem 2% 0.3rem;
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
          width: 100%;
          float: left;
          margin-top: 0.28rem;
          span{
            display: inline-block;
            width: 11vw;
            text-align: left;
            vertical-align: middle;
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
      }
      .dutyName{
        margin-top: 0.28rem;
      }
    }
  }
</style>
