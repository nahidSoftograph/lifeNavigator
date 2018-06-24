let User = require('../models/user');

let renderUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(users);
            res.render('user', {users: users});
        }
    });
};

let createUser = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password,
        name = req.body.name;
    console.log(req.body);
    if (!email) {

    } else if (!password) {

    } else {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                console.log(err);
            } else if (user) {
                console.log('User Exists');
                console.log(user);
            } else {
                var newUser            = new User();

                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.name = name;

                newUser.save(function(err) {
                    if (err) {
                        return done(err);
                    } else {
                     res.redirect('/user');
                    }
                });
            }
        });
    }
};

module.exports = {
    renderUsers,
    createUser
};