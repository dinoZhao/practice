var net=require('net');
var client=net.connect({port:8124},function(){
	console.log("client connected");
	client.write("worid")
})
client.on("data",function(data){
	console.log(data.toString())
	client.end()
})
client.on("end",function(){
	console.log("end")
})
