const getDb = require("../util/database").getDb
const mongodb = require('mongodb')

class User {
  constructor(name, email){
    this.username = name,
    this.email = email
  }

  save(){
    const db = getDb()
    return db.collection('users').insertOne(this)
    .then(res=>{
      return res
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static findById(id){
    const db = getDb()
    return db.collection('users').find({_id: new mongodb.ObjectId(id)}).next()
    .then((user=>{
      return user
    }))
    .catch(err=>{
      console.log(err)
    })
  }
}

module.exports = User