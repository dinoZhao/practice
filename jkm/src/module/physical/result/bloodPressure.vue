<template>
  <div class="temperature">
    <!--<headLine/>-->
    <header>
      请输入血压数据
      <ignore class="ignore" :preindex="1"></ignore>
    </header>
    <div id="panel" class="panel">
      <div class="input-item-box">
        <div class="input-item">
          <span id>收缩压</span>
          <input type="number" name id value placeholder="请输入" @input="inputshrink">
          <span class="unit">mmHg</span>
        </div>
        <div class="input-item">
          <span id>舒张压</span>
          <input type="number" name id value placeholder="请输入" @input="inputdiastole">
          <span class="unit">mmHg</span>
        </div>
        <div class="input-item" style="display: none;">
          <span id>平均压</span>
          <input type="number" name id value placeholder="请输入" @input="inputaverage">
          <span class="unit">mmHg</span>
        </div>
        <div class="input-item">
          <span id>脉率</span>
          <input type="number" name id value placeholder="请输入" @input="inputpulse">
          <span class="unit">BPM</span>
        </div>
      </div>
    </div>
    <div class="control-bottom" v-show="showFooter">
      <!-- <div class="manu">
				
      </div>-->
      <manu :type="1" :manu="1"></manu>
      <div class="left" @click="toggle($event)">
        <div :class="{on:mode==0}">成人模式</div>
        <div :class="{on:mode==1}">儿童模式</div>
        <div :class="{on:mode==2}">婴幼儿模式</div>
      </div>
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
  name: "bloodPressure",
  components: {
    headLine,
    ignore,
    manu
  },
  data() {
    return {
      shrinkPressure: "",
      diastole: "",
      average: "",
      pulse: "",
      mode: 0
    };
  },
  methods: {
    toggle(e) {
      switch (e.target.innerText) {
        case "成人模式":
          this.mode = 0;
          break;
        case "儿童模式":
          this.mode = 1;
          break;
        case "婴幼儿模式":
          this.mode = 2;
          break;
          defaut: break;
      }
    },
    showToast(value) {
      let vm = this;
      var standard = /^\+?[1-9][0-9]*$/;
      console.log(standard.test(value));
      if (standard.test(value)) {
        return true;
      } else {
        vm.showtoast("请填入数字");
        return false;
      }
    },
    inputshrink(e) {
      let vm = this;
      if (vm.showToast(e.target.value)) {
        vm.shrinkPressure = e.target.value;
      }
    },

    inputdiastole(e) {
      let vm = this;
      if (vm.showToast(e.target.value)) {
        vm.diastole = e.target.value;
      }
    },

    inputaverage(e) {
      let vm = this;
      if (vm.showToast(e.target.value)) {
        vm.average = e.target.value;
      }
    },

    inputpulse(e) {
      let vm = this;
       vm.pulse = e.target.value;
    },
    save() {
      let vm = this;
      console.log(vm.current_food_status);
      if (
        !(
          vm.pulse != "" ||
          vm.average != "" ||
          vm.diastole != "" ||
          vm.shrinkPressure != ""
        )
      ) {
        vm.showtoast("表单填写不全");
        return false;
      }
      let exams1 = {
        recordTime: new Date().getTime(),
        type: "sysBloodPressure",
        value: vm.shrinkPressure,
        unit: "mmHg",
        condition: ""
      };
      let exams2 = {
        recordTime: new Date().getTime(),
        type: "diaBloodPressure",
        value: vm.diastole,
        unit: "mmHg",
        condition: ""
      };
      let exams3 = {
        recordTime: new Date().getTime(),
        type: "averBloodPressure",
        value: vm.average,
        unit: "mmHg",
        condition: ""
      };
      let exams4 = {
        recordTime: new Date().getTime(),
        type: "rate",
        value: vm.pulse,
        unit: "BPM",
        condition: ""
      };
      let arr = [];
      arr.push(exams1);
      arr.push(exams2);
      arr.push(exams3);
      arr.push(exams4);
      let params = {
        timeStamp: new Date().getTime(),
        deviceId: "",
        hospitalCode: sessionStorage.getItem("hospitalCode"),
        exams: arr,
        medicalRecordFolderId: vm.recordId
      };
      savePhysicalExamData(params).then(data => {
        //此处为回调函数
        this.showtoast("保存成功");
        this.$emit("promote", 1, 1);
        //				this.$emit('nexttab','血氧',true)
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
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
  font-size: 0.28rem;
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
  height: 30vw;
  box-shadow: 0px 0px 15px 6px #f3f8fd;
  margin: 0 auto;
  position: relative;
  top: 1vw;
  background: url(../../../assets/pressure1.png);
  background-size: 18%;
  background-repeat: no-repeat;
  background-position: 101% 16vw;
  width: calc(100% - 0.8rem);
  .input-item-box {
    width: 34vw;
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
      font-size: 0.35rem;
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
      top: 0.38rem;
      left: 26.3vw;
      color: #666666;
      display: inline-block;
      width: 1.1rem;
      text-align: right;
      font-size: 0.25rem;
    }
  }
}
.control-bottom {
  width: 100%;
  position: absolute;
  height: 0.94rem;
  bottom: 0.4rem;
  font-size: 0.3rem;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.manu {
  display: inline-block;
  position: absolute;
  vertical-align: middle;
  font-size: 0.3rem;
}
.left {
  width: 50%;
  display: inline-flex;
  overflow: hidden;
  position: relative;
  left: 3.1rem;
  div {
    border-radius: 5px;
    color: #fc9452;
    line-height: 0.9rem;
    text-align: center;
    margin-right: 0.2rem;
    flex-grow: 1;
  }
  .on {
    background: #fc9452;
    color: #ffffff;
  }
}

.save-button {
  width: 19.5%;
  height: 0.9rem;
  display: inline-block;
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.9rem;
  color: white;
  background-color: #3c9bff;
  border-radius: 5px;
  vertical-align: middle;
  float: right;
}
</style>
