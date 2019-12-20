//*************FRONTEND SOCKET CONNECTION***********//
var socket = io.connect('http://localhost:4000');

// Query DOM
var msg = document.getElementById('msg');
var yourname = document.getElementById('yourname');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var whoistyping = document.getElementById('whoistyping');

//********EMIT EVENTS********//

// when the send button is clicked
btn.addEventListener('click',function(){
  // emit name and msg to server on event 'chat'
  socket.emit('chat',{yourname:yourname.value,msg:msg.value});
  // clear out the message area when msg is sent
  msg.value="";
});

// when the key is pressed on message area by a client
msg.addEventListener('keypress',function(){
  // emit name of the person typing a msg to the server
  socket.emit('typing',yourname.value);
});

// On receiving the data sent by the server to all the connected clients
socket.on('chat',function(data){
  whoistyping.innerHTML="";
  output.innerHTML+='<p><strong>'+data.yourname+': </strong>'+data.msg+'</p>';
    // To set the whoistyping as null when the msg has been snet to other clients

});

// On receiving the data which is displayed on every client frontend except the one who is typing
socket.on('typing',function(data){
  whoistyping.innerHTML='<p><em>'+data+' is typing.....</p>';
});
