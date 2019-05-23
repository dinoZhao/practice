<template>
  <div class="head" @click="back">
    <div :class='["back", none ? "none" : ""]'></div>
  </div>
</template>
<script>
import { goBack } from "utils/common.js";
export default {
  name: "headline",
  props: ["headtxt", "none"],

  data() {
    return {};
  },

  created() {
    var vm = this;
  },
  methods: {
    back: function() {
      goBack();
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.head {
  width: 130px;
  height: 80px;
  font-size: 1.5vw;
  position: fixed;
  top: 0;
  z-index: 10;
}
.none {
  display: none !important;
}
.back {
  position: absolute;
  top: .4rem;
  left: 30px;
  background: url('../../assets/back_bkg.png') no-repeat;
  width: 1.21rem;
  height: .66rem;
  background-size: contain;
}
/*.back img {
  width: auto;
  height: 40px;
  vertical-align: middle;
}*/
.back p {
  position: absolute;
  line-height: 40px;
  top: 21px;
  right: 14px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #3c9bff;
  letter-spacing: 0;
}
.head-text {
  line-height: 80px;
  text-align: center;
}
</style>