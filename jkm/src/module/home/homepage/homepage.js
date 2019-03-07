// import 'babel-polyfill'
import Vue from 'vue'
import homepage from './homepage.vue'

/* eslint-disable no-new */
new Vue({
  el: '#homepage',
  render: h => h(homepage)
})
