let User = require('../models/user');
var passport = require('passport');
require('../config/passport')(passport);

let signInRender = (req, res, next) => {
    res.render('auth/signIn', {'title': 'Sign In'});
};

let signUpRender = (req, res, next) => {
    res.render('auth/signUp', {'title': 'Sign Up'});
};

var userSignUp = passport.authenticate('local-signup', {
    successRedirect : '/auth/signin',
    failureRedirect : '/auth/signup',
    failureFlash : true
});

var userLogin = passport.authenticate('local-login', {
    successRedirect : '/auth/success',
    failureRedirect : '/auth/failure',
    failureFlash : true
});

let createUser = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password;
    if (!email) {
        return cb ('Invalid email.', null);
    } else if (!password) {
        return cb ('Invalid password.', null);
    } else {
        let user = new User({
            email: email,
            password: password
        });
        user.save((err, user) => {
            if (err) {
                console.log('Error in creating user');
                console.log(err);
            } else {
                res.render('auth/signIn', {'title': 'Sign In'});
            }
        });
    }
};

module.exports = {
  signInRender,
  signUpRender,
  createUser,
  userLogin
};