import vue from "vue"
import vuex from 'vuex'
vue.use(vuex)


const state={
	count:3
}
const mutations={
	 increment (state) {
      state.count++
    }
}
export default new vuex.Store({
state
});
