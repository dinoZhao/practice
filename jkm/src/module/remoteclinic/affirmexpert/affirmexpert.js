// import 'babel-polyfill'
import Vue from 'vue'
import affirmexpert from './affirmexpert.vue'
import 'utils/layout'
import Viewer from 'v-viewer'
import '../../../static/css/viewer.css'
Vue.use(Viewer);
new Vue({
  el: '#affirmexpert',
  render: h => h(affirmexpert)
})
