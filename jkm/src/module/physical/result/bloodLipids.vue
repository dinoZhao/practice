<template>
  <div class="temperature">
    <!--<headLine/>-->
    <header>
      请输入血脂数据
      <ignore class="ignore"   @click.native='$emit("liberate")' :preindex="7"></ignore>
    </header>
    <div id="panel" class="panel">
      <div class="input-item-box">
        <div class="input-item">
          <span>总胆固醇</span>
          <input type="number" value placeholder="请输入" v-model="writeData1">
          <span class="unit">mmol/L</span>
        </div>
        <div class="input-item">
          <span>甘油三酯</span>
          <input type="number" value placeholder="请输入" v-model="writeData2">
          <span class="unit">mmol/L</span>
        </div>
        <div class="input-item">
          <span>高密度脂蛋白胆固醇</span>
          <input type="number" value placeholder="请输入" v-model="writeData3">
          <span class="unit">mmol/L</span>
        </div>
        <div class="input-item">
          <span>低密度脂蛋白胆固醇</span>
          <input type="number" value placeholder="请输入" v-model="writeData4">
          <span class="unit">mmol/L</span>
        </div>
      </div>
    </div>
    <div class="control-bottom" v-show="showFooter">
      <manu :type="1" :manu="7"></manu>
      <div class="save-button cliect" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
import headLine from "components/headline/headline.vue";
import ignore from "./ignore.vue";
import manu from "./manu.vue";
import { savePhysicalExamData } from "API/requst";
import util from "utils/util";
export default {
  props: {
    personId: {},
    recordId: {},
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  name: "bloodLipids",
  components: {
    headLine,
    ignore,
    manu
  },
  data() {
    return {
      writeData1:'',
      writeData2: '',
      writeData3: '',
      writeData4: '',
    };
  },
  methods: {
    save() {
      let vm = this;
      var total = [],typeArr = ['BloodFat_Cholesterin','BloodFat_Triglyceride','BloodFat_Chdl','BloodFat_Cldl']
      for(var i=1;i<5;i++){
        var str = 'writeData'+i;
        let exams = {
          recordTime: new Date().getTime(),
          type: typeArr[i-1],
          value: vm[str],
          unit: "mmol/L",
        };
        total.push(exams)
      }
      let params = {
        timeStamp: new Date().getTime(),
        deviceId: "",
        hospitalCode: sessionStorage.getItem("hospitalCode"),
        exams: total,
        medicalRecordFolderId: vm.recordId
      };
      savePhysicalExamData(params) .then(data => {
           //此处为回调函数
           this.showtoast("保存成功");
           this.$emit("promote", 7, 1);
         });
        
    }
  },
  created() {
    var vm = this;
  },
  mounted() {}
};
</script>

<style scoped lang="scss" type="text/css">
.temperature {
  width: 100%;
  height: 100%;
}
header {
  height: 80px;
  line-height: 80px;
  font-family: PingFangSC-Medium;
  font-size: 0.4rem;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  position: relative;
}
.ignore {
  line-height: 0.52rem;
}
.panel {
  width: calc(100% - 0.8rem);
  height: 30vw;
  top: 1vw;
  box-shadow: 0px 0px 15px 6px #f3f8fd;
  margin: 0 auto;
  position: relative;
  background: url(../../../assets/lipid_bkg.png);
  background-size: 24%;
  background-repeat: no-repeat;
  background-position: right bottom;
  padding: 0 0.4rem;
  box-sizing: border-box;
  .input-item-box {
    width: 60%;
    text-align: right;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .input-item {
    position: relative;
    margin: 0.28rem 0;
    span {
      vertical-align: middle;
      font-size: 0.3rem;
      margin-right: .2rem;
    }
    input {
      max-width: 3rem;
      border: solid 1px #666666;
      border-radius: 0.1rem;
      padding: 0.22rem 0.15rem;
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      color: #333;
      letter-spacing: 0;
    }
    input::-webkit-input-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      color: #999;
      letter-spacing: 0;
    }
    .unit {
      position: absolute;
      top: 0.32rem;
      /*left: 4.9rem;*/
      right: 1vw;
      color: #666666;
      display: inline-block;
      width: 1.1rem;
      text-align: right;
      font-size: 0.25rem;
    }
  }
}
.control-bottom {
  position: absolute;
  bottom: 0.4rem;
  width: 100%;
  display: flex;
  padding: 0 0.4rem;
  justify-content: space-between;
  box-sizing: border-box;
}
.manu {
  // display: inline-block;
  // margin-left: 0.3rem;
  font-size: 0.3rem;
}
.save-button {
  width: 19.5%;
  height: 0.9rem;
  // display: inline-block;
  // transform: translate(21%,0);
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.9rem;
  color: white;
  background-color: #3c9bff;
  border-radius: 5px;
  // vertical-align: middle;
}
</style>
