// import 'babel-polyfill'
import Vue from 'vue'
import medicalplan from './medicalplan.vue'

/* eslint-disable no-new */
new Vue({
  el: '#medicalplan',
  render: h => h(medicalplan)
})
