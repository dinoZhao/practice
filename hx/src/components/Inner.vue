<template>
  <div>
      {{message}}


      <div @click="incrementCounter">点击子传父</div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    
    };
  },
   
  computed:{
  },
  created(){
  },
  watch:{
  },
    props:['message'],
    methods:{
        incrementCounter: function (aa) {
      this.counter += 1
      this.$emit('increment',this.counter)
    }
    }
};
</script>



<style lang="scss" scoped="scoped">

</style>