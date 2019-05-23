<template>
  <div id="lifeStyle">
    <div class="lifeStyle_content">
      <div class="title">
        <i class="lineleft"></i>
        <span>体育锻炼频率</span>
      </div>
      <div class="input_button">
        <input type="button" :value="times" v-for="(times,index) in time" :key="index"  :class="{active:current===index}"  :data-index="index" @click="changeoption(index,'锻炼频率')">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span>每天锻炼时间</span>
            <input type="tel" placeholder="请输入" name="minutes" class="small" v-model="lifestyledata.exerciseDuration" @input="changeinput">
            <span class="times">分钟</span>
          </div>
          <div class="exercise_time">
            <span>坚持锻炼时间</span>
            <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.exerciseYear" @input="changeinput">
            <span class="times">年</span>
          </div>
        </div>
        <div class="exercise_type">
          <span style="width:12%;">锻炼方式</span>
          <textarea placeholder="请输入" class="big" v-model="lifestyledata.exerciseWay"></textarea>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>饮食习惯</span>
      </div>
      <div class="radio_content margin">
        <div class="habits" v-for="(item,index) in eatHabits" data-index = "index" :key = "index" @click="changecheck(item.code)">
          <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>吸烟情况</span>
      </div>
      <div class="input_button">
        <input type="button" :value="smoking.type" :class="{active:smokeCurrent===index}" v-for="(smoking,index) in smoke" :key="index" @click="changeoption(index,'吸烟')">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span>平均日吸烟量</span>
            <input type="tel" placeholder="请输入" name="minutes" class="small" v-model="lifestyledata.dailyCigarette" @input="changeinput">
            <span class="times">支</span>
          </div>
          <div class="exercise_time">
            <span>开始吸烟年龄</span>
            <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.smokingAge" @input="changeinput">
            <span class="times">岁</span>
          </div>
        </div>
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span style="display: inline-block;text-align: right"><b style="opacity: 0;">平均</b>戒烟年龄</span>
            <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.quitSmokingAge" @input="changeinput">
            <span class="times">岁</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>饮酒情况</span>
      </div>
      <div class="input_button">
        <input type="button" :value="drinking" :class="{active:drinkCurrent===index}" v-for="(drinking,index) in drink" :key="index" @click="changeoption(index,'饮酒')">
      </div>
      <div class="text_content" style="">
        <div class="exercise">
          <div class="exercise_time" style="width:65%;">
            <span style="width: 16vw;display: inline-block;text-align: right;">平均饮酒量</span>
            <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.dailyDrink" @input="changeinput">
            <span class="times" style="position: absolute;right: 8%">两</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="width: 16vw;">是否戒酒</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in option" :key="index" :class="{active:optionCurrents===options.code}" @click="changeoption(options.code,'戒酒')">
        </div>
        <div class="choose_right">
          <span style="min-width:11vw;">戒酒年龄</span>
          <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.quitDrinkingAge" @input="changeinput">
          <span class="then" style="right:10%">岁</span>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="width: 16vw;">近一年内是否曾醉酒</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in option2" :key="index" :class="{active:optionCurrent===options.code}" @click="changeoption(options.code,'醉酒')">
        </div>
        <div class="choose_right">
          <span style="min-width:11vw;">开始饮酒年龄</span>
          <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.drinkingAge" @input="changeinput">
          <span class="then" style="right:10%">岁</span>
        </div>
      </div>
      <div class="radio_content margin">
        <div class="beerkind"><span style="float: left;margin-top: 3px;margin-right: 15px;width: 15vw;text-align: right;">饮酒种类</span></div>
        <div class="check_content">
          <div class="habits" v-for="(item,index) in drinkType" data-index = "index" :key = "item.index" @click="changedrinkType(item.code)">
            <img :src="item.check?require('../../../assets/already.png'):require('../../../assets/notyet.png')" alt=""><span>{{item.type}}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="lineleft"></i>
        <span>职业暴露情况</span>
      </div>
      <div class="input_button">
        <input type="button" value="无职业病" :value="diseases" :class="{active:diseaseCurrent===index}" v-for="(diseases,index) in disease" :key="index" @click="changeoption(index,'职业病')">
      </div>
      <div class="text_content">
        <div class="exercise">
          <div class="exercise_time">
            <span style="width: 14vw;display: inline-block;text-align: right">工种</span>
            <input type="text" placeholder="请输入" name="minutes" class="small" v-model="lifestyledata.workType" @input="changeinput" style="width: 52%;">
          </div>
          <div class="exercise_time">
            <span style="width: 14vw;display: inline-block;text-align: right;margin-right:0;">从业时间</span>
            <input type="tel" placeholder="请输入" name="years" class="small" v-model="lifestyledata.workingTime" @input="changeinput" style="width: 52%;">
            <span class="times" style="right: 8.5%;">年</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width:14vw">粉尘防护措施</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in optionBollean" :key="index" :class="{active:dustCurrent===options.code}" @click="changeoption(options.code,'粉尘')">
        </div>
        <div class="choose_left" style="width: 49%">
          <span style="display: inline-block;text-align:right;width:14vw">放射物质防护措施</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in optionBollean" :key="index" :class="{active: radiateCurrent===options.code}" @click="changeoption(options.code,'放射')">
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 14vw">物理因素防护措施</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in optionBollean" :key="index" :class="{active:physicalCurrent===options.code}" @click="changeoption(options.code,'物理')">
        </div>
        <div class="choose_left" style="width: 49%">
          <span style="display: inline-block;text-align:right;width: 14vw">化学物质防护措施</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in optionBollean" :key="index" :class="{active:chemistryCurrent===options.code}" @click="changeoption(options.code,'化学')">
        </div>
      </div>
      <div class="choose">
        <div class="choose_left">
          <span style="display: inline-block;text-align:right;width: 14vw">其他防护措施</span>
          <input type="button" :value="options.type" class="smallBtn" v-for="(options,index) in optionBollean" :key="index" :class="{active:otherCurrent===options.code}" @click="changeoption(options.code,'其他')" style="position: relative;left: 0">
        </div>
      </div>
      </div>
      </div>
</template>

<script>
  import {getHealthyCheck} from '../../../../src/api/requst'
  import { getURLParameter,dateFormat,empty } from 'utils/util'
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
        eatHabits:[
          {
            check:true,
            code:"1",
            type:'荤素均衡',
          },
          {
            check:false,
            code:"2",
            type:'荤食为主',
          },
          {
            check:false,
            code:"3",
            type:'嗜盐',
          },
          {
            check:false,
            code:"4",
            type:'嗜油',
          },
          {
            check:false,
            code:"5",
            type:'嗜糖',
          }
        ],
        drinkType:[
          {
            check:true,
            type:'白酒',
            code:"1"
          },
          {
            check:false,
            type:'啤酒',
            code:"2"
          },
          {
            check:false,
            type:'红酒',
            code:"3"
          },
          {
            check:false,
            type:'黄酒',
            code:"4"
          },
          {
            check:false,
            type:'其他',
            code:"5"
          }
        ],
        time:[
          '每天','每周一次以上','偶尔','不锻炼'
        ],
        smoke:[{
            check:false,
            type:'从不吸烟',
            code:"1"
          },{
            check:false,
            type:'已戒烟',
            code:"2"
          },{
            check:false,
            type:'吸烟',
            code:"3"
          }
        ],
        drink:[
          '从不饮酒','偶尔','经常','每天'
        ],
        disease:[
          '无职业病','有职业病'
        ],
        option:[
          {
           check:false,
           code:'2',
           type:'是'
          },
          {
            check:false,
            type:'否',
            code:'1'
          }
        ],
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
        optionBollean:[
          {
            check:false,
            code:"2",
            type:'有'
          },
          {
            check:false,
            code:"1",
            type:'无'
          }
        ]
      }
    },
    created(){
    	var vm = this;
    	//console.log(vm.lifelist);
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
	      var eatHabits = lifelist.dietaryHabit;
	      var drinkingType = lifelist.drinkingType;
	      Object.keys(lifelist).forEach(function(keystr){
			    Object.keys(lifestyledata).forEach(function(key){
			    	if(keystr==key){
			    		lifestyledata[key]=lifelist[keystr];
			    	}
					});
				});
				if(!empty(eatHabits)){
					var _eatHabits = eatHabits.split(',');
					var _choselist = vm.eatHabits;
					vm.habitList = _eatHabits;
					_choselist.forEach(function(item,index,arr){
						if(_eatHabits.includes(item.code)){
							item.check = true;
						}else{
							item.check = false;
						}
					})
					console.log(_choselist)
				}
				if(!empty(drinkingType)){
					var _drinkingType = drinkingType.split(',');
					var _choselist = vm.drinkType;
					vm.drinkTypelist = _drinkingType;
					_choselist.forEach(function(item,index,arr){
						if(_drinkingType.includes(item.code)){
							item.check = true;
						}else{
							item.check = false;
						}
					})
					console.log(_choselist)
				}
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
	  		vm.lifestyledata.dietaryHabit = arr.join(',');
	  		sessionStorage.setItem('lifestyledata',JSON.stringify(vm.lifestyledata));
    	},
    	changedrink:function(inde){
    		var vm = this;
    		vm.drinkCurrent = inde;
    		vm.lifelist.drinkingStatus = inde+1;
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
	  		vm.lifestyledata.drinkingType = arr.join(',');
	  		sessionStorage.setItem('lifestyledata',JSON.stringify(vm.lifestyledata));
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
    beforeMount (){
    },
    mounted (){
      
    },
    watch: {
//	    lifelist(val) {
//	      this.lifestyledata = val;
//	      console.log(val);
//	    }
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
                position: absolute;
                right: 14%;
                top: 50%;
                transform: translateY(-50%);
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
          margin-right: 15px;
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
              position: relative;
              left: -1%;
              &.active{
                background-color: #3C9BFF;
                color: #FFFFFF;
              }
            }
          }
          .choose_right{
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
