socket.On('typing',function(data){
    socket.broadcast.emit('typing ', data)
});

socket.on('typing',function(data){
    feedback.innerHTML= '<p><em>'+data+'is typing</em></p>'
});