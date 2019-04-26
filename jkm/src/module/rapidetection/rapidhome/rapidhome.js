// import 'babel-polyfill'
import Vue from 'vue'
import rapidhome from './rapidhome.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#rapidhome',
  render: h => h(rapidhome)
})
