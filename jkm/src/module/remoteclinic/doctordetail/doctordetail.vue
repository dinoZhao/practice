<template>
  <div class="doctordetail">
    <headline headtxt="预约" none></headline>
    <headTop/>
    <div class="doctordetail-head">
      <img v-bind:src="result.nickUrl" class="head-icon">
      <div class="head-conent">
        <P>
          <span class="name">{{result.name}}</span>
          <span>{{result.profession}}</span>
        </P>
        <P>医院：
          <span>{{result.organization}}</span>
        </P>
        <P>擅长：
          <span>{{result.description}}</span>
        </P>
      </div>
    </div>
    <div class="doctordetail-content">
      <ul class="content-list">
        <template v-for="(item,index) in schedules">
          <li class="list-item">
            <div class="item-left">
              <span>{{item.wenm}}</span>
            </div>
            <div class="item-center">
              <span>{{item.tim}}</span>
            </div>
            <div class="item-right">
              <template v-if="item.remain<=2">
                <span
                  class="few1"
                  @click="gotoaffirm(item.schedulingTableId)"
                  v-bind:data-id="item.schedulingTableId"
                >剩&nbsp;
                  <b>{{item.remain}}</b>
                </span>
              </template>
              <template v-else-if="item.remain>2">
                <span
                  class="more"
                  @click="gotoaffirm(item.schedulingTableId)"
                  v-bind:data-id="item.schedulingTableId"
                >剩&nbsp;
                  <b>{{item.remain}}</b>
                </span>
              </template>
              <template v-else>
                <span class="zero" v-bind:data-id="item.schedulingTableId">约满</span>
              </template>
              <img src="../../../assets/arrows-left.png">
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import { getDoctorSchedule } from "API/requst";
import headline from "components/headline/headline.vue";
import headTop from "components/common/headTop.vue";
import { getURLParameter, dateFormat } from "utils/util";
import myDatepicker from "vue-datepicker";
export default {
  name: "doctordetail",
  components: {},
  data() {
    return {
      result: {},
      schedules: [],
      doctorId: ""
    };
  },
  methods: {
    gotoaffirm: function(id) {
      var vm = this;
      window.location.href =
        "affirmexpert.html?scid=" + id + "&did=" + vm.doctorId;
    }
  },
  components: {
    headline,
    headTop,
    "date-picker": myDatepicker
  },
  created() {
    var vm = this;
    var id = getURLParameter("id");
    var newdate = parseInt(new Date().getTime());
    var start = newdate;
    var end = newdate + 86400000 * 3;
    var obj = { startTime: start, endTime: end, doctorId: id };
    getDoctorSchedule(obj).then(data => {
      vm.result = data.result;
      var schedules = data.result.schedules;
      vm.doctorId = data.result.doctorId;
      var arr = [];
      schedules.forEach(function(item) {
        var obj = {};
        obj.schedulingTableId = item.schedulingTableId;
        obj.remain = item.remain;
        var day = dateFormat(item.startTime, "m.d");
        var day2 = dateFormat(item.startTime, "G:i");
        var day3 = dateFormat(item.endTime, "G:i");
        obj.tim = day2 + " " + "-" + " " + day3;
        var wek = parseInt(new Date(item.startTime).getDay());
        switch (wek) {
          case 0:
            obj.wenm = day + " " + "周日";
            break;
          case 1:
            obj.wenm = day + " " + "周一";
            break;
          case 2:
            obj.wenm = day + " " + "周二";
            break;
          case 3:
            obj.wenm = day + " " + "周三";
            break;
          case 4:
            obj.wenm = day + " " + "周四";
            break;
          case 5:
            obj.wenm = day + " " + "周五";
            break;
          case 6:
            obj.wenm = day + " " + "周六";
            break;
        }
        arr.push(obj);
        vm.schedules = arr;
        console.log(arr);
      });
    });
  },
  mounted() {}
};
</script>
<style scope>
.doctordetail /deep/ .head{
	top: 0rem !important;
}
.doctordetail-head {
  padding: 10px 0;
  padding-left: 330px;
  padding-top: 20px;
  font-size: 1.5vw;
}
.doctordetail .head{
	left:200px;
}
.doctordetail .head-icon {
  width: auto;
  height: 80px;
  margin-left: 20px;
  margin-right: 20px;
  vertical-align: middle;
  border-radius: 50%;
}
.doctordetail .head-conent {
  display: inline-block;
  vertical-align: middle;
	max-width: 10rem;
}
.head-conent > p:nth-child(1) {
  margin-bottom: 5px;
}
.doctordetail .name {
  font-weight: bold;
  margin-right: 15px;
  font-size: 1.8vw;
}
.doctordetail .content-list{
  padding: 0 5%;
  padding-left: 240px;
}
.doctordetail .list-item {
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  font-size: 1.5vw;
}
.doctordetail .list-item > div {
  text-align: center;
  vertical-align: middle;
}
.doctordetail .list-item .item-left {
  width: 20%;
}
.doctordetail .list-item .item-center {
  width: 60%;
}
.doctordetail .list-item .item-right {
  width: 20%;
}
.doctordetail .item-right span {
  vertical-align: middle;
  display: inline-block;
  background: #fc9452;
  color: #fff;
  padding: 8px 20px;
  border-radius: 5px;
}
.doctordetail .item-right img {
  width: auto;
  height: 25px;
  margin: 0 15px 0 10px;
  vertical-align: middle;
}
.item-right.full span {
  background: #3c9bff;
}
.doctordetail .list-item .item-left {
  /* text-align: left; */
}
.item-left > span:nth-child(1) {
  margin-left: 30px;
}
span.few {
  background: #fc9452;
}
span.more {
  background: #3c9bff !important;
}
span.zero {
  background: #eee !important;
  color: #999 !important;
}
</style>
