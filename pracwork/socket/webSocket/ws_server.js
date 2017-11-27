var ws = require('nodejs-websocket');

var PORT = '3000';

var clientCount = 0;
var server = ws.createServer(function(conn){
    clientCount++;
    conn.nickname = 'user' + clientCount;
    var mes={};
    mes.type = 'enter';
    mes.data = conn.nickname + 'is comes in';
    broadcast(JSON.stringify(mes));
    conn.on('text',function(str){
        var mes = {};
        mes.type = 'text';
        mes.data = str;
        broadcast(JSON.stringify(mes));
        // conn.sendText(str.toUpperCase() + '!!!');
    });
    conn.on('close',function(code,reason){
        console.log('Connection closed');
        var mes = {};
        mes.type = 'leave';
        mes.data = conn.nickname + 'is leave';
        broadcast(JSON.stringify(mes))
    });
    conn.on('error',function(err){
        console.log('err')
    })
}).listen(PORT);

function broadcast(msg){
    server.connections.forEach(function(conn){
        conn.sendText(msg)
    });
}

console.log('WebSocket server listening on port 3000');