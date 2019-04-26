<template>
    <div class="historylist" v-if="examReportType">
        <div class="timebox2"><img src="../../assets/plus-icon.png" />{{time}}</div>
        <span v-for='(item,index) in title' :key='index' v-if="examReportType">{{item}}</span>
        <span v-else>{{title}}</span>
        <div class="tipsbox">
        	<div class="tips"   v-if="examReportType">{{tips}}</div>
            <div class="tips" v-for='(item,index) in tips' :key='index' v-else>{{item}}</div>
        </div>
    </div>
        <div class="historylist" v-else>
        <div class="timebox"><img src="../../assets/tv-icon.png" />{{time}}</div>
        <!--<span v-for='(item,index) in title' v-if="examReportType">{{item}}</span>-->
        <span >{{title}}</span>
        <div class="tipsbox">
        	<div class="tips" >尿常规</div>
        	<div class="tips" >BMI</div>
            <!--<div class="tips" v-for='(item,index) in tips' :key='index' v-else>{{item}}</div>-->
        </div>
    </div>
</template>
<script>
export default {
    props:['time','title','tips','examReportType'],
    data(){
        return {

        }
    },
}
</script>
<style scoped>
    .historylist{
        width:14rem;
        height: 1.7rem;
        border:1px solid #eee;
        box-shadow: 0px -1px 15px 8px #eff4fa;
        margin-top:0.5rem;
        position: relative;
    }
    .timebox{
        position:absolute;
        left: 0.2rem;
        top:-0.2rem;
        width:2rem;
        height:0.4rem;
        border-radius: 0.05rem;
        background:-webkit-linear-gradient(left,#93ddf8,#67a2fe);
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        font-size: 0.18rem;
    }
        .timebox2{
        position:absolute;
        left: 0.2rem;
        top:-0.2rem;
        width:2rem;
        height:0.4rem;
        border-radius: 0.05rem;
        background:-webkit-linear-gradient(left,#fbe09d,#fba36f);
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        font-size: 0.18rem;
    }
    .timebox2>img{
     width: 0.3rem;
     vertical-align: middle;
     position: relative;
     left: -0.09rem;
    }
    .timebox>img{
     width: 0.4rem;
     vertical-align: middle;
     position: relative;
     left: -0.09rem;
    }
    .historylist>span{
        position: relative;
        padding-left: 0.15rem;
        top:0.45rem;
        left:0.2rem;
        font-size: 0.24rem;
        font-weight: bold;
    }
    .tipsbox{
        position: absolute;
        top:1rem;
        left:0.2rem;
        font-size: 0.18rem;
        color: #999;
        width: 100%;
        height: 0.5rem;
    }
    .tips{
        width:0.8rem;
        height: 0.36rem;
        border:1px solid #eee;
        border-radius: 0.18rem;
        text-align: center;
        line-height: 0.36rem;
        font-size: 0.16rem;
        margin-top:0.1rem;
        float: left;
        margin-left: 0.1rem;
    }
</style>


