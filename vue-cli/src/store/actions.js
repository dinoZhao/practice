import * as types from './types'
console.log(types)
export const increment=({
		commit
	}) => {
		commit(types.INCREMENT);
	}
