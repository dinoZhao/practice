let rimraf=require("rimraf")
//用来删除文件
//https://www.npmjs.com/package/rimraf
rimraf("./123.txt",function(err){
	if (err) throw err
	console.log(55)
})
