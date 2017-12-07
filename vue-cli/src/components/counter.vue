<template>
  <div>
    Value: {{ count }}
    <button @click="increment">+</button>
    <button @click="incrementAsync">异步</button>
    
    <!--<button @click="incrementAsync">Increment async</button>-->
   
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import swiper from 'swiper'
console.log(swiper)
export default {
  computed: mapGetters([
    'count'
  ]),
  methods: mapActions([
    'increment',
'incrementAsync'    
  ])
}
</script>
