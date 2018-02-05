
var express = require('express');
var app = express();
 
// app.use(express.static('jdpp1/bidWeb/src/main/resources/static/'));

app.get('/', function (req, res) {
   // res.sendFile( __dirname + "/" + "index.html" );
   res.send('hello world;')
})


var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

