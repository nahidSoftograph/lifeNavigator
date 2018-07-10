let express = require('express'),
    router = express.Router();

router.get('/', isAuthenticated, (req, res, next) => {
    res.render('home', {'title': 'Home Page'});
});

module.exports = router;

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/signin');
    }
}