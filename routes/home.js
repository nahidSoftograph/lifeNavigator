let express = require('express'),
    router = express.Router();

router.get('/', (req, res, next) => {
    res.render('home', {'title': 'Home Page'});
});

module.exports = router;
