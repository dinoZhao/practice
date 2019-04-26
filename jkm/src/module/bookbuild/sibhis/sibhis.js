// import 'babel-polyfill'
import Vue from 'vue'
import sibhis from './sibhis.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#sibhis',
  render: h => h(sibhis)
})
