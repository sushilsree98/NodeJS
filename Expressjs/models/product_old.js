// const fs = require('fs');
// const path = require('path');

const Cart = require('./cart');
const db = require('../util/database')

// const p = path.join(
//   path.dirname(process.module.filename),
//   'data',
//   'products.json'
// );

//Read from file
// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("INSERT INTO products(title, price, description, imageUrl) VALUE (?, ?, ?, ?)",
    [this.title, this.price, this.description, this.imageUrl])
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll() {
   return db.execute("SELECT * FROM products")
  }

  static findById(id) {
  return db.execute("SELECT * FROM products WHERE products.id=?",[id])
  }
};
