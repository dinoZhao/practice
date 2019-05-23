<template>
  <div class="excellentPlan fornative">
    <div class="tag">
      <ul>
      	<li class="tag_item liveItem active" @click.stop="showLive($event.target)">直通车</li>
        <li
          :class="['tag_item',{active:activeTagIndex==index}]"
          v-for="(item,index) in tagList"
          :key="index"
          @click="chooseTag(index)"
        >{{item.typeName}}</li>
      </ul>
    </div>
    <div class="content" v-if="!isLive">
      <div class="content_inner">
      <div class="videos" v-for="(item,index) in videoList" :key="index" @click="playing(item.url)">
        <img :src="item.imgUrl" alt>
        <p>{{item.className}}</p>
      </div>
      </div>
    </div>
    <div class="live-content" v-if="isLive">
    	<template v-if="istep=='one'">
    		<div class="live-top">
	    		<img src="../../../assets/dizhuren.png" @click.stop="gotolive(detail)"/>
	    	</div>
	    	<div class="live-bottom">
	    		<div class="live-bottom-item" @click.stop="gotolivehint('扶贫办')">
	    			<img src="../../../assets/fupinban.png" />
	    		</div><div class="live-bottom-item" @click.stop="gotolivehint('心联盟')">
	    			<img src="../../../assets/xinlianmeng.png" />
	    		</div><div class="live-bottom-item" @click.stop="gotolivehint('基金会')">
	    			<img src="../../../assets/jijinhui.png" />
	    		</div>
	    	</div>
    	</template>
    	<template v-else-if="istep=='two'">
    		<div class="live-remind">
    			<div class="live-remind-back" @click.stop="gobackone">
    				<img src="../../../assets/back_bkg.png" />
    			</div>
    			<div class="live-remind-head">直通扶贫办</div>
    			<div class="live-remind-hint">
    				<div class="remind-hint-left">
    					<div class="remind-hint-detail">
    						<P>{{detail.className}}</P><img src="../../../assets/daojishi.png" /><p><span>{{days>9?days:'0'+days}}</span>天<span>{{hour>9?hour:'0'+hour}}</span>时<span>{{minute>9?minute:'0'+minute}}</span>分</p>
    					</div>
    					<div class="remind-hint-icon"><img src="../../../assets/remind-hint-icon.png"/></div>
    				</div><div class="remind-hint-right" @click.stop="remindHint(livetext,detail.id)"><span :class="['remind-span',livetext=='开播提醒'?'remindnow':'cancel-span']">{{livetext}}</span></div>
    			</div>
    			<ul class="live-remind-list">
    				<template v-for="item in recommend">
    					<li class="remind-item" v-if="item.type=='live'" @click.stop="gotolive(item)">
	    					<div class="remind-item-banner">
	    						<img :src="item.imgUrl" />
	    						<div class="play-icon">
	    							<img src="../../../assets/stop_icon.png" />
	    						</div>
	    						<div class="remind-tag">
	    							<img src="../../../assets/zhibo.png" />
	    						</div>
	    					</div>
	    					<div class="remind-item-head">{{item.className}}</div>
	    					<div class="remind-item-doctor">
	    						<span>{{item.customer.nickname}}</span> <span>{{item.customer.department}}</span> <span>{{item.customer.profession}}</span> <span>{{item.customer.organization}}</span>
	    					</div>
	    					<div class="remind-item-text">{{item.description}}</div>
	    				</li><li class="remind-item" v-else-if="item.type=='record'" @click.stop="playing(item.playUrl)">
	    					<div class="remind-item-banner">
	    						<img :src="item.imgUrl"/>
	    						<div class="play-icon">
	    							<img src="../../../assets/stop_icon.png" />
	    						</div>
	    						<div class="remind-tag">
	    							<img src="../../../assets/lubo.png" />
	    						</div>
	    					</div>
	    					<div class="remind-item-head">{{item.className}}</div>
	    					<div class="remind-item-doctor">
	    						<span>{{item.customer.nickname}}</span> <span>{{item.customer.department}}</span> <span>{{item.customer.profession}}</span> <span>{{item.customer.organization}}</span>
	    					</div>
	    					<div class="remind-item-text">{{item.description}}</div>
	    				</li>
    				</template>
    			</ul>
    		</div>
    	</template>
    </div>
    <div class="task_info" id="mod_player" v-show="showVideo"></div>
    <img src="@/assets/close.png" class="close_video" v-show="showVideo" @click="stopVideo">
    <div class="win-live" v-if="iswinlive">
    	<div class="win-live-content">
    		<h4>直播提示</h4>
    		<div class="win-live-tex">“彭主任讲话”即将开始，请去直播间观看</div>
    		<div class="win-live-btn">
    			<div class="win-live-btn-left">
    				取消
    			</div><div class="win-live-btn-right">
    				确定
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
	var timer = null;
import $ from 'jquery'
import headline from "../../../components/headline/headline.vue";
import { getTagOfTalent, getTalentContent,getLiveShowList,getLiveShowDetail,rongyunToken,updateBroadcastReminder} from "API/requst";
import 'utils/play.js'
var livePlayer = new ump.Player();
export default {
  name: "excellentPlan",
  data() {
    return {
      tagList: [],
      activeTagIndex:20,
      videoList: [],
      showVideo:false,
      isLive:true,
      iswinlive:false,
      days:0,
      hour:0,
      minute:0,
      istep:'one',
      livetext:'开播提醒',
      detail:{},
      recommend:[],
      userId:'',
      token:''
    };
  },
  created () {
   	var vm = this;
   	var doctorMsg = JSON.parse(sessionStorage.getItem('doctorMsg'));
		vm.thirdUniqueId=doctorMsg.doctorId;
   	vm.getLiveList();
   	vm.getToken();
  },
  components: { headline },
  methods: {
  	remindHint:function(tex,id){
  		var vm = this;
  		if(tex=='开播提醒'){
  			var operation = 'Active';
  			vm.livetext = '取消提醒';
  		}else if(tex=='取消提醒'){
  			var operation = 'Inactive';
  			vm.livetext = '开播提醒';
  		}
  		var obj = {
  			"thirdUniqueId": vm.thirdUniqueId,
				"id": id,
				"operation":operation
  		}
  		updateBroadcastReminder(obj).then(res => {
      });
  	},
  	showLive:function(elem){
  		var vm = this;
  		vm.activeTagIndex = 100;
  		$('.tag_item').removeClass('active');
  		$(elem).addClass('active');
  		vm.isLive = true;
  		vm.istep = 'one';
  		clearInterval(timer);
  		vm.getLiveList();
  	},
  	gotolivehint:function(tex){
  		var vm = this;
  		if(tex!='扶贫办'){
  			vm.showtoast('敬请期待');
  		}else{
  			vm.istep = 'two';
  		}
  	},
  	gobackone:function(){
  		var vm = this;
  		vm.istep = 'one';
  	},
    chooseTag(index) {
    	var vm = this;
    	$('.liveItem ').removeClass('active');
      this.activeTagIndex = index;
      this.getContent(this.tagList[index].typeName);
      vm.isLive = false;
    },
    getContent(Type) {
      var vm = this;
      getTalentContent({ gType:Type}).then(res => {
        // console.log(res)
        vm.videoList = res.finished;
      });
    },
    getToken:function(){
    	var vm = this;
    	var doctorMsg = JSON.parse(sessionStorage.getItem('doctorMsg'));
    	var obj = {
    		"thirdUniqueId":doctorMsg.doctorId
    	}
    	rongyunToken(obj).then(res => {
    		vm.token = res.token;
    		vm.userId = res.userId;
      });
    },
    gotolive:function(item){
    	var vm = this;
    	var doctorMsg = JSON.parse(sessionStorage.getItem('doctorMsg'));
    	var obj = {
    		"token":vm.token,
    		"userId":vm.userId,
    		"playUrl": item.playUrl,
				"roomId": ''+item.id+'',
				"userName":doctorMsg.docName,
				"userImg": doctorMsg.headUrl||'https://ymmsit.verify.fc18.com.cn/att/ymm/doctors/410919804.jpg',
				"hostName": item.customer?item.customer.nickname:'',
				"hostImg": item.customer?item.customer.headImageUrl:'',
				"total": ''+item.viewCount+''
    	}
    	obj = JSON.stringify(obj);
    	try{
    		window.android.nativeFun(obj);
    	}catch(e){
    		//TODO handle the exception
    	}
    },
    getLiveList:function(){
    	var vm = this;
    	getLiveShowList({}).then(res => {
      });
			vm.getLiveDetail();
    },
    getLiveDetail:function(tex){
    	var vm = this;
    	var obj = {
    		type:'FPB',
    		thirdUniqueId:vm.thirdUniqueId
    	}
    	clearInterval(timer);
    	getLiveShowDetail(obj).then(res => {
    	//	var res = {"resultCode":"success","resultMessage":"处理成功","ongoing":{"id":409648716,"gTypeName":"营养饮食","className":"营养饮食（一）","startTime":1557541620000,"startDate":1556985600000,"endTime":1558886400000,"endDate":1558886400000,"url":"http://fc-zb.ufile.ucloud.com.cn/chest%2F20181212%2Fdeleguanxinbin.mp4","description":"怀孕之前没有吃叶酸怎么办？这里来告诉你怎么办！","learnCount":0,"supportCount":3,"periods":"三","imgUrl":"http://ymmsit.verify.fc18.com.cn/att/ymm/news/_4027c78233dab4c515508edcd369ec1b-sz_129169.jpg","publishUrl":"rtmp://publishtest1.fc18.com.cn/test/409648716","playUrl":"http://hlstst1.fc18.com.cn/test/409648716/playlist.m3u8","customer":null,"isSupport":false,"hasLearnt":false,"reserved":false,"headPictures":[],"viewCount":10,"detail":null,"qaTime":"","whetherNew":false},"preview":[],"finished":[{"id":409790040,"gTypeName":"营养饮食","className":"营养饮食（四）","startTime":1539330780000,"startDate":1539273600000,"endTime":1540828800000,"endDate":1540828800000,"url":"https://v.youku.com/v_show/id_XMzc5ODAyMDI0NA==.html?spm=a2h0k.11417342.soresults.dtitle","description":"怀孕之前没有吃叶酸怎么办？这里来告诉你怎么办！","learnCount":0,"supportCount":3,"periods":"三","imgUrl":"http://ymmsit.verify.fc18.com.cn/att/ymm/news/_4027c78233dab4c515508edcd369ec1b-sz_129169.jpg","publishUrl":"rtmp://publishtest1.fc18.com.cn/test/409648716","playUrl":"http://hlstst1.fc18.com.cn/test/409648716/playlist.m3u8","customer":{"clientId":76006,"nickname":"吴彦祖","headImageUrl":"http://ebf.gkmujwlrfxovdi.jvyny","organization":"上海市第十人民医院","department":"内科","profession":"主治医师","synopsis":"74no1XtA3H","description":"ZxOfLbjW37","replyCount":38419,"status":"uKzG3wCIzn","attentionTime":1557213437816,"isAttention":false,"completed":3334,"preview":"hWmvkpjkuX","doctorId":76729},"isSupport":false,"hasLearnt":false,"reserved":false,"headPictures":[],"viewCount":9,"detail":null,"qaTime":"","whetherNew":false},{"id":409790032,"gTypeName":"营养饮食","className":"营养饮食（二","startTime":1539311280000,"startDate":1539273600000,"endTime":1540828800000,"endDate":1540828800000,"url":"https://v.youku.com/v_show/id_XMzc5ODAyMDI0NA==.html?spm=a2h0k.11417342.soresults.dtitle","description":"怀孕之前没有吃叶酸怎么办？这里来告诉你怎么办！","learnCount":0,"supportCount":3,"periods":"三","imgUrl":"http://ymmsit.verify.fc18.com.cn/att/ymm/news/_4027c78233dab4c515508edcd369ec1b-sz_129169.jpg","publishUrl":"rtmp://publishtest1.fc18.com.cn/test/409648716","playUrl":"http://hlstst1.fc18.com.cn/test/409648716/playlist.m3u8","customer":{"clientId":76006,"nickname":"吴彦祖","headImageUrl":"http://ebf.gkmujwlrfxovdi.jvyny","organization":"上海市第十人民医院","department":"内科","profession":"主治医师","synopsis":"74no1XtA3H","description":"ZxOfLbjW37","replyCount":38419,"status":"uKzG3wCIzn","attentionTime":1557213437816,"isAttention":false,"completed":3334,"preview":"hWmvkpjkuX","doctorId":76729},"isSupport":false,"hasLearnt":false,"reserved":false,"headPictures":[],"viewCount":5,"detail":null,"qaTime":"","whetherNew":false},{"id":409790036,"gTypeName":"营养饮食","className":"营养饮食（三）","startTime":1539311280000,"startDate":1539273600000,"endTime":1540828800000,"endDate":1540828800000,"url":"https://v.youku.com/v_show/id_XMzc5ODAyMDI0NA==.html?spm=a2h0k.11417342.soresults.dtitle","description":"怀孕之前没有吃叶酸怎么办？这里来告诉你怎么办！","learnCount":0,"supportCount":3,"periods":"三","imgUrl":"http://ymmsit.verify.fc18.com.cn/att/ymm/news/_4027c78233dab4c515508edcd369ec1b-sz_129169.jpg","publishUrl":"rtmp://publishtest1.fc18.com.cn/test/409648716","playUrl":"http://hlstst1.fc18.com.cn/test/409648716/playlist.m3u8","customer":{"clientId":76006,"nickname":"吴彦祖","headImageUrl":"http://ebf.gkmujwlrfxovdi.jvyny","organization":"上海市第十人民医院","department":"内科","profession":"主治医师","synopsis":"74no1XtA3H","description":"ZxOfLbjW37","replyCount":38419,"status":"uKzG3wCIzn","attentionTime":1557213437816,"isAttention":false,"completed":3334,"preview":"hWmvkpjkuX","doctorId":76729},"isSupport":false,"hasLearnt":false,"reserved":false,"headPictures":[],"viewCount":4,"detail":null,"qaTime":"","whetherNew":false,"type":"live"},{"id":409806520,"gTypeName":"营养饮食","className":"营养饮食（四）","startTime":1539310800000,"startDate":1539273600000,"endTime":1540828800000,"endDate":1540828800000,"url":"https://v.youku.com/v_show/id_XMzc5ODAyMDI0NA==.html?spm=a2h0k.11417342.soresults.dtitle","description":"怀孕之前没有吃叶酸怎么办？这里来告诉你怎么办！","learnCount":0,"supportCount":3,"periods":"三","imgUrl":"http://ymmsit.verify.fc18.com.cn/att/ymm/news/_4027c78233dab4c515508edcd369ec1b-sz_129169.jpg","publishUrl":"rtmp://publishtest1.fc18.com.cn/test/409648716","playUrl":"http://hlstst1.fc18.com.cn/test/409648716/playlist.m3u8","customer":{"clientId":76006,"nickname":"吴彦祖","headImageUrl":"http://ebf.gkmujwlrfxovdi.jvyny","organization":"上海市第十人民医院","department":"内科","profession":"主治医师","synopsis":"74no1XtA3H","description":"ZxOfLbjW37","replyCount":38419,"status":"uKzG3wCIzn","attentionTime":1557213437816,"isAttention":false,"completed":3334,"preview":"hWmvkpjkuX","doctorId":76729},"isSupport":false,"hasLearnt":false,"reserved":false,"headPictures":[],"viewCount":5,"detail":null,"qaTime":"","whetherNew":false},{"id":409708656,"gTypeName":"营养饮食","className":"想要宝宝智商高，孕期怎么吃很重要！（九）","startTime":1537420920000,"startDate":1537372800000,"endTime":1537372800000,"endDate":1537372800000,"url":"","description":"很多新手爸妈只知道，宝宝智商高不高和遗传有关系，但是去不知道，宝宝的智商和遗传竟然和妈妈的饮食和营养摄取也有关系。孕妇应该怎么吃，宝宝才能既聪明有漂亮呢？孕期饮食有乾坤！","learnCount":0,"supportCount":3,"periods":"二","imgUrl":"http://ymmsit.verify.fc18.com.cn/att/ymm/news/_4027c78233dab4c515508edcd369ec1b-sz_129169.jpg","publishUrl":"rtmp://publishtest1.fc18.com.cn/test/409648716","playUrl":"http://hlstst1.fc18.com.cn/test/409648716/playlist.m3u8","customer":{"clientId":76006,"nickname":"吴彦祖","headImageUrl":"http://ebf.gkmujwlrfxovdi.jvyny","organization":"上海市第十人民医院","department":"内科","profession":"主治医师","synopsis":"74no1XtA3H","description":"ZxOfLbjW37","replyCount":38419,"status":"uKzG3wCIzn","attentionTime":1557213437816,"isAttention":false,"completed":3334,"preview":"hWmvkpjkuX","doctorId":76729},"isSupport":false,"hasLearnt":false,"reserved":false,"headPictures":[],"viewCount":7,"detail":null,"qaTime":"","whetherNew":false,"type":"record"}]};
    		var detail = res.detail;
    		var recommend = res.recommend;
    		vm.detail = detail;
    		vm.recommend = recommend;
    		var newdate = new Date().getTime();
    		var startime = detail.startTime;
    		var timenum = startime-newdate;
    		if(detail.status=='Active'){
    			vm.livetext = '取消提醒';
    		}else if(detail.status=='Inactive'){
    			vm.livetext = '开播提醒';
    		}
    		if(timenum>0){
    			var days = parseInt(timenum/86400000);
    			var _timenum = timenum%86400000;
    			var hour = parseInt(_timenum/3600000);
    			var _timenum2 = _timenum%3600000;
    			var minute = parseInt(_timenum2/60000);
    			vm.days = days;
    			vm.hour = hour;
    			vm.minute = minute;
    		}
    		vm.getLiveDetailTwo();
      });
    },
    getLiveDetailTwo:function(){
    	var vm = this;
    	timer=setInterval(function(){
    		vm.getLiveDetail();
    	},60000)
    },
    playing(index){
      const {videoList}=this
      this.showVideo=true;
      setTimeout(function(){
      //设置传递给播放器的参数
			var params = {
				autostart:true, //是否自动播放
				file:index,//文件 url
				markname:"视频文字水印" //视频上的随机文字水印
			};
			livePlayer.onInited = function (info) {
	        ump.log('播放器初始化完成！')
	        for(var o in info){
	            ump.log(o + "=" + info[o]);
	        }
	        /************收到初始化完成得消息后才可调用flash播放器的方法************/
	        //停止播放
	        //player.stop();
	
	        //获取当前播放状态，播放状态请参考player.onState里对应的值
	        //var state = player.getState();
	    };
	
	    //播放状态通知
	    livePlayer.onState = function(info) {
	        if(!info || (info && typeof info.type== undefined)){
	            return;
	        }
	
	        ump.log("播放状态："+info.type);
	
	        switch (info.type){
	            //视频加载中，调用播放接口时触发
	            case "loading":
	                break;
	            //视频播放中，视频从loading转为可开始播放状态时触发
	            case "playing":
	                break;
	            //视频停止，一般为视频正常结束、用户手动点击停止按钮或外部调用stop
	            case "stop":
	                break;
	        }
	    };
	
	    //播放器错误消息处理
	    livePlayer.onError = function(info) {
	        if(!info){
	            return;
	        }
	
	        if(info.type){
	            //不建议针对错误码做处理，用来做统计或定位问题使用
	            ump.log("播放器错误码："+info.type);
	        }
	
	        if(info.desc){
	            //显示错误提示给用户即可
	            ump.log("播放器错误提示："+info.desc);
	        }
	    };
	
	    //用户主动触发的行为消息，通过代码调用的接口不响应此事件，html5版本无此消息
	    livePlayer.onUserAction = function(info) {
	        if(!info || (info && typeof info.type== undefined)){
	            return;
	        }
	
	        ump.log("用户主动触发的行为:"+info.type);
	
	        switch (info.type){
	            //点击播放按钮
	            case "playBtnClick":
	                break;
	            //点击暂停按钮
	            case "pauseBtnClick":
	                break;
	            //点击全屏按钮
	            case "fullscreen":
	                break;
	            //点击退出全屏按钮
	            case "normalscreen":
	                break;
	            //点击静音按钮
	            case "muteBtnClick":
	                break;
	            //点击取消静音按钮
	            case "unmuteBtnClick":
	                break;
	            case "volumeChange":
	                ump.log("变化后的音量"+info.value);
	                break;
	            default:
	                ump.log("Unkown user action!");
	        }
	    };
			livePlayer.create({
				width : '100%',
		    height : '100%',
		    modId : "mod_player",
        params : params
			})
      //livePlayer.setFullscreen(true)
      },200)
    },
    stopVideo(){
       //var livePlayer = new ump.Player();
      // var params = {
      //   autostart:false, //是否自动播放
      //   file:"http://fczb.ufile.ucloud.com.cn/chest%2F20190129%2Faa49379eb0754be9f990fb85bb3644bc.mp4",//文件 url
      //   markname:"视频文字水印" //视频上的随机文字水印
      // };
      // livePlayer.create({
      //   width : '100%',
      //   height : '100%',
      //   modId : "mod_player",
      //   params : params
      // })
      livePlayer.stop()
      this.showVideo = false
    }
  },
  beforeMount() {
    var vm = this;
    getTagOfTalent({ types: "JKJCYTJ" })
      .then(res => {
        // console.log(res)
        vm.tagList = res.resultList;
        vm.getContent(res.resultList[0].typeName);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.excellentPlan {
  // width: 100%;
  width: calc(100% - 200px);
  display: flex;
  height: 100%;
}
.tag {
  width: 16.8%;
  height: 100%;
  border-right: 1px solid #eee;
  box-sizing: border-box;
  background-color: #eee;
  ul{
    padding-top: 0px;
    background-color: #fff;
  }
  .tag_item {
    width: 100%;
    height: 0.955rem;
    line-height: 0.955rem;
    color: #333;
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    letter-spacing: 0;
    text-align: center;
  }
  .active {
    background-color: #3c9bff;
    color: #fff;
  }
}
.content {
  box-sizing: border-box;
  height: calc(100% - 80px);
  width: 83.2%;
  margin-top: 40px;
  background-color: #fff;
  overflow-y: scroll;
  .content_inner {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    // width: 75%;
    .videos {
      width: 40%;
      margin-bottom: 0.6rem;
      img {
        width: 100%;
        height: 2.5rem;
      }
      p {
        font-family: PingFangSC-Medium;
        font-size: 0.30rem;
        color: #333333;
        letter-spacing: 0;
        line-height: 0.5rem;
      }
    }
  }
}
.task_info {
    position: absolute;
    left: 0;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
    text-align: center;
  }
.close_video{
  position: absolute;
  right: .4rem;
  top: .3rem;
  width: .72rem;
  height: .72rem;
  z-index: 99;
}
/**/
.live-content{
	width: 83.2%;
  font-size: .3rem;
  max-height: 98vh;
	overflow: auto;
}
.live-top{
	text-align: center;
  margin-top: 40px;
}
.live-top img{
	width: 85%;
  height: 50vh;
}
.live-bottom{
	text-align: center;
  margin-top: 40px;
}
.live-bottom>div {
    display: inline-block;
    width: 25%;
}
.live-bottom>div:nth-child(2){
	margin: 0 5%;
}
.live-bottom-item>img {
    width: 100%;
    height: auto;
}
.live-remind{
	width: calc(100% - 60px);
  padding: 0 30px;
}
.live-remind .head {
	right: 20px;
}
.live-remind .head .back{
	top:.3rem;
}
.live-remind-head{
	font-size: .4rem;
	text-align: center;
	line-height: 1.26rem;
	display: inline-block;
	vertical-align: middle;
	width: 79%;
	margin-left: -10%;
}
.live-remind-hint{
	box-shadow: 0 0 15px #f1f6fd;
  padding: 25px 15px 25px 20px;
  margin-top: 10px;
}
.live-remind-hint>div {
    display: inline-block;
    vertical-align: middle;
}
.remind-hint-left{
	width: 65%;
}
.remind-hint-right{
	width:35%;
	text-align: center;
}
.remind-hint-detail>p{
    display: inline-block;
    vertical-align: middle;
    font-size: .4rem;
}
.remind-hint-detail>p span{
	color: #3C9BFF;
}
.remind-hint-detail img{
	width: auto;
	height: 30px;
	vertical-align: middle;
	margin: 0 15px;
}
.remind-hint-icon{
	margin-top: 20px;
}
.remind-hint-icon img{
	width: 100%;
}
.remind-span{
	display: inline-block;
	border-radius: 5px;
	width: 60%;
	line-height: 60px;
	font-size: .4rem;
}
.remindnow{
	background: #3C9BFF;
	color: #fff;
}
.cancel-span{
	color: #999;
	border: 1px solid #999;
}
.live-remind-list{
	margin-top: 20px;
  font-size: .3rem;
  margin-bottom: 20px;
}
.remind-item{
	display: inline-block;
	width: 48%;
	vertical-align: top;
}
.live-remind-list>li:nth-child(odd){
	margin-right: 4%;
}
.remind-item-banner{
	position: relative;
}
.remind-item-banner img{
	width: 100%;
	display: block;
}
.remind-item-head{
	font-size: 0.36rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-top: 10px;
}
.remind-item-doctor{
	margin-top: 10px;
}
.remind-item-text{
	margin-top: 10px;
  color: #999;
}
.play-icon{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-51%);
}
.play-icon img{
 	width: auto;
  height: 1.1rem;
}
.remind-tag{
  position: absolute;
	top: 0;
	right: 0;
}
.remind-tag img{
  width: auto;
	height: 0.5rem;
}
/**/
.win-live{
  width: 100%;
	position: fixed;
	background: rgba(0,0,0,0.5);
	height: 100%;
	z-index: 10;
	top: 0;
	left: 200px;
}
.win-live-content{
	background: #fff;
	width: 60%;
	margin-left: 15%;
	margin-top: 25%;
	border-radius: 10px;
	text-align: center;
}
.win-live-content h4{
	font-size: .46rem;
  padding: 15px 0;
}
.win-live-tex{
	font-size: .4rem;
	color: #666;
	padding: 10px 0 20px 0;
}
.win-live-btn{
	border-top: 1px solid #eee;
}
.win-live-btn>div {
    display: inline-block;
    width: 50%;
    line-height: 70px;
    font-size: .4rem;
}
.win-live-btn-left{
	border-right: 1px solid #eee;
  box-sizing: border-box;
}
.win-live-btn-right{
	color: #3C9BFF;
}
/**/
.live-remind-back{
	width: 130px;
	height: 80px;
	font-size: 1.5vw;
	position: relative;
	top: 0;
	z-index: 10;
	left: 0px;
	background: #fff;
	display: inline-block;
	vertical-align: middle;
	width: 20%;
}
.live-remind-back img{
	position: absolute;
	top: .3rem;
	left: 30px;
	width: 1.21rem;
	height: .66rem;
}
</style>


