// import 'babel-polyfill'
import Vue from 'vue'
import startdetection from './startdetection.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#startdetection',
  render: h => h(startdetection)
})
