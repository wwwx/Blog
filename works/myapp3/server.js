var express=require('express');
var fs=require('fs');

var app=express();

// app.use(express.static('test/'));
// 
// 路由
app.get('/user', function(req, res){

    res.sendFile(__dirname+'/test/user.html');
})



app.get('/listUsers', function(req, res){
    fs.readFile(__dirname+'/test/'+'user.json', 'utf-8', function(err, data){
        console.log(data);
        res.end(data);
    })
});

app.get('/addUser', function(req, res){
    var user={
        "user4": {
            "name" : "leonardo",
            "password" : "password4",
            "profession" : "engineer",
            "id": 4
        }
    };
    fs.readFile(__dirname+'/test/'+'user.json', 'utf-8', function(err, data){
        data=JSON.parse(data);
        data['user4']=user['user4'];
        console.log(data);
        res.end(JSON.stringify(data));
    })
})

app.get('/:id', function(req, res){
    fs.readFile(__dirname+'/test/'+'user.json', 'utf-8', function(err, data){
        data=JSON.parse(data);
        var user=data['user'+req.params.id];
        console.log(data);
        res.end(JSON.stringify(JSON.stringify(user)));
    })
})









var server=app.listen(8080, function(){
    console.log('server start.')
})