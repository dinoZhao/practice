// import 'babel-polyfill'
import Vue from 'vue'
import bloodPressure from './bloodPressure.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#bloodPressure',
  render: h => h(bloodPressure)
})
