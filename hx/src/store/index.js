import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const state={
	cuemsg:'',
	cuestatus:'',
	popkind:'',
	popshow:false
}
const mutations={
	SETCUE(state,msg){
		state.cuemsg=msg[0];
     	state.cuestatus=msg[1];
     	state.popkind=msg[2];
     	state.popshow=msg[3]
	},
	show(state){
			state.popshow=true
	},
	hide(hide){
			state.popshow=false
	},
	
}
const getters={
	date1:state=>{
		return state.num+"oo"
	},
	cuemsg:state=>state.cuemsg,
	cuestatus:state=>state.cuestatus,
	popkind:state=>state.popkind,
	popshow:state=>state.popshow,
	
	
	
}
const actions={
	increment: ({ commit }) => commit('add'),
	hide:({commit})=>commit('hide')
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
