<template>
  <div id="examination">
    <div class="examination_content">
      <div class="title_top"><span>查体</span></div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>眼底 *</span>
            <span class="text" v-if="examinationList && examinationList.fundus==1">正常</span>
            <span class="text" v-if="examinationList&& examinationList.fundus==2">异常</span>
          </div>
          <div class="exercise_content">
            <span>皮肤</span>
            <span class="text" v-for="(skins,index) in skin" :key="index" v-if="examinationList && index+1==examinationList.skin">{{skins.type}}</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>巩膜</span>
            <span class="text" v-for="(scleras,index) in sclera" :key="index" v-if="examinationList && index+1==examinationList.sclera">{{scleras.type}}</span>
          </div>
          <div class="exercise_content">
            <span>淋巴结</span>
              <span v-for="(lymphadens,index) in lymphaden" :key="index" v-if="examinationList && index+1==examinationList.lymphNode" class="text">{{lymphadens.type}}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>肺</span>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>桶状胸</span>
            <span class="text" v-if=" examinationList['lung'] && examinationList['lung'].barrelChest==1">否</span>
            <span class="text" v-if=" examinationList['lung'] && examinationList['lung'].barrelChest==2">是</span>
          </div>
          <div class="exercise_content">
            <span>呼吸音</span>
            <span class="text" v-if="examinationList['lung'] && examinationList['lung'].breathSounds==1">正常</span>
            <span class="text" v-if="examinationList['lung'] && examinationList['lung'].breathSounds==2">异常</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>罗音</span>
              <span  class="text" v-for="(rales,index) in rale" :key="index" v-if="examinationList['lung'] && index+1==examinationList['lung'].rales">{{rales.type}}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>心脏</span>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>心率</span>
            <span class="text" v-if="examinationList['heart']">{{examinationList['heart'].heartRate}}</span>
            <span class="time">次/分钟</span>
          </div>
          <div class="exercise_content">
            <span>心律</span>
                <span  class="text" v-for="(HeartRates,index) in HeartRate" :key="index" v-if="examinationList['heart'] && index+1==examinationList['heart'].HeartRhythm">{{HeartRates.type}}</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>杂音</span>
            <span class="text" v-if="examinationList['heart'] && examinationList['heart'].noise==1">无</span>
            <span class="text" v-if="examinationList['heart'] && examinationList['heart'].noise==2">有</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>腹部</span>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span class="big">压痛</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].tenderness==1">无</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].tenderness==2">有</span>
          </div>
          <div class="exercise_content">
            <span>包块</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].chunks==1">无</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].chunks==2">有</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span class="big">肝大</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].hepatomegaly==1">无</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].hepatomegaly==2">有</span>
          </div>
          <div class="exercise_content">
            <span>脾大</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].splenomegaly==1">无</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].splenomegaly==2">有</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content">
            <span class="big">移动性浊音</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].shiftingDullness==1">无</span>
            <span class="text" v-if="examinationList['abdomen'] && examinationList['abdomen'].shiftingDullness==2">有</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content">
            <span class="bigger">下肢水肿</span>
            <span  class="text"  v-for="(lles,index) in lle" :key="index" v-if="examinationList && index+1==examinationList.lowerExtremityEdema">{{lles.type}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content">
            <span class="bigger">足背动脉搏动 *</span>
            <span  class="text"  v-for="(foots,index) in foot" :key="index" v-if="examinationList && index+1==examinationList.dorsalFootPulse">{{foots.type}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content">
            <span class="bigger">肛门指诊 *</span>
            <span  class="text"  v-for="(anuss,index) in anus" :key="index" v-if="examinationList && index+1==examinationList.anusDre">{{anuss.type}}</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content">
            <span class="bigger">乳腺 *</span>
            <span  class="text"  v-for="(breasts,index) in breast" :key="index" v-if="examinationList && index+1==examinationList.mammaryGland">{{breasts.type}}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>妇科 *</span>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>外阴</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].vulva==1">未见异常</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].vulva==2">异常</span>
          </div>
          <div class="exercise_content">
            <span>阴道</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].vagina==1">未见异常</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].vagina==2">异常</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>宫颈</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].cervical==1">未见异常</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].cervical==2">异常</span>
          </div>
          <div class="exercise_content">
            <span>宫体</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].uterineBody==1">未见异常</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].uterineBody==2">异常</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_content">
            <span>附件</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].adnexa==1">未见异常</span>
            <span class="text" v-if="examinationList['gynaecology'] && examinationList['gynaecology'].adnexa==2">异常</span>
          </div>
        </div>
      </div>
      <div class="text_content marginTop">
        <div class="exercise">
          <div class="exercise_content margin">
            <span>其他</span>
            <span class="text" v-if="examinationList">{{examinationList.bodyOther}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['examinationList'],
    data (){
      return{
        skin:[
          {
            type:'正常',
            code:1
          },
          {
            type:'潮红',
            code:2
          },
          {
            type:'苍白',
            code:3
          },
          {
            type:'发绀',
            code:4
          },
          {
            type:'黄染',
            code:5
          },
          {
            type:'色素沉着',
            code:6
          },
          {
            type:'其他',
            code:7
          }
        ],
        sclera:[
          {
            type:'正常',
            code:1
          },
          {
            type:'黄染',
            code:2
          },
          {
            type:'充血',
            code:3
          },
          {
            type:'其他',
            code:4
          }
        ],
        lymphaden:[
          {
            type:'未触及',
            code:1
          },
          {
            type:'锁骨上',
            code:2
          },
          {
            type:'腋窝',
            code:3
          },
          {
            type:'其他',
            code:4
          }
        ],
        rale:[
          {
            type:'无',
            code:1
          },
          {
            type:'干罗音',
            code:2
          },
          {
            type:'湿罗音',
            code:3
          },
          {
            type:'其他',
            code:4
          }
        ],
        HeartRate:[
          {
            type:'齐',
            code:1
          },
          {
            type:'不齐',
            code:2
          },
          {
            type:'绝对不齐',
            code:3
          }
        ],
        lle:[
          {
            type:'无',
            code:1
          },
          {
            type:'单侧',
            code:2
          },
          {
            type:'双侧不对称',
            code:3
          },
          {
            type:'双侧对称',
            code:4
          }
        ],
        foot:[
          {
            type:'未触及',
            code:1
          },
          {
            type:'触及双侧对称',
            code:2
          },
          {
            type:'触及左侧弱或消失',
            code:3
          },
          {
            type:'触及右侧弱或消失',
            code:4
          }
        ],
        anus:[
          {
            type:'未及异常',
            code:1
          },
          {
            type:'触痛',
            code:2
          },
          {
            type:'包块',
            code:3
          },
          {
            type:'前列腺异常',
            code:4
          },
          {
            type:'其他',
            code:5
          }
        ],
        breast:[
          {
            type:'未见异常',
            code:1
          },
          {
            type:'乳房切除',
            code:2
          },
          {
            type:'异常泌乳',
            code:3
          },
          {
            type:'乳腺包块',
            code:4
          },
          {
            type:'其他',
            code:5
          }
        ],
      }
    }
  }
</script>

<style scoped lang="less">
  #examination{
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    .examination_content{
      width: 96%;
      padding: .3rem 2% .3rem;
      .text_content{
        margin-top: 0.14rem;
        &.marginTop{
          margin-top: 0.5rem;
        }
        &.boderBottom{
          border-bottom: 1px solid #eee;
          padding: .15rem 0;
          margin: 0;
        }
        .exercise{
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          .exercise_content{
            width: 48%;
            input.small{
              width: 54%;
              height: 0.6rem;
              font-size: 0.28rem;
              padding-left: 15px;
              margin: 0.512vw 0;
              border: 1px solid #eee;
              border-radius: 10px;
              margin-left: 1.6%;
              outline: none;
              color: #999999;
            }
            span{
              display: inline-block;
              width: 8.5vw;
              text-align: right;
              vertical-align: middle;
              &.text{
                width: 15vw;
                text-align: center;
                vertical-align: middle;
              }
              &.time{
                color: #333333;
                vertical-align: middle;
                font-family: PingFangSC-Regular;
                font-size: 0.28rem;
                width: 7vw;
              }
              &.big{
                width: 9vw;
              }
              &.bigger{
                width: 12vw;
              }
            }
            select{
              width: 58%;
              vertical-align: middle;
            }
          }
          .margin{
            width: 100%;
            input{
              width: 75%;
              height: 0.6rem;
              font-size: 0.28rem;
              padding-left: 15px;
              margin: 0.512vw 0;
              border: 1px solid #eee;
              border-radius: 10px;
              outline: none;
              margin-left: 1%;
              color: #666;
            }
          }
        }
      }
      .title_top{
        width: 9.4vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        span{
          font-size: 0.28rem;
          color: #3C9BFf;
        }
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
      select{
        width: 19vw;
        height: 0.6rem;
        font-size: 0.28rem;
        padding-left: 15px;
        margin: 0.512vw 0;
        border: 1px solid #eee;
        border-radius: 10px;
        margin-left: 1.6%;
        outline: none;
        color: #666;
        option{
          outline: none;
        }
      }
      span{
        color: #333333;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
      }
    }
  }
</style>
