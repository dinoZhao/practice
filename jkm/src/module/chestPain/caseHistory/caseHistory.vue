<template>
  <div class="caseHistory">
    <div class="caseHistory-back">
      <headline/>
    </div>
    <div class="caseHistory">
      <div class="caseHistory_content">
      <div class="caseHistory_left">
        <div class="name"><img src="../../../assets/head-pic.png" alt=""><b>李明栋</b></div>
        <ul>
          <li><span>性别:</span><span>男</span></li>
          <li><span>年龄:</span><span>42</span></li>
          <li><span>门诊号:</span><span>S28368</span></li>
          <li><span>住院号:</span><span>M10860</span></li>
          <li><span>地址:</span><span>上海市杨浦区长阳路1687号C3栋103</span></li>
          <li><span>身份证:</span><span>310110198011213849</span></li>
          <li><span>到达方式:</span><span>自行来院</span></li>
        </ul>

      </div>
      <div class="caseHistory_middle" ref="middle">
        <div class="middle_content">
          <div class="middle_item" v-for="(item,index) in list.process" :key="index">
            <div class="middle_left">
              <div class="line">
                <div :class="{gray:item.recordId>list.curStep.recordId,long:item.recordId===list.curStep.recordId}"></div>
                <div :class="{gray:item.recordId>list.curStep.recordId,stagger:item.recordId===list.curStep.recordId}"></div>
              </div>
              <img src="../../../assets/success.png" alt="" class="loading" ref="img" v-if="item.recordId<list.curStep.recordId">
              <img src="../../../assets/loading.png" alt="" v-if="item.recordId===list.curStep.recordId">
              <img src="../../../assets/disabled.png" alt="" v-if="item.recordId>list.curStep.recordId">
              <!--<img src="../../../assets/loading.png" alt="" class="img" v-if="bChecks">-->
              <span class="text">{{item.nodeName}}</span>
              <span class="now" v-if="item.recordId===list.curStep.recordId">进行中</span>
              <span class="time" v-if="item.createdOn && item.recordId!==list.curStep.recordId">{{item.createdOn | filterDate}}</span>
            </div>
            <div class="middle_right" v-if="item.recordId==list['curStep'].recordId && item.location">
              <img src="../../../assets/report.png" alt="">
              <p @click="transfer(item.location)">查看报告</p>
            </div>
          </div>
        </div>
      </div>
      <div class="caseHistory_right">
        <div class="right_top">
          <ul>
            <li v-for="(item,index) in list.categoryList" :key="index" @click="choose(index)"
            :class="{active:current==index}">{{item.name}}</li>
          </ul>
        </div>
        <div class="right_content" v-for="(item,index) in list.categoryList" :key="index" v-if="current==index">
            <ul>
              <li v-for="(items,index) in item.value" :key="index"><span>{{items.itemName}}</span><span>33</span></li>
            </ul>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import {getKnowledgeTag, cancelAttention} from 'API/requst'
  import headline from 'components/headline/headline.vue';
  import {getURLParameter, dateFormat} from 'utils/util'
  import moment from 'moment'
  import url from '../../../assets/success.png'
  export default {
    data() {
      return {
        current:0,
        bCheck:null,
        bChecks:null,
        successImg:'../../../static/imgs/success.png',
        loadingImg:'../../../static/imgs/loading.png',
            list: {
              "resultCode": "success",
              "resultMessage": "处理成功",
              "process": [{
                "recordId": "82702",
                "nodeName": "发病时间",
                "createdOn": "",
                "report": "",
                "chartCode": "00",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "pre_onset",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": "",

              }, {
                "recordId": "82703",
                "nodeName": "到达本院大门",
                "createdOn": 1557803240172,
                "report": "",
                "chartCode": "01",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "arrivalDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82704",
                "nodeName": "首次医疗接触",
                "createdOn": 1557803300172,
                "report": "",
                "chartCode": "02",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "nurseTriageDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": "https://www.baidu.com/"
              }, {
                "recordId": "82705",
                "nodeName": "到达急诊",
                "createdOn": "",
                "report": "",
                "chartCode": "150",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "ED_time",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82706",
                "nodeName": "院内接诊",
                "createdOn": "",
                "report": "",
                "chartCode": "03",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "doctorReceptionDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82707",
                "nodeName": "院前首份心电图时间",
                "createdOn": "",
                "report": "",
                "chartCode": "04",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "preECGTime",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82708",
                "nodeName": "院内首份心电图",
                "createdOn": "",
                "report": "",
                "chartCode": "04",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "firstEcgDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82709",
                "nodeName": "心电图确诊",
                "createdOn": "",
                "report": "",
                "chartCode": "05",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "firstEcgConfirmDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82710",
                "nodeName": "抽血",
                "createdOn": "",
                "report": "",
                "chartCode": "06",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "ctnlBloodDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82711",
                "nodeName": "抽血报告",
                "createdOn": "",
                "report": "",
                "chartCode": "07",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "ctnlBloodReportDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82712",
                "nodeName": "初步诊断",
                "createdOn": "",
                "report": "",
                "chartCode": "20",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "confirmTime",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82713",
                "nodeName": "决定介入手术",
                "createdOn": "",
                "report": "",
                "chartCode": "30",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "decideInterveneDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82714",
                "nodeName": "抗血小板首次药",
                "createdOn": "",
                "report": "",
                "chartCode": "160",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "drugDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82715",
                "nodeName": "离开急诊",
                "createdOn": "",
                "report": "",
                "chartCode": "08",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "outEmergencyDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82716",
                "nodeName": "到达CCU",
                "createdOn": "",
                "report": "",
                "chartCode": "28",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "ccuArrivalDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82717",
                "nodeName": "开始知情同意",
                "createdOn": "",
                "report": "",
                "chartCode": "40",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "informedConsentDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82718",
                "nodeName": "签署知情同意",
                "createdOn": "",
                "report": "",
                "chartCode": "50",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "signInformedConsentDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82719",
                "nodeName": "启动导管室",
                "createdOn": "",
                "report": "",
                "chartCode": "60",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "startPipeRoomDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82720",
                "nodeName": "导管室激活",
                "createdOn": "",
                "report": "",
                "chartCode": "70",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "activatePipeRoomDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82721",
                "nodeName": "到达导管室",
                "createdOn": "",
                "report": "",
                "chartCode": "80",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "patientEnterPipeRoomDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82722",
                "nodeName": "首次抗凝给药",
                "createdOn": "",
                "report": "",
                "chartCode": "85",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "drugTime",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82723",
                "nodeName": "开始穿刺",
                "createdOn": "",
                "report": "",
                "chartCode": "90",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "punctureDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82724",
                "nodeName": "穿刺成功",
                "createdOn": "",
                "report": "",
                "chartCode": "92",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "punctureSuccessTime",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82725",
                "nodeName": "造影开始",
                "createdOn": "",
                "report": "",
                "chartCode": "100",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "coronaryAngiogramStartDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82726",
                "nodeName": "造影完成",
                "createdOn": "",
                "report": "",
                "chartCode": "110",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "coronaryAngiogramEndDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82727",
                "nodeName": "导丝通过",
                "createdOn": "",
                "report": "",
                "chartCode": "120",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "wireCrossingDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82728",
                "nodeName": "手术结束",
                "createdOn": "",
                "report": "",
                "chartCode": "130",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "pciCompleteDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }, {
                "recordId": "82729",
                "nodeName": "出院时间",
                "createdOn": "",
                "report": "",
                "chartCode": "140",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "leaveHospitalDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": ""
              }],
              "outpatientNumber": null,
              "patientAge": null,
              "patientAddress": null,
              "patientName": "临时患者6",
              "categoryList": [{
                "name": "急诊救治",
                "value": [{
                  "itemName": "意识",
                  "itemType": "radio",
                  "orderNumber": 1,
                  "value": "",
                  "itemOptions": "[{\"name\":\"清醒\",\"code\":\"清醒\"},{\"name\":\"对语言有反应\",\"code\":\"对语言有反应\"},{\"name\":\"对刺痛有反应\",\"code\":\"对刺痛有反应\"},{\"name\":\"对任何刺激无反应\",\"code\":\"对任何刺激无反应\"}]",
                  "typeFormat": null,
                  "itemCode": "consciousness"
                }, {
                  "itemName": "呼吸(次/分钟)",
                  "itemType": "input",
                  "orderNumber": 2,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "number",
                  "itemCode": "breath"
                }, {
                  "itemName": "心率(次/分钟)",
                  "itemType": "input",
                  "orderNumber": 3,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "number",
                  "itemCode": "heartbeat"
                }, {
                  "itemName": "脉搏(次/分钟)",
                  "itemType": "input",
                  "orderNumber": 4,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "number",
                  "itemCode": "pulse"
                }, {
                  "itemName": "收缩压(mmHg)",
                  "itemType": "input",
                  "orderNumber": 5,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "number",
                  "itemCode": "systolicPressure"
                }, {
                  "itemName": "舒张压(mmHg)",
                  "itemType": "input",
                  "orderNumber": 6,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "number",
                  "itemCode": "diastolicPressure"
                }, {
                  "itemName": "killip分级",
                  "itemType": "radio",
                  "orderNumber": 7,
                  "value": "",
                  "itemOptions": "[{\"name\":\"I级\",\"code\":\"1\"},{\"name\":\"II级\",\"code\":\"2\"},{\"name\":\"III级\",\"code\":\"3\"},{\"name\":\"IV级\",\"code\":\"4\"}]",
                  "typeFormat": null,
                  "itemCode": "killipLevel"
                }, {
                  "itemName": "初步诊断",
                  "itemType": "radio",
                  "orderNumber": 8,
                  "value": "",
                  "itemOptions": "[{\"name\":\"诊断中\",\"code\":\"1\"},{\"name\":\"STEMI\",\"code\":\"2\"},{\"name\":\"NSTEMI\",\"code\":\"3\"},{\"name\":\"UA\",\"code\":\"4\"},{\"name\":\"主动脉夹层\",\"code\":\"5\"},{\"name\":\"肺动脉栓塞\",\"code\":\"6\"},{\"name\":\"非ACS心源性胸痛\",\"code\":\"7\"},{\"name\":\"其它非心源性胸痛\",\"code\":\"8\"},{\"name\":\"放弃治疗、病因未明\",\"code\":\"9\"},{\"name\":\"其它\",\"code\":\"10\"}]",
                  "typeFormat": null,
                  "itemCode": "treatResult"
                }, {
                  "itemName": "给药",
                  "itemType": "drugInfo",
                  "orderNumber": 9,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": null,
                  "itemCode": "drugInfo"
                }, {
                  "itemName": "药物",
                  "itemType": "radio",
                  "orderNumber": 10,
                  "value": "",
                  "itemOptions": "[{\"name\":\"普通肝素\",\"code\":\"1\"},{\"name\":\"低分子肝素\",\"code\":\"2\"},{\"name\":\"比伐卢定\",\"code\":\"3\"},{\"name\":\"磺达肝癸钠\",\"code\":\"4\"}]",
                  "typeFormat": null,
                  "itemCode": "antiDrug"
                }, {
                  "itemName": "计量(iu)",
                  "itemType": "antiDrugValue",
                  "orderNumber": 11,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "digit",
                  "itemCode": "antiDrugValue"
                }]
              }, {
                "name": "手术情况",
                "value": [{
                  "itemName": "D2B时间",
                  "itemType": "input",
                  "orderNumber": 4,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "digit",
                  "itemCode": "dtwobTime"
                }, {
                  "itemName": "罪犯血管",
                  "itemType": "radio",
                  "orderNumber": 5,
                  "value": "",
                  "itemOptions": "[{\"name\":\"左主干（LM）\",\"code\":\"LM\"},{\"name\":\"前降支（LAD）\",\"code\":\"LAD\"},{\"name\":\"回旋支（LCX）\",\"code\":\"LCX\"},{\"name\":\"右冠（RCA）\",\"code\":\"RCA\"},{\"name\":\"对角支（D）\",\"code\":\"D\"},{\"name\":\"钝缘支（OM）\",\"code\":\"OM\"}]",
                  "typeFormat": null,
                  "itemCode": "culpritVessel"
                }, {
                  "itemName": "靶血管血流(术前)",
                  "itemType": "radio",
                  "orderNumber": 6,
                  "value": "",
                  "itemOptions": "[{\"name\":\"0\",\"code\":\"0\"},{\"name\":\"1\",\"code\":\"1\"},{\"name\":\"2\",\"code\":\"2\"},{\"name\":\"3\",\"code\":\"3\"}]",
                  "typeFormat": null,
                  "itemCode": "timiLevelBefore"
                }, {
                  "itemName": "靶血管血流(术后)",
                  "itemType": "radio",
                  "orderNumber": 7,
                  "value": "",
                  "itemOptions": "[{\"name\":\"0\",\"code\":\"0\"},{\"name\":\"1\",\"code\":\"1\"},{\"name\":\"2\",\"code\":\"2\"},{\"name\":\"3\",\"code\":\"3\"}]",
                  "typeFormat": null,
                  "itemCode": "timiLevelAfter"
                }, {
                  "itemName": "冠脉支架植入个数",
                  "itemType": "radio",
                  "orderNumber": 8,
                  "value": "",
                  "itemOptions": "[{\"name\":\"1\",\"code\":\"1\"},{\"name\":\"2\",\"code\":\"2\"},{\"name\":\"3\",\"code\":\"3\"},{\"name\":\"4\",\"code\":\"4\"}]",
                  "typeFormat": null,
                  "itemCode": "coronaryStentNumber"
                }]
              }, {
                "name": "转归情况",
                "value": [{
                  "itemName": "转归",
                  "itemType": "radio",
                  "orderNumber": 1,
                  "value": "",
                  "itemOptions": "[{\"name\":\"出院\",\"code\":\"1\"},{\"name\":\"转送其它医院\",\"code\":\"2\"},{\"name\":\"转送其它科室\",\"code\":\"3\"},{\"name\":\"死亡\",\"code\":\"4\"}]",
                  "typeFormat": null,
                  "itemCode": "turnTo"
                }, {
                  "itemName": "院内是否出现心衰",
                  "itemType": "radio",
                  "orderNumber": 2,
                  "value": "",
                  "itemOptions": "[{\"name\":\"是\",\"code\":\"true\"},{\"name\":\"否\",\"code\":\"false\"}]",
                  "typeFormat": null,
                  "itemCode": "isHeartFailure"
                }, {
                  "itemName": "治疗效果",
                  "itemType": "radio",
                  "orderNumber": 3,
                  "value": "",
                  "itemOptions": "[{\"name\":\"治愈\",\"code\":\"1\"},{\"name\":\"好转\",\"code\":\"2\"},{\"name\":\"脑死亡离院\",\"code\":\"3\"},{\"name\":\"其它原因离院\",\"code\":\"4\"}]",
                  "typeFormat": null,
                  "itemCode": "treatmentEffect"
                }, {
                  "itemName": "住院天数",
                  "itemType": "input",
                  "orderNumber": 5,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "digit",
                  "itemCode": "inHospitalDays"
                }, {
                  "itemName": "出院带药",
                  "itemType": "checkbox",
                  "orderNumber": 6,
                  "value": "",
                  "itemOptions": "[{\"name\":\"DAPT\",\"code\":\"DAPT\"},{\"name\":\"ACEI/ARB\",\"code\":\"ACEI/ARB\"},{\"name\":\"他汀\",\"code\":\"他汀\"},{\"name\":\"β阻滞剂\",\"code\":\"β阻滞剂\"}]",
                  "typeFormat": null,
                  "itemCode": "takeDrugs"
                }, {
                  "itemName": "总费用",
                  "itemType": "input",
                  "orderNumber": 7,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": "digit",
                  "itemCode": "totalCost"
                }, {
                  "itemName": "备注",
                  "itemType": "textarea",
                  "orderNumber": 8,
                  "value": "",
                  "itemOptions": null,
                  "typeFormat": null,
                  "itemCode": "remarkAfter"
                }]
              }],
              "patientSex": "",
              "curStep": {
                "recordId": "82704",
                "nodeName": "首次医疗接触",
                "createdOn": 1557803300172,
                "report": "",
                "chartCode": "02",
                "isAlarm": null,
                "alarmMap": null,
                "items": null,
                "indicatorMap": null,
                "itemCode": "nurseTriageDate",
                "workFlowId": 10428,
                "isPageEdit": null,
                "location": "https://www.baidu.com/"
              },
              "patientIdNumber": null,
              "patientSerialNumber": null,
              "arrivalWay": "自行来院"
            }
          }
    },
    methods: {
      transfer (location){
        window.location.href=location
      },
      choose (index){
        let vm=this
        vm.current=index
      },
      _height (){
        let vm=this
       let itemHeight=$(".middle_item").height()/84
        console.log(itemHeight);
       let length= $(".middle_item").length
       let middleHeight= itemHeight*length
        $(".caseHistory_middle").css('height',`${middleHeight}rem`)
      },
    },
    components: {
      headline
    },
    filters:{
      filterDate (value){
        return moment(value).format('hh:mm')
      }
    },
   mounted() {
      let vm = this;
      setTimeout(function () {
        vm._height()
      },100)
    }
  }
</script>
<style lang="less">
  .caseHistory {
    margin-left: 200px;
    height: 100%;
    .caseHistory {
      width: 100%;
      height: 100%;
      position: relative;
      left: -200px;
      .caseHistory_content {
        overflow: hidden;
        & > div {
          width: 33%;
          box-sizing: border-box;
          padding: 0 2%;
          height: 100%;
          /*&:nth-child(1){*/
          /*position: absolute;*/
          /*left: 0;*/
          /*}*/
          &:nth-child(2) {
            border-left: 1px solid #EEEEEE;
            border-right: 1px solid #EEEEEE;
            position: absolute;
            left: 33%
          }
          &:nth-child(3) {
            position: absolute;
            left: 66%
          }
          span {
            font-size: 0.28rem;
            color: #333;
          }
        }
        .caseHistory_left {
          padding-left: 4%;
          position: fixed;
          .name {
            width: 100%;
            margin-top: 1.5rem;
            text-align: center;
            b {
              margin-top: 0.1rem;
              width: 100%;
              display: inline-block;
              text-align: center;
              font-size: 0.36rem;
            }
          }
          ul {
            margin-top: 0.5rem;
            width: 100%;
            li {
              width: 100%;
              padding: .1rem 0;
              &:nth-child(5) {
                span {
                  vertical-align: top;
                }
              }
              span {
                display: inline-block;
                vertical-align: middle;
                &:nth-child(1) {
                  color: #717171;
                  width: 32%;
                  text-align: left;
                }
                &:nth-child(2) {
                  width: 55%;
                  text-align: left;
                  position: relative;
                  left: -5%;
                }
              }
            }
          }
        }
        .caseHistory_middle {
          padding: 0 0 0 3%;
          overflow: hidden;
          .middle_content {
            margin-top: .4rem;
            .middle_item {
              width: 100%;
              height: 1rem;
              position: relative;
              .middle_left {
                position: relative;
                width: 100%;
                height: .5rem;
                line-height: .5rem;
                .line {
                  position: absolute;
                  left: .9%;
                  transform: translateX(-50%);
                  div {
                    width: 1px;
                    height: 0.7rem;
                    background-color: #3c9bff;
                    &.gray {
                      background-color: #dddddd;
                    }
                    &.stagger {
                      background-color: #dddddd;
                    }
                    &.long {
                      height: .8rem;
                    }
                  }
                }
                img {
                  width: 0.5rem;
                  height: 0.5rem;
                  position: absolute;
                  left: -5%;
                  &.loading {
                    z-index: 99;
                  }
                }
                span {
                  font-size: 0.26rem;
                  color: #333;
                  vertical-align: middle;
                  &.text {
                    margin-left: .5rem;
                  }
                  &.now {
                    color: #3c9bff;
                    font-weight: bolder;
                    font-size: 0.28rem;
                    margin-left: .2rem;
                  }
                  &.time {
                    color: #3c9bff;
                    font-weight: bolder;
                    font-size: 0.32rem;
                    margin-left: .2rem;
                  }
                }
              }
              .middle_right {
                text-align: center;
                position: absolute;
                left: 78%;
                top: -1%;
                img {
                  width: 0.4rem;
                  height: 0.5rem;
                  vertical-align: middle;
                  margin: 0 auto;
                }
                p {
                  width: 100%;
                  text-align: center;
                  color: #3c9bff;
                  font-weight: 700;
                }
              }
            }
            .item_active {
              border-left: 1px solid #3c9bff;
            }
          }
        }
        .caseHistory_right {
          padding: 0;
          .right_top {
            padding: .4rem 4% 0;
            width: 100%;
            border-bottom: 1px solid #EEEEEE;
            box-sizing: border-box;
            ul {
              padding: 0 2%;
              display: flex;
              li {
                width: 33%;
                text-align: center;
                font-size: 0.28rem;
                padding-bottom: .2rem;
                &.active {
                  color: #3c9bff;
                  border-bottom: 2px solid #3c9bff;
                }
              }
            }
          }
          .right_content {
            padding: 0 0 0.3rem;
            ul {
              li {
                padding: .28rem 6%;
                border-bottom: 1px solid #EEEEEE;
                box-sizing: border-box;
                &:last-child {
                  border: none;
                }
                span {
                  display: inline-block;
                  color: #717171;
                  font-size: 0.26rem;
                  width: 50%;
                  &:nth-child(1) {
                    text-align: left;
                  }
                  &:nth-child(2) {
                    text-align: right;
                    color: #333333;
                    padding-right: 10%;
                    box-sizing: border-box;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
