var net=require('net');  

var server=net.createServer(function(socket){
	socket.on('data',function(data){
		socket.write("hello")
	})
	socket.on("end",function(){
		console.log('fa')
	})
	socket.write("welcome")
})
server.listen(8124,function(){
	console.log("bound")
})
