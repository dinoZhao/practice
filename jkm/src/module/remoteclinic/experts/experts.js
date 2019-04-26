// import 'babel-polyfill'
import Vue from 'vue'
import experts from './experts.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#experts',
  render: h => h(experts)
})
