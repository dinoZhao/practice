<template>
  <div class="temperature">
    <!--<headLine/>-->
    <header>
      请输入尿常规数据
      <ignore class="ignore" :preindex="6"></ignore>
    </header>
    <div id="panel" class="panel">
      <div class="left">
        <div class="write_info">
          <span>白细胞</span>
          <!--<input type="tel" placeholder="请输入" v-model="writeData1">-->
          <select name="" v-model="writeData1">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>亚硝酸盐</span>
          <select name="" v-model="writeData2">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>尿胆原</span>
          <select name="" v-model="writeData3">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>蛋白质</span>
          <select name="" v-model="writeData4">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>酸碱度</span>
          <input type="tel" placeholder="请输入" @input="input" v-model="writeData5">
        </div>
        <div class="write_info">
          <span>比重</span>
          <input type="tel" placeholder="请输入" @input="input"  v-model="writeData6">
        </div>
      </div>
      <div class="right">
        <div class="write_info">
          <span>潜血</span>
          <select name="" v-model="writeData7">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>酮体</span>
          <select name="" v-model="writeData8">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>胆红素</span>
          <select name="" v-model="writeData9">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>葡萄糖</span>
          <select name="" v-model="writeData10">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>维生素C</span>
          <select name="" v-model="writeData11">
          	<option disabled="disabled" selected value="">请选择</option>
          	<option value="-">-</option>
          	<option value="+">+</option>
          	<option value="++">++</option>
          	<option value="+++">+++</option>
          	<option value="++++">++++</option>
          </select>
        </div>
        <div class="write_info">
          <span>尿微量白蛋白</span>
          <input type="tel" placeholder="请输入" @input="input"  v-model="writeData12"><span class="unit">mg/L</span>
        </div>
      </div>
    </div>
    <div class="control-bottom" v-show="showFooter">
      <manu :type="1" :manu="6"></manu>
      <div class="save-button cliect" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
	var patrn = /^\d+\.*\d*$/;
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
  name: "urineRoutine",
  components: {
    headLine,
    ignore,
    manu
  },
  data() {
    return {
      writeData1: "",
      writeData2: "",
      writeData3: "",
      writeData4: "",
      writeData5: "",
      writeData6: "",
      writeData7: "",
      writeData8: "",
      writeData9: "",
      writeData10: "",
      writeData11: "",
      writeData12: ""
    };
  },
  methods: {
    save() {
      let vm = this;
      var total = [],typeArr = ['Urine_Leu','Urine_Nit','Urine_Ubg','Urine_Pro','Urine_Ph','Urine_Sg','Urine_Occult','Urine_Ket','Urine_Bil','Urine_Glu','Urine_Vc','Urine_Alb']
      for(var i=1;i<13;i++){
        var str = 'writeData'+i;
        let exams = {
          recordTime: new Date().getTime(),
          type: typeArr[i-1],
          value: vm[str],
        };
        total.push(exams)
      }
      
      if(!patrn.test(vm['writeData5'])&&vm['writeData5'].length!=0){
      	this.showtoast('酸碱度只能为数字')
      	return
      }
      if(!patrn.test(vm['writeData6'])&&vm['writeData6'].length!=0){
      	this.showtoast('比重只能为数字')
      	return
      }
      if(!patrn.test(vm['writeData12'])&&vm['writeData12'].length!=0){
      	this.showtoast('尿微量白蛋白只能为数字')
      	return
      }
      let params = {
        timeStamp: new Date().getTime(),
        deviceId: "",
        hospitalCode: sessionStorage.getItem("hospitalCode"),
        exams: total,
        medicalRecordFolderId: vm.recordId
      };
      savePhysicalExamData(params).then(data => {
           //此处为回调函数
           this.showtoast("保存成功");
           this.$emit("promote", 6, 1);
         });
         
    },
    input(e){
    	if(!patrn.test(e.target.value)){
    		this.showtoast('请填入数字')
    	}
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
  width: 100%;
  top: 1vw;
  box-shadow: 0px 0px 15px 6px #f3f8fd;
  margin: 0 auto;
  position: relative;
  background: url(../../../assets/urine_routine_bkg.png);
  background-size: 24%;
  background-repeat: no-repeat;
  background-position: right bottom;
  padding: 0 0.4rem;
  box-sizing: border-box;
  display: flex;
      font-size: 0.3rem;
  .left,
  .right {
    display: inline-block;
    width: 35vw;
    height: 100%;
    box-sizing: border-box;
    padding-right: 2%;
    .write_info {
      height: 0.8rem;
      position: relative;
      text-align: right;
      margin: 0.1rem 0;
      &:nth-of-type(1) {
        margin-top: 0.3rem;
      }
      span {
        font-family: PingFangSC-Medium;
        font-size: 0.32rem;
        color: #333333;
        letter-spacing: 0;
        text-align: right;
      }
      input,select {
        outline: none;
        margin-left: 0.2rem;
        width: 3rem;
        height: 100%;
        padding-left: 0.2rem;
        background: #ffffff;
        border: 1px solid #666666;
        border-radius: 0.12rem;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        color: #333; 
        font-size: 0.3rem;
      }
      input::-webkit-input-placeholder {
        font-family: PingFangSC-Regular;
        color: #999;
        letter-spacing: 0;
      font-size: 0.3rem;
        
      }
      .unit{
      	    display: inline-block;
    position: absolute;
    right: 0.5rem;
    width: 50px;
    top: 0.2rem;
      }
    }
  }
  .right {
    width: 39.2vw;
    padding-right: 4%;
    vertical-align: top;
    box-sizing: border-box;
  }
}
.control-bottom {
  position: absolute;
  bottom: 0.4rem;
  width: 100%;
  padding: 0 0.4rem;
  display: flex;
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
  height:0.9rem;
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.9rem;
  color: white;
  background-color: #3c9bff;
  border-radius: 5px;
}
</style>
