<template>
  <div id="info">
      <img :src='patientInfo.headUrl||"http://ww1.sinaimg.cn/large/005SvFg2ly1g0tb4guu90j302i02ijr6.jpg"' alt="">
      <div class="info-right">
          <div class="info-right-top">
            <div class="littleinfobox">
              <div class="infotip">姓名</div>
              <div class="inforeal">{{patientInfo.name||'请选择'}}</div>
            </div>
            <div class="littleinfobox">
              <div class="infotip">年龄</div>
              <div class="inforeal2">{{patientInfo.age||'请选择'}}</div>
            </div>
            <div class="littleinfobox">
              <div class="infotip">身份证</div>
              <div class="inforeal">{{patientInfo.idNumber||'请选择'}}</div>
            </div>
          </div>
          <div class="info-right-bottom">
            <div class="littleinfobox">
              <div class="infotip">联系方式</div>
              <div class="inforeal3">{{patientInfo.phone||'请选择'}}</div>
            </div>
            <div class="littleinfobox">
              <div class="infotip">性别</div>
              <div class="inforeal2">{{patientInfo.sex||'请选择'}}</div>
            </div>
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
        width: 100%;
        margin-left:1.5rem;
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        box-sizing: border-box;
    }
    .info-right-top,.info-right-bottom{
       height:0.5rem;
    }
    .littleinfobox{
      float: left;
      font-size: 0.2rem;
    }
    .infotip{
      height: 100%;
      margin:0 0.2rem;
      line-height: 0.5rem;
      float: left;
    }
    .inforeal{
      height: 100%;
      margin:0 0.2rem;
      line-height: 0.5rem;
      float: left;
      color: #333;
      width: 2.2rem;
      font-size: .28rem;
      font-weight: normal;
    }
    .inforeal2{
      height: 100%;
      margin:0 0.2rem;
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
</style>
