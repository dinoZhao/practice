<template>
  <div class="lifestyleshow">
    <div class="lifestyleshow_content">
      <div class="title_top">
        <span>生活方式指导</span>
      </div>
      <div class="habites marginTop">
        <span>日吸烟量</span>
        <span v-if="lifeStyle && lifeStyle.smoke">{{lifeStyle.smoke}} 支</span>
      </div>
      <div class="habites marginTop">
        <span>日饮酒量</span>
        <span v-if="lifeStyle && lifeStyle.drink">{{lifeStyle.drink}} 两</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['lifeStyle'],
    data (){
      return {
      }
    },
  }
</script>

<style scoped lang="less">
  .lifestyleshow{
    font-size: 0.28rem;
    height: 7.55rem;
    .lifestyleshow_content{
      width: 96%;
      padding: 0.3rem 2% 0.3rem;
      overflow: hidden;
      span{
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
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
          vertical-align: middle;
          &:nth-child(2){
            margin-left: 1.6%;
          }
        }
      }
      .marginTop{
        margin: 0.28rem 0;
      }
    }
  }
</style>
