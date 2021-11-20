const express = require('express')
const router = express.Router()
const path = require('path')
const rootPath = require('../utils/path')
const adminData = require('./admin')

router.get('/',(req, res, next)=>{
    res.sendFile(path.join(rootPath,'views','shop.html'));
    console.log(adminData.products)
})

module.exports = router