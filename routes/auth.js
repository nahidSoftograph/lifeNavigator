var express = require('express');
var router = express.Router();
var passport = require('passport');

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/auth/signIn');
});

router.get('/signIn', function(req, res) {
    res.render('auth/signIn', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/signIn', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/auth/signIn', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// SIGNUP =================================
// show the signup form
router.get('/signUp', function(req, res) {
    res.render('auth/signUp', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/auth/profile', // redirect to the secure profile section
    failureRedirect : '/auth/signUp', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/auth/signIn');
}