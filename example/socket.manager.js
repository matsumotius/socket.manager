var manager = module.exports = {
  base   : './controller/socket/',
  set    : function(path, info, io, socket){
    socket.on(path, function(message){
      var file = info.split('#')[0]
      var func = info.split('#')[1] || null;
      var callback = manager.load(file, func);
      callback(io, socket, message);
    });
  },
  deploy : function(mapping, io, socket){
    for(var path in mapping){
      manager.set(path, mapping[path], io, socket);
    }
  },
  load   : function(path, func){
    var uri = manager.base + path;
    return func ? require(uri)[func] : require(uri);
  },
  listen : function(app, mapping){
    var io = require('socket.io').listen(app);
    io.sockets.on('connection', function(socket){
      manager.deploy(mapping, io, socket);
    });
  }
};
