import vue from "vue"
import vuex from 'vuex'
vue.use(vuex)


const state={
	count:3,
	todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
}
const mutations={
	 increment (state) {
      state.count++
   },
   decrement(state){
   	 state.count--
   },
   mutlmsg(state,obj){
   	state.count*=obj.msg
   }
}
const getters={
	doneTodos: state => {
      return state.todos.filter(todo => todo.done)
   },
   doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
const actions= {
  decrement ({ commit }) {
    commit('decrement')
  },
  mutlmsg({commit},obj){
  	commit('mutlmsg',obj)
  }
}
export default new vuex.Store({
state,
mutations,
getters,
actions
});
