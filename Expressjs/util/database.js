const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://sushil:sushilnode@cluster0.ngtxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then(client => {
      _db = client.db()
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if(_db){
    return _db
  }
  throw "Db not found"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
