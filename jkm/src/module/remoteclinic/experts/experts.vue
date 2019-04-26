<template>
  <div class="experts">
    <headline headtxt="预约" none></headline>
    <div class="experts-content">
      <div class="content-left">
      	<div class="experts-location">
      		<img src="" /><span>浙江省</span><img src="" />
      	</div>
        <ul class="left-list">
          <template v-for="(item,index) in result">
            <li
              class="left-item on"
              @click="choseitem($event.target)"
              v-if="index==0"
              v-bind:data-code="item.departmentCode"
            >{{item.departmentCode}}</li>
            <li
              class="left-item"
              @click="choseitem($event.target)"
              v-bind:data-code="item.departmentCode"
              v-else
            >{{item.departmentCode}}</li>
          </template>
        </ul>
      </div>
      <div class="content-right">
        <ul class="right-list">
          <template v-for="(item,index) in doctorList">
            <li
              class="right-item"
              @click="gotodoctor(item.doctorId)"
              v-if="item.appointable"
              v-bind:data-id="item.doctorId"
            >
              <div class="right-item-left">
                <img v-bind:src="item.nickUrl" class="head-icon">
                <div class="detail">
                  <p>
                    <span class="name">{{item.name}}</span>
                    <span>{{item.profession}}</span>
                  </p>
                  <p>医院：
                    <span>{{item.organization}}</span>
                  </p>
                  <p>擅长：
                    <span>{{item.description}}</span>
                  </p>
                </div>
              </div>
              <div class="right-item-right">
                <span>可约</span>
                <img src="../../../assets/arrows-left.png">
              </div>
            </li>
            <li class="right-item" v-bind:data-id="item.doctorId" v-else>
              <div class="right-item-left">
                <img v-bind:src="item.nickUrl" class="head-icon">
                <div class="detail">
                  <p>
                    <span class="name">{{item.name}}</span>
                    <span>{{item.profession}}</span>
                  </p>
                  <p>医院：
                    <span>{{item.organization}}</span>
                  </p>
                  <p>擅长：
                    <span>{{item.description}}</span>
                  </p>
                </div>
              </div>
              <div class="right-item-right full">
                <span>约满</span>
                <img src="../../../assets/arrows-left.png">
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="wind-location">
    	<div class="location-content">
    		<div class="location-head">请选择专家所在区域</div>
    		<div class="location-bottom">
    			<div class="location-item">浙江省</div><div class="location-item">全国</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import { getRemoteClinic } from "API/requst";
import headline from "components/headline/headline.vue";
import { getURLParameter, dateFormat } from "utils/util";
import myDatepicker from "vue-datepicker";
import $ from "jquery";
export default {
  name: "experts",
  components: {},
  data() {
    return {
      result: [],
      doctorList: []
    };
  },
  methods: {
    gotodoctor: function(id) {
      var vm = this;
      window.location.href = "doctordetail.html?id=" + id;
    },
    choseitem: function(elem) {
      var vm = this;
      $(".left-item").removeClass("on");
      $(elem).addClass("on");
      var code = $(elem).attr("data-code");
      vm.screenList(code);
    },
    screenList: function(code) {
      var vm = this;
      var _result = vm.result;
      _result.forEach(function(item) {
        if (item.departmentCode == code) {
          vm.doctorList = item.doctors;
        }
      });
    }
  },
  components: {
    headline
  },
  created() {
    var vm = this;
    var newdate = parseInt(new Date().getTime());
    var start = newdate;
    var end = newdate + 86400000 * 3;
    var obj = { startTime: start, endTime: end };
    getRemoteClinic(obj)
      .then(data => {
        vm.result = data.result;
        vm.doctorList = data.result[0].doctors;
      })
      .catch(err => {
        consoe.log(err);
      });
  },
  mounted() {}
};
</script>
<style>
	.experts{
		min-height: calc(100% - 80px);
    height: calc(100% - 80px);
	}
	.experts-content{
		height: 100%;
		display: flex;
	}
	.experts-content>div {
    display: inline-block;
    vertical-align: top;
	}
	.experts .content-left{
		width:15% ;
		padding-top: 80px;
		height: 100%;
		border-right:1px solid #eee;
		box-sizing: border-box;
	}
	.experts .content-right{
		width: 85%;
		padding-top: 30px;
	}
	li.right-item {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
	}
	li.right-item>div {
    display: inline-block;
    vertical-align: middle;
	}
	.experts .right-item-left{
		width: 80%;
	}
	.experts .right-item-left img{
		width: auto;
    height: 80px;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 20px;
    border-radius: 50%;
	}
	.experts .detail{
		display: inline-block;
    vertical-align: middle;
		width: calc(100% - 120px);
		font-size: 1.5vw;
	}
	.experts .detail p:nth-of-type(1){
		margin-bottom: 8px;
	}
	.experts .name{
		font-size: 1.8vw;
    font-weight: bold;
    margin-right: 12px;
	}
	.experts .right-item-right{
		width: 19%;
    text-align: right;
    font-size: 1.5vw;
	}
	.experts .right-item-right span{
		vertical-align: middle;
    display: inline-block;
    background: #3c9bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    margin-right: 10px;
	}
	.experts .right-item-right img{
		width: auto;
    height: 25px;
    vertical-align: middle;
    margin-right: 15px;
	}
	.content-left{
	}
	.experts .left-item{
		text-align: center;
    line-height: 5.2vw;
    font-size: 0.32rem;
	}
	.experts .left-item.on{
		background: #3c9bff;
		color: #fff;
	}
	.right-item-right.full span{
		background: #eee;
		color: #999;
	}
	.experts-location{
		display: none;
		text-align: center;
		line-height: 5.2vw;
    font-size: 0.32rem;
	}
	.experts-location img{
		width: auto;
		height: 20px;
		vertical-align: middle;
	}
	.experts-location span{
		display: inline-block;
		vertical-align: middle;
	}
	.wind-location{
		display: none;
		position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 12;
    left: 0;
    background: rgba(0,0,0,0.7);
	}
	.location-content{
		background: #fff;
    position: absolute;
    width: 50%;
    left: 25%;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: 1.5vw;
    padding: 30px 30px;
    border-radius: 10px;
	}
	.location-item {
    display: inline-block;
    border: 1px solid #3c9bff;
    width: 25%;
    line-height: 80px;
    border-radius: 10px;
    color: #3c9bff;
	}
	.location-head{
		margin-bottom: 30px;
	}
	.location-bottom>div:nth-child(1){
		margin-right: 10%;
	}
</style>
