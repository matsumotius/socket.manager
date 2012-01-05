$(function(){
  var socket = io.connect('http://localhost:3000');
  $('#hi').click(function(e){
    socket.emit('hello');
  });
  $('#ping').click(function(e){
    socket.emit('ping');
  });
  socket.on('message', function(message){
    $('#log').text(message);
  });
});
