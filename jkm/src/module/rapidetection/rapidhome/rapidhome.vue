<template>
  <div class="rapidhome"> 
  	<headline none=""></headline><titleline headtxt="快速检测"></titleline>
  	<div class="rapidhome-content">
  		<div class="rapidhome-list">
  			<div class="rapid-item" v-for="item in itmelist" @click="chooseitem($event.target,item.code,item.value)">{{item.value}}</div>
  		</div>
  	</div>
  	<div class="rapidhome-bottom">
  		<div class="rapidhome-btn" @click="gotorapid">开始检测</div>
  	</div>
  </div>
</template>
<script>
import {createMedicalRecord} from 'API/requst'
import headline from 'components/headline/headline.vue'
import titleline from 'components/titleline/titleline.vue'
import { getURLParameter,dateFormat,empty} from 'utils/util'
import $ from 'jquery'
export default {

  name: 'rapidhome',
  components: {
  },
  data () {
    return {
      itmelist:[{code:'ecg',value:'心电'},{code:'blood',value:'血压'},{code:'glucose',value:'血糖'},{code:'oxygen',value:'血氧'},{code:'animalheat',value:'体温'},{code:'BMI',value:'BMI'},{code:'B超',value:'B超'},{code:'尿常规',value:'尿常规'},{code:'血脂',value:'血脂'},{code:'生化检测',value:'生化检测'},{code:'总胆固醇',value:'总胆固醇'},{code:'尿酸',value:'尿酸'},{code:'糖化血红蛋白',value:'糖化血红蛋白'},{code:'血红蛋白',value:'血红蛋白'}],
      choselist:[],
      personId:''
    }
  },
  methods:{
  	chooseitem:function(elem,code,tex){
  		var vm = this;
  		console.log(code);
  		if(code!='ecg'&&code!='blood'&&code!='glucose'&&code!='oxygen'&&code!='animalheat'){
  			vm.showtoast('敬请期待');
  			return false;
  		}
  		var carr = vm.choselist;
  		$('.rapid-item').removeClass('on');
			$(elem).addClass('on');
			var _obj = {
				'code':code,
				'value':tex
			}
			carr = [_obj];
			vm.choselist = carr;
//		if($(elem).hasClass('on')){
//			$(elem).removeClass('on');
//			var st = carr.indexOf(code); 
//			if(st>-1){
//				carr.splice(st,1);
//			}
//			
//		}else{
//			$(elem).addClass('on');
//			carr.push(code);
//		}
  		console.log(carr);
  	},
  	gotorapid:function(){
  		var vm = this;
  		var crobj = {
  			'personId':vm.personId,
  			'padDeviceCode':'P1',
  			'type':'fast'
  		}
  		if(!empty(vm.choselist)){
  			createMedicalRecord(crobj).then(data=>{
	  			var obj = {
	  				value:vm.choselist
	  			}
	  			sessionStorage.setItem('choselist',JSON.stringify(obj));
	  			window.location.href = 'startdetection.html?recordId='+data.recordId;
		    }).catch(err=>{
		    	vm.alertDefault({
		    		text:err.data.resultMessage
		    	})
		    })
  		}else{
  			vm.alertDefault({
					text:'请选择检测模块',
					rowButton:false,
					leftButtonText:'取消',
					rightButtonText: '确定'
				})
  		}
  	}
  },
  components:{
    headline,titleline
  },
  created () {
  	var vm = this;
  	vm.personId = sessionStorage.getItem('personId')||'mcse358b069e3b24dc881a54c1797372368';
  	var _url = window.location.origin+'/jkjch5/issue/home/index.html'+','+window.location.href;
  	sessionStorage.setItem('historyUrl',_url);
  },
  mounted(){
   
  }
}
</script>
<style>
	.rapidhome{
		height: calc(100% - 80px);
		overflow: hidden;
	}
	.rapidhome-content{
		height:100%;
	}
	.rapidhome-content{
		margin-top:80px;
		font-size: 20px;
		padding: 30px 5%;
	}
	.rapid-item{
		display: inline-block;
		width: 20%;
		line-height: 1.2rem;
		text-align: center;
		margin:0 2.5%;
		border: 1px solid #fc9452;
		color: #fc9452;
		font-size: .44rem;
		box-sizing: border-box;
		margin-bottom: .5rem;
		border-radius: .12rem;
	}
	.rapid-item.on{
		background:#fc9452 ;
		color: #fff;
	}
	.rapidhome-bottom{
		text-align: center;
		position: fixed;
    width: 100%;
    bottom: 30px;
    left: 0;
	}
	.rapidhome-btn{
		display: inline-block;
		background: #3c9bff;
    color: #fff;
    width: 26%;
    text-align: center;
    font-size: .48rem;
    line-height: 1rem;
    border-radius: 12px;
	}
</style>
