import * as types from './types'
console.log(types)
export const increment=({
		commit
	}) => {
		commit(types.INCREMENT);
	}
//export default{}
export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit(types.INCREMENT)
  }, 1000)
}