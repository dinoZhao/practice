// import 'babel-polyfill'
import Vue from 'vue'
import excellentPlan from './excellentPlan.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#excellentPlan',
  render: h => h(excellentPlan)
})
