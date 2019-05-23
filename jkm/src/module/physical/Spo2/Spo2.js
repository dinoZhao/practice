// import 'babel-polyfill'
import Vue from 'vue'
import Spo2 from './Spo2.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#Spo2',
  render: h => h(Spo2)
})
