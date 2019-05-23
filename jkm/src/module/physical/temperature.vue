<template>
  <div class="temperature">
    <header>请输入体温数据
      <ignore   :preindex="4" />
    </header>
    <div id="panel" class="panel">
      <div class="input-item-box">
        <div class="input-item">
          <span>体温</span>
          <input type="number" value placeholder="请输入" v-model="temperature">
          <span class="unit">℃</span>
        </div>
      </div>
    </div>
    <div class="flex" v-show='showFooter'>
      <manu  :manu='4' :type='1'></manu>
      <div class="save-button cliect" @click="saveData(recordId)">保存</div>
    </div>
  </div>
</template>
<script>
import { savePhysicalExamData } from "API/requst";
import ignore from "./result//ignore.vue";
import manu from "./result/manu.vue";
import { getURLParameter } from "utils/util";

export default {
  name: "temperature",
  props: {
    recordId: {
      type: String,
      default: "1259056768"
    },
    'showFooter':{
			type:Boolean,
			default:true
		}
  },
  data() {
    return {
      temperature: "", //体温
      urlData: ""
    };
  },
  methods: {
    saveData() {
      if (!/^[1-9]{1}\d{1}(.[0-9]+)?$/.test(this.temperature)) {
        this.alertDefault({
          text: "请输入正确体温",
          rowButton: false,
          leftButtonText: "取消",
          rightButtonText: "确定"
        });
        return false;
      }
      var vm = this;
      var data = [
        {
          recordTime: Date.now(),
          type: "heat",
          value: String(vm.temperature).slice(0, 4),
          unit: "℃"
        }
      ];
      savePhysicalExamData({
        hospitalCode: sessionStorage.getItem("hospitalCode"),
        medicalRecordFolderId: this.recordId,
        exams: data
      }).then(function(res){
      	   vm.showtoast('保存成功')
      	    vm.$emit('promote',4,1)
//				vm.$emit('nexttab','BMI',true)
      },err => {
        vm.alertDefault({
          text: err.data.resultMessage,
          rowButton: false,
          leftButtonText: "取消",
          rightButtonText: "确定"
        });
      })
    }
  },
  components: {
    ignore,
    manu
  }
};
</script>
<style lang="scss" scoped>
.temperature {
  width: 100%;
  height: 100%;
}
header {
  height: 1.3rem;
  line-height: 1.3rem;
  font-family: PingFangSC-Medium;
  font-size: 0.4rem;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  position: relative;
}
header /deep/ .ignore {
  line-height: 0.52rem;
}
input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}
.panel {
  width: calc(100% - 0.8rem);
  height: 5.6rem;
  box-shadow: 0px 0px 15px 6px #f3f8fd;
  position: relative;
  margin: 0 auto;
  background: url(../../assets/bloodSugar.png) no-repeat right bottom;
  background-size: 4.2rem 4.2rem;
  .input-item-box {
    width: 31.5vw;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    height: 8vw;
  }
  .input-item {
    position: relative;
    margin: 0.28rem 0;
    text-align: right;
    span {
      vertical-align: middle;
      &:nth-of-type(1) {
        margin-right: 0.2rem;
        font-size: 0.4rem;
      }
    }
    input {
      max-width: 3.46rem;
      border: solid 1px #666666;
      border-radius: 0.1rem;
      padding: 0.22rem 0.15rem;
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 0.4rem;
      color: #333;
      letter-spacing: 0;
    }
    .unit {
      position: absolute;
      top: 0.26rem;
      right: 0.3rem;
      color: #666666;
      display: inline-block;
      width: 1.1rem;
      text-align: right;
      font-size:0.28rem ;
    }
  }
}
.flex {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: .4rem;
  display: flex;
  padding: 0 0.4rem;
  justify-content: space-between;
  .save-button {
    width: 19.5%;
    height: .9rem;
    text-align: center;
    line-height: .9rem;
    background-color: #3c9bff;
    border-radius: 5px;
    float: right;
    font-size: 0.3rem;
    color: #ffffff;
    letter-spacing: 0;
  }
  .manu{
  	font-size: 0.3rem;
  }
}
</style>
