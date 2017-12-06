var httpsModule = require('https');
var fs = require('fs');

var https = httpsModule.createServer({
    key:fs.readFileSync('/path/to/server.key'),
    cert:fs.readFileSync('/path/to/server.crt')
},function(req,res){
    res.writeHead(200);
    res.end('hello world!')
});

https.listen(443,function(err){
    console.log('https listening on port:443');
})