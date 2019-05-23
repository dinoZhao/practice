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
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.cbc['oxyphorase']">
          <span class="unit">g/L</span>
        </div>
        <div class="exercise_content">
          <span>白细胞</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.cbc['leucocyte']">
          <span class="unit">10^9/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>血小板</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.cbc['platelet']">
          <span class="unit">10^9/L</span>
        </div>
      </div>
      <div class="text_content">
        <span>其他</span>
        <input type="text" placeholder="请输入" v-model="auxiliaryList.cbc['other']">
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>尿常规 *</span>
        <button type="button" class="detect">检测</button>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>尿蛋白</span>
          <select v-model="auxiliaryList['urinalysis'].protein">
            <option value="">请选择</option>
            <option :value="counts.code" v-for="counts in count">{{counts.name}}</option>
          </select>
        </div>
        <div class="exercise_content">
          <span>尿糖</span>
          <select v-model="auxiliaryList.urinalysis['sugar']">
            <option value="">请选择</option>
            <option :value="counts.code" v-for="counts in count">{{counts.name}}</option>
          </select>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span>尿酮体</span>
          <select v-model="auxiliaryList.urinalysis['kb']">
            <option value="">请选择</option>
            <option :value="counts.code" v-for="counts in count">{{counts.name}}</option>
          </select>
        </div>
        <div class="exercise_content">
          <span>尿潜血</span>
          <select v-model="auxiliaryList.urinalysis['bld']">
            <option value="">请选择</option>
            <option :value="counts.code" v-for="counts in count">{{counts.name}}</option>
          </select>
        </div>
      </div>
      <div class="text_content boderBottom">
        <span>其他</span>
        <input type="text" placeholder="请输入" v-model="auxiliaryList.urinalysis['other']">
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">空腹血糖 *</span>
            <input type="tel" placeholder="请输入" v-model="auxiliaryList.glu">
            <span class="milliliter">mmol/L</span>
            <button type="button" class="detect">检测</button>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">心电图 *</span>
            <select v-model="auxiliaryList.ecg">
              <option value="">请选择</option>
              <option :value="states.code" v-for="states in state">{{states.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">尿微量白蛋白 *</span>
            <input type="tel" placeholder="请输入" v-model="auxiliaryList.alb">
            <span class="milliliter">mg/dL</span>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">大便潜血 *</span>
            <select v-model="auxiliaryList.fob">
              <option value="">请选择</option>
              <option :value="shits.code" v-for="shits in shit">{{shits.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">糖化血红蛋白 *</span>
            <input type="text" placeholder="请输入" v-model="auxiliaryList.gh">
            <button type="button" class="detect">检测</button>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger">乙型肝炎表面抗原 *</span>
            <select class="small" v-model="auxiliaryList.hbsAg">
              <option value="">请选择</option>
              <option :value="shits.code" v-for="shits in shit">{{shits.name}}</option>
            </select>
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
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.liverFunction['sgpt']">
          <span class="unit smallunit">U/L</span>
        </div>
        <div class="exercise_content">
          <span class="bigger">血清谷草转氨酶</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.liverFunction['sgot']">
          <span class="unit smallunit">U/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span class="bigger">白蛋白</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.liverFunction['albumin']">
          <span class="unit smallunit">g/L</span>
        </div>
        <div class="exercise_content">
          <span class="bigger">总胆红素</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.liverFunction['stb']">
          <span class="unit smallunit">μmol/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content">
          <span class="bigger">结合胆红素</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.liverFunction['dbil']">
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
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.renalFunction['scr']">
          <span class="unit smallunit smaller">μmol/L</span>
        </div>
        <div class="exercise_content content_small">
          <span class="bigger right">血尿素氮</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.renalFunction['bun']">
          <span class="unit smallunit smaller">mmol/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content content_small">
          <span class="bigger right">血钾浓度</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.renalFunction['spc']">
          <span class="unit smallunit smaller">mmol/L</span>
        </div>
        <div class="exercise_content content_small">
          <span class="bigger right">血钠浓度</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.renalFunction['ssc']">
          <span class="unit smallunit smaller">mmol/L</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>血脂 *</span>
        <button type="button" class="detect">检测</button>
      </div>
      <div class="exercise">
        <div class="exercise_content content_bigger" style="width: 52%;">
          <span class="biggest" style="width: 19vw;">总胆固醇</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.bloodFat['cholesterol']">
          <span class="unit">mmol/L</span>
        </div>
        <div class="exercise_content content_bigger" style="width: 48%;text-indent: 3vw;">
          <span class="biggest" style="width: 10vw;margin-left:6%;position:relative;left:0%;">甘油三酯</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.bloodFat['triglyceride']">
          <span class="unit" style="position: absolute;left: 62%">mmol/L</span>
        </div>
      </div>
      <div class="exercise">
        <div class="exercise_content content_bigger" style="width: 52%;">
          <span class="biggest" style="width: 19vw;">血清低密度脂蛋白胆固醇</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.bloodFat['sldlc']">
          <span class="unit">mmol/L</span>
        </div>
      </div>
      <div class="exercise boderBottom">
        <div class="exercise_content content_bigger" style="width: 52%;">
          <span class="biggest" style="width: 19vw;">血清高密度脂蛋白胆固醇</span>
          <input type="tel" class="small" placeholder="请输入" v-model="auxiliaryList.bloodFat['shdlc']">
          <span class="unit">mmol/L</span>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger smalltext">胸部X线片</span>
            <select class="bigselect" v-model="auxiliaryList.xray">
              <option value="">请选择</option>
              <option :value="states.code" v-for="states in state">{{states.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger smalltext">B超</span>
            <select class="bigselect" v-model="auxiliaryList.bUltrasound['AbdBUltrasound']">
              <option value="">请选择</option>
              <option :value="states.code" v-for="states in state">{{states.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="text_content boderBottom">
        <div class="exercise">
          <div class="exercise_content exercise_contents">
            <span class="bigger smalltext">宫颈涂片</span>
            <select class="bigselect" v-model="auxiliaryList.tct">
              <option value="">请选择</option>
              <option :value="states.code" v-for="states in state">{{states.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="text_content">
        <span class="others">其他</span>
        <input type="text" placeholder="请输入" v-model="auxiliaryList.other">
      </div>
    </div>
  </div>
</template>

<script>
import { getURLParameter,dateFormat,empty } from 'utils/util'
  export default {
    props:['auxiliaryExamination'],
    data (){
      return {
        state:[
          {code:"1",name:'正常'},
          {code:"2",name:'异常'}
        ],
        shit:[
          {code:"1",name:'阴性'},
          {code:"2",name:'阳性'}
        ],
        count:[
          {code:"1",name:'-'},
          {code:"2",name:'+'},
          {code:"3",name:'++'},
          {code:"4",name:'+++'},
          {code:"5",name:'++++'},
        ],
        auxiliaryList:{
          "cbc": {
            "oxyphorase": "", //血红蛋白
            "leucocyte": "", //白细胞
            "platelet": "", //血小板
            "other": "" //其他
          },
          "urinalysis": {
            "protein": "", //尿蛋白
            "sugar": "", //尿糖
            "kb": "", //尿酮体
            "bld": "", //尿潜血
            "other": "" //其他
          },
          "glu": "", //空腹血糖
          "ecg": "", //心电图
          "alb": "", //尿微量白蛋白
          "fob": "", //大便潜血
          "gh": "",//糖化血红蛋白
          "hbsAg": "", //乙型肝炎表面抗原
          "liverFunction": {
            "sgpt": "", //血清谷丙转氨酶
            "sgot": "",//血清谷草转氨酶
            "albumin": "", //白蛋白
            "stb": "", //总胆红素
            "dbil": "" //结合胆红素
          },
          "renalFunction": {
            "scr": "", //血清肌酐
            "bun": "", //血尿素
            "spc": "",//血钾浓度
            "ssc": ""//血钠浓度
          },
          "bloodFat": {
            "cholesterol": "", //总胆固醇
            "triglyceride": "", //甘油三酯
            "sldlc": "", //血清低密度脂蛋白胆固醇
            "shdlc": "" //血清高密度脂蛋白胆固醇
          },
          "xray": "",
          "bUltrasound": {
            "AbdBUltrasound": "", //腹部B超
            "other": ""
          },
          "tct": "", //宫颈涂片
          "other": "" //其他
        }
      }
    },
    methods :{
      saveDate (){
        return sessionStorage.setItem('AccessoryDate',JSON.stringify(this.auxiliaryList));
      },
      getexamination:function(){
        var vm = this;
        var result = this.auxiliaryExamination;
        var subdata = vm.auxiliaryList;
        if(!empty(result)){
        	 Object.keys(result).forEach(function(keystr,index){
	          Object.keys(subdata).forEach(function(key){
	            if(keystr==key){
	              if(!empty(result[keystr])){
	                subdata[key]=result[keystr];
	              }
	            }
	          });
	        });
        }
      }
    },
    created(){
      var vm = this;
      vm.getexamination();
    }
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
          select{
            width: 15vw;
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
          }
          span {
            &:nth-child(1) {
              display: inline-block;
              width: 7.5vw;
              text-align: right;
              position: relative;
              vertical-align: middle;
            }
            &.bigger {
              width: 15vw;
            }
            &.biggest{
              width: 18vw;
            }
            &.right{
              text-align: right;
              width: 7.5vw;
            }
            &.unit {
              color: #666666;
              vertical-align: middle;
              width: 5vw;
              position: absolute;
              transform: translateY(-50%);
              top: 50%;
              right: 36%;
            }
            &.smallunit{
              position: absolute;
              right: 13%;
            }
            &.smaller{
              position: absolute;
              right: 20%;
            }
          }
          input.small {
            width: 14vw;
            vertical-align: middle;
          }
        }
        .content_bigger{
          width: 50%;
          span.unit{
            position: absolute;
            left: 76%;
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
          display: inline-block;
          width: 6.5vw;
          text-align: right;
          &.others{
            width: 8.5vw;
          }
        }
        input {
          width: 80%;
          margin-left: 1.6%;
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
          select.bigselect{
            width: 15vw;
          }
          span.milliliter {
            color: #666666;
            vertical-align: middle;
            position: absolute;
            right: 55%;
            top: 50%;
            transform: translateY(-50%);
            width: 5vw;
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
