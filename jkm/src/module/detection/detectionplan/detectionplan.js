// import 'babel-polyfill'
import Vue from 'vue'
import detectionplan from './detectionplan.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#detectionplan',
  render: h => h(detectionplan)
})
