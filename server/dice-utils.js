const MongoClient = require('mongodb').MongoClient;
const { MONGODB_USER, MONGODB_PASS, MONGODB_NAME } = process.env;
const { chain } = require('underscore');

const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.3dnfr.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`;

function getDataFromMongo(collectionName, techDie) {
  const mongoClient = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
  mongoClient.connect((err, client) => {
    if (err) {
      console.error(`Error(s) connecting to devdice :(\n${err.message}`);
      return;
    }

    console.log(`Connected to devdice; loading ${collectionName}...`);
    const collection = client.db(MONGODB_NAME).collection(collectionName);
    collection.find().toArray((_err, items) => {
      techDie.options = items.map((item) => item.name);
    });
  });
}

class Die {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.options        = [];
  
    getDataFromMongo(collectionName, this);
  }

  roll = () => chain(this.options).shuffle().first().value();
}

exports.backEnd  = new Die('backends');
exports.frontEnd = new Die('frontends');
exports.db       = new Die('databases');
exports.vcs      = new Die('vcs');
