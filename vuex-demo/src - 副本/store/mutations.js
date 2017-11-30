import {
	INCREMENT,
	DECREMENT,
	HH
} from './types'
import getters from './getters'

const state = {
	count: 20,
	ha:1
};

const mutations = {
	[INCREMENT](state) {
		state.count++;
	},
	[DECREMENT](state) {
		state.count--;
	},
	[HH](state){
		state.ha++;
		console.log(state.ha)
	}
};

export default {
	state,
	mutations,
	getters
}