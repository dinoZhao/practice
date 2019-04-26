// import 'babel-polyfill'
import Vue from 'vue'
import healthhome from './healthhome.vue';
import '../../../util/initial.js';
/* eslint-disable no-new */
new Vue({
  el: '#healthhome',
  render: h => h(healthhome)
})
