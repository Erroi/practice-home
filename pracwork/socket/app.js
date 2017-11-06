var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/',function(req,res){
	// res.send('<h1>hello world</h1>');
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	// console.log('a user connected');
	socket.on('chat message',function(msg){
		console.log(msg);
		// socket.broadcast.emit('chat message',msg);    //可简写io.emit
		// io.emit('chat message',msg);    //Socket.io give us io.emit ,in order to send an event to everyclient
	})

	socket.on('disconnect',function(){
		// console.log('a user disconnected')
	});
});

http.listen(3000,function(){
	console.log('listening 3000');
});