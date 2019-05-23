<template>
  <div class="FollowUp">
    <div class="FollowUp_content">
      <div class="duty">
        <span class="text">随访日期</span>
        <span class="date" v-if="FollowUpRecords && FollowUpRecords.FollowUpDate">{{FollowUpRecords.FollowUpDate | filterDate}}</span>
      </div>
      <div class="title marginTop">
        <i class="lineleft"></i>
        <span>随访方式</span>
      </div>
      <div class="button_content marginTop">
        <input type="button" v-for="item of type"  :class="{active:item.code==FollowUpRecordsList.FollowingType}" @click="checkedes(item.code,'随访方式')"  :value="item.type">
      </div>
      <div class="title_top marginTop">
        <span>随访分类</span>
      </div>
      <div class="button_content marginTop">
        <span>此次随访分类</span>
        <input type="button" v-for="item of ClassificationType"  :class="{active:item.code===FollowUpRecordsList.Classification}" @click="checkedes(item.code,'随访分类')"  :value="item.type">
      </div>
      <div class="title_top nextTime marginTop"><span>下次随访时间</span></div>
      <div class="data marginTop">
        <span>下次随访时间</span>
        <date-picker :option="option" :limit="limit" class="normal" :date="startTime" @change="changeTime"></date-picker>
      </div>
      <div class="dutyName marginTop">
        <span>责任医生</span>
        <span>{{FollowUpRecordsList.doctorName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getURLParameter,dateFormat,empty  } from 'utils/util'
  import myDatepicker from 'vue-datepicker'
    export default {
      props:['FollowUpRecords'],
      data (){
        return {
          startTime: {
            time: ''
          },
          type:[
            {code: '1', type: '门诊'},
            {code: '2', type: '家庭'},
            {code: '3', type: '电话'}
          ],
          ClassificationType:[
            {code: '1', type: '控制满意'},
            {code: '2', type: '控制不满意'},
            {code: '3', type: '不良反应'},
            {code: '4', type: '并发症'}
          ],
          FollowUpRecordsList:{
            FollowingType:'1',
            Classification:'',
            time:'',
            doctorName:JSON.parse(sessionStorage.getItem('doctorMsg')).docName,
            FollowTime:''
          },
          option:{
            type: 'day',
            week: ['一', '二', '三', '四', '五', '六','日'],
            month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            format: 'YYYY-MM-DD',
            placeholder: '请选择',
            inputStyle: {
              'display': 'inline-block',
              'line-height': '22px',
              'font-size': '0.28rem',
              'border': '1px solid #EEEEEE',
              'border-radius': '10px',
              'color': '#5F5F5F',
              'width': '100%!important',
              'margin-left':'12px',
              'height':'0.6rem',
              'box-sizing': 'border-box'
            },
            color: {
              header: '#ccc',
              headerText: '#f00'
            },
            buttons: {
              ok: '确定',
              cancel: '取消'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true, // as true as default
          },
          limit: [],
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
        }
      },
      filters:{
        filterDate (value){
          return moment(value).format('YYYY-MM-DD')
        }
      },
      methods:{
          checkedes(code,name) {
            let vm=this
            switch (name) {
              case '随访方式':
                vm.FollowUpRecordsList.FollowingType=code
                break;
              case '随访分类':
                vm.FollowUpRecordsList.Classification=code
                break;
            }
          },
        changeTime (){
            this.FollowUpRecordsList.FollowTime=new Date(this.startTime.time).getTime()
        },
        upDate (){
          let vm=this
          let symptomsSigns=vm.FollowUpRecords
          let symptomsSignsList=vm.FollowUpRecordsList
          Object.keys(symptomsSigns).forEach(key=>{
            Object.keys(symptomsSignsList).forEach(keyStr=>{
              if(key==keyStr){
                symptomsSignsList[keyStr]=symptomsSigns[key]
                if(key='FollowTime' && symptomsSigns[key]){
                  vm.startTime.time=moment(symptomsSigns[key]).format('YYYY-MM-DD')
                }
              }
            })
          })
        }
      },
      components:{
        'date-picker': myDatepicker
      },
      created (){
        // this.upDate()
        var vm = this;
        var myDate = new Date();
        var timer = dateFormat(myDate.getTime(),'Y-m-d');
        console.log(timer)
        vm.limit = [{
          type: 'weekday',
          available: [0,1, 2, 3, 4, 5,6]
        },
          {
            type: 'fromto',
            from: '1949-04-02',
            to: timer
          }]
      }
    }
</script>

<style scoped lang="less">
.FollowUp{
  font-size: 0.28rem;
  height: 7.55rem;
  .FollowUp_content{
    width: 92%;
    padding: 0.3rem 4%;
    overflow: hidden;
    span{
      font-size: 0.28rem;
      color: #333333;
      font-family: PingFangSC-Regular;
      vertical-align: middle;
    }
    .duty{
      span.text{
        margin-right: .1rem;
      }
    }
    .title {
      .lineleft {
        display: inline-block;
        vertical-align: middle;
        width: 0.04rem;
        height: 0.3rem;
        background: #3C9BFF;
      }
      span {
        vertical-align: middle;
        margin-left: 0.05rem;
      }
    }
    .marginTop{
      margin-top: 0.28rem;
    }
    .button_content{
      width: 100%;
      span{
        vertical-align: middle;
        display: inline-block;
        margin-right: 2.6%;
      }
      input[type='button']{
        height: 0.6rem;
        display: inline-block;
        line-height: 0.6rem;
        border: 1px solid #3C9BFF;
        font-size: 0.26rem;
        border-radius: 0.1rem;
        color: #3C9BFF;
        background-color: #FFFFFF;
        width: 1.5rem;
        margin-right: 1.6%;
        vertical-align: middle;
        outline: none;
        padding: 0;
        position: relative;
        left: -1%;
        &.active{
          background-color: #3C9BFF;
          color: #FFFFFF;
        }
      }
    }
    .title_top{
      width: 9.4vw;
      line-height: 2.6vw;
      background: rgba(60, 155, 255, 0.1);
      text-align: center;
      border-radius: 30px;
      position: relative;
      left: -1%;
      span{
        color: #3C9BFf;
      }
    }
    .nextTime{
      width: 12vw;
    }
    .date{
      margin-left: .1rem;
    }
    .dutyName{
      width: 100%;
    }
  }
}
</style>
