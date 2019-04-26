// import 'babel-polyfill'
import Vue from 'vue'
import login from './login.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#login',
  render: h => h(login)
})
