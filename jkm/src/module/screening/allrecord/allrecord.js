// import 'babel-polyfill'
import Vue from 'vue'
import allrecord from './allrecord.vue'
import { dateFormat } from 'utils/util'
import 'utils/layout'

new Vue({
  el: '#allrecord',
  render: h => h(allrecord)
})
Vue.filter('fmat', function(input) {
	if(input) {
		return dateFormat(parseInt(input), 'Y-m-d G:i');
	}
})