var express = require('express');
var app = require('express')();
var http = require('http').Server(app);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/js', function(req, res){
    res.sendFile(__dirname + '/dist/app.js');
});
app.get('/css', function(req, res){
    res.sendFile(__dirname + '/dist/app.css');
});
app.get('/favicon', function(req, res){
    res.sendFile(__dirname + '/favicon.ico');
});
app.use('/textures', express.static('textures'));




http.listen(3000, function(){
    console.log('listening on *:3000');
});




