const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const adminRouter = require('./Routes/admin')
const shopRouter = require('./Routes/shop')
const rootPath = require('./utils/path')

const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'Public')))

app.use('/admin',adminRouter)
app.use(shopRouter)

app.use((req, res)=>{
 res.status(404).sendFile(path.join(rootPath,'views','404.html'))
})

app.listen(3000)