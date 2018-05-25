<template>
  <div id="app">
    <router-view>
    </router-view>
    <appFooter></appFooter>
    	<pop></pop>
  </div>
</template>

<script>
	import appFooter from '@/components/Footer'
	import pop from '@/components/Pop'


export default {
  components:{
  	appFooter,
  	pop
  }
}
</script>

<style>
#app {
  
}
</style>
