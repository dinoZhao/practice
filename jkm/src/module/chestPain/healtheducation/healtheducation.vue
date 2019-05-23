<template>
  <div class="healtheducation"> 
  	<headline />
  	<div class="healtheducation-head" style="font-size: .36rem;color: #3C9BFF;">
  		李明栋先生，为您推荐以下内容，可扫描二维码随身随时查看
  	</div>
  	<div class="healtheducation-content">
  		<ul class="video-list">
  			<li class="video-item" @click.stop="playing('http://fc-zb.ufile.ucloud.com.cn/chest%2F20181212%2Fxinzangkangfu.mp4')">
  				<div class="video-item-banner"><img src="https://www.fc18.com.cn/ymmopenapi/sgw/content/fileResource/412037664"/></div>
  				<div class="video-item-icon"><img src="../../../assets/stop_icon.png"/></div>
  				<div class="video-item-text"><p>“好”胆固醇水平，越高越好吗？</p></div>
  			</li>
  			<li class="video-item" @click.stop="playing('http://fc-zb.ufile.ucloud.com.cn/chest%2F20181212%2Fxinzangzhijia.mp4')">
  				<div class="video-item-banner"><img src="http://ymmsit.verify.fc18.com.cn/att/ymm/news/_2018121202.png"/></div>
  				<div class="video-item-icon"><img src="../../../assets/stop_icon.png"/></div>
  				<div class="video-item-text"><p>别让愤怒上了您的“心”</p></div>
  			</li>
  		</ul>
  		<ul class="article-list">
  			<li class="article-item">
  				<div class="article-item-left">
  					<img src="http://ymmsit.verify.fc18.com.cn/att/ymm/news/_2018121206.png"/>
  				</div><div class="article-item-right">
  					<h5>10个人就有1个！现在预防还来得及！</h5>
  					<p>2019年2月19日，美国医师协会（ACP）的官方期刊《内科学年鉴》（Annals of Internal Medicine）刊登出一篇文章，其内容是中国心血管疾病高风险人群的流行病和治疗情况的调查研究…</p>
  				</div>
  			</li>
  			<li class="article-item">
  				<div class="article-item-left">
  					<img src="http://ymmsit.verify.fc18.com.cn/att/ymm/news/20181204142800.png"/>
  				</div><div class="article-item-right">
  					<h5>更年期高血压于原发性高血压有什么区别</h5>
  					<p>问：听说更年期也会引起血压波动，如何区别原发性高血压还是更年期引起的高血压呢？怎么治疗？</p>
  				</div>
  			</li>
  		</ul>
  	</div>
  	<div class="task_info" id="mod_player" v-show="showVideo"></div>
    <img src="@/assets/close.png" class="close_video" v-show="showVideo" @click="stopVideo">
  	<div class='QR-Code' @click.stop="showwincode">
  		<img src="../../../assets/QR-Code.png" />
  	</div>
  	<div class="win-code" v-if="iswincode">
  		<div class="win-code-content">
  			<img src="../../../assets/erweima.png" class="win-code-banner"/>
  			<img src="../../../assets/close.png" class="win-code-icon" @click.stop="closewincode"/>
  			<p style="font-size: .36rem;margin-top: 15px;">微信扫一扫 获取更多资讯</p>
  		</div>
  	</div>
  </div>
</template>
<script>
import $ from 'jquery'
import 'utils/play.js'
import {getKnowledgeTag,cancelAttention} from 'API/requst'
import headline from 'components/headline/headline.vue'
import { getURLParameter,dateFormat } from 'utils/util'
var livePlayer = new ump.Player();
export default {

  name: 'healtheducation',
  components: {
  },
  data () {
    return {
     showVideo:false,
     iswincode:false,
    }
  },
  methods:{
  	showwincode:function(){
  		var vm = this;
  		vm.iswincode = true;
  	},
  	closewincode:function(){
  		var vm = this;
  		vm.iswincode = false;
  	},
  	playing(index){
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
  components:{
    headline
  },
  created () {
  	var vm = this;
  },
  mounted(){

  }
}
</script>
<style>
	.healtheducation{
		padding-left: 200px;
		font-size: .3rem;
	}
	.healtheducation .head{
		height: 1.7rem !important;
	}
	.healtheducation .head .back{
		top: 50%;
    transform: translateY(-50%);
	}
	.healtheducation .gray{
		color: #999999;
	}
	.healtheducation-head{
		border-bottom: 1px solid #eee;
    padding-left: 150px;
		display: flex;
    height: 1.7rem;
    align-items: center;
	}
	.healtheducation-head span{
		margin-left: 10px;
	}
	.healtheducation-head>div {
    display: inline-block;
    width: 33.33%;
    vertical-align: middle;
	}
	.head-name img{
		width: .9rem;
    height: .9rem;
    border-radius: 50%;
    margin-right: .2rem;
    vertical-align: middle;
	}
	.head-name>div{
		display: inline-block;
		vertical-align: middle;
	}
	.healtheducation-content{
		margin-top: 30px;
		padding-left: 30px;
	}
	.video-list,.video-item,.video-item-banner,.video-item-banner>img{
		height: 32vh;
	}
	.video-item{
		display: inline-block;
    width: 38%;
    position: relative;
    margin-right: 20px;
	}
	.video-item-banner img{
		width: 100%;
	}
	.video-item-icon{
		position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
	}
	.video-item-icon img{
		height: 1.1rem;
    width: auto;
	}
	.video-item-text{
		position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    background: rgba(0,0,0,0.5);
    width: 100%;
    padding: 10px 0 10px 0px;
    text-indent: 10px;
	}
	.article-item{
		padding: 15px 0;
    border-bottom: 1px solid #eee;
	}
	.article-item>div {
	    display: inline-block;
	    vertical-align: middle;
	}
	.article-item-left img{
		width: 1.7rem;
    height: 1.7rem;
	}
	.article-item-right{
    max-width: 85%;
	}
	.article-item-right h5{
		font-size: .3rem;
		padding-left: 15px;
	}
	.article-item-right p{
		margin-top: 20px;
    color: #9999;
    padding-left: 15px;
	}
	.QR-Code{
    position: fixed;
    top:0%;
    right:20px;
	}
	.QR-Code img{
		width: auto;
		height: 1.7rem;
	}
	/**/
	#mod_player{
		position: fixed;
    top: 0px;
    width: calc(100% - 200px);
    height: 100%;
    left: 200px;
    z-index: 10;
	}
	#mod_player video{
    object-fit: fill;
	}
	.close_video{
		position: fixed;
    top: 20px;
    right: 10px;
    z-index: 11;
	}
	.win-code{
		width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    top: 0;
    left: 0;
    position: fixed;
    z-index: 10;
	}
	.win-code-content{
		width: 45%;
    left: 30%;
    background: #fff;
    position: absolute;
    top: 50%;
    text-align: center;
    border-radius: 10px;
    transform: translateY(-50%);
    padding: 20px 0;
	}
	.win-code-banner{
		width: 50%;
    height: auto;
	}
	.win-code-icon{
		position: absolute;
    top: 20px;
    right: 20px;
	}
</style>
