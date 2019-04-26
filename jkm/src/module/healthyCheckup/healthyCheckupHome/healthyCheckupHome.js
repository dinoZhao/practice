// import 'babel-polyfill'
import Vue from 'vue'
import healthyCheckupHome from './healthyCheckupHome.vue'
import { dateFormat } from 'utils/util'
import '../../../util/layout.js'
/* eslint-disable no-new */
new Vue({
  el: '#healthyCheckupHome',
  render: h => h(healthyCheckupHome)
})
Vue.filter('tim', function(input) {
	if(input) {
		return dateFormat(parseInt(input), 'G:i');
	}
})