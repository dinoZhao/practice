// import 'babel-polyfill'
import Vue from 'vue'
import reservation from './reservation.vue'
import { dateFormat } from 'utils/util'
import 'utils/layout'

/* eslint-disable no-new */
new Vue({
  el: '#reservation',
  render: h => h(reservation)
})

Vue.filter('tim', function(input) {
	if(input) {
		return dateFormat(parseInt(input), 'G:i');
	}
})