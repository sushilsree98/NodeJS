const express = require('express');
const router = express.Router()

router.use('/add-product',(req, res, next)=>{
    res.send('<form action="/product" method="POST"><input name="text" type="text"/><button type="submit">Submit</button></form>')
})

router.post('/product',(req, res)=>{
    console.log(req.body)
    res.redirect("/")
})

module.exports = router