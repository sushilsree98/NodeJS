const path = require('path')
const dirname = require('../utils/path')
const fs = require('fs')
let products = []

module.exports = class Product{
    constructor(title){
        this.title = title
    }

    save(){
        const p = path.join(dirname,'data','products.json')
        fs.readFile(p,(err, fileContent)=>{
            if(!err){
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),err=>{
                console.log(err)
            })
        })
    }

    static fetchAll(cb){
         const p = path.join(dirname,'data','products.json')
        fs.readFile(p,(err, fileContent)=>{
            if(!err){
              cb(products = JSON.parse(fileContent))
            }else{
                cb([])
            }
        })
    }

}