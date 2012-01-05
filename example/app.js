/**
 * Module dependencies.
 */
var express = require('express');
var socket  = require('./socket.manager');
var app     = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

// socket.io routes
var mapping = {
  'ping'  : 'test#ping',
  'hello' : 'test#hi'
};

app.listen(3000);
socket.listen(app, mapping);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
