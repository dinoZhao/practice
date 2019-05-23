<template>
  <div id="lifeStyle">
    <div class="lifeStyle_content">
      <div class="title">
        <i class="lineleft"></i>
        <span>体育锻炼频率</span>
      </div>
      <div class="input_button">
        <input type="button" value="每天" class="active">
        <input type="button" value="每周一次以上">
        <input type="button" value="偶尔">
        <input type="button" value="不锻炼">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span>每天锻炼时间</span>
            <input type="text" placeholder="请输入" name="minutes" class="small">
            <span class="times">分钟</span>
          </div>
          <div class="exercise_time">
            <span>坚持锻炼时间</span>
            <input type="text" placeholder="请输入" name="years" class="small">
            <span class="times">年</span>
          </div>
        </div>
        <div class="exercise_type">
          <span>锻炼方式</span>
          <input type="text" placeholder="请输入" name="type" class="big">
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>饮食习惯</span>
      </div>
      <div class="radio_content margin">
        <div class="check"><input type="radio" id="radio1" class="on"><label for="radio1"><span>荤素均衡</span></label>
        </div>
        <div class="check"><input type="radio" id="radio2"><label for="radio2"><span>荤食为主</span></label></div>
        <div class="check"><input type="radio" id="radio3"><label for="radio3"><span>嗜盐</span></label></div>
        <div class="check"><input type="radio" id="radio4"><label for="radio4"><span>嗜油</span></label></div>
        <div class="check"><input type="radio" id="radio5"><label for="radio5"><span>嗜糖</span></label></div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>吸烟情况</span>
      </div>
      <div class="input_button">
        <input type="button" value="从不吸烟" class="active">
        <input type="button" value="已戒烟">
        <input type="button" value="吸烟">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span>平均日吸烟量</span>
            <input type="text" placeholder="请输入" name="minutes" class="small">
            <span class="times">支</span>
          </div>
          <div class="exercise_time">
            <span>开始吸烟年龄</span>
            <input type="text" placeholder="请输入" name="years" class="small">
            <span class="times">岁</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span style="width: 23%;display: inline-block;text-align: right">戒烟年龄</span>
            <input type="text" placeholder="请输入" name="years" class="small">
            <span class="times">岁</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>饮酒情况</span>
      </div>
      <div class="input_button">
        <input type="button" value="从不饮酒" class="active">
        <input type="button" value="偶尔">
        <input type="button" value="经常">
        <input type="button" value="每天">
      </div>
      <div class="text_content" style="margin-left: 7.3%">
        <div class="exercise">
          <div class="exercise_time">
            <span>平均饮酒量</span>
            <input type="text" placeholder="请输入" name="years" class="small">
            <span class="times" style="position: absolute;right: 21%">两</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span>是否戒酒</span>
          <input type="button" value="是" class="smallBtn">
          <input type="button" value="否" class="smallBtn">
        </div>
        <div class="choose_right">
          <span>戒酒年龄</span>
          <input type="text" placeholder="请输入" name="years" class="small">
          <span class="then">两</span>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span>近一年内是否曾醉酒</span>
          <input type="button" value="是" class="smallBtn">
          <input type="button" value="否" class="smallBtn">
        </div>
        <div class="choose_right">
          <span>开始饮酒年龄</span>
          <input type="text" placeholder="请输入" name="years" class="small">
          <span class="then">两</span>
        </div>
      </div>
      <div class="radio_content margin">
        <div class="beerkind"><span>饮酒种类</span></div>
        <div class="check_content">
        <div class="check"><input type="radio" id="radio6" class="on"><label for="radio6"><span>白酒</span></label>
        </div>
        <div class="check"><input type="radio" id="radio7"><label for="radio7"><span>啤酒</span></label></div>
        <div class="check"><input type="radio" id="radio8"><label for="radio8"><span>红酒</span></label></div>
        <div class="check"><input type="radio" id="radio9"><label for="radio9"><span>黄酒</span></label></div>
        <div class="check"><input type="radio" id="radio10"><label for="radio10"><span>其他</span></label></div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>职业暴露情况</span>
      </div>
      <div class="input_button">
        <input type="button" value="无职业病" class="active">
        <input type="button" value="有职业病">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span style="width: 28%;display: inline-block;text-align: right">工种</span>
            <input type="text" placeholder="请输入" name="minutes" class="small">
          </div>
          <div class="exercise_time">
            <span style="width: 23%;display: inline-block;text-align: right">从业时间</span>
            <input type="text" placeholder="请输入" name="years" class="small">
            <span class="times">年</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 29%">化学品防护措施</span>
          <input type="button" value="有" class="smallBtn">
          <input type="button" value="无" class="smallBtn">
        </div>
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 24%">毒物防护措施</span>
          <input type="button" value="有" class="smallBtn">
          <input type="button" value="无" class="smallBtn">
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 30%">射线防护措施</span>
          <input type="button" value="有" class="smallBtn">
          <input type="button" value="无" class="smallBtn">
        </div>
      </div>
      </div>
      </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  #lifeStyle {
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    .lifeStyle_content {
      margin-bottom: 0.28rem;
      .margin {
        margin-top: 0.3rem;
        overflow: auto;
      }
      width: 96%;
      padding: 0 2%;
      border: none;
      overflow: hidden;
      input.small {
        width: 58%;
        height: 0.6rem;
        border: 1px solid #eee;
        text-indent: 4%;
        font-size: 0.22rem;
        border-radius: 0.1rem;
        color: #999999;
        line-height: 0.6rem;
        position: relative;
      }
      span {
        color: #333333;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular;
      }
      .title {
        margin-top: 0.28rem;
        span {
          margin-left: 0.05rem;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          width: 0.04rem;
          height: 0.3rem;
          background: #3C9BFF;
        }
        span {
          vertical-align: middle;
        }
      }
      .input_button {
        margin-top: 0.3rem;
        width: 100%;
        input {
          width: 15%;
          height: 0.5rem;
          display: inline-block;
          line-height: 0.5rem;
          border: 1px solid #3C9BFF;
          font-size: 0.26rem;
          border-radius: 0.1rem;
          color: #3C9BFF;
          background-color: #FFFFFF;
          margin-right: 1.6%;
          &.active {
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
          &:active{
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
        }
      }
      .text_content {
        margin-top: 0.28rem;
        .exercise {
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          .exercise_time {
            width: 48%;
            position: relative;
            span {
              vertical-align: middle;
              &.times {
                position: absolute;
                right: 18%;
                top: 50%;
                transform: translateY(-50%);
                color: #666666;
              }
              &:nth-child(1) {
                margin-right: 1.6%;
              }
            }
          }
        }
        .exercise_type {
          margin-top: 0.28rem;
          span {
            vertical-align: top;
            width: 11%;
            text-align: right;
            display: inline-block;
            height: 1.1rem;
          }
          input.big {
            width: 80%;
            height: 1.1rem;
            border: 1px solid #eee;
            text-indent: 1%;
            font-size: 0.22rem;
            border-radius: 0.1rem;
            color: #999999;
            margin-left: 0.8%;
          }
        }
      }
      .radio_content {
        &:last-child{
          .beerkind{
            width: 16%;
            float: left;
            text-align: right;
            span{
              vertical-align: middle;
            }
          }
          .check_content{
            float: right;
            margin-left: 2%;
            width: 80%;
            input{
              vertical-align: middle;
            }
          }
        }
        .check {
          float: left;
          margin-right: 4%;
          input {
            width: 0.5rem;
            height: 0.5rem;
            border: 1px solid #999999;
            background: #FFFFFF;
            border-radius: 0.3rem;
            vertical-align: middle;
            &.on {
              background: url(../../assets/already.png);
              background-size: contain;
              border: none;
            }
          }
          span {
            vertical-align: middle;
            margin-left: .1rem;
          }
        }
      }
      .choose {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.28rem;
        &:last-child{
          .choose_left{
            span{
              width: 35%;
            }
            input{
              position: relative;
              left: -1%;
            }
          }
          .choose_right{
            span:first-child{
              width: 23%;
            }
            input{
              position: relative;
              left: -1%;
            }
          }
        }
        .choose_left {
          width: 48%;
          span {
            display: inline-block;
            width: 35%;
            text-align: right;
          }
          input {
            width: 20%;
            height: 0.5rem;
            display: inline-block;
            line-height: 0.5rem;
            border: 1px solid #3C9BFF;
            font-size: 0.26rem;
            border-radius: 0.1rem;
            color: #3C9BFF;
            background-color: #FFFFFF;
            margin-left: 1.6%;
          }
        }
        .choose_right {
          width: 48%;

          position: relative;
          span {
            &:nth-child(1) {
              display: inline-block;
              max-width: 23%;
              min-width: 22%;
              text-align: right;
              vertical-align: middle;
              margin-right: 1.6%;
            }
            &.then{
              position: absolute;
              right: 19%;
              top: 50%;
              transform: translateY(-50%);
              color: #666666;
            }
          }
        }
      }
    }

  }
</style>
