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
    const cartProductIndex = this.cart.items.findIndex(cp=>{
      return cp.productId == product._id.toString()
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    console.log(updatedCartItems)
    if(cartProductIndex >= 0){
      newQuantity = this.cart.items[cartProductIndex]['qty'] + 1;
      updatedCartItems[cartProductIndex]['qty'] = newQuantity
    }else{
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id),qty: newQuantity})
    }
    const updatedCart = {items:updatedCartItems}
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