import Vue from 'vue'
import historyRecord from './historyRecord.vue'
import Viewer from 'v-viewer'
import '../../../static/css/viewer.css'
import '../../../util/layout.js'
Vue.use(Viewer);
/* eslint-disable no-new */
new Vue({
  el: '#historyRecord',
  render: h => h(historyRecord)
})
