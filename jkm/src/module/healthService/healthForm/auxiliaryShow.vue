<template>
  <div id="auxiliary">
    <div class="auxiliary_content">
      <div class="title_top"><span>辅助检查</span></div>
      <div class="title">
        <i class="lineleft"></i>
        <span>血常规 *</span>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>血红蛋白</span>
          <span class="content_text" v-if="auxiliaryExamination && auxiliaryExamination.cbc">{{auxiliaryExamination['cbc'].oxyphorase}}</span>
          <span class="unit">g/L</span>
        </div>
        <div class="exercise_content">
          <span>血细胞</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.cbc">{{auxiliaryExamination['cbc'].leucocyte}}</span>
          <span class="unit">10^9/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>血小板</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.cbc">{{auxiliaryExamination['cbc'].platelet}}</span>
          <span class="unit">10^9/L</span>
        </div>
      </div>
      <div class="text_content">
        <span>其他</span>
        <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.cbc">{{auxiliaryExamination['cbc'].other}}</span>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>尿常规 *</span>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>尿蛋白</span>
          <span class="content_text" v-if="auxiliaryExamination.urinalysis && auxiliaryExamination['urinalysis'].protein==counts.code" v-for="counts of count">{{counts.name}}</span>
        </div>
        <div class="exercise_content">
          <span>尿糖</span>
          <span class="content_text" v-if="auxiliaryExamination.urinalysis && auxiliaryExamination.urinalysis['sugar']==counts.code" v-for="counts of count">{{counts.name}}</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>尿酮体</span>
          <span class="content_text" v-if="auxiliaryExamination.urinalysis && auxiliaryExamination.urinalysis['kb']==counts.code" v-for="counts of count">{{counts.name}}</span>
        </div>
        <div class="exercise_content">
          <span>尿潜血</span>
          <span class="content_text" v-if="auxiliaryExamination.urinalysis && auxiliaryExamination.urinalysis['bld']==counts.code" v-for="counts of count">{{counts.name}}</span>
        </div>
      </div>
      <div class="text_content boderBottom">
        <span>其他</span>
        <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.urinalysis">{{auxiliaryExamination['urinalysis'].other}}</span>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">空腹血糖 *</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.glu">{{auxiliaryExamination.glu}}</span>
            <span class="milliliter">mmol/L</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">心电图 *</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.ecg && states.code==auxiliaryExamination.ecg"  v-for="states in state">{{states.name}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">尿微量白蛋白 *</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.alb">{{auxiliaryExamination.alb}}</span>
            <span class="milliliter">mg/dL</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">大便潜血 *</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.fob && shits.code==auxiliaryExamination.fob"  v-for="shits in shit" >{{shits.name}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">糖化血红蛋白 *</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.gh">{{auxiliaryExamination.gh}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">乙型肝炎表面抗原 *</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.hbsAg && states.code==auxiliaryExamination.hbsAg"  v-for="states in state" >{{states.name}}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>肝功能 *</span>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span class="bigger">血清谷丙转氨酶</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.liverFunction">{{auxiliaryExamination['liverFunction'].sgpt}}</span>
          <span class="unit smallunit">U/L</span>
        </div>
        <div class="exercise_content">
          <span class="bigger">血清谷草转氨酶</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.liverFunction">{{auxiliaryExamination['liverFunction'].sgot}}</span>
          <span class="unit smallunit">U/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span class="bigger">白蛋白</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.liverFunction">{{auxiliaryExamination['liverFunction'].albumin}}</span>
          <span class="unit smallunit">g/L</span>
        </div>
        <div class="exercise_content">
          <span class="bigger">总胆红素</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.liverFunction">{{auxiliaryExamination['liverFunction'].stb}}</span>
          <span class="unit smallunit">μmol/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span class="bigger">结合胆红素</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.liverFunction">{{auxiliaryExamination['liverFunction'].dbil}}</span>
          <span class="unit smallunit">μmol/L</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>肾功能 *</span>
      </div>
      <div class="exercise">
        <div class="exercise_content content_small">
          <span class="bigger right">血清肌酐</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.renalFunction">{{auxiliaryExamination['renalFunction'].scr}}</span>
          <span class="unit smallunit smaller">μmol/L</span>
        </div>
        <div class="exercise_content content_small">
          <span class="bigger right">血尿素氮</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.renalFunction">{{auxiliaryExamination['renalFunction'].bun}}</span>
          <span class="unit smallunit smaller">mmol/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content content_small">
          <span class="bigger right">血钾浓度</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.renalFunction">{{auxiliaryExamination['renalFunction'].spc}}</span>
          <span class="unit smallunit smaller">mmol/L</span>
        </div>
        <div class="exercise_content content_small">
          <span class="bigger right">血钠浓度</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.renalFunction">{{auxiliaryExamination['renalFunction'].ssc}}</span>
          <span class="unit smallunit smaller">mmol/L</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>血脂 *</span>
      </div>
      <div class="exercise">
        <div class="exercise_content content_bigger">
          <span class="biggest">总胆固醇</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.bloodFat">{{auxiliaryExamination['bloodFat'].cholesterol}}</span>
          <span class="unit">mmol/L</span>
        </div>
        <div class="exercise_content content_bigger">
          <span class="biggest" style="width: 16vw;">甘油三酯</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.bloodFat">{{auxiliaryExamination['bloodFat'].triglyceride}}</span>
          <span class="unit">mmol/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content content_bigger">
          <span class="biggest">血清低密度脂蛋白胆固醇</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.bloodFat">{{auxiliaryExamination['bloodFat'].sldlc}}</span>
          <span class="unit">mmol/L</span>
        </div>
      </div>
      <div class="exercise boderBottom">
        <div class="exercise_content content_bigger">
          <span class="biggest">血清高密度脂蛋白胆固醇</span>
          <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.bloodFat">{{auxiliaryExamination['bloodFat'].shdlc}}</span>
          <span class="unit">mmol/L</span>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger smalltext">胸部X线片</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.xray && states.code==auxiliaryExamination.xray"  v-for="states of state" >{{states.name}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger smalltext">B超</span>
            <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.bUltrasound&&auxiliaryExamination['bUltrasound'].AbdBUltrasound==states.code"  v-for="states of state" >{{states.name}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger smalltext">宫颈涂片</span>
            <span class="content_text" v-if="auxiliaryExamination && auxiliaryExamination.tct && states.code==auxiliaryExamination.tct"  v-for="states of state" >{{states.name}}</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <span class="others">其他</span>
        <span class="content_text" v-if="auxiliaryExamination&&auxiliaryExamination.other">{{auxiliaryExamination.other}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props:['auxiliaryExamination'],
      data (){
        return {
          state:[
            {code:1,name:'正常'},
            {code:2,name:'异常'}
          ],
          shit:[
            {code:1,name:'阴性'},
            {code:2,name:'阳性'}
          ],
          count:[
            {code:"1",name:'-'},
            {code:"2",name:'+'},
            {code:"3",name:'++'},
            {code:"4",name:'+++'},
            {code:"5",name:'++++'},
          ]
        }
      },
    }
</script>

<style scoped lang="less">
  #auxiliary {
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    .auxiliary_content {
      width: 96%;
      padding: 0.3rem 2% 0.3rem;
      span {
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
        vertical-align: middle;
        &.content_text{
          vertical-align: middle;
          position: relative;
          top: .02rem;
        }
      }
      input {
        width: 19vw;
        height: 0.6rem;
        font-size: 0.28rem;
        padding-left: 15px;
        border: 1px solid #eee;
        border-radius: 10px;
        margin-left: 1.6%;
        outline: none;
        color: #666;
      }
      .detect {
        display: inline-block;
        line-height: 0.6rem;
        border: 1px solid #3C9BFF;
        padding: 0 0.35rem;
        font-size: 0.26rem;
        border-radius: 0.1rem;
        color: #3C9BFF;
        background-color: #FFFFFF;
      }
      .title_top {
        width: 9.4vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        span {
          color: #3C9BFf;
        }
      }
      .title {
        margin-top: 0.28rem;
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
        .detect {
          margin-left: 1.6%;
        }
      }
      .exercise {
        display: flex;
        justify-content: space-between;
        margin-top: 0.24rem;
        .exercise_content {
          width: 48%;
          position: relative;
          span {
            &:nth-child(1) {
              display: inline-block;
              width: 8.5vw;
              text-align: right;
              position: relative;
              vertical-align: middle;
            }
            &.bigger {
              width: 15vw;
            }
            &.biggest{
              width: 18.5vw;
            }
            &.right{
              text-align: right;
              width: 8.5vw;
            }
            &.unit {
              color: #666666;
              vertical-align: middle;
              margin-left: .1rem;
            }
            &.smallunit{
              margin-left: .1rem;
            }
            &.smaller{
              margin-left: .1rem;
            }
          }
          input.small {
            width: 15vw;
            vertical-align: middle;
          }
        }
        .content_bigger{
          width: 49%;
          span.unit{
            margin-left: .1rem;
          }
        }
        .content_small{
          width: 38%;
        }
      }
      .text_content {
        width: 100%;
        margin-top: 0.24rem;
        span {
          &:nth-child(1){
            width: 8.5vw;
            display: inline-block;
            text-align: right;
          }
        }
      }
      .boderBottom {
        border-bottom: 1px solid #eee;
        padding-bottom: 0.24rem;
        position: relative;
        .exercise_contents {
          width: 100%;
          input {
            width: 19vw;
            height: 0.6rem;
            font-size: 0.28rem;
            padding-left: 15px;
            border: 1px solid #eee;
            border-radius: 10px;
            margin-left: 1.6%;
            outline: none;
            color: #666;
          }
          span.smalltext{
            width: 8.5vw;
          }
          span.milliliter {
            color: #666666;
            vertical-align: middle;
            margin-left: .1rem;
          }
          .detect {
            margin-left: 1.6%;
          }
          select{
            width:20.5vw;
            vertical-align: middle;
            background-color: #FFFFFF;
            height: 0.6rem;
            font-size: 0.28rem;
            padding-left: 15px;
            border: 1px solid #eee;
            border-radius: 10px;
            margin-left: 1.6%;
            outline: none;
            color: #666;
            &.small{
              width: 15vw;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>
