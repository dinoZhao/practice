// import 'babel-polyfill'
import Vue from 'vue'
import signHome from './signHome.vue'
import 'utils/layout'
/* eslint-disable no-new */
new Vue({
  el: '#signHome',
  render: h => h(signHome)
})
