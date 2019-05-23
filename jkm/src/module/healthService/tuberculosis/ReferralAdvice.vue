<template>
  <div class="ReferralAdvice">
    <div class="ReferralAdvice_content">
      <div class="title_top">
        <span>转诊建议</span>
      </div>
      <div class="button_content marginTop">
        <span>转诊</span>
        <input type="button" v-for="item of transfer"  :class="{active:item.code==transferList.transferflag}" @click="checkedes(item.code)"  :value="item.type">
      </div>
      <div class="reason">
        <span>原因</span>
        <textarea placeholder="请输入原因" v-model="transferList.reason">
	      </textarea>
      </div>
      <div class="reason marginTop">
        <span class="name">机构及科室</span>
        <input type="text" v-model="transferList.organization" placeholder="请输入转诊机构及科室">
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
          transferList:{
            transferflag:'',
            reason:'',
            organization:''
          }
        }
      },
      methods:{
        checkedes (code){
          this.transferList.transferflag=code
        },
        upDate (){
          let vm=this
          let symptomsSigns=vm.advice
          let symptomsSignsList=vm.transferList
          Object.keys(symptomsSigns).forEach(key=>{
            Object.keys(symptomsSignsList).forEach(keyStr=>{
              if(key==keyStr){
                symptomsSignsList[keyStr]=symptomsSigns[key]
              }
            })
          })
        }
      },
      created (){
        this.upDate()
      }
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
        vertical-align: top;
        display: inline-block;
        width: 9.4vw;
        text-align: right;
        height: 1.1rem;
        margin-right: 1.6%;
        &.name{
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }
      textarea{
        width: 80%;
        height: 1rem;
        border: 1px solid #eee;
        text-indent: 2%;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        color: #333;
        position: relative;
        left: -1%;
        padding-top: .1rem;
      }
      input{
        width: 80%;
        border: 1px solid #eee;
        text-indent: 2%;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        color: #333;
        vertical-align: middle;
        position: relative;
        left: -1%;
      }
    }
    .marginTop{
      margin: 0.28rem 0;
    }
  }
}
</style>
