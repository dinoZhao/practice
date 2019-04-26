// import 'babel-polyfill'
import Vue from 'vue'
import info from './info.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#info',
  render: h => h(info)
})
