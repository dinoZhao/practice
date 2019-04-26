// import 'babel-polyfill'
import Vue from 'vue'
import homepage from './homepage.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
/* eslint-disable no-new */
new Vue({
  el: '#homepage',
  render: h => h(homepage)
})
