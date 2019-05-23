// import 'babel-polyfill'
import Vue from 'vue'
import index from './index.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#index',
  render: h => h(index)
})
