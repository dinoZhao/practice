// import 'babel-polyfill'
import Vue from 'vue'
import daytest from './daytest.vue'
import 'utils/layout'
/* eslint-disable no-new */
new Vue({
  el: '#daytest',
  render: h => h(daytest)
})
