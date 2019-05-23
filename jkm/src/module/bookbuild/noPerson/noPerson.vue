<template>
  <div class="noPerson">
    <headTop/>
    <div class="fornative">
      <namesearch @sendPersonId="changePerson" :AllPatients="AllPatients" :regularAllPatients="regularAllPatients"/>
      <div class="content">
        <div class="default">
          <div>
            <img class="swing" src="@/assets/personal_swing.png">
            <div class="explain">先刷身份证后就医</div>
            <div @click="manu" class="manu">手动建档</div>
          </div>
        </div>
        <!-- <div class="self" v-show="!showDefault">
          <div class="item">
            <div class="label">姓名</div>
            <input v-model="patientName" type="text" placeholder="必填，请输入姓名">
          </div>
          <div class="item">
            <div class="label">身份证号</div>
            <input v-model="patientIdNumber" maxlength="18" type="text" placeholder="必填，请输入身份证号">
          </div>
          <div class="item">
            <div class="label">联系方式</div>
            <input v-model="patientPhone" type="text" placeholder="选填，请输入电话号码">
          </div>
          <div class="item" style="height: 1.1rem;">
            <div class="label">住址</div>
            <textarea v-model="patientAddress" id="textarea" rows="4" cols placeholder="选填，请输入住址" @focus="getFocus"></textarea>
          </div>
          <btn class="next cliect" @click.native="gonext" fragment="下一步"></btn>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import namesearch from "components/namesearch/namesearch.vue";
import headTop from "components/common/headTop.vue";
import btn from "components/stuff/btn.vue";
import { getResidentList } from "API/requst";

export default {
  name: "noPerson",
  data() {
    return {
      AllPatients: [], //查询到的所有患者信息
      regularAllPatients: [],
      showDefault: false,
      patientName: "",    //姓名
      patientIdNumber: "",    //身份证
      patientPhone: "",   //连续方式
      patientAddress: "", //住址
    };
  },
  methods: {
    changePerson(personId) {
      window.android?window.android.getPersonInfo(personId):""
			//window.location.href = '../remoteclinic/reservation.html?personId=' + personId+'&index=3';
    },
    manu() {
      window.location.href = "./info.html?index=11";
    },
  },
  components: {
    namesearch,
    headTop,
  },
  mounted() {
    var vm = this;
    let params = {
      padDeviceCode: vm.padcode || sessionStorage.getItem("padcode"),
      serialNo: "00000"
    };
    let AllPatients = [];
    let transfer = [];
    getResidentList(params).then(data => {
      AllPatients = data.result || "";
      vm.regularAllPatients = Object.assign({}, AllPatients);
      AllPatients.map(function(item) {
        Object.keys(item).forEach(function(key) {
          item[key].map(function(SubItem) {
            SubItem.group = key;
            transfer.push(SubItem);
          });
        });
      });
      vm.AllPatients = transfer;
    });
  }
};
</script>
<style lang="scss" scoped>
.fornative{
  display: flex;
}
.content {
  width: calc(100% - 3.2rem);
  .default{
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    &>div{
      display: inline-block;
      margin: auto;
      text-align: center;
    }
    img.swing {
      width: 3.67rem;
      height: 4.32rem;
    }
    .explain {
      font-size: 0.32rem;
      text-align: center;
    }
    .manu {
      width: 2.28rem;
      height: 0.8rem;
      font-size: 0.32rem;
      border: 0.02rem solid #fc9452;
      border-radius: 6px;
      text-align: center;
      line-height: 0.8rem;
      color: #fc9452;
      display: inline-block;
      margin-top: .6rem;
    }
  }
  .self{
    margin-top: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.32rem;
    .item {
      display: flex;
      flex-direction: row;
      height: 0.9rem;
      line-height: 0.9rem;
      margin-top: 0.2rem;
      .label {
        width: 10vw;
        text-align: right;
        margin-right: 0.3rem;
      }
      input {
        background: #ffffff;
        border: 1px solid #666666;
        border-radius: 12px;
        width: 26vw;
        padding-left: 0.1rem;
        font-size: 0.32rem;
      }
      textarea {
        width: 42vw;
        border: 1px solid #666666;
        border-radius: 12px;
        font-size: 0.32rem;
        padding: 0.2rem 0.1rem;
        outline: none;
      }
    }
    .next {
      margin-left: 37%;
      margin-top: 0.5rem;
    }
  }
}
</style>
