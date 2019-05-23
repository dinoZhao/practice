// import 'babel-polyfill'
import Vue from 'vue'
import noPerson from './noPerson.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#noPerson',
  render: h => h(noPerson)
})
