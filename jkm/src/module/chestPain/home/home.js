// import 'babel-polyfill'
import Vue from 'vue'
import home from './home.vue'
import 'utils/layout'
/* eslint-disable no-new */
new Vue({
  el: '#home',
  render: h => h(home)
})
