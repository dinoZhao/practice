// import 'babel-polyfill'
import Vue from 'vue'
import diabetes from './diabetes.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#diabetes',
  render: h => h(diabetes)
})
