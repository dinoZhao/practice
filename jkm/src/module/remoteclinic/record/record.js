// import 'babel-polyfill'
import Vue from 'vue'
import record from './record.vue'
import { dateFormat } from 'utils/util'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#record',
  render: h => h(record)
})

Vue.filter('fmat', function(input) {
	if(input) {
		return dateFormat(parseInt(input), 'Y-m-d G:i');
	}
})