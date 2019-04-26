<template>
    <div id='healthdata' v-show="tabShow">
        <div class="container1">
           <div v-if="healthInfo.bloodPressure ===''?false:true" :data-state="healthInfo.bloodPressure">
               <div class="datatop">
                   <span>血压</span>
                   <i :class="healthInfo.bloodPressureStatus==='正常'?'normal-panel':'alert'">{{healthInfo.bloodPressureStatus||''}}</i>
               </div>
               <div class="databottom">
                   <span>{{healthInfo.bloodPressure||''}}</span>
                   <i>mmHg</i>
               </div>
           </div>
           <div v-show="healthInfo.bloodOxygen ===''?false:true">
               <div class="datatop">
                   <span>血氧</span>
                   <i :class="healthInfo.bloodOxygenStatus==='正常'?'normal-panel':'alert'">{{healthInfo.bloodOxygenStatus||''}}</i>
               </div>
               <div class="databottom">
                   <span>{{healthInfo.bloodOxygen||''}}</span>
                   <i>BPM</i>
               </div>
           </div>
           <div v-show="healthInfo.bloodSugar ===''?false:true">
               <div class="datatop">
                   <span>血糖</span>
                   <i :class="healthInfo.bloodSugarStatus==='正常'?'normal-panel':'alert'">{{healthInfo.bloodSugarStatus||''}}</i>
               </div>
               <div class="databottom">
                   <span>{{healthInfo.bloodSugar||''}}</span>
                   <i>mmol/L</i>
               </div>
           </div>
           <div v-show="healthInfo.temp ===''?false:true">
               <div class="datatop">
                   <span>体温</span>
                   <i :class="healthInfo.tempStatus==='正常'?'normal-panel':'alert'">{{healthInfo.tempStatus||''}}</i>
               </div>
               <div class="databottom">
                   <span>{{healthInfo.temp||''}}</span>
                   <i>℃</i>
               </div>
           </div>
        </div>
        <div class="container2" v-show="healthInfo.ecgUrl ===''?false:true">
            <div class="containertop">
                <span>心电图</span>
                <i :class="healthInfo.ecgStatus==='正常'?'normal-panel':'alert'">{{healthInfo.ecgStatus||''}}</i>
            </div>
            <div class="containerbottom">
                <img :src="healthInfo.ecgUrl" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
	props: ['healthInfo'],
    data(){
        return {
		tabShow:true
        }
    },
    methods:{

    },
    created(){

    }

}
</script>
<style scoped>
    .container1{
        overflow: hidden;
    }
    .container1>div{
      width:5rem;
      height:1.4rem;
      border:1px solid #eee;
      float: left;
      margin-left: 0.5rem;
      margin-top:0.3rem; 
      box-shadow: 1px 1px 1px 1px #eee;   
      margin-bottom: 1px;  
    }
    .container1>div:first-child{
      background-image: url(../../assets/pressure1.png);
      background-size: 18%;
      background-repeat: no-repeat;
      background-position: 93% 2vh;  
    }
        .container1>div:nth-child(2){
      background-image: url(../../assets/oxygen1.png);
      background-size: 24%;
      background-repeat: no-repeat;
      background-position: 93% 5vh;  
    }
        .container1>div:nth-child(3){
      background-image: url(../../assets/temp.png);
      background-size: 15%;
      background-repeat: no-repeat;
      background-position: 90% 4vh;  
    }
        .container1>div:nth-child(4){
      background-image: url(../../assets/bloodSugar.png);
      background-size: 18%;
      background-repeat: no-repeat;
      background-position: 90% 6vh;  
    }
    .datatop,.databottom{
        height: 50%;
    }
    .datatop>span{
        line-height: 0.7rem;
        font-size: 0.28rem;
        font-weight: normal;
        margin-left:0.2rem;
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
    }
    .alert {
        background-color: #FC6350;
        height: 0.3rem;
        width: 0.6rem;
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        margin:0rem 0 0rem 0.2rem;
        vertical-align: middle;
        text-align: center;
        line-height: 0.32rem;
        border-radius: 0.3rem;
        color: #fff;
        
    }
      .normal-panel {
        background-color: #FFFFFF;

        /*width: 0.7rem;*/
        font-size: 0.25rem;
        padding: 0.05rem 0.2rem;
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        margin:0.2rem 0 0.2rem 0.2rem;
        border:1px solid #30CBE1; 
        text-align: center;
        line-height: 0.32rem;
        border-radius: 0.3rem;
        color: #30CBE1;
        font-weight: lighter;
        vertical-align: middle;
    }
    .databottom>span{
        line-height: 0.7rem;
        font-size: 0.48rem;
        font-weight: normal;
        margin-left:0.2rem;
        display: inline-block;
        overflow: hidden;
    }
    .databottom>i{
        font-size: 0.18rem;
        display: inline-block;
        overflow: hidden;
        line-height: 0.66rem;
        color: #999;
    }
    .containertop{
        font-size: 0.24rem;
        font-weight: bold;
        margin-left:0.7rem;
        margin-top:0.5rem;
        display: inline-block;
        position: relative;
        width:100%;
    }
    .containertop>span{
    	vertical-align: middle;
    }
    .containerbottom>img{
        margin-left:0.7rem;
        width:11rem;
        margin-top:0.2rem;
    }
    .normal {
        height: 0.3rem;
        width: 0.6rem;
        border:1px solid #30CBE1; 
        position: absolute;
        top:0;
        left: 1rem;
        font-weight: 500;
        text-align: center;
        border-radius: 0.15rem;
        font-size: 0.16rem;
        line-height: 0.3rem;
        color:#30CBE1; 
    }
</style>


