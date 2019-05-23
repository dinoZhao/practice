// import 'babel-polyfill'
import Vue from 'vue'
import caseHistory from './caseHistory.vue'
import 'utils/layout'
/* eslint-disable no-new */
new Vue({
  el: '#caseHistory',
  render: h => h(caseHistory)
})
