var express = require('express')
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)

io.on('connection', (socket)=>{
    /*from server side we will emit 'display' event once the user starts typing
    so that on the client side we can capture this event and display 
    '<data.user> is typing...' */
    socket.on('typing', (data)=>{
      if(data.typing==true)
         io.emit('display', data)
      else
         io.emit('display', data)
    })
}) 