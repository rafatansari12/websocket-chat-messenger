var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(4000, () => {
  console.log('listening to port 4000....');
});

// static Files
app.use(express.static('public'));

// socket setup to work on the defined server
var io = socket(server,)

//*****************BACKEND SOCKET CONNECTION******************//
// Once the server makes a connection with client, fire a function
// Note : Every client will have a different socket connection - hence, different socket id will be logged out to the console everytime you load the browser.
io.on('connection', function(socket){
  // console.log(socket); returns [object Object]
  console.log('Made socket connection successfully!' + socket.id);

  // On receiving the data sent by a client on event 'chat'
  socket.on('chat',function(data){
    // emit the sent data to all the other clients connected to server via different sockets
    io.sockets.emit('chat', data);
  });

  // On receiving the name of the person typing the msg
  socket.on('typing',function(data){
  // To broadcast 'someone is typing' msg to every single client except the one who is typing
  socket.broadcast.emit('typing',data);
  });

});
