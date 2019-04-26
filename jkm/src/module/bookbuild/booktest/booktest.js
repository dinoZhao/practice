// import 'babel-polyfill'
import Vue from 'vue'
import booktest from './booktest.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#booktest',
  render: h => h(booktest)
})
