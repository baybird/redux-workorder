// Using MongoDB
var db = require( './mongo' );
var work_collection = db.collection('works');
var user_collection = db.collection('users');
var ObjectID = require('mongodb').ObjectID;

var User = {
  getUserByEmail: function(email, callback){
    var query = {
      username: email
    };

    var r = user_collection.find(query).limit(1).toArray(function(err, data){
      callback(err, data);
    })
  },

  addUser: function(email, userID, name, picture){
    var status = false;
    var message;

    if (email ==='' || typeof email === undefined) {
      message = "Email is required.";
    }else if (userID ==='') {
      message = "User ID is required.";
    }else{
      var query = {
        username: email,
        password: userID,
        name: name,
        picture: picture,
        status: 1,
        create_at: Date().toString()
      };

      let ret = user_collection.insert(query);
      status = true;
    }
  }

};

module.exports = User;

