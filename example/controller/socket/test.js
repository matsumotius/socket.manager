var test = module.exports = {
  ping : function(io, socket, message){
    socket.emit('message', 'ping is ok');
  },
  hi   : function(io, socket, message){
    socket.emit('message', 'hello');
  }
};
