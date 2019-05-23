<template>
    <div class="pharmacy">
      <div class="pharmacy_content">
        <div class="habites marginTop">
          <span>化疗方案</span>
          <input type="text" placeholder="请输入" v-model="drugList.chemotherapy" class="marginLeft">
        </div>
        <div class="button_content marginTop">
          <span>用法</span>
          <input type="button" v-for="item of usageType"  :class="{active:item.code===drugList.usage}" @click="checkedes(item.code,'用法')"  :value="item.type" class="marginLeft">
        </div>
        <div class="radio_content marginTop">
          <span class="title">药品剂型</span>
          <div class="check_content marginLeft">
            <div class="habits marginRight" v-for="(item,index) in Pharmaceutical"  :key = "item.index" @click="changeType(item.code)">
              <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
            </div>
          </div>
        </div>
        <div class="button_content marginTop">
          <span>督导人员选择</span>
          <input type="button" v-for="item of choose"  :class="{active:item.code===drugList.personType}" @click="checkedes(item.code,'督导人员选择')"  :value="item.type" class="marginLeft">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props:['drugs'],
      data (){
        return {
          drugList:{
            chemotherapy:'',
            usage:'',
            PharmaceuticalList:[

            ],
            personType:'',
          },
          usageType:[
            {code: '1', type: '每日'},
            {code: '2', type: '间歇'},
          ],
          Pharmaceutical:[
            {code: '1', type: '固定剂量复合制剂', check: false},
            {code: '2', type: '散装药', check: false},
            {code: '3', type: '板式组合药', check: false},
            {code: '4', type: '组合剂', check: false}
          ],
          choose:[
            {code: '1', type: '医生'},
            {code: '2', type: '家属'},
            {code: '3', type: '自服药'},
            {code: '4', type: '其他'}
          ]
        }
      },
      methods:{
        saveDate (){
          return sessionStorage.setItem('drugDate',JSON.stringify(this.drugList))
        },
        checkedes(code,name) {
          let vm=this
          switch (name) {
            case '用法':
              vm.drugList.usage=code
              break;
            case '督导人员选择':
              vm.drugList.personType=code
              break;
          }
        },
        changeType(code) {
          let Pharmaceutical=this.Pharmaceutical
          let arr=this.drugList.PharmaceuticalList
          Pharmaceutical.forEach(item=>{
              if(item.code==code) {
                item.check = !item.check
                if (item.check) {
                  arr.push(code)
                } else {
                  arr.forEach(function (str, index) {
                    if (str == code) {
                      arr.splice(index, 1);
                    }
                  })
                }
              }
          })
          Pharmaceutical=arr;
        },
        upDate (){
          let vm=this
          let symptomsSigns=vm.drugs
          let symptomsSignsList=vm.drugList
          let SymptomsList=symptomsSigns.PharmaceuticalList
          let symptom=vm.Pharmaceutical
            Object.keys(symptomsSigns).forEach(key=>{
              Object.keys(symptomsSignsList).forEach(keyStr=>{
                if(key==keyStr){
                    symptomsSignsList[keyStr]=symptomsSigns[key]
                }
              })
            })
          symptom.forEach(item=>{
            if(SymptomsList.includes(item.code)){
              item.check=true
            }else{
              item.check=false
            }
          })
        }
      },
      created (){
        this.upDate()
      }
    }
</script>

<style scoped lang="less">
.pharmacy{
  font-size: 0.28rem;
  height: 7.55rem;
  .pharmacy_content{
    width: 96%;
    padding: 0.1rem 2% 0.3rem;
    overflow: hidden;
    span{
      font-size: 0.28rem;
      color: #333333;
      font-family: PingFangSC-Regular;
    }
    .marginRight{
      margin-right: 35px;
    }
    .marginLeft{
      margin-left: 15px;
    }
    input{
      width: 22vw;
      height: 0.6rem;
      font-size: 0.28rem;
      padding-left: 15px;
      border: 1px solid #eee;
      border-radius: 10px;
      outline: none;
      color: #666;
      box-sizing: border-box;
      vertical-align: middle;
    }
    .habites {
      width: 100%;
      overflow: hidden;
      span{
        width: 11vw;
        display: inline-block;
        text-align: right;
      }
      input{
      }
    }
    .marginTop{
      margin: 0.28rem 0;
    }
    .button_content{
      width: 100%;
      span{
        width: 11vw;
        text-align: right;
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
        vertical-align: middle;
        outline: none;
        padding: 0;
        &.active{
          background-color: #3C9BFF;
          color: #FFFFFF;
        }
      }
    }
    .radio_content{
      width: 100%;
      overflow: hidden;
      .check_content{
        float: left;
        overflow: hidden;
      }
      span.title{
        float: left;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 11vw;
        text-align: right;
      }
      span.hazards{
        height: 1.5rem;
      }
      .habits{
        float: left;
        img{
          width: 0.5rem;
          height: 0.5rem;
          vertical-align: middle;
          margin-right: 10px;
        }
        span{
          vertical-align: middle;
          display: inline-block;
        }
      }
      .habites {
        width: 100%;
        span{
          display: inline-block;
          text-align: right;
        }
        input{
        }
      }
    }
  }
}
</style>
