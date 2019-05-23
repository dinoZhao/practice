<template>
  <div id="info">
      <img :src="patientInfo.headUrl||'https://www.fc18.com.cn/aiaf/sgw/content/fileResource/5443334476'" alt="">
      <div class="info-right">
          <div class="info-right-top">
            <div class="littleinfobox">
              <!--<div class="infotip">姓名</div>-->
              <div class="inforeal" style="margin-left: 0.2rem;">{{patientInfo.name||'请选择'}}<span class="grey" style="font-size: 0.26rem;">&nbsp;&nbsp;{{patientInfo.sex||''}}&nbsp;&nbsp;{{patientInfo.age||''}}岁</span></div>
            </div>
            <!--<div class="littleinfobox">
              <div class="infotip">年龄</div>
              <div class="inforeal2">{{patientInfo.age||'请选择'}}</div>
            </div>-->
            <div class="littleinfobox" style="margin-left: 13.5vw;">
              <div class="infotip">身份证号</div>
              <div class="inforeal">{{patientInfo.idNumber||'请选择'}}</div>
            </div>
          </div>
          <div class="info-right-bottom">
            <div class="littleinfobox-other">
              <div class="infotip">联系方式</div>
              <div class="inforeal3">{{patientInfo.phone||''}}</div>
            </div>

            <!--<div class="littleinfobox">
              <div class="infotip">性别</div>
              <div class="inforeal2">{{patientInfo.sex||'请选择'}}</div>
            </div>-->
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['patientInfo'],
watch:{
	patientInfo(){
		console.log(this.patientInfo);
	}
},
  data() {
    return {
      

    };
  },

  methods: {

  },
  beforeCreate() {

  },

  created() {
    
  }
};
</script>

<style scoped>
    #info{
        height: 2rem;
        overflow: hidden;
    }
    #info img{
        width:1rem;
        height:1rem;
        border-radius: 50%;
        margin-top:0.5rem;
        margin-left:0.5rem;
        float: left;
    }
    .info-right{
        height: 2rem;
        width: calc(100% - 1.5rem);
        margin-left:1.5rem;
        padding-left: 0.3rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        box-sizing: border-box;
        position: relative;
    }
    .info-right-top,.info-right-bottom{
       height:0.5rem;
       position: relative;
       
    }
    .littleinfobox{
      float: left;
      font-size: 0.2rem;
    }
    .littleinfobox-other{
    	position: absolute;
    	left: 0;
    	font-size: 0.2rem;
    }
    .infotip{
      height: 100%;
      margin:0 0.2rem;
      line-height: 0.5rem;
      float: left;
      font-size: .28rem;
    }
    .inforeal{
      height: 100%;
      /*margin:0 0.2rem;*/
      line-height: 0.5rem;
      float: left;
      color: #333;
      width: 2.2rem;
      font-size: .28rem;
      font-weight: normal;
    }
    .inforeal2{
      height: 100%;
      /*margin:0 0.2rem;*/
      line-height: 0.5rem;
      float: left;
      color: #333;
      font-size: .28rem;
      width: 1rem;
      font-weight: normal;
    }
    .inforeal3{
      height: 100%;
      margin:0 0.2rem;
      line-height: 0.5rem;
      float: left;
      color: #333;
      font-size: .28rem;
      width: 1.8rem;
      font-weight: normal;
    }
    .grey{
    	color: #666666;
    }
</style>
