<template>
  <div class="hypertension healthservice"> 
  	<div class="left">
  		<ul class="left-list">
  			<li class="left-item item" @click.stop="gototaburl('个人档案')">个人档案</li>
  			<li class="left-item item" @click.stop="gototaburl('健康体检表')">健康体检表</li>
  			<li class="left-item item on" @click.stop="gototaburl('高血压随访')">高血压随访</li>
  			<li class="left-item item" @click.stop="gototaburl('结核病随访')">结核病随访</li>
  			<li class="left-item item" @click.stop="gototaburl('门诊记录')">门诊记录</li>
  			<li class="left-item item" @click.stop="gototaburl('转诊记录')">转诊记录</li>
  		</ul>
  	</div><div class='hypertension-content'>
  		<div class="content-head">
  			<div class="content-head-left" style="color: #333;">
  				随访信息
  			</div><div class="content-head-right" @click.stop="gotofollow('newadd')">
  				<img src="../../../assets/newadd.png"/><span>新增</span>
  			</div>
  		</div>
  		<ul class="content-list">
  			<li class="list-item" v-for="(item,index) in result">
  				<div class="list-item-left">
  					随访时间：{{item.recordTime|fmat}}
  				</div><div class="list-item-center">
  					收缩压：{{item.sys}}mmhg 舒张压：{{item.dia}}mmhg
  				</div><div class="list-item-right" :data-id="item.id" @click.stop="gotofollow('lookover',item.id)">
  					<span>查看</span>
  				</div>
  			</li>
  		</ul>
  	</div>
  </div>
</template>
<script>
import {queryHBPFollowUp} from 'API/requst'
import { getURLParameter,dateFormat,empty } from 'utils/util'
export default {

  name: 'hypertension',
  components: {
  },
  data () {
    return {
     result:[]
    }
  },
  methods:{
  	gotofollow:function(tex,id){
  		var vm = this;
  		var _id = id||'';
  		window.location.href = 'followUp.html?type='+tex+'&id='+_id;
  	},
  	initialize:function(){
  		var vm = this;
  		setTimeout(function(){
	    	var _height = document.body.clientHeight-$('.content-head').outerHeight()-30;
				$('.content-list').css('max-height',_height+'px');
				$('.content-list').css('overflow','auto');
	    },300)
  	},
  	gototaburl:function(tex){
  		var vm = this;
  		switch(tex){
  			case '个人档案':
  			var _url = 'index.html';
  			break;
  			case '健康体检表':
  			var _url = 'healthList.html';
  			break;
  			case '结核病随访':
  			var _url = 'tuberculosisList.html';
  			break;
  			case '门诊记录':
  			var _url = '';
  			vm.construction();
  			return;
  			break;
  			case '转诊记录':
  			var _url = '';
  			vm.construction();
  			return;
  			break;
  			default:
  			_url = '';
  		}
  		if(!empty(_url)){
  			window.location.href = _url;
  		}
  	}
  },
  components:{
  },
  created () {
  	var vm = this;
  	var obj = {
			"personId":getURLParameter('personId')||sessionStorage.getItem('personId')
		}
  	queryHBPFollowUp(obj).then(data=>{
      vm.result = data.result;
      vm.initialize();
    })
  },
  mounted(){

  }
}
</script>
<style>
.hypertension{
	font-size: 0.28rem;
}
.hypertension .left{
	display: inline-block;
	vertical-align: text-top;
	text-align: center;
}
.hypertension .left .item.on{
	background: #3C9BFF;
	color: #fff;
}
.hypertension-content{
	display: inline-block;
	width: 83.2%;
	vertical-align: text-top;
	height: 100%;
	border-left: 1px solid #eee;
	box-sizing: border-box;
}
.content-head{
	padding: 15px 15px;
	border-bottom:1px solid #eee;
	color: #3C9BFF;
}
.content-head>div{
	width: 50%;
	display: inline-block;
}
.content-head-right{
	text-align: right;
}
.content-head-right img{
	width: .5rem;
	height: .5rem;
	vertical-align: middle;
	margin-right: 10px;
}
.content-head-right span{
	vertical-align: middle;
}
/*随访列表*/
.content-list{
	padding: 15px 15px;
}
.list-item{
	padding: 20px 15px;
	box-shadow: 0 0 15px #ebf5ff;
	margin-bottom: 10px;
}

.list-item>div{
	display: inline-block;
	vertical-align: middle;
}
.list-item-left{
	width:35%;
}
.list-item-center{
	width:45%;
}
.list-item-right{
	width:20%;
}
.list-item-right span{
	background: #3C9BFF;
	color: #fff;
	padding: 8px 30px;
	display: inline-block;
	border-radius: 5px;
}
</style>
