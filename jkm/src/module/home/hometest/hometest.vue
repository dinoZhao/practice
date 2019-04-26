<template>
  <div class="hometest"> 
  	hometest<img src="../../../assets/weixin.png" /><headline headtxt="首页" none=""></headline>
  	<div class="time"><date-picker :date="startTime" :option="option" :limit="limit"></date-picker></div>
  </div>
</template>
<script>
import {getKnowledgeTag,cancelAttention} from 'API/requst'
import headline from 'components/headline/headline.vue';
import { getURLParameter,dateFormat } from 'utils/util'
import myDatepicker from 'vue-datepicker'
export default {

  name: 'hometest',
  components: {
  },
  data () {
    return {
      playing:true,
      bennLike:false,
      startTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD',
        placeholder: '请选择',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '1px solid #eee',
          'box-shadow': '0',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'width': '90px'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['一', '二', '三', '四', '五', '六','日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{
        type: 'weekday',
        available: [0,1, 2, 3, 4, 5,6]
      },
      {
        type: 'fromto',
        from: '1949-01-01',
        to: '2020-02-20'
      }]
    }
  },
  methods:{
  },
  components:{
    headline,
    'date-picker': myDatepicker
  },
  created () {
  	var vm = this;
  	setTimeout(function(){
  		vm.alertDefault({
            text:'课程学习完毕，来检验一下学习成果吧',
            rowButton:true,
            rightButtonCallback:function(){
               
            }
        })
  	},1000)
  },
  mounted(){
    let id ={'productCode':'YQB00101'};
    let per = {'content':'h5/homePage/index.h5_default'}
    getKnowledgeTag(id).then(data=>{
      console.log(data)
    })
    cancelAttention(per).then(data=>{
      console.log(data)
    })
  }
}
</script>
<style>
	.home{
		color:#d43c33;
	}
</style>
