<template>
  <div class="main">
    <div class="a" v-if="Type=='A'">
      <div class="title">{{showData.diagnosis||showData.conclusion}}</div>
      <div class="border">
        <p>
          <span>HR(bpm)：</span>
          <span class="value">{{showData.HeartRateBPM}}</span>
        </p>
        <p>
          <span>PR(ms)：</span>
          <span class="value">{{showData.PRDurationMS}}</span>
        </p>
        <p>
          <span>QRS(ms)：</span>
          <span class="value">{{showData.QRSTimeLimitMS}}</span>
        </p>
        <p>
          <span>QT/QTc(ms)：</span>
          <span class="value" v-if="showData.QTDurationMS">{{showData.QTDurationMS+'/'+showData.QTcDurationMS}}</span>
          <span v-else>''</span>
        </p>
      </div>
      <div class="border">
        <p>
          <span>P/QRS/T轴(°)：</span>
          <span class="value" v-if="showData.PElectricAxis">{{showData.PElectricAxis+'/'+showData.QRSElectricAxis+'/'+showData.TElectricAxis}}</span>
          <span v-else></span>
        </p>
        <p>
          <span>RV5/SV1(mV)：</span>
          <span class="value" v-if="showData.RV5ValueMV">{{showData.RV5ValueMV+'/'+showData.SV1ValueMV}}</span>
          <span v-else></span>
        </p>
        <p>
          <span>RV5+SV1(mV)：</span>
          <span class="value" v-if="showData.RV5ValueMV">{{sv1AndRv5}}</span>
          <span v-else></span>
        </p>
        <!-- <p>
          <span>PWidth(ms)：</span>
          <span class="value">{{showData.PWidth}}</span>
        </p> -->
      </div>
      <div class="one">
        <div class="flex">
          <!-- <p>
            <span>基线滤波(Hz)：</span>
            <span class="value">0.05</span>
          </p> -->
          <p>
            <span>工频滤波(Hz)：</span>
            <span class="value">100</span>
          </p>
          <!-- <p>
            <span>肌电滤波(Hz)：</span>
            <span class="value">40</span>
          </p> -->
          <p>
            <span>灵敏度(mm/mV)：</span>
            <span class="value">10</span>
          </p>
          <p>
            <span>波形速率(mm/s)：</span>
            <span class="value">25</span>
          </p>
        </div>
      </div>
      <viewer>
        <img class="result_img" :src="showData.ReportUrl">
      </viewer>
    </div>
    <div class="b" v-if="Type=='B'">
      <div class="subtitle">
        <p>检测项目</p>
        <p>本次结果</p>
        <p>参考值</p>
      </div>
      <div class="common">
        <div>收缩压(mmHg)</div>
        <div>
          <div class="up" v-if="showData.SystolicStatus&&showData.SystolicStatus!='Normal'">
            <span>{{showData.BloodPressure_Systolic}}</span>
            <span v-if="showData.SystolicStatus=='Upper'">&nbsp;↑</span>
            <span v-if="showData.SystolicStatus=='Lower'">&nbsp;↓</span>
          </div>
          <div v-else>{{showData.BloodPressure_Systolic}}</div>
        </div>
        <div>{{showData.SysRefValue}}</div>
      </div>
      <div class="common">
        <div>舒张压(mmHg)</div>
        <div>
          <div class="up" v-if="showData.DiastolicStatus&&showData.DiastolicStatus!='Normal'">
            <span>{{showData.BloodPressure_Diastolic}}</span>
            <span v-if="showData.DiastolicStatus=='Upper'">&nbsp;↑</span>
            <span v-if="showData.DiastolicStatus=='Lower'">&nbsp;↓</span>
          </div>
          <div v-else>{{showData.BloodPressure_Diastolic}}</div>
        </div>
        <div>{{showData.DiaRefValue}}</div>
      </div>
      <div class="common">
        <div>平均压(mmHg)</div>
        <div>
          <div class="up" v-if="showData.MeanStatus&&showData.MeanStatus!='Normal'">
            <span>{{showData.BloodPressure_Mean}}</span>
            <span v-if="showData.MeanStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.BloodPressure_Mean}}</div>
        </div>
        <div>{{showData.MeanRefValue}}</div>
      </div>
      <div class="common">
        <div>脉率(BPM)</div>
        <div>
          <div class="up" v-if="showData.VS_HeartRateStatus&&showData.VS_HeartRateStatus!='Normal'">
            <span>{{showData.VS_HeartRate}}</span>
            <span v-if="showData.VS_HeartRateStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.VS_HeartRate}}</div>
        </div>
        <div>{{showData.VSRefValue}}</div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont"><p v-for="(item, index) in showData.suggestions" :key="index">{{item}}</p></div>
      </div>
    </div>
    <div class="c" v-if="Type=='C'">
      <div class="subtitle">
        <p>检测项目</p>
        <p>本次结果</p>
        <p>参考值</p>
      </div>
      <div class="common">
        <div>血氧饱和度(%)</div>
        <div>
          <div class="up" v-if="showData.status&&showData.status!='Normal'">
            <span>{{showData.saturation}}</span>
            <span v-if="showData.status=='Upper'">&nbsp;↑</span>
            <span v-if="showData.status=='Lower'">&nbsp;↓</span>
          </div>
          <div v-else>{{showData.saturation}}</div>
        </div>
        <div>{{showData.saturationRefValue}}</div>
      </div>
      <div class="common">
        <div>脉率(BPM)</div>
        <div>
          <div class="up" v-if="showData.VS_HeartRateStatus&&showData.VS_HeartRateStatus!='Normal'">
            <span>{{showData.VS_HeartRate}}</span>
            <span v-if="showData.VS_HeartRateStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.VS_HeartRate}}</div>
        </div>
        <div>{{showData.VSRefValue}}</div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont">
          <p v-for='(item,index) in showData.suggestions' :key="index">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="d" v-if="Type=='D'">
      <div class="from">
        <div class="equals">
          <div class="title">检测项目</div>
          <div class="value">血糖(mmol/L)</div>
        </div>
        <div class="equals">
          <div class="sp">
            <div class="title">本次结果</div>
            <div class="value">
              <p v-if="showData.status&&showData.status!='Normal'">{{showData.value}}
                <span v-if="showData.status=='Upper'">&nbsp;↑</span>
                <span v-if="showData.status=='Lower'">&nbsp;↓</span>
              </p>
              <span v-else>{{showData.value}}</span>
            </div>
          </div>
          <div class="sp">
            <div class="title">测量状态</div>
            <div class="value">{{showData.state}}</div>
          </div>
        </div>
        <div class="equals">
          <div class="title">参考值</div>
          <div class="value">{{showData.refValue}}</div>
        </div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont">
          <p v-for='(item,index) in showData.suggestions' :key="index">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="e" v-if="Type=='E'">
      <div class="subtitle">
        <p>检测项目</p>
        <p>本次结果</p>
        <p>参考值</p>
      </div>
      <div class="common">
        <div>体温(℃)</div>
        <div>
          <div class="up" v-if="showData.status&&showData.status!='Normal'">
            <span>{{showData.value}}</span>
            <span v-if="showData.status=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.value}}</div>
        </div>
        <div>{{showData.refValue}}</div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont">
          <p v-for='(item,index) in showData.suggestions' :key="index">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="e" v-if="Type=='F'">
      <div class="subtitle">
        <p>检测项目</p>
        <p>本次结果</p>
        <p>参考值</p>
      </div>
      <div class="common">
        <div>BMI</div>
        <div>
          <div class="up" v-if="showData.bmiStatus&&showData.bmiStatus!='Normal'">
            <span>{{showData.bmi}}</span>
            <span v-if="showData.bmiStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.bmi}}</div>
        </div>
        <div>{{showData.bmiRefValue}}</div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont">
          <p v-for='(item,index) in showData.suggestions' :key="index">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="f" v-if="Type=='G'">
      <div class="subtitle">
        <p>检测项目</p>
        <p>本次结果</p>
        <p>参考值</p>
      </div>
      <div class="common">
        <div>白细胞</div>
        <div>
          <div class="ups" v-if="showData.leuStatus&&showData.leuStatus!='Normal'">
            <span>{{showData.leu}}</span>
            <!-- <span v-if="showData.leuStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.leu}}</div>
        </div>
        <div>{{showData.leuRefValue}}</div>
      </div>
      <div class="common">
        <div>亚硝酸盐</div>
        <div>
          <div class="ups" v-if="showData.nitStatus&&showData.nitStatus!='Normal'">
            <span>{{showData.nit}}</span>
            <!-- <span v-if="showData.nitStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.nit}}</div>
        </div>
        <div>{{showData.nitRefValue}}</div>
      </div>
      <div class="common">
        <div>尿胆原</div>
        <div>
          <div class="ups" v-if="showData.ubgStatus&&showData.ubgStatus!='Normal'">
            <span>{{showData.ubg}}</span>
            <!-- <span v-if="showData.ubgStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.ubg}}</div>
        </div>
        <div>{{showData.ubgRefValue}}</div>
      </div>
      <div class="common">
        <div>蛋白质</div>
        <div>
          <div class="ups" v-if="showData.proStatus&&showData.proStatus!='Normal'">
            <span>{{showData.pro}}</span>
            <!-- <span v-if="showData.proStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.pro}}</div>
        </div>
        <div>{{showData.proRefValue}}</div>
      </div>
      <div class="common">
        <div>酸碱度</div>
        <div>
          <div class="up" v-if="showData.phStatus&&showData.phStatus!='Normal'">
            <span>{{showData.ph}}</span>
            <span v-if="showData.phStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.ph}}</div>
        </div>
        <div>{{showData.phRefValue}}</div>
      </div>
      <div class="common">
        <div>比重</div>
        <div>
          <div class="up" v-if="showData.sgStatus&&showData.sgStatus!='Normal'">
            <span>{{showData.sg}}</span>
            <span v-if="showData.sgStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.sg}}</div>
        </div>
        <div>{{showData.sgRefValue}}</div>
      </div>
      <div class="common">
        <div>潜血</div>
        <div>
          <div class="ups" v-if="showData.bloStatus&&showData.bloStatus!='Normal'">
            <span>{{showData.blo}}</span>
            <!-- <span v-if="showData.bloStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.blo}}</div>
        </div>
        <div>{{showData.bloRefValue}}</div>
      </div>
      <div class="common">
        <div>酮体</div>
        <div>
          <div class="ups" v-if="showData.ketStatus&&showData.ketStatus!='Normal'">
            <span>{{showData.ket}}</span>
            <!-- <span v-if="showData.ketStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.ket}}</div>
        </div>
        <div>{{showData.ketRefValue}}</div>
      </div>
      <div class="common">
        <div>胆红素</div>
        <div>
          <div class="ups" v-if="showData.bilStatus&&showData.bilStatus!='Normal'">
            <span>{{showData.bil}}</span>
            <!-- <span v-if="showData.bilStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.bil}}</div>
        </div>
        <div>{{showData.bilRefValue}}</div>
      </div>
      <div class="common">
        <div>葡萄糖</div>
        <div>
          <div class="ups" v-if="showData.gluStatus&&showData.gluStatus!='Normal'">
            <span>{{showData.glu}}</span>
            <!-- <span v-if="showData.gluStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.glu}}</div>
        </div>
        <div>{{showData.gluRefValue}}</div>
      </div>
      <div class="common">
        <div>维生素C</div>
        <div>
          <div class="ups" v-if="showData.vcStatus&&showData.vcStatus!='Normal'">
            <span>{{showData.vc}}</span>
            <!-- <span v-if="showData.vcStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span> -->
          </div>
          <div v-else>{{showData.vc}}</div>
        </div>
        <div>{{showData.vcRefValue}}</div>
      </div>
      <div class="common">
        <div>尿微量白蛋白</div>
        <div>
          <div class="up" v-if="showData.albStatus&&showData.albStatus!='Normal'">
            <span>{{showData.alb}}</span>
            <span v-if="showData.albStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.alb}}</div>
        </div>
        <div>{{showData.albRefValue}}</div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont"><p v-for="(item, index) in showData.suggestions" :key="index">{{item}}</p></div>
      </div>
    </div>
    <div class="h" v-if="Type=='H'">
      <div class="subtitle">
        <p>检测项目</p>
        <p>本次结果</p>
        <p>参考值</p>
      </div>
      <div class="common">
        <div>总胆固醇(mmol/L)</div>
        <div>
          <div class="up" v-if="showData.cholesterinStatus&&showData.cholesterinStatus!='Normal'">
            <span>{{showData.cholesterin}}</span>
            <span v-if="showData.cholesterinStatus=='Upper'">&nbsp;↑</span>
            <span v-if="showData.cholesterinStatus=='Lower'">&nbsp;↓</span>
          </div>
          <div v-else>{{showData.cholesterin}}</div>
        </div>
        <div>{{showData.cholesterinRefValue}}</div>
      </div>
      <div class="common">
        <div>甘油三酯(mmol/L)</div>
        <div>
          <div class="up" v-if="showData.triglycerideStatus&&showData.triglycerideStatus!='Normal'">
            <span>{{showData.triglyceride}}</span>
            <span v-if="showData.triglycerideStatus=='Upper'">&nbsp;↑</span>
            <span v-if="showData.triglycerideStatus=='Lower'">&nbsp;↓</span>
          </div>
          <div v-else>{{showData.triglyceride}}</div>
        </div>
        <div>{{showData.triglycerideRefValue}}</div>
      </div>
      <div class="common">
        <div>高密度脂蛋白胆固醇(mmol/L)</div>
        <div>
          <div class="up" v-if="showData.chdlStatus&&showData.chdlStatus!='Normal'">
            <span>{{showData.chdl}}</span>
            <span v-if="showData.chdlStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.chdl}}</div>
        </div>
        <div>{{showData.chdlRefValue}}</div>
      </div>
      <div class="common">
        <div>低密度脂蛋白胆固醇(mmol/L)</div>
        <div>
          <div class="up" v-if="showData.cldlStatus&&showData.cldlStatus!='Normal'">
            <span>{{showData.cldl}}</span>
            <span v-if="showData.cldlStatus=='Upper'">&nbsp;↑</span>
            <span v-else>&nbsp;↓</span>
          </div>
          <div v-else>{{showData.cldl}}</div>
        </div>
        <div>{{showData.cldlRefValue}}</div>
      </div>
      <div class="suggestion">
        <div class="tit">健康建议：</div>
        <div class="cont"><p v-for="(item, index) in showData.suggestions" :key="index">{{item}}</p></div>
      </div>
    </div>
  </div>
</template>
<script>
//引入图片查看器
import Viewer from 'v-viewer'
export default {
  name: "reportTem",
  props:['Type','showData'],
  data() {
    return {
      Options:{//预览插件配置
        "inline": true, "button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": false,
        "movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, 
        "fullscreen": true, "keyboard": false, "url": "data-source"
      },
    };
  },
  methods: {},
  created(){  	
    var vm = this;
    Viewer.setDefaults({
			Options:vm.Options
		})
    console.log(vm.showData);
  },
  computed:{
    sv1AndRv5:function(){
      return (this.showData.RV5ValueMV+this.showData.SV1ValueMV).toFixed(2)
    }
  }
};
</script>
<style lang="scss" scoped>
.a {
  .title {
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
    margin-top: 0.2rem;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    font-size: 0.36rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }
  .border {
    display: inline-block;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
    width: 13rem;
    display: flex;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      letter-spacing: 0;
      line-height: 0.33rem;
      display: inline-block;
      text-align: left;
      height: 0.73rem;
      line-height: 0.73rem;
      color: #666666;
      &:nth-of-type(1) {
        width: 3.61rem;
      }
      &:nth-of-type(2) {
        width: 4.12rem;
      }
      &:nth-of-type(3) {
        width: 3.23rem;
      }
      &:nth-of-type(4) {
        width: 2.82rem;
      }
      .value {
        color: #333;
      }
    }
  }
  .one {
    height: 0.53rem;
    line-height: 0.53rem;
    margin-top: 0.3rem;
    display: inline-block;
    width: 12rem;
    .flex {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    p {
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 0.2rem;
      color: #666666;
      letter-spacing: 0;
      line-height: 0.33rem;
      span:nth-of-type(2) {
        color: #333;
      }
    }
  }
  .result_img {
    width: 14rem;
  }
}
.b,
.c,
.e,.f,.h {
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .subtitle {
    background-color: rgba(60, 155, 255, 0.05);
    height: 0.6rem;
    width: 78.125%;
    p {
      display: inline-block;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 32.8%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 0.32rem;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
    }
  }
  .common {
    width: 78.125%;
    height: 1.03rem;
    border-bottom: 1px solid #eee;
    &>div{
      vertical-align: top;
    }
    div {
      display: inline-block;
      height: 1.03rem;
      line-height: 1.03rem;
      width: 32.8%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 0.32rem;
      font-weight: 600;
      color: #333333;
      letter-spacing: 0;
      .up {
        display: inline-block;
        width: auto;
        line-height: 0.42rem;
        padding: 0.04rem 0.24rem;
        background: #d43c33;
        border-radius: 0.25rem;
        color: #fff;
        height: 0.5rem;
        box-sizing: border-box;
        vertical-align: middle;
      }
      .ups{
        height: 0.5rem;
        display: inline-block;
        line-height: 0.42rem;
        color: #d43c33;
        vertical-align: middle;
      }
    }
  }
  .suggestion {
    width: 78.125%;
    background-color: rgba(60, 155, 255, 0.05);
    padding: 0.2rem 0.3rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    .tit {
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #333333;
      letter-spacing: 0;
      line-height: 0.38rem;
      text-align: left;
    }
    .cont {
      margin-top: 0.2rem;
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #333;
      letter-spacing: 0;
      text-align: justify;
      p{
        line-height: 0.4rem;
      }
    }
  }
}
.h{
  .subtitle>p{
    width: 28.8%;
  }
  .subtitle>p:nth-of-type(1){
    width: 40.8%;
  }
  .common{
    div{
      width: 28.8%;
      &:nth-of-type(1){
        width: 40.8%;
      }
    }
  }
}
.d {
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .from {
    display: flex;
    height: 1.62rem;
    border-bottom: 1px solid #eee;
    .equals {
      width: 4.5rem;
      height: 100%;
      background-color: rgba(60, 155, 255, 0.05);
      &:nth-of-type(2){
        display: flex;
        width: 6rem;
      }
      .sp{
        width: 50%;
        display: flex;
        flex-direction: column;
      }
      .title {
        height: 0.6rem;
        line-height: 0.6rem;
        font-family: PingFangSC-Regular;
        font-size: 0.32rem;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
      }
      .value {
        height: 1.02rem;
        line-height: 1.02rem;
        font-family: PingFangSC-Medium;
        font-size: .32rem;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        font-weight: 600;
        background-color: #fff;
        p{
          display: inline-block;
          width: auto;
          line-height: 0.42rem;
          padding: 0.04rem 0.24rem;
          background: #d43c33;
          border-radius: 0.25rem;
          color: #fff;
          height: 0.5rem;
          box-sizing: border-box;
          vertical-align: middle;
        }
      }
    }
  }
  .suggestion {
    width: 78.125%;
    background-color: rgba(60, 155, 255, 0.05);
    padding: 0.2rem 0.3rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    .tit {
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #333333;
      letter-spacing: 0;
      line-height: 0.38rem;
      text-align: left;
    }
    .cont {
      margin-top: 0.2rem;
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #333;
      letter-spacing: 0;
      text-align: justify;
      line-height: 0.4rem;
    }
  }
}
</style>
