<template>
  <div class="temfur">
    <div class="dial">
      <div class="part">
        <div style="color: #7F807F;font-size: 0.64rem;">总胆固醇</div>
        <div style="font-size: 1.1rem; color: #333;">
          {{localdetact.cholesterin}}
          <img
            class="icon"
            v-if="localdetact.cholesterin&&localdetact.cholesterinStatus!='Normal'"
            :src="localdetact.cholesterinStatus=='Lower'?icon[0]:icon[1]"
          >
        </div>
        <div class="oc">mmol/L</div>
        <img src="../../../assets/item-1.png">
      </div>
      <div class="part">
        <div style="color: #7F807F;font-size: 0.64rem;">甘油三酯</div>
        <div style="font-size: 1.1rem; color: #333;">
          {{localdetact.triglyceride}}
          <img
            class="icon"
            v-if="localdetact.triglyceride&&localdetact.triglycerideStatus!='Normal'"
            :src="localdetact.triglycerideStatus=='Lower'?icon[0]:icon[1]"
          >
        </div>
        <div class="oc">mmol/L</div>
        <img src="../../../assets/item-2.png">
      </div>
      <div class="part">
        <div style="color: #7F807F;font-size: 0.64rem;">高密度脂蛋白胆固醇</div>
        <div style="font-size: 1.1rem; color: #333;">
          {{localdetact.chdl}}
          <img
            class="icon"
            v-if="localdetact.chdl&&localdetact.chdlStatus!='Normal'"
            :src="localdetact.chdlStatus=='Lower'?icon[0]:icon[1]"
          >
        </div>
        <div class="oc">mmol/L</div>
        <img src="../../../assets/item-3.png">
      </div>
      <div class="part">
        <div style="color: #7F807F;font-size: 0.64rem;">低密度脂蛋白胆固醇</div>
        <div style="font-size: 1.1rem; color: #333;">
          {{localdetact.cldl}}
          <img
            class="icon"
            v-if="localdetact.cldl&&localdetact.cldlStatus!='Normal'"
            :src="localdetact.cldlStatus=='Lower'?icon[0]:icon[1]"
          >
        </div>
        <div class="oc">mmol/L</div>
        <img src="../../../assets/item-4.png">
      </div>
    </div>
    <div class="suggest">
      <div v-for="item in localdetact.suggestions" :key="item">{{item}}</div>
    </div>
    <div class="save cliect" @click="save">确认</div>
    <queryhis></queryhis>
  </div>
</template>

<script>
var interval;
		import queryhis from './queryHis'
export default {
  props: ["detact", "icon"],
  inject: ["getresult"],
  name: "lipids",
  components: {queryhis},
  methods: {
    save() {
      this.showtoast("保存成功");
      this.$emit("liberate")
//    this.$emit("nexttab", "血氧", true);
    }
  },
  data() {
    return {
      localdetact: {}
    };
  },
  activated() {
    var self = this;
    self.getresult();
    self.localdetact = self.detact["bloodFat"] || {};
    interval = setInterval(function() {
      self.getresult();
      self.localdetact = self.detact["bloodFat"] || {};
    }, 2000);
  },
  deactivated() {
    clearInterval(interval);
  }
};
</script>

<style lang="scss" scoped="scoped">
.temfur {
 padding: 0.4rem;
    position: relative;
    width: calc(100% - 0.8rem);
  .dial {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .part {
      height: 12.2vw;
      width: 47%;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      box-shadow: 0 10px 24px 10px rgba(48, 127, 226, 0.08);
      border: 1px solid #d9d9d9;
      margin-bottom: 0.3rem;
      overflow: hidden;
      
    }
    .part > div:first-child {
      font-size: 0.32rem !important;
    }
    .part > div:nth-child(2) {
      font-size: 0.62rem !important;
    }
    .oc {
      font-size: 0.28rem;
      background: #3c9bff;
      color: #ffffff;
      width: 1.4rem;
      line-height: 0.4rem;
      border-radius: 30px;
      text-align: center;
    }
    img {
      width: 2rem;
    height: 2rem;
    /* opacity: 0.08; */
    position: absolute;
    bottom: -0.5rem;
    right: -0.4rem;
    }
  }
  .save {
    background: #3c9bff;
    border-radius: 5px;
    width: 2.3rem;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.3rem;
    float: right;
    /*margin-top: 0.6rem;*/
    color: #fff;
    margin-bottom: 0.6rem;
    margin-top: 0.3rem;
  }
}
</style>
