<template>
  <div class="ReferralAdvice">
    <div class="ReferralAdvice_content">
      <div class="title_top">
        <span>转诊建议</span>
      </div>
      <div class="button_content marginTop">
        <span>转诊</span>
        <input type="button" v-for="item of transfer"  class="active" v-if="advice.transferflag==item.code"  :value="item.type">
      </div>
      <div class="reason">
        <span>原因</span>
        <span v-if="advice && advice.reason">{{advice.reason}}</span>
      </div>
      <div class="reason marginTop">
        <span>机构及科室</span>
        <span v-if="advice && advice.reason">{{advice.organization}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['advice'],
    data (){
      return {
        transfer: [
          {code: '1', type: '无', check: false},
          {code: '2', type: '有', check: false},
        ],
      }
    },
  }
</script>

<style scoped lang="less">
  .ReferralAdvice{
    font-size: 0.28rem;
    height: 7.55rem;
    .ReferralAdvice_content{
      width: 96%;
      padding: 0.3rem 2%;
      overflow: hidden;
      span{
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
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
        span{
          width: 9.4vw;
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
      .reason{
        span{
          vertical-align:middle;
          display: inline-block;
          &:nth-child(1){
            width: 9.4vw;
            text-align: right;
            margin-right: 1.6%;
          }
        }
      }
      .marginTop{
        margin: 0.28rem 0;
      }
    }
  }
</style>
