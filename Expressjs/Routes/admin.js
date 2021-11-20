const express = require('express');
const path = require('path')
const router = express.Router()
const rootPath = require('../utils/path')

const products = []

router.get('/add-product',(req, res, next)=>{
    res.sendFile(path.join(rootPath,'views','add-product.html'))
})

router.post('/add-product',(req, res)=>{
    products.push({title:req.body.title})
    res.redirect("/")
})

exports.router = router
exports.products = products