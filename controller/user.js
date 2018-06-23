let User = require('../models/user');

let renderUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            console.log(users);
            res.render('user', {users: users});
        }
    });
};

module.exports = {
    renderUsers
};