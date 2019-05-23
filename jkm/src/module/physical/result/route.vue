<template>
  <div class="temperature">
    <div id="panel" class="panel">
      <div class="left">
        <div class="write_info">
          <span>白细胞</span>
          <p :class="{upper:localdetact.leuStatus!='Normal'}">{{localdetact.leu}}</p>
        </div>
        <div class="write_info">
          <span>亚硝酸盐</span>
          <p :class="{upper:localdetact.nitStatus!='Normal'}">{{localdetact.nit}}</p>
        </div>
        <div class="write_info">
          <span>尿胆原</span>
          <p :class="{upper:localdetact.ubgStatus!='Normal'}">{{localdetact.ubg}}</p>
        </div>
        <div class="write_info">
          <span>蛋白质</span>
          <p :class="{upper:localdetact.proStatus!='Normal'}">{{localdetact.pro}}</p>
        </div>
        <div class="write_info">
          <span>酸碱度</span>
          <p :class="{upper:localdetact.phStatus!='Normal'}">{{localdetact.ph}}
          <img class="icon" v-if="localdetact.phStatus&&localdetact.phStatus!='Normal'" :src="localdetact.phStatus=='Lower'?icon[0]:icon[1]"/>
          </p>
        </div>
        <div class="write_info">
          <span>比重</span>
          <p :class="{upper:localdetact.sgStatus!='Normal'}">{{localdetact.sg}}
          <img class="icon" v-if="localdetact.sgStatus&&localdetact.sgStatus!='Normal'" :src="localdetact.sgStatus=='Lower'?icon[0]:icon[1]"/>
          </p>
        </div>
      </div>
      <div class="right">
        <div class="write_info">
          <span>潜血</span>
          <p :class="{upper:localdetact.bloStatus!='Normal'}">{{localdetact.blo}}</p>
        </div>
        <div class="write_info">
          <span>酮体</span>
          <p :class="{upper:localdetact.ketStatus!='Normal'}">{{localdetact.ket}}</p>
        </div>
        <div class="write_info">
          <span>胆红素</span>
          <p :class="{upper:localdetact.bilStatus!='Normal'}">{{localdetact.bil}}</p>
        </div>
        <div class="write_info">
          <span>葡萄糖</span>
          <p :class="{upper:localdetact.gluStatus!='Normal'}">{{localdetact.glu}}</p>
        </div>
        <div class="write_info">
          <span>维生素C</span>
          <p :class="{upper:localdetact.vcStatus!='Normal'}">{{localdetact.vc}}</p>
        </div>
        <div class="write_info">
          <span>尿微量白蛋白</span>
          <p :class="{upper:localdetact.albStatus!='Normal'}">{{localdetact.alb}}
					<img class="icon" v-if="localdetact.albStatus&&localdetact.albStatus!='Normal'" :src="localdetact.albStatus=='Lower'?icon[0]:icon[1]"/>
          </p>
        </div>
      </div>
    </div>
    <div class="suggest">
			<div v-for="item in localdetact.suggestions" style="display: inline;">
				{{item}};

			</div>
		</div>
    <div class="control-bottom" v-show="showFooter">
      <!-- <manu :type="1" :manu="2"></manu> -->
      <span></span>
      <div class="save-button cliect" @click="save">确认</div>
      <queryhis></queryhis>
    </div>
  </div>
</template>

<script>
	var interval;
		import queryhis from './queryHis'
// import manu from "./manu.vue";
import { savePhysicalExamData } from "API/requst";
import util from "utils/util";
export default {
  props: {
    personId: {},
    recordId: {},
    showFooter: {
      type: Boolean,
      default: true
    },
    detact:{},
    icon:{}
  },
  inject: ["getresult"],
  components: {
    // manu
    queryhis
  },
  data() {
    return {
      localdetact:{}
    };
  },
  methods: {
    save() {
    	this.showtoast("保存成功");
      this.$emit("nexttab", "血脂", true);
    }
  },
  created() {
    var vm = this;
  },
  mounted() {},
  activated() {
    var self = this;
    self.getresult();
    self.localdetact = self.detact["urine"] || {};
    interval = setInterval(function() {
      self.getresult();
      self.localdetact = self.detact["urine"] || {};
    }, 2000);
  },
  deactivated() {
    clearInterval(interval);
  }
};
</script>

<style scoped lang="scss" type="text/css">
.temperature {
  width: 100%;
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
  width: calc(100% - 0.8rem);
  box-shadow: 0px 0px 15px 6px #f3f8fd;
  margin: 0 auto;
  margin-top: 3%;
  position: relative;
  background: url(../../../assets/urine_routine_bkg.png);
  background-size: 24%;
  background-repeat: no-repeat;
  background-position: right bottom;
  .left,
  .right {
    display: inline-block;
    width:47%;
    height: 100%;
    box-sizing: border-box;
    padding-right: 2vw;
    .write_info {
      height: 0.8rem;
      line-height: 0.8rem;
      position: relative;
      text-align: right;
      span {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        line-height: 0.8rem;
        font-family: PingFangSC-Medium;
        font-size: 0.32rem;
        color: #333333;
        letter-spacing: 0;
        text-align: right;
      }
      p {
        display: inline-block;
        vertical-align: top;
        padding-left: .4rem;
        width: 12vw;
        height: 100%;
        line-height: 0.8rem;
        font-size: .4rem;
        text-align: left;
      }
      .upper{
        color: #D33B32;
      }
    }
  }
  .right {
    width: 32vw;
    // padding-right: 4vw;
    vertical-align: top;
  }
}
.suggest{
	margin-top: 0.2rem;
	    margin-left: 0.5rem;
	    width: calc(100% - 1rem) !important;
}
.control-bottom {
  bottom: 0.4rem;
  width: 100%;
      margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
}
.manu {
  // display: inline-block;
  // margin-left: 0.3rem;
  font-size: 0.3rem;
}
.save-button {
  width: 2.3rem;
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
  float: right;
  margin-top: 0.3rem;
}

</style>
