var express = require("express");
var cors = require('cors'); // providing a Connect/Express middleware that can be used to enable CORS with various options.
var session = require('express-session')
// var sessionstore = require('sessionstore'); // Because using Redis as session store
var RedisStore = require('connect-redis')(session);
var parseurl = require('parseurl')

var app = express();
var server = require('http').Server(app);
app.use(cors());


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



// Using Redis
const redis_client  = require('./libs/redis.js');
// Test it
// redis_client.set('color', 'red');
// redis_client.get('color', (err, value)=>{
//   console.log(value);
// });

// Using session
//   store: new RedisStore({
//   client: redis_client
// }),
// store: sessionstore.createSessionStore(),
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  store: new RedisStore({
    client: redis_client
  }),
  key: 'connect.sid',
  secret: 'sdfasd55sd4fa1sd',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000*60*30
  }
}));

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

// var router_page = require('./router/page');
// app.use('/',router_page);


// Socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.join('room');

  socket.on('send_chat_message', function(msg){
    socket.broadcast.emit('send_chat_message', msg);// only sending to others except sender
  });
});


// Assign listen port
app.set('port', (process.env.PORT || 3001));
// console.log(process.env.PORT);


// Assign hostname
app.set('hostname', (process.env.hostname || 'localhost'));
// console.log(app.get('hostname'));

app.listen(app.get('port'), app.get('hostname'), () => {
  console.log(`Find the server at: http://${app.get('hostname')}:${app.get('port')}/`); // eslint-disable-line no-console
});
