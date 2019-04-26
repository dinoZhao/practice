<template>
  <div class="homepage"> 
  	<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
	    <!-- slides -->
	    <swiper-slide><img src="../../../assets/mod-1.png"/></swiper-slide>
	    <swiper-slide><img src="../../../assets/mod-2.png"/></swiper-slide>
	    <!-- Optional controls -->
	</swiper>
  </div>
</template>
<script>
import {getKnowledgeTag,cancelAttention} from 'API/requst'
import headline from 'components/headline/headline.vue';
export default {

  name: 'homepage',
  components: {
  },
  data () {
    return {
    	notNextTick: true,
      	swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          autoplay:false,
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart (swiper) {
            console.log(swiper.activeIndex);
            $('.chart-line-left span').removeClass('on');
            if(swiper.activeIndex==0){
            	$('.lineOne').addClass('on');
            	$('.policyShowOne').show();
            	$('.policyShowTwo').hide();
            }else{
            	$('.lineTwo').addClass('on');
            	$('.policyShowOne').hide();
            	$('.policyShowTwo').show();
            }
            
          }
          // more Swiper configs and callbacks...
          // ...
        }
    }
  },
  methods:{
  },
  components:{
    headline
  },
  created () {
  	var vm = this;
  },
  mounted(){
   
  }
}
</script>
<style>
	.homepage,.swiper-container,.swiper-wrapper,.swiper-slide{
		width: 100%;
		height: 100%;
	}
</style>
