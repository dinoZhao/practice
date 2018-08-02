var Benchmark = require('benchmark');


var bench = new Benchmark(function(){
	[1,2,3,4].sort()
});
console.log(bench)
