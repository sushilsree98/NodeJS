const {MongoClient} = require('mongodb')

let _db;
const mongoClient = new MongoClient('mongodb+srv://sushil:sushilnode@cluster0.ngtxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const mongoConnect = (cb) =>{
  mongoClient.connect()
  .then((client)=>{
    _db = client.db()
    cb()
  })
  .catch(err=>{
    console.log(err)
    throw err
  })
}

const getDb = () => {
  if(db){
    return db
  }
  throw "Database not found"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
