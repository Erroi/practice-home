var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection',function(socket){
    socket.emit('news',{hello:'world'});
    socket.on('my own event',function(data){
        console.log(data);
    })
})