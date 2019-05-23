// import 'babel-polyfill'
import Vue from 'vue'
import messageHome from './messageHome.vue'
import 'utils/layout'
/* eslint-disable no-new */
new Vue({
  el: '#messageHome',
  render: h => h(messageHome)
})
