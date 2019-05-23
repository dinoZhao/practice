<template>
    <div class="lifestyle">
      <div class="lifestyle_content">
        <div class="title_top">
          <span>生活方式指导</span>
        </div>
        <div class="habites marginTop">
          <span>日吸烟量</span>
          <input type="text" placeholder="请输入" v-model="lifestyleList.smoke">
          <span class="unit">支</span>
        </div>
        <div class="habites marginTop">
          <span>日饮酒量</span>
          <input type="text" placeholder="请输入" v-model="lifestyleList.drink">
          <span class="unit">两</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props:['lifeStyle'],
      data (){
        return {
          lifestyleList:{
            smoke:'',
            drink:''
          }
        }
      },
      methods:{
        upDate (){
          let vm=this
          let symptomsSigns=vm.lifeStyle
          let symptomsSignsList=vm.lifestyleList
          Object.keys(symptomsSigns).forEach(key=>{
            Object.keys(symptomsSignsList).forEach(keyStr=>{
              if(key==keyStr){
                symptomsSignsList[keyStr]=symptomsSigns[key]
              }
            })
          })
        },
        saveDate (){
          return sessionStorage.setItem('lifestyleDate',JSON.stringify(this.lifestyleList))
        }
      },
      created (){
        this.upDate ()
      }
    }
</script>

<style scoped lang="less">
  .lifestyle{
    font-size: 0.28rem;
    height: 7.55rem;
    .lifestyle_content{
      width: 96%;
      padding: 0.3rem 2% 0.3rem;
      overflow: hidden;
      span{
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
      }
      input{
        width: 22vw;
        height: 0.6rem;
        font-size: 0.28rem;
        padding-left: 15px;
        border: 1px solid #eee;
        border-radius: 10px;
        margin-left: 1.6%;
        outline: none;
        color: #666;
        box-sizing: border-box;
        vertical-align: middle;
      }
      .title_top{
        width: 12vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        span{
          color: #3C9BFf;
        }
      }
      .habites {
        width: 100%;
        overflow: hidden;
        position: relative;
        span{
          &.unit{
            position: absolute;
            left: 38%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        input{
          margin-left: 10px;
        }
      }
      .marginTop{
        margin: 0.28rem 0;
      }
    }
  }
</style>
