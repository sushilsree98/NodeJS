const getDb = require("../util/database").getDb
const mongodb = require('mongodb')

class User {
  constructor(name, email, cart, id){
    this.username = name,
    this.email = email
    this.cart = cart //{items:[]}
    this.id = id
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

  addToCart ( product ){
    const updatedCart = {items:[{cart_id: new mongodb.ObjectId(product._id),qty: 1}]}
    const db = getDb()
    db.collection('users').updateOne(
      {_id: new mongodb.ObjectId(this.id)},
      {$set:{cart:updatedCart}}
      )
      .then(res=>{
        console.log('Cart updated!')
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