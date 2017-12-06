import vuex from "vuex"
import vue from "vue"
vue.use(vuex)

const state = {
  count: 1
 
}
import * as mutations from  './mutations'
import * as getters from  './getters'
import * as actions from  './actions'
//console.log(actions)
export default new vuex.Store({
	mutations,
	getters,
	state,
	actions
	
});
//console.log(state)
