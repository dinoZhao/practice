// import 'babel-polyfill'
import Vue from 'vue'
import personal from './personal.vue'

/* eslint-disable no-new */
new Vue({
  el: '#personal',
  render: h => h(personal)
})
