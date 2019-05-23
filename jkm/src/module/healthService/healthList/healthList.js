// import 'babel-polyfill'
import Vue from 'vue'
import healthList from './healthList.vue'
import { dateFormat } from 'utils/util'
import 'utils/layout' /*引入公共样式*/
/* eslint-disable no-new */
new Vue({
  el: '#healthList',
  render: h => h(healthList)
})
Vue.filter('fmat', function(input) {
	if(input) {
		return dateFormat(parseInt(input), 'Y-m-d G:i');
	}
})