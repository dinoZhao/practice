// import 'babel-polyfill'
import Vue from 'vue'
import personal from './result.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#personal',
  render: h => h(personal)
})
