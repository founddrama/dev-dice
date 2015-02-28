var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASS;

function getDataFromMongo(collectionName, die) {
  MongoClient.connect('mongodb://' + username + ':' + password + '@ds049651.mongolab.com:49651/devdice', function(err, db) {
    if (!err) {
      console.log('Connected to devdice; loading %s...', collectionName);
      var collection = db.collection(collectionName);
      collection.find().toArray(function(err, items) {
        die.options = items.map(function(item) {
          return item.name;
        });
      });
    } else {
      console.error('Error(s) connecting to dev dive :(');
    }
  });
}

function Die(collectionName) {
  this.collectionName = collectionName;
  this.options        = [];

  getDataFromMongo(collectionName, this);
}

Die.prototype = {
  constructor: Die,
  roll: function() {
    return _.first(_.shuffle(this.options));
  }
};

exports.backEnd  = new Die('backends');
exports.frontEnd = new Die('frontends');
exports.db       = new Die('databases');
exports.vcs      = new Die('vcs');