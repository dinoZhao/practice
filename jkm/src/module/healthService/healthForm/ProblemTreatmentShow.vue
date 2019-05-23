<template>
    <div id="ProblemTreatmentShow">
      <div class="ProblemTreatment_content">
        <div class="title_top"><span>现存主要健康问题</span></div>
        <div class="title">
          <i class="lineleft"></i>
          <span>脑血管疾病</span>
        </div>
        <div class="radio_content">
          <div class="habits" v-for="item in sliceDiseases" :key="item.code" v-if="diseaseTreatment && diseaseTreatment['cerebralVascularDisease'].diseases">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
          <div class="habits habites">
            <span>其他</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['cerebralVascularDisease'].other}}</span>
          </div>
        </div>
        <div class="title">
          <i class="lineleft"></i>
          <span>肾脏疾病</span>
        </div>
        <div class="radio_content">

          <div class="habits" v-for="item in sliceKidney" :key="item.code" v-if="diseaseTreatment && diseaseTreatment['kidneyDisease'].diseases">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
          <div class="habits habites">
            <span>其他</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['kidneyDisease'].other}}</span>
          </div>
        </div>
        <div class="title">
          <i class="lineleft"></i>
          <span>心脏疾病</span>
        </div>
        <div class="radio_content content_small">
          <div class="habits" v-for="item in sliceHeart" :key="item.code" v-if="diseaseTreatment && diseaseTreatment['heartDisease'].diseases">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
          <div class="habits habites">
            <span>其他</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['heartDisease'].other}}</span>
          </div>
        </div>
        <div class="title">
          <i class="lineleft"></i>
          <span>血管疾病</span>
        </div>
        <div class="radio_content">
          <div class="habits" v-for="item in sliceVascular" :key="item.code" v-if="diseaseTreatment && diseaseTreatment['vascularDisease'].diseases">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
          <div class="habits habites">
            <span>其他</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['heartDisease'].other}}</span>
          </div>
        </div>
        <div class="title">
          <i class="lineleft"></i>
          <span>眼部疾病</span>
        </div>
        <div class="radio_content content_small">
          <div class="habits" v-for="item in sliceEye" :key="item.code" v-if="diseaseTreatment && diseaseTreatment['eyeDisease'].diseases">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
          <div class="habits habites">
            <span>其他</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['eyeDisease'].other}}</span>
          </div>
        </div>
        <div class="title">
          <i class="lineleft"></i>
          <span>神经系统疾病</span>
        </div>
        <div class="radio_content content_small">
          <div class="habits" v-for="item in sliceNeurological" :key="item.code" v-if="diseaseTreatment">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
        </div>
        <div class="title">
          <i class="lineleft"></i>
          <span>其他系统疾病</span>
        </div>
        <div class="radio_content content_small">
          <div class="habits" v-for="item in sliceOther":key="item.code" v-if="diseaseTreatment">
            <img src="../../../assets/already.png"
                 alt=""><span>{{item.type}}</span>
          </div>
        </div>
        <div class="title_top hospitalization"><span>住院治疗情况</span></div>
        <div class="hospital_content">
          <div class="title">
            <i class="lineleft"></i>
            <span>住院史</span>
          </div>
          <div class="data">
            <span>入/出院日期</span>
            <span v-if="diseaseTreatment&&diseaseTreatment['hospitalizations'][0]">{{diseaseTreatment['hospitalizations'][0].startTime}}</span>
            <span class="line">-</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['hospitalizations'][0].endTime}}</span>
          </div>
          <div class="reason">
            <span>原因</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['hospitalizations'][0].reason}}</span>
          </div>
          <div class="reason">
            <span class="name" style="width: 17%;text-align: right;position: relative;left: -4%;">医疗机构名称</span>
            <span v-if="diseaseTreatment" style="position: relative;left: -4%">{{diseaseTreatment['hospitalizations'][0].nameOfMedicalInstitution}}</span>
          </div>
          <div class="reason">
            <span class="name">病案号</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['hospitalizations'][0].medicalRecordNumber}}</span>
          </div>
          <div class="add"><span>+ 添加</span></div>
        </div>
        <div class="hospital_content">
          <div class="title">
            <i class="lineleft"></i>
            <span>家族病床史</span>
          </div>
          <div class="data">
            <span>建/撤床日期</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['sickbedHistories'][0].startTime}}</span>
            <span class="line">-</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['sickbedHistories'][0].endTime}}</span>
          </div>
          <div class="reason">
            <span>原因</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['sickbedHistories'][0].reason}}</span>
          </div>
          <div class="reason">
            <span class="name" style="width: 17%;text-align: right;position: relative;left: -4%;">医疗机构名称</span>
            <span v-if="diseaseTreatment" style="position: relative;left: -4%">{{diseaseTreatment['sickbedHistories'][0].nameOfMedicalInstitution}}</span>
          </div>
          <div class="reason">
            <span class="name">病案号</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['sickbedHistories'][0].medicalRecordNumber}}</span>
          </div>
          <div class="add"><span>+ 添加</span></div>
        </div>
        <div class="title_top hospitalization"><span>主要用药情况</span></div>
        <div class="input_content">
          <div class="content">
            <span>药物名称</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['medicationSituation'].medicationName}}</span>
          </div>
          <div class="content">
            <span>用法</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['medicationSituation'].usage}}</span>
            <span class="time">次/日</span>
          </div>
        </div>
        <div class="input_content">
          <div class="content">
            <span>用量</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['medicationSituation'].consumption}}</span>
          </div>
          <div class="content">
            <span>用药时间</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['medicationSituation'].medicationTime}}</span>
            <span class="time">天</span>
          </div>
        </div>
        <div class="button_content">
          <span>服药依从性</span>
          <button type="button" v-for="item of sliceMedication" class="active":key="item.code">{{item.type}}</button>
        </div>
        <div class="title_top nonimmune"><span>非免疫规划预防接种史</span></div>
        <div class="input_content">
          <div class="content">
            <span>名称</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['vaccinationHistory'].name}}</span>
          </div>
          <div class="content">
            <span>接种日期</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['vaccinationHistory'].time}}</span>
          </div>
        </div>
        <div class="input_content">
          <div class="content">
            <span>接种机构</span>
            <span v-if="diseaseTreatment">{{diseaseTreatment['vaccinationHistory'].institution}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { getURLParameter,dateFormat,empty  } from 'utils/util'
  import moment from 'moment'
    export default {
      props: ['diseaseTreatment'],
      data() {
        return {
          bCheck: '',
          sliceVascularArr:[],
          diseasesList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '缺血性卒中', check: false},
            {code: '3', type: '脑出血', check: false},
            {code: '4', type: '蛛网膜下腔出血', check: false},
            {code: '5', type: '充血性心力衰竭', check: false},
            {code: '6', type: '短暂性脑缺血发作', check: false},
          ],
          kidneyDiseaseList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '糖尿病肾病', check: false},
            {code: '3', type: '肾功能衰竭', check: false},
            {code: '4', type: '急性肾炎', check: false},
            {code: '5', type: '慢性肾炎', check: false},
          ],
          heartDiseaseList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '心肌梗死', check: false},
            {code: '3', type: '心绞痛 ', check: false},
            {code: '4', type: '冠状动脉血运重建', check: false},
            {code: '5', type: '充血性心力衰竭', check: false},
            {code: '6', type: '心前区疼痛', check: false},
          ],
          vascularDiseaseList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '夹层动脉瘤', check: false},
            {code: '3', type: '动脉闭塞性疾病', check: false}
          ],
          eyeDiseaseList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '视网膜出血或渗出', check: false},
            {code: '3', type: '视乳头水肿', check: false},
            {code: '4', type: '白内障', check: false}
          ],
          neurologicalDiseasesList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '有', check: false},
          ],
          otherSystemicDiseasesList: [
            {code: '1', type: '未发现', check: true},
            {code: '2', type: '有', check: false},
          ],
          medicationComplianceList: [
            {code: '1', type: '规律', check: false},
            {code: '2', type: '间断', check: false},
            {code: '3', type: '不服药', check: false},
          ]
        }
      },
      computed: {
        adStartTime (){ //入院日期
          if(this.diseaseTreatmentList){
            return parseInt(this.diseaseTreatmentList.hospitalizations[0].startTime)
          }
        },
        adEndTime (){ //出院日期
          if(this.diseaseTreatmentList){
            return parseInt(this.diseaseTreatmentList.hospitalizations[0].endTime)
          }
        },
        sickStartTime (){ //建床日期
          if(this.diseaseTreatmentList){
            return parseInt(this.diseaseTreatmentList.sickbedHistories[0].startTime)
          }
        },
        sickEndTime (){ //撤床日期
          if(this.diseaseTreatmentList){
            return parseInt(this.diseaseTreatmentList.sickbedHistories[0].endTime)
          }
        },
        vaccinTime (){ //接种日期
          if(this.diseaseTreatmentList){
            return parseInt(this.diseaseTreatmentList.vaccinationHistory.time)
          }
        },
        sliceDiseases() {
          let sliceDiseasesArr = []
          if (!empty(this.diseaseTreatment['cerebralVascularDisease'].diseases)) {
            this.diseaseTreatment['cerebralVascularDisease'].diseases.forEach(item => {
              this.diseasesList.forEach(items => {
                if (item === items.code) {
                  sliceDiseasesArr.push(items)
                }
              })
            })
          } else {
            sliceDiseasesArr=this.diseasesList.slice(0,1)
          }
          return sliceDiseasesArr
        },
        sliceKidney(){
          let sliceKidneyArr = []
          if (!empty(this.diseaseTreatment['kidneyDisease'].diseases)) {
            this.diseaseTreatment['kidneyDisease'].diseases.forEach(item => {
              this.kidneyDiseaseList.forEach(items => {
                if (item === items.code) {
                  sliceKidneyArr.push(items)
                }
              })
            })
          } else {
            sliceKidneyArr=this.kidneyDiseaseList.slice(0,1)
          }
          return sliceKidneyArr
        },
        sliceHeart (){
          let sliceHeartArr = []
          if (!empty(this.diseaseTreatment['heartDisease'].diseases)) {
            this.diseaseTreatment['heartDisease'].diseases.forEach(item => {
              this.heartDiseaseList.forEach(items => {
                if (item === items.code) {
                  sliceHeartArr.push(items)
                }
              })
            })
          } else {
            sliceHeartArr=this.heartDiseaseList.slice(0,1)
          }
          return sliceHeartArr
        },
        sliceVascular (){
          let sliceVascularArr = []
          if (!empty(this.diseaseTreatment['vascularDisease'].diseases)) {
            this.diseaseTreatment['vascularDisease'].diseases.forEach(item => {
              this.vascularDiseaseList.forEach(items => {
                if (item === items.code) {
                  sliceVascularArr.push(items)
                }
              })
            })
          } else {
            sliceVascularArr=this.vascularDiseaseList.slice(0,1)
          }
          return sliceVascularArr
        },
        sliceEye (){
          let slicesliceEyeArr = []
          if (!empty(this.diseaseTreatment['eyeDisease'].diseases)) {
            this.diseaseTreatment['eyeDisease'].diseases.forEach(item => {
              this.eyeDiseaseList.forEach(items => {
                if (item === items.code) {
                  slicesliceEyeArr.push(items)
                }
              })
            })
          } else {
            slicesliceEyeArr=this.eyeDiseaseList.slice(0,1)
          }
          return slicesliceEyeArr
        },
        sliceNeurological (){
          let sliceNeurologicalArr = []
          if (!empty(this.diseaseTreatment['neurologicalDiseases'])) {
            this.diseaseTreatment['neurologicalDiseases'].forEach(item => {
              this.neurologicalDiseasesList.forEach(items => {
                if (item === items.code) {
                  sliceNeurologicalArr.push(items)
                }
              })
            })
          } else {
            sliceNeurologicalArr=this.neurologicalDiseasesList.slice(0,1)
          }
          return sliceNeurologicalArr
        },
        sliceOther (){
          let sliceOtherArr = []
          if (!empty(this.diseaseTreatment['otherSystemicDiseases'])) {
            this.diseaseTreatment['otherSystemicDiseases'].forEach(item => {
              this.neurologicalDiseasesList.forEach(items => {
                if (item === items.code) {
                  sliceOtherArr.push(items)
                }
              })
            })
          } else {
            sliceOtherArr=this.neurologicalDiseasesList.slice(0,1)
          }
          return sliceOtherArr
        },
        sliceMedication (){
          let sliceOtherArr = []
          if(!empty(this.diseaseTreatment['medicationSituation'].medicationCompliance)){
          	this.diseaseTreatment['medicationSituation'].medicationCompliance.forEach(item => {
	            this.medicationComplianceList.forEach(items => {
	              if (item === items.code) {
	                sliceOtherArr.push(items)
	              }
	            })
	          })
          }
          return sliceOtherArr
        }
      },
      mounted (){
      },
      filters:{
        filterDate (value){
          return moment(value).format('YYYY-MM-DD')
        }
      }
    }
</script>

<style lang="less">
  #ProblemTreatmentShow {
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    .ProblemTreatment_content {
      width: 96%;
      padding: 0.3rem 2% 0.3rem;
      span {
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
      }
      .title_top {
        width: 14.4vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        span {
          color: #3C9BFf;
        }
      }
      .hospitalization {
        width: 12vw;
        line-height: 2.6vw;
        background: rgba(60, 155, 255, 0.1);
        text-align: center;
        border-radius: 30px;
        margin-top: .3rem;
        span {
          color: #3C9BFf;
        }
      }
      .title {
        margin-top: 0.28rem;
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
      .radio_content {
        overflow: hidden;
        position: relative;
        .habits {
          float: left;
          margin-right: 30px;
          margin-top: 0.3rem;
          span {
            vertical-align: middle;
          }
          img {
            width: 0.5rem;
            height: 0.5rem;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        .habites {
          width: 42%;
          position: relative;
          top:3px;
          span {
          }
        }
      }
      .content_small {
        width: 80%;
        overflow: hidden;
      }
      .data{
        margin-left: .1rem;
        span:nth-child(1){
          width: 9.5vw;
          display: inline-block;
          text-align: center;
        }
        span.line{
          width: .5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          display: inline-block;
          font-size: .4rem;
        }
      }
      .reason{
        margin-top: 0.28rem;
        span{
          vertical-align: middle;
          display: inline-block;
          width: 13%;
          text-align: right;
          &:nth-child(2){
            text-align: left;
          }
        }
        textarea.big{
          width: 80%;
          height: 1.1rem;
          border: 1px solid #eee;
          text-indent: 2%;
          font-size: 0.28rem;
          border-radius: 0.1rem;
          color: #333;
          margin-left: 1.6%;
        }
      }
      .add{
        margin-top: 0.28rem;
        margin-left: 14%;
        span{
          color: #3C9BFF;
        }
      }
      .hospital_content{
        width: 100%;
        padding-bottom: 0.28rem;
        border-bottom: 1px solid #EEEEEE;
      }
      .input_content{
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.28rem;
        .content{
          width: 50%;
          position: relative;
          span{
            display: inline-block;
            width: 9vw;
            text-align: right;
            &:nth-child(2){
              text-align: left;
            }
            &.time{
              position: absolute;
              top: 20%;
              left: 60%;
            }
          }
        }
      }
      .button_content{
        margin-top: 0.28rem;
        width: 100%;
        span{
          width: 9vw;
          text-align: right;
          vertical-align: middle;
          display: inline-block;
        }
        button{
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
          &.active{
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
        }
      }
      .nonimmune{
        width: 18vw;
        margin-top: 0.28rem;
      }
    }
  }
</style>
