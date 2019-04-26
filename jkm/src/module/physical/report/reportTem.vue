<template>
  <div class="main">
    <div class="a" v-if="Type=='A'">
      <div class="title">{{showData.conclusion}}</div>
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
          <span class="value" v-if="showData.RV5ValueMV">{{showData.RV5ValueMV+showData.SV1ValueMV}}</span>
          <span v-else></span>
        </p>
        <p>
          <span>PWidth(ms)：</span>
          <span class="value">{{showData.PWidth}}</span>
        </p>
      </div>
      <div class="one">
        <div class="flex">
          <p>
            <span>基线滤波(Hz)：</span>
            <span class="value">0.05</span>
          </p>
          <p>
            <span>工频滤波(Hz)：</span>
            <span class="value">100</span>
          </p>
          <p>
            <span>肌电滤波(Hz)：</span>
            <span class="value">40</span>
          </p>
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
      <img class="result_img" :src="showData.ReportUrl" alt>
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
          <div v-if='showData.SystolicStatus=="Normal"'>{{showData.BloodPressure_Systolic}}</div>
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
          <div v-if="showData.DiastolicStatus=='Normal'">{{showData.BloodPressure_Diastolic}}</div>
        </div>
        <div>{{showData.DiaRefValue}}</div>
      </div>
      <div class="common">
        <div>平均压(mmHg)</div>
        <div>
          <div class="up" v-if="false">
            <span>{{showData.BloodPressure_Mean}}</span>
            <span>&nbsp;↑</span>
          </div>
          <div>{{showData.BloodPressure_Mean}}</div>
        </div>
        <div>{{showData.MeanRefValue}}</div>
      </div>
      <div class="common">
        <div>脉率(BPM)</div>
        <div>
          <div>{{showData.VS_HeartRate}}</div>
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
          <div v-if="showData.status=='Normal'">{{showData.saturation}}</div>
        </div>
        <div>{{showData.saturationRefValue}}</div>
      </div>
      <div class="common">
        <div>脉率(BPM)</div>
        <div>
          <div>{{showData.VS_HeartRate}}</div>
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
          <div class="value">血糖（mmol/L)</div>
        </div>
        <div class="equals">
          <div class="sp">
            <div class="title">本次结果</div>
            <div class="value">
              <p v-if="showData.status&&showData.status!='Normal'">{{showData.value}}
                <span v-if="showData.status=='Upper'">&nbsp;↑</span>
                <span v-if="showData.status=='Lower'">&nbsp;↓</span>
              </p>
              <span v-if="showData.status=='Normal'">{{showData.value}}</span>
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
          <div v-if="showData.status=='Normal'">{{showData.value}}</div>
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
  </div>
</template>
<script>
export default {
  name: "reportTem",
  props:['Type','showData'],
  data() {
    return {};
  },
  methods: {},
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
    border-bottom: 1px solid #eee;
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
    width: 14rem;
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
    height: 4.87rem;
  }
}
.b,
.c,
.e {
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

