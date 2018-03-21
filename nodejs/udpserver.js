var dgram=require("dgram");
var server=dgram.createSocket('udp4');
server.on('message',function(msg,info){
	console.log("msg："+msg+info)
	
})
server.on('listening',function(){
	var address=server.address()
	console.log(address)
})
server.bind(5215)
