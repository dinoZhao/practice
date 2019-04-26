// import 'babel-polyfill'
import Vue from 'vue'
import detailInfo from './detailInfo.vue';
import '../../../util/initial.js';
/* eslint-disable no-new */
new Vue({
  el: '#detailInfo',
  render: h => h(detailInfo)
})
