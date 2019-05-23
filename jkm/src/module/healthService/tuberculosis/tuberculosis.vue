<template>
  <div class="tuberculosis healthservice"> 
  	<div class="tuberculosis-content table-content">
  		<div class="tuberculosis-content-head table-content-head">
  			<div class="content-head-left">
  				<span>健康体检表</span><span>编号 {{code}}</span>
  			</div><div class="content-head-right">
  				<P v-if="!iscompile" @click.stop="changecompile"><img src="../../../assets/save-btn.png"/><span>保存</span></P><P v-if="iscompile" @click.stop="compilebtn"><img src="../../../assets/compile-btn.png"/><span>编辑</span></P><P @click.stop="cancle"><img src="../../../assets/cancel-btn.png"/><span>取消</span></P>
  			</div>
  		</div>
  		<div class="tuberculosis-content-bottom table-content-bottom">
  			<div class="tuberculosis-content-left table-content-left">
	  			<div :class='["tuberculosis-conten-item table-content-item", tabindex=="one" ? "on" : ""]' @click.stop="changetab('one')"><span>症状<br/>体征</span></div>
	  			<div :class='["tuberculosis-conten-item table-content-item", tabindex=="two" ? "on" : ""]' @click.stop="changetab('two')"><span>生活<br/>方式</span></div>
	  			<div :class='["tuberculosis-conten-item table-content-item", tabindex=="three" ? "on" : ""]' @click.stop="changetab('three')"><span>检查<br/>用药</span></div>
	  			<div :class='["tuberculosis-conten-item table-content-item", tabindex=="four" ? "on" : ""]' @click.stop="changetab('four')"><span>转诊<br/>建议</span></div>
	  			<div :class='["tuberculosis-conten-item table-content-item", tabindex=="five" ? "on" : ""]' @click.stop="changetab('five')"><span>随访<br/>记录</span></div>
	  		</div><div class="tuberculosis-content-right table-content-right">
  				<div class="tuberculosis-one" v-show="tabindex=='one'">
  					<!--症状体征--head-->
            <template v-if="!iscompile">
              <symptomsSigns ref="symptomsSigns" :symptomsSigns="symptomsSigns">
              </symptomsSigns>
            </template>
  					<!--症状体征--end-->
            <template v-if="iscompile">
              <symptomsSignsShow :symptomsSigns="symptomsSigns">
              </symptomsSignsShow>
            </template>
  				</div>
  				<div class="tuberculosis-two" v-show="tabindex=='two'">
  					<!--生活方式-->
            <template v-if="!iscompile">
              <lifeStyle ref="lifeStyle" :lifeStyle="lifeStyle">
              </lifeStyle>
            </template>
            <template v-if="iscompile">
              <lifeStyleShow :lifeStyle="lifeStyle">
              </lifeStyleShow>
            </template>
  				</div>
  				<div class="tuberculosis-three" v-show="tabindex=='three'">
            <template v-if="!iscompile">
              <pharmacy ref="pharmacy" :drugs="drugs">
              </pharmacy>
            </template>
            <template v-if="iscompile">
              <pharmacyShow :drugs="drugs">
              </pharmacyShow>
            </template>
  					<!--检查用药-->
  				</div>
  				<div class="tuberculosis-four" v-show="tabindex=='four'">
          			<!--转诊建议-->
            <template v-if="!iscompile">
              <ReferralAdvice ref="ReferralAdvice" :advice="advice">
              </ReferralAdvice>
            </template>
            <template v-if="iscompile">
              <ReferralAdviceShow :advice="advice">
              </ReferralAdviceShow>
            </template>
  				</div>
  				<div class="tuberculosis-five" v-show="tabindex=='five'">
  					<!--随访记录-->
            <template v-if="!iscompile">
              <FollowUp ref="FollowUp" :FollowUpRecords="FollowUpRecords">
              </FollowUp>
            </template>
            <template v-if="iscompile">
              <FollowUpShow :FollowUpRecords="FollowUpRecords">
              </FollowUpShow>
            </template>
  				</div>
	  		</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import {updateHealthyCheck,queryHealthyCheckDetail,readPatientMsg} from 'API/requst'
import { getURLParameter,dateFormat,empty  } from 'utils/util'
import symptomsSigns from './symptomsSigns' //症状体征
import symptomsSignsShow from './symptomsSignsShow' //症状体征显示页
import pharmacy  from './pharmacy' //用药
import pharmacyShow from './pharmacyShow' //用药显示页
import lifeStyle from './lifeStyle' //生活方式
import lifeStyleShow from './lifeStyleShow' //生活方式显示页
import ReferralAdvice from './ReferralAdvice' //转诊建议
import ReferralAdviceShow from './ReferralAdviceShow' //转诊建议显示页面
import FollowUp from './FollowUp' //随访记录
import FollowUpShow from './FollowUpShow' //随访记录显示页面
export default {
  name: 'tuberculosis',
  data () {
    return {
    	tabindex:'one',
	     code:'',
	     iscompile:false,
	     isEdit:true,
      symptomsSigns: //症状体征
    {
      "Types": "2",
      "Sputum": "1",
      "Drug": "3",
      "SymptomsList": ['2','3'
    ],
      'other':"正常"
    },
      drugs:{ //检查用药
        "chemotherapy":'正常',
        "usage":'2',
        "PharmaceuticalList":['2','3'

        ],
        "personType":'2',
      },
      lifeStyle:{ //生活方式
        smoke:'50',
        drink:'50'
      },
      advice:{ //转诊建议
        transferflag:'1',
        reason:'正常',
        organization:'北京'
      },
      FollowUpRecords:{
        FollowUpDate:1558489368634,
        FollowingType:'1',
        Classification:"1",
        FollowTime:1558224000000
      }
    }
  },
  methods:{
  	changetab:function(tex){
  		var vm = this;
		if(tex!='one'&&tex!='two'&&tex!='three'&&tex!='four'&&tex!='five' && tex!='six' && tex!='seven'){
			vm.construction();
		}else{
  			vm.tabindex = tex;
	  	}
  	},
  	compilebtn:function(){
  		var vm = this;
  		vm.iscompile = false;
  	},
  	changecompile:function(){
  		var vm = this;
  		vm.iscompile = true;
      vm.$refs.symptomsSigns.saveDate();
      vm.$refs.pharmacy.saveDate();
      vm.$refs.lifeStyle.saveDate();
  	}
  },
  components:{
    symptomsSigns,//症状体征
    symptomsSignsShow, //症状体征
    pharmacy,//检查用药
    pharmacyShow,//检查用药
    lifeStyle,//生活方式
    lifeStyleShow,//生活方式
    ReferralAdvice,//转诊建议
    ReferralAdviceShow,//转诊建议
    FollowUp, //随访记录
    FollowUpShow //随访记录
  },
  created () {
  		let vm = this;
  },
  mounted(){
  }
}
</script>
<style lang="scss"  type="text/css">
	.tuberculosis{
		font-size: 0.28rem;
		height: calc(100% - 70px);
	}
	/*通用样式*/
	input{
		outline: none;
		border: 1px solid #eee;
	}
	.tuberculosis-content-head{
		padding: 15px 30px;
		border-bottom: 1px solid #eee;
	}
	.tuberculosis-content-head>div{
		display: inline-block;
		width: 50%;
	}
	.content-head-left>span:nth-child(2){
		color: #999;
		margin-left: 10px;
	}
	.content-head-right>p{
		display: inline-block;
		vertical-align: middle;
	}
	.content-head-right>p:nth-child(1){
		margin-right: 10px;
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
	.tuberculosis-content-bottom{
		padding: 15px 30px;
	}
	.tuberculosis-content-bottom>div{
		display: inline-block;
		vertical-align: text-top;
	}
	.tuberculosis-content-left{
		width: 9%;
	}
	.tuberculosis-content-left>div{
		margin-bottom: 8px;
		text-align: right;
	}
	.tuberculosis-content-left>div span{
		display: inline-block;
    background: #F2F2F2;
    width: 100%;
    text-align: center;
    padding: 6px 0;
    border-radius: 15% 0 0 15%;
    color: #999;
	}
	.tuberculosis-content-left>div.on span{
		background:rgba(60,155,255,0.1) !important;
		color: #3C9BFF;
	}
	.tuberculosis-content-right{
		width: 91%;
		border: 1px solid #eee;
		box-sizing: border-box;
		max-height: 88vh;
		overflow: auto;
	}
	/*通用结束*/
	/*.tuberculosis-three{*/
		    /*height: 87vh;*/
    /*overflow: scroll;*/
	/*}*/
	/*健康体检表生活方式模块样式--head*/

	/*健康体检表生活方式模块--head*/
	
</style>
