const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password
  User.findOne({email: email})
    .then(user => {
      if(user){
        bcrypt.compare(password,user.password)
          .then(result=>{
            if(result){
               req.session.isLoggedIn = true;
               req.session.user = user;
               return req.session.save(err => {
                console.log(err);
                res.redirect('/');
              });
            }
            return res.redirect('/login')
          }).catch(err=>{
            console.log(err)
            return res.redirect('/login')
          })
      }
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email : email})
    .then(foundUser=>{
      if(foundUser){
        res.redirect('/signup')
        return
      }
      return bcrypt
        .hash(password,2)
        .then((hashedPassword)=>{
        const user = new User({
          email : email,
          password: hashedPassword,
          cart:{
            items:[]
          }
        })
        return user.save()
      })
    })
    .then(result=>{
      res.redirect('/shop')
    })
    .catch(err=>{
      console.log(err)
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
