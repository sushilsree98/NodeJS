const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
class Product {
  constructor(title, price, description, imageUrl,_id, user_id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id,
    this.user_id = user_id
  }

  save() {
    const db = getDb();
    let dbOps;
    if(this._id){
      dbOps = db.collection('products').updateOne({_id:new mongodb.ObjectId(this._id) },{$set:this})
    }else{
      dbOps = db.collection('products').insertOne(this)
    }
    return dbOps
    .then(res => {
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products=>{
        return products
      })
  }

  static findById(id){
    const db = getDb()
    return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next()
    .then(product=>{
      console.log(product)
      return product
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static deleteById(id){
    const db = getDb()
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)})
    .then(res=>{
      console.log('Deleted Successfully')
      return
    })
    .catch(err=>{console.log(err)})
  }

}

module.exports = Product;
