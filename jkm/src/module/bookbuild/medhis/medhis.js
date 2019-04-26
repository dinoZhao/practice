// import 'babel-polyfill'
import Vue from 'vue'
import medhis from './medhis.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#medhis',
  render: h => h(medhis)
})
