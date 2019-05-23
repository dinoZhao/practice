<template>
  <div class="pharmacy">
    <div class="pharmacy_content">
      <div class="habites marginTop">
        <span>化疗方案</span>
        <span class="marginLeft" v-if="drugs && drugs.chemotherapy">{{drugs.chemotherapy}}</span>
      </div>
      <div class="button_content marginTop">
        <span>用法</span>
        <input type="button" v-for="item of usageType" :value="item.type" class="active marginLeft" v-if="item.code==drugs.usage">
      </div>
      <div class="radio_content marginTop">
        <span class="title">药品剂型</span>
        <div class="check_content marginLeft">
          <div class="habits marginRight" v-for="(item,index) in Pharmaceutical"  :key = "item.index" >
            <img src="../../../assets/already.png" alt=""><span>{{item.type}}</span>
          </div>
        </div>
      </div>
      <div class="button_content marginTop">
        <span>督导人员选择</span>
        <input type="button" v-for="item of choose"  :value="item.type" class="active marginLeft" v-if="item.code==drugs.personType">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['drugs'],
    data (){
      return {
        usageType:[
          {code: '1', type: '每日'},
          {code: '2', type: '间歇'},
        ],
        Pharmaceutical:[
          {code: '1', type: '固定剂量复合制剂', check: false},
          {code: '2', type: '散装药', check: false},
          {code: '3', type: '板式组合药', check: false},
          {code: '4', type: '组合剂', check: false}
        ],
        choose:[
          {code: '1', type: '医生'},
          {code: '2', type: '家属'},
          {code: '3', type: '自服药'},
          {code: '4', type: '其他'}
        ]
      }
    },
      computed :{
        slicePharmaceutical () {
          let sliceSymptomsArr = []
          if(!empty(this.drugs.PharmaceuticalList)){
            this.drugs.PharmaceuticalList.forEach(item => {
              this.Pharmaceutical.forEach(items => {
                if (item === items.code) {
                  sliceSymptomsArr.push(items)
                }
              })
            })
          }
          return sliceSymptomsArr
        }
      }
  }
</script>

<style scoped lang="less">
  .pharmacy{
    font-size: 0.28rem;
    height: 7.55rem;
    .pharmacy_content{
      width: 96%;
      padding: 0.1rem 2% 0.3rem;
      overflow: hidden;
      span{
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
      }
      .marginRight{
        margin-right: 35px;
      }
      .marginLeft{
        margin-left: 15px;
      }
      input{
        width: 22vw;
        height: 0.6rem;
        font-size: 0.28rem;
        padding-left: 15px;
        border: 1px solid #eee;
        border-radius: 10px;
        outline: none;
        color: #666;
        box-sizing: border-box;
        vertical-align: middle;
      }
      .habites {
        width: 100%;
        overflow: hidden;
        span{
          &:nth-child(1){
            width: 11vw;
            display: inline-block;
            text-align: right;
          }
        }
      }
      .marginTop{
        margin: 0.28rem 0;
      }
      .button_content{
        width: 100%;
        span{
          width: 11vw;
          text-align: right;
          vertical-align: middle;
          display: inline-block;
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
          vertical-align: middle;
          outline: none;
          padding: 0;
          &.active{
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
        }
      }
      .radio_content{
        width: 100%;
        overflow: hidden;
        .check_content{
          float: left;
          overflow: hidden;
        }
        span.title{
          float: left;
          height: 0.5rem;
          line-height: 0.5rem;
          width: 11vw;
          text-align: right;
        }
        span.hazards{
          height: 1.5rem;
        }
        .habits{
          float: left;
          img{
            width: 0.5rem;
            height: 0.5rem;
            vertical-align: middle;
            margin-right: 10px;
          }
          span{
            vertical-align: middle;
            display: inline-block;
          }
        }
        .habites {
          width: 100%;
          span{
            display: inline-block;
            text-align: right;
          }
          input{
          }
        }
      }
    }
  }
</style>
