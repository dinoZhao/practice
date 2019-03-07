// import 'babel-polyfill'
import Vue from 'vue'
import login from './login.vue'

/* eslint-disable no-new */
new Vue({
  el: '#login',
  render: h => h(login)
})
