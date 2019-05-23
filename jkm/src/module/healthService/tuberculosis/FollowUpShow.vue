<template>
  <div class="FollowUpShow">
    <div class="FollowUpShow_content">
      <div class="duty">
        <span class="text">随访日期</span>
        <span class="date" v-if="FollowUpRecords && FollowUpRecords.FollowUpDate">{{FollowUpRecords.FollowUpDate | filterDate}}</span>
      </div>
      <div class="title marginTop">
        <i class="lineleft"></i>
        <span>随访方式</span>
      </div>
      <div class="button_content marginTop">
        <input type="button" v-for="item of type" class="active" v-if="FollowUpRecords.FollowingType===item.code"  :value="item.type">
      </div>
      <div class="title_top marginTop">
        <span>随访分类</span>
      </div>
      <div class="button_content marginTop">
        <span>此次随访分类</span>
        <input type="button" v-for="item of ClassificationType" class="active"  v-if="FollowUpRecords.Classification===item.code" :value="item.type">
      </div>
      <div class="title_top nextTime marginTop"><span>下次随访时间</span></div>
      <div class="data marginTop">
        <span>下次随访时间</span>
        <span v-if="FollowUpRecords && FollowUpRecords.FollowTime">{{FollowUpRecords.FollowTime | filterDate}}</span>
      </div>
      <div class="dutyName marginTop">
        <span>责任医生</span>
        <span>{{doctorName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
    export default {
      props:['FollowUpRecords'],
      data (){
        return{
          doctorName:JSON.parse(sessionStorage.getItem('doctorMsg')).docName,
          type:[
            {code: '1', type: '门诊'},
            {code: '2', type: '家庭'},
            {code: '3', type: '电话'}
          ],
          ClassificationType:[
            {code: '1', type: '控制满意'},
            {code: '2', type: '控制不满意'},
            {code: '3', type: '不良反应'},
            {code: '4', type: '并发症'}
          ],
        }
      },
      filters:{
        filterDate (value){
          return moment(value).format('YYYY-MM-DD')
        }
      }
    }
</script>

<style scoped lang="less">
  .FollowUpShow{
    font-size: 0.28rem;
    height: 7.55rem;
  .FollowUpShow_content{
    width: 96%;
    padding: 0.3rem 2%;
    overflow: hidden;
  span{
    font-size: 0.28rem;
    color: #333333;
    font-family: PingFangSC-Regular;
  }
    .duty{
      span.text{
        margin-right: .1rem;
      }
    }
    .title {
      .lineleft {
        display: inline-block;
        vertical-align: middle;
        width: 0.04rem;
        height: 0.3rem;
        background: #3C9BFF;
      }
      span {
        vertical-align: middle;
        margin-left: 0.05rem;
      }
    }
    .marginTop{
      margin-top: 0.28rem;
    }
    .button_content{
      width: 100%;
      span{
        vertical-align: middle;
        display: inline-block;
        margin-right: 2.6%;
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
    .title_top{
      width: 9.4vw;
      line-height: 2.6vw;
      background: rgba(60, 155, 255, 0.1);
      text-align: center;
      border-radius: 30px;
      position: relative;
      left: -1%;
      span{
        color: #3C9BFf;
      }
    }
    .nextTime{
      width: 12vw;
    }
    .date{
      margin-left: .1rem;
    }
    .dutyName{
      width: 100%;
    }
  }
  }
</style>
