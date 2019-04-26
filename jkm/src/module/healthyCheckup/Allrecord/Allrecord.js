// import 'babel-polyfill'
import Vue from 'vue'
import Allrecord from './Allrecord.vue'
import { dateFormat } from 'utils/util'

/* eslint-disable no-new */
new Vue({
  el: '#Allrecord',
  render: h => h(Allrecord)
})

Vue.filter('fmat', function(input) {
	if(input) {
		return dateFormat(parseInt(input), 'Y-m-d G:i');
	}
})