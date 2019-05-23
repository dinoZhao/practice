// import 'babel-polyfill'
import Vue from 'vue'
import result from './result.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#result',
  render: h => h(result)
})
