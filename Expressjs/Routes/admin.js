const express = require('express');
const path = require('path')
const router = express.Router()
const rootPath = require('../utils/path')

router.get('/add-product',(req, res, next)=>{
    res.sendFile(path.join(rootPath,'views','add-product.html'))
})

router.post('/add-product',(req, res)=>{
    console.log(req.body)
    res.redirect("/")
})

module.exports = router