<template>
  <div class="messageHome" id="messageHome"> 
 <div>
 	<headline />
    <!--标题-->
    <div class="title">
     	 消息
  	</div>
    <!--滑动区域-->
<div id="mescroll" class="mescroll">
			<ul id="dataList" class="data-list">
			  <li v-for='(item,index) in dataList'>
					<div class="date">{{item.date}}</div>
					<ul >
						<li v-for='(itemDetail,indexD) in item.list'  @click="checkDetail(index,indexD,itemDetail.id,$event.target)" :class="['list-item',itemDetail.status=='Unread'?'Unread':'Read']">
							<div class="content">
				  					<div class="left">
				  						<img :src="itemDetail.src" />
				  						<span>{{itemDetail.title}}</span>
				  					</div>
				  					<div class="right">
				  						<span>{{itemDetail.messageTime}}</span>
				  						<span class="check">
				  							<span v-if="!itemDetail.ischeck">
				  								<span>查看</span>
					  							<img  style="position: relative;top: -.02rem;" src="../../../assets/check-right.png" />
				  							</span>
				  							<span v-else>
				  								<span>收起</span>
					  							<img class="on" style="position: relative;top: -.02rem;" src="../../../assets/check-right.png" />
				  							</span>			
				  						</span>
				  					</div>
				  			</div>
				  			<div class="detail" v-if="itemDetail.ischeck">	
				  				<div v-if="itemDetail.issection">
				  					<div>
					  					<span>患者：<span>{{itemDetail.patientName}}</span></span>
					  					<span class="gender">{{itemDetail.patientSex}}：<span>{{itemDetail.patientAge}}岁</span></span>
					  					<span class="detail-color gender">诊断医生：<span>{{itemDetail.diagnosisDoctor}}</span></span>
					  				</div>
					  				<div class="result-title"><span class="detail-color">诊断结果</span></div>
					  				<div class="result-content">{{itemDetail.diagnosis}}</div>
				  				</div>
				  				<div v-else>
				  					{{itemDetail.content}}	  					
				  				</div>
				  			</div>
						</li>
					</ul>
				</li>		
			</ul> 
</div>
</div>
  </div>
  
  
</template>
<script>
	// 引入mescroll的vue组件
//import MeScroll from 'mescroll.js'
//import 'mescroll.js/mescroll.min.css'

import $ from 'jquery'
import {getSystemMessage,updateUnreadSystemMessage} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat,empty} from 'utils/util'

var msg = require('../../../assets/messageHome-msg.png');
var version = require('../../../assets/messageHome-version.png');
var assist = require('../../../assets/messageHome-assist.png');
var totop = require('../../../assets/mescroll-totop.png');

var srcMap={
	'StopExaminingMessage':msg,
	'Release':version,
	'CoDiagnosis':assist
}

var padDeviceCode = sessionStorage.getItem("padCode");
var thirdUniqueId = JSON.parse(sessionStorage.getItem("doctorMsg")).doctorId;

export default {
  name: 'messageHome',
  components:{
    headline
  },
  data () {
    return {
    	mescroll: null, // mescroll实例对象
      newArr: [], 
      dataList:[],// 数据列表
    	listDatamy:[],//自己的真是mock
    	clheight:'',
    	scrheight:'',
    	iscroll:true,
    	pageNum:0,
    	pageSize:10
    }
  },
//beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
//  next(vm => {
//    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
//    vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
//  })
//},
//beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
//  // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
//  this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
//  next()
//},
  methods:{
  	checkDetail:function(index,indexD,id,elem){
  		var vm = this;
  		var vmObj = vm.dataList[index].list[indexD]; 		
  		vmObj.ischeck = !vmObj.ischeck;
				if(vmObj.ischeck ){
					var objUpdate ={
							"padDeviceCode": padDeviceCode,
							"thirdUniqueId": thirdUniqueId,
							"id":id
					}
					updateUnreadSystemMessage(objUpdate).then(data=>{
						$(elem).parents('.list-item').removeClass('Unread');
						$(elem).removeClass('Unread');
//						console.log(data)
					})
				}
  	},
  	
  	 // mescroll组件初始化的回调,可获取到mescroll对象
//  mescrollInit (mescroll) {
//    this.mescroll = mescroll
//  },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
//  upCallback (page) {
//    // 模拟联网
//    this.getListDataFromNet( page.num, page.size, (arr) => {
//      // 如果是第一页需手动制空列表
//      if (page.num === 1) this.dataList = []
//      // 把请求到的数据添加到列表
//      this.dataList = this.dataList.concat(arr)
//      // 数据渲染成功后,隐藏下拉刷新的状态
//      this.$nextTick(() => {
//        this.mescroll.endSuccess(arr.length)
//      })
//    }, () => {
//      this.mescroll.endErr()
//    })
//  },
    getListDataFromNet ( pageNum, pageSize, successCallback, errorCallback) {
      // 延时一秒,模拟联网
        var vm = this;
        vm.iscroll = false;
        var offset = pageNum-1;
	      var objSys ={
					"padDeviceCode": padDeviceCode,
					"thirdUniqueId": thirdUniqueId,
					"offset":vm.pageNum*10,
					"limit":vm.pageSize
				}
				getSystemMessage(objSys).then(data=>{
					var result = data.result;
					var _dataList = vm.dataList;
					if(!empty(result)){
						result.forEach(function(item) {
				  		item.date = dateFormat(item.date);
				  		item.list.forEach(function(item){
				  			item.src = srcMap[item.category];
				  			item.ischeck = false;
				  			item.messageTime = dateFormat(parseInt(item.messageTime), 'Y-m-d G:i');
				  			item.issection = item.category=='CoDiagnosis'?true:false;
				  			item.patientSex = item.patientSex=='0'?'女':'男';
				  		})
						})
						if(!empty(_dataList)){
							_dataList.forEach(function(item){
								result.forEach(function(str,index,arr3){
									if(item.date==str.date){
										var _arr = item.list;
										var arr2 = str.list;
										item.list=_arr.concat(arr2);
										result.splice(index,1);
									}
								})
							})
							vm.dataList = _dataList.concat(result);
						}else{
							vm.dataList = result;
						}
						setTimeout(function(){vm.iscroll = true},600)
					}else{
						vm.iscroll = false;
					}
				})
    },
    initialize:function(){
  		var vm = this;
  		setTimeout(function(){
	    	var _height = document.body.clientHeight-60;
	    	vm.clheight = $('#dataList').outerHeight();
	    	vm.scrheight = _height;
	    	console.log($('#dataList').outerHeight())
				$('#mescroll').css('max-height',_height+'px');
				$('#mescroll').css('overflow','auto');
	    },500)
  	},
  },

  created () {     	
		var vm = this;
		vm.getListDataFromNet(0,10);
		vm.initialize();
  },
  mounted () {
  	var vm = this;
  	setTimeout(function(){
			window.addEventListener('scroll', (e) => {
      var scrollTop = $('#mescroll').scrollTop();
      var scrollHeight =$('#dataList').outerHeight();
      var windowHeight = vm.scrheight;
			if (parseInt(scrollTop + windowHeight) > scrollHeight) {
				if(vm.iscroll){
					vm.pageNum++;
					vm.pageSize=10;
					vm.getListDataFromNet();
				}
	    }
    }, true);
		},600)
//  $(window).scroll(function () {
//  	console.log('0000')
//		 	var scrollTop = $(this).scrollTop();
//	    var scrollHeight = $(document).height();
//	    var windowHeight = $(this).height();
//	    var h1 = $('.facility-head').outerHeight();
//	    var h2 = $('.facility-list').outerHeight();
//	    if ((scrollTop + windowHeight) > (scrollHeight-10)) {
//	    	console.log('1111')
//	    }
//	 })
  }
   
}
</script>
<style scoped>
	.messageHome{
		width: calc(100% - 200px);
		/*height: 100%;*/
		margin-left: 200px;
		overflow-x: hidden;
	}
	
  .mescroll {
    position: fixed;
    top: .9rem;
    left: 200px;
    width: 83%;
    bottom: 0;
    height: auto;
  }
	.title{
		text-align: center;
		font-size: .36rem;
		color: rgb(60, 155, 255);
		line-height: .9rem;
		width: 83%;

		z-index: 2;
    position: fixed;
    top: 0;
    left: 200px;
	}
	.date{
	    width: 1.9rem;
	    line-height: .44rem;
	    text-align: center;
	    background: #EEEEEE;
	    border-radius: .22rem;
	    margin-left: .4rem;
	    font-size: .28rem;
	}
	.content{
		display: flex;
		padding: 0 .4rem; 
		justify-content: space-between;
		font-size: .32rem;
		line-height: 1.1rem;
	}
	.content img{
		vertical-align: middle;
	}
	.on{
    transform: rotate(-90deg);
	}
	.check{
		margin-left: .6rem;
		color: rgb(60, 155, 255);
	}
	.detail{
		padding: .3rem;
		margin-left: 1.3rem;
		margin-right: .5rem;
		border: .01rem solid #eeeeee;
		font-size: .28rem;
		border-radius: .26rem;
		margin-bottom: .2rem;
	}
	.detail-color{
		color: rgb(153, 153, 153);
	}
	.result-title{
		padding: .2rem 0;
	}
	.result-content{
		font-size: .36rem;
	}
	.date{
		margin-top: .2rem;
		margin-bottom: .15rem;
	}
	.gender{
		margin-left: .2rem;
	}
	#messageHome .head{
		height: .9rem;
	}
	.list-item{
		padding-bottom: 10px;
    margin-bottom: 10px;
	}
	.Unread{
		background:#FFFBF3;
	}
	.Read{
		background:#fff;
	}
</style>
