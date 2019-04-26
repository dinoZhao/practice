<template>
  <div id="win-construction" v-show="isconstruction" @click="closeconstruction">
    <div class="construction-content">
      <img v-bind:src="construction">
      <span>功能建设中
        <br>敬请期待~
      </span>
    </div>
  </div>
</template>
<script>
import construction from "../../../assets/construction.png";
export default {
  data() {
    return {
      isconstruction: true,
      construction: construction
    };
  },
  methods: {
    closeconstruction: function() {
      var vm = this;
      vm.isconstruction = false;
    },
    show() {
      var vm = this;
      vm.isconstruction = true;
      if (!(vm.construction.indexOf("../") > -1)) {
        vm.construction = "../" + vm.construction;
      }
    },
    hide() {
      var vm = this;
      vm.isloading = false;
    }
  }
};
</script>

<style scoped>
#win-construction {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 11;
}
.construction-content {
  position: absolute;
  background: #fff;
  width: 60%;
  left: 20%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  padding: .8rem 0;
  border-radius: 10px;
}
.construction-content img {
  width: 6.4rem;
  height: 4.55rem;
  vertical-align: middle;
}
.construction-content span {
  display: inline-block;
  font-size: 2.5vw;
  vertical-align: middle;
}
</style>