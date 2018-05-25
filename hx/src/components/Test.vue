<template>

  <div>
    {{total}}
<Inner :message=num  v-on:increment="incrementTotal">
</Inner>
<Inner :message=num  v-on:increment="incrementTotal">
</Inner>  

<input type="text" v-bind:value="something"
  v-on:input=logevent($event)>
{{something}}
<hr>
<currency  v-model="price"></currency>  
  </div>

</template>

<script>
import Inner from "./Inner"
import Currency from "./Currency"

export default {
  data() {
    return {
      num:"父传子",
       total: 0,
       something:'55',
       price:''
    
    };
  },
   
  computed:{
  },
  created(){
  },
  watch:{
  },
  components:{
    Inner,
    Currency
  },
  methods:{
    incrementTotal:function(val){
    this.total++;
    console.log(val)
    
    },
    logevent(e){
     this.something=e.target.value
    // console.log(arguments[0])
    }
  }

};
</script>



<style lang="scss" scoped="scoped">

</style>