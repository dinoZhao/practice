// import 'babel-polyfill'
import Vue from 'vue'
import healthhome from './healthhome.vue';
import Viewer from 'v-viewer'
import '../../../static/css/viewer.css'
import '../../../util/initial.js';
Vue.use(Viewer);
/* eslint-disable no-new */
new Vue({
  el: '#healthhome',
  render: h => h(healthhome)
})
