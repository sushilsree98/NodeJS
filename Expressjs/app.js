const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(req, res, next)=>{
    res.send('<form action="/product" method="POST"><input name="text" type="text"/><button type="submit">Submit</button></form>')
})

app.use('/product',(req, res)=>{
    console.log(req.body)
    res.redirect("/")
})

app.use('/',(req, res, next)=>{
    res.send('<h1>Hello from Nodejs</h1>')
})

app.listen(3000)