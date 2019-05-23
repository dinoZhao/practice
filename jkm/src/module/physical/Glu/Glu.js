// import 'babel-polyfill'
import Vue from 'vue'
import Glu from './Glu.vue'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#Glu',
  render: h => h(Glu)
})
