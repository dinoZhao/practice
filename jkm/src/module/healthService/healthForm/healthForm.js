// import 'babel-polyfill'
import Vue from 'vue'
import healthForm from './healthForm.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#healthForm',
  render: h => h(healthForm)
})
