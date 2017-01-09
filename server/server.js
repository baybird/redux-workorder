var express = require("express");
var app = express();

// Parse post paramaters. Contains key-value pairs of data submitted
// in the request body. By default, it is undefined, and is populated
// when you use body-parsing middleware such as body-parser and multer.
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var es5Shim = require('es5-shim');
var es5Sham = require('es5-shim/es5-sham');
var consolePolyfill = require('console-polyfill');

// Assign listen port
//server.listen('80');
app.set('port', (process.env.PORT || 3001));

// Static files
//app.use(express.static('www'));

// Using template engine
app.set('view engine', 'pug');

// For setting environment in Windows
//    SET NODE_ENV=development
// For settting environment in Linux
//    export NODE_ENV=development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
//console.log("Node environment: "+process.env.NODE_ENV);

// Using routers
var rest_api  = require('./router/api');
app.use('/api', rest_api);

var router_page = require('./router/page');
app.use('/',router_page);


var server = require('http').Server(app);

// Socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.join('room');

  socket.on('send_chat_message', function(msg){
    socket.broadcast.emit('send_chat_message', msg);// only sending to others except sender
  });
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
