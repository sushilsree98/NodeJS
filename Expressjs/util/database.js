const {MongoClient} = require('mongodb')

const mongoClient = new MongoClient('mongodb+srv://sushil:sushilnode@cluster0.ngtxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const mongoConnect = (cb) =>{
  mongoClient.connect()
  .then((client)=>{
    cb(client)
  })
  .catch(err=>{
    console.log(err)
  })
}

module.exports = mongoConnect
