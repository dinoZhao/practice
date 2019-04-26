<template>
  <div class="booktest" @click="goto"> booktest <img src="../../../assets/weixin.png" /></div>
</template>
<script>
//import {getKnowledgeTag,cancelAttention} from 'API/requst'
export default {

  name: 'booktest',
  components: {
  },
  data () {
    return {
      playing:true,
      bennLike:false,
    }
  },
  methods:{
   goto:function(){
   		window.location.href = '../home/hometest.html';
   }
  },
  created () {
  	var vm = this;
  },
  mounted(){
//  let id ={'productCode':'YQB00101'};
//  let per = {'content':'h5/homePage/index.h5_default'}
//  getKnowledgeTag(id).then(data=>{
//    console.log(data)
//  })
//  cancelAttention(per).then(data=>{
//    console.log(data)
//  })
  }
}
</script>
<style>
	.home{
		color:#d43c33;
	}
</style>
