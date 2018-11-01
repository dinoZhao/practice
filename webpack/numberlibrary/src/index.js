import numRef from './ref.json';
import $2 from 'jquery1';
export function numToWord(num) {
	for(var val of numRef) {
		if(val.num == num) {
			console.log($2)
			
			return(val.word)
		}
	}
}

export function wordToNum(word) {
 for(var val of numRef) {
		if(val.word == word) {
			console.log($2)
			return(val.num)
		}
	}
}