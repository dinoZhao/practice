// import 'babel-polyfill'
import Vue from 'vue'
import affirmexpert from './affirmexpert.vue'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#affirmexpert',
  render: h => h(affirmexpert)
})
