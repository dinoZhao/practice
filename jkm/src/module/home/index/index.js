// import 'babel-polyfill'
import Vue from 'vue'
import index from './index.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#index',
  render: h => h(index)
})
