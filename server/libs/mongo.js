
var mongo = require('mongoskin');

// Connect to MongoDB
var db = mongo.db("mongodb://localhost/workorder");
module.exports = db;

