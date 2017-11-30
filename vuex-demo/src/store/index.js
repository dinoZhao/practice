import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const types = {
	INCREMENT: 'INCREMENT',

	DECREMENT: 'DECREMENT',
	HH: 'HH'
}
export default new Vuex.Store({
	state: {
		count: 20,
		ha: 1
	},
	getters: {
		count: (state) => {
			return state.count;
		},
		getOdd: (state) => {
			return state.count % 2 == 0 ? '偶数' : '奇数'
		},
		ood: (state) => state.count + 1
	},
	actions: {
		increment: ({
			commit
		}) => {
			commit(types.INCREMENT);
		},
		decrement: ({
			commit
		}) => {
			commit(types.DECREMENT);
		},
		hh: ({
			commit
		}) => {
			commit(types.HH)
		},
		clickOdd: ({
			commit,
			state
		}) => {
			if(state.count % 2 == 0) {
				commit(types.INCREMENT);
			}
		},
		clickAsync: ({
			commit
		}) => {
			new Promise((resolve) => {
				setTimeout(function() {
					commit(types.INCREMENT);
				}, 1000);
			})
		}
	},
	mutations: {
		[types.INCREMENT](state) {
			state.count++;
		},
		[types.DECREMENT](state) {
			state.count--;
		},
		[types.HH](state) {
			state.ha++;
			console.log(state.ha)
		}
	}
});