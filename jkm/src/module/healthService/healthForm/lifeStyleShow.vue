<template>
  <div id="lifeStyle">
    <div class="lifeStyle_content">
      <div class="title">
        <i class="lineleft"></i>
        <span>体育锻炼频率</span>
      </div>
      <div class="input_button">
        <input type="button" :value="time[lifelist.exerciseFrequency-1]" class="active" v-if="lifelist.exerciseFrequency">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span>每天锻炼时间</span>
            <span class="small">{{lifelist.exerciseDuration}}</span>
            <span class="times">分钟</span>
          </div>
          <div class="exercise_time">
            <span>坚持锻炼时间</span>
            <span class="small">{{lifelist.exerciseYear}}</span>
            <span class="times">年</span>
          </div>
        </div>
        <div class="exercise_type">
          <span style="width:12%;">锻炼方式</span>
          <span class="small exerciseWay">{{lifelist.exerciseWay}}</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>饮食习惯</span>
      </div>
      <div class="radio_content margin">
        <div class="habits" v-for="(item,index) in slicedietaryHabit" :key="index" v-if="slicedietaryHabit">
          <img src="../../../assets/already.png" alt=""><span>{{item}}</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>吸烟情况</span>
      </div>
      <div class="input_button">
        <input type="button" :value="smoke[lifelist.smokingStatus-1]" class="active" v-if="lifelist.smokingStatus">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span>平均日吸烟量</span>
            <span class="small">{{lifelist.dailyCigarette}}</span>
            <span class="times">支</span>
          </div>
          <div class="exercise_time">
            <span>开始吸烟年龄</span>
            <span class="small">{{lifelist.smokingAge}}</span>
            <span class="times">岁</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span style="display: inline-block;text-align: right"><b style="opacity: 0;">平均</b>戒烟年龄</span>
            <span class="small">{{lifelist.quitSmokingAge}}</span>
            <span class="times">年</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>饮酒情况</span>
      </div>
      <div class="input_button">
        <input type="button" :value="drink[lifelist.drinkingStatus-1]" class="active" v-if="lifelist.drinkingStatus">
      </div>
      <div class="text_content" style="">
        <div class="exercise">
          <div class="exercise_time" style="width:65%;">
            <span style="width: 16vw;display: inline-block;text-align: right;">平均饮酒量</span>
            <span class="small">{{lifelist.dailyDrink}}</span>
            <span class="times">两</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="width: 16vw;">是否戒酒</span>
          <input type="button" :value="option3[lifelist.quitDrinking-1]" class="active" v-if="lifelist.quitDrinking">
        </div>
        <div class="choose_right">
          <span style="min-width:11vw;">戒酒年龄</span>
          <span class="small">{{lifelist.quitDrinkingAge}}</span>
          <span class="times">岁</span>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="width: 16vw;">近一年内是否曾醉酒</span>
          <input type="button" :value="option[lifelist.drunk-1]" class="active" v-if="lifelist.drunk">
        </div>
        <div class="choose_right">
          <span style="min-width:11vw;">开始饮酒年龄</span>
          <span class="small">{{lifelist.drinkingAge}}</span>
          <span class="times">岁</span>
        </div>
      </div>
      <div class="radio_content margin">
        <div class="beerkind"><span style="float: left;margin-top: 3px;margin-right: 15px;width: 15vw;text-align: right;">饮酒种类</span></div>
        <div class="check_content">
          <div class="habits" v-for="(item,index) in slicedrinkingType" :key="index" v-if="slicedrinkingType">
            <img src="../../../assets/already.png" alt=""><span>{{item}}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>职业暴露情况</span>
      </div>
      <div class="input_button">
        <input type="button" :value="disease[lifelist.occupationalDisease-1]" class="active" v-if="lifelist.occupationalDisease">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span style="width: 14vw;display: inline-block;text-align: right">工种</span>
            <span class="small">{{lifelist.workType}}</span>
          </div>
          <div class="exercise_time">
            <span style="width: 14vw;display: inline-block;text-align: right">从业时间</span>
            <span class="small">{{lifelist.workingTime}}</span>
            <span class="times">年</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width:14vw">粉尘防护措施</span>
          <input type="button" :value="optionBollean[lifelist.dustProtection-1]" class="active" v-if="lifelist.dustProtection"/>
        </div>
        <div class="choose_left" style="width: 49%">
          <span style="display: inline-block;text-align:right;width:14vw">放射物质防护措施</span>
          <input type="button" :value="optionBollean[lifelist.radiationProtection-1]" class="active" v-if="lifelist.radiationProtection"/>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 14vw">物理因素防护措施</span>
          <input type="button" :value="optionBollean[lifelist.physicalProtection-1]" class="active" v-if="lifelist.physicalProtection"/>
        </div>
        <div class="choose_left" style="width: 49%">
          <span style="display: inline-block;text-align:right;width: 14vw">化学物质防护措施</span>
          <input type="button" :value="optionBollean[lifelist.chemicalProtection-1]" class="active" v-if="lifelist.chemicalProtection"/>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 14vw">其他防护措施</span>
          <input type="button" :value="optionBollean[lifelist.otherProtection-1]" class="active" v-if="lifelist.otherProtection"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getHealthyCheck} from '../../../../src/api/requst'
  export default {
    props:['lifelist'],
    data (){
      return {
        current:0,
        smokeCurrent:0,
        drinkCurrent:0,
        diseaseCurrent:0,
        optionCurrent:'2',
        BolleanCurrent:'1',
        optionCurrents:'2',
        dustCurrent:'2',
        physicalCurrent:'2',
        radiateCurrent:'2',
        otherCurrent:'2',
        chemistryCurrent:'2',
        sportTime:'1', //每次锻炼时间
        lifestyledata:{
          "exerciseFrequency": "",
          "exerciseDuration": "",
          "exerciseYear": "",
          "exerciseWay": "",
          "dietaryHabit": "",
          "smokingStatus": "",
          "dailyCigarette": "",
          "smokingAge": "",
          "quitSmokingAge": "",
          "drinkingStatus": "",
          "dailyDrink": "",
          "quitDrinking": "",
          "drinkingAge": "",
          "quitDrinkingAge": "",
          "drunk": "",
          "drinkingType": "1",
          "occupationalDisease": "",
          "workType": "",
          "workingTime": "",
          "chemicalProtection": "",
          "dustProtection": "",
          "radiationProtection": "",
          "otherProtection": "",
          "physicalProtection": ""
        }, //生活方式
        keepTime:'', //坚持锻炼时间
        exerciseWay:'', //锻炼方式
        dailyCigarette:'', //日吸烟量
        smokingAge:'', //开始吸烟年龄
        quitSmokingAge:'', //戒烟年龄
        dailyDrink:'', // 日饮酒量
        drinkingAge:'',  //开始饮酒年龄
        quitDrinkingAge:'', //戒酒年龄
        workType:'', //工种
        workingTime:'', //从业时间
        habitList:['1'],
        drinkTypelist:['1'],
        eatHabits:['荤素均衡', '荤食为主','素食为主','嗜盐','嗜油','嗜糖'],
        drinkType:['白酒','啤酒','红酒','黄酒','其他'],
        time:[
          '每天','每周一次以上','偶尔','不锻炼'
        ],
        smoke:['从不吸烟','已戒烟','吸烟'],
        drink:[
          '从不饮酒','偶尔','经常','每天'
        ],
        disease:[
          '无职业病','有职业病'
        ],
        option:['是','否'],
        option3:['否','是'],
        option2:[
          {
            check:false,
            code:'1',
            type:'是'
          },
          {
            check:false,
            type:'否',
            code:'2'
          }
        ],
        optionBollean:['无','有']
      }
    },
    created(){
      var vm = this;
      console.log(vm.lifelist);
      vm.updatelife();
    },
    methods:{
      updatelife:function(){
        var vm = this;
        var lifelist = vm.lifelist;
        var lifestyledata = vm.lifestyledata;
        vm.current = vm.lifelist.exerciseFrequency?parseInt(vm.lifelist.exerciseFrequency)-1:0;
        vm.smokeCurrent = vm.lifelist.smokingStatus?parseInt(vm.lifelist.smokingStatus)-1:0;
        vm.drinkCurrent = vm.lifelist.drinkingStatus?parseInt(vm.lifelist.drinkingStatus)-1:0;
        vm.optionCurrents = vm.lifelist.quitDrinking?vm.lifelist.quitDrinking:'2';
        vm.optionCurrent = vm.lifelist.drunk?vm.lifelist.drunk:"2";
        vm.dustCurrent = vm.lifelist.dustProtection?vm.lifelist.dustProtection:'2';
        vm.radiateCurrent = vm.lifelist.radiationProtection?vm.lifelist.radiationProtection:'2';
        vm.physicalCurrent = vm.lifelist.physicalProtection?vm.lifelist.physicalProtection:'2';
        vm.chemistryCurrent = vm.lifelist.chemicalProtection?vm.lifelist.chemicalProtection:'2';
        vm.otherCurrent = vm.lifelist.otherProtection?vm.lifelist.otherProtection:'2';
        Object.keys(lifelist).forEach(function(keystr){
          Object.keys(lifestyledata).forEach(function(key){
            if(keystr==key){
              lifestyledata[key]=lifelist[keystr];
            }
          });
        });
        console.log(vm.lifestyledata);
      },
      changecheck:function(code){
        var vm = this;
        var choselist = vm.eatHabits;
        var arr = vm.habitList;
        choselist.forEach(function(item){
          if(item.code==code){
            item.check = !item.check;
            if(item.check){
              arr.push(code)
            }else{
              arr.forEach(function(str,index,ar){
                if(str==code){
                  arr.splice(index,1);
                }
              })
            }
          }
        })
        console.log(arr)
        vm.lifestyledata.dietaryHabit = arr.join(',');
      },
      changedrink:function(inde){
        var vm = this;
        vm.drinkCurrent = inde;
        vm.lifelist.drinkingStatus = inde+1;
        console.log(vm.lifelist.drinkingStatus)
      },
      changedrinkType:function(code){
        var vm = this;
        var choselist = vm.drinkType;
        var arr = vm.drinkTypelist;
        choselist.forEach(function(item){
          if(item.code==code){
            item.check = !item.check;
            if(item.check){
              arr.push(code)
            }else{
              arr.forEach(function(str,index,ar){
                if(str==code){
                  arr.splice(index,1);
                }
              })
            }
          }
        })
        console.log(arr)
        vm.lifestyledata.drinkingType = arr.join(',');
      },
      changeinput:function(){
        var vm = this;
        console.log(vm.lifestyledata);
        sessionStorage.setItem('lifestyledata',JSON.stringify(vm.lifestyledata));
      },
      changeoption:function(inde,typ){
        var vm = this;
        switch(typ){
          case'戒酒':
            vm.optionCurrents = inde;
            console.log(vm.optionCurrents)
            vm.lifestyledata.quitDrinking = inde;
            break;
          case'醉酒':
            vm.optionCurrent = inde;
            vm.lifestyledata.drunk = inde;
            break;
          case'职业病':
            vm.diseaseCurrent = inde;
            vm.lifestyledata.occupationalDisease = inde+1+"";
            break;
          case'粉尘':
            vm.dustCurrent = inde;
            vm.lifestyledata.dustProtection = inde;
            break;
          case'放射':
            vm.radiateCurrent = inde;
            vm.lifestyledata.radiationProtection = inde;
            break;
          case'物理':
            vm.physicalCurrent = inde;
            vm.lifestyledata.physicalProtection = inde;
            break;
          case'化学':
            vm.chemistryCurrent = inde;
            vm.lifestyledata.chemicalProtection = inde;
            break;
          case'其他':
            vm.otherCurrent = inde;
            vm.lifestyledata.otherProtection = inde;
            break;
          case'锻炼频率':
            vm.current = inde;
            vm.lifestyledata.exerciseFrequency = inde+1+"";
            break;
          case'吸烟':
            vm.smokeCurrent = inde;
            vm.lifestyledata.smokingStatus = inde+1+"";
            break;
          case'饮酒':
            vm.drinkCurrent = inde;
            vm.lifestyledata.drinkingStatus = inde+1+"";
            break;
        }
        sessionStorage.setItem('lifestyledata',JSON.stringify(vm.lifestyledata));
      }
    },
    computed :{
      slicedrinkingType (){
        const {drinkType}=this
        let arr=[]
        let drinkingTypeArr
        let drinkingNum
        if(this.lifelist['drinkingType']){
          drinkingNum=this.lifelist['drinkingType'].indexOf(",")? drinkingTypeArr=this.lifelist['drinkingType'].split(","):drinkingTypeArr=this.lifelist['drinkingType'].split("")
        }else{
          drinkingNum=[]
        }
        drinkingNum.forEach(function (item,index) {
          arr.push(drinkType[item-1])
        })
        return arr
      },
      slicedietaryHabit (){
        const {eatHabits}=this
        let dietaryHabitArr
        let arr=[]
        let dietaryHabitNum
        if(this.lifelist['dietaryHabit']){
          dietaryHabitNum=this.lifelist['dietaryHabit'].indexOf(",")?dietaryHabitArr = this.lifelist['dietaryHabit'].split(","):dietaryHabitArr=this.lifelist['drinkingType'].split("")
        }else {
          dietaryHabitNum=[]
        }
        dietaryHabitNum.forEach(function (item,index) {
          arr.push(eatHabits[item-1])
        })
        return arr
      }
    },
    beforeMount (){
    },
    mounted (){
      console.log(this.lifelist);
    }
  }
</script>

<style lang="less" scoped>
  #lifeStyle {
    font-size: 0.28rem;
    height: 100%;
    border: 1px solid #eee;
    input:checked{
      -webkit-appearance: none;
    }
    .lifeStyle_content {
      margin-bottom: 0.28rem;
      .margin {
        margin-top: 0.3rem;
        overflow: auto;
      }
      width: 96%;
      padding: 0 2%;
      border: none;
      overflow: hidden;
      input.small {
        width: 58%;
        height: 0.6rem;
        border: 1px solid #eee;
        text-indent: 4%;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        color: #333;
        line-height: 0.6rem;
        position: relative;
      }
      span {
        color: #333333;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
      }
      .title {
        margin-top: 0.28rem;
        span {
          margin-left: 0.05rem;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          width: 0.04rem;
          height: 0.3rem;
          background: #3C9BFF;
        }
        span {
          vertical-align: middle;
        }
      }
      .input_button {
        margin-top: 0.3rem;
        width: 100%;
        input {
          width: 15%;
          height: 0.5rem;
          display: inline-block;
          line-height: 0.5rem;
          border: 1px solid #3C9BFF;
          font-size: 0.26rem;
          border-radius: 0.1rem;
          color: #3C9BFF;
          background-color: #FFFFFF;
          margin-right: 1.6%;
          &.active {
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
          &:active{
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
        }
      }
      .text_content {
        margin-top: 0.28rem;
        .exercise {
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          .exercise_time {
            width: 48%;
            position: relative;
            span {
              vertical-align: middle;
              &.times {
                color: #666666;
              }
              &:nth-child(1) {
                margin-right: 1.6%;
              }
            }
          }
        }
        .exercise_type {
          margin-top: 0.28rem;
          span {
            vertical-align: top;
            width: 11%;
            text-align: right;
            display: inline-block;
            height: 1.1rem;
            &.exerciseWay{
              margin-left: .18rem;
            }
          }
          input.big {
            width: 80%;
            height: 1.1rem;
            border: 1px solid #eee;
            text-indent: 1%;
            font-size: 0.32rem;
            border-radius: 0.1rem;
            color: #999999;
            margin-left: 0.8%;
          }
        }
      }
      .radio_content {
        .habits{
          float: left;
          margin-left: 15px;
          img{
            width: .5rem;
            height: .5rem;
            vertical-align: middle;
            margin-right: 10px;
          }
          span{
            vertical-align: middle;
          }
        }
        &:last-child{
          .beerkind{
            width: 16%;
            float: left;
            text-align: right;
            span{
              vertical-align: middle;
            }
          }
          .check_content{
            float: right;
            margin-left: 2%;
            width: 80%;
            input{
              vertical-align: middle;
            }
          }
        }
        .check {
          float: left;
          margin-right: 4%;
          input {
            width: 0.5rem;
            height: 0.5rem;
            border: 1px solid #999999;
            background: #FFFFFF;
            border-radius: 0.3rem;
            vertical-align: middle;
            &.on {
              background: url(../../../assets/already.png);
              background-size: cover;
              border: none;
            }
          }
          span {
            vertical-align: middle;
            margin-left: .1rem;
          }
        }
      }
      .choose {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.28rem;
        .choose_left{
          input.active{
            background-color: #3C9BFF;
            color: #FFFFFF;
          }
          .smallBtn{
            &.active{
              background-color: #3C9BFF;
              color: #FFFFFF;
            }
          }
        }
        &:last-child{
          .choose_left{
            span{
              width: 35%;
            }
            input{
              &.active{
                background-color: #3C9BFF;
                color: #FFFFFF;
              }
            }
          }
          .choose_right{
            span{
              vertical-align: middle;
            }
            span:first-child{
              width: 23%;
            }
            input{
              position: relative;
              left: -1%;
            }
          }
        }
        .choose_left {
          width: 48%;
          span {
            display: inline-block;
            width: 35%;
            text-align: right;
          }
          input {
            width: 20%;
            height: 0.5rem;
            display: inline-block;
            line-height: 0.5rem;
            border: 1px solid #3C9BFF;
            font-size: 0.26rem;
            border-radius: 0.1rem;
            color: #3C9BFF;
            background-color: #FFFFFF;
            margin-left: 1.6%;
          }
        }
        .choose_right {
          width: 48%;

          position: relative;
          span {
            &:nth-child(1) {
              display: inline-block;
              max-width: 23%;
              min-width: 22%;
              text-align: right;
              vertical-align: middle;
              margin-right: 1.6%;
            }
            &.then{
              position: absolute;
              right: 17%;
              top: 50%;
              transform: translateY(-50%);
              color: #666666;
            }
          }
        }
      }
    }

  }
  .lifeStyle_content>.radio_content:last-child .beerkind{
    float: left;
  }
  textarea.big{
    width: 80%;
    height: 1.1rem;
    border: 1px solid #eee;
    text-indent: 1%;
    font-size: .28rem;
    border-radius: .1rem;
    color: #333;
    margin-left: 1.6%;
  }
</style>
