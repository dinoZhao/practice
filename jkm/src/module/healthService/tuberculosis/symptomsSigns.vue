<template>
    <div class="symptomsSigns">
      <div class="symptomsSigns_content">
        <div class="button_content">
          <span>患者类型</span>
          <input type="button" v-for="item of PatientsTypes"  :class="{active:item.code===symptomsSignsList.Types}" @click="checkedes(item.code,'患者类型')"  :value="item.type">
        </div>
        <div class="button_content">
          <span>痰菌情况</span>
          <input type="button" v-for="item of SputumBacteria"  :class="{active:item.code===symptomsSignsList.Sputum}" @click="checkedes(item.code,'痰菌情况')"  :value="item.type">
        </div>
        <div class="button_content">
          <span>耐药情况</span>
          <input type="button" v-for="item of DrugResistance"  :class="{active:item.code===symptomsSignsList.Drug}" @click="checkedes(item.code,'耐药情况')"  :value="item.type">
        </div>
        <div class="title_top marginTop">
          <span>症状</span>
        </div>
        <div class="radio_content marginTop">
          <div class="check_content">
            <div class="habits" v-for="(item,index) in symptom" data-index = "index" :key = "item.index" @click="changeType(item.code)">
              <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
            </div>
            <div class="habits habites">
              <span>其他</span>
              <input type="text" placeholder="请输入" v-model="symptomsSigns.other">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {empty} from "../../../util/util";

    export default {
      props:['symptomsSigns'],
      data (){
          return {
            PatientsCode:'',
            SputumCode:'',
            DrugCode:'',
            PatientsTypes:[
              {code: '1', type: '初治'},
              {code: '2', type: '复治'},
            ],
            SputumBacteria:[
              {code: '1', type: '阳性'},
              {code: '2', type: '阴性'},
              {code: '3', type: '未查痰'},
            ],
            DrugResistance:[
              {code: '1', type: '耐药'},
              {code: '2', type: '非耐药'},
              {code: '3', type: '未检测'},
            ],
            symptom:[
              {code: '1', type: '没有症状', check: true},
              {code: '2', type: '咳嗽咳痰', check: false},
              {code: '3', type: '低热盗汗', check: false},
              {code: '4', type: '咯血或血痰', check: false},
              {code: '5', type: '胸痛消瘦', check: false},
              {code: '6', type: '恶心纳差', check: false},
              {code: '7', type: '头痛失眠', check: false},
              {code: '8', type: '视物模糊', check: false},
              {code: '9', type: '皮肤瘙痒、皮疹', check: false},
              {code: '10', type: '耳鸣、听力下降', check: false},
            ],
            symptomsSignsList:
              {
                "Types": "",
                "Sputum": "",
                "Drug": "",
                "SymptomsList": [
                ],
                'other':""
              }
          }
      },
      methods:{
        checkedes(code,name) {
          let vm=this
          switch (name) {
            case '患者类型':
            vm.symptomsSignsList.Types=code
            break;
            case '痰菌情况':
            vm.symptomsSignsList.Sputum=code
            break;
            case '耐药情况':
            vm.symptomsSignsList.Drug=code
            break;
          }
        },
        changeType(code) {
          let symptom=this.symptom
          let arr=this.symptomsSignsList.SymptomsList
          symptom.forEach(item=>{
            if(code!=1){
              symptom[0].check=false
              if(item.code==code){
                item.check=!item.check
                if(item.check){
                  arr.push(code)
                }else{
                  arr.forEach(function(str,index){
                    if(str==code){
                      arr.splice(index,1);
                    }
                  })
                }
              }
              arr.forEach(function(str,index,ar){
                if(str=='1'){
                  arr.splice(index,1);
                }

              })
            }else{
              arr=arr.splice(0,arr.length,'1')
              symptom[0].check=true
              symptom.map(item=>{
                if(item.code!=1){
                  item.check=false
                }
              })
            }
          })
          symptom=arr;
        },
        upDate (){
          let vm=this
          let symptomsSigns=vm.symptomsSigns
          let symptomsSignsList=vm.symptomsSignsList
          let SymptomsList=symptomsSigns.SymptomsList
          let symptom=vm.symptom
          if(!empty(symptomsSigns)){
            Object.keys(symptomsSigns).forEach(key=>{
              Object.keys(symptomsSignsList).forEach(keyStr=>{
                if(key==keyStr){
                  if(!empty(symptomsSigns[key])){
                    symptomsSignsList[keyStr]=symptomsSigns[key]
                  }
                }
              })
            })
          }
          symptom.forEach(item=>{
            if(SymptomsList.includes(item.code)){
              item.check=true
            }else{
              item.check=false
            }
          })
        },
        saveDate (){
          return sessionStorage.setItem('symptomsSignsDate', JSON.stringify(this.symptomsSigns));
        }
      },
      created (){
        this.upDate()
      }
    }
</script>

<style scoped lang="less">
.symptomsSigns{
  font-size: 0.28rem;
  height: 7.55rem;
  .symptomsSigns_content{
    width: 96%;
    padding: 0.1rem 2% 0.3rem;
    overflow: hidden;
    span{
        font-size: 0.28rem;
        color: #333333;
        font-family: PingFangSC-Regular;
      }
    input{
      width: 22vw;
      height: 0.6rem;
      font-size: 0.28rem;
      padding-left: 15px;
      border: 1px solid #eee;
      border-radius: 10px;
      margin-left: 1.6%;
      outline: none;
      color: #666;
      box-sizing: border-box;
      vertical-align: middle;
    }
    .button_content{
      margin-top: 0.28rem;
      width: 100%;
      span{
        width: 8vw;
        text-align: left;
        vertical-align: middle;
        display: inline-block;
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
      span{
        color: #3C9BFf;
      }
    }
    .marginTop{
      margin: 0.28rem 0;
      overflow: hidden;
    }
    .radio_content{
      .check_content{
        overflow: hidden;
      }
      span.title{
        float: left;
        margin-right: 1.6%;
        width: 11vw;
        text-align: right;
        height: 0.5rem;
        line-height: 0.5rem;
      }
      span.hazards{
        height: 1.5rem;
      }
      .habits{
        float: left;
        margin-bottom: 15px;
        img{
          width: 0.5rem;
          height: 0.5rem;
          vertical-align: middle;
          margin-right: 10px;
        }
        span{
          vertical-align: middle;
          display: inline-block;
          text-align: left;
          width:2.5rem;
        }
      }
      .habites {
        width: 100%;
        span{
          width: 0.6rem;
        }
        input{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
