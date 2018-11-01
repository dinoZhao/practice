import numRef from './ref.json';
export function numToWord(num) {
	for(var val of numRef) {
		if(val.num == num) {
			console.log($)
			return(val.word)
		}
	}
}

export function wordToNum(word) {
 for(var val of numRef) {
		if(val.word == word) {
			console.log($)
			return(val.num)
		}
	}
}