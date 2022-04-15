const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('62593005a79654270e807db1')
    .then(user => {
      req.user = new User({
        name:user.name,
        email:user.email,
        cart: user.cart,
        id: user._id});
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://sushil:sushilnode@cluster0.ngtxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(result => {
  User.findOne().then((user)=>{
    if(!user){
      const user =  new User({
         name:"Sushil",
         email:""
       })
       user.save()
    }
  })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
