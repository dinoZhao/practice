var glob = require("glob")
//glob('./src/**/*.js',function(err,file){
//	console.log(file)
//})
console.log(glob.sync('./src/**/*.js'))
