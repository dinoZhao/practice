// import 'babel-polyfill'
import Vue from 'vue'
import doctordetail from './doctordetail.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#doctordetail',
  render: h => h(doctordetail)
})
