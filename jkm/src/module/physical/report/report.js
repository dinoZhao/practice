import Vue from 'vue'
import report from './report.vue'
import 'utils/layout'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

/* eslint-disable no-new */
new Vue({
  el: '#report',
  render: h => h(report)
})
