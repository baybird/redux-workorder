// Create instance of express
var express = require('express');

var https = require('https');

// Instantiate express router
var router = express.Router();

// requiure js function file
var func = require('../libs/functions');
var User = require("../libs/user.js");
  var package = require("../package.json");

// Using MongoDB
var db = require( '../libs/mongo' );
var work_collection = db.collection('works');
var user_collection = db.collection('users');
var ObjectID = require('mongodb').ObjectID;

// Get one order
// param1: Route path
// param1: Route handlers
router.get('/get/:id', function(req, res, next) {
  var oid = new ObjectID(req.params.id);

  work_collection.findOne({_id:oid}, function(err, order) {
      if (err) {
        throw err;
      }
      res.send(order);
  })

});

// Query all orders
router.get('/status/:status/:sortingKey/:sortingOrder', function(req, res, next) {

  var query = {};
  if (req.params.status.toLowerCase() !='all') {
    query["status"] = req.params.status.toLowerCase();
  }

  var sorting = {};
  if (req.params.sortingKey=='id') {
    sorting["_id"] = parseInt(req.params.sortingOrder);
  } else if (req.params.sortingKey=='time') {
    sorting["created_at"] = parseInt(req.params.sortingOrder);
  } else {
    sorting[req.params.sortingKey] = parseInt(req.params.sortingOrder);
  }


  work_collection.find(query).sort(sorting).toArray(function(err, result) {
    if (err) {
      throw err;
    }

    // Init. database
    if (result.length==0 && req.params.status.toLowerCase() == 'all') {
      var data = [
        {
          "subject":"Open an account for new customer",
          "priority":"medium",
          "status":"active",
          "created_at": Date().toString()
        },
        {
          "subject":"Fixing broken Wifi",
          "priority":"high",
          "status":"active",
          "created_at": Date().toString()
        }
      ];


      work_collection.insert(data);

      result = data;
    }

    var output = [];
    for (var item of result) {
      item['duration'] = func.calTimeDuration(item.created_at);
      output.push(item);
    }

    res.send(result);
  });
});

// Query with keyword
router.get('/status/:status/:sortingKey/:sortingOrder/:keyword', function(req, res, next) {
  var query = {};
  if (req.params.keyword) {
    query["subject"] = new RegExp(req.params.keyword, 'i');
  }


  if (req.params.status.toLowerCase() !='all') {
    query["status"] = req.params.status.toLowerCase();
  }


  work_collection.find(query).toArray(function(err, result) {
    if (err) {
      throw err;
    }

    var output = [];
    for (var item of result) {
      item['duration'] = func.calTimeDuration(item.created_at);
      output.push(item);
    }

    res.send(output);
  });
});

// Add new order
router.post('/insert', function(req, res, next){
  var date = new Date();

  var reStatus = false;
  var reMessage;

  var subject = req.body.subject;
  var priority= req.body.priority;
  var status  = req.body.status;
  var create_at= date.toString();

  if(subject==''){
    reMessage = "Please enter a subject.";
    reStatus  = false;
  }else if(priority==''){
    reMessage = "Please select a priority.";
    reStatus  = false;
  }else if(status==''){
    reMessage = "Please select a status.";
    reStatus = false;
  }else{
    reMessage = "Done.";
    reStatus = true;

    work_collection.insert({subject: subject, priority: priority, status: status, created_at: create_at});
  }

  var ret = {status: reStatus, message: reMessage};

  res.send(ret);

});

// Update order
router.put('/update', function(req, res, next){
  var date = new Date();

  var reStatus = false;
  var reMessage;

  var id      = req.body.id;
  var subject = req.body.subject;
  var priority= req.body.priority;
  var status  = req.body.status;


  //work_collection.update({_id:ObjectId("57cb21713e0be145dcc2058d")},{$set:{'subject':'New MongoDB Tutorial'}})

  if(id=""){
    reMessage = "Invalid order ID.";
    reStatus  = false;
  }else if(subject==''){
    reMessage = "Please enter a subject.";
    reStatus  = false;
  }else if(priority==''){
    reMessage = "Please select a priority.";
    reStatus  = false;
  }else if(status==''){
    reMessage = "Please select a status.";
    reStatus = false;
  }else{

    var oid = new ObjectID(req.body.id);

    var data = {
      'subject': req.body.subject,
      'priority': req.body.priority,
      'status': req.body.status
    };

    reMessage = "Updated.";
    reStatus  = true;


    work_collection.update(
        { "_id": oid },
        { $set:  data},
        function (err, documents) {
          if(err){
            throw err;
          }

          //var ret = {status: reStatus, message: reMessage};
          //res.send(ret);
        }
    );

  }

  var ret = {status: reStatus, message: reMessage};
  res.send(ret);

});

// Facebook
router.post('/checkFBstatus', function(req, res, next){
  let accessToken = package.facebook.app_id+"|"+package.facebook.app_secure;
  let inputToken  = req.body.token;
  let userID      = req.body.userID;
  let email       = req.body.email;
  let url         = 'https://graph.facebook.com/debug_token?input_token='+ inputToken +'&access_token='+accessToken;

  let name        = req.body.name;
  let picture     = req.body.picture;
  // console.log('req');
  // console.log(req.body);
  // return;

  if (email ==='' || userID ==='') {
    res.send({authenticated:0, msg:"Invalid login"});
  }else{
    function response(data){
      let response = JSON.parse(data);

      if (response.data.app_id === package.facebook.app_id && response.data.user_id === userID && email !== null) { // If is valid
        // check with database
        User.getUserByEmail(email, function(err, data){
          if (data.length < 1) { // Add user to database
            User.addUser(email, userID, name, picture);
          }
        });
        res.send({authenticated:1, msg:"OK"});
      }else{
        res.send({authenticated:0, msg:"Invalid login"});
      }
    }

    https.get(url, (res) => {
      res.setEncoding('utf8');
      if (res.statusCode===200) {
        res.on('data', (d) => {
          response(d);
        });
      }
    }).on('error', (e) => {
      response(e);
    });
  }
});


// Create new account
router.post('/signup', function(req, res, next){
  var date = new Date();

  var reStatus = false;
  var reMessage;

  var username;
  var password;

  if (req.body.username) {
    username = req.body.username;
  }

  if (req.body.password) {
    password = req.body.password;
  }

  var authenticated   = 1;
  var create_at= date.toString();

  function response(res, reStatus, reMessage){
    var ret = {authenticated: reStatus, message: reMessage};
    res.send(ret);
  }
  // test session
  // console.log(req.session.token);
  // if (typeof req.session.token != undefined){
  //   req.session.token++;
  // }else{
  //   req.session.token = 0
  // }
  // console.log(req.session.token);
  // console.log('req.session.token');

  if(username==''){
    reMessage = "Please enter a username.";
    reStatus  = false;
    response(res, reStatus, reMessage)
  }else if(password==''){
    reMessage = "Please select a password.";
    reStatus  = false;

    response(res, reStatus, reMessage)
  }else{
    var query = {
      username: username
    };

    var r = user_collection.find(query).toArray((err, items)=>{
      if (err){
        throw err;
      }

      let count = 0;
      for (var key in items) {
        count++;
      }

      if (count==0) {
        user_collection.insert({username: username, password: password, status: status, created_at: create_at});
        reMessage = "Done.";
        reStatus = true;
        req.session.token = 1;
        response(res, reStatus, reMessage);
      }else{
        reMessage = "Username already taken.";
        reStatus = false;
        response(res, reStatus, reMessage);
      }
    });
  }
});

// Get user info
router.get('/userinfo/:email/:userid', function(req, res, next){
  // console.log(req.params);
  let email;
  let password;
  if (req.params.email) {
    email = req.params.email;
  }else{
    res.send({status:0});
    return;
  }

  if (req.params.userid) {
    password = req.params.userid; // userid is password
  }else{
    res.send({status:0});
    return;
  }


  User.getUserByEmail(email, function(err, data){
    if (!data[0]) {
      res.send({status:0});
      return;
    }

    if (data[0].password == password) {
      let user = {
        name:     data[0].name,
        email:    data[0].username,
        picture:  data[0].picture
      };

      res.send({user: user, status:1});
    }else{
      res.send({status:0});
    }
  });
});

// Create new account
router.get('/checkauth', function(req, res, next){
  // test session
  console.log(req.session.token);

  // if (typeof req.session.token != undefined){
  //   req.session.token++;
  // }else{
  //   req.session.token = 0
  // }
  // console.log(req.session.token);
  // console.log('req.session.token');
  // res.send(req.session.token);
  // res.send({token:1});
});

module.exports = router;