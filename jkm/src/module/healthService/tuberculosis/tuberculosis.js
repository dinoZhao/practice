// import 'babel-polyfill'
import Vue from 'vue'
import tuberculosis from './tuberculosis.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#tuberculosis',
  render: h => h(tuberculosis)
})
