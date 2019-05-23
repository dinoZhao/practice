// import 'babel-polyfill'
import Vue from 'vue'
import requestAssist from './requestAssist.vue'
import 'utils/layout'
import Viewer from 'v-viewer'
import '../../../static/css/viewer.css'
Vue.use(Viewer);
/* eslint-disable no-new */
new Vue({
  el: '#requestAssist',
  render: h => h(requestAssist)
})
