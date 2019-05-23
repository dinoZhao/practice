<template>
    <div id="examination">
      <div class="examination_content">
        <div class="title_top"><span>查体</span></div>
        <div class="text_content">
          <div class="exercise">
            <div class="exercise_content">
              <span>眼底 *</span>
              <select v-model="CheckBodyList.fundus">
                <option value="">请选择</option>
                <option v-for="(fundues,index) in fundus" :key="index" :value="fundues.code">{{fundues.type}}</option>
            </select>
            </div>
            <div class="exercise_content">
              <span>皮肤</span>
              <select v-model="CheckBodyList.skin">
                <option value="">请选择</option>
                <option :value="skins.code" v-for="(skins,index) in skin" :key="index" >{{skins.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content">
          <div class="exercise">
            <div class="exercise_content">
              <span>巩膜</span>
              <select v-model="CheckBodyList.sclera">
                <option value="">请选择</option>
                <option :value="scleras.code" v-for="(scleras,index) in sclera" :key="index">{{scleras.type}}</option>
              </select>
            </div>
            <div class="exercise_content">
              <span>淋巴结</span>
              <select v-model="CheckBodyList.lymphNode">
                <option value="">请选择</option>
                <option :value="lymphadens.code" v-for="(lymphadens,index) in lymphaden" :key="index">{{lymphadens.type}}</option>
              </select>
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
              <select v-model="CheckBodyList.lung['barrelChest']">
                <option value="">请选择</option>
                <option :value="optiones.code" v-for="(optiones,index) in options" :key="index">{{optiones.type}}</option>
              </select>
            </div>
            <div class="exercise_content">
              <span>呼吸音</span>
              <select v-model="CheckBodyList.lung['breathSounds']">
                <option value="">请选择</option>
                <option :value="states.code" v-for="(states,index) in state" :key="index">{{states.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content">
          <div class="exercise">
            <div class="exercise_content">
              <span>罗音</span>
              <select v-model="CheckBodyList.lung['rales']">
                <option value="">请选择</option>
                <option :value="rales.code" v-for="(rales,index) in rale" :key="index">{{rales.type}}</option>
              </select>
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
              <input type="tel" placeholder="请输入" class="small" v-model="CheckBodyList.heart['heartRate']">
            <span class="time">次/分钟</span>
          </div>
            <div class="exercise_content">
              <span>心律</span>
              <select v-model="CheckBodyList.heart['HeartRhythm']">
                <option value="">请选择</option>
                <option :value="HeartRates.code" v-for="(HeartRates,index) in HeartRate" :key="index">{{HeartRates.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content">
          <div class="exercise">
        <div class="exercise_content">
          <span>杂音</span>
          <select v-model="CheckBodyList.heart['noise']">
            <option value="">请选择</option>
            <option :value="flags.code" v-for="(flags,index) in flag" :key="index">{{flags.type}}</option>
          </select>
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
              <select v-model="CheckBodyList.abdomen['tenderness']">
                <option value="">请选择</option>
                <option :value="flags.code" v-for="(flags,index) in flag" :key="index">{{flags.type}}</option>
              </select>
            </div>
            <div class="exercise_content">
              <span>包块</span>
              <select v-model="CheckBodyList.abdomen['chunks']">
                <option value="">请选择</option>
                <option :value="flags.code" v-for="(flags,index) in flag" :key="index">{{flags.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content">
          <div class="exercise">
            <div class="exercise_content">
              <span class="big">肝大</span>
              <select v-model="CheckBodyList.abdomen['hepatomegaly']">
                <option value="">请选择</option>
                <option :value="flags.code" v-for="(flags,index) in flag" :key="index">{{flags.type}}</option>
              </select>
            </div>
            <div class="exercise_content">
              <span>脾大</span>
              <select v-model="CheckBodyList.abdomen['splenomegaly']">
                <option value="">请选择</option>
                <option :value="flags.code" v-for="(flags,index) in flag" :key="index" >{{flags.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content boderBottom">
          <div class="exercise">
            <div class="exercise_content">
              <span class="big">移动性浊音</span>
              <select v-model="CheckBodyList.abdomen['shiftingDullness']">
                <option value="">请选择</option>
                <option :value="flags.code" v-for="(flags,index) in flag" :key="index">{{flags.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content boderBottom">
          <div class="exercise">
            <div class="exercise_content">
              <span class="bigger">下肢水肿</span>
              <select  v-model="CheckBodyList.lowerExtremityEdema">
                <option value="">请选择</option>
                <option :value="lles.code" v-for="(lles,index) in lle" :key="index">{{lles.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content boderBottom">
          <div class="exercise">
            <div class="exercise_content">
              <span class="bigger">足背动脉搏动 *</span>
              <select v-model="CheckBodyList.dorsalFootPulse">
                <option value="">请选择</option>
                <option :value="foots.code" v-for="(foots,index) in foot" :key="index">{{foots.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content boderBottom">
          <div class="exercise">
            <div class="exercise_content">
              <span class="bigger">肛门指诊 *</span>
              <select v-model="CheckBodyList.anusDre">
                <option value="">请选择</option>
                <option :value="anuss.code" v-for="(anuss,index) in anus" :key="index">{{anuss.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content boderBottom">
          <div class="exercise">
            <div class="exercise_content">
              <span class="bigger">乳腺 *</span>
              <select v-model="CheckBodyList.mammaryGland">
                <option value="">请选择</option>
                <option :value="breasts.code" v-for="(breasts,index) in breast" :key="index">{{breasts.type}}</option>
              </select>
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
              <select v-model="CheckBodyList.gynaecology['vulva']">
                <option value="">请选择</option>
                <option :value="abnormals.code" v-for="(abnormals,index) in abnormal" :key="index">{{abnormals.type}}</option>
              </select>
            </div>
            <div class="exercise_content">
              <span>阴道</span>
              <select v-model="CheckBodyList.gynaecology['vagina']">
                <option value="">请选择</option>
                <option :value="abnormals.code" v-for="(abnormals,index) in abnormal" :key="index">{{abnormals.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content">
          <div class="exercise">
            <div class="exercise_content">
              <span>宫颈</span>
              <select v-model="CheckBodyList.gynaecology['cervical']">
                <option value="">请选择</option>
                <option :value="abnormals.code" v-for="(abnormals,index) in abnormal" :key="index">{{abnormals.type}}</option>
              </select>
            </div>
            <div class="exercise_content">
              <span>宫体</span>
              <select v-model="CheckBodyList.gynaecology['uterineBody']">
                <option value="">请选择</option>
                <option :value="abnormals.code" v-for="(abnormals,index) in abnormal" :key="index">{{abnormals.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content">
          <div class="exercise">
            <div class="exercise_content">
              <span>附件</span>
              <select v-model="CheckBodyList.gynaecology['adnexa']">
                <option value="">请选择</option>
                <option :value="abnormals.code" v-for="(abnormals,index) in abnormal" :key="index">{{abnormals.type}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text_content marginTop">
          <div class="exercise">
            <div class="exercise_content margin">
              <span>其他</span>
              <input type="text" placeholder="请输入" v-model="CheckBodyList.bodyOther">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { getURLParameter,dateFormat,empty } from 'utils/util'
    export default {
    	props:['examinationList'],
      data (){
        return{
          selected:0,
          fundus:[

            {
              type:'正常',
              code:"1"
            },
            {
              type:'异常',
              code:"2"
            }
          ],
          skin:[
            {
              type:'正常',
              code:"1"
            },
            {
              type:'潮红',
              code:"2"
            },
            {
              type:'苍白',
              code:"3"
            },
            {
              type:'发绀',
              code:"4"
            },
            {
              type:'黄染',
              code:"5"
            },
            {
              type:'色素沉着',
              code:"6"
            },
            {
              type:'其他',
              code:"7"
            }
          ],
          sclera:[
            {
              type:'正常',
              code:"1"
            },
            {
              type:'黄染',
              code:"2"
            },
            {
              type:'充血',
              code:"3"
            },
            {
              type:'其他',
              code:"4"
            }
          ],
          lymphaden:[
            {
              type:'未触及',
              code:"1"
            },
            {
              type:'锁骨上',
              code:"2"
            },
            {
              type:'腋窝',
              code:"3"
            },
            {
              type:'其他',
              code:"4"
            }
          ],
          rale:[
            {
              type:'无',
              code:"1"
            },
            {
              type:'干罗音',
              code:"2"
            },
            {
              type:'湿罗音',
              code:"3"
            },
            {
              type:'其他',
              code:"4"
            }
          ],
          HeartRate:[
            {
              type:'齐',
              code:"1"
            },
            {
              type:'不齐',
              code:"2"
            },
            {
              type:'绝对不齐',
              code:"3"
            }
          ],
          lle:[
            {
              type:'无',
              code:"1"
            },
            {
              type:'单侧',
              code:"2"
            },
            {
              type:'双侧不对称',
              code:"3"
            },
            {
              type:'双侧对称',
              code:"4"
            }
          ],
          foot:[
            {
              type:'未触及',
              code:"1"
            },
            {
              type:'触及双侧对称',
              code:"2"
            },
            {
              type:'触及左侧弱或消失',
              code:"3"
            },
            {
              type:'触及右侧弱或消失',
              code:"4"
            }
          ],
          anus:[
            {
              type:'未及异常',
              code:"1"
            },
            {
              type:'触痛',
              code:"2"
            },
            {
              type:'包块',
              code:"3"
            },
            {
              type:'前列腺异常',
              code:"4"
            },
            {
              type:'其他',
              code:"5"
            }
          ],
          breast:[
            {
              type:'未见异常',
              code:"1"
            },
            {
              type:'乳房切除',
              code:"2"
            },
            {
              type:'异常泌乳',
              code:"3"
            },
            {
              type:'乳腺包块',
              code:"4"
            },
            {
              type:'其他',
              code:"5"
            },
          ],
          options:[
            {
              type:'否',
              code:"1"
            },
            {
              type:'是',
              code:"2"
            },
          ],
          state:[
            {
              isShow:true,
              type:'正常',
              code:"1"
            },
            {
              type:'异常',
              code:"2"
            }
          ],
          flag:[
            {
              type:'无',
              code:"1"
            },
            {
              type:'有',
              code:"2"
            }
          ],
          abnormal:[
            {
              type:'未见异常',
              code:"1"
            },
            {
              type:'异常',
              code:"2"
            }
          ],
          CheckBodyList:{
          "fundus": "",
          "skin": "",
          "sclera": "",
          "lymphNode": "",
          "lung": {
          "barrelChest": "",
            "breathSounds": "",
            "rales": ""
        },
          "heart": {
          "heartRate": "",
            "HeartRhythm": "",
            "noise": ""
        },
          "abdomen": {
          "tenderness": "",
            "chunks": "",
            "hepatomegaly": "",
            "splenomegaly": "",
            "shiftingDullness": ""
        },
          "lowerExtremityEdema": "",
          "dorsalFootPulse": "",
          "anusDre": "",
          "mammaryGland": "",
          "gynaecology": {
          "vulva": "",
            "vagina": "",
            "cervical": "",
            "uterineBody": "",
            "adnexa": ""
        },
          "bodyOther": ""
        }
        }
      },
      methods :{
        saveDate (){
          return sessionStorage.setItem('CheckBodyListDate',JSON.stringify(this.CheckBodyList));
        },
        getexamination:function(){
        	var vm = this;
        	var result = this.examinationList;
        	var subdata = vm.CheckBodyList;
    	 	Object.keys(result).forEach(function(keystr){
		    	Object.keys(subdata).forEach(function(key){
			    	if(keystr==key){
			    		if(!empty(result[keystr])){
			    			subdata[key]=result[keystr];
			    		}
			    	}
				});
			});
        }
      },
      created(){
      	var vm = this;
      	console.log(this.examinationList);
      	vm.getexamination();
      	//vm.CheckBodyList=this.examinationList;
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
            width: 5.5vw;
            text-align: right;
            &.time{
              color: #999999;
              position: relative;
              right: 25%;
              vertical-align: middle;
              width: 7vw;
              top: -.03rem;
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
            background-color: #FFFFFF;
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
      background-color: #FFFFFF;
      option{
        outline: none;
        background-color: #FFFFFF;
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
